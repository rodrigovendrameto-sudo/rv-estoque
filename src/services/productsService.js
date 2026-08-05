import { supabase } from "../lib/supabaseClient";

/*
|--------------------------------------------------------------------------
| LISTAR PRODUTOS
|--------------------------------------------------------------------------
*/

export async function listarProdutos() {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;

}

/*
|--------------------------------------------------------------------------
| CRIAR PRODUTO
|--------------------------------------------------------------------------
*/

export async function criarProduto(produto) {

  const { data, error } = await supabase
    .from("products")
    .insert(produto)
    .select();

  if (error) throw error;

  return data;

}

/*
|--------------------------------------------------------------------------
| ATUALIZAR PRODUTO
|--------------------------------------------------------------------------
*/

export async function atualizarProduto(id, produto) {

  const { data, error } = await supabase
    .from("products")
    .update(produto)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;

}

/*
|--------------------------------------------------------------------------
| EXCLUIR PRODUTO
|--------------------------------------------------------------------------
*/

export async function excluirProduto(id) {

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;

}

export async function buscarProdutoPorId(id) {

    const { data, error } = await supabase

        .from("products")

        .select("*")

        .eq("id", id)

        .single();

    if (error) throw error;

    return data;

}