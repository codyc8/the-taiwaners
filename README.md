# The Taiwaners

A permanent database of places in Taiwan — food, cafes, shopping, sights, night
markets, nature and experiences — grouped by region and area, with Chinese names,
nearest MRT, addresses and map pins. Built to outlive any single trip.

## How it fits together

```
data/raw.json        verbatim ingest of the original list (punctuation repaired)
scripts/enrich_table.py  the research layer: address / area / MRT / notes per place
scripts/geocode.py   tiered Nominatim geocoder with a district-match guard
scripts/build_places.py  merges the two above -> data/places.json
scripts/seed.mjs     pushes data/places.json into Supabase
scripts/export-mymaps.mjs  emits out/*.csv and out/*.kml for Google My Maps
app/                 Next.js site: list, map, add form
```

**Supabase is the live source of truth.** `data/places.json` is the seed and the
rebuildable artifact. Adds made through the site live only in Supabase.

## Updating

Add a place casually → use the **Add** page on the site. No login; pick your name.

Add or correct many at once → edit `scripts/enrich_table.py`, then:

```bash
python3 scripts/build_places.py    # re-geocodes (cached, so only new rows hit the network)
node scripts/seed.mjs              # upserts by id, safe to re-run
```

Useful `enrich_table.py` keys beyond the obvious ones:

- `latlng: [lat, lng]` — overrides the geocoder for a place it gets wrong, and
  `latlng_precision` downgrades the resulting `geo_precision` when the hand-set
  pin is deliberately coarse (a home on its station, a market on its street).
- `merge_into: "<id>"` — drops the row. Used for true duplicates, and for the
  bundle entries ("Shopping Day - …") that were split into one row per store.
- `private: True` — see Privacy below.

`seed.mjs` upserts but never deletes, so a row retired with `merge_into` has to
be removed from Supabase by hand.

Refresh the Google map → `node scripts/export-mymaps.mjs`, then re-import
`out/taiwan-places.kml` into Google My Maps.

## Geocoding honesty

Every pin carries `geo_precision`:

- `rooftop` — matched the actual building
- `street` — matched the road or lane, so the pin is within a block
- `approx` — district centroid only; roughly right, not precisely

Nominatim cannot parse full Chinese Taiwanese address strings, so the geocoder
tries lane-level, then house-number, then POI name, then street. **Every candidate
is rejected unless the result lands in the expected district**, because name
searches otherwise return confident nonsense (`墨子 台北` resolves to an unrelated
`摩茲工寮`). A missing pin is better than a wrong one.

## Privacy

Home addresses are stored coarsely — pinned to the nearest station or road, not
the house number — and flagged `private` in `enrich_table.py`. That flag rides
through `places.json`, so `seed.mjs` hides them from the map and
`export-mymaps.mjs` leaves them out of the CSV/KML entirely. The link is meant to
be shareable.

Note that `private` only hides the pin: the row itself still ships to the
browser, which is why the address is coarse rather than exact.

## Brand

Assets live in `public/` and come from `taiwaners-brand-kit`: `favicon.svg` (plus
32/180/512 PNG fallbacks), `mark-boba-cup.svg`, and the horizontal lockups in
dark and cream. The palette is tea `#4B372A`, milk `#F0E1C8`, ink `#47382E` and
straw `#D98A6E`; type is Baloo 2 with Chivo Mono for small-caps labels. The site
ships light-only — it does not follow `prefers-color-scheme`, because the cream
ground *is* the brand.

## Environment

`.env.local` (gitignored) holds the Supabase URL, anon key and service_role key.
The anon key is public by design and ships to the browser. **The service_role key
bypasses row-level security — it must stay server-side and out of git.**

RLS lets anyone with the link read, insert, and toggle `visited`. Editing and
deleting require the service_role key, so nobody can vandalise the list.
