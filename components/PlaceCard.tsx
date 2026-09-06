'use client';
import { useState } from 'react';
import { CATEGORIES, type Place } from '@/lib/types';
import { supabase } from '@/lib/supabase';

export default function PlaceCard({ place }: { place: Place }) {
  const [visited, setVisited] = useState(place.visited);
  const [busy, setBusy] = useState(false);
  const cat = CATEGORIES[place.category];

  async function toggleVisited() {
    const next = !visited;
    setVisited(next);           // optimistic
    setBusy(true);
    const { error } = await supabase.from('places').update({ visited: next }).eq('id', place.id);
    if (error) setVisited(!next);   // roll back so the UI never lies about what was saved
    setBusy(false);
  }

  return (
    <li
      className="rounded-xl border p-3 transition-opacity"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--surface)',
        opacity: visited ? 0.55 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        <span aria-hidden className="mt-0.5 text-lg leading-none">{cat.emoji}</span>

        <div className="min-w-0 flex-1">
          {/* English name (or descriptor) leads; Chinese sits underneath. */}
          <h3 className={`display text-[16px] leading-snug ${visited ? 'line-through' : ''}`}>
            {place.name_en || place.name_zh}
          </h3>
          {place.name_zh && place.name_en && (
            <p className="zh mt-0.5 text-[14px] leading-snug" style={{ color: 'var(--muted)' }}>
              {place.name_zh}
            </p>
          )}

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]" style={{ color: 'var(--muted)' }}>
            <span className="label rounded px-1.5 py-0.5 text-[10px]" style={{ background: cat.color + '22', color: cat.color }}>
              {cat.label}
            </span>
            {place.mrt && <span>🚇 {place.mrt}</span>}
            {place.priority === 'must' && <span className="label text-[10px]" style={{ color: 'var(--accent)' }}>★ must</span>}
          </div>

          {place.warn && (
            <p className="mt-2 rounded-md border px-2 py-1.5 text-[12.5px] leading-snug"
               style={{ borderColor: 'color-mix(in srgb, var(--straw) 55%, transparent)',
                        background: 'color-mix(in srgb, var(--straw) 16%, transparent)',
                        color: 'var(--straw-ink)' }}>
              ⚠ {place.warn}
            </p>
          )}

          {place.note && (
            <p className="zh mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {place.note}
            </p>
          )}

          {/* Addresses on private entries are never rendered — the link is shareable. */}
          {place.address && !place.private && (
            <p className="zh mt-1.5 text-[12px]" style={{ color: 'var(--muted)' }}>{place.address}</p>
          )}

          <div className="mt-2.5 flex items-center gap-3 text-[12.5px]">
            {place.maps_url && (
              <a href={place.maps_url} target="_blank" rel="noreferrer"
                 className="font-medium underline underline-offset-2" style={{ color: 'var(--accent)' }}>
                Open in Maps
              </a>
            )}
            <button onClick={toggleVisited} disabled={busy}
                    className="rounded-full border px-2.5 py-1 font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] disabled:opacity-50"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              {visited ? '✓ Been' : 'Mark visited'}
            </button>
            <span className="ml-auto text-[11px]" style={{ color: 'var(--muted)' }}>
              {place.added_by}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
