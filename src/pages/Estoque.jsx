import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import TableToolbar from "../components/tables/TableToolbar";
import DataTable from "../components/tables/DataTable";

import { listarProdutos } from "../services/productsService";

export default function Estoque() {

    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        carregarProdutos();

    }, []);

    async function carregarProdutos() {

        try {

            const data = await listarProdutos();

            setProdutos(data);

        }

        catch(err){

            console.error(err);

        }

        finally{

            setLoading(false);

        }

    }

    const produtosFiltrados = useMemo(()=>{

        return produtos.filter((produto)=>{

            const texto = search.toLowerCase();

            return(

                produto.name.toLowerCase().includes(texto)

                ||

                produto.code.toLowerCase().includes(texto)

            );

        });

    },[produtos,search]);

    const columns=[

        {

            key:"code",

            label:"Código"

        },

        {

            key:"name",

            label:"Nome"

        },

        {

            key:"tipo",

            label:"Tipo"

        },

        {

            key:"qty",

            label:"Qtd"

        },

        {

            key:"status",

            label:"Status"

        }

    ];

    return(

        <div
            style={{

                minHeight:"100vh",

                background:"#0F1115"

            }}
        >

            <Header

                title="Consultar estoque"

                onBack={()=>navigate("/")}

            />

            <div
                style={{

                    maxWidth:1200,

                    margin:"0 auto",

                    padding:20

                }}
            >

                <TableToolbar

                    search={search}

                    setSearch={setSearch}

                    total={produtosFiltrados.length}

                    buttonLabel="Novo Produto"

                    onButtonClick={()=>navigate("/produtos")}

                />

                {

                    loading

                    ?

                    <p style={{color:"white"}}>

                        Carregando...

                    </p>

                    :

                    <DataTable

                        columns={columns}

                        data={produtosFiltrados}

                        onEdit={(produto)=>{

                            console.log(produto);

                        }}

                        onDelete={(produto)=>{

                            console.log(produto);

                        }}

                    />

                }

            </div>

        </div>

    );

}