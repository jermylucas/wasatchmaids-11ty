/**
 * Dynamic Netlify CMS Configuration Loader
 *
 * This script loads different CMS configurations based on the logged-in user's role.
 * Users will only see collections they have access to.
 */

// Store the original fetch function
const originalFetch = window.fetch;

// Override fetch to intercept config.yml requests
window.fetch = function (url, options) {
  return originalFetch.apply(this, arguments).then((response) => {
    // Check if this is a config.yml request
    if (url.includes('config.yml')) {
      // Clone the response to read it
      const clonedResponse = response.clone();

      return clonedResponse.text().then((configText) => {
        // Parse the YAML config
        const config = parseConfig(configText);

        // Get current user from Netlify Identity
        return getCurrentUser()
          .then((user) => {
            if (!user) {
              // No user logged in, return original config
              return response;
            }

            // Get user's roles
            const roles = getUserRoles(user);
            console.log('User roles:', roles);

            // Filter collections based on roles
            const filteredCollections = filterCollections(config.collections, roles);
            console.log(
              'Filtered collections:',
              filteredCollections.map((c) => c.name),
            );

            // Rebuild the config with filtered collections
            const filteredConfig = rebuildConfig(configText, filteredCollections);

            // Return a new response with the filtered config
            return new Response(filteredConfig, {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers,
            });
          })
          .catch((error) => {
            console.error('Error filtering collections:', error);
            // Return original response if there's an error
            return response;
          });
      });
    }

    return response;
  });
};

/**
 * Get current user from Netlify Identity
 */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    if (typeof netlifyIdentity === 'undefined') {
      reject(new Error('Netlify Identity is not loaded'));
      return;
    }

    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      resolve(currentUser);
    } else {
      // Wait for user to be initialized
      netlifyIdentity.on('init', (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No user logged in'));
        }
      });

      // Also listen for login
      netlifyIdentity.on('login', (user) => {
        resolve(user);
      });
    }
  });
}

/**
 * Get user's roles from metadata
 */
function getUserRoles(user) {
  if (user.user_metadata && user.user_metadata.roles) {
    return user.user_metadata.roles;
  }
  return [];
}

/**
 * Parse YAML config (simple parser for our use case)
 */
function parseConfig(yamlText) {
  const collections = [];
  const lines = yamlText.split('\n');
  let currentCollection = null;
  let inCollections = false;
  let indentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const indent = line.search(/\S|$/);

    // Check if we're in the collections section
    if (trimmedLine === 'collections:') {
      inCollections = true;
      indentLevel = indent;
      continue;
    }

    // If we're not in collections, skip
    if (!inCollections) continue;

    // Check if we've left the collections section
    if (inCollections && indent <= indentLevel && trimmedLine && !trimmedLine.startsWith('-')) {
      inCollections = false;
      if (currentCollection) {
        collections.push(currentCollection);
        currentCollection = null;
      }
      continue;
    }

    // Parse collection
    if (trimmedLine.startsWith('- name:')) {
      if (currentCollection) {
        collections.push(currentCollection);
      }
      currentCollection = {
        name: trimmedLine.match(/name:\s*["']?([^"']+)["']?/)?.[1] || '',
        publish_roles: [],
        create_roles: [],
      };
    } else if (currentCollection && trimmedLine.startsWith('publish_roles:')) {
      const roles = trimmedLine.match(/\[(.*?)\]/)?.[1] || '';
      currentCollection.publish_roles = roles
        .split(',')
        .map((r) => r.trim().replace(/["']/g, ''))
        .filter((r) => r);
    } else if (currentCollection && trimmedLine.startsWith('create_roles:')) {
      const roles = trimmedLine.match(/\[(.*?)\]/)?.[1] || '';
      currentCollection.create_roles = roles
        .split(',')
        .map((r) => r.trim().replace(/["']/g, ''))
        .filter((r) => r);
    }
  }

  if (currentCollection) {
    collections.push(currentCollection);
  }

  return { collections };
}

/**
 * Filter collections based on user's roles
 */
function filterCollections(collections, roles) {
  // If user is admin, show all collections
  if (roles.includes('admin')) {
    return collections;
  }

  // Filter collections based on roles
  return collections.filter((collection) => {
    // Check if collection has role restrictions
    if (collection.publish_roles.length > 0 || collection.create_roles.length > 0) {
      const allowedRoles = [...collection.publish_roles, ...collection.create_roles];

      // Check if user has any of the allowed roles
      return allowedRoles.some((role) => roles.includes(role));
    }

    // If no role restrictions, show collection
    return true;
  });
}

/**
 * Rebuild the config with filtered collections
 */
function rebuildConfig(originalYaml, filteredCollections) {
  const lines = originalYaml.split('\n');
  let result = [];
  let inCollections = false;
  let inCollection = false;
  let currentCollectionName = null;
  let collectionIndent = 0;
  let includeCollection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const indent = line.search(/\S|$/);

    // Check if we're entering the collections section
    if (trimmedLine === 'collections:') {
      inCollections = true;
      collectionIndent = indent;
      result.push(line);
      continue;
    }

    // If we're not in collections, add the line
    if (!inCollections) {
      result.push(line);
      continue;
    }

    // Check if we've left the collections section
    if (inCollections && indent <= collectionIndent && trimmedLine && !trimmedLine.startsWith('-')) {
      inCollections = false;
      result.push(line);
      continue;
    }

    // Parse collection start
    if (trimmedLine.startsWith('- name:')) {
      const name = trimmedLine.match(/name:\s*["']?([^"']+)["']?/)?.[1] || '';
      currentCollectionName = name;

      // Check if this collection should be included
      includeCollection = filteredCollections.some((c) => c.name === name);

      inCollection = true;

      if (includeCollection) {
        result.push(line);
      }
      continue;
    }

    // Add collection content if it should be included
    if (inCollection && includeCollection) {
      result.push(line);
    }
  }

  return result.join('\n');
}
