import { useState } from "react";
import { criarProduto } from "../services/productsService";

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

  async function cadastrarProduto() {
    if (!code.trim() || !name.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await criarProduto({
        code,
        name,
        tipo,
        qty: 0,
        min: 0,
      });

      alert("Produto cadastrado com sucesso!");

      setCode("");
      setName("");
      setTipo(TIPOS[0]);

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: 30, maxWidth: 500 }}>

      <h2>Cadastrar Produto</h2>

      <div style={{ marginBottom: 15 }}>
        <label>Código</label>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Nome</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Tipo</label>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        >
          {TIPOS.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <button onClick={cadastrarProduto}>
        Cadastrar Produto
      </button>

    </div>
  );
}