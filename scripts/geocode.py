# -*- coding: utf-8 -*-
"""Tiered Taiwan geocoder over Nominatim, with district verification.

Nominatim cannot parse full Chinese TW address strings, but it handles
structured street+city queries and POI-name lookups. Every candidate result is
rejected unless the returned display_name contains the district we expect, so a
plausible-but-wrong match (e.g. '墨子 台北' -> 摩茲工寮) never becomes a pin.
Records geo_precision so the UI can distinguish a rooftop pin from a street-level one.
"""
import json, re, time, urllib.parse, urllib.request, os

UA = 'taiwan-places-guide/1.0 (personal trip planner)'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_P = os.path.join(ROOT, 'data/geocache.json')
_cache = json.load(open(CACHE_P, encoding='utf-8')) if os.path.exists(CACHE_P) else {}

ADDR_RE = re.compile(r'^(?P<city>.+?[市縣])(?P<dist>.+?[區鄉鎮])(?P<rest>.+)$')
NUM_RE  = re.compile(r'(?P<road>.+?)(?P<lane>\d+巷)?(?P<alley>\d+弄)?(?P<num>[\d\-之]+)號')

def parse_addr(addr):
    addr = re.split(r'[/／]', addr)[0]
    addr = re.sub(r'[（(].*?[)）]', '', addr).strip()
    m = ADDR_RE.match(addr)
    if not m: return None
    d = m.groupdict()
    d['city'] = d['city'].replace('台', '臺')
    nm = NUM_RE.match(d['rest'])
    d.update({'road': None, 'lane': None, 'num': None})
    if nm:
        d['road'] = nm.group('road')
        d['lane'] = nm.group('lane')
        d['num']  = nm.group('num')
    else:
        d['road'] = d['rest']
    return d

def _call(params):
    params.update({'format': 'json', 'limit': 1, 'countrycodes': 'tw',
                   'addressdetails': 1})
    url = 'https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode(params)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA})
        with urllib.request.urlopen(req, timeout=25) as r:
            d = json.load(r)
        time.sleep(1.1)          # Nominatim usage policy
        return d[0] if d else None
    except Exception:
        time.sleep(1.1)
        return None

def geocode(addr, name_zh='', name_en=''):
    key = f'{addr}|{name_zh}'
    if key in _cache: return _cache[key]
    p = parse_addr(addr) if addr else None
    dist = p['dist'] if p else None
    cands = []
    if p:
        # A lane (巷) narrows to the right block; the bare house number often
        # matches an unrelated building on the same road, so try the lane first.
        if p['lane']:
            cands.append(dict(q=f"{p['road']}{p['lane']}, {p['dist']}, {p['city']}"))
        if p['num'] and p['road']:
            cands.append(dict(street=f"{p['num']} {p['road']}", city=p['city']))
    for n in (name_zh, name_en):
        if n: cands.append(dict(q=f"{n} {p['city'] if p else '臺灣'}"))
    if p and p['road']:
        cands.append(dict(q=f"{p['road']}, {p['dist']}, {p['city']}"))

    res = None
    for params in cands:
        r = _call(params)
        if not r: continue
        if dist and dist not in r['display_name']: continue   # wrong district -> reject
        ad = r.get('address', {})
        hn = ad.get('house_number')
        road_ok = bool(p and p['road'] and p['road'] in r['display_name'])
        if hn and p and p['num'] and hn.replace('之', '-') == p['num'].replace('之', '-'):
            prec = 'rooftop'
        elif r.get('class') in ('amenity', 'shop', 'tourism', 'leisure') and hn:
            prec = 'rooftop'
        elif road_ok or ad.get('road'):
            prec = 'street'
        else:
            prec = 'approx'
        res = {'lat': float(r['lat']), 'lng': float(r['lon']),
               'precision': prec, 'matched': r['display_name'][:70]}
        break
    _cache[key] = res
    json.dump(_cache, open(CACHE_P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return res


def geocode_area(q):
    """District/area centroid. No district guard - caller must label it approx."""
    key = f'AREA|{q}'
    if key in _cache: return _cache[key]
    r = _call(dict(q=q))
    res = {'lat': float(r['lat']), 'lng': float(r['lon']),
           'precision': 'approx', 'matched': r['display_name'][:70]} if r else None
    _cache[key] = res
    json.dump(_cache, open(CACHE_P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return res
