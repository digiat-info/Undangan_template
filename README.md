# DIGIAT — Studio & Platform Undangan Digital Adat & Modern Premium

Platform dan showcase SaaS undangan pernikahan digital eksklusif dengan 6 arah seni adat Nusantara dan editorial modern. Dirancang khusus untuk **presentasi dan demo ke klien / calon pengantin**, siap di-hosting langsung ke **Vercel** tanpa membutuhkan database eksternal.

---

## ✨ Fitur Unggulan untuk Presentasi Klien

1. **6 Template Masterpiece Autentik**:
   - **Javanese Royal** (Kasunanan Surakarta · Laras Pelog Barang · Gunungan Kayon)
   - **Sundanese Romance** (Priangan · Kacapi Suling Degung · Siger & Melati)
   - **Minang Heritage** (Marapulai · Talempong Rarak · Gonjong Rumah Gadang)
   - **Balinese Sacred** (Puri Ubud · Rindik Bambu Selendro · Candi Bentar Paduraksa)
   - **Islamic Elegance** (Mihrab Medina · Gambus & Oud · Bintang 8 Rub el Hizb)
   - **Modern Nusantara** (Editorial Kinfolk Minimalist Kontemporer)

2. **Simulasi Frame Smartphone Interaktif (iPhone 16 Pro Mockup)**:
   - Menampilkan undangan di dalam bezel ponsel realistis lengkap dengan Dynamic Island, status bar iOS, dan scroll sentuh mulus.
   - Switcher responsif instan: **Smartphone (390px)**, **Tablet (720px)**, dan **Mode Layar Penuh**.

3. **Animasi & Interaktivitas Halus**:
   - **Segel Lilin / Wax Seal Ceremonial**: Membuka sampul undangan dengan animasi halus dan tabuhan Gong Ageng.
   - **Web Audio Traditional Engine**: Sintesis nada gamelan, rindik, kacapi, dan talempong murni langsung di browser tanpa file MP3 eksternal yang berat.
   - **Efek Partikel Kelopak Melati & Serpihan Emas**: Hujan kelopak bunga mengambang di layar dengan sakelar on/off.
   - **Buku Tamu Doa Restu & Amplop Digital**: Tamu dapat mengonfirmasi kehadiran (RSVP), menyalin rekening bank/QRIS, dan mengirim ucapan doa restu langsung.

4. **100% Client-Side & Vercel Ready (Tanpa Database)**:
   - Data otomatis tersimpan di `localStorage` per browser.
   - Menggunakan format query URL dinamis: `?template=javanese-royal&to=Bapak+Kurniawan&demo=true`.
   - File konfigurasi `vercel.json` sudah disertakan untuk routing SPA yang mulus.

5. **Proposal & Paket Investasi Klien**:
   - Dilengkapi panduan paket harga (**Paket Silver**, **Paket Gold**, **Paket Royal Platinum**) untuk presentasi di depan klien.
   - Generator draf pesan WhatsApp resmi siap kirim ke calon tamu.

---

## 🚀 Panduan Menjalankan Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Uji build produksi
npm run build
```

---

## ☁️ Panduan Deploy ke Vercel (Gratis & Cepat)

1. Push folder project ini ke repository GitHub Anda (atau import langsung di dashboard Vercel).
2. Di Vercel Dashboard, klik **"Add New"** > **"Project"** > Pilih repositori ini.
3. Framework Preset: **Vite** (Vercel otomatis mendeteksi konfigurasi `vite.config.ts` dan `vercel.json`).
4. Klik **"Deploy"**.
5. Selesai! Web Anda langsung aktif dengan link `https://undangan-digiat.vercel.app`.

### 💡 Contoh Tautan untuk Dikirim ke Klien:
- **Tampilan Beranda SaaS Studio**: `https://undangan-digiat.vercel.app/`
- **Tampilan Demo iPhone Langsung**: `https://undangan-digiat.vercel.app/?view=demo&template=javanese-royal`
- **Tampilan Tamu Layar Penuh Personal**: `https://undangan-digiat.vercel.app/?template=sundanese-romance&to=Bapak+Dr.+Hendra+Wijaya&demo=true`
