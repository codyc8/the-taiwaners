import PlacesBrowser from '@/components/PlacesBrowser';
import { supabase } from '@/lib/supabase';
import type { Place } from '@/lib/types';

export const revalidate = 0;

export default async function Home() {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('area', { ascending: true });

  if (error) {
    return (
      <p className="py-12 text-center text-[14px]" style={{ color: 'var(--muted)' }}>
        Could not load places: {error.message}
      </p>
    );
  }
  return <PlacesBrowser places={(data ?? []) as Place[]} />;
}
