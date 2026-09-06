// Pushes ONLY name_en / name_zh / note from data/places.json to Supabase.
//
// Deliberately not seed.mjs: that upserts whole rows, so it would also reset
// `visited` flags people have toggled on the live site since the last seed.
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n').filter(l => l.includes('=')).map(l => {
      const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)];
    }));

const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const { places } = JSON.parse(readFileSync(new URL('../data/places.json', import.meta.url), 'utf8'));

let changed = 0;
for (const p of places) {
  const res = await fetch(`${URL_}/rest/v1/places?id=eq.${encodeURIComponent(p.id)}`, {
    method: 'PATCH',
    headers: {
      apikey: KEY, Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json', Prefer: 'return=minimal',
    },
    body: JSON.stringify({ name_en: p.name_en, name_zh: p.name_zh, note: p.note }),
  });
  if (!res.ok) { console.error('failed', p.id, res.status, await res.text()); process.exit(1); }
  changed++;
}
console.log(`patched ${changed} rows`);
