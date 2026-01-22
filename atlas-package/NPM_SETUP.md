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

# Publish with provenance
npm publish --provenance --access public
```

This creates the package on npm and allows the GitHub Action to update it.

---

## How Automated Publishing Works

### Triggers

The GitHub Action automatically publishes when you push changes to:
- `data/**` - Any data files
- `types.ts` - Type definitions
- `data.ts` - Data aggregation file
- `atlas-package/**` - Package files

### Process

1. **Build:** Compiles TypeScript to ESM + CJS
2. **Version Check:** Checks if current version exists on npm
3. **Version Bump:** Auto-increments patch version if needed (1.0.0 → 1.0.1)
4. **Publish:** Publishes to npm with provenance
5. **Tag:** Creates git tag and GitHub release

### Provenance

The `--provenance` flag:
- ✅ Adds cryptographic proof of package origin
- ✅ Shows GitHub Actions workflow that built it
- ✅ Makes supply chain transparent
- ✅ Increases trust for package consumers

---

## Token Maintenance

### Token Expiration (Every 90 Days)

Granular tokens expire after 90 days. You'll need to:

1. **Get notified:** npm will email you before expiration
2. **Create new token:** Follow step 2 above
3. **Update GitHub secret:** Replace `NPM_TOKEN` with new token
4. **No code changes needed:** The workflow keeps working

### Automation Tip

Set a calendar reminder for 80 days from now to refresh the token before it expires.

---

## Manual Publishing (If Needed)

To publish manually (bypassing GitHub Actions):

```bash
cd atlas-package

# Make sure dependencies are installed
npm install

# Build the package
npm run build

# Publish (you'll need 2FA code)
npm publish --provenance --access public
```

---

## Troubleshooting

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
