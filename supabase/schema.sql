-- ============================================================
-- SCHEMA DO SISTEMA DE CONTROLE DE ESTOQUE
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique em Run.
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROFILES (usuários do sistema, ligados ao Supabase Auth)
-- ------------------------------------------------------------
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  nome text not null,
  perfil text not null default 'colaborador' check (perfil in ('admin', 'colaborador')),
  protegido boolean not null default false, -- usuário de suporte que não pode ser editado/excluído
  criado_em timestamptz default now()
);

-- Cria automaticamente uma linha em "profiles" toda vez que alguém
-- se cadastra pelo Supabase Auth (auth.users)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome, perfil)
  values (new.id, coalesce(new.raw_user_meta_data->>'nome', new.email), 'colaborador');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- 2. PRODUCTS (estoque)
-- ------------------------------------------------------------
create table products (
  id bigint generated always as identity primary key,
  code text unique not null,
  name text not null,
  tipo text not null,
  qty integer not null default 0,
  min integer not null default 10,
  criado_em timestamptz default now()
);

-- ------------------------------------------------------------
-- 3. CLIENTS (cadastro de clientes)
-- ------------------------------------------------------------
create table clients (
  id bigint generated always as identity primary key,
  nome text not null,
  cpf text unique not null,
  celular text not null,
  nascimento date not null,
  email text,
  endereco text,
  obs text,
  ultima_compra date,
  qtd_pedidos integer not null default 0,
  criado_em timestamptz default now()
);

-- ------------------------------------------------------------
-- 4. ORDERS + ORDER_ITEMS (pedidos de venda)
-- ------------------------------------------------------------
create table orders (
  id bigint generated always as identity primary key,
  cliente_id bigint references clients(id),
  forma_pagamento text not null,
  criado_por uuid references profiles(id),
  criado_em timestamptz default now()
);

create table order_items (
  id bigint generated always as identity primary key,
  order_id bigint references orders(id) on delete cascade,
  product_code text not null,
  product_name text not null,
  qty integer not null
);

-- ------------------------------------------------------------
-- 5. EVENTS (agenda de eventos da loja)
-- ------------------------------------------------------------
create table events (
  id bigint generated always as identity primary key,
  data date not null,
  titulo text not null,
  notas text,
  criado_em timestamptz default now()
);

-- ------------------------------------------------------------
-- 6. STORE_SETTINGS (nome, tema e logo da loja — linha única)
-- ------------------------------------------------------------
create table store_settings (
  id boolean primary key default true check (id),
  nome_loja text not null default 'Sistema de Estoque',
  tema text not null default 'dark' check (tema in ('dark', 'light')),
  logo_url text
);

insert into store_settings (id) values (true);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Regra geral: qualquer usuário autenticado pode ler e operar
-- o dia a dia (pedidos, estoque, clientes). Usuários, eventos
-- da agenda e configurações da loja só podem ser alterados
-- por quem tem perfil = 'admin' na tabela profiles.
-- ============================================================

alter table profiles enable row level security;
alter table products enable row level security;
alter table clients enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table events enable row level security;
alter table store_settings enable row level security;

-- Função auxiliar: o usuário logado é admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and perfil = 'admin'
  );
$$ language sql security definer stable;

-- PROFILES: todo mundo autenticado lê; só admin cria/edita/exclui;
-- o usuário "protegido" nunca pode ser alterado ou excluído.
create policy "profiles_select" on profiles for select
  using (auth.role() = 'authenticated');

create policy "profiles_insert_admin" on profiles for insert
  with check (public.is_admin());

create policy "profiles_update_admin" on profiles for update
  using (public.is_admin() and protegido = false);

create policy "profiles_delete_admin" on profiles for delete
  using (public.is_admin() and protegido = false);

-- PRODUCTS: qualquer autenticado lê e opera (entrada, cadastro, consulta)
create policy "products_select" on products for select
  using (auth.role() = 'authenticated');
create policy "products_write" on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- CLIENTS: qualquer autenticado lê e opera
create policy "clients_select" on clients for select
  using (auth.role() = 'authenticated');
create policy "clients_write" on clients for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ORDERS / ORDER_ITEMS: qualquer autenticado lê e cria (pedidos de venda)
create policy "orders_select" on orders for select
  using (auth.role() = 'authenticated');
create policy "orders_write" on orders for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "order_items_select" on order_items for select
  using (auth.role() = 'authenticated');
create policy "order_items_write" on order_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- EVENTS: todo mundo autenticado lê (aparece nos relatórios);
-- só admin cria/edita/exclui (gestão da agenda)
create policy "events_select" on events for select
  using (auth.role() = 'authenticated');
create policy "events_write_admin" on events for insert
  with check (public.is_admin());
create policy "events_update_admin" on events for update
  using (public.is_admin());
create policy "events_delete_admin" on events for delete
  using (public.is_admin());

-- STORE_SETTINGS: todo mundo autenticado lê (nome/tema/logo aparecem
-- no login); só admin atualiza (Editar loja)
create policy "store_settings_select" on store_settings for select
  using (auth.role() = 'authenticated');
create policy "store_settings_update_admin" on store_settings for update
  using (public.is_admin());

-- ============================================================
-- DADOS DE EXEMPLO (opcional — apague este bloco se não quiser)
-- ============================================================
insert into products (code, name, tipo, qty, min) values
  ('WP-001', 'Whey Protein Concentrado 900g', 'Proteína', 42, 15),
  ('CR-002', 'Creatina Monohidratada 300g', 'Creatina', 8, 15),
  ('BC-003', 'BCAA 2:1:1 100 cápsulas', 'Aminoácido', 25, 10);

-- ============================================================
-- PRÓXIMO PASSO MANUAL (fora do SQL Editor):
-- 1. Vá em Authentication > Users > Add user e crie o primeiro
--    administrador (email + senha).
-- 2. Volte aqui no SQL Editor e rode, trocando o e-mail:
--
--    update profiles set perfil = 'admin', protegido = true,
--      nome = 'Suporte'
--    where id = (select id from auth.users where email = 'SEU_EMAIL_AQUI');
-- ============================================================
