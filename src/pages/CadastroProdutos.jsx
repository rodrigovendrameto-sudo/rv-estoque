import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import ProductForm from "../components/products/ProductForm";

import { criarProduto } from "../services/productsService";

const TIPOS = [
  "Suplemento",
  "Vitaminas",
  "Acessórios",
  "Alimentos",
  "Outros",
];

export default function CadastroProdutos() {

  const navigate = useNavigate();

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

    <div
      style={{
        minHeight: "100vh",
        background: "#0F1115",
      }}
    >

      <Header
        title="Cadastrar produtos"
        onBack={() => navigate("/")}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          padding: 20,
        }}
      >

        <ProductForm

          code={code}
          setCode={setCode}

          name={name}
          setName={setName}

          tipo={tipo}
          setTipo={setTipo}

          onSubmit={cadastrarProduto}

          buttonLabel="Cadastrar produto"

        />

      </div>

    </div>

  );

}