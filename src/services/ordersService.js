import { supabase } from "../lib/supabaseClient";
import { registrarSaida } from "./stockMovementService";
import { atualizarUltimaCompra } from "./clientsService";

/*
|--------------------------------------------------------------------------
| LISTAR PEDIDOS
|--------------------------------------------------------------------------
*/

export async function listarPedidos() {

    const { data, error } = await supabase

        .from("orders")

        .select(`
            *,
            clients (
                id,
                name
            )
        `)

        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| BUSCAR PEDIDO POR ID
|--------------------------------------------------------------------------
*/

export async function buscarPedidoPorId(id) {

    const { data, error } = await supabase

        .from("orders")

        .select(`
            *,
            clients (
                id,
                name
            ),
            order_items (
                *,
                products (
                    id,
                    code,
                    name
                )
            )
        `)

        .eq("id", id)

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| CRIAR PEDIDO
|--------------------------------------------------------------------------
*/

export async function criarPedido({

    client_id,

    total,

    payment_method,

    user_id

}) {

    const { data, error } = await supabase

        .from("orders")

        .insert([{

            client_id,

            total,

            payment_method,

            user_id,

            status: "OPEN"

        }])

        .select()

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| ADICIONAR ITENS
|--------------------------------------------------------------------------
*/

export async function adicionarItensPedido(orderId, itens) {

    const registros = itens.map(item => ({

        order_id: orderId,

        product_id: item.product_id,

        quantity: item.quantity,

        unit_price: item.unit_price,

        subtotal: item.subtotal

    }));

    const { data, error } = await supabase

        .from("order_items")

        .insert(registros)

        .select();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| FINALIZAR PEDIDO
|--------------------------------------------------------------------------
*/

export async function finalizarPedido(id) {

    const { data, error } = await supabase

        .from("orders")

        .update({

            status: "FINISHED"

        })

        .eq("id", id)

        .select()

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| CANCELAR PEDIDO
|--------------------------------------------------------------------------
*/

export async function cancelarPedido(id) {

    const { data, error } = await supabase

        .from("orders")

        .update({

            status: "CANCELLED"

        })

        .eq("id", id)

        .select()

        .single();

    if (error) throw error;

    return data;

}

/*
|--------------------------------------------------------------------------
| REGISTRAR VENDA
|--------------------------------------------------------------------------
*/

export async function registrarVenda({

    client,

    cart,

    paymentMethod,

    userId = null

}) {

    if (!client) {

        throw new Error("Selecione um cliente.");

    }

    if (!cart.length) {

        throw new Error("Adicione pelo menos um produto.");

    }

    const total = cart.reduce(

        (sum, item) => sum + item.subtotal,

        0

    );

    /*
    |--------------------------------------------------------------------------
    | CRIA O PEDIDO
    |--------------------------------------------------------------------------
    */

    const pedido = await criarPedido({

        client_id: client.id,

        total,

        payment_method: paymentMethod,

        user_id: userId

    });

    /*
    |--------------------------------------------------------------------------
    | ADICIONA OS ITENS
    |--------------------------------------------------------------------------
    */

    await adicionarItensPedido(

        pedido.id,

        cart

    );

    /*
    |--------------------------------------------------------------------------
    | REGISTRA A SAÍDA DOS PRODUTOS
    |--------------------------------------------------------------------------
    */

    for (const item of cart) {

        await registrarSaida({

            productId: item.product_id,

            quantity: item.quantity,

            userId,

            observation: `Pedido #${pedido.id}`

        });

    }

    /*
    |--------------------------------------------------------------------------
    | ATUALIZA A ÚLTIMA COMPRA DO CLIENTE
    |--------------------------------------------------------------------------
    */

    await atualizarUltimaCompra(

        client.id

    );

    /*
    |--------------------------------------------------------------------------
    | FINALIZA O PEDIDO
    |--------------------------------------------------------------------------
    */

    await finalizarPedido(

        pedido.id

    );

    return pedido;

}