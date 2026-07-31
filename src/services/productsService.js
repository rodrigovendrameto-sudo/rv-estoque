import { supabase } from "../lib/supabaseClient";

export async function listarProdutos() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function criarProduto(produto) {
  const { data, error } = await supabase
    .from("products")
    .insert(produto)
    .select();

  if (error) throw error;

  return data;
}