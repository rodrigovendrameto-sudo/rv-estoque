import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CadastroProdutos from "./pages/CadastroProdutos";
import Estoque from "./pages/Estoque";
import EntradaEstoque from "./pages/EntradaEstoque";

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return null; // ou um spinner
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produtos"
        element={
          <ProtectedRoute>
            <CadastroProdutos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/estoque"
        element={
            <ProtectedRoute>
                <Estoque/>
            </ProtectedRoute>
        }
      />
      <Route
        path="/entrada"
        element={
          <ProtectedRoute>
            <EntradaEstoque />
          </ProtectedRoute>
        }
      />
      {/* Próximas rotas a criar, espelhando as telas do protótipo:
          /pedidos  /estoque  /estoque/inventario  /entrada
          /produtos/novo  /clientes  /clientes/:id/historico
          /vendas-mes  /agenda  /usuarios  /trocar-senha  /editar-loja */}
    </Routes>
  );
}
