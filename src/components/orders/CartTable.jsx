import { Trash2 } from "lucide-react";

export default function CartTable({

    items,

    onQuantityChange,

    onRemove

}) {

    if (!items.length) {

        return (

            <div
                style={{
                    padding: 30,
                    textAlign: "center",
                    color: "#888",
                    background: "#171A21",
                    borderRadius: 10
                }}
            >

                Nenhum produto adicionado ao pedido.

            </div>

        );

    }

    return (

        <div
            style={{
                overflowX: "auto"
            }}
        >

            <table
                className="data-table"
            >

                <thead>

                    <tr>

                        <th>Código</th>

                        <th>Produto</th>

                        <th>Quantidade</th>

                        <th>Valor Unit.</th>

                        <th>Subtotal</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        items.map(item=>(

                            <tr
                                key={item.product_id}
                            >

                                <td>

                                    {item.code}

                                </td>

                                <td>

                                    {item.name}

                                </td>

                                <td>

                                    <input

                                        type="number"

                                        min="1"

                                        value={item.quantity}

                                        onChange={(e)=>

                                            onQuantityChange(

                                                item.product_id,

                                                Number(e.target.value)

                                            )

                                        }

                                        style={{

                                            width:70,

                                            padding:6,

                                            borderRadius:6,

                                            border:"1px solid #2D3445",

                                            background:"#171A21",

                                            color:"white"

                                        }}

                                    />

                                </td>

                                <td>

                                    R$

                                    {" "}

                                    {item.unit_price.toFixed(2)}

                                </td>

                                <td>

                                    R$

                                    {" "}

                                    {item.subtotal.toFixed(2)}

                                </td>

                                <td>

                                    <button

                                        className="table-icon-button delete"

                                        onClick={()=>onRemove(item.product_id)}

                                    >

                                        <Trash2 size={16}/>

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}