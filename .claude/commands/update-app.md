---
name: update-app
description: Update dependencies and fix any deprecations
---

# Update Dependencies

This command updates project dependencies and fixes any deprecation issues.

## Step 1: Check Current State

Review current dependencies and check for outdated packages:

```bash
npm outdated
```

## Step 2: Update Dependencies

Update all dependencies to their latest compatible versions:

```bash
npm update
```

For major version updates, review each package individually:

```bash
npm outdated
```

## Step 3: Check for Breaking Changes

After updating, run the full check suite:

```bash
npm run check
npm run build
```

## Step 4: Fix Deprecation Warnings

If there are deprecation warnings or breaking changes:
1. Read the migration guides for updated packages
2. Update code to use new APIs
3. Run checks again to verify fixes

## Step 5: Test the Application

Start the dev server and verify the application works:

```bash
npm run dev
```

Check the browser console for any runtime warnings or errors.

## Step 6: Report

Report to the user:
- Which packages were updated
- Any breaking changes encountered
- Any manual fixes required
