# NPM Package Publishing Setup

This guide covers how to set up automated publishing to npm for the AI Interaction Atlas package.

## Overview

The package uses **npm provenance** for secure, automated publishing from GitHub Actions. This is the modern, recommended approach that provides transparency about package origin.

---

## One-Time Setup

### 1. Create npm Account & Enable 2FA

1. Create an account at https://www.npmjs.com/signup (if you don't have one)
2. Enable 2FA (Two-Factor Authentication) - **required for automation tokens**
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/profile
   - Click "Enable 2FA"
   - Use an authenticator app (Google Authenticator, Authy, etc.)

### 2. Create Granular Access Token

npm now requires **granular tokens** with 90-day expiration:

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens/granular-access-tokens/new
2. Configure the token:
   - **Token name:** `ai-interaction-atlas-github-actions`
   - **Expiration:** 90 days (maximum)
   - **Packages and scopes:**
     - Select: "Read and write"
     - Choose: `@quietloudlab/ai-interaction-atlas` (or "All packages" if publishing for the first time)
   - **Organizations:** (leave empty unless needed)
   - **IP ranges:** (leave empty - GitHub Actions IPs change)
3. Click "Generate token"
4. **Copy the token immediately** - you won't see it again!

### 3. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings → Secrets and variables → Actions**
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

### 4. First Publish (Manual)

The first time you publish, do it manually to register the package:

```bash
cd atlas-package

# Login to npm (you'll need your 2FA code)
npm login

# Publish without provenance (local publishing doesn't support it)
npm publish --access public
```

**Note:** When publishing locally, don't use the `--provenance` flag - it only works in GitHub Actions. After the first manual publish, the GitHub Action can handle future updates with provenance.

---

## How Automated Publishing Works

### Triggers

The GitHub Action automatically publishes when you push changes to:
- **`data/**`** - Any changes to source data files (the authoritative source)
- **`atlas-package/**`** - Any direct changes to the package directory

This makes the repository the authoritative source for both the data and the package.

### Data Sync Process

**Important:** You should only edit files in `/data/` directory. The workflow automatically syncs them to the package.

1. **Edit Source Data:** Make changes to files in `/data/` (e.g., `ai_tasks.ts`, `human_tasks.ts`)
2. **Push to GitHub:** Push your changes to the `main` branch
3. **Auto-Sync:** Workflow copies files from `/data/` to `/atlas-package/src/data/`
4. **Auto-Commit:** Synced files are committed back to the repo
5. **Build & Publish:** Package is built with latest data and published to npm

**Key Benefits:**
- ✅ Single source of truth: `/data/` directory
- ✅ No manual copying needed
- ✅ npm package always has latest data
- ✅ Other apps can stay in sync by updating the npm package

### Publishing Process

1. **Sync Data:** Copies files from `/data/` to `/atlas-package/src/data/`
2. **Commit Sync:** Commits synced files back to repo (if changes detected)
3. **Build:** Compiles TypeScript to ESM + CJS
4. **Validate Authentication:** Verifies npm token is valid
5. **Validate Package:** Runs `npm pack --dry-run` to check package integrity
6. **Version Check:** Checks if current version exists on npm
7. **Version Bump:** Auto-increments patch version if needed (1.0.0 → 1.0.1)
8. **Test Publish:** Runs `npm publish --dry-run` to catch errors early
9. **Publish:** Publishes to npm with provenance
10. **Tag:** Creates git tag and GitHub release
11. **Summary:** Generates workflow summary with package details

### Provenance

The `--provenance` flag:
- ✅ Adds cryptographic proof of package origin
- ✅ Shows GitHub Actions workflow that built it
- ✅ Makes supply chain transparent
- ✅ Increases trust for package consumers

---

## Local Testing (Optional)

If you want to test the package locally before pushing to GitHub:

```bash
# 1. Sync data files from /data/ to package
cd atlas-package
./sync-data.sh

# 2. Build the package
npm run build

# 3. Test locally (optional)
npm pack  # Creates a tarball you can install elsewhere

# 4. When ready, commit and push
git add .
git commit -m "feat: update atlas data"
git push origin main
```

The `sync-data.sh` script does the same sync that GitHub Actions performs, allowing you to test changes locally first.

---

## Token Maintenance

### Token Expiration (Every 90 Days)

Granular tokens expire after 90 days. You'll need to:

1. **Get notified:** npm will email you before expiration
2. **Create new token:** Follow step 2 above
3. **Update GitHub secret:** Replace `NPM_TOKEN` with new token
4. **No code changes needed:** The workflow keeps working

### Quick Token Renewal Steps

When your token expires (or you see "All jobs have failed" notifications):

1. **Create New Token (5 minutes):**
   - Open **incognito browser window** to avoid Apple autofill issues
   - Go to: https://www.npmjs.com/settings/YOUR_USERNAME/tokens/granular-access-tokens/new
   - Name: `ai-interaction-atlas-github-actions-YYYY-MM-DD` (include date for tracking)
   - Expiration: 90 days
   - Packages: Read and write for `@quietloudlab/ai-interaction-atlas`
   - Generate and copy token

2. **Update GitHub Secret (2 minutes):**
   - Go to: https://github.com/quietloudlab/ai-interaction-atlas/settings/secrets/actions
   - Click on `NPM_TOKEN`
   - Click "Update secret"
   - Paste new token
   - Save

3. **Test the Workflow:**
   - Make a small change to `atlas-package/README.md`
   - Commit and push
   - Check Actions tab for successful publish

4. **Document Expiration Date:**
   - Add a calendar reminder for 80 days from today
   - Or update this file with next renewal date: `<!-- Next renewal: [DATE] -->`

### Current Token Info

<!-- Last renewed: 2026-01-23 -->
<!-- Next renewal due: 2026-04-23 (90 days) -->
<!-- Token type: Automation token with 2FA bypass for CI/CD -->

---

## Manual Publishing (If Needed)

To publish manually (bypassing GitHub Actions):

```bash
cd atlas-package

# Make sure dependencies are installed
npm install

# Build the package
npm run build

# Publish WITHOUT provenance (local publishing doesn't support it)
npm publish --access public
```

**Important:** The `--provenance` flag ONLY works in GitHub Actions, not local publishing. Provenance requires a CI/CD environment to cryptographically sign the package. When publishing locally, omit this flag.

If you see the error:
```
npm error Automatic provenance generation not supported for provider: null
```

Remove the `--provenance` flag and try again with just `npm publish --access public`.

---

## Troubleshooting

### Apple/iPhone 2FA Autofill Issues

**Problem:** When setting up 2FA or creating a token, Apple devices automatically try to use password autofill or camera instead of letting you use Google Authenticator.

**Solution - Option 1: Use Incognito/Private Mode:**
1. Open an **Incognito/Private browser window** (⌘+Shift+N in Chrome/Safari)
2. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens/granular-access-tokens/new
3. This prevents Apple autofill from interfering
4. When prompted for 2FA:
   - Open Google Authenticator app separately
   - Manually type the 6-digit code from the app
   - Don't let iOS suggest autofill

**Solution - Option 2: Use a Different Browser:**
1. If you normally use Safari, try Chrome or Firefox
2. Make sure you're not signed into iCloud in that browser
3. This reduces Apple's interference with the 2FA flow

**Solution - Option 3: Desktop Computer Only:**
1. If possible, use a desktop/laptop computer (not iPhone/iPad)
2. Keep your phone nearby for Google Authenticator codes
3. Manually type codes instead of using camera scan

**Pro Tip:** After initial 2FA setup, the token creation process is straightforward and doesn't require additional 2FA prompts.

### "Automatic provenance generation not supported for provider: null"

**Problem:** You're trying to use `--provenance` flag when publishing locally.

**Solution:** Remove the `--provenance` flag. It only works in GitHub Actions, not local publishing.

```bash
# ❌ Wrong (local)
npm publish --provenance --access public

# ✅ Correct (local)
npm publish --access public
```

Provenance is automatically added when publishing via GitHub Actions.

### "Invalid authentication token"

- Token expired (check expiration date)
- Token was revoked
- Solution: Create new token and update GitHub secret

### "You must sign in to publish packages"

- Token doesn't have write permissions
- Solution: Create new token with "Read and write" access

### "Package name already exists"

- First publish must be done manually
- Solution: Run `npm publish --provenance --access public` locally once

### "Provenance generation failed"

- Missing `id-token: write` permission in workflow
- Solution: Already configured in the workflow (see line 13)

---

## Security Best Practices

✅ **DO:**
- Enable 2FA on your npm account
- Use granular tokens (not classic tokens)
- Set token expiration to maximum (90 days)
- Restrict token to specific packages
- Store tokens in GitHub Secrets (never in code)

❌ **DON'T:**
- Share tokens in chat/email
- Commit tokens to git
- Use personal access tokens for CI/CD
- Disable 2FA

---

## Package Info

- **Package name:** `@quietloudlab/ai-interaction-atlas`
- **npm URL:** https://www.npmjs.com/package/@quietloudlab/ai-interaction-atlas
- **Workflow file:** `.github/workflows/publish-npm-package.yml`
- **Current version:** Check `atlas-package/package.json`

---

## Resources

- [npm Granular Access Tokens](https://docs.npmjs.com/about-access-tokens)
- [npm Provenance](https://docs.npmjs.com/generating-provenance-statements)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
