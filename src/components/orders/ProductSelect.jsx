import { useEffect, useState } from "react";

import Label from "../ui/Label";
import inputStyle from "../../styles/inputStyle";

import { listarProdutos } from "../../services/productsService";

export default function ProductSelect({

    onSelect

}) {

    const [produtos, setProdutos] = useState([]);

    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {

        carregarProdutos();

    }, []);

    async function carregarProdutos() {

        try {

            const data = await listarProdutos();

            setProdutos(data);

        }

        catch (error) {

            alert(error.message);

        }

    }

    function selecionarProduto(id) {

        setSelectedId(id);

        const produto = produtos.find(

            p => p.id === Number(id)

        );

        if (!produto) return;

        onSelect(produto);

        setSelectedId("");

    }

    return (

        <div>

            <Label>

                Adicionar Produto

            </Label>

            <select

                style={inputStyle()}

                value={selectedId}

                onChange={(e)=>selecionarProduto(e.target.value)}

            >

                <option value="">

                    Selecione um produto

                </option>

                {

                    produtos.map(produto=>(

                        <option

                            key={produto.id}

                            value={produto.id}

                        >

                            {produto.code} - {produto.name}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}