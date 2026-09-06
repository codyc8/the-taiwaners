// Generates a Google My Maps importable CSV + a KML, one layer per area.
// Google My Maps imports one CSV as one layer and caps at 10 layers / 2000 rows,
// so we emit a single CSV with an Area column (style by it after import) plus a
// KML that already carries the folder structure.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = process.argv[2] ?? 'data/places.json';
const { places } = JSON.parse(readFileSync(src, 'utf8'));
mkdirSync('out', { recursive: true });

// Private entries (home bases) never leave the machine.
const rows = places.filter(p => p.lat != null && p.lng != null && !p.private);

const esc = s => `"${String(s ?? '').replace(/"/g, '""')}"`;
const header = ['Name','Chinese','Category','Region','Area','MRT','Address','Note','Latitude','Longitude','Precision','MapsURL'];
const csv = [header.join(',')].concat(
  rows.map(p => [
    p.name_en || p.name_zh, p.name_zh, p.category, p.region, p.area,
    p.mrt, p.address, [p.note, p.warn].filter(Boolean).join(' | '),
    p.lat, p.lng, p.geo_precision, p.maps_url,
  ].map(esc).join(',')),
).join('\n');
writeFileSync('out/taiwan-places.csv', '﻿' + csv);   // BOM so Sheets reads CJK

// Fold by region, not area: My Maps allows at most 10 layers per map and a KML
// folder becomes a layer. Taiwan has exactly 10 regions here; Area survives as a
// CSV column you can "style by" once imported.
const byArea = {};
for (const p of rows) (byArea[p.region] ??= []).push(p);
const x = s => String(s ?? '').replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Taiwan Places</name>
${Object.entries(byArea).map(([area, ps]) => `<Folder><name>${x(area)}</name>
${ps.map(p => `<Placemark><name>${x(p.name_en || p.name_zh)}</name>
<description>${x([p.area, p.name_zh, p.mrt, p.address, p.note, p.warn].filter(Boolean).join(' | '))}</description>
<Point><coordinates>${p.lng},${p.lat},0</coordinates></Point></Placemark>`).join('\n')}
</Folder>`).join('\n')}
</Document></kml>`;
writeFileSync('out/taiwan-places.kml', kml);

console.log(`exported ${rows.length} pins across ${Object.keys(byArea).length} region layers`);
console.log('  out/taiwan-places.csv  -> import into Google My Maps');
console.log('  out/taiwan-places.kml  -> already foldered by area');
