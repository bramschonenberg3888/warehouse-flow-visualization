---
name: fix
description: Run typechecking and linting, then spawn parallel agents to fix all issues
---

# Project Code Quality Check

This command runs all linting and typechecking tools for this project, collects errors, groups them by domain, and spawns parallel agents to fix them.

## Step 1: Run Linting and Typechecking

Run these commands and capture all output:

```bash
npm run typecheck 2>&1
npm run lint 2>&1
```

## Step 2: Collect and Parse Errors

Parse the output from the linting and typechecking commands. Group errors by domain:
- **Type errors**: Issues from TypeScript (`tsc --noEmit`)
- **Lint errors**: Issues from ESLint (`eslint src/`)

Create a list of all files with issues and the specific problems in each file.

## Step 3: Spawn Parallel Agents

For each domain that has issues, spawn an agent in parallel using the Task tool:

**IMPORTANT**: Use a SINGLE response with MULTIPLE Task tool calls to run agents in parallel.

Example:
- Spawn a "type-fixer" agent for type errors with the list of files and specific TS errors
- Spawn a "lint-fixer" agent for lint errors with the list of files and specific ESLint errors

Each agent should:
1. Receive the list of files and specific errors in their domain
2. Fix all errors in their domain
3. Run the relevant check command to verify fixes
4. Report completion

## Step 4: Verify All Fixes

After all agents complete, run the full check again:

```bash
npm run check
```

Ensure all issues are resolved. If any remain, fix them directly.
