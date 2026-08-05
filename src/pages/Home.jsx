import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../constants/theme";
import Header from "../components/common/Header";


import MenuCard from "../components/common/MenuCard";

import {

    Package,

    ClipboardList,

    ShoppingCart,

    Users,

    PlusCircle

} from "lucide-react";

export default function Home() {

    const navigate = useNavigate();

    const { profile, signOut } = useAuth();

    return (

        <div
            style={{
                background: COLORS.BACKGROUND,
                minHeight:"100vh",
                color: COLORS.TEXT,
                padding:30
            }}
        >

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"flex-start",
                    marginBottom:30
                }}
            >

                <div>

                    <div
                        style={{
                            fontSize:14,
                            color:COLORS.TEXT_SECONDARY
                        }}
                    >

                        Bem Vindo

                    </div>

                    <div
                        style={{
                            fontSize:30,
                            fontWeight:700,
                            color:COLORS.TEXT
                        }}
                    >

                        {profile?.nome}

                    </div>

                </div>

                <button
                    onClick={signOut}
                    style={{
                        background:"transparent",
                        color:COLORS.TEXT,
                        border:`1px solid ${COLORS.BORDER}`,
                        padding:"10px 18px",
                        borderRadius:10,
                        cursor:"pointer",
                        fontWeight:600
                    }}
                >

                    SAIR

                </button>

            </div>

            <div
                style={{
                    display:"flex",
                    gap:8,
                    marginBottom:20
                }}
            >

                <div
                    style={{
                        flex:1,
                        background:"#171A21",
                        padding:12,
                        borderRadius:10
                    }}
                >

                    <div
                        style={{
                            fontSize:10,
                            color:"#999"
                        }}
                    >

                        Produtos

                    </div>

                    <div
                        style={{
                            fontSize:22,
                            fontWeight:700
                        }}
                    >

                        0

                    </div>

                </div>

                <div
                    style={{
                        flex:1,
                        background:"#171A21",
                        padding:12,
                        borderRadius:10
                    }}
                >

                    <div
                        style={{
                            fontSize:10,
                            color:"#999"
                        }}
                    >

                        Estoque

                    </div>

                    <div
                        style={{
                            fontSize:22,
                            fontWeight:700
                        }}
                    >

                        0

                    </div>

                </div>

                <div
                    style={{
                        flex:1,
                        background:"#171A21",
                        padding:12,
                        borderRadius:10
                    }}
                >

                    <div
                        style={{
                            fontSize:10,
                            color:"#999"
                        }}
                    >

                        Baixo

                    </div>

                    <div
                        style={{
                            fontSize:22,
                            fontWeight:700,
                            color:"#E2A33D"
                        }}
                    >

                        0

                    </div>

                </div>

            </div>

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
                    gap:18,
                }}
            >

                <MenuCard
                    title="Cadastrar Produtos"
                    subtitle="Novo item no catálogo"
                    icon={<PlusCircle size={22}/>}
                    onClick={()=>navigate("/produtos")}
                />

                <MenuCard
                    title="Consultar Estoque"
                    subtitle="Visualizar estoque"
                    icon={<Package size={22}/>}
                    onClick={()=>navigate("/estoque")}
                />

                <MenuCard
                    title="Entrada no Estoque"
                    subtitle="Receber mercadorias"
                    icon={<ClipboardList size={22}/>}
                    onClick={() => navigate("/entrada")}
                />

                <MenuCard
                    title="Pedidos de Venda"
                    subtitle="Registrar vendas"
                    icon={<ShoppingCart size={22}/>}
                />

                <MenuCard
                    title="Clientes"
                    subtitle="Cadastro de clientes"
                    icon={<Users size={22}/>}
                />

            </div>

        </div>

    );

}