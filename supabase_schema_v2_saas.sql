-- =========================================================================
-- DIGIAT STUDIO v2.0 — SUPABASE SAAS DATABASE MIGRATION SCRIPT
-- Platform Undangan Digital SaaS Multi-Role, Multi-Tier, Multi-Template
-- =========================================================================
-- PETUNJUK: Jalankan file ini STEP-BY-STEP di SQL Editor Supabase.
-- Setiap blok diberi nomor dan penjelasan dalam Bahasa Indonesia.
-- =========================================================================

-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN A: FONDASI — Extension & Enum Types                        ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 1: Aktifkan UUID Extension
create extension if not exists "uuid-ossp";

-- STEP 2: Buat tipe enum untuk role pengguna
-- Role: user (Klien Pengantin), admin (Super Admin), designer (Desainer), finance (Keuangan)
do $$ begin
  create type user_role as enum ('user', 'admin', 'designer', 'finance');
exception when duplicate_object then null;
end $$;

-- STEP 3: Buat tipe enum untuk tier langganan
-- free = Paket Gratis, pro = Pro 30 Hari, vip_agency = VIP Terima Beres
do $$ begin
  create type subscription_tier as enum ('free', 'pro', 'vip_agency');
exception when duplicate_object then null;
end $$;

-- STEP 4: Buat tipe enum untuk status langganan
do $$ begin
  create type subscription_status as enum ('active', 'expiring', 'expired');
exception when duplicate_object then null;
end $$;

-- STEP 5: Buat tipe enum untuk status pesanan VIP
do $$ begin
  create type vip_order_status as enum ('pending', 'in_progress', 'review', 'completed');
exception when duplicate_object then null;
end $$;

-- STEP 6: Buat tipe enum untuk status pembayaran
do $$ begin
  create type payment_status as enum ('pending', 'verified', 'rejected');
exception when duplicate_object then null;
end $$;


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN B: TABEL INTI UNDANGAN (dari v1, diperbarui)               ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 7: Tabel undangan — menyimpan seluruh data kustomisasi undangan
create table if not exists public.invitations (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  owner_id uuid references auth.users(id) on delete set null, -- Relasi ke Supabase Auth
  template_id text not null default 'javanese-royal',
  palette jsonb not null,
  groom_short text not null,
  groom_full text not null,
  groom_parents text,
  groom_instagram text,
  bride_short text not null,
  bride_full text not null,
  bride_parents text,
  bride_instagram text,
  wedding_date_iso text not null,
  wedding_date_display text not null,
  city text not null,
  hero_photo text,
  groom_photo text,
  bride_photo text,
  closing_photo text,
  gallery jsonb default '[]'::jsonb,
  love_story jsonb default '[]'::jsonb,
  events jsonb default '[]'::jsonb,
  banks jsonb default '[]'::jsonb,
  gift_address text,
  qris_image_url text,
  asset_config jsonb default '{
    "enableParallax": true,
    "parallaxIntensity": "medium",
    "bgTextureUrl": "",
    "bgTextureOpacity": 0.12,
    "bgTextureBlendMode": "luminosity",
    "cornerOrnamentUrl": "",
    "cornerOrnamentOpacity": 0.85,
    "sideBordersUrl": "",
    "dividerOrnamentUrl": "",
    "floatingMotifs": true
  }'::jsonb,
  audio_config jsonb default '{
    "sourceType": "preset_synth",
    "customMp3Url": "",
    "customMp3Title": "",
    "customMp3Artist": "",
    "autoPlay": true
  }'::jsonb,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_invitations_slug on public.invitations (slug);
create index if not exists idx_invitations_owner on public.invitations (owner_id);

-- STEP 8: Tabel daftar tamu — link tamu personal (?to=NamaTamu)
create table if not exists public.guest_list (
  id uuid primary key default uuid_generate_v4(),
  invitation_slug text references public.invitations(slug) on delete cascade,
  guest_name text not null,
  custom_wa_text text,
  attendance_status text default 'Belum Konfirmasi',
  pax_count integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_guest_list_slug on public.guest_list (invitation_slug);

-- STEP 9: Tabel ucapan & doa restu (buku tamu realtime)
create table if not exists public.guest_wishes (
  id uuid primary key default uuid_generate_v4(),
  invitation_slug text references public.invitations(slug) on delete cascade,
  guest_name text not null,
  relation text default 'Sahabat',
  attendance text not null,
  guests_count integer default 1,
  message text not null,
  adat_tag text default 'Doa Restu',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_guest_wishes_slug on public.guest_wishes (invitation_slug);


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN C: TABEL SAAS — Profil, Langganan, Pesanan, Pembayaran     ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 10: Tabel profil pengguna (terhubung dengan Supabase Auth)
-- Setiap user yang mendaftar via Supabase Auth akan otomatis mendapat profil
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text not null default '',
  phone text default '',
  role user_role not null default 'user',
  avatar_url text,
  couple_names text, -- Nama pasangan pengantin (khusus role 'user')
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_profiles_email on public.profiles (email);
create index if not exists idx_profiles_role on public.profiles (role);

-- STEP 11: Tabel langganan klien (Paket Free / Pro 30 Hari / VIP)
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  invitation_slug text references public.invitations(slug) on delete set null,
  tier subscription_tier not null default 'free',
  status subscription_status not null default 'active',
  start_date timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone, -- NULL = tidak pernah expired (paket free)
  allow_custom_assets boolean default false,
  allow_personalized_guests boolean default false,
  allow_wa_broadcast boolean default false,
  max_guests integer default 1, -- Free: 1 (broadcast), Pro: 5000, VIP: 10000
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_subscriptions_user on public.subscriptions (user_id);
create index if not exists idx_subscriptions_status on public.subscriptions (status);

-- STEP 12: Tabel pesanan VIP Terima Beres (ditangani Desainer)
create table if not exists public.agency_orders (
  id uuid primary key default uuid_generate_v4(),
  client_user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  invitation_slug text references public.invitations(slug) on delete set null,
  groom_bride_names text not null,
  template_id text not null,
  assigned_designer_id uuid references auth.users(id) on delete set null,
  assigned_designer_name text,
  status vip_order_status not null default 'pending',
  notes text default '',
  revision_count integer default 0,
  deadline timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_agency_orders_designer on public.agency_orders (assigned_designer_id);
create index if not exists idx_agency_orders_client on public.agency_orders (client_user_id);
create index if not exists idx_agency_orders_status on public.agency_orders (status);

-- STEP 13: Tabel konfigurasi harga paket (bisa diubah oleh role finance)
create table if not exists public.saas_pricing_plans (
  id subscription_tier primary key,
  name text not null,
  price_idr integer not null default 0,
  duration_label text not null default '',
  description text not null default '',
  badge text not null default '',
  features jsonb not null default '[]'::jsonb,
  is_recommended boolean default false,
  is_active boolean default true,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STEP 14: Tabel transaksi pembayaran (verifikasi oleh role finance)
create table if not exists public.payment_transactions (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique not null, -- Format: TRX-XXXX
  user_id uuid references auth.users(id) on delete set null,
  client_name text not null,
  client_email text not null,
  tier subscription_tier not null,
  amount_idr integer not null,
  payment_method text not null default 'Transfer Bank',
  proof_image_url text, -- URL bukti transfer di Supabase Storage
  status payment_status not null default 'pending',
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamp with time zone,
  notes text,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_transactions_status on public.payment_transactions (status);
create index if not exists idx_transactions_user on public.payment_transactions (user_id);
create index if not exists idx_transactions_invoice on public.payment_transactions (invoice_number);


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN D: ROW LEVEL SECURITY (RLS) — Keamanan Akses Per Role      ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 15: Aktifkan RLS pada semua tabel
alter table public.invitations enable row level security;
alter table public.guest_list enable row level security;
alter table public.guest_wishes enable row level security;
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.agency_orders enable row level security;
alter table public.saas_pricing_plans enable row level security;
alter table public.payment_transactions enable row level security;

-- STEP 16: Helper function untuk mengambil role user saat ini
create or replace function public.get_user_role()
returns user_role
language sql
stable
security definer
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- STEP 17: RLS Policies — PROFILES
-- Semua user bisa lihat profil sendiri
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Admin bisa lihat semua profil
drop policy if exists "Admin can view all profiles" on public.profiles;
create policy "Admin can view all profiles"
  on public.profiles for select
  using (public.get_user_role() = 'admin');

-- User bisa update profil sendiri
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin bisa update semua profil (termasuk ubah role)
drop policy if exists "Admin can update any profile" on public.profiles;
create policy "Admin can update any profile"
  on public.profiles for update
  using (public.get_user_role() = 'admin');

-- STEP 18: RLS Policies — INVITATIONS
-- Tamu (public / anonim) bisa baca undangan yang sudah dipublish
drop policy if exists "Public can read published invitations" on public.invitations;
create policy "Public can read published invitations"
  on public.invitations for select
  using (is_published = true);

-- Owner bisa baca undangan sendiri (termasuk yang belum publish)
drop policy if exists "Owner can read own invitations" on public.invitations;
create policy "Owner can read own invitations"
  on public.invitations for select
  using (auth.uid() = owner_id);

-- Owner bisa insert & update undangan sendiri
drop policy if exists "Owner can insert invitations" on public.invitations;
create policy "Owner can insert invitations"
  on public.invitations for insert
  with check (auth.uid() = owner_id);

drop policy if exists "Owner can update own invitations" on public.invitations;
create policy "Owner can update own invitations"
  on public.invitations for update
  using (auth.uid() = owner_id);

-- Admin & Designer bisa baca & update semua undangan
drop policy if exists "Admin can manage all invitations" on public.invitations;
create policy "Admin can manage all invitations"
  on public.invitations for all
  using (public.get_user_role() in ('admin', 'designer'));

-- STEP 19: RLS Policies — GUEST WISHES
-- Siapa saja bisa baca ucapan (ditampilkan di buku tamu)
drop policy if exists "Anyone can read wishes" on public.guest_wishes;
create policy "Anyone can read wishes"
  on public.guest_wishes for select
  using (true);

-- Siapa saja bisa kirim ucapan (tamu tanpa login)
drop policy if exists "Anyone can submit wishes" on public.guest_wishes;
create policy "Anyone can submit wishes"
  on public.guest_wishes for insert
  with check (true);

-- STEP 20: RLS Policies — GUEST LIST
-- Owner bisa kelola daftar tamu undangan sendiri
drop policy if exists "Owner can manage own guest list" on public.guest_list;
create policy "Owner can manage own guest list"
  on public.guest_list for all
  using (
    exists (
      select 1 from public.invitations
      where invitations.slug = guest_list.invitation_slug
      and invitations.owner_id = auth.uid()
    )
  );

-- Admin bisa lihat semua daftar tamu
drop policy if exists "Admin can view all guest lists" on public.guest_list;
create policy "Admin can view all guest lists"
  on public.guest_list for select
  using (public.get_user_role() = 'admin');

-- STEP 21: RLS Policies — SUBSCRIPTIONS
-- User bisa lihat langganan sendiri
drop policy if exists "User can view own subscription" on public.subscriptions;
create policy "User can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Admin & Finance bisa lihat dan kelola semua langganan
drop policy if exists "Admin/Finance can manage subscriptions" on public.subscriptions;
create policy "Admin/Finance can manage subscriptions"
  on public.subscriptions for all
  using (public.get_user_role() in ('admin', 'finance'));

-- STEP 22: RLS Policies — AGENCY ORDERS (VIP Terima Beres)
-- Klien VIP bisa lihat pesanan sendiri
drop policy if exists "Client can view own orders" on public.agency_orders;
create policy "Client can view own orders"
  on public.agency_orders for select
  using (auth.uid() = client_user_id);

-- Desainer bisa lihat dan update pesanan yang di-assign ke dia
drop policy if exists "Designer can manage assigned orders" on public.agency_orders;
create policy "Designer can manage assigned orders"
  on public.agency_orders for all
  using (auth.uid() = assigned_designer_id);

-- Admin bisa kelola semua pesanan
drop policy if exists "Admin can manage all orders" on public.agency_orders;
create policy "Admin can manage all orders"
  on public.agency_orders for all
  using (public.get_user_role() = 'admin');

-- STEP 23: RLS Policies — PRICING PLANS
-- Siapa saja bisa lihat harga (ditampilkan di halaman publik)
drop policy if exists "Anyone can view pricing" on public.saas_pricing_plans;
create policy "Anyone can view pricing"
  on public.saas_pricing_plans for select
  using (true);

-- Finance & Admin bisa update harga
drop policy if exists "Finance/Admin can update pricing" on public.saas_pricing_plans;
create policy "Finance/Admin can update pricing"
  on public.saas_pricing_plans for update
  using (public.get_user_role() in ('admin', 'finance'));

-- STEP 24: RLS Policies — PAYMENT TRANSACTIONS
-- User bisa lihat transaksi sendiri
drop policy if exists "User can view own transactions" on public.payment_transactions;
create policy "User can view own transactions"
  on public.payment_transactions for select
  using (auth.uid() = user_id);

-- User bisa submit bukti pembayaran baru
drop policy if exists "User can insert transactions" on public.payment_transactions;
create policy "User can insert transactions"
  on public.payment_transactions for insert
  with check (auth.uid() = user_id);

-- Finance & Admin bisa lihat dan verifikasi semua transaksi
drop policy if exists "Finance/Admin can manage transactions" on public.payment_transactions;
create policy "Finance/Admin can manage transactions"
  on public.payment_transactions for all
  using (public.get_user_role() in ('admin', 'finance'));


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN E: TRIGGER & FUNCTIONS — Otomasi Backend                   ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 25: Trigger — Auto-create profil saat user mendaftar via Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'couple_names', ''),
    'user'
  );

  -- Auto-create langganan Free untuk user baru
  insert into public.subscriptions (user_id, tier, status, max_guests)
  values (new.id, 'free', 'active', 1);

  return new;
end;
$$;

-- Pasang trigger pada auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- STEP 26: Function — Perpanjang langganan klien (+30 hari)
-- Dipanggil oleh Admin atau Finance
create or replace function public.extend_subscription(
  p_subscription_id uuid,
  p_additional_days integer default 30
)
returns void
language plpgsql
security definer
as $$
declare
  v_current_expiry timestamp with time zone;
  v_new_expiry timestamp with time zone;
begin
  -- Ambil tanggal expired saat ini
  select expires_at into v_current_expiry
  from public.subscriptions
  where id = p_subscription_id;

  -- Hitung dari sekarang jika sudah expired, atau dari tanggal expired jika masih aktif
  if v_current_expiry is null or v_current_expiry < now() then
    v_new_expiry := now() + (p_additional_days || ' days')::interval;
  else
    v_new_expiry := v_current_expiry + (p_additional_days || ' days')::interval;
  end if;

  -- Update langganan
  update public.subscriptions
  set
    expires_at = v_new_expiry,
    status = 'active',
    allow_custom_assets = true,
    allow_personalized_guests = true,
    allow_wa_broadcast = true,
    updated_at = now()
  where id = p_subscription_id;
end;
$$;

-- STEP 27: Function — Upgrade tier langganan klien
create or replace function public.upgrade_subscription(
  p_subscription_id uuid,
  p_new_tier subscription_tier,
  p_duration_days integer default 30
)
returns void
language plpgsql
security definer
as $$
begin
  update public.subscriptions
  set
    tier = p_new_tier,
    status = 'active',
    expires_at = now() + (p_duration_days || ' days')::interval,
    allow_custom_assets = (p_new_tier != 'free'),
    allow_personalized_guests = (p_new_tier != 'free'),
    allow_wa_broadcast = (p_new_tier != 'free'),
    max_guests = case
      when p_new_tier = 'free' then 1
      when p_new_tier = 'pro' then 5000
      when p_new_tier = 'vip_agency' then 10000
    end,
    updated_at = now()
  where id = p_subscription_id;
end;
$$;

-- STEP 28: Function — Verifikasi pembayaran & aktivasi langganan
create or replace function public.verify_payment(
  p_transaction_id uuid,
  p_verifier_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
  v_tier subscription_tier;
  v_user_id uuid;
  v_sub_id uuid;
begin
  -- Ambil data transaksi
  select tier, user_id, subscription_id
  into v_tier, v_user_id, v_sub_id
  from public.payment_transactions
  where id = p_transaction_id and status = 'pending';

  if not found then
    raise exception 'Transaksi tidak ditemukan atau sudah diverifikasi';
  end if;

  -- Update status transaksi
  update public.payment_transactions
  set
    status = 'verified',
    verified_by = p_verifier_id,
    verified_at = now()
  where id = p_transaction_id;

  -- Jika ada subscription_id terkait, upgrade/perpanjang
  if v_sub_id is not null then
    perform public.upgrade_subscription(v_sub_id, v_tier, 30);
  end if;
end;
$$;

-- STEP 29: Cron-like function untuk auto-expire langganan
-- Bisa dipanggil via Supabase Edge Functions atau pg_cron extension
create or replace function public.check_expired_subscriptions()
returns void
language plpgsql
security definer
as $$
begin
  -- Tandai langganan yang sudah melewati tanggal expired
  update public.subscriptions
  set
    status = 'expired',
    allow_custom_assets = false,
    allow_personalized_guests = false,
    allow_wa_broadcast = false,
    updated_at = now()
  where
    expires_at is not null
    and expires_at < now()
    and status != 'expired';

  -- Tandai yang hampir expired (sisa <= 7 hari)
  update public.subscriptions
  set
    status = 'expiring',
    updated_at = now()
  where
    expires_at is not null
    and expires_at > now()
    and expires_at < (now() + interval '7 days')
    and status = 'active';
end;
$$;

-- STEP 30: Auto-update timestamp pada tabel yang berubah
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Pasang trigger updated_at pada tabel-tabel utama
drop trigger if exists set_updated_at on public.invitations;
create trigger set_updated_at before update on public.invitations
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at on public.subscriptions;
create trigger set_updated_at before update on public.subscriptions
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at on public.agency_orders;
create trigger set_updated_at before update on public.agency_orders
  for each row execute procedure public.set_updated_at();


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN F: STORAGE BUCKET — Upload Foto, Ornamen, Bukti Transfer   ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 31: Buat storage bucket untuk aset pernikahan (Foto & Ornamen)
insert into storage.buckets (id, name, public)
values ('wedding-assets', 'wedding-assets', true)
on conflict (id) do update set public = true;

-- STEP 31B: Buat storage bucket untuk lagu MP3 pernikahan kustom
insert into storage.buckets (id, name, public)
values ('wedding-music', 'wedding-music', true)
on conflict (id) do update set public = true;

-- STEP 32: Buat storage bucket untuk bukti transfer pembayaran
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', false)
on conflict (id) do update set public = false;

-- STEP 33: Policy storage — Wedding Assets (public read, auth upload)
drop policy if exists "Public read wedding assets" on storage.objects;
create policy "Public read wedding assets"
  on storage.objects for select
  using (bucket_id = 'wedding-assets');

drop policy if exists "Auth users can upload wedding assets" on storage.objects;
create policy "Auth users can upload wedding assets"
  on storage.objects for insert
  with check (bucket_id = 'wedding-assets' and auth.role() = 'authenticated');

drop policy if exists "Auth users can update wedding assets" on storage.objects;
create policy "Auth users can update wedding assets"
  on storage.objects for update
  using (bucket_id = 'wedding-assets' and auth.role() = 'authenticated');

-- STEP 34: Policy storage — Payment Proofs (private, hanya user & finance)
drop policy if exists "User can upload payment proof" on storage.objects;
create policy "User can upload payment proof"
  on storage.objects for insert
  with check (bucket_id = 'payment-proofs' and auth.role() = 'authenticated');

drop policy if exists "Finance/Admin can view payment proofs" on storage.objects;
create policy "Finance/Admin can view payment proofs"
  on storage.objects for select
  using (
    bucket_id = 'payment-proofs'
    and (
      auth.uid()::text = (storage.foldername(name))[1]
      or public.get_user_role() in ('admin', 'finance')
    )
  );


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN G: DATA AWAL (SEED) — Harga Paket & Akun Demo             ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 35: Insert data harga paket awal
insert into public.saas_pricing_plans (id, name, price_idr, duration_label, description, badge, features, is_recommended)
values
  (
    'free',
    'Paket Freemium (Trial)',
    0,
    'Selamanya (Akses Dasar)',
    'Cocok untuk coba template dengan 1 link broadcast umum.',
    'Gratis',
    '[
      "Pilihan 6 Template Adat & Modern",
      "Kustomisasi Teks & Waktu Acara Dasar",
      "1 Link Broadcast Umum (Kepada: Tamu Undangan)",
      "Nama Tamu Khusus Terkunci (Gembok)",
      "Ornamen Kustom & Upload Tekstur Terkunci",
      "Maksimal 20 Ucapan Doa Restu"
    ]'::jsonb,
    false
  ),
  (
    'pro',
    'Paket Pro Self-Service',
    149000,
    'Akses Penuh 30 Hari',
    'Bebas edit mandiri, ribuan link tamu personal & pesan WA otomatis.',
    'Paling Populer',
    '[
      "Semua Fitur Paket Freemium",
      "Bebas Generate Ribuan Link Nama Tamu (?to=Nama)",
      "Generator Draf Pesan WhatsApp Otomatis",
      "Upload Foto Prewedding, Galeri & QRIS Mandiri",
      "Efek Parallax & Wallpaper Tekstur Bebas Custom",
      "Buku Tamu Doa Restu & RSVP Tanpa Batas",
      "Masa Aktif 30 Hari (Perpanjangan via Admin)"
    ]'::jsonb,
    true
  ),
  (
    'vip_agency',
    'Paket VIP Terima Beres',
    499000,
    'Pengerjaan Desainer + 30 Hari',
    'Terima jadi, seluruh desain & upload tamu dikerjakan tim Desainer DIGIAT.',
    'Layanan Eksklusif',
    '[
      "Semua Fitur Paket Pro Self-Service",
      "Dikerjakan Langsung oleh Desainer Senior",
      "Bantuan Format & Upload Ribuan Tamu (Excel/WA)",
      "Desain Monogram Khusus & Finishing Ornamen AI",
      "Prioritas Revisi Desain Kilat 24 Jam",
      "Konsultasi Langsung via WhatsApp Desainer"
    ]'::jsonb,
    false
  )
on conflict (id) do update set
  name = excluded.name,
  price_idr = excluded.price_idr,
  duration_label = excluded.duration_label,
  description = excluded.description,
  badge = excluded.badge,
  features = excluded.features,
  is_recommended = excluded.is_recommended;


-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║  BAGIAN H: VIEWS — Kemudahan Query untuk Dashboard Admin           ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- STEP 36: View ringkasan klien untuk dashboard admin
create or replace view public.client_dashboard_view as
select
  p.id as user_id,
  p.full_name,
  p.email,
  p.phone,
  p.couple_names,
  s.id as subscription_id,
  s.tier,
  s.status as subscription_status,
  s.start_date,
  s.expires_at,
  case
    when s.expires_at is null then null
    when s.expires_at < now() then 0
    else extract(day from (s.expires_at - now()))::integer
  end as days_remaining,
  s.allow_custom_assets,
  s.allow_personalized_guests,
  s.max_guests,
  i.slug as invitation_slug,
  i.template_id,
  i.groom_short,
  i.bride_short,
  i.is_published,
  (select count(*) from public.guest_wishes gw where gw.invitation_slug = i.slug) as wishes_count,
  (select count(*) from public.guest_list gl where gl.invitation_slug = i.slug and gl.attendance_status = 'Hadir') as confirmed_guests,
  ao.status as vip_order_status,
  ao.assigned_designer_name
from public.profiles p
left join public.subscriptions s on s.user_id = p.id
left join public.invitations i on i.owner_id = p.id
left join public.agency_orders ao on ao.client_user_id = p.id and ao.status != 'completed'
where p.role = 'user'
order by s.created_at desc;

-- STEP 37: View ringkasan pendapatan untuk dashboard keuangan
create or replace view public.finance_summary_view as
select
  pt.id as transaction_id,
  pt.invoice_number,
  pt.client_name,
  pt.client_email,
  pt.tier,
  pt.amount_idr,
  pt.payment_method,
  pt.status as payment_status,
  pt.created_at as payment_date,
  pt.verified_at,
  vp.full_name as verified_by_name
from public.payment_transactions pt
left join public.profiles vp on vp.id = pt.verified_by
order by pt.created_at desc;


-- =========================================================================
-- SELESAI! ✅
-- =========================================================================
-- Catatan penting:
--
-- 1. SUPABASE AUTH: Pastikan kamu sudah mengaktifkan Supabase Auth
--    (Authentication > Providers > Email) di dashboard Supabase.
--
-- 2. EDGE FUNCTIONS (opsional): Untuk auto-expire langganan,
--    buat Edge Function yang memanggil check_expired_subscriptions()
--    setiap hari via Supabase CRON atau external scheduler.
--
-- 3. ENVIRONMENT VARIABLES di .env:
--    VITE_SUPABASE_URL=https://xxxxx.supabase.co
--    VITE_SUPABASE_ANON_KEY=eyJxxxx....
--
-- 4. ROLE ASSIGNMENT: Untuk mengubah role user (misal menjadikan
--    seseorang admin), update langsung di tabel profiles:
--    UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@digiat.id';
--
-- 5. PERPANJANGAN: Admin/Finance memanggil function extend_subscription()
--    dari dashboard atau Supabase Functions.
-- =========================================================================
