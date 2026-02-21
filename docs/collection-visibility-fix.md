# Fix for Collection Visibility Issue

## Problem

Users were able to see all collections in Netlify CMS, regardless of their role. The `publish_roles` and `create_roles` settings in `config.yml` only control publishing permissions, not collection visibility.

## Solution

Created a custom CMS configuration loader ([`cms-config.js`](../src/admin/cms-config.js:1)) that:

1. **Intercepts the config.yml fetch** - Overrides the browser's `fetch` function to intercept requests for the CMS configuration
2. **Gets the logged-in user's role** - Uses Netlify Identity to retrieve the current user's roles
3. **Filters collections dynamically** - Parses the YAML config and filters collections based on the user's roles
4. **Returns filtered config** - Sends a modified configuration back to the CMS with only the collections the user can access

## How It Works

### 1. Collection Filtering Logic

```javascript
// Admin users see all collections
if (roles.includes('admin')) {
  return allCollections;
}

// Regular users only see collections they have roles for
return collections.filter((collection) => {
  const allowedRoles = [...collection.publish_roles, ...collection.create_roles];

  return allowedRoles.some((role) => roles.includes(role));
});
```

### 2. Example Configuration

For a user with role `user-john`:

**Original config.yml collections:**

- Blog (admin only)
- How-To (admin only)
- John's Documents (admin + user-john)
- Jane's Documents (admin + user-jane)

**Filtered collections for John:**

- John's Documents only

### 3. Role-Based Access

| Collection       | Admin | John (user-john) | Jane (user-jane) |
| ---------------- | ----- | ---------------- | ---------------- |
| Blog             | ✅    | ❌               | ❌               |
| How-To           | ✅    | ❌               | ❌               |
| John's Documents | ✅    | ✅               | ❌               |
| Jane's Documents | ✅    | ❌               | ✅               |

## Files Modified/Created

### Created

- [`src/admin/cms-config.js`](../src/admin/cms-config.js:1) - Dynamic configuration loader

### Modified

- [`src/admin/index.html`](../src/admin/index.html:1) - Added script tag to load `cms-config.js`

## Testing the Fix

### 1. Clear Browser Cache

After deploying the changes, users may need to:

- Clear browser cache
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Log out and log back in

### 2. Verify Collection Visibility

**Test as Admin:**

1. Log in as admin
2. Should see: Blog, How-To, John's Documents, Jane's Documents

**Test as John:**

1. Log in as John (with role `user-john`)
2. Should see: John's Documents only
3. Should NOT see: Blog, How-To, Jane's Documents

**Test as Jane:**

1. Log in as Jane (with role `user-jane`)
2. Should see: Jane's Documents only
3. Should NOT see: Blog, How-To, John's Documents

### 3. Check Browser Console

Open the browser's developer console (F12) and look for:

```
User roles: ['user-john']
Filtered collections: ['user-john-documents']
```

This confirms the filtering is working correctly.

## Troubleshooting

### Users Still See All Collections

**Possible Causes:**

1. **Roles not assigned correctly**
   - Check Netlify Identity > Users
   - Verify user has the correct role in User metadata > Roles

2. **Browser cache**
   - Clear browser cache
   - Hard refresh the page
   - Try in incognito/private mode

3. **Script not loading**
   - Check browser console for errors
   - Verify [`cms-config.js`](../src/admin/cms-config.js:1) is being loaded
   - Check that the script path is correct: `/admin/cms-config.js`

4. **Netlify Identity not initialized**
   - Check that Netlify Identity is enabled
   - Verify user is logged in
   - Check browser console for Identity errors

### Collections Not Showing for Any User

**Possible Causes:**

1. **YAML parsing error**
   - Check browser console for parsing errors
   - Verify `config.yml` syntax is correct

2. **Role names don't match**
   - Ensure role names in Netlify Identity match exactly with `config.yml`
   - Check for typos (e.g., `user-john` vs `user_john`)

3. **Script execution order**
   - Ensure `cms-config.js` loads before Netlify CMS initializes
   - Check that the script tag is placed correctly in [`index.html`](../src/admin/index.html:1)

### Admin Cannot See All Collections

**Possible Causes:**

1. **Admin role not assigned**
   - Check that admin user has the `admin` role in Netlify Identity

2. **Role name mismatch**
   - Verify the role is named exactly `admin` (case-sensitive)

## Adding New Users

When adding a new user, the filtering will work automatically if:

1. The user has the correct role assigned in Netlify Identity
2. The role name matches the collection's `publish_roles` and `create_roles`
3. The collection is defined in `config.yml`

No additional configuration is needed in [`cms-config.js`](../src/admin/cms-config.js:1).

## Technical Details

### Fetch Interception

The script overrides `window.fetch` to intercept requests for `config.yml`:

```javascript
window.fetch = function (url, options) {
  return originalFetch.apply(this, arguments).then((response) => {
    if (url.includes('config.yml')) {
      // Filter the config before returning
      return filterConfig(response);
    }
    return response;
  });
};
```

### YAML Parsing

The script includes a simple YAML parser that:

- Identifies the `collections:` section
- Extracts collection names and role permissions
- Rebuilds the YAML with filtered collections

### Role Resolution

Roles are retrieved from Netlify Identity user metadata:

```javascript
const roles = user.user_metadata && user.user_metadata.roles ? user.user_metadata.roles : [];
```

## Security Considerations

1. **Client-side filtering**: This is a client-side solution for UI purposes only
2. **Server-side protection**: Git Gateway still enforces role-based permissions for publishing
3. **Audit trail**: All changes are tracked in Git commits
4. **No sensitive data exposure**: Users cannot access files they don't have permission to see

## Alternative Approaches

If this solution doesn't work for your needs, consider:

1. **Decap CMS**: Formerly Netlify CMS, has better built-in support for role-based collection filtering
2. **Separate CMS instances**: Run separate CMS instances for different user groups
3. **Custom backend**: Implement a custom backend with Decap CMS for full control

## Support

For issues or questions:

1. Check the [troubleshooting section](#troubleshooting) above
2. Review the [Multi-User Setup Guide](netlify-cms-multi-user-guide.md)
3. Check browser console for errors
4. Verify Netlify Identity configuration
