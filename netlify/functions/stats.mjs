import { getStore } from '@netlify/blobs';

// Admin read-only endpoint. Requires ADMIN_TOKEN; without it, returns 401 rather
// than exposing visitor data or chat transcripts.
const ALLOWED_ORIGINS = ['https://arifadito.com', 'https://www.arifadito.com', 'http://localhost:3000'];

export default async (req) => {
  const origin = req.headers.get('origin') || '';
  const cors = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-token',
  };
  if (req.method === 'OPTIONS') return new Response('', { status: 204, headers: cors });

  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return json({ error: 'ADMIN_TOKEN not configured on the server' }, 500, cors);
  if (req.headers.get('x-admin-token') !== expected) {
    return json({ error: 'unauthorized' }, 401, cors);
  }

  const days = Math.min(Number(new URL(req.url).searchParams.get('days') || 30), 90);
  const analytics = getStore('analytics');
  const chats = getStore('chats');

  const daily = [];
  let totalViews = 0;
  const paths = {}, refs = {}, countries = {};

  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    const rec = await analytics.get(d, { type: 'json' });
    if (!rec) { daily.push({ date: d, views: 0 }); continue; }
    daily.push({ date: d, views: rec.views });
    totalViews += rec.views;
    for (const [k, v] of Object.entries(rec.paths || {})) paths[k] = (paths[k] || 0) + v;
    for (const [k, v] of Object.entries(rec.refs || {})) refs[k] = (refs[k] || 0) + v;
    for (const [k, v] of Object.entries(rec.countries || {})) countries[k] = (countries[k] || 0) + v;
  }

  const { blobs } = await chats.list();
  const recent = blobs.map(b => b.key).sort().reverse().slice(0, 40);
  const conversations = [];
  for (const key of recent) {
    const c = await chats.get(key, { type: 'json' });
    if (c) conversations.push({ id: key, ...c });
  }

  const top = obj => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 12);

  return json({
    totalViews,
    daily: daily.reverse(),
    topPaths: top(paths),
    topReferrers: top(refs),
    topCountries: top(countries),
    conversationCount: blobs.length,
    conversations,
  }, 200, cors);
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors },
  });
}
