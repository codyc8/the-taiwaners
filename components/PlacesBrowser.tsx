'use client';
import { useMemo, useState } from 'react';
import PlaceCard from './PlaceCard';
import { BANDS, CATEGORIES, type Category, type Place } from '@/lib/types';
import { AREA_META } from '@/lib/areas';
import AreaLocator from './AreaLocator';

type Band = keyof typeof BANDS;

const BRANDS_KEY = 'Chains & brands · no single location';

export default function PlacesBrowser({ places }: { places: Place[] }) {
  // Default to the city band: day trips and overnights would otherwise bury the
  // ~70 places you can actually reach on the MRT today.
  const [band, setBand] = useState<Band>('city');
  const [cats, setCats] = useState<Set<Category>>(new Set());
  const [q, setQ] = useState('');
  const [hideVisited, setHideVisited] = useState(false);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return places.filter(p =>
      p.distance_band === band &&
      (cats.size === 0 || cats.has(p.category)) &&
      (!hideVisited || !p.visited) &&
      (!needle ||
        p.name_en.toLowerCase().includes(needle) ||
        p.name_zh.includes(q.trim()) ||
        p.area.toLowerCase().includes(needle) ||
        p.note.toLowerCase().includes(needle)),
    );
  }, [places, band, cats, q, hideVisited]);

  // Group by area, largest cluster first — that ordering is the itinerary hint.
  const groups = useMemo(() => {
    const m = new Map<string, Place[]>();
    for (const p of shown) {
      // Group by area alone: some clusters (the Keelung / north-coast loop) span
      // two administrative regions but are one actual day out. Chains have no
      // single location, so they collect in one bucket instead of inventing
      // pseudo-areas like "multiple" or "Everywhere".
      const key = p.kind === 'brand' ? BRANDS_KEY : p.area;
      (m.get(key) ?? m.set(key, []).get(key)!).push(p);
    }
    return [...m.entries()].sort((a, b) => {
      if (a[0] === BRANDS_KEY) return 1;      // chains always last
      if (b[0] === BRANDS_KEY) return -1;
      return b[1].length - a[1].length;       // biggest cluster first = itinerary hint
    });
  }, [shown]);

  const counts = useMemo(() => {
    const c = {} as Record<Band, number>;
    for (const k of Object.keys(BANDS) as Band[]) c[k] = places.filter(p => p.distance_band === k).length;
    return c;
  }, [places]);

  function toggleCat(c: Category) {
    setCats(prev => {
      const n = new Set(prev);
      n.has(c) ? n.delete(c) : n.add(c);
      return n;
    });
  }

  const usedCats = useMemo(
    () => (Object.keys(CATEGORIES) as Category[]).filter(c => places.some(p => p.distance_band === band && p.category === c)),
    [places, band],
  );

  return (
    <div>
      <div className="mb-3 flex gap-1.5">
        {(Object.keys(BANDS) as Band[]).map(b => (
          <button key={b} onClick={() => setBand(b)}
            className="flex-1 rounded-lg border px-2 py-2 text-[13px] font-medium transition-colors"
            style={{
              borderColor: band === b ? 'var(--accent)' : 'var(--border)',
              background: band === b ? 'var(--milk)' : 'var(--surface)',
              color: band === b ? 'var(--accent)' : 'var(--muted)',
            }}>
            {BANDS[b].label}
            <span className="ml-1 opacity-60">{counts[b]}</span>
          </button>
        ))}
      </div>

      <input
        value={q} onChange={e => setQ(e.target.value)}
        placeholder="Search name, area or note…"
        className="mb-2.5 w-full rounded-lg border px-3 py-2 text-[14px] outline-none focus:border-[var(--accent)]"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
      />

      <div className="mb-3 flex flex-wrap gap-1.5">
        {usedCats.map(c => {
          const on = cats.has(c);
          return (
            <button key={c} onClick={() => toggleCat(c)}
              className="rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors"
              style={{
                borderColor: on ? CATEGORIES[c].color : 'var(--border)',
                background: on ? CATEGORIES[c].color + '22' : 'transparent',
                color: on ? CATEGORIES[c].color : 'var(--muted)',
              }}>
              {CATEGORIES[c].emoji} {CATEGORIES[c].label}
            </button>
          );
        })}
        <button onClick={() => setHideVisited(v => !v)}
          className="rounded-full border px-2.5 py-1 text-[12px] font-medium"
          style={{
            borderColor: hideVisited ? 'var(--accent)' : 'var(--border)',
            background: hideVisited ? 'var(--milk)' : 'transparent',
            color: hideVisited ? 'var(--accent)' : 'var(--muted)',
          }}>
          {hideVisited ? '✓ ' : ''}Hide visited
        </button>
      </div>

      <p className="mb-3 text-[12px]" style={{ color: 'var(--muted)' }}>
        {shown.length} place{shown.length === 1 ? '' : 's'} · {BANDS[band].hint}
      </p>

      {groups.map(([area, items]) => {
        const meta = AREA_META[area];
        return (
          <section key={area} className="mb-5">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="display text-[16px] leading-tight">
                  {area}
                  {meta?.zh && <span className="zh ml-1.5 font-normal" style={{ color: 'var(--muted)' }}>{meta.zh}</span>}
                  <span className="ml-1.5 text-[12px] font-normal opacity-55">({items.length})</span>
                </h2>
                {meta?.landmark && (
                  <p className="mt-0.5 text-[11.5px]" style={{ color: 'var(--muted)' }}>{meta.landmark}</p>
                )}
              </div>
              {area !== BRANDS_KEY && <AreaLocator area={area} places={items} />}
            </div>
            <ul className="space-y-2">
              {items.map(p => <PlaceCard key={p.id} place={p} />)}
            </ul>
          </section>
        );
      })}

      {groups.length === 0 && (
        <p className="py-12 text-center text-[14px]" style={{ color: 'var(--muted)' }}>
          Nothing matches those filters.
        </p>
      )}
    </div>
  );
}
