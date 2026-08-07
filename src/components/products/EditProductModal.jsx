import { useEffect, useState } from "react";

import Modal from "../common/Modal";
import Label from "../ui/Label";
import inputStyle from "../../styles/inputStyle";

import { atualizarProduto } from "../../services/productsService";

const TIPOS = [
    "Suplemento",
    "Vitaminas",
    "Acessórios",
    "Alimentos",
    "Outros",
];

export default function EditProductModal({

    open,

    product,

    onClose,

    onSuccess

}) {

    const [form, setForm] = useState({

        code: "",

        name: "",

        tipo: TIPOS[0],

        price: 0,

        qty: 0,

        min: 0

    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (product) {

            setForm({

                ...product

            });

        }

    }, [product]);

    function alterarCampo(campo, valor) {

        setForm(old => ({

            ...old,

            [campo]: valor

        }));

    }

    async function salvar() {

        if (!form.code.trim()) {

            alert("Informe o código.");

            return;

        }

        if (!form.name.trim()) {

            alert("Informe o nome.");

            return;

        }

        try {

            setSaving(true);

            await atualizarProduto(

                form.id,

                {

                    ...form,

                    price: Number(form.price),

                    qty: Number(form.qty),

                    min: Number(form.min)

                }

            );

            onSuccess();

            onClose();

        }

        catch (error) {

            alert(error.message);

        }

        finally {

            setSaving(false);

        }

    }

    return (

        <Modal

            open={open}

            title="Editar Produto"

            onClose={onClose}

        >

            <div style={{ marginBottom: 15 }}>

                <Label>Código</Label>

                <input

                    style={inputStyle()}

                    value={form.code}

                    onChange={(e)=>alterarCampo("code", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Nome</Label>

                <input

                    style={inputStyle()}

                    value={form.name}

                    onChange={(e)=>alterarCampo("name", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Tipo</Label>

                <select

                    style={inputStyle()}

                    value={form.tipo}

                    onChange={(e)=>alterarCampo("tipo", e.target.value)}

                >

                    {

                        TIPOS.map(tipo=>(

                            <option

                                key={tipo}

                                value={tipo}

                            >

                                {tipo}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Preço de Venda (R$)</Label>

                <input

                    type="number"

                    min="0"

                    step="0.01"

                    style={inputStyle()}

                    value={form.price}

                    onChange={(e)=>alterarCampo("price", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Quantidade</Label>

                <input

                    type="number"

                    min="0"

                    style={inputStyle()}

                    value={form.qty}

                    onChange={(e)=>alterarCampo("qty", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 25 }}>

                <Label>Estoque Mínimo</Label>

                <input

                    type="number"

                    min="0"

                    style={inputStyle()}

                    value={form.min}

                    onChange={(e)=>alterarCampo("min", e.target.value)}

                />

            </div>

            <div

                style={{

                    display:"flex",

                    justifyContent:"flex-end",

                    gap:10

                }}

            >

                <button

                    className="app-btn-secondary"

                    onClick={onClose}

                >

                    Cancelar

                </button>

                <button

                    className="app-btn-primary"

                    onClick={salvar}

                    disabled={saving}

                >

                    {

                        saving

                            ? "Salvando..."

                            : "Salvar"

                    }

                </button>

            </div>

        </Modal>

    );

}