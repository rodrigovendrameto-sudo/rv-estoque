import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Label from "../components/ui/Label";
import ProductSelect from "../components/products/ProductSelect";
import inputStyle from "../styles/inputStyle";

import { listarProdutos } from "../services/productsService";
import { registrarMovimentacao } from "../services/stockMovementService";

export default function EntradaEstoque() {

    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);

    const [productId, setProductId] = useState("");

    const [quantity, setQuantity] = useState("");

    const [invoiceNumber, setInvoiceNumber] = useState("");

    const [observation, setObservation] = useState("");

    const [loading, setLoading] = useState(false);

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

    async function salvarEntrada() {

        if (!productId) {

            alert("Selecione um produto.");

            return;

        }

        if (Number(quantity) <= 0) {

            alert("Informe uma quantidade válida.");

            return;

        }

        try {

            setLoading(true);

            await registrarMovimentacao({

                productId: Number(productId),

                movementType: "ENTRY",

                quantity: Number(quantity),

                invoiceNumber,

                observation

            });

            alert("Entrada registrada com sucesso!");

            setProductId("");

            setQuantity("");

            setInvoiceNumber("");

            setObservation("");

        }

        catch (error) {

            alert(error.message);

        }

        finally {

            setLoading(false);

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

                title="Entrada de Estoque"

                onBack={() => navigate("/")}

            />

            <div
                style={{
                    maxWidth: 700,
                    margin: "0 auto",
                    padding: 20
                }}
            >

                <ProductSelect

                    products={produtos}

                    value={productId}

                    onChange={setProductId}

                />

                <div style={{ marginBottom: 18 }}>

                    <Label>

                        Quantidade

                    </Label>

                    <input

                        type="number"
                        inputMode="numeric"
                        min="1"
                        step="1"
                        style={inputStyle()}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Digite a quantidade"

                    />

                </div>

                <div style={{ marginBottom: 18 }}>

                    <Label>

                        Nota Fiscal

                    </Label>

                    <input

                        style={inputStyle()}

                        value={invoiceNumber}

                        onChange={(e) => setInvoiceNumber(e.target.value)}

                        placeholder="Ex: NF-123456"

                    />

                </div>

                <div style={{ marginBottom: 25 }}>

                    <Label>

                        Observação

                    </Label>

                    <textarea

                        style={{

                            ...inputStyle(),

                            minHeight: 120,

                            resize: "vertical"

                        }}

                        value={observation}

                        onChange={(e) => setObservation(e.target.value)}

                        placeholder="Observações da entrada..."

                    />

                </div>

                <button

                    className="app-btn-primary"

                    disabled={loading}

                    onClick={salvarEntrada}

                >

                    {

                        loading

                            ? "Registrando..."

                            : "Registrar Entrada"

                    }

                </button>

            </div>

        </div>

    );

}