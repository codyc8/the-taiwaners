-- Patch 01: stop anonymous visitors from editing anything except `visited`.
--
-- RLS policies apply per ROW, not per column, so "for update using (true)" let
-- anyone with the public anon key rewrite every field (verified by renaming
-- Taipei 101 through the anon key alone). Column-level GRANTs are the actual
-- mechanism for restricting which fields a role may write.

revoke update on public.places from anon;
grant  update (visited) on public.places to anon;

-- Policy still governs which ROWS may be updated; the grant governs which COLUMN.
drop policy if exists "public toggle visited" on public.places;
create policy "public toggle visited" on public.places
  for update to anon using (true) with check (true);

-- Inserts stay open so friends can add places without an account.
grant insert on public.places to anon;
grant select on public.places to anon;
