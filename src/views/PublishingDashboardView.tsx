import React, { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  Users,
  MessageSquare,
  CheckCircle2,
  Send,
  Sparkles,
  Smartphone,
  Gift,
  Music,
  Palette,
  ShieldCheck,
  Award,
  Link as LinkIcon,
  Plus,
  Trash2,
  Share2,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  ClientCustomization,
  TemplateSchema,
} from '../models/invitation.model';
import { GuestWish } from '../data/adatSuites';

interface PublishingDashboardViewProps {
  template: TemplateSchema;
  customization: ClientCustomization;
  onUpdateCustomization: (updated: ClientCustomization) => void;
  wishes: GuestWish[];
  onLaunchGuestExperience: (guestName?: string) => void;
  onOpenMobileSimulator: () => void;
}

export const PublishingDashboardView: React.FC<PublishingDashboardViewProps> = ({
  template,
  customization,
  onUpdateCustomization,
  wishes,
  onLaunchGuestExperience,
  onOpenMobileSimulator,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [singleGuestInput, setSingleGuestInput] = useState<string>('');
  const [guestListInput, setGuestListInput] = useState<string>(
    'Bapak K.R.T. Wuryanto & Ibu\nDr. Hendra Wijaya, Sp.OG\nKeluarga Besar Datuk Rajo Endah\nSahabat Terbaik Alumni Kampus'
  );

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2400);
  };

  const totalAttending = wishes
    .filter((w) => w.attendance === 'Hadir')
    .reduce((acc, item) => acc + item.guestsCount, 0);

  const guestNamesArray = guestListInput
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const handleAddSingleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleGuestInput.trim()) return;
    setGuestListInput((prev) => `${prev.trim()}\n${singleGuestInput.trim()}`);
    setSingleGuestInput('');
  };

  const handleRemoveGuest = (indexToRemove: number) => {
    const updated = guestNamesArray.filter((_, idx) => idx !== indexToRemove);
    setGuestListInput(updated.join('\n'));
  };

  const generateGuestLink = (guestName: string) => {
    return `${baseUrl}/?template=${template.id}&to=${encodeURIComponent(guestName)}&demo=true`;
  };

  const generateGuestWaText = (guestName: string) => {
    const link = generateGuestLink(guestName);
    return `Kepada Yth. Bapak/Ibu/Saudara/i\n*${guestName}*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:\n\n*${customization.groomShort} & ${customization.brideShort}*\n\nBerikut tautan undangan digital resmi untuk membuka sampul & rincian acara:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
  };

  const pricingPackages = [
    {
      name: 'Paket Silver',
      price: 'Rp 450.000',
      badge: 'Esensial',
      description: 'Cocok untuk pesta pernikahan intim atau resepsi sederhana.',
      features: [
        '1 Template Desain Pilihan',
        'Kustomisasi Teks & Lokasi Acara',
        'Penghitung Waktu Mundur & Google Maps',
        'Kapasitas hingga 300 Tamu',
        'Hosting Cepat di Vercel CDN',
      ],
      recommended: false,
    },
    {
      name: 'Paket Gold',
      price: 'Rp 750.000',
      badge: 'Paling Populer',
      description: 'Pilihan favorit calon pengantin dengan fitur seremonial lengkap.',
      features: [
        'Semua Fitur Paket Silver',
        'Musik Tradisional Adat (Web Audio Synth)',
        'Kustomisasi Palet Warna (HEX Kebaya Bebas)',
        'Buku Tamu Doa Restu & Konfirmasi Kehadiran',
        'Amplop Digital & QRIS Terverifikasi',
        'Animasi Kelopak Bunga & Segel Lilin Eksklusif',
      ],
      recommended: true,
    },
    {
      name: 'Paket Royal Platinum',
      price: 'Rp 1.250.000',
      badge: 'Eksklusif VIP',
      description: 'Pengalaman adat bangsawan lengkap dengan pendampingan penuh.',
      features: [
        'Semua Fitur Paket Gold',
        'Desain Monogram Nama Pasangan di Ornamen',
        'Galeri Foto Prewedding & Love Story Timeline',
        'Dukungan Personalisasi Ribuan Tamu Tanpa Batas',
        'Broadcast Generator Pesan WhatsApp Otomatis',
        'Prioritas Revisi Desain 24 Jam',
      ],
      recommended: false,
    },
  ];

  return (
    <section className="px-5 sm:px-12 py-10 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>SISTEM GENERATE LINK TAMU &amp; PUBLIKASI SAAS</span>
            </p>
            <h2 className="font-serif-ceremonial text-3xl sm:text-4xl text-slate-900 mt-1">
              Manajemen Undangan Tamu: {customization.groomShort} &amp; {customization.brideShort}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Template: <strong className="text-slate-900">{template.name}</strong> · Palet:{' '}
              <strong className="text-slate-900">{customization.palette.name}</strong> · Siap Deploy ke Vercel CDN
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenMobileSimulator}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer transition-all"
            >
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>Simulator iPhone</span>
            </button>
            <button
              type="button"
              onClick={() => onLaunchGuestExperience()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl text-xs font-medium tracking-[0.02em] flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <span>Uji Mode Layar Penuh</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Metric Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[10px]">TOTAL UCAPAN MASUK</span>
              <MessageSquare className="w-4 h-4 text-amber-600" />
            </div>
            <p className="font-serif-ceremonial tabular-nums text-3xl font-semibold text-slate-900 mt-1">
              {wishes.length} Doa Restu
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Buku tamu realtime tanpa database</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[10px]">KONFIRMASI HADIR</span>
              <Users className="w-4 h-4 text-amber-600" />
            </div>
            <p className="font-serif-ceremonial tabular-nums text-3xl font-semibold text-slate-900 mt-1">
              {totalAttending} Orang
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Estimasi kehadiran dari RSVP tamu</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[10px]">LINK GENERATOR</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif-ceremonial text-2xl font-semibold text-slate-900 mt-1">
              {guestNamesArray.length} Tamu Siap Kirim
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Link personal dengan nama di sampul</p>
          </div>
        </div>
      </div>

      {/* =====================================================================
          FLAGSHIP SAAS FEATURE: GUEST LINK GENERATOR & WHATSAPP SENDER
         ===================================================================== */}
      <div className="mt-10 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-2">
              <LinkIcon className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                FITUR UTAMA SAAS
              </span>
            </div>
            <h3 className="font-serif-ceremonial text-2xl sm:text-3xl text-slate-900">
              Alat Pembuat Link Tamu (Personalized Guest URL)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Setiap tamu akan menerima link unik dengan nama mereka tertulis di sampul undangan &amp; segel lilin seremonial.
              Salin link atau langsung kirimkan via WhatsApp dalam satu klik!
            </p>
          </div>
        </div>

        {/* Inputs row: Add single guest or bulk paste */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Quick Add Single Guest & Bulk Area */}
          <div className="lg:col-span-5 space-y-4">
            <form onSubmit={handleAddSingleGuest} className="space-y-2">
              <label className="block text-xs font-semibold tracking-wider uppercase text-slate-600">
                + Tambah Tamu Cepat
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={singleGuestInput}
                  onChange={(e) => setSingleGuestInput(e.target.value)}
                  placeholder="Contoh: Bapak Ir. Bambang & Keluarga"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-xl flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </form>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-slate-600 mb-1">
                Tempel Daftar Nama Tamu Sekaligus (Satu Nama per Baris)
              </label>
              <textarea
                rows={5}
                value={guestListInput}
                onChange={(e) => setGuestListInput(e.target.value)}
                placeholder="Bapak Ahmad & Istri&#10;Dr. Siti Rahma&#10;Teman Kuliah ITB"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 leading-relaxed transition-colors"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                💡 Tulis nama-nama tamu di atas, sistem akan otomatis men-generate link &amp; draf WhatsApp untuk masing-masing tamu di sebelah kanan.
              </p>
            </div>
          </div>

          {/* Right: Generated Guest Links Stream */}
          <div className="lg:col-span-7">
            <label className="block text-xs font-semibold tracking-wider uppercase text-slate-600 mb-2">
              Daftar Tautan Tamu Siap Dibagikan ({guestNamesArray.length} Tamu)
            </label>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {guestNamesArray.map((guestName, idx) => {
                const guestLink = generateGuestLink(guestName);
                const guestWaText = generateGuestWaText(guestName);
                const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(guestWaText)}`;
                const isCopiedLink = copiedId === `link-${idx}`;
                const isCopiedWa = copiedId === `wa-${idx}`;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <strong className="text-xs text-slate-900 truncate">
                          {guestName}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveGuest(idx)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer shrink-0 transition-colors"
                        title="Hapus tamu ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Guest Link Readonly */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={guestLink}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-slate-600 select-all truncate"
                      />
                    </div>

                    {/* Action buttons per guest */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(guestLink, `link-${idx}`)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        {isCopiedLink ? (
                          <>
                            <Check className="w-3 h-3 text-amber-600" />
                            <span className="text-amber-700 font-semibold">Link Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Salin Link</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(guestWaText, `wa-${idx}`)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        {isCopiedWa ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Teks WA Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3 h-3 text-slate-400" />
                            <span>Salin Teks WA</span>
                          </>
                        )}
                      </button>

                      <a
                        href={waShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Kirim WA</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          onUpdateCustomization({
                            ...customization,
                            guestRecipientName: guestName,
                          });
                          onLaunchGuestExperience(guestName);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors ml-auto shadow-2xs"
                      >
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                        <span>Buka Preview Tamu</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Client Proposal Pricing Cards (Ready to Present to Clients) */}
      <div className="mt-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700">
            PENAWARAN PAKET KEPADA KLIEN
          </p>
          <h3 className="font-serif-ceremonial text-3xl sm:text-4xl text-slate-900 mt-1">
            Paket Investasi Undangan Digital DIGIAT
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Gunakan panduan paket ini untuk menjelaskan benefit dan fitur kepada calon pengantin saat demo presentasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                pkg.recommended
                  ? 'bg-white border-2 border-amber-500 shadow-xl relative'
                  : 'bg-white border border-slate-200 shadow-sm'
              }`}
            >
              <div>
                {pkg.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                    {pkg.badge}
                  </div>
                )}
                <div className="flex items-center justify-between mt-1">
                  <h4 className="font-serif-ceremonial text-2xl font-semibold text-slate-900">
                    {pkg.name}
                  </h4>
                  {!pkg.recommended && (
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <span className="font-mono text-3xl font-bold text-slate-900">{pkg.price}</span>
                  <span className="text-xs text-slate-500 ml-1">/ undangan</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-800">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onOpenMobileSimulator}
                  className={`w-full py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    pkg.recommended
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  Tunjukkan Demo Paket Ini
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
