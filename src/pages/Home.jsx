import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Este é o ponto de partida da tela inicial (dashboard + 5 opções do protótipo).
// Continue migrando o JSX do protótipo (troos-estoque-app.jsx) para cá,
// trocando os "useState" de dados mock por chamadas ao Supabase
// (ver src/lib/supabaseClient.js). Sugestão: um hook por entidade,
// ex. src/hooks/useProducts.js, useClients.js, useOrders.js etc.
export default function Home() {
  const { profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary text-secondary p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-secondary/60">Olá,</p>
          <p className="font-display font-semibold text-lg">{profile?.nome}</p>
        </div>
        <button
          onClick={signOut}
          className="text-xs font-semibold uppercase tracking-wide border border-white/10 rounded-lg px-3 py-2"
        >
          Sair
        </button>
      </div>

      <div className="bg-tertiary border border-white/10 rounded-xl p-4">
        <p className="text-sm text-secondary/70">
        </p>
        <button
          onClick={() => navigate("/produtos")}
        >
          Cadastrar Produtos
        </button>
        {isAdmin && (
          <p className="text-xs text-secondary/50 mt-2">
            Você está logado como administrador — Inventário, Vendas do mês, Agenda,
            Usuários e Editar loja ficam liberados.
          </p>
        )}
      </div>
    </div>
  );
}
