import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";

import ClientSelect from "../components/orders/ClientSelect";
import ProductSelect from "../components/orders/ProductSelect";
import CartTable from "../components/orders/CartTable";
import OrderSummary from "../components/orders/OrderSummary";
import { useAuth } from "../context/AuthContext";
import { registrarVenda } from "../services/ordersService";
import PaymentMethodSelect from "../components/orders/PaymentMethodSelect";

export default function Pedidos() {

    const navigate = useNavigate();

    const { profile } = useAuth();

    const [client, setClient] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState("PIX");

    const [cart, setCart] = useState([]);

    /*
    |--------------------------------------------------------------------------
    | ADICIONAR PRODUTO
    |--------------------------------------------------------------------------
    */

    function adicionarProduto(produto) {

        setCart((oldCart) => {

            const existe = oldCart.find(

                item => item.product_id === produto.id

            );

            if (existe) {

                return oldCart.map(item =>

                    item.product_id === produto.id

                        ? {

                            ...item,

                            quantity: item.quantity + 1,

                            subtotal:

                                (item.quantity + 1)

                                * item.unit_price

                        }

                        : item

                );

            }

            return [

                ...oldCart,

                {

                    product_id: produto.id,

                    code: produto.code,

                    name: produto.name,

                    quantity: 1,

                    unit_price: Number(produto.price),

                    subtotal: Number(produto.price)

                }

            ];

        });

    }

    /*
    |--------------------------------------------------------------------------
    | ALTERAR QUANTIDADE
    |--------------------------------------------------------------------------
    */

    function alterarQuantidade(id, quantidade) {

        if (quantidade < 1) return;

        setCart(oldCart =>

            oldCart.map(item =>

                item.product_id === id

                    ? {

                        ...item,

                        quantity: quantidade,

                        subtotal:

                            quantidade

                            * item.unit_price

                    }

                    : item

            )

        );

    }

    /*
    |--------------------------------------------------------------------------
    | REMOVER PRODUTO
    |--------------------------------------------------------------------------
    */

    function removerProduto(id) {

        setCart(oldCart =>

            oldCart.filter(

                item => item.product_id !== id

            )

        );

    }

    /*
    |--------------------------------------------------------------------------
    | TOTAL DO PEDIDO
    |--------------------------------------------------------------------------
    */

    const totalPedido = useMemo(() => {

        return cart.reduce(

            (total, item) => total + item.subtotal,

            0

        );

    }, [cart]);

    /*
    |--------------------------------------------------------------------------
    | FINALIZAR PEDIDO
    |--------------------------------------------------------------------------
    */

    async function finalizarPedido() {

        if (!client) {

            alert("Selecione um cliente.");

            return;

        }

        if (!cart.length) {

            alert("Adicione pelo menos um produto.");

            return;

        }

        try {

            console.log("Iniciando venda...");

            const pedido = await registrarVenda({

                client,

                cart,

                paymentMethod,

                userId: profile?.id ?? null

            });

            console.log("Pedido criado:", pedido);

            alert("Pedido realizado com sucesso!");

            setCart([]);

            setClient(null);

        }

        catch (error) {

            console.error("Erro ao finalizar pedido:", error);

            alert(error.message);

        }

    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0F1115"
            }}
        >

            <Header

                title="Pedidos de Venda"

                onBack={() => navigate("/")}

            />

            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: 20
                }}
            >

                <ClientSelect

                    value={client}

                    onChange={setClient}

                />

                <div style={{ height: 20 }} />

                <ProductSelect

                    onSelect={adicionarProduto}

                />

                <div style={{ height: 25 }} />

                <CartTable

                    items={cart}

                    onQuantityChange={alterarQuantidade}

                    onRemove={removerProduto}

                />

                <div style={{ height: 25 }} />

                <div style={{ height: 20 }} />

                <PaymentMethodSelect

                    value={paymentMethod}

                    onChange={setPaymentMethod}

                />

                <div style={{ height: 20 }} />

                <OrderSummary

                    client={client}

                    items={cart}

                    total={totalPedido}

                    onFinish={finalizarPedido}

                />

            </div>

        </div>

    );

}