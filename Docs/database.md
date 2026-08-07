# 🗄️ Banco de Dados

## Objetivo

Documentar toda a estrutura do banco de dados utilizada pelo sistema.

Este documento deverá ser atualizado sempre que uma nova tabela, relacionamento ou regra de negócio for criada.

---

# Banco

PostgreSQL (Supabase)

---

# Diagrama Geral

auth.users

│

▼

products

│

▼

stock_movements

---

# Tabelas

# products

Responsável pelo cadastro dos produtos.

## Campos

| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | bigint | Identificador do produto |
| code | text | Código do produto |
| name | text | Nome do produto |
| tipo | text | Categoria |
| qty | integer | Quantidade atual em estoque |
| min | integer | Estoque mínimo |
| criado_em | timestamptz | Data de criação |

---

## Responsabilidade

Esta tabela armazena apenas o estado atual do produto.

O histórico de movimentações não deve ser armazenado nesta tabela.

---

# stock_movements

Responsável pelo histórico de movimentações.

## Campos

| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | bigint | Identificador |
| product_id | bigint | Produto relacionado |
| movement_type | text | Tipo da movimentação |
| quantity | integer | Quantidade movimentada |
| invoice_number | text | Número da Nota Fiscal |
| observation | text | Observação |
| user_id | uuid | Usuário responsável |
| created_at | timestamptz | Data da movimentação |

---

## Tipos de movimentação

| Código | Descrição |
|----------|-----------|
| ENTRY | Entrada |
| SALE | Venda |
| ADJUSTMENT | Ajuste |
| RETURN | Devolução |

---

## Relacionamentos

products (1)

↓

stock_movements (N)

Um produto pode possuir infinitas movimentações.

---

auth.users (1)

↓

stock_movements (N)

Cada movimentação pode ser associada ao usuário que realizou a operação.

---

# Filosofia do Estoque

O estoque atual é armazenado em:

products.qty

O histórico é armazenado em:

stock_movements

Nunca utilizar stock_movements para armazenar saldo.

Nunca utilizar products para armazenar histórico.

Cada tabela possui apenas uma responsabilidade.

---

# Índices

## stock_movements

idx_stock_product

idx_stock_created

idx_stock_type

---

# Policies

Tabela:

stock_movements

Policies criadas:

- SELECT autenticado
- INSERT autenticado

---

# Próximas Tabelas

Estas tabelas serão criadas nos próximos Sprints.

## clients

Cadastro de clientes.

---

## orders

Cabeçalho dos pedidos.

---

## order_items

Itens do pedido.

---

## profiles

Usuários do sistema.

---

## settings

Configurações do sistema.

---

# Convenções

IDs

Preferencialmente BIGINT (compatível com products).

Datas

Sempre timestamptz.

Valores monetários

Decimal.

Históricos

Nunca apagar registros.

Sempre registrar movimentações.

# Clients

Tabela responsável pelo cadastro de clientes.

## Campos

| Campo | Tipo |
|--------|------|
| id | bigint |
| name | text |
| document | text |
| phone | text |
| birth_date | date |
| email | text |
| address | text |
| notes | text |
| last_purchase | date |
| total_orders | integer |
| created_at | timestamptz |

---

# Orders

| Campo | Tipo | Descrição |
|--------|------|-----------|
| payment_method | text | Forma de pagamento (PIX, CREDIT, DEBIT ou CASH) |

## Campos

| Campo | Tipo |
|--------|------|
| id | bigint |
| client_id | bigint |
| status | text |
| total | numeric |
| user_id | uuid |
| created_at | timestamptz |

Status permitidos:

- OPEN
- FINISHED
- CANCELLED

---

# Order Items

Itens pertencentes a um pedido.

## Campos

| Campo | Tipo |
|--------|------|
| id | bigint |
| order_id | bigint |
| product_id | bigint |
| quantity | integer |
| unit_price | numeric |
| subtotal | numeric |