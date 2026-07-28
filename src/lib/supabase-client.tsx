// lib/supabaseClient.ts
// Skip this file if you already have a Supabase client set up elsewhere in your project —
// just update the import path in IndicesTicker.tsx to point at your existing client.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);