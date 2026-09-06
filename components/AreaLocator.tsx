'use client';
import { useMemo } from 'react';
import boundaries from '@/data/boundaries.json';
import { LINES, LINE_ORDER, STATIONS, servedBy, type LineCode } from '@/lib/metro';
import type { Place } from '@/lib/types';

const TAIPEI: number[][] = (boundaries as { taipei: { rings: number[][][] } }).taipei.rings[0];

// ---------------------------------------------------------------------------
// Projection
//
// The box is a horizontal rectangle cropped to central Taipei rather than the
// whole square network. Fitting Tamsui (25.17°N) and Dingpu (24.96°N) into one
// square squeezed the dense core — Zhongshan through Xinyi, where nearly every
// place actually is — into a knot you couldn't trace a line through. Cropping
// to the core spends the pixels where the pins are.
//
// A handful of areas (Yangmingshan, Tianmu, Beitou) sit outside that crop, so
// the viewport is per-area: it starts at the core box and grows only as far as
// it must to hold that area's pins, then stops. Same map, same projection —
// just zoomed out for the few areas that need it.
// ---------------------------------------------------------------------------

const VB_W = 160;                     // viewBox width…
const VB_H = 100;                     // …and height. 8:5 — the horizontal frame.
const PAD = 3;                        // breathing room inside the box
const ASPECT = VB_W / VB_H;

const PTS: [number, number][] = [
  ...Object.values(STATIONS).map(s => [s.lat, s.lng] as [number, number]),
  ...TAIPEI.map(([lng, lat]) => [lat, lng] as [number, number]),
];

// Longitude degrees shrink towards the poles, so scale by cos(lat) or the city
// comes out visibly stretched sideways.
const KX = Math.cos((25.05 * Math.PI) / 180);

type Box = { lat0: number; lat1: number; lng0: number; lng1: number };

/** Grow whichever dimension is short, about the centre, until the box is 8:5. */
function fit(b: Box): Box {
  const h = b.lat1 - b.lat0;
  const w = (b.lng1 - b.lng0) * KX;
  const clat = (b.lat0 + b.lat1) / 2;
  const clng = (b.lng0 + b.lng1) / 2;
  const H = Math.max(h, w / ASPECT);
  const W = H * ASPECT;
  return {
    lat0: clat - H / 2, lat1: clat + H / 2,
    lng0: clng - W / 2 / KX, lng1: clng + W / 2 / KX,
  };
}

/** Everything there is — the fallback for an area that outruns the core box. */
const FULL = fit({
  lat0: Math.min(...PTS.map(p => p[0])) - 0.004,
  lat1: Math.max(...PTS.map(p => p[0])) + 0.004,
  lng0: Math.min(...PTS.map(p => p[1])) - 0.004,
  lng1: Math.max(...PTS.map(p => p[1])) + 0.004,
});

// Central Taipei: Banqiao/Jiangzicui across to Nangang, Shilin down to the zoo.
// 0.11° of latitude is about 12km, which is the whole walkable-plus-a-transfer
// city and holds every area except the three up the mountain.
const CORE = fit({ lat0: 24.990, lat1: 25.100, lng0: 121.525, lng1: 121.525 });
const CORE_H = CORE.lat1 - CORE.lat0;

/** The smallest core-or-larger box holding `need`, never bigger than FULL. */
function viewport(need: Box): Box {
  let b = fit({
    lat0: Math.min(CORE.lat0, need.lat0), lat1: Math.max(CORE.lat1, need.lat1),
    lng0: Math.min(CORE.lng0, need.lng0), lng1: Math.max(CORE.lng1, need.lng1),
  });
  if (b.lat1 - b.lat0 >= FULL.lat1 - FULL.lat0) return FULL;

  // Slide back inside the network's own bounds so a nudged box never frames
  // empty sea instead of stations.
  const shift = (v0: number, v1: number, f0: number, f1: number) =>
    v0 < f0 ? f0 - v0 : v1 > f1 ? f1 - v1 : 0;
  const dy = shift(b.lat0, b.lat1, FULL.lat0, FULL.lat1);
  const dx = shift(b.lng0, b.lng1, FULL.lng0, FULL.lng1);
  b = { lat0: b.lat0 + dy, lat1: b.lat1 + dy, lng0: b.lng0 + dx, lng1: b.lng1 + dx };
  return b;
}

/** Light line colours (orange, yellow) need dark text on the legend chip. */
function ink(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? '#1b1e1b' : '#ffffff';
}

/** Mean position of an area's pins. */
export function areaCentroid(places: Place[]) {
  const pts = places.filter(p => p.lat != null && p.lng != null);
  if (!pts.length) return null;
  return {
    lat: pts.reduce((s, p) => s + p.lat!, 0) / pts.length,
    lng: pts.reduce((s, p) => s + p.lng!, 0) / pts.length,
  };
}

export default function AreaLocator({ area, places }: { area: string; places: Place[] }) {
  const model = useMemo(() => {
    const here = areaCentroid(places);
    if (!here) return null;
    if (here.lat < FULL.lat0 || here.lat > FULL.lat1 || here.lng < FULL.lng0 || here.lng > FULL.lng1) {
      return null;                    // off the metro map entirely (Alishan, Taroko…)
    }

    // The highlighted zone is the actual spread of the area's pins, not a fixed
    // blob, so tight areas (Yongkang) read tighter than sprawling ones (Shilin).
    let spread = 0;
    for (const p of places) {
      if (p.lat == null || p.lng == null) continue;
      const dy = p.lat - here.lat;
      const dx = (p.lng - here.lng) * KX;
      spread = Math.max(spread, Math.hypot(dx, dy));
    }

    // Keep the zone ring clear of the frame edge, so "this area" always reads as
    // a ring and never as a stripe running off the side.
    const margin = spread + 0.012;
    const box = viewport({
      lat0: here.lat - margin, lat1: here.lat + margin,
      lng0: here.lng - margin / KX, lng1: here.lng + margin / KX,
    });

    const H = box.lat1 - box.lat0;
    const spanY = VB_H - PAD * 2;
    const px = (lng: number) => PAD + ((lng - box.lng0) / (box.lng1 - box.lng0)) * (VB_W - PAD * 2);
    const py = (lat: number) => PAD + ((box.lat1 - lat) / H) * spanY;
    const pr = (deg: number) => (deg / H) * spanY;

    const { lines, stations } = servedBy(places);
    return {
      cx: px(here.lng),
      cy: py(here.lat),
      radius: Math.min(Math.max(pr(spread) + 3, 5.5), 22),
      // Zoomed-out views pack the lines closer, so thin the strokes to match —
      // otherwise the network turns into one solid ribbon on Yangmingshan.
      k: Math.min(1, Math.max(0.72, CORE_H / H)),
      outline: TAIPEI.map(([lng, lat]) => `${px(lng).toFixed(1)},${py(lat).toFixed(1)}`).join(' '),
      paths: LINES.map(l => ({
        code: l.code,
        name: l.name,
        color: l.color,
        runs: l.segments.map(seg =>
          seg
            .map(id => STATIONS[id])
            .filter(Boolean)
            .map(s => `${px(s.lng).toFixed(1)},${py(s.lat).toFixed(1)}`)
            .join(' '),
        ),
      })),
      stationDots: stations.map(s => ({ id: s.id, x: px(s.lng), y: py(s.lat), code: s.lines[0] })),
      lineSet: new Set<LineCode>(lines),
      lineList: LINE_ORDER.filter(c => lines.includes(c)),
    };
  }, [places]);

  if (!model) return null;
  const { cx, cy, radius, k, outline, paths, stationDots, lineSet, lineList } = model;

  const label = lineList.length
    ? `${area} on the Taipei Metro — served by the ${lineList
        .map(c => paths.find(p => p.code === c)!.name)
        .join(' and ')} line${lineList.length > 1 ? 's' : ''}`
    : `Where ${area} sits on the Taipei Metro map`;

  return (
    <div className="w-[190px] shrink-0 sm:w-[264px]">
      <div
        className="relative aspect-[8/5] overflow-hidden rounded-xl border"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
          <defs>
            <radialGradient id="al-zone">
              <stop offset="50%" stopColor="var(--accent)" stopOpacity={0.42} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Taipei City, for a sense of what is city and what is New Taipei. */}
          <polygon
            points={outline}
            fill="color-mix(in srgb, var(--text) 5%, transparent)"
            stroke="var(--border)"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />

          {/* The area's zone sits under the network so it tints rather than hides it. */}
          <circle cx={cx} cy={cy} r={radius} fill="url(#al-zone)" />

          {/* Every line, muted; then the ones that serve this area, on top. */}
          {[false, true].map(active =>
            paths.filter(p => lineSet.has(p.code) === active).map(p =>
              p.runs.map((pts, i) => (
                <polyline
                  key={`${active}-${p.code}-${i}`}
                  points={pts}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={(active ? 2.2 : 1.5) * k}
                  strokeOpacity={active ? 1 : 0.42}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )),
            ),
          )}

          {/* ...and its outline over the top, so the zone still reads on a busy patch. */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none" stroke="var(--surface)" strokeOpacity={0.7} strokeWidth={2.4}
          />
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none" stroke="var(--accent)" strokeOpacity={0.95}
            strokeWidth={1.2} strokeDasharray="3.5 2.4"
          />

          {/* The stations you'd actually get off at. */}
          {stationDots.map(s => (
            <circle
              key={s.id}
              cx={s.x} cy={s.y} r={2.4 * k}
              fill="var(--surface)"
              stroke={paths.find(p => p.code === s.code)!.color}
              strokeWidth={1.5 * k}
            />
          ))}
        </svg>

        {/* Which train to take, in the same codes the place cards use. Sits on
            the side away from the zone ring so it never sits on top of it. */}
        {lineList.length > 0 && (
          <div
            className={`absolute inset-x-1 bottom-1 flex flex-wrap gap-0.5 ${
              cx < VB_W / 2 ? 'justify-end' : ''
            }`}
          >
            {lineList.map(c => {
              const l = paths.find(p => p.code === c)!;
              return (
                <span
                  key={c}
                  title={`${l.name} line`}
                  className="rounded px-1 text-[9px] font-bold leading-[14px] sm:text-[10px] sm:leading-4"
                  style={{ background: l.color, color: ink(l.color) }}
                >
                  {c}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
