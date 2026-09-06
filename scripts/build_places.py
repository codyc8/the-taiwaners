# -*- coding: utf-8 -*-
import json, sys, time, urllib.parse, urllib.request, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from enrich_table import E
from geocode import geocode, geocode_area, parse_addr

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
raw = json.load(open(os.path.join(ROOT,'data/raw.json'), encoding='utf-8'))
CACHE_P = os.path.join(ROOT,'data/geocache.json')
cache = json.load(open(CACHE_P,encoding='utf-8')) if os.path.exists(CACHE_P) else {}

def maps_url(p):
    q = (p['name_zh'] or p['name_en']) + (' ' + p['address'] if p['address'] else '')
    return 'https://www.google.com/maps/search/?api=1&query=' + urllib.parse.quote(q)

out, unresolved = [], []
for e in raw['entries']:
    en = E[e['id']]
    if en.get('merge_into'):
        continue
    note = e['note']
    if en.get('note_add'):
        note = (note + ' — ' if note else '') + en['note_add']
    p = {
        'id': e['id'],
        'kind': en.get('kind', e.get('kind','place')),
        'name_en': e['name_en'],
        'name_zh': e['name_zh'],
        'category': e['category'],
        'region': en['region'],
        'area': en['area'],
        'distance_band': en['band'],
        'mrt': en.get('mrt',''),
        'address': en.get('addr',''),
        'note': note,
        'anchor': e.get('anchor',''),
        'warn': en.get('warn',''),
        'confidence': en['conf'],
        'source_section': e['section'],
        'added_by': 'Cody',
        'priority': 'want',
        'visited': False,
        'lat': None, 'lng': None, 'geo_precision': None,
        # Home bases are kept for clustering but must not reach the shared link
        # or the exported map files. One flag, set here, is what every consumer
        # downstream reads — seed.mjs and export-mymaps.mjs both honour it.
        'private': en.get('private', False),
    }
    p['maps_url'] = maps_url(p)
    out.append(p)

print('places:', len(out), '(after merging duplicates)')
todo = [p for p in out if p['kind']=='place' and p['address']]
print('geocoding', len(todo), 'addresses...')
for i,p in enumerate(todo,1):
    manual = E[p['id']].get('latlng')
    if manual:
        # A hand-set pin defaults to rooftop, but some are deliberately coarse
        # (a home pinned to its station, a market pinned to its street), so the
        # table can downgrade its own precision rather than overclaim.
        p['lat'], p['lng'] = manual[0], manual[1]
        p['geo_precision'] = E[p['id']].get('latlng_precision', 'rooftop')
        continue
    g = geocode(p['address'], p['name_zh'], p['name_en'])
    if g:
        p['lat'], p['lng'], p['geo_precision'] = g['lat'], g['lng'], g['precision']
    else:
        # Last resort: pin to the district centroid and label it approx, so the
        # map shows roughly-right rather than confidently-wrong.
        d = parse_addr(p['address']) if p['address'] else None
        c = geocode_area(f"{d['dist']}, {d['city']}") if d else None
        if c:
            p['lat'], p['lng'], p['geo_precision'] = c['lat'], c['lng'], 'approx'
        unresolved.append(p['id'])
    if i % 15 == 0: print(f'  {i}/{len(todo)}', flush=True)

got = sum(1 for p in out if p['lat'])
print(f'geocoded {got}/{len(todo)}')

json.dump({'_meta': {**raw['_meta'], 'generated':'build_places.py'},
           'friends': ['Cody','Michelle','Sanju','Nicole','JJ','Jessica','Austin','Katy','Judy'],
           'places': out},
          open(os.path.join(ROOT,'data/places.json'),'w',encoding='utf-8'),
          ensure_ascii=False, indent=2)
print('no coords:', unresolved)
