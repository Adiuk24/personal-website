// Receives booking requests from the chat panel and records them as a
// Netlify Form submission ("booking") so Arif gets an email notification.
const ALLOWED_ORIGINS = ['https://arifadito.com', 'https://www.arifadito.com', 'http://localhost:3000'];

export default async (req) => {
  const origin = req.headers.get('origin') || '';
  const cors = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

  let b;
  try { b = await req.json(); } catch { return json({ error: 'bad json' }, 400, cors); }

  const name = String(b.name || '').trim().slice(0, 120);
  const email = String(b.email || '').trim().slice(0, 200);
  const company = String(b.company || '').trim().slice(0, 200);
  const topic = String(b.topic || '').trim().slice(0, 300);
  const preferred_time = String(b.preferred_time || '').trim().slice(0, 200);
  const notes = String(b.notes || '').trim().slice(0, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'name and a valid email are required' }, 400, cors);
  }

  // ponytail: FormSubmit forwards to Gmail with no account/credentials.
  // Swap for the self-hosted Cal.com fork when that ships.
  const r = await fetch('https://formsubmit.co/ajax/adittoarif@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `Booking request from ${name} — arifadito.com`,
      _template: 'table',
      name, email, company, topic, preferred_time, notes,
    }),
  });

  if (!r.ok) return json({ error: `mail relay failed ${r.status}` }, 502, cors);
  return json({ ok: true }, 200, cors);
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...cors } });
}
