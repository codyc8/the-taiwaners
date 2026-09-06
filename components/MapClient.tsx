'use client';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { BANDS, CATEGORIES, type Place } from '@/lib/types';

// Leaflet touches window on import, so it can never be server-rendered.
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[72vh] place-items-center rounded-xl border text-[13px]"
         style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
      Loading map…
    </div>
  ),
});

export default function MapClient({ places }: { places: Place[] }) {
  const [band, setBand] = useState<keyof typeof BANDS | 'all'>('city');
  const shown = useMemo(
    () => (band === 'all' ? places : places.filter(p => p.distance_band === band)),
    [places, band],
  );

  return (
    <div>
      <div className="mb-3 flex gap-1.5">
        {(['city', 'day_trip', 'overnight', 'all'] as const).map(b => (
          <button key={b} onClick={() => setBand(b)}
            className="flex-1 rounded-lg border px-2 py-2 text-[12.5px] font-medium"
            style={{
              borderColor: band === b ? 'var(--accent)' : 'var(--border)',
              background: band === b ? 'var(--milk)' : 'var(--surface)',
              color: band === b ? 'var(--accent)' : 'var(--muted)',
            }}>
            {b === 'all' ? 'All' : BANDS[b].label}
          </button>
        ))}
      </div>

      <MapView places={shown} />

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11.5px]" style={{ color: 'var(--muted)' }}>
        {Object.entries(CATEGORIES).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
