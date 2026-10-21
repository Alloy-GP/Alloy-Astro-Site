# MCP servers for this repo (Claude Code in Conductor)

`.mcp.json` at the repo root declares two project-scope MCP servers. Conductor sessions load it automatically
(use **Refresh status** in the session after changes). The file holds no secrets; it reads environment variables.

| Server | What it is | Needs |
|---|---|---|
| `ahrefs` | Ahrefs remote MCP (`https://api.ahrefs.com/mcp/mcp`, Streamable HTTP) — Site Explorer, Site Audit, Keywords, Rank Tracker | `AHREFS_MCP_KEY` — an **MCP-scoped** key (Ahrefs → Account settings → API keys → *Generate MCP key*; API v3 keys do not work) |
| `bigquery` | Google **MCP Toolbox** binary via `scripts/mcp/bigquery-toolbox.sh` (`toolbox --prebuilt bigquery --stdio`) → Search Console BigQuery export | `GSC_BIGQUERY_PROJECT` (GCP project id) + a service-account JSON with `roles/bigquery.dataViewer` and `roles/bigquery.jobUser`, at `.secrets/gcp-service-account.json` or wherever `GOOGLE_APPLICATION_CREDENTIALS` points |

## Supplying the secrets

**Cloud-only setups (no local checkout):** put everything in one env file on the Mac that creates the workspaces and point Conductor's user setting `environment_variable_files` at it:

```
AHREFS_MCP_KEY=…
GSC_BIGQUERY_PROJECT=alloy-gsc
GOOGLE_APPLICATION_CREDENTIALS_B64=<base64 of the service-account JSON, single line>
```

The BigQuery launcher decodes `GOOGLE_APPLICATION_CREDENTIALS_B64` into `.secrets/gcp-service-account.json` on first run, so no file has to travel with the repo.


Conductor copies gitignored files listed in `.worktreeinclude` (`.env`, `.env.local`, `.secrets/`) into every new workspace, so:

1. Put `gcp-service-account.json` in `.secrets/` of the repository root on your Mac.
2. Put `GSC_BIGQUERY_PROJECT=<project id>` in `.secrets/mcp.env` (the launcher sources it). `AHREFS_MCP_KEY` must be in the agent's environment (shell profile / Conductor env) because it's sent as an HTTP header; where that isn't possible, use the local-scope command below.

For a one-off cloud sandbox where env vars can't be set, register the servers at **local scope** with the literal values instead
(stored in `~/.claude.json`, never in git):

```bash
claude mcp add --transport http ahrefs https://api.ahrefs.com/mcp/mcp -s local -H "Authorization: Bearer <MCP key>"
# bigquery needs no local-scope entry: the launcher reads .secrets/mcp.env + .secrets/gcp-service-account.json
```

The `setup` script in `.conductor/settings.toml` installs the Toolbox binary to `~/.local/bin/toolbox` when missing (`https://storage.googleapis.com/mcp-toolbox-for-databases/v1.13.1/<os>/<arch>/toolbox`).

## Why not the OAuth variants

Both Ahrefs and Google also offer OAuth sign-in (Ahrefs via `/mcp` → Authenticate; Google via the remote
`https://bigquery.googleapis.com/mcp` endpoint). OAuth needs a browser callback, which a headless cloud sandbox
can't complete, so this setup uses the key / service-account paths that work anywhere.


## Cloud workspaces (Conductor sandboxes): why BigQuery shows "Connection closed"

A cloud sandbox is a fresh Linux VM. Nothing from your Mac's `.secrets/`, `.env` or `~/.conductor/secrets.env` is copied
into it (`.worktreeinclude` only applies to local worktrees), and the Conductor `setup` script may not run, so two things
are missing that the launcher needs: the Toolbox binary and the two credential values. Either one makes the MCP server
exit at startup, which Claude Code reports as `CONNECTION_CLOSED`.

Since 2026-10-21 the launcher downloads the binary itself and prints the exact missing credential to stderr. The
credentials still have to arrive as **environment variables** (cloud sandboxes can't receive files):

```bash
# on your Mac, from the repo root, when creating the cloud workspace
conductor workspace create --repo-url https://github.com/Alloy-GP/Alloy-Astro-Site --branch staging --name "…" \
  --env GSC_BIGQUERY_PROJECT=alloy-gsc \
  --env GOOGLE_APPLICATION_CREDENTIALS_B64="$(base64 -i .secrets/gcp-service-account.json | tr -d '\n')" \
  --env AHREFS_MCP_KEY="$(grep AHREFS_MCP_KEY ~/.conductor/secrets.env | cut -d= -f2-)"
```

The launcher decodes the base64 key into `.secrets/gcp-service-account.json` on first run. For an existing cloud
workspace, add the same variables in the workspace's environment settings in the Conductor app, then **Refresh status**
on the MCP server. Verify from inside the sandbox with `bash scripts/mcp/bigquery-toolbox.sh </dev/null` (it should hang
waiting for stdio rather than print an error).
