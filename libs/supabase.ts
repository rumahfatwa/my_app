import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// Ambil nilai dari .env yang sudah kamu setting tadi
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Di aplikasi mobile/Expo, kita harus pakai penyimpanan khusus 
    // agar sesi login tidak hilang saat aplikasi ditutup
    detectSessionInUrl: false,
  },
});