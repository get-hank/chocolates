#! /bin/bash
set -eo pipefail

VERSION="$(node ./version.js)"
if [ "$1" = "alpha" ]; then
  PUBLISH_VERSION=$VERSION
elif [ -n "$(git status --porcelain)" ]; then
  echo "Git working directory unclean, cannot release"
  exit 1
fi

GIT_SHORT_SHA=$(git rev-parse --short=8 HEAD)
PUBLISH_VERSION="$VERSION-alpha-$GIT_SHORT_SHA"
yarn publish --non-interactive --new-version "$PUBLISH_VERSION"
