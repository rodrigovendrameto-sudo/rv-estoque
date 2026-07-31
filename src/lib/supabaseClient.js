import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Isso aparece no console se o .env não foi preenchido
  console.error(
    "Variáveis do Supabase não encontradas. Copie .env.example para .env e preencha os valores."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
