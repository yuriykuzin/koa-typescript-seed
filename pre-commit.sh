#!/bin/sh
#
# Installation guideline:
# cd ./.git/hooks
# ln -s ../../pre-commit.sh pre-commit && chmod +x pre-commit
# cd ../..

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo "${YELLOW}Running Linters:${NC}"

tsfiles=$(git diff --cached --name-only --diff-filter=ACM "*.ts" | tr '\n' ' ')

if [ -n "$tsfiles" ]; then
  # Prettify all staged .ts files
  echo "$tsfiles" | xargs ./node_modules/.bin/prettier --write

  # Add back the modified/prettified files to staging
  echo "$tsfiles" | xargs git add

  echo "${GREEN}Prettier is done.${NC}"
fi

npm run tslint && echo "${GREEN}All fine!${NC}"
RESULT=$?;

exit $RESULT;
