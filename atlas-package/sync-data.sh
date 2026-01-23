#!/bin/bash

# Sync data files from /data/ to /atlas-package/src/data/
# This script is useful for local testing before pushing to GitHub

echo "🔄 Syncing data files..."
echo ""

# Get the project root (parent of atlas-package)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Copy all .ts files from data/ to atlas-package/src/data/
cp -v "$PROJECT_ROOT/data/"*.ts "$PROJECT_ROOT/atlas-package/src/data/"

echo ""
echo "✓ Data files synced successfully!"
echo ""
echo "You can now:"
echo "  1. Test the package locally: npm run build"
echo "  2. Or push to GitHub to trigger automated publishing"
