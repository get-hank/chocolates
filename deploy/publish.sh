#! /bin/bash
# only works when run from project root
set -eo pipefail

yarn build

if [ "$1" = "alpha" ]; then
  VERSION=$(node deploy/version.js)
  ALPHA_VERSION="$VERSION-alpha-$(git rev-parse --short=8 HEAD)"
  yarn publish --non-interactive --new-version "$ALPHA_VERSION" --no-git-tag-version --no-commit-hooks
  # reset value in package.json
  yarn version --non-interactive --new-version "$VERSION" --no-git-tag-version --no-commit-hooks
  echo "Version $ALPHA_VERSION published"
  exit 0
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Git working directory unclean, cannot release"
  exit 1
fi

if [ -z "$1" ]; then
  echo "Must specify one of 'major', 'minor', or 'patch'"
  exit 1
fi

yarn publish --non-interactive "--${1}"
echo "Version $(node deploy/version.js) published"
