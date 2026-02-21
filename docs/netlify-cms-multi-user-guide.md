# Netlify CMS Multi-User Setup Guide

This guide explains how to set up and manage multiple users with role-based access control in your Netlify CMS.

## Table of Contents

- [Overview](#overview)
- [Initial Setup](#initial-setup)
- [Creating Users and Assigning Roles](#creating-users-and-assigning-roles)
- [Adding New Users](#adding-new-users)
- [User Access Guide](#user-access-guide)
- [Admin Procedures](#admin-procedures)
- [Troubleshooting](#troubleshooting)

---

## Overview

Your Netlify CMS is configured with role-based access control that allows:

- **Admin users**: Full access to all collections (blog, how-to, and all user documents)
- **Regular users**: Access only to their own documents and scorecards

### Current User Collections

The system includes example collections for:

- `user-john-documents` - John's personal documents and scorecards
- `user-jane-documents` - Jane's personal documents and scorecards

Each user collection includes:

- Documents (PDFs, Word docs, etc.)
- Scorecards
- Reports
- Other files

---

## Initial Setup

### Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard (https://app.netlify.com)
2. Select your site
3. Navigate to **Site Settings** > **Identity**
4. Click **Enable Identity**
5. Configure the following settings:
   - **Registration**: Choose "Invite only" or "Open" based on your preference
   - **External providers**: Enable Google, GitHub, etc. if desired

### Step 2: Configure Git Gateway

1. In Netlify dashboard, go to **Site Settings** > **Identity** > **Services**
2. Enable **Git Gateway**
3. Configure the following:
   - **Roles**: Ensure the following roles are available:
     - `admin` - For administrators
     - `user-john` - For John
     - `user-jane` - For Jane
   - **Allowed origins**: Add your site's domain

### Step 3: Create Admin Account

1. In Netlify dashboard, go to **Identity** > **Users**
2. Click **Invite users**
3. Enter admin email address
4. After they accept the invite, edit the user:
   - Click on the user
   - Go to **User metadata** > **Roles**
   - Add `admin` role

---

## Creating Users and Assigning Roles

### Creating a New User

1. Go to Netlify dashboard > **Identity** > **Users**
2. Click **Invite users**
3. Enter the user's email address
4. Send the invitation

### Assigning Roles to a User

1. In Netlify dashboard, go to **Identity** > **Users**
2. Click on the user you want to configure
3. Scroll to **User metadata** section
4. Click **Edit** next to **Roles**
5. Add the appropriate role:
   - `admin` - For administrators (full access)
   - `user-john` - For John (access to John's documents only)
   - `user-jane` - For Jane (access to Jane's documents only)
6. Click **Save**

### Role Permissions

| Role      | Blog | How-To | John's Documents | Jane's Documents |
| --------- | ---- | ------ | ---------------- | ---------------- |
| admin     | ✅   | ✅     | ✅               | ✅               |
| user-john | ❌   | ❌     | ✅               | ❌               |
| user-jane | ❌   | ❌     | ❌               | ✅               |

---

## Adding New Users

To add a new user to the system, follow these steps:

### Step 1: Create User in Netlify Identity

1. Go to Netlify dashboard > **Identity** > **Users**
2. Click **Invite users**
3. Enter the new user's email address
4. Send the invitation

### Step 2: Assign Role to User

1. After the user accepts the invite, go to **Identity** > **Users**
2. Click on the user
3. Go to **User metadata** > **Roles**
4. Add the role: `user-username` (replace `username` with the user's actual username)

### Step 3: Add User Collection to config.yml

Open [`src/admin/config.yml`](../src/admin/config.yml:1) and add a new collection:

```yaml
- name: 'user-newuser-documents'
  label: "New User's Documents"
  folder: 'src/users/newuser/documents'
  create: true
  publish_roles: ['admin', 'user-newuser']
  create_roles: ['admin', 'user-newuser']
  media_folder: 'src/users/newuser/media'
  public_folder: '/users/newuser/media'
  slug: '{{year}}-{{month}}-{{day}}-{{slug}}'
  fields:
    - { label: 'Title', name: 'title', widget: 'string' }
    - { label: 'Description', name: 'description', widget: 'string' }
    - { label: 'Date', name: 'date', widget: 'datetime' }
    - {
        label: 'Document Type',
        name: 'type',
        widget: 'select',
        options: ['document', 'scorecard', 'report', 'other'],
        default: 'document',
      }
    - { label: 'File', name: 'file', widget: 'file', allow_multiple: false }
    - { label: 'Body', name: 'body', widget: 'markdown' }
```

**Replace `newuser` with the actual username in all instances.**

### Step 4: Create Directory Structure

Create the necessary directories for the new user:

**Windows (cmd):**

```cmd
mkdir src\users\newuser\documents
mkdir src\users\newuser\media
```

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Path "src\users\newuser\documents"
New-Item -ItemType Directory -Path "src\users\newuser\media"
```

**Mac/Linux:**

```bash
mkdir -p src/users/newuser/documents
mkdir -p src/users/newuser/media
```

### Step 5: Deploy Changes

1. Commit your changes to Git
2. Push to your repository
3. Netlify will automatically deploy the changes
4. The new user can now access their documents collection

---

## User Access Guide

### How Users Access the CMS

1. Navigate to your site's admin page: `https://yoursite.com/admin/`
2. Click **Login**
3. Sign in using Netlify Identity (email/password or social login)
4. After logging in, users will see only the collections they have access to

### What Users Can Do

**Regular Users (e.g., user-john, user-jane):**

- ✅ View their own documents and scorecards
- ✅ Upload new documents
- ✅ Edit document details (title, description, etc.)
- ✅ Delete their own documents
- ❌ Cannot access other users' documents
- ❌ Cannot access blog or how-to collections

**Admin Users:**

- ✅ Full access to all collections
- ✅ Can manage all user documents
- ✅ Can create and edit blog posts
- ✅ Can create and edit how-to guides
- ✅ Can manage all users

### Uploading Documents

1. Log in to the CMS
2. Click on your documents collection (e.g., "John's Documents")
3. Click **Create new** button
4. Fill in the fields:
   - **Title**: Name of the document
   - **Description**: Brief description
   - **Date**: Date of the document
   - **Document Type**: Select from dropdown (document, scorecard, report, other)
   - **File**: Click to upload your file
   - **Body**: Optional additional notes
5. Click **Save** or **Publish**

### Viewing Documents

1. Log in to the CMS
2. Click on your documents collection
3. Click on any document to view its details
4. Download files by clicking on the file link

---

## Admin Procedures

### Viewing All User Documents

As an admin, you can view all user documents:

1. Log in to the CMS
2. You'll see all collections including all user document collections
3. Navigate to any user's collection to view their documents

### Managing User Access

To modify a user's access:

1. Go to Netlify dashboard > **Identity** > **Users**
2. Click on the user
3. Edit their roles in **User metadata** > **Roles**
4. Add or remove roles as needed

### Removing a User

To remove a user's access:

1. Go to Netlify dashboard > **Identity** > **Users**
2. Click on the user
3. Click **Disable user** or **Delete user**

To remove their documents collection:

1. Edit [`src/admin/config.yml`](../src/admin/config.yml:1)
2. Remove the user's collection configuration
3. Optionally, delete their directory from `src/users/`
4. Commit and deploy changes

### Auditing Changes

All changes made through the CMS are tracked in Git:

1. View commit history to see who made changes
2. Each commit includes the author's name
3. Netlify provides deployment logs for additional tracking

---

## Troubleshooting

### User Cannot See Their Documents

**Problem**: User logs in but doesn't see their documents collection.

**Solutions**:

1. Verify the user has the correct role in Netlify Identity
   - Go to Netlify dashboard > Identity > Users
   - Click on the user
   - Check User metadata > Roles
2. Ensure the role name matches exactly (e.g., `user-john` not `user_john`)
3. Check that [`config.yml`](../src/admin/config.yml:1) has the correct role in `publish_roles` and `create_roles`
4. Clear browser cache and try logging in again

### User Cannot Upload Files

**Problem**: User sees the collection but cannot upload files.

**Solutions**:

1. Verify the user's role is in the `create_roles` list for their collection
2. Check that the media folder exists and has correct permissions
3. Ensure the file size is within Netlify's limits
4. Try uploading a smaller file to test

### Admin Cannot Access User Documents

**Problem**: Admin cannot see user document collections.

**Solutions**:

1. Verify the admin has the `admin` role in Netlify Identity
2. Check that [`config.yml`](../src/admin/config.yml:1) includes `admin` in all collection permissions
3. Ensure Git Gateway is properly configured
4. Try logging out and logging back in

### Changes Not Appearing

**Problem**: User makes changes but they don't appear on the site.

**Solutions**:

1. Check Netlify deploy status
2. Ensure changes were published (not just saved as draft)
3. Verify Git repository is receiving commits
4. Check for build errors in Netlify dashboard

### Identity Widget Not Loading

**Problem**: Login button doesn't work or identity widget doesn't load.

**Solutions**:

1. Ensure Netlify Identity is enabled in site settings
2. Check that the identity widget script is loading in [`admin/index.html`](../src/admin/index.html:11)
3. Verify there are no JavaScript errors in browser console
4. Check that the site URL is correct in Netlify settings

### Role-Based Access Not Working

**Problem**: Users can see collections they shouldn't have access to.

**Solutions**:

1. Verify role names are consistent between Netlify Identity and [`config.yml`](../src/admin/config.yml:1)
2. Check for typos in role names
3. Ensure Git Gateway is properly configured with role restrictions
4. Review Netlify Identity logs for authentication issues

---

## Best Practices

1. **Use consistent usernames**: Keep usernames simple and consistent (e.g., `user-john`, `user-jane`)
2. **Regular backups**: Git automatically backs up all changes
3. **Document changes**: Keep track of which users are added/removed
4. **Test access**: After adding a new user, verify they can access only their collection
5. **Monitor usage**: Regularly check Netlify dashboard for active users
6. **Security**: Use strong passwords and enable two-factor authentication if available

---

## Additional Resources

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/git-gateway/)

---

## Support

If you encounter issues not covered in this guide:

1. Check the [troubleshooting section](#troubleshooting)
2. Review Netlify CMS and Identity documentation
3. Check Netlify dashboard logs
4. Contact Netlify support for platform-specific issues
