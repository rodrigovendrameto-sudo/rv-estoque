import { useMemo } from "react";

export default function OrderSummary({

    items,

    client,

    onFinish

}) {

    const total = useMemo(() => {

        return items.reduce(

            (sum, item) => sum + item.subtotal,

            0

        );

    }, [items]);

    return (

        <div
            style={{

                background:"#171A21",

                padding:20,

                borderRadius:12,

                display:"flex",

                justifyContent:"space-between",

                alignItems:"center",

                flexWrap:"wrap",

                gap:20

            }}
        >

            <div>

                <div
                    style={{
                        color:"#999",
                        fontSize:14
                    }}
                >

                    Cliente

                </div>

                <div
                    style={{
                        fontSize:20,
                        fontWeight:700
                    }}
                >

                    {

                        client

                            ? client.name

                            : "Nenhum cliente selecionado"

                    }

                </div>

            </div>

            <div>

                <div
                    style={{
                        color:"#999",
                        fontSize:14
                    }}
                >

                    Total do Pedido

                </div>

                <div
                    style={{
                        fontSize:30,
                        fontWeight:700,
                        color:"#39D98A"
                    }}
                >

                    R$ {total.toFixed(2)}

                </div>

            </div>

            <button

                className="app-btn-primary"

                disabled={

                    !client ||

                    items.length === 0

                }

                onClick={onFinish}

                style={{

                    width: "220px"

                }}

            >

                Finalizar Pedido

            </button>

        </div>

    );

}