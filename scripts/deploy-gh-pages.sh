#!/usr/bin/env bash
# Deploy dist/ to GitHub Pages without hitting E2BIG (argument list too long).
# Use: npm run build && ./scripts/deploy-gh-pages.sh
set -e
REPO=$(git config --get remote.origin.url)
BRANCH=gh-pages
ROOT=$(git rev-parse --show-toplevel)
CLONE=$(mktemp -d)

cd "$ROOT"
[ -d dist ] || { echo "Run 'npm run build' first."; exit 1; }

if git ls-remote --exit-code --heads "$REPO" "$BRANCH" 2>/dev/null; then
  git clone --branch "$BRANCH" --single-branch --depth 1 "$REPO" "$CLONE"
  cd "$CLONE"
  # Remove all tracked files (batch by top-level to avoid E2BIG)
  find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
else
  git clone --depth 1 "$REPO" "$CLONE"
  cd "$CLONE"
  git checkout --orphan "$BRANCH"
  # Remove all files except .git (avoid git rm - long list causes E2BIG)
  find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
fi

# Copy only dist contents into clone root
cp -r "$ROOT/dist"/* .
touch .nojekyll
git add -A
git diff --staged --quiet && echo "No changes to deploy." || git commit -m "Deploy to GitHub Pages"
git push "$REPO" "$BRANCH" --force
cd "$ROOT"
rm -rf "$CLONE"
echo "Deployed to $BRANCH"
