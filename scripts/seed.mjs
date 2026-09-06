// Seeds Supabase from data/places.json. Idempotent: upserts on id.
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n').filter(l => l.includes('=')).map(l => {
      const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)];
    }));

const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const { places } = JSON.parse(readFileSync(new URL('../data/places.json', import.meta.url), 'utf8'));

const rows = places.map(p => ({
  id: p.id, kind: p.kind, name_en: p.name_en, name_zh: p.name_zh,
  category: p.category, region: p.region, area: p.area,
  distance_band: p.distance_band, mrt: p.mrt, address: p.address,
  lat: p.lat, lng: p.lng, geo_precision: p.geo_precision,
  maps_url: p.maps_url, note: p.note, anchor: p.anchor, warn: p.warn || '',
  confidence: p.confidence, source_section: p.source_section,
  added_by: p.added_by, priority: p.priority, visited: p.visited,
  private: p.private === true,
}));

const res = await fetch(`${URL_}/rest/v1/places?on_conflict=id`, {
  method: 'POST',
  headers: {
    apikey: KEY, Authorization: `Bearer ${KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=minimal',
  },
  body: JSON.stringify(rows),
});

if (!res.ok) { console.error('seed failed', res.status, await res.text()); process.exit(1); }
console.log(`seeded ${rows.length} places`);
