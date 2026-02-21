# Netlify CMS Multi-User and Roles Setup Plan

## Overview

Setup Netlify CMS to support multiple users with role-based access to documents and scorecards:

- **Admin/Manager**: Full access to all content
- **Users (5-10)**: View-only access to their own documents and scorecards, with ability to upload

## Current Setup Analysis

- Backend: Git Gateway (Netlify Identity)
- Authentication: Netlify Identity Widget
- Collections: Blog, How-To
- No current role-based access control

---

## Implementation Options

### Option 1: Separate Collections per User (Simplest)

**Approach**: Create individual collections for each user with role-based access control.

**Pros**:

- No custom code required
- Easy to understand and maintain
- Built-in Netlify CMS role support
- Clear separation of user data

**Cons**:

- Requires config update for each new user
- Not scalable for large user counts
- More collections to manage

**Implementation Steps**:

1. Update `src/admin/config.yml` to add user-specific collections
2. Configure Netlify Identity roles (admin, user-john, user-jane, etc.)
3. Set collection-level `publish_roles` and `create_roles` permissions
4. Create collections for documents and scorecards per user

**Example Config**:

```yaml
collections:
  - name: 'user-john-documents'
    label: "John's Documents"
    folder: 'src/users/john/documents'
    create: true
    publish_roles: ['admin', 'user-john']
    create_roles: ['admin', 'user-john']
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Document Type', name: 'type', widget: 'select', options: ['scorecard', 'document'] }
      - { label: 'File', name: 'file', widget: 'file' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```

---

### Option 2: Single Collection with User Field + Custom Filtering (More Flexible)

**Approach**: Use a single collection with an `assigned_user` field and implement custom filtering.

**Pros**:

- Scalable for any number of users
- No config changes needed when adding users
- Easier to manage permissions centrally
- Better for reporting/analytics

**Cons**:

- Requires custom JavaScript widget
- More complex setup
- Requires understanding of Netlify CMS widget API

**Implementation Steps**:

1. Update `src/admin/config.yml` to add user-specific collections with `assigned_user` field
2. Create custom CMS widget in `src/admin/cms.js` to filter documents by logged-in user
3. Configure Netlify Identity roles (admin, user)
4. Implement filtering logic based on user email

**Example Config**:

```yaml
collections:
  - name: 'user-documents'
    label: 'User Documents'
    folder: 'src/users/documents'
    create: true
    publish_roles: ['admin', 'user']
    create_roles: ['admin']
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Assigned User', name: 'assigned_user', widget: 'string', hint: 'User email' }
      - { label: 'Document Type', name: 'type', widget: 'select', options: ['scorecard', 'document'] }
      - { label: 'File', name: 'file', widget: 'file' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
```

**Custom Widget Logic**:

```javascript
// Filter entries based on logged-in user
CMS.registerPreviewTemplate('user-documents', ({ entry, widgetFor }) => {
  const currentUser = netlifyIdentity.currentUser();
  const assignedUser = entry.getIn(['data', 'assigned_user']);

  if (currentUser.email !== assignedUser && !currentUser.user_metadata.roles.includes('admin')) {
    return <div>Access Denied</div>;
  }

  return <div>{widgetFor('body')}</div>;
});
```

---

### Option 3: Decap CMS with Custom Backend (Most Powerful)

**Approach**: Migrate to Decap CMS (formerly Netlify CMS) and implement custom backend logic.

**Pros**:

- Full control over authentication and authorization
- Can implement complex permission logic
- Active development and better documentation
- Supports custom backends beyond Git

**Cons**:

- Requires migration from Netlify CMS to Decap CMS
- More complex setup
- May require backend service (e.g., Netlify Functions)

**Implementation Steps**:

1. Replace Netlify CMS script with Decap CMS
2. Implement custom backend with Netlify Functions
3. Create authentication middleware
4. Implement role-based access control in backend

---

## Recommended Approach

**For 5-10 users with simple requirements**: **Option 1 (Separate Collections)**

**Rationale**:

- Simplest to implement and maintain
- No custom code required
- Clear separation of concerns
- Easy to audit who has access to what
- Netlify CMS has built-in support for this pattern

---

## Implementation Plan (Option 1)

### Phase 1: Netlify Identity Setup

1. Enable Netlify Identity in Netlify dashboard
2. Configure Identity settings:
   - Enable registration (optional, or invite-only)
   - Set up role-based access
3. Create initial users:
   - Admin account
   - User accounts (5-10)

### Phase 2: Update Netlify CMS Configuration

1. Update `src/admin/config.yml`:
   - Add role-based access to existing collections
   - Create user-specific document collections
   - Create user-specific scorecard collections
2. Configure collection permissions:
   - `publish_roles`: Who can publish changes
   - `create_roles`: Who can create new entries
   - `delete_roles`: Who can delete entries

### Phase 3: Create User Collections Structure

1. Create directory structure:
   ```
   src/
   └── users/
       ├── john/
       │   ├── documents/
       │   └── scorecards/
       ├── jane/
       │   ├── documents/
       │   └── scorecards/
       └── ...
   ```

### Phase 4: Configure Media Folders

1. Set up user-specific media folders:
   - `src/users/john/media/`
   - `src/users/jane/media/`
   - etc.

### Phase 5: Test User Access

1. Test admin account: Verify full access to all collections
2. Test user accounts: Verify access only to their collections
3. Test document upload functionality
4. Test view-only permissions

### Phase 6: Documentation

1. Create user guide for accessing documents
2. Document admin procedures for adding new users
3. Create troubleshooting guide

---

## File Changes Required

### 1. `src/admin/config.yml`

- Add role-based permissions to existing collections
- Add user-specific collections for documents and scorecards
- Configure media folders per user

### 2. `src/admin/index.html`

- Add custom CMS initialization script (if needed)
- Configure Netlify Identity widget settings

### 3. `src/admin/cms.js` (New File)

- Custom CMS configuration (if using Option 2)
- Custom widgets and preview templates

### 4. Directory Structure

- Create `src/users/` directory
- Create user-specific subdirectories

---

## Netlify Identity Role Configuration

### Roles to Create:

- `admin`: Full access to all collections
- `user-john`: Access to John's documents and scorecards
- `user-jane`: Access to Jane's documents and scorecards
- (etc. for each user)

### Role Assignment in Netlify Dashboard:

1. Go to Site Settings > Identity
2. Click "Users" tab
3. Select a user
4. Edit user metadata
5. Add role(s) to user

---

## Security Considerations

1. **Git Gateway Security**: Ensure Git Gateway is properly configured with Netlify Identity
2. **Role Verification**: Always verify roles on both client and server (if applicable)
3. **File Access**: Ensure media folders are properly secured
4. **Audit Trail**: Keep track of who makes changes (Git commit history helps)

---

## Maintenance Procedures

### Adding a New User:

1. Create user in Netlify Identity
2. Assign appropriate role
3. Add user-specific collections to `config.yml`
4. Create user directories
5. Test access

### Removing a User:

1. Disable user in Netlify Identity
2. Archive or remove user directories (optional)
3. Update `config.yml` to remove user collections (optional)

---

## Next Steps

1. Review this plan and confirm the approach
2. Decide which option to implement (Option 1 recommended)
3. Switch to Code mode to implement the solution
4. Test thoroughly before deploying to production
