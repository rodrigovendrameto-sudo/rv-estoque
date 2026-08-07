import { useEffect, useState } from "react";

import Label from "../ui/Label";
import inputStyle from "../../styles/inputStyle";

export default function ClientForm({

    client,

    onSave,

    onCancel

}) {

    const [form, setForm] = useState({

        name: "",

        document: "",

        phone: "",

        birth_date: "",

        email: "",

        address: "",

        notes: ""

    });

    useEffect(() => {

        if (client) {

            setForm({

                ...client

            });

        }

    }, [client]);

    function handleChange(field, value) {

        setForm((old) => ({

            ...old,

            [field]: value

        }));

    }

    function salvar() {

        if (!form.name.trim()) {

            alert("Informe o nome do cliente.");

            return;

        }

        if (!form.phone.trim()) {

            alert("Informe o celular.");

            return;

        }

        if (!form.document.trim()) {

            alert("Informe o CPF.");

            return;

        }

        if (!form.birth_date) {

            alert("Informe a data de nascimento.");

            return;

        }

        onSave(form);

    }

    return (

        <>

            <div style={{ marginBottom: 15 }}>

                <Label>Nome</Label>

                <input

                    style={inputStyle()}

                    value={form.name}

                    onChange={(e)=>handleChange("name", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>CPF</Label>

                <input

                    style={inputStyle()}

                    value={form.document}

                    onChange={(e)=>handleChange("document", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Celular</Label>

                <input

                    style={inputStyle()}

                    value={form.phone}

                    onChange={(e)=>handleChange("phone", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Nascimento</Label>

                <input

                    type="date"

                    style={inputStyle()}

                    value={form.birth_date || ""}

                    onChange={(e)=>handleChange("birth_date", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>E-mail</Label>

                <input

                    style={inputStyle()}

                    value={form.email || ""}

                    onChange={(e)=>handleChange("email", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 15 }}>

                <Label>Endereço</Label>

                <input

                    style={inputStyle()}

                    value={form.address || ""}

                    onChange={(e)=>handleChange("address", e.target.value)}

                />

            </div>

            <div style={{ marginBottom: 25 }}>

                <Label>Observações</Label>

                <textarea

                    style={{
                        ...inputStyle(),
                        minHeight:100
                    }}

                    value={form.notes || ""}

                    onChange={(e)=>handleChange("notes", e.target.value)}

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

                    onClick={onCancel}

                >

                    Cancelar

                </button>

                <button

                    className="app-btn-primary"

                    onClick={salvar}

                >

                    Salvar

                </button>

            </div>

        </>

    );

}