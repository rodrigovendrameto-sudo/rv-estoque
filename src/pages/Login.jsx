import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Informe usuário e senha para entrar.");
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-secondary px-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col items-center">
        <h1 className="font-display font-bold text-2xl uppercase tracking-wide mb-1 text-center">
          Sistema de Estoque
        </h1>
        <p className="text-sm text-secondary/60 mb-10">Acesso restrito a colaboradores.</p>

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="w-full mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary/60 mb-1.5">
            E-mail
          </label>
          <div className="relative">
            <UserIcon size={15} className="absolute left-3 top-3.5 text-secondary/50" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-tertiary border border-white/10 rounded-lg py-3 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-secondary/40"
              placeholder="voce@loja.com"
            />
          </div>
        </div>

        <div className="w-full mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary/60 mb-1.5">
            Senha
          </label>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-3.5 text-secondary/50" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-tertiary border border-white/10 rounded-lg py-3 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-secondary/40"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-secondary text-primary font-display font-semibold uppercase tracking-wide text-sm rounded-lg py-3.5 disabled:opacity-60"
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
