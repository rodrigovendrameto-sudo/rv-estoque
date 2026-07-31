# Sistema de Estoque — Produção

Projeto Vite + React + Tailwind + Supabase, migrado do protótipo interativo.

## 1. Instalar e rodar localmente

```bash
npm install
cp .env.example .env
# edite o .env com a URL e a anon key do seu projeto Supabase
npm run dev
```

## 2. Banco de dados

O arquivo `supabase/schema.sql` cria todas as tabelas, políticas de segurança
(RLS) e alguns produtos de exemplo. Cole o conteúdo dele no **SQL Editor** do
seu projeto Supabase e clique em **Run**.

Depois, crie o primeiro usuário administrador:

1. Supabase → **Authentication** → **Users** → **Add user** (email + senha)
2. No **SQL Editor**, rode (trocando o e-mail):
   ```sql
   update profiles set perfil = 'admin', protegido = true, nome = 'Suporte'
   where id = (select id from auth.users where email = 'seu@email.com');
   ```

## 3. O que já está pronto neste scaffold

- Login real via Supabase Auth (`src/pages/Login.jsx`)
- Contexto de autenticação com perfil admin/colaborador (`src/context/AuthContext.jsx`)
- Rota protegida básica (`src/App.jsx`)
- Tema escuro/claro via CSS variables, igual ao protótipo (`src/index.css`)
- Cliente Supabase configurado (`src/lib/supabaseClient.js`)

## 4. Roteiro para migrar o resto do protótipo

Recomendo continuar esse projeto no **Claude Code** a partir daqui — é um
trabalho de várias telas e arquivos, e o Claude Code é feito exatamente pra
esse tipo de tarefa (edita múltiplos arquivos, roda o projeto, testa).

Ordem sugerida (cada item = uma tela do protótipo original):

| Tela do protótipo | Arquivo a criar | Tabela(s) Supabase |
|---|---|---|
| Pedidos de venda | `src/pages/Pedidos.jsx` | `products`, `clients`, `orders`, `order_items` |
| Consultar estoque | `src/pages/Estoque.jsx` | `products` |
| Entrada no estoque | `src/pages/Entrada.jsx` | `products` |
| Cadastrar produtos | `src/pages/CadastrarProduto.jsx` | `products` |
| Cadastro de clientes | `src/pages/Clientes.jsx` | `clients` |
| Histórico do cliente | `src/pages/ClienteHistorico.jsx` | `orders`, `order_items` |
| Relatórios de clientes | `src/pages/ClientesRelatorios.jsx` | `clients` |
| Dashboard + Vendas do mês | `src/pages/VendasMes.jsx` | `orders`, `order_items`, `events` |
| Agenda de eventos | `src/pages/Agenda.jsx` | `events` |
| Inventário (CSV/PDF) | `src/pages/Inventario.jsx` | `products` |
| Usuários | `src/pages/Usuarios.jsx` | `profiles` |
| Trocar senha | `src/pages/TrocarSenha.jsx` | Supabase Auth (`updateUser`) |
| Editar loja | `src/pages/EditarLoja.jsx` | `store_settings` |

Para cada uma, o padrão é:
1. Buscar dados com `supabase.from("tabela").select()`
2. Trocar `useState(dadosMock)` por `useEffect` + a query acima
3. Reaproveitar o JSX visual do protótipo (cores, layout, textos) —
   isso não muda, só a origem dos dados
4. Trocar as funções que faziam `setState([...algo, novoItem])` por
   `supabase.from("tabela").insert(...)`, `.update(...)` ou `.delete(...)`

## 5. Publicar no Vercel

```bash
npm i -g vercel
vercel
```

Na primeira vez, ele vai pedir para conectar sua conta e o repositório.
Configure as variáveis de ambiente (`VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`) no painel do Vercel em **Settings → Environment
Variables** — os mesmos valores do seu `.env`.
