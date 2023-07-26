export const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}

// export const supabase = createClient(ENV.supabaseUrl, ENV.supabaseKey, options);