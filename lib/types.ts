export type Place = {
  id: string;
  kind: 'place' | 'brand';
  name_en: string;
  name_zh: string;
  category: Category;
  region: string;
  area: string;
  distance_band: 'city' | 'day_trip' | 'overnight';
  mrt: string;
  address: string;
  lat: number | null;
  lng: number | null;
  geo_precision: 'rooftop' | 'street' | 'approx' | null;
  maps_url: string;
  note: string;
  anchor: string;
  warn: string;
  confidence: 'verified' | 'known' | 'needs_input';
  source_section: string;
  added_by: string;
  priority: 'must' | 'want' | 'maybe';
  visited: boolean;
  private: boolean;
  created_at?: string;
};

export type Category =
  | 'food' | 'cafe' | 'bar' | 'shopping' | 'sight'
  | 'night_market' | 'nature' | 'experience' | 'anchor';

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  food:         { label: 'Food',         emoji: '🍜', color: '#e2703a' },
  cafe:         { label: 'Cafe',         emoji: '☕', color: '#9a6b4f' },
  bar:          { label: 'Bar',          emoji: '🍸', color: '#7a5ea8' },
  shopping:     { label: 'Shopping',     emoji: '🛍️', color: '#c8477e' },
  sight:        { label: 'Sight',        emoji: '📍', color: '#3f7fbf' },
  night_market: { label: 'Night Market', emoji: '🏮', color: '#d4353f' },
  nature:       { label: 'Nature',       emoji: '⛰️', color: '#3f8f5f' },
  experience:   { label: 'Experience',   emoji: '🎟️', color: '#4f9a94' },
  anchor:       { label: 'Base',         emoji: '🏠', color: '#7a7a7a' },
};

export const BANDS = {
  city:      { label: 'In Taipei',     hint: 'Reachable on the MRT' },
  day_trip:  { label: 'Near Taipei',   hint: 'Out and back in a day' },
  overnight: { label: 'Far from Taipei', hint: 'Needs a night away' },
} as const;

/** Friends who can be credited with adding a place. */
export const FRIENDS = ['Cody','Michelle','Sanju','Nicole','JJ','Jessica','Austin','Katy','Judy'];
