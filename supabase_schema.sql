-- =========================================================================
-- DIGIAT STUDIO — SUPABASE DATABASE MIGRATION SCRIPT
-- Platform Undangan Digital SaaS Multi-Template Adat & Modern
-- =========================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Table: invitations (Menyimpan data kustomisasi undangan & konfigurasi aset)
create table if not exists public.invitations (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
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
    "bgTextureUrl": "/assets/motif_jawa/6541342_1560.jpg",
    "bgTextureOpacity": 0.12,
    "bgTextureBlendMode": "luminosity",
    "cornerOrnamentUrl": "/assets/motif_jawa/motif_jawa.png",
    "cornerOrnamentOpacity": 0.85,
    "sideBordersUrl": "/assets/motif_jawa/spanduk-mandala-abstrak.png",
    "dividerOrnamentUrl": "/assets/motif_jawa/motif_jawa.png",
    "floatingMotifs": true
  }'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast lookup by invitation slug
create index if not exists idx_invitations_slug on public.invitations (slug);

-- 3. Table: guest_list (Daftar tamu terpersonalisasi untuk link generator)
create table if not exists public.guest_list (
  id uuid primary key default uuid_generate_v4(),
  invitation_slug text references public.invitations(slug) on delete cascade,
  guest_name text not null,
  custom_wa_text text,
  attendance_status text default 'Belum Konfirmasi', -- 'Hadir' | 'Berhalangan' | 'Belum Konfirmasi'
  pax_count integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_guest_list_slug on public.guest_list (invitation_slug);

-- 4. Table: guest_wishes (Buku tamu ucapan & doa restu realtime)
create table if not exists public.guest_wishes (
  id uuid primary key default uuid_generate_v4(),
  invitation_slug text references public.invitations(slug) on delete cascade,
  guest_name text not null,
  relation text default 'Sahabat',
  attendance text not null, -- 'Hadir' | 'Berhalangan'
  guests_count integer default 1,
  message text not null,
  adat_tag text default 'Doa Restu',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_guest_wishes_slug on public.guest_wishes (invitation_slug);

-- 5. Row Level Security (RLS) Setup
alter table public.invitations enable row level security;
alter table public.guest_list enable row level security;
alter table public.guest_wishes enable row level security;

-- Policies for invitations (Public Read & Upsert for SaaS demo)
drop policy if exists "Allow public read invitations" on public.invitations;
create policy "Allow public read invitations" on public.invitations for select using (true);

drop policy if exists "Allow public insert invitations" on public.invitations;
create policy "Allow public insert invitations" on public.invitations for insert with check (true);

drop policy if exists "Allow public update invitations" on public.invitations;
create policy "Allow public update invitations" on public.invitations for update using (true);

-- Policies for guest_wishes (Tamu bisa membaca dan mengirim doa restu)
drop policy if exists "Allow public read wishes" on public.guest_wishes;
create policy "Allow public read wishes" on public.guest_wishes for select using (true);

drop policy if exists "Allow public insert wishes" on public.guest_wishes;
create policy "Allow public insert wishes" on public.guest_wishes for insert with check (true);

-- Policies for guest_list (Akses daftar tamu)
drop policy if exists "Allow public read guest_list" on public.guest_list;
create policy "Allow public read guest_list" on public.guest_list for select using (true);

drop policy if exists "Allow public manage guest_list" on public.guest_list;
create policy "Allow public manage guest_list" on public.guest_list for all using (true);

-- 6. Storage Bucket for Uploaded Assets (Backgrounds, Photos, Ornaments, QRIS)
insert into storage.buckets (id, name, public)
values ('wedding-assets', 'wedding-assets', true)
on conflict (id) do update set public = true;

-- Storage Policies for Public Bucket Access
drop policy if exists "Public Access to Wedding Assets" on storage.objects;
create policy "Public Access to Wedding Assets"
on storage.objects for select
using ( bucket_id = 'wedding-assets' );

drop policy if exists "Allow Public Upload to Wedding Assets" on storage.objects;
create policy "Allow Public Upload to Wedding Assets"
on storage.objects for insert
with check ( bucket_id = 'wedding-assets' );

drop policy if exists "Allow Public Update to Wedding Assets" on storage.objects;
create policy "Allow Public Update to Wedding Assets"
on storage.objects for update
using ( bucket_id = 'wedding-assets' );

-- 7. Sample Initial Seed Data (Optional — Arya & Sekar)
insert into public.invitations (
  slug,
  template_id,
  palette,
  groom_short,
  groom_full,
  groom_parents,
  groom_instagram,
  bride_short,
  bride_full,
  bride_parents,
  bride_instagram,
  wedding_date_iso,
  wedding_date_display,
  city,
  hero_photo,
  groom_photo,
  bride_photo,
  closing_photo,
  gallery,
  events,
  banks,
  gift_address,
  asset_config
) values (
  'arya-sekar',
  'javanese-royal',
  '{
    "id": "obsidian-gold",
    "name": "Kraton Obsidian & Gold",
    "canvas": "#0F172A",
    "surface": "#1E293B",
    "primaryText": "#F8FAFC",
    "mutedText": "#94A3B8",
    "accent": "#F59E0B",
    "border": "#334155",
    "ceremonialDark": "#020617"
  }'::jsonb,
  'Arya',
  'Raden Arya Daniswara, S.T., M.Sc.',
  'Putra pertama dari Bpk. K.R.T. Daniswara & Ibu Raden Ajeng Sulistyowati',
  '@aryadaniswara',
  'Sekar',
  'Sekar Ayu Larasati, S.Ds., M.A.',
  'Putri kedua dari Bpk. Ir. Bambang Soedjono & Ibu Endang Lestari',
  '@sekarayularasati',
  '2026-11-28',
  'Sabtu Kliwon, 28 November 2026',
  'Kraton Kasultanan Ngayogyakarta Hadiningrat',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  '[
    {"url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", "caption": "Pertemuan Pertama di Yogyakarta"},
    {"url": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", "caption": "Lamaran Adat & Siraman Suci"},
    {"url": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", "caption": "Koleksi Busana Beskap & Kebaya Paes Ageng"}
  ]'::jsonb,
  '[
    {
      "id": "akad",
      "stageCode": "IJAB",
      "title": "Ijab Kabul / Akad Nikah",
      "date": "Sabtu, 28 November 2026",
      "time": "08:00 - 10:00 WIB",
      "venue": "Masjid Gedhe Kauman Yogyakarta",
      "address": "Alun-alun Keraton, Ngupasan, Gondomanan, Kota Yogyakarta",
      "philosophy": "Pengikatan janji suci di hadapan wali dan saksi dengan adat Jawa Kasultanan.",
      "mapQuery": "Masjid Gedhe Kauman Yogyakarta"
    },
    {
      "id": "resepsi",
      "stageCode": "PAWIWAHAN",
      "title": "Pahargyan Temu Penganten & Resepsi",
      "date": "Sabtu, 28 November 2026",
      "time": "11:00 - 14:00 WIB",
      "venue": "Bale Ndalem Pujokusuman Yogyakarta",
      "address": "Jl. Brigjen Katamso No.175, Keparakan, Mergangsan, Kota Yogyakarta",
      "philosophy": "Prosesi Panggih Adat Jawa Ageng diiringi gendhing gamelan Kebo Giro.",
      "mapQuery": "Pujokusuman Yogyakarta"
    }
  ]'::jsonb,
  '[
    {
      "bankName": "Bank Central Asia (BCA)",
      "accountNumber": "8830918230",
      "accountHolder": "Raden Arya Daniswara"
    },
    {
      "bankName": "Bank Mandiri",
      "accountNumber": "1370019283748",
      "accountHolder": "Sekar Ayu Larasati"
    }
  ]'::jsonb,
  'Keluarga Raden Arya Daniswara & Sekar Ayu Larasati, Ndalem Pujokusuman No. 175, Gondomanan, Yogyakarta 55122',
  '{
    "enableParallax": true,
    "parallaxIntensity": "medium",
    "bgTextureUrl": "/assets/motif_jawa/6541342_1560.jpg",
    "bgTextureOpacity": 0.12,
    "bgTextureBlendMode": "luminosity",
    "cornerOrnamentUrl": "/assets/motif_jawa/motif_jawa.png",
    "cornerOrnamentOpacity": 0.85,
    "sideBordersUrl": "/assets/motif_jawa/spanduk-mandala-abstrak.png",
    "dividerOrnamentUrl": "/assets/motif_jawa/motif_jawa.png",
    "floatingMotifs": true
  }'::jsonb
)
on conflict (slug) do nothing;
