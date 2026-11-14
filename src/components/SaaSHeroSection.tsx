import React, { useState } from 'react';
import {
  Sparkles,
  Smartphone,
  Palette,
  Music,
  ShieldCheck,
  Send,
  Eye,
  Check,
  ArrowRight,
  Heart,
  Clock,
  QrCode,
  MapPin,
  Star,
  ChevronDown,
  MessageCircle,
  Users,
  Gift,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TemplateSchema } from '../models/invitation.model';
import { BUSINESS_CONFIG, buildWhatsAppUrl, WA_TEMPLATES } from '../config/business.config';

interface SaaSHeroSectionProps {
  onExploreTemplates: () => void;
  onOpenLiveDemo: () => void;
  onOpenStudio: () => void;
  activeTemplate: TemplateSchema;
}

export const SaaSHeroSection: React.FC<SaaSHeroSectionProps> = ({
  onExploreTemplates,
  onOpenLiveDemo,
  onOpenStudio,
  activeTemplate,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getWaLink = (tierName: string, price: string) => {
    return buildWhatsAppUrl(WA_TEMPLATES.orderPlan(tierName, price));
  };

  const faqs = [
    {
      q: 'Apakah undangan aktif selamanya atau ada biaya perpanjangan berkala?',
      a: 'Semua paket di DIGIAT Studio menganut sistem sekali bayar dan aktif selamanya. Anda tidak perlu khawatir undangan kedaluwarsa setelah acara selesai — halaman kenangan pernikahan Anda dapat terus dibuka kapan saja tanpa biaya langganan bulanan.',
    },
    {
      q: 'Bagaimana cara mengirim undangan dengan nama tamu yang berbeda-beda?',
      a: 'Sangat mudah! Sistem kami sudah dilengkapi Generator Link Tamu dan Draf WhatsApp Otomatis. Anda cukup masukkan nama tamu (misal: "Bapak Budi & Keluarga"), dan sistem langsung membuat link khusus (?to=Bapak+Budi) serta draf pesan sopan yang siap Anda kirimkan ke chat WA tamu dengan 1-klik.',
    },
    {
      q: 'Jika kami sibuk dan tidak sempat mengisi data, apakah bisa dibuatkan terima jadi?',
      a: 'Tentu bisa! Kami menyediakan Paket VIP Terima Beres (Rp 299.000). Anda cukup mengirimkan foto prewedding, susunan acara, dan daftar nama tamu via WhatsApp. Tim desainer profesional kami yang akan menyusun, memformat, dan mengoptimalkan tampilan undangan hingga sempurna.',
    },
    {
      q: 'Berapa lama proses pembuatan undangan sampai siap disebar?',
      a: 'Jika memilih Paket Starter atau Premium (Self-Service), link undangan Anda aktif langsung secara instan begitu data selesai diisi. Untuk Paket VIP Terima Beres, pengerjaan kami selesaikan dalam waktu 24 jam dengan jaminan revisi hingga Anda puas.',
    },
    {
      q: 'Apakah musik latar undangan bisa diganti dengan lagu kesukaan kami?',
      a: 'Bisa! Selain musik adat autentik (seperti gamelan Jawa Kebo Giro, suling Sunda, rindik Bali, dan talempong Minang), Anda juga bebas memilih lagu pop romantis, upload MP3 sendiri, atau lagu religi yang sesuai dengan tema pernikahan Anda.',
    },
  ];

  const testimonials = [
    {
      names: 'Raden Arya & Sekar Ayu',
      location: 'Yogyakarta',
      adat: 'Adat Jawa Kasunanan',
      rating: 5,
      text: 'Undangannya luar biasa anggun! Tamu-tamu sepuh sangat terkesan dengan gending gamelan dan sampul nama tamu yang rapi. Tamu muda kagum karena ada QRIS dan peta yang akurat.',
      avatar: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=150&q=80',
    },
    {
      names: 'Dimas Wicaksono & Annisa Larasati',
      location: 'Bandung',
      adat: 'Adat Sunda Silih Asih',
      rating: 5,
      text: 'Paket VIP Terima Beres sangat membantu kami yang sama-sama sibuk kerja kantor. Desainernya ramah, revisi cepat ditanggapi, dan hasil tampilannya elegan sekali di HP tamu.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      names: 'Rendy Syahputra & Citra Kirana',
      location: 'Padang & Jakarta',
      adat: 'Adat Minang Rumah Gadang',
      rating: 5,
      text: 'Harga Rp 99.000 untuk fitur selengkap ini sangat worth it dibanding cetak undangan fisik jutaan rupiah. Fitur RSVP memudahkan kami menghitung porsi katering dengan pas.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* ===================================================================
          1. HERO SECTION (SMS-SINDANGHEULA INSPIRED GRID + ANIMATED SHINE)
         =================================================================== */}
      <section className="public-hero-grid relative overflow-hidden bg-gradient-to-b from-white via-fuchsia-50/20 to-slate-50/40 pt-12 pb-16 sm:pt-20 sm:pb-28 px-4 sm:px-8 lg:px-12 border-b border-slate-200/80">
        {/* Soft Ambient Glow in Center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-tr from-[#a71366]/10 via-purple-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Floating Wedding Photo Card Left (like sms-sindangheula.id) */}
        <div className="hidden xl:block absolute left-8 2xl:left-14 top-24 z-10 pointer-events-none">
          <div className="animate-hero-float bg-white/95 backdrop-blur-sm p-2 rounded-3xl border border-slate-200/90 shadow-md rotate-[-3deg] w-48">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=320&q=80"
              alt="Pengantin Adat Jawa"
              className="w-full h-40 object-cover rounded-2xl"
            />
            <div className="p-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a71366]">
                Adat Kasunanan
              </span>
              <p className="text-xs font-semibold text-slate-800">Raden Arya &amp; Sekar</p>
            </div>
          </div>
        </div>

        {/* Floating Wedding Photo Card Right (like sms-sindangheula.id) */}
        <div className="hidden xl:block absolute right-8 2xl:right-14 top-28 z-10 pointer-events-none">
          <div className="animate-hero-float-reverse bg-white/95 backdrop-blur-sm p-2 rounded-3xl border border-slate-200/90 shadow-md rotate-[3deg] w-48">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=320&q=80"
              alt="Momen Sakral Pernikahan"
              className="w-full h-40 object-cover rounded-2xl"
            />
            <div className="p-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Lengkap RSVP &amp; QRIS
              </span>
              <p className="text-xs font-semibold text-slate-800">Undangan Aktif Selamanya</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Brand Badge with Pulsing Dot */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-fuchsia-200 shadow-2xs mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#a71366] animate-pulse" />
            <img
              src="https://digiatgroup.com/img/digiat.png"
              alt="DIGIAT Logo"
              className="h-4 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#a71366]">
              DIGIAT WEDDING STUDIO · PLATFORM RESMI INDONESIA
            </span>
          </motion.div>

          {/* Main Headline with Animated White Light Beam Sweep */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-ceremonial text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.18] max-w-4xl mx-auto text-balance"
          >
            <span className="animate-hero-shine font-bold">
              Undangan Digital Pernikahan Mewah &amp; Berbudaya{' '}
            </span>
            <span className="inline-block whitespace-nowrap">
              <span className="animate-hero-shine font-bold">Mulai </span>
              <span className="animate-hero-shine-magenta font-extrabold underline decoration-fuchsia-400 decoration-wavy decoration-2 underline-offset-8">
                Rp&nbsp;39.000
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-slate-600 mt-6 leading-relaxed max-w-2xl mx-auto"
          >
            <strong className="text-slate-800 font-semibold">Sekali bayar, aktif selamanya tanpa batas waktu.</strong> Lengkap dengan musik adat &amp; custom MP3, sampul surat nama tamu khusus, amplop cashless QRIS, buku doa, dan navigasi peta Google Maps.
          </motion.p>

          {/* Key Value Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 text-xs text-slate-700 font-medium"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Aktif Selamanya
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Nama Tamu Unlimited
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Garansi Revisi Desain
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Bisa Dibantu Terima Beres
            </span>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href={buildWhatsAppUrl('Halo Admin DIGIAT, saya ingin konsultasi dan pesan undangan digital pernikahan. Bisa dibantu?')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Pesan via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onExploreTemplates}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:scale-95"
            >
              <span>Lihat Katalog 6 Template</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </motion.div>

          {/* Speech Bubble Center Pill & Demo Link (like sms-sindangheula.id) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs text-slate-700 font-medium">
              <span>💍</span>
              <span>Wujudkan momen bahagia berbudaya &amp; modern bersama DIGIAT</span>
            </div>

            <button
              type="button"
              onClick={onOpenLiveDemo}
              className="mt-1 text-xs font-semibold text-slate-600 hover:text-[#a71366] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Demo Pengalaman Tamu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          2. FEATURE HIGHLIGHT STRIP (6 CORE BENEFITS)
         =================================================================== */}
      <section className="py-14 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a71366]">
            FITUR LENGKAP KELAS STUDIO
          </p>
          <h2 className="font-serif-ceremonial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Segalanya yang Dibutuhkan untuk Undangan Sempurna
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              icon: Users,
              title: 'Nama Tamu Khusus',
              desc: 'Tiap tamu punya nama personal di sampul surat (?to=Nama).',
            },
            {
              icon: Music,
              title: 'Musik Adat & MP3',
              desc: 'Gamelan Jawa, Sunda, Bali, Minang atau upload MP3 sendiri.',
            },
            {
              icon: QrCode,
              title: 'Amplop Cashless',
              desc: 'QRIS instan & nomor rekening bank memudahkan pemberian kado.',
            },
            {
              icon: MapPin,
              title: 'Peta Google Maps',
              desc: 'Navigasi rute langsung ke lokasi akad & resepsi tanpa tersesat.',
            },
            {
              icon: Heart,
              title: 'Buku Doa & RSVP',
              desc: 'Tamu bisa mengirim ucapan restu dan konfirmasi kehadiran.',
            },
            {
              icon: Clock,
              title: 'Countdown Acara',
              desc: 'Hitung mundur presisi menuju hari bahagia akad & resepsi.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs text-center flex flex-col items-center justify-between hover:border-fuchsia-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div className="w-11 h-11 rounded-2xl bg-fuchsia-50 text-[#a71366] border border-fuchsia-100 flex items-center justify-center mb-3 group-hover:bg-[#a71366] group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          3. PRICING TABLE (SEKALI BAYAR, AKTIF SELAMANYA)
         =================================================================== */}
      <section id="paket-harga" className="py-16 px-4 sm:px-8 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-fuchsia-100 text-[#a71366] text-[10px] font-bold uppercase tracking-wider">
              HARGA TERJANGKAU &amp; TRANSPARAN
            </span>
            <h2 className="font-serif-ceremonial text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Pilih Paket Sesuai Kebutuhan Pernikahan Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Sekali bayar, aktif selamanya tanpa biaya langganan bulanan. Pengerjaan cepat &amp; garansi kepuasan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* TIER 1: STARTER */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    Hemat
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Sekali Bayar</span>
                </div>

                <h3 className="font-serif-ceremonial text-2xl font-bold text-slate-900 mt-3">
                  Paket Starter
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Pilihan tepat untuk Anda yang ingin undangan elegan dengan anggaran sangat hemat.
                </p>

                <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 line-through">Rp 89.000</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-serif-ceremonial text-4xl font-bold text-slate-900">
                      Rp 39.000
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ selamanya</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  {[
                    'Pilihan 1 Template Adat / Modern',
                    'Kustomisasi Nama & Jadwal Acara',
                    'Nama Tamu Personal Unlimited (?to=Nama)',
                    'Buku Tamu Doa Restu & RSVP Online',
                    'Navigasi Peta Google Maps',
                    'Audio Musik Latar Otomatis',
                    'Amplop Digital No. Rekening Bank',
                    'Aktif Selamanya Tanpa Batas Waktu',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getWaLink('Paket Starter', 'Rp 39.000')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 text-xs font-semibold text-center block transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                Pesan Paket Starter (Rp 39rb)
              </a>
            </div>

            {/* TIER 2: PREMIUM (RECOMMENDED) */}
            <div className="rounded-3xl border-2 border-[#a71366] bg-gradient-to-b from-fuchsia-50/40 via-white to-white p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-fuchsia-600/10 hover:shadow-2xl hover:shadow-fuchsia-600/20 hover:-translate-y-2 transition-all duration-300 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-800 via-[#a71366] to-[#c026d3] text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                PALING POPULER ⭐
              </div>

              <div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-fuchsia-100 text-[#a71366]">
                    Full Access
                  </span>
                  <span className="text-[11px] text-[#a71366] font-semibold">Aktif Selamanya</span>
                </div>

                <h3 className="font-serif-ceremonial text-2xl font-bold text-slate-900 mt-3">
                  Paket Premium
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Akses bebas seluruh 6 template, upload foto &amp; musik MP3 kustom serta generator pesan WA.
                </p>

                <div className="my-5 p-4 bg-fuchsia-50/50 rounded-2xl border border-fuchsia-200">
                  <span className="text-xs text-slate-400 line-through">Rp 199.000</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-serif-ceremonial text-4xl font-bold text-[#a71366]">
                      Rp 99.000
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ selamanya</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  {[
                    'Semua Fitur Paket Starter',
                    'Bebas Pilih & Ganti 6 Template Adat/Modern',
                    'Upload Musik MP3 Sendiri / Lagu Romantis',
                    'Upload Foto Prewedding & Galeri Unlimited',
                    'Generator Draf Pesan Kirim WhatsApp Otomatis',
                    'Efek Parallax & Ornamen Budaya Mewah',
                    'Amplop Digital QRIS & Multi-Rekening',
                    'Hitung Mundur (Countdown Timer) Hari H',
                    'Bebas Watermark DIGIAT Studio',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#a71366] shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-900">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getWaLink('Paket Premium', 'Rp 99.000')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-purple-800 via-[#a71366] to-[#c026d3] text-white text-xs font-bold text-center block transition-all shadow-md hover:shadow-lg hover:opacity-95 cursor-pointer hover:scale-[1.01]"
              >
                Pilih Paket Premium (Rp 99rb)
              </a>
            </div>

            {/* TIER 3: VIP TERIMA BERES */}
            <div className="rounded-3xl border border-purple-200 bg-purple-50/25 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                    Layanan Eksklusif
                  </span>
                  <span className="text-[11px] text-purple-700 font-medium">Dikerjakan Tim</span>
                </div>

                <h3 className="font-serif-ceremonial text-2xl font-bold text-slate-900 mt-3">
                  VIP Terima Beres
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Solusi anti-ribet: cukup kirim foto &amp; data ke WA, desainer kami yang mengerjakan semuanya.
                </p>

                <div className="my-5 p-4 bg-white rounded-2xl border border-purple-200">
                  <span className="text-xs text-slate-400 line-through">Rp 500.000</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-serif-ceremonial text-4xl font-bold text-purple-900">
                      Rp 299.000
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ all-in</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  {[
                    'Semua Fitur Paket Premium',
                    'Dikerjakan Langsung oleh Desainer Senior',
                    'Cukup Kirim Data & Foto via WhatsApp',
                    'Bantuan Input Ribuan Tamu dari Excel/WA',
                    'Finishing Monogram & Ornamen Mewah',
                    'Prioritas Pengerjaan Kilat 24 Jam Selesai',
                    'Garansi Revisi Desain Hingga Cocok',
                    'Konsultasi Private via WhatsApp Desainer',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getWaLink('Paket VIP Terima Beres', 'Rp 299.000')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-3 px-4 rounded-full bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold text-center block transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                Pesan VIP Terima Beres (Rp 299rb)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. CARA PESAN (3 LANGKAH MUDAH)
         =================================================================== */}
      <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a71366]">
            PROSES CEPAT &amp; MUDAH
          </p>
          <h2 className="font-serif-ceremonial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Cara Pesan Undangan Digital di DIGIAT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center relative">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-fuchsia-300 font-bold flex items-center justify-center mx-auto mb-4 text-base shadow-xs">
              1
            </div>
            <h3 className="font-serif-ceremonial text-lg font-bold text-slate-900">
              Pilih Paket &amp; Template
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Pilih paket yang Anda inginkan (Starter, Premium, atau VIP) dan hubungi admin kami via WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center relative">
            <div className="w-12 h-12 rounded-full bg-[#a71366] text-white font-bold flex items-center justify-center mx-auto mb-4 text-base shadow-xs">
              2
            </div>
            <h3 className="font-serif-ceremonial text-lg font-bold text-slate-900">
              Isi / Kirim Data Acara
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Kirimkan nama kedua mempelai, tanggal acara, lokasi Google Maps, nomor rekening, dan foto terbaik Anda.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center relative">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-base shadow-xs">
              3
            </div>
            <h3 className="font-serif-ceremonial text-lg font-bold text-slate-900">
              Link Aktif &amp; Siap Disebar
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Undangan siap disebarkan ke ribuan tamu dengan nama personal via WhatsApp dalam hitungan menit.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. SOCIAL PROOF & TESTIMONI MEMPELAI
         =================================================================== */}
      <section className="py-16 px-4 sm:px-8 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a71366]">
              KATA MEREKA YANG BERBAHAGIA
            </p>
            <h2 className="font-serif-ceremonial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Dipercaya oleh Ratusan Pasangan Pengantin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.names}
                    className="w-11 h-11 rounded-full object-cover border border-fuchsia-200 shadow-2xs"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.names}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {t.location} · <span className="text-[#a71366] font-semibold">{t.adat}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. FAQ ACCORDION (CLEAN & ACCESSIBLE)
         =================================================================== */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a71366]">
            PERTANYAAN UMUM
          </p>
          <h2 className="font-serif-ceremonial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#a71366]/40 shadow-xs ring-1 ring-[#a71366]/20' : 'border-slate-200/90 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#a71366]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          7. FINAL CTA BANNER (DIGIAT BRAND THEME)
         =================================================================== */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-slate-950 via-[#3b0825] to-slate-950 text-white text-center relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a71366]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif-ceremonial text-2xl sm:text-4xl font-bold leading-tight">
            Siap Membuat Undangan Pernikahan Terbaik Anda?
          </h2>
          <p className="text-xs sm:text-sm text-fuchsia-100/80 mt-3 max-w-xl mx-auto leading-relaxed">
            Konsultasikan tanggal dan tema pernikahan impian Anda bersama admin DIGIAT. Dapatkan promo hemat mulai Rp 39.000 sekali bayar aktif selamanya.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={buildWhatsAppUrl('Halo Admin DIGIAT, saya ingin buat undangan digital sekarang. Mohon infonya ya!')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat CS WhatsApp Sekarang</span>
            </a>

            <button
              type="button"
              onClick={onExploreTemplates}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
            >
              <span>Lihat Katalog 6 Template</span>
              <ArrowRight className="w-4 h-4 text-fuchsia-300" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
