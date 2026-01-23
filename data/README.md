# Atlas Data Files

**This directory is the authoritative source for all Atlas data.**

## Important

- ✅ **Edit files here** - This is the single source of truth
- ❌ **Don't edit `/atlas-package/src/data/`** - These are auto-synced copies

## How It Works

When you push changes to files in this directory to GitHub:

1. GitHub Actions detects changes to `data/**`
2. Workflow automatically syncs files to `/atlas-package/src/data/`
3. Synced files are committed back to the repo
4. Package is built and published to npm with latest data

## Files

- `ai_tasks.ts` - AI interaction patterns (generating, analyzing, recommending, etc.)
- `human_tasks.ts` - Human actions (uploading, selecting, approving, etc.)
- `system_tasks.ts` - System operations (validating, logging, routing, etc.)
- `artifacts.ts` - Data types (text, images, structured data, etc.)
- `constraints.ts` - System constraints (latency, privacy, cost, etc.)
- `touchpoints.ts` - Interaction surfaces (web UI, API, voice, etc.)
- `templates.ts` - Workflow templates
- `examples.ts` - Example use cases
- `layers.ts` - 4-layer architecture (Inbound, Internal, Outbound, Feedback)
- `meta.ts` - Atlas metadata

## Local Testing

To test changes locally before pushing:

```bash
cd atlas-package
./sync-data.sh
npm run build
```

## More Info

See `/atlas-package/NPM_SETUP.md` for full details on the automated publishing workflow.
