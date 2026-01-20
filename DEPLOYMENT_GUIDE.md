# Atlas Repo Deployment Guide

## What You Have

The complete Atlas repository is ready at: `/tmp/ai-interaction-atlas/`

**Contents:**
- ✅ All Atlas components and pages
- ✅ Landing page + Rationale page (new versions)
- ✅ All data files (JSON)
- ✅ Updated links (quietloudlab GitHub, brandon@quietloudlab.com)
- ✅ No Canvas code
- ✅ No /framework or /workshop routes
- ✅ README, LICENSE (MIT), .gitignore, .env.example
- ✅ Clean App.tsx with only Atlas routes

**Size:** ~6MB (without node_modules)
**Files:** 34 TypeScript files

---

## Step-by-Step Deployment

### **Step 1: Create Public GitHub Repo (5 min)**

1. Go to https://github.com/new
2. Repository name: `ai-interaction-atlas`
3. Description: "A shared language for designing AI experiences"
4. **Public** repository
5. **Do NOT** initialize with README (we have one)
6. Click "Create repository"

---

### **Step 2: Push Atlas Files to GitHub (5 min)**

```bash
cd /tmp/ai-interaction-atlas

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: AI Interaction Atlas

- Atlas taxonomy with AI/Human/System tasks
- Data artifacts, constraints, touchpoints
- Landing page and rationale
- Open source under MIT License"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/quietloudlab/ai-interaction-atlas.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### **Step 3: Test Locally (15 min)**

**Before deploying, let's make sure it builds:**

```bash
cd /tmp/ai-interaction-atlas

# Install dependencies
npm install

# Run dev server
npm run dev
```

**Test checklist:**
- [ ] Navigate to http://localhost:5173/
- [ ] Landing page loads
- [ ] Click "View the Atlas" → Atlas loads
- [ ] Click "Read the rationale" → Rationale page loads
- [ ] Browse AI Tasks, Human Tasks, System Tasks
- [ ] Check Data, Constraints, Touchpoints pages
- [ ] No console errors
- [ ] No TypeScript errors

**Build for production:**
```bash
npm run build
```

Should complete without errors.

---

### **Step 4: Deploy to Netlify (20 min)**

**Why Netlify:** Simple, free, great for static sites, easy custom domain setup.

**Option A: Deploy via Netlify UI (Easiest)**

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your repos
5. Select `quietloudlab/ai-interaction-atlas`
6. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Branch:** `main`
7. Click "Deploy site"

**Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd /tmp/ai-interaction-atlas
netlify deploy --prod

# Follow prompts:
# - Create & configure new site
# - Build command: npm run build
# - Publish directory: dist
```

**After deployment:**
- You'll get a URL like: `https://ai-interaction-atlas.netlify.app/`
- Test it thoroughly before pointing your domain to it

---

### **Step 5: Configure DNS (15 min)**

**You said you have `ai-interaction.com` on Porkbun, right?**

1. **Get Netlify's DNS target:**
   - In Netlify dashboard → Site settings → Domain management
   - Click "Add custom domain"
   - Enter `ai-interaction.com`
   - Netlify will give you DNS records to add

2. **Update Porkbun DNS:**
   - Login to Porkbun
   - Go to DNS settings for `ai-interaction.com`
   - Add the records Netlify provided:
     - Usually an `A` record pointing to Netlify's IP
     - Or a `CNAME` record pointing to `your-site.netlify.app`
   - **Note:** DNS changes can take 5-60 minutes to propagate

3. **Enable HTTPS:**
   - Netlify will automatically provision SSL certificate
   - This happens after DNS propagates
   - Usually takes 10-30 minutes

4. **Test:**
   - Once DNS propagates, visit `https://ai-interaction.com/`
   - Should show your Atlas landing page

**Need help with DNS?** Let me know and I'll walk you through the specific steps for Porkbun.

---

### **Step 6: Roll Back Main Repo (15 min)**

**ONLY do this AFTER Atlas is deployed and working.**

```bash
# Navigate to your main repo
cd "/Users/brandonharwood/Documents/Documents - quietloudlab/Projects/AI-Atlas/dev/ai-atlas"

# Tag current state (safety net)
git tag pre-atlas-split

# Find the commit before UI changes (check git log)
git log --oneline | head -20

# Look for the commit BEFORE "Landing page rewrite" or similar
# Let's say it's commit hash abc123

# Option A: Revert specific commits (safer)
git revert HEAD~10..HEAD  # Adjust number based on commits to undo

# Option B: Reset to specific commit (cleaner but more aggressive)
# git reset --hard abc123

# Push to trigger Vercel redeploy
git push origin main

# If using reset (Option B), you'll need force push:
# git push --force origin main
```

**Verify:**
- Check Vercel dashboard - new deployment should trigger
- Once deployed, test the tester URL
- Confirm testers can still access Canvas

**If something breaks:**
```bash
# Return to tagged state
git reset --hard pre-atlas-split
git push --force origin main
```

---

## Environment Variables

**For Netlify deployment:**

1. In Netlify dashboard → Site settings → Build & deploy → Environment variables
2. Add any needed variables from `.env.example`
3. Redeploy if you add variables

**You probably don't need these for initial launch** (analytics/error tracking can come later).

---

## Post-Launch Checklist

After everything is live:

- [ ] `ai-interaction.com` shows Atlas landing page
- [ ] All routes work (`/`, `/rationale`, `/atlas`, `/atlas/ai`, etc.)
- [ ] GitHub link in footer goes to correct repo
- [ ] Email link uses `brandon@quietloudlab.com`
- [ ] No broken links
- [ ] Mobile responsive
- [ ] HTTPS working
- [ ] Testers' environment still functional (main repo)

---

## Troubleshooting

**Build fails on Netlify:**
- Check build logs in Netlify dashboard
- Usually missing dependency or environment variable
- Test build locally first: `npm run build`

**DNS not propagating:**
- Use https://dnschecker.org/ to check status
- Can take up to 24 hours (usually much faster)
- Make sure you added correct records from Netlify

**TypeScript errors:**
- Run `npx tsc --noEmit` locally
- Fix errors before deploying

**404 on routes:**
- Netlify needs a `_redirects` file for SPA routing
- Add file: `/tmp/ai-interaction-atlas/public/_redirects`
- Contents: `/*  /index.html  200`

---

## What's Next

After Atlas is live:

1. Share on Twitter/LinkedIn
2. Post to design communities
3. Watch for GitHub issues/PRs
4. Set up sync automation (later)
5. Continue Canvas development in main repo

---

## Need Help?

If you hit any issues:
1. Check the error message
2. Test locally first
3. Ask me - I'll help debug

**You've got this!** The hard part (extraction) is done. Now it's just execution.
