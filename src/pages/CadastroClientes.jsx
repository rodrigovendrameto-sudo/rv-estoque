import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Label from "../components/ui/Label";
import inputStyle from "../styles/inputStyle";

import { criarCliente } from "../services/clientsService";

export default function CadastroClientes() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [document, setDocument] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(false);

    async function cadastrarCliente() {

        if (!name.trim()) {
            alert("Informe o nome do cliente.");
            return;
        }

        if (!phone.trim()) {
            alert("Informe o celular.");
            return;
        }

        if (!document.trim()) {
            alert("Informe o CPF.");
            return;
        }

        if (!birthDate) {
            alert("Informe a data de nascimento.");
            return;
        }

        try {

            setLoading(true);

            await criarCliente({

                name,
                document,
                phone,
                birth_date: birthDate,
                email,
                address,
                notes,
                last_purchase: null,
                total_orders: 0

            });

            alert("Cliente cadastrado com sucesso!");

            setName("");
            setDocument("");
            setPhone("");
            setBirthDate("");
            setEmail("");
            setAddress("");
            setNotes("");

        } catch (error) {

            alert(error.message);

        } finally {

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
                title="Cadastrar Cliente"
                onBack={() => navigate("/clientes")}
            />

            <div
                style={{
                    width: "100%",
                    maxWidth: 760,
                    margin: "0 auto",
                    padding: 20
                }}
            >

                <div style={{ marginBottom: 16 }}>

                    <Label>Nome *</Label>

                    <input
                        style={inputStyle()}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome completo"
                    />

                </div>

                <div style={{ marginBottom: 16 }}>

                    <Label>CPF *</Label>

                    <input
                        style={inputStyle()}
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        placeholder="000.000.000-00"
                    />

                </div>

                <div style={{ marginBottom: 16 }}>

                    <Label>Celular *</Label>

                    <input
                        style={inputStyle()}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                    />

                </div>

                <div style={{ marginBottom: 16 }}>

                    <Label>Data de Nascimento *</Label>

                    <input
                        type="date"
                        style={inputStyle()}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />

                </div>

                <div style={{ marginBottom: 16 }}>

                    <Label>E-mail</Label>

                    <input
                        type="email"
                        style={inputStyle()}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="cliente@email.com"
                    />

                </div>

                <div style={{ marginBottom: 16 }}>

                    <Label>Endereço</Label>

                    <input
                        style={inputStyle()}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Rua, número, bairro..."
                    />

                </div>

                <div style={{ marginBottom: 24 }}>

                    <Label>Observações</Label>

                    <textarea
                        style={{
                            ...inputStyle(),
                            minHeight: 100,
                            resize: "vertical"
                        }}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Informações adicionais..."
                    />

                </div>

                <button
                    className="app-btn-primary"
                    onClick={cadastrarCliente}
                    disabled={loading}
                >

                    {loading ? "Cadastrando..." : "Cadastrar Cliente"}

                </button>

            </div>

        </div>

    );

}