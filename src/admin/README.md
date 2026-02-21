# Netlify CMS Multi-User Setup

This directory contains the Netlify CMS configuration for multi-user access with role-based permissions.

## Quick Start

### For Admins

1. **Enable Netlify Identity**
   - Go to your Netlify dashboard
   - Navigate to Site Settings > Identity
   - Click "Enable Identity"

2. **Configure Git Gateway**
   - Go to Site Settings > Identity > Services
   - Enable Git Gateway
   - Add roles: `admin`, `user-john`, `user-jane`

3. **Create Users**
   - Go to Identity > Users
   - Invite users via email
   - Assign appropriate roles in User metadata

### For Users

1. **Access the CMS**
   - Navigate to `https://yoursite.com/admin/`
   - Click "Login"
   - Sign in with your Netlify Identity account

2. **Upload Documents**
   - Click on your documents collection
   - Click "Create new"
   - Fill in the form and upload your file

## Configuration Files

- [`config.yml`](config.yml) - Main Netlify CMS configuration with role-based access
- [`index.html`](index.html) - Admin interface with Netlify Identity widget

## User Collections

Currently configured users:

- **John** - Collection: `user-john-documents`
- **Jane** - Collection: `user-jane-documents`

## Adding New Users

See the complete guide in [`../../docs/netlify-cms-multi-user-guide.md`](../../docs/netlify-cms-multi-user-guide.md) for detailed instructions.

## Directory Structure

```
src/
├── admin/
│   ├── config.yml          # CMS configuration
│   ├── index.html          # Admin interface
│   └── README.md           # This file
└── users/
    ├── john/
    │   ├── documents/      # John's document files
    │   └── media/          # John's uploaded media
    └── jane/
        ├── documents/      # Jane's document files
        └── media/          # Jane's uploaded media
```

## Role Permissions

| Role      | Blog | How-To | John's Docs | Jane's Docs |
| --------- | ---- | ------ | ----------- | ----------- |
| admin     | ✅   | ✅     | ✅          | ✅          |
| user-john | ❌   | ❌     | ✅          | ❌          |
| user-jane | ❌   | ❌     | ❌          | ✅          |

## Support

For detailed setup instructions and troubleshooting, see:

- [Multi-User Setup Guide](../../docs/netlify-cms-multi-user-guide.md)
- [Implementation Plan](../../plans/netlify-cms-multi-user-setup.md)
