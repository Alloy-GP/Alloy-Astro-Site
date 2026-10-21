#!/usr/bin/env node
// scripts/gsc-bq.mjs — query the Search Console BigQuery export from anywhere the credentials exist (your Mac),
// without gcloud or the MCP server. Mints a read-only token from the service-account key and calls the REST API.
//   node scripts/gsc-bq.mjs                      → collections-cluster report (clicks/impressions/queries) for alloygp.co
//   node scripts/gsc-bq.mjs "SELECT … FROM T"    → any SQL; `T` expands to the alloygp.co url-impression table
// Credentials: GSC_BIGQUERY_PROJECT + GOOGLE_APPLICATION_CREDENTIALS_B64 from the environment or ~/.conductor/secrets.env.
// Datasets in the export: searchconsole (cmgt.org), searchconsole_alloygp, _conductor, _cpe, _edison, _innovia, _keyscaldwell, _matchhoa, _tidewater.
import { createSign } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';

const envFile = `${process.env.HOME}/.conductor/secrets.env`;
const fileEnv = existsSync(envFile) ? Object.fromEntries(readFileSync(envFile, 'utf8').split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).replace(/^export /, '').trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; })) : {};
const get = (k) => process.env[k] || fileEnv[k];
const project = get('GSC_BIGQUERY_PROJECT'); const b64key = get('GOOGLE_APPLICATION_CREDENTIALS_B64');
if (!project || !b64key) { console.error('Need GSC_BIGQUERY_PROJECT and GOOGLE_APPLICATION_CREDENTIALS_B64 (env or ~/.conductor/secrets.env).'); process.exit(2); }
const sa = JSON.parse(Buffer.from(b64key, 'base64').toString('utf8'));
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url'); const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/bigquery.readonly', aud: sa.token_uri, iat: now, exp: now + 3600 })}`;
const sig = createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url');
const tok = await (await fetch(sa.token_uri, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${unsigned}.${sig}` })).json();
if (!tok.access_token) { console.error('token error:', JSON.stringify(tok).slice(0, 300)); process.exit(1); }
const H = { authorization: `Bearer ${tok.access_token}`, 'content-type': 'application/json' };
const T = `\`${project}.searchconsole_alloygp.searchdata_url_impression\``;
const q = async (sql) => { const r = await (await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${project}/queries`, { method: 'POST', headers: H, body: JSON.stringify({ query: sql.replaceAll(/\bT\b/g, T), useLegacySql: false, maxResults: 500 }) })).json(); if (r.error) throw new Error(r.error.message); const f = (r.schema?.fields || []).map((x) => x.name); return (r.rows || []).map((row) => Object.fromEntries(row.f.map((c, i) => [f[i], c.v]))); };
const table = (rows) => { if (!rows.length) return console.log('  (no rows)'); const cols = Object.keys(rows[0]); const w = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c] ?? '').length))); console.log('  ' + cols.map((c, i) => c.padEnd(w[i])).join('  ')); for (const r of rows) console.log('  ' + cols.map((c, i) => String(r[c] ?? '').padEnd(w[i])).join('  ')); };

if (process.argv[2]) { table(await q(process.argv[2])); process.exit(0); }
const since = process.argv[3] || '2026-10-13';
console.log('export freshness:', JSON.stringify((await q(`SELECT MIN(data_date) earliest, MAX(data_date) latest FROM T`))[0]));
console.log(`\n=== /resources/collections pages since ${since} ===`);
table(await q(`SELECT REPLACE(url, 'https://alloygp.co', '') page, SUM(clicks) clicks, SUM(impressions) impressions, ROUND(SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1, 1) avg_position, MIN(data_date) first_seen, MAX(data_date) last_seen FROM T WHERE data_date >= '${since}' AND url LIKE '%/resources/collections%' GROUP BY page ORDER BY impressions DESC`));
console.log(`\n=== queries hitting the cluster ===`);
table(await q(`SELECT query, REPLACE(url, 'https://alloygp.co', '') page, SUM(clicks) clicks, SUM(impressions) impressions, ROUND(SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1, 1) pos FROM T WHERE data_date >= '${since}' AND url LIKE '%/resources/collections%' AND query IS NOT NULL GROUP BY query, page ORDER BY impressions DESC LIMIT 25`));
console.log(`\n=== alloygp.co, same window, top pages ===`);
table(await q(`SELECT REPLACE(url, 'https://alloygp.co', '') page, SUM(clicks) clicks, SUM(impressions) impressions FROM T WHERE data_date >= '${since}' GROUP BY page ORDER BY impressions DESC LIMIT 10`));
