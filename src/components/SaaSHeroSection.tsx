import React from 'react';
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
  HeartHandshake,
} from 'lucide-react';
import { motion } from 'motion/react';
import { TemplateSchema } from '../models/invitation.model';

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
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 border-b border-slate-200/80 pt-12 pb-16 sm:pt-16 sm:pb-20 px-5 sm:px-12">
      {/* Subtle modern ambient highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-br from-amber-500/10 via-slate-100 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-700">
              PLATFORM UNDANGAN DIGITAL KELAS KREATIF &amp; ADAT PREMIER
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-ceremonial text-4xl sm:text-6xl text-slate-900 tracking-tight leading-[1.15]"
          >
            Undangan Digital Mewah dengan Filosofi Budaya Autentik &amp; Kustomisasi Bebas
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Enam template eksklusif berstandar studio untuk calon pengantin. Dilengkapi audio gamelan &amp;
            musik adat interaktif, sampul bersurat resmi dengan nama tamu personal, amplop digital QRIS,
            dan simulator tampilan ponsel yang memukau klien.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <button
              type="button"
              onClick={onOpenLiveDemo}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs sm:text-sm font-medium tracking-[0.03em] flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Coba Live Demo Tamu (iPhone Frame)</span>
            </button>

            <button
              type="button"
              onClick={onExploreTemplates}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium tracking-[0.03em] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Lihat 6 Template Desain</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={onOpenStudio}
              className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
            >
              <Palette className="w-4 h-4 text-amber-600" />
              <span>Studio Kustomisasi Warna</span>
            </button>
          </motion.div>

          {/* Highlights checklist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
          >
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-2.5">
                <Music className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-xs font-semibold text-slate-900">Audio Adat Sintesis</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Gamelan, Rindik, Suling, Talempong Web Audio</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-2.5">
                <Palette className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-xs font-semibold text-slate-900">Warna HEX Klien</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Cocokkan warna gaun pengantin secara bebas</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-2.5">
                <Send className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-xs font-semibold text-slate-900">WhatsApp Generator</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Kirim link dengan nama tamu di sampul</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-xs font-semibold text-slate-900">Vercel &amp; Tanpa DB</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Hosting gratis di Vercel, cepat &amp; tanpa error database</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
