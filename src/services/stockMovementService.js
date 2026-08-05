import { supabase } from "../lib/supabaseClient";

import {

    buscarProdutoPorId,

    atualizarProduto

} from "./productsService";

/*
|--------------------------------------------------------------------------
| REGISTRAR MOVIMENTAÇÃO
|--------------------------------------------------------------------------
*/

export async function registrarMovimentacao({

    productId,

    movementType,

    quantity,

    invoiceNumber = "",

    observation = "",

    userId = null

}) {

    const produto = await buscarProdutoPorId(productId);

    if (!produto) {

        throw new Error("Produto não encontrado.");

    }

    let novoSaldo = produto.qty;

    switch (movementType) {

        case "ENTRY":

            novoSaldo += quantity;

            break;

        case "SALE":

            novoSaldo -= quantity;

            break;

        case "RETURN":

            novoSaldo += quantity;

            break;

        case "ADJUSTMENT":

            novoSaldo = quantity;

            break;

        default:

            throw new Error("Tipo de movimentação inválido.");

    }

    if (novoSaldo < 0) {

        throw new Error("O estoque não pode ficar negativo.");

    }

    /*
    |--------------------------------------------------------------------------
    | PRIMEIRO REGISTRA O HISTÓRICO
    |--------------------------------------------------------------------------
    */

    const { error: movementError } = await supabase

        .from("stock_movements")

        .insert({

            product_id: productId,

            movement_type: movementType,

            quantity,

            invoice_number: invoiceNumber,

            observation,

            user_id: userId

        });

    if (movementError) {

        throw movementError;

    }

    /*
    |--------------------------------------------------------------------------
    | DEPOIS ATUALIZA O ESTOQUE
    |--------------------------------------------------------------------------
    */

    await atualizarProduto(productId, {

        qty: novoSaldo

    });

    return true;

}

/*
|--------------------------------------------------------------------------
| LISTAR MOVIMENTAÇÕES
|--------------------------------------------------------------------------
*/

export async function listarMovimentacoes(productId = null) {

    let query = supabase

        .from("stock_movements")

        .select(`
            *,
            products (
                code,
                name
            )
        `)

        .order("created_at", {

            ascending: false

        });

    if (productId) {

        query = query.eq("product_id", productId);

    }

    const { data, error } = await query;

    if (error) throw error;

    return data;

}