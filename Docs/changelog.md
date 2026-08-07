# 📋 Changelog

Todas as alterações relevantes do sistema serão registradas neste documento.

O objetivo é manter um histórico organizado da evolução do projeto.

---

# Versionamento

O projeto utiliza Versionamento Semântico (Semantic Versioning).

Formato:

MAJOR.MINOR.PATCH

Exemplos:

1.0.0

1.1.0

1.1.1

---

## Regras

### MAJOR

Grandes mudanças.

Exemplo:

Versão 2.0

---

### MINOR

Novas funcionalidades.

Exemplo:

Novo módulo.

---

### PATCH

Correções.

Exemplo:

Correção de bugs.

---

# Histórico

---

## Versão 0.1.0

Sprint 1

Status

✅ Concluído

### Adicionado

- Estrutura inicial do projeto
- Integração com Supabase
- Login
- Controle de acesso
- React Router
- Home inicial
- Arquitetura baseada em componentes

---

## Versão 0.2.0

Sprint 2

Status

✅ Concluído

### Adicionado

- Cadastro de Produtos
- Consulta de Estoque
- DataTable
- ProductForm
- ProductSelect (estrutura inicial)
- TableToolbar
- Modal
- ConfirmDialog

### Melhorado

- Organização dos Services
- Componentização
- Layout das tabelas

---

## Versão 0.3.0

Sprint 3

Status

✅ Concluído

### Adicionado

- Entrada de Estoque
- stock_movements
- stockMovementService
- Histórico de movimentações
- Policies do Supabase
- ProductSelect reutilizável

### Melhorado

- Refatoração do stockMovementService
- Separação entre saldo atual e histórico
- Arquitetura de movimentações
- UX do campo quantidade
- Acesso à Entrada de Estoque pela Home

---

# v0.5.0

Data: 07/08/2026

## Sprint 4 - Pedidos de Venda

### Adicionado

- Módulo completo de pedidos
- Carrinho de compras
- Seleção de clientes
- Seleção de produtos
- Controle de quantidades
- Finalização da venda
- Atualização automática do estoque
- Registro de movimentações
- Atualização da última compra
- Campo de forma de pagamento

### Melhorias

- Integração completa entre Produtos, Clientes e Estoque.

---

## Sprint 5 - Clientes

### Adicionado

- CRUD completo de clientes
- Pesquisa por nome
- Atualização de dados
- Exclusão de clientes
- Integração com pedidos

---

# Próximas versões

## 0.6.0

Sprint 6

Inventário

---

## 0.7.0

Sprint 7

Usuários

---

## 0.8.0

Sprint 8

Dashboard

---

## 0.9.0

Sprint 9

Configurações

---

## 1.0.0

MVP Finalizado

Primeira versão oficial do sistema.

---

# Convenções

Sempre registrar:

- Novas funcionalidades
- Correções
- Refatorações importantes
- Mudanças de arquitetura
- Alterações no banco de dados

Não registrar:

- Ajustes de formatação
- Alterações visuais pequenas
- Comentários
- Mudanças sem impacto funcional