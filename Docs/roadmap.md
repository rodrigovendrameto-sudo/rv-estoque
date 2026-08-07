# 📦 Roadmap - Sistema de Controle de Estoque

## Sobre o projeto

Sistema web desenvolvido pela **RV Soluções** para gerenciamento de estoque, vendas e clientes.

O objetivo é entregar um sistema moderno, simples de utilizar e preparado para futuras expansões.

---

# Status do Projeto

| Sprint | Módulo | Status |
|---------|---------|--------|
| Sprint 1 | Infraestrutura | ✅ Concluído |
| Sprint 2 | CRUD de Produtos | ✅ Concluído |
| Sprint 3 | Entrada de Estoque | ✅ Concluído |
| Sprint 4 | Pedidos de Venda | ✅ Concluído |
| Sprint 5 | Clientes | ✅ Concluído |
| Sprint 6 | Inventário | ⏳ Próximo |
| Sprint 7 | Usuários | ⏳ Pendente |
| Sprint 8 | Dashboard de Vendas | ⏳ Pendente |
| Sprint 9 | Configurações do Sistema | ⏳ Pendente |
| Sprint 10 | Testes Finais e Deploy | ⏳ Pendente |

> **Observação**
>
> Durante o desenvolvimento foi necessário implementar o Sprint 5 (Clientes) antes do Sprint 4 (Pedidos de Venda), pois o módulo de vendas depende do cadastro de clientes. Após essa dependência ser resolvida, o Sprint 4 foi concluído normalmente.

---

# MVP (Versão 1.0)

## Autenticação

- [x] Login
- [x] Controle de acesso
- [ ] Usuários

---

## Produtos

- [x] Cadastro
- [x] Consulta
- [x] Pesquisa
- [x] Editar
- [x] Excluir

---

## Estoque

- [x] Entrada de Estoque
- [x] Pedidos de Venda
- [ ] Inventário
- [ ] Ajustes de Estoque
- [x] Histórico de Movimentações

---

## Clientes

- [x] Cadastro
- [x] Consulta
- [x] Editar
- [x] Excluir

---

## Dashboard

- [ ] Indicadores
- [ ] Produtos mais vendidos
- [ ] Vendas do mês
- [ ] Estoque baixo

---

## Configurações

- [ ] Nome da Loja
- [ ] Logotipo
- [ ] Tema Claro/Escuro
- [ ] Dados da Empresa

---

# Backlog de Melhorias

Estas funcionalidades não fazem parte do MVP, mas estão previstas para futuras versões.

## Interface

- ProductSelect com Autocomplete
- Cadastro rápido de clientes na tela de pedidos
- Toasts personalizados
- Pesquisa Inteligente
- Filtros Avançados
- Atalhos de Teclado

---

## Estoque

- Leitor de Código de Barras
- QR Code
- Importação por Excel
- Exportação para Excel
- Transação completa na finalização dos pedidos (Rollback)

---

## Dashboard

- Dashboard Avançado
- Indicadores por forma de pagamento
- Gráficos
- Indicadores Financeiros

---

## Performance

- Lazy Loading
- Cache
- Virtual Scroll
- Paginação

---

## Arquitetura

- ADR (Architecture Decision Record)

---

## Integrações Futuras

- WhatsApp
- E-mail
- API Pública
- ERP

---

# Versão Atual

**Versão:** **0.5.0**

### Histórico

**0.1.0**

- Infraestrutura inicial
- Login
- Supabase

---

**0.2.0**

- CRUD de Produtos

---

**0.3.0**

- Entrada de Estoque
- Histórico de Movimentações

---

**0.4.0**

- Módulo de Pedidos de Venda
- Carrinho de Compras
- Finalização de Pedidos
- Controle de Estoque Automático
- Registro automático de Movimentações
- Forma de Pagamento
- Integração entre Produtos, Estoque e Clientes

---

**0.5.0**

- CRUD completo de Clientes
- Integração com Pedidos de Venda
- Atualização automática da Última Compra

# Estatísticas do Projeto

Sprints Concluídos: 5 / 10

Módulos Principais Concluídos:

- ✅ Login
- ✅ Produtos
- ✅ Estoque
- ✅ Movimentações
- ✅ Pedidos de Venda
- ✅ Clientes

Próximo objetivo:

➡️ Sprint 6 — Inventário