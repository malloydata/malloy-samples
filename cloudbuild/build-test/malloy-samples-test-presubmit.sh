#!/usr/bin/env sh
set -euxo pipefail

nix-shell --quiet --pure --command "$(cat <<NIXCMD
  cd /workspace
  npm ci --silent
  make -C duckdb/imdb
  npm run lint && npm run test-silent
NIXCMD
)"
