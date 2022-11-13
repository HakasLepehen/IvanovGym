import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://szhybzeikbjijyhwftnn.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aHliemVpa2JqaWp5aHdmdG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYxMTU1MDYsImV4cCI6MTk4MTY5MTUwNn0.TbbHSnGzy1AD6Gr-9G1QYn2m0AmMn-vOkA5iM8QjqvY'
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