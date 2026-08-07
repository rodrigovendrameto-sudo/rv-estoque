import { useState } from "react";
import { criarProduto } from "../services/productsService";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Label from "../components/ui/Label";
import inputStyle from "../styles/inputStyle";

const TIPOS = [
    "Suplemento",
    "Vitaminas",
    "Acessórios",
    "Alimentos",
    "Outros",
];

export default function CadastroProdutos() {

    const [code, setCode] = useState("");

    const [name, setName] = useState("");

    const [tipo, setTipo] = useState(TIPOS[0]);

    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    async function cadastrarProduto() {

        if (
            !code.trim() ||
            !name.trim() ||
            price === ""
        ) {

            alert("Preencha todos os campos obrigatórios.");

            return;

        }

        try {

            await criarProduto({

                code,

                name,

                tipo,

                price: Number(price),

                qty: 0,

                min: 0

            });

            alert("Produto cadastrado com sucesso!");

            setCode("");

            setName("");

            setTipo(TIPOS[0]);

            setPrice("");

        }

        catch (error) {

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

                title="Cadastrar Produtos"

                onBack={() => navigate("/")}

            />

            <div
                style={{
                    width: "100%",
                    maxWidth: 760,
                    margin: "0 auto",
                    padding: "20px"
                }}
            >

                <div style={{ marginBottom: 14 }}>

                    <Label>

                        Código do produto

                    </Label>

                    <input

                        style={inputStyle()}

                        placeholder="Ex: PT-008"

                        value={code}

                        onChange={(e) => setCode(e.target.value)}

                    />

                </div>

                <div style={{ marginBottom: 14 }}>

                    <Label>

                        Nome do produto

                    </Label>

                    <input

                        style={inputStyle()}

                        placeholder="Ex: Ômega 3"

                        value={name}

                        onChange={(e) => setName(e.target.value)}

                    />

                </div>

                <div style={{ marginBottom: 14 }}>

                    <Label>

                        Tipo

                    </Label>

                    <select

                        style={inputStyle()}

                        value={tipo}

                        onChange={(e) => setTipo(e.target.value)}

                    >

                        {

                            TIPOS.map((t) => (

                                <option
                                    key={t}
                                    value={t}
                                >

                                    {t}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div style={{ marginBottom: 20 }}>

                    <Label>

                        Preço de Venda (R$)

                    </Label>

                    <input

                        type="number"

                        step="0.01"

                        min="0"

                        style={inputStyle()}

                        placeholder="0,00"

                        value={price}

                        onChange={(e) => setPrice(e.target.value)}

                    />

                </div>

                <button

                    className="app-btn-primary"

                    onClick={cadastrarProduto}

                >

                    Cadastrar Produto

                </button>

            </div>

        </div>

    );

}