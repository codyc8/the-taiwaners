'use client';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { CATEGORIES, type Place } from '@/lib/types';
import { AREA_META } from '@/lib/areas';

// CircleMarker rather than the default pin: Leaflet's marker icons break under
// bundlers without extra asset wiring, and colour-by-category is more useful
// than an identical blue teardrop 80 times over.
// English area names drawn as our own labels, one per area at its centroid.
function labelIcon(name: string) {
  return L.divIcon({
    className: '',
    html: `<span style="font:600 10.5px/1.1 ui-sans-serif,system-ui;color:#5b5349;
      text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff;white-space:nowrap;
      transform:translate(-50%,-50%);display:inline-block">${name}</span>`,
    iconSize: [0, 0],
  });
}

/** Tracks zoom so labels can thin out when zoomed away. */
function ZoomWatch({ onZoom }: { onZoom: (z: number) => void }) {
  useMapEvents({ zoomend: e => onZoom(e.target.getZoom()) });
  return null;
}

export default function MapView({ places }: { places: Place[] }) {
  const [zoom, setZoom] = useState(12);
  const pins = places.filter(p => p.lat != null && p.lng != null && !p.private);
  const center: [number, number] = [25.034, 121.548];

  // One label per area, positioned at the mean of its pins.
  const areaLabels = Object.entries(
    pins.reduce<Record<string, Place[]>>((acc, p) => {
      if (p.kind !== 'brand') (acc[p.area] ??= []).push(p);
      return acc;
    }, {}),
    // Zoomed out, only the densest areas get a label or the names overlap into
    // an unreadable pile; zoomed in there is room for the rest.
  ).filter(([, ps]) => ps.length >= (zoom >= 14 ? 1 : zoom >= 13 ? 2 : 4)).map(([area, ps]) => ({
    name: area,
    lat: ps.reduce((s, p) => s + p.lat!, 0) / ps.length,
    lng: ps.reduce((s, p) => s + p.lng!, 0) / ps.length,
  }));

  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
      <MapContainer center={center} zoom={12} scrollWheelZoom style={{ height: '72vh', width: '100%' }}>
        <ZoomWatch onZoom={setZoom} />
        {/* Esri Light Gray BASE only, without its reference layer: that keeps the
            map free of place labels, so the only text is our own English area
            names. OSM labels Taiwan in Chinese; Esri's reference layer adds a
            romanisation beneath each, which is twice the clutter. CARTO's
            no-label style now demands an API key and serves watermarks without one. */}
        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        {areaLabels.map(a => (
          <Marker key={a.name} position={[a.lat, a.lng]} icon={labelIcon(a.name)}
                  interactive={false} keyboard={false} />
        ))}
        {pins.map(p => {
          const c = CATEGORIES[p.category];
          return (
            <CircleMarker
              key={p.id}
              center={[p.lat!, p.lng!]}
              radius={p.priority === 'must' ? 9 : 7}
              pathOptions={{
                color: '#fff', weight: 2,
                fillColor: c.color,
                fillOpacity: 0.92,
              }}
            >
              <Popup>
                <div style={{ minWidth: 170 }}>
                  <strong style={{ fontSize: 13 }}>{p.name_en || p.name_zh}</strong>
                  {p.name_zh && p.name_en && (
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{p.name_zh}</div>
                  )}
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
                    {c.label}{p.mrt ? ` · ${p.mrt}` : ''}
                  </div>
                  {p.geo_precision !== 'rooftop' && (
                    <div style={{ fontSize: 10.5, opacity: 0.6, marginTop: 3 }}>
                      Pin is {p.geo_precision}-level — tap through for the exact spot
                    </div>
                  )}
                  {p.maps_url && (
                    <a href={p.maps_url} target="_blank" rel="noreferrer"
                       style={{ fontSize: 12, display: 'inline-block', marginTop: 5 }}>
                      Open in Maps →
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
