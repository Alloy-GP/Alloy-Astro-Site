#!/usr/bin/env bash
# MCP stdio launcher for the Search Console BigQuery export (Google MCP Toolbox, prebuilt "bigquery" tools).
# Referenced from .mcp.json so the command is portable (Claude Code does not expand ${HOME} in "command").
# Secrets: exports from .secrets/mcp.env (gitignored) are loaded if present, then the environment wins.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
if [ -f "$ROOT/.secrets/mcp.env" ]; then set -a; . "$ROOT/.secrets/mcp.env"; set +a; fi
: "${GOOGLE_APPLICATION_CREDENTIALS:=$ROOT/.secrets/gcp-service-account.json}"
# Cloud workspaces can't carry files, only variables: if the key arrives base64-encoded (GOOGLE_APPLICATION_CREDENTIALS_B64),
# materialise it once into .secrets/ (gitignored) so the Toolbox can read it.
if [ ! -s "$GOOGLE_APPLICATION_CREDENTIALS" ] && [ -n "${GOOGLE_APPLICATION_CREDENTIALS_B64:-}" ]; then
  mkdir -p "$(dirname "$GOOGLE_APPLICATION_CREDENTIALS")"
  printf '%s' "$GOOGLE_APPLICATION_CREDENTIALS_B64" | base64 -d > "$GOOGLE_APPLICATION_CREDENTIALS" && chmod 600 "$GOOGLE_APPLICATION_CREDENTIALS"
fi
export GOOGLE_APPLICATION_CREDENTIALS
export BIGQUERY_PROJECT="${BIGQUERY_PROJECT:-${GSC_BIGQUERY_PROJECT:-}}"
BIN="${TOOLBOX_BIN:-$HOME/.local/bin/toolbox}"
command -v "$BIN" >/dev/null 2>&1 || BIN="$(command -v toolbox || true)"
# Cloud sandboxes don't always run the Conductor setup script: fetch the pinned Toolbox release ourselves if it is missing.
if [ -z "$BIN" ] || [ ! -x "$BIN" ]; then
  BIN="$HOME/.local/bin/toolbox"; mkdir -p "$(dirname "$BIN")"
  URL="https://storage.googleapis.com/mcp-toolbox-for-databases/v1.13.1/$(uname -s | tr '[:upper:]' '[:lower:]')/$( [ "$(uname -m)" = x86_64 ] && echo amd64 || echo arm64)/toolbox"
  echo "toolbox binary not found; downloading $URL" >&2
  curl -sL --max-time 180 -o "$BIN" "$URL" && chmod +x "$BIN" || { echo "toolbox download failed" >&2; exit 127; }
fi
# Fail loudly with the real reason instead of letting the server die silently ("Connection closed").
if [ -z "${BIGQUERY_PROJECT}" ]; then
  echo "BigQuery MCP: GSC_BIGQUERY_PROJECT is not set (expected in .secrets/mcp.env or the workspace environment)." >&2; exit 2
fi
if [ ! -s "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
  echo "BigQuery MCP: no service-account key at $GOOGLE_APPLICATION_CREDENTIALS and GOOGLE_APPLICATION_CREDENTIALS_B64 is not set." >&2; exit 2
fi
exec "$BIN" --prebuilt bigquery --stdio
