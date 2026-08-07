import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import TableToolbar from "../components/tables/TableToolbar";
import DataTable from "../components/tables/DataTable";

import EditProductModal from "../components/products/EditProductModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

import {
  listarProdutos,
  excluirProduto,
} from "../services/productsService";

export default function Estoque() {

  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalExcluir, setModalExcluir] = useState(false);

  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {

    carregarProdutos();

  }, []);

  async function carregarProdutos() {

    try {

      setLoading(true);

      const data = await listarProdutos();

      setProdutos(data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  }

  function editarProduto(produto) {

    setProdutoSelecionado(produto);

    setModalEditar(true);

  }

  function abrirExcluir(produto) {

    setProdutoSelecionado(produto);

    setModalExcluir(true);

  }

  async function confirmarExcluir() {

    if (!produtoSelecionado) return;

    try {

      setExcluindo(true);

      await excluirProduto(produtoSelecionado.id);

      setModalExcluir(false);

      setProdutoSelecionado(null);

      await carregarProdutos();

    }

    catch (error) {

      alert(error.message);

    }

    finally {

      setExcluindo(false);

    }

  }

  const produtosFiltrados = useMemo(() => {

    const texto = search.toLowerCase();

    return produtos.filter((produto) =>

      produto.name.toLowerCase().includes(texto) ||

      produto.code.toLowerCase().includes(texto)

    );

  }, [produtos, search]);

  const columns = [

      { key: "code", label: "Código" },

      { key: "name", label: "Nome" },

      { key: "tipo", label: "Tipo" },

      {
          key: "price",
          label: "Preço",
          render: (row) =>
              Number(row.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
              })
      },

      { key: "qty", label: "Qtd" },

      { key: "status", label: "Status" }

  ];

  return (

    <>

      <div
        style={{
          minHeight: "100vh",
          background: "#0F1115"
        }}
      >

        <Header

          title="Consultar estoque"

          onBack={() => navigate("/")}

        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: 20
          }}
        >

          <TableToolbar

            search={search}

            setSearch={setSearch}

            total={produtosFiltrados.length}

            buttonLabel="Novo Produto"

            onButtonClick={() => navigate("/produtos")}

          />

          {

            loading

              ?

              <p style={{ color: "white" }}>

                Carregando...

              </p>

              :

              <DataTable

                columns={columns}

                data={produtosFiltrados}

                onEdit={editarProduto}

                onDelete={abrirExcluir}

              />

          }

        </div>

      </div>

      <EditProductModal

        open={modalEditar}

        product={produtoSelecionado}

        onClose={() => {

          setModalEditar(false);

          setProdutoSelecionado(null);

        }}

        onSuccess={carregarProdutos}

      />

      <ConfirmDialog

        open={modalExcluir}

        title="Excluir Produto"

        message={`Deseja realmente excluir "${produtoSelecionado?.name}"?`}

        confirmLabel="Excluir"

        loading={excluindo}

        onConfirm={confirmarExcluir}

        onCancel={() => {

          setModalExcluir(false);

          setProdutoSelecionado(null);

        }}

      />

    </>

  );

}