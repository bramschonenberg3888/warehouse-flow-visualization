---
name: commit
description: Run checks, then commit with AI-generated message
---

# Commit Changes

This command runs code quality checks, then creates a commit with an AI-generated message.

## Step 1: Run Code Quality Checks

First, run all checks to ensure code is ready to commit:

```bash
npm run check
```

If any errors are found, fix them before proceeding. Do NOT commit code with errors.

## Step 2: Check Git Status

Review what will be committed:

```bash
git status
git diff --staged
git diff
```

## Step 3: Stage Changes

Stage all relevant changes (excluding generated files, secrets, etc.):

```bash
git add -A
```

## Step 4: Generate Commit Message

Analyze the staged changes and generate a concise commit message:
- Summarize the nature of the changes (feature, fix, refactor, docs, etc.)
- Focus on the "why" rather than the "what"
- Keep it to 1-2 sentences max

## Step 5: Create Commit

Create the commit with the generated message:

```bash
git commit -m "$(cat <<'EOF'
[Generated commit message here]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

## Step 6: Verify

Run `git status` to confirm the commit was created successfully.

Report the commit hash and message to the user.
