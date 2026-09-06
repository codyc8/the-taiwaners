'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CATEGORIES, FRIENDS, type Category } from '@/lib/types';

const REGIONS = ['Taipei City','New Taipei','Keelung','Taoyuan','Taichung','Yilan','Nantou','Chiayi','Hualien','Pingtung'];

export default function AddPage() {
  const router = useRouter();
  const [f, setF] = useState({
    name_en: '', name_zh: '', category: 'food' as Category,
    region: 'Taipei City', area: '', distance_band: 'city',
    mrt: '', address: '', note: '', added_by: 'Cody', priority: 'want',
  });
  const [state, setState] = useState<'idle'|'saving'|'done'|'error'>('idle');
  const [msg, setMsg] = useState('');

  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name_en && !f.name_zh) { setMsg('Give it a name in either language.'); return; }
    setState('saving'); setMsg('');

    const slug = (f.name_en || f.name_zh).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const query = `${f.name_zh || f.name_en} ${f.address}`.trim();

    const { error } = await supabase.from('places').insert({
      id: `${slug || 'place'}-${Date.now().toString(36)}`,
      kind: 'place',
      name_en: f.name_en || f.name_zh,
      name_zh: f.name_zh,
      category: f.category,
      region: f.region,
      area: f.area || 'Unsorted',
      distance_band: f.distance_band,
      mrt: f.mrt, address: f.address, note: f.note,
      added_by: f.added_by, priority: f.priority,
      confidence: 'needs_input',   // added by hand, not yet verified or geocoded
      maps_url: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query),
    });

    if (error) { setState('error'); setMsg(error.message); return; }
    setState('done');
    setTimeout(() => router.push('/'), 900);
  }

  const input = 'w-full rounded-lg border px-3 py-2 text-[14px] outline-none focus:border-[var(--accent)]';
  const style = { borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <h1 className="display text-[20px]">Add a place</h1>
        <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--muted)' }}>
          No account needed. Just pick your name so we know who suggested it.
        </p>
      </div>

      <input className={input} style={style} placeholder="Name in English (or what it is)"
             value={f.name_en} onChange={e => set('name_en', e.target.value)} />
      <input className={`${input} zh`} style={style} placeholder="中文名字"
             value={f.name_zh} onChange={e => set('name_zh', e.target.value)} />

      <div className="grid grid-cols-2 gap-2">
        <select className={input} style={style} value={f.category} onChange={e => set('category', e.target.value)}>
          {Object.entries(CATEGORIES).filter(([k]) => k !== 'anchor')
            .map(([k, c]) => <option key={k} value={k}>{c.emoji} {c.label}</option>)}
        </select>
        <select className={input} style={style} value={f.priority} onChange={e => set('priority', e.target.value)}>
          <option value="must">★ Must go</option>
          <option value="want">Want to go</option>
          <option value="maybe">Maybe</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select className={input} style={style} value={f.region} onChange={e => set('region', e.target.value)}>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input className={input} style={style} placeholder="Area (e.g. Xinyi)"
               value={f.area} onChange={e => set('area', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select className={input} style={style} value={f.distance_band} onChange={e => set('distance_band', e.target.value)}>
          <option value="city">In the city</option>
          <option value="day_trip">Day trip</option>
          <option value="overnight">Overnight</option>
        </select>
        <input className={input} style={style} placeholder="Nearest MRT"
               value={f.mrt} onChange={e => set('mrt', e.target.value)} />
      </div>

      <input className={`${input} zh`} style={style} placeholder="Address 地址 (optional)"
             value={f.address} onChange={e => set('address', e.target.value)} />
      <textarea className={`${input} zh`} style={style} rows={3} placeholder="Note — what to order, why go"
                value={f.note} onChange={e => set('note', e.target.value)} />

      <div>
        <label className="label mb-1.5 block text-[10.5px]" style={{ color: 'var(--muted)' }}>Added by</label>
        <select className={input} style={style} value={f.added_by} onChange={e => set('added_by', e.target.value)}>
          {FRIENDS.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <button type="submit" disabled={state === 'saving' || state === 'done'}
              className="w-full rounded-lg px-3 py-2.5 text-[14px] font-semibold disabled:opacity-60"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
        {state === 'saving' ? 'Saving…' : state === 'done' ? '✓ Added' : 'Add place'}
      </button>

      {msg && (
        <p className="rounded-md border px-2.5 py-2 text-[12.5px]"
           style={{ borderColor: 'color-mix(in srgb, var(--straw) 55%, transparent)',
                    background: 'color-mix(in srgb, var(--straw) 16%, transparent)',
                    color: 'var(--straw-ink)' }}>
          {msg}
        </p>
      )}
    </form>
  );
}
