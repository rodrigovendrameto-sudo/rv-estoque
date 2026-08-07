# 🏗️ Arquitetura do Sistema

## Objetivo

O sistema foi desenvolvido utilizando uma arquitetura baseada em componentes reutilizáveis, separação de responsabilidades e integração com o Supabase.

Essa estrutura facilita manutenção, expansão e reutilização de código em futuros projetos da RV Soluções.

---

# Stack Tecnológica

## Front-end

- React
- React Router
- Vite
- CSS
- Lucide React

---

## Back-end

- Supabase

---

## Banco de Dados

- PostgreSQL (Supabase)

---

# Estrutura do Projeto

src/

├── components/

├── pages/

├── services/

├── context/

├── lib/

├── styles/

├── constants/

└── assets/

---

# Responsabilidade de cada pasta

## assets/

Imagens, logotipos e arquivos estáticos.

---

## components/

Componentes reutilizáveis.

Exemplos:

- Header
- Modal
- ConfirmDialog
- ProductForm
- ProductSelect
- DataTable
- TableToolbar

---

## pages/

Telas do sistema.

Cada página representa uma funcionalidade.

Exemplos:

- Home
- Login
- CadastroProdutos
- Estoque
- EntradaEstoque

---

## services/

Camada responsável pela comunicação com o banco de dados.

Nenhuma página acessa o Supabase diretamente.

Exemplos:

- productsService
- stockMovementService

---

## context/

Gerenciamento de estados globais.

Exemplo:

- AuthContext

---

## lib/

Configuração de bibliotecas.

Exemplo:

- supabaseClient

---

## styles/

Funções e estilos reutilizáveis.

Exemplo:

- inputStyle

---

## constants/

Constantes do sistema.

Exemplo:

- theme

---

# Arquitetura em Camadas

Interface (Pages)

↓

Componentes

↓

Services

↓

Supabase

↓

Banco de Dados

---

# Fluxo da Aplicação

Usuário

↓

Página

↓

Componente

↓

Service

↓

Supabase

↓

Banco

---

# Princípios adotados

- Componentização
- Reutilização de código
- Separação de responsabilidades
- Organização por domínio
- Código de fácil manutenção
- Interface padronizada

---

# Componentes Reutilizáveis

## Common

- Header
- Modal
- ConfirmDialog

---

## Products

- ProductForm
- ProductSelect

---

## Tables

- DataTable
- TableToolbar

---

# Services

## productsService

Responsável pelo gerenciamento de produtos.

Funções:

- listarProdutos()
- criarProduto()
- atualizarProduto()
- excluirProduto()
- buscarProdutoPorId()

---

## stockMovementService

Responsável pelas movimentações de estoque.

Funções:

- registrarMovimentacao()
- listarMovimentacoes()

---

# Fluxo de Desenvolvimento

Todo desenvolvimento segue o padrão:

1. Planejamento do Sprint

2. Desenvolvimento

3. Testes

4. Commit

5. Documentação

6. Próximo Sprint

---

# Padrões do Projeto

Sempre que possível:

- Componentes reutilizáveis
- Services desacoplados
- Uma responsabilidade por arquivo
- Arquivos pequenos e organizados
- Código limpo
- Refatoração após conclusão do MVP

---

# Filosofia do Projeto

O projeto possui dois backlogs.

## 🚀 MVP

Funcionalidades obrigatórias para entrega ao cliente.

## 💎 Melhorias

Funcionalidades que agregam valor e serão entregues em versões futuras.

# Convenções de Desenvolvimento

## Banco de Dados

### Tabelas

Sempre no plural.

Exemplos:

- products
- clients
- orders
- order_items
- stock_movements

---

### Colunas

Sempre em inglês.

Sempre utilizando snake_case.

Exemplos:

- created_at
- updated_at
- birth_date
- total_orders
- unit_price

---

### Chaves Estrangeiras

Sempre:

- product_id
- client_id
- order_id
- user_id

---

## React

### Pages

Representam telas.

Exemplo:

CadastroProdutos.jsx

EntradaEstoque.jsx

Pedidos.jsx

---

### Components

Representam elementos reutilizáveis.

---

### Services

Responsáveis exclusivamente pela comunicação com o banco.

Nunca acessar o Supabase diretamente nas páginas.

---

## Regra Geral

Sempre priorizar:

- Componentização
- Reutilização
- Padronização
- Clareza