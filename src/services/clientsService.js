import { supabase } from "../lib/supabaseClient";

/*
|--------------------------------------------------------------------------
| LISTAR CLIENTES
|--------------------------------------------------------------------------
*/

export async function listarClientes() {

    const { data, error } = await supabase

        .from("clients")

        .select("*")

        .order("name", { ascending: true });

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| BUSCAR CLIENTE POR ID
|--------------------------------------------------------------------------
*/

export async function buscarClientePorId(id) {

    const { data, error } = await supabase

        .from("clients")

        .select("*")

        .eq("id", id)

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| CRIAR CLIENTE
|--------------------------------------------------------------------------
*/

export async function criarCliente(cliente) {

    const { data, error } = await supabase

        .from("clients")

        .insert([cliente])

        .select()

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| ATUALIZAR CLIENTE
|--------------------------------------------------------------------------
*/

export async function atualizarCliente(id, cliente) {

    const { id: _, ...dadosAtualizados } = cliente;

    const { data, error } = await supabase

        .from("clients")

        .update(dadosAtualizados)

        .eq("id", id)

        .select()

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| ATUALIZAR ÚLTIMA COMPRA
|--------------------------------------------------------------------------
*/

export async function atualizarUltimaCompra(id) {

    const hoje = new Date().toISOString();

    const { data, error } = await supabase

        .from("clients")

        .update({

            last_purchase: hoje

        })

        .eq("id", id)

        .select()

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| EXCLUIR CLIENTE
|--------------------------------------------------------------------------
*/

export async function excluirCliente(id) {

    const { error } = await supabase

        .from("clients")

        .delete()

        .eq("id", id);

    if (error) throw error;

    return true;

}