import MapClient from '@/components/MapClient';
import { supabase } from '@/lib/supabase';
import type { Place } from '@/lib/types';

export const revalidate = 0;

export default async function MapPage() {
  const { data } = await supabase.from('places').select('*');
  return <MapClient places={(data ?? []) as Place[]} />;
}
