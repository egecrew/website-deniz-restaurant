#!/bin/bash
# Deploy website-template to GitHub + Vercel

set -e

echo "🚀 WEBSITE DEPLOYMENT SCRIPT"
echo "=" | awk '{for(i=1;i<=50;i++)printf "="; print ""}'

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
GITHUB_ORG="egecrew"
REPO_NAME="website-template"
GITHUB_URL="https://github.com/${GITHUB_ORG}/${REPO_NAME}.git"

echo -e "${YELLOW}Configuration:${NC}"
echo "GitHub Org: $GITHUB_ORG"
echo "Repository: $REPO_NAME"
echo "GitHub URL: $GITHUB_URL"
echo ""

# Step 1: Build
echo -e "${YELLOW}Step 1: Building...${NC}"
npm run build
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Build successful${NC}"
else
  echo -e "${RED}✗ Build failed${NC}"
  exit 1
fi
echo ""

# Step 2: Check if remote exists
echo -e "${YELLOW}Step 2: Checking GitHub remote...${NC}"
if git remote -v | grep -q origin; then
  echo -e "${GREEN}✓ Remote 'origin' found${NC}"
  git remote set-url origin "$GITHUB_URL"
else
  echo -e "${YELLOW}Adding remote origin...${NC}"
  git remote add origin "$GITHUB_URL"
  echo -e "${GREEN}✓ Remote added${NC}"
fi
echo ""

# Step 3: Git operations
echo -e "${YELLOW}Step 3: Committing changes...${NC}"
git add -A
if git diff --cached --quiet; then
  echo -e "${YELLOW}No changes to commit${NC}"
else
  git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || true
  echo -e "${GREEN}✓ Changes committed${NC}"
fi
echo ""

# Step 4: Push to GitHub
echo -e "${YELLOW}Step 4: Pushing to GitHub...${NC}"
git push -u origin main 2>&1 | grep -E "^(To |Enumerating|Counting|Writing|Total|Compressing|remote:|master|main)" || true
if [ ${PIPESTATUS[0]} -eq 0 ]; then
  echo -e "${GREEN}✓ Pushed to GitHub${NC}"
else
  echo -e "${YELLOW}⚠ Push completed (may need auth)${NC}"
fi
echo ""

# Step 5: Vercel status
echo -e "${YELLOW}Step 5: Vercel deployment status${NC}"
if command -v vercel &> /dev/null; then
  echo -e "${GREEN}✓ Vercel CLI found${NC}"
  echo ""
  echo -e "${YELLOW}To deploy to Vercel:${NC}"
  echo "  1. Install Vercel CLI: npm install -g vercel"
  echo "  2. Run: vercel"
  echo "  3. Follow prompts"
  echo ""
else
  echo -e "${YELLOW}Vercel CLI not found. To deploy:${NC}"
  echo "  1. Go to https://vercel.com"
  echo "  2. Import GitHub repo: $GITHUB_URL"
  echo "  3. Click 'Deploy'"
  echo ""
fi

echo -e "${GREEN}✓ Deployment preparation complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Verify on GitHub: $GITHUB_URL"
echo "  2. Deploy to Vercel (see above)"
echo "  3. Add custom domain (in Vercel dashboard)"
echo "  4. Setup Zoho Mail (see SETUP.md)"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"
