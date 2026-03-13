#!/usr/bin/env bash
# Run after file edit to auto-fix format and lint issues.
# Runs from repo root when invoked by Cursor.
set -e
cd "$(git rev-parse --show-toplevel)"
pnpm exec prettier --write . 2>/dev/null || true
pnpm exec eslint . --fix 2>/dev/null || true
