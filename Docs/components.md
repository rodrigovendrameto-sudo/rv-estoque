# 🧩 Componentes do Sistema

## Objetivo

Documentar todos os componentes reutilizáveis utilizados no sistema.

Este documento deve ser atualizado sempre que um novo componente reutilizável for criado.

---

# Organização

Todos os componentes ficam dentro da pasta:

src/components/

Os componentes são organizados por domínio.

Exemplo:

components/

common/

products/

tables/

ui/

---

# Componentes

## common/

Componentes utilizados em diversas telas.

---

### Header.jsx

Responsável pelo cabeçalho das páginas.

Funções

- Exibir título da tela
- Botão voltar
- Padronização visual

Utilizado em:

- Cadastro de Produtos
- Estoque
- Entrada de Estoque
- Futuras telas

---

### Modal.jsx

Janela modal reutilizável.

Utilizado para:

- Edição
- Visualização
- Formulários

---

### ConfirmDialog.jsx

Modal de confirmação.

Utilizado para:

- Exclusão
- Confirmações críticas

---

# ui/

Componentes simples de interface.

---

### Label.jsx

Padroniza os títulos dos campos.

Utilizado em praticamente todos os formulários.

---

# products/

Componentes relacionados aos produtos.

---

### ProductForm.jsx

Formulário reutilizável.

Responsável por:

- Cadastro
- Edição

---

### ProductSelect.jsx

Seleção de produtos.

Versão atual:

- Select tradicional

Melhorias futuras:

- Autocomplete
- Pesquisa inteligente
- Código de barras

---

# tables/

Componentes relacionados às tabelas.

---

### DataTable.jsx

Tabela reutilizável do sistema.

Responsável por:

- Exibição dos registros
- Botões de ação
- Layout padronizado

---

### TableToolbar.jsx

Barra superior da tabela.

Responsável por:

- Pesquisa
- Botões de ação
- Filtros futuros

---

# styles/

Embora não sejam componentes React, também fazem parte da padronização.

---

### inputStyle.js

Padroniza todos os inputs do sistema.

Objetivo

Evitar repetição de estilos.

---

# Convenções

Todo componente deve possuir apenas uma responsabilidade.

Sempre que possível:

- Reutilizável
- Pequeno
- Independente
- Fácil manutenção

---

# Fluxo

Página

↓

Componentes

↓

Services

↓

Banco

---

# Backlog de Componentes

Componentes previstos para futuras versões.

## Produtos

- ProductCard
- ProductInfo
- ProductStatus

---

## Clientes

- ClientForm
- ClientSelect
- ClientCard

---

## Pedidos

- OrderForm
- OrderItem
- OrderSummary

---

## Dashboard

- StatCard
- ChartCard
- KPIBox

---

# Boas práticas

Sempre verificar se um componente semelhante já existe antes de criar um novo.

Caso exista, priorizar reutilização em vez de duplicação de código.

Cada novo componente deverá ser documentado neste arquivo.

## ClientForm

Responsável pelo formulário de edição de clientes.

Utilizado em:

- Clientes.jsx

---

## CadastroClientes

Tela responsável pelo cadastro de novos clientes.

---

## Clients

Tela responsável por:

- Listagem
- Pesquisa
- Edição
- Exclusão

## Orders

### ClientSelect

Seleciona o cliente do pedido.

### PaymentMethodSelect

Seleciona a forma de pagamento.

### ProductSelect

Seleciona produtos para o carrinho.

### CartTable

Lista os produtos adicionados.

### OrderSummary

Exibe resumo do pedido e finalização.