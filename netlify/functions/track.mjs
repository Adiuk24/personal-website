import { getStore } from '@netlify/blobs';

// Privacy-first pageview counter: no cookies, no IP stored, no cross-site id.
// Keeps per-day totals plus per-path and per-referrer counts, nothing per-person.
const ALLOWED_ORIGINS = ['https://arifadito.com', 'https://www.arifadito.com', 'http://localhost:3000'];

export default async (req) => {
  const origin = req.headers.get('origin') || '';
  const cors = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') return json({ ok: true }, 200, cors);
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ ok: true }, 200, cors);

  let body = {};
  try { body = await req.json(); } catch { /* count it anyway */ }

  const path = String(body.path || '/').slice(0, 120);
  const ref = String(body.ref || '').slice(0, 160);
  const day = new Date().toISOString().slice(0, 10);
  // Country comes free from the CDN edge; it is coarse and not personal.
  // x-nf-geo may be absent, JSON, or base64-encoded JSON depending on runtime.
  // An unguarded JSON.parse here threw outside the try block and 502'd the whole
  // beacon, so every parse path is defensive and falls back to '??'.
  let country = '??';
  const geoRaw = req.headers.get('x-nf-geo');
  if (geoRaw) {
    for (const candidate of [geoRaw, (() => { try { return atob(geoRaw); } catch { return ''; } })()]) {
      if (!candidate) continue;
      try {
        const parsed = JSON.parse(candidate);
        if (parsed?.country?.code) { country = parsed.country.code; break; }
      } catch { /* try next form */ }
    }
  }

  try {
    const store = getStore('analytics');
    const cur = (await store.get(day, { type: 'json' })) || { views: 0, paths: {}, refs: {}, countries: {} };
    cur.views += 1;
    cur.paths[path] = (cur.paths[path] || 0) + 1;
    if (ref) {
      let host = ref;
      try { host = new URL(ref).hostname; } catch { /* keep raw */ }
      if (!host.includes('arifadito.com')) cur.refs[host] = (cur.refs[host] || 0) + 1;
    }
    cur.countries[country] = (cur.countries[country] || 0) + 1;
    await store.setJSON(day, cur);
  } catch (e) {
    console.error('track failed', e);
  }

  return json({ ok: true }, 200, cors);
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...cors } });
}
