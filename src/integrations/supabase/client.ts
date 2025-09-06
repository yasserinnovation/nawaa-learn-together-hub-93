import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if Supabase isn't connected yet
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not connected. Using mock client.');
    // Return a mock client that doesn't break the app
    return {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: { message: 'Supabase not connected' } }),
        update: () => ({ data: null, error: { message: 'Supabase not connected' } }),
        delete: () => ({ error: { message: 'Supabase not connected' } }),
        order: () => ({ data: [], error: null })
      })
    } as any;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();