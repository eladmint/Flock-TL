import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qntplrzasndqpcwqlyde.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFudHBscnphc25kcXBjd3FseWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMDI2MzcsImV4cCI6MjA1NDg3ODYzN30.YKAPc5h1CbSe4HjcAdC9IKa1KMC8tWAKtKJFO8JtKNw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "flock_auth_token",
    flowType: "pkce",
  },
});
