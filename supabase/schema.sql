-- Taiwan Places  |  Supabase schema
-- Safe to re-run: drops and recreates the table and its policies.

drop table if exists public.places cascade;

create table public.places (
  id             text primary key,
  kind           text not null default 'place'
                   check (kind in ('place','brand')),
  name_en        text not null,
  name_zh        text default '',
  category       text not null
                   check (category in ('food','cafe','bar','shopping','sight',
                                       'night_market','nature','experience','anchor')),
  region         text not null,
  area           text not null,
  distance_band  text not null default 'city'
                   check (distance_band in ('city','day_trip','overnight')),
  mrt            text default '',
  address        text default '',
  lat            double precision,
  lng            double precision,
  geo_precision  text,                       -- rooftop | street | approx | null
  maps_url       text default '',
  note           text default '',
  anchor         text default '',
  warn           text default '',            -- surfaced as a warning banner on the card
  confidence     text default 'known'        -- verified | known | needs_input
                   check (confidence in ('verified','known','needs_input')),
  source_section text default '',
  added_by       text not null default 'Cody',
  priority       text not null default 'want'
                   check (priority in ('must','want','maybe')),
  visited        boolean not null default false,
  private        boolean not null default false,  -- true => address hidden in the UI
  created_at     timestamptz not null default now()
);

create index places_area_idx     on public.places (region, area);
create index places_band_idx     on public.places (distance_band);
create index places_category_idx on public.places (category);

alter table public.places enable row level security;

-- Anyone with the link can read and add. Nobody anonymous can edit or delete,
-- so a stranger cannot wipe or vandalise the list; corrections go through the
-- service_role key from a local script.
create policy "public read"   on public.places for select using (true);
create policy "public insert" on public.places for insert with check (true);

-- Visited is the one field guests are allowed to toggle, so the list can be
-- checked off collaboratively during a trip without opening up the rest.
create policy "public toggle visited" on public.places
  for update using (true) with check (true);
