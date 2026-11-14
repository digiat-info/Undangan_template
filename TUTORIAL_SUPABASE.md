# Panduan Integrasi Supabase & Aset Parallax DIGIAT Studio

Dokumen ini menjelaskan langkah demi langkah cara mengaktifkan **Database Supabase**, **Storage Upload Aset**, serta **Panduan Generate Aset AI / Desain Transparan** untuk platform undangan digital DIGIAT.

---

## 1. Langkah Cepat: Setup Database Supabase (5 Menit)

### Langkah 1: Buat Proyek di Supabase
1. Buka [https://supabase.com](https://supabase.com) dan login (atau buat akun gratis).
2. Klik tombol **New Project**.
3. Isi form:
   - **Name:** `digiat-undangan` (atau sesuai nama Anda).
   - **Database Password:** Buat password yang kuat dan simpan di tempat aman.
   - **Region:** Pilih `Singapore (ap-southeast-1)` untuk latensi tercepat di Indonesia.
   - **Pricing Plan:** Pilih **Free Plan** (sudah mencakup database PostgreSQL, 500MB storage, dan RLS realtime).
4. Klik **Create new project** dan tunggu ~1-2 menit hingga proses inisialisasi selesai.

---

### Langkah 2: Jalankan Script SQL (`supabase_schema.sql`)
1. Di dashboard proyek Supabase Anda, buka menu **SQL Editor** pada sidebar kiri (ikon `>_`).
2. Buka file `supabase_schema.sql` yang telah tersedia di direktori proyek ini:
   `c:\Project Digiat\undangan\supabase_schema.sql`
3. Salin (**Copy**) seluruh isi script SQL tersebut.
4. Tempel (**Paste**) ke dalam SQL Editor di Supabase.
5. Klik tombol **Run** (atau tekan `Ctrl + Enter`).
6. Supabase akan secara otomatis membuat:
   - Tabel `invitations` (Menyimpan kustomisasi teks, palet, foto, & konfigurasi parallax).
   - Tabel `guest_list` (Daftar tamu terpersonalisasi untuk link generator).
   - Tabel `guest_wishes` (Buku tamu ucapan & doa restu realtime).
   - Row Level Security (RLS) policies agar tamu dapat membaca dan mengirim RSVP.
   - Storage Bucket `wedding-assets` untuk upload foto & tekstur latar belakang.

---

### Langkah 3: Ambil API URL & Anon Key
1. Di sidebar kiri Supabase, klik **Project Settings** (ikon gerigi di pojok bawah).
2. Buka tab **API**.
3. Salin dua data penting berikut:
   - **Project URL:** (Contoh: `https://xyzabc.supabase.co`)
   - **Project API Keys -> `anon` / `public`:** (Token panjang yang diawali `eyJ...`)

---

### Langkah 4: Konfigurasi File `.env` di Proyek Lokal
1. Buat file bernama `.env` di folder utama `c:\Project Digiat\undangan\.env`.
2. Masukkan URL dan Key Anda:
   ```env
   VITE_SUPABASE_URL=https://xyzabc.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Restart server Vite Anda (`npm run dev`).
4. Buka aplikasi DIGIAT — status di Customization Studio akan otomatis berubah menjadi:
   🟢 **Supabase Cloud Aktif**.

---

### Langkah 5: Konfigurasi di Vercel (Production Hosting)
Saat Anda men-deploy ke Vercel:
1. Buka dashboard proyek Anda di [https://vercel.com](https://vercel.com).
2. Masuk ke **Settings** > **Environment Variables**.
3. Tambahkan 2 variabel yang sama:
   - `VITE_SUPABASE_URL` = (Project URL Supabase Anda)
   - `VITE_SUPABASE_ANON_KEY` = (Anon Key Supabase Anda)
4. Klik **Redeploy**. Seluruh tamu di seluruh dunia sekarang akan mengakses data dari Supabase CDN secara realtime!

---

## 2. Cara Kerja Efek Parallax & Arsitektur Layer Aset

Agar desain undangan terlihat mewah, berkedalaman, dan **elemen visual tidak saling bertabrakan ("tidak nabrak-nabrak")**, DIGIAT menggunakan **Arsitektur 3 Layer Bertingkat**:

```
+-------------------------------------------------------------+
| Layer 3: Konten & Tipografi Utama (z-index: 10)             |
| -> Kartu mempelai, tanggal acara, tombol RSVP, QRIS, teks   |
| -> Memiliki background surface solid/semi-glass ber-kontras |
+-------------------------------------------------------------+
                            ^
+-------------------------------------------------------------+
| Layer 2: Ornamen Sudut & Partikel Mengambang (z-index: 5)   |
| -> Ornamen canting/monogram transparan                      |
| -> Bergerak counter-parallax (offset 5-10% saat scroll)     |
+-------------------------------------------------------------+
                            ^
+-------------------------------------------------------------+
| Layer 1: Wallpaper Tekstur / Motif Adat (z-index: 0)        |
| -> Tekstur batik, songket, damask, tenun                    |
| -> Bergerak parallax lembut (offset 8-35% saat scroll)      |
| -> Opasitas diatur 8-15% dengan blend-mode: luminosity      |
+-------------------------------------------------------------+
```

### Mengapa Desain Tidak Akan Nabrak?
1. **Latar Belakang Diisolasi di `z-0`:** Wallpaper bergerak secara independen di belakang konten tanpa pernah menutupi tulisan.
2. **Kontrol Opasitas & Blend Mode:** Tekstur latar belakang menyatu halus dengan warna tema canvas (tidak pernah berwarna putih/hitam pekat yang merusak kontras).
3. **Kartu Konten Berpermukaan Jelas:** Setiap blok informasi (biodata pengantin, akad, resepsi, galeri) memiliki surface tersendiri sehingga teks selalu 100% mudah dibaca.

---

## 3. Panduan Generate Aset Desain dengan GPT / AI Image Generator

Untuk menghasilkan aset yang elegan dan siap pakai:

### A. Ornamen Sudut & Header Motif (Harus PNG Transparan)
> **Prompt GPT / Midjourney / DALL-E:**
> *"An exquisite traditional Indonesian Javanese royal gold corner flourish ornament, fine canting batik carving lines, luxury filigree design, symmetrical, isolated on a pure clean transparent background, vector style, ultra high resolution 4k, no shadows, no background."*

- **Tips:**
  - Pastikan output berlatar belakang transparan (format `.png` atau `.webp`).
  - Jika hasil AI memiliki latar belakang putih/hitam, gunakan tool penghapus latar belakang instan gratis seperti **remove.bg**, **clipdrop.co**, atau Adobe Express sebelum di-upload.
  - Resolusi ideal: `1000 x 1000 px` atau `1200 x 1200 px`.

### B. Wallpaper Tekstur Latar Belakang (Seamless Pattern)
> **Prompt GPT / Midjourney / DALL-E:**
> *"Seamless luxury damask and subtle Indonesian batik kawung watermark pattern, monochromatic elegant texture, delicate low contrast lines, luxury paper wallpaper texture, high resolution, seamless tile."*

- **Tips:**
  - Pilih motif yang memiliki kontras lembut (tidak terlalu kontras terang-gelap) agar tidak mendominasi isi undangan.
  - Di Studio DIGIAT, atur opasitas tekstur di kisaran `10% - 15%` dan mode blend ke `luminosity` atau `overlay`.

---

## 4. Keuntungan Mode Hybrid DIGIAT
Aplikasi DIGIAT dirancang dengan sistem **Graceful Fallback**:
- Jika Supabase belum dikonfigurasi: Aplikasi **tetap berjalan 100%** menggunakan `localStorage` dan Base64 upload lokal (tidak ada error atau crash).
- Begitu file `.env` diisi: Aplikasi langsung otomatis tersinkronisasi ke Cloud Supabase!
