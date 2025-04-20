import { supabase } from '../lib/supabase';

export async function createProfile(id: string, name: string, email: string) {
  const { error: existingProfileError, data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', id)
    .single();

  if (!existingProfile) {
    return await supabase
      .from('profiles')
      .insert([
        { id, name, email },
      ]);
  }

  return { error: null };
}

export async function getProfile(id: string) {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
}

export async function updateProfile(id: string, updates: any) {
  return await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);
}

export async function getFavoriteCities(userId: string) {
  return await supabase
    .from('favorite_cities')
    .select('*')
    .eq('user_id', userId);
}

export async function addFavoriteCity(userId: string, city: string) {
  return await supabase
    .from('favorite_cities')
    .insert([
      { user_id: userId, city },
    ]);
}

export async function removeFavoriteCity(id: string) {
  return await supabase
    .from('favorite_cities')
    .delete()
    .eq('id', id);
}