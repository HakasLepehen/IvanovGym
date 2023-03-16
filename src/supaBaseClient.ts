import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, options);