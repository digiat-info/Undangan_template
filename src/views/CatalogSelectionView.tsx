import React, { useState } from 'react';
import {
  Palette,
  Music,
  Eye,
  SlidersHorizontal,
  Check,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClientCustomization,
  TemplateId,
  TemplateSchema,
} from '../models/invitation.model';
import { TemplateCulturalCrest } from '../templates/CulturalOrnaments';

interface CatalogSelectionViewProps {
  templates: TemplateSchema[];
  selectedTemplateId: TemplateId;
  customizations: Record<TemplateId, ClientCustomization>;
  isPlayingAudio: boolean;
  onSelectTemplate: (id: TemplateId, autoPlay?: boolean) => void;
  onOpenCustomizer: (id: TemplateId) => void;
  onOpenGuestPreview: (id: TemplateId) => void;
}

export const CatalogSelectionView: React.FC<CatalogSelectionViewProps> = ({
  templates,
  selectedTemplateId,
  customizations,
  isPlayingAudio,
  onSelectTemplate,
  onOpenCustomizer,
  onOpenGuestPreview,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('SEMUA');

  const categories = ['SEMUA', 'Adat Klasik', 'Religi & Kaligrafi', 'Editorial Kontemporer'];

  const filteredTemplates =
    activeCategory === 'SEMUA'
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const getTemplateBadge = (id: TemplateId) => {
    switch (id) {
      case 'javanese-royal':
        return { label: 'Bestseller · Kasunanan', color: 'bg-amber-50 text-amber-900 border-amber-200' };
      case 'sundanese-romance':
        return { label: 'Favorit Pengantin · Priangan', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
      case 'minang-heritage':
        return { label: 'Megah & Autentik · Marapulai', color: 'bg-rose-50 text-rose-900 border-rose-200' };
      case 'balinese-sacred':
        return { label: 'Sakral & Elegan · Paduraksa', color: 'bg-orange-50 text-orange-900 border-orange-200' };
      case 'islamic-elegance':
        return { label: 'Religius & Mewah · Mihrab', color: 'bg-indigo-50 text-indigo-900 border-indigo-200' };
      case 'modern-nusantara':
        return { label: 'Editorial Trend 2026', color: 'bg-slate-100 text-slate-900 border-slate-300' };
      default:
        return { label: 'Eksklusif', color: 'bg-slate-50 text-slate-800 border-slate-200' };
    }
  };

  return (
    <section id="katalog-digiat" className="px-5 sm:px-12 py-10 max-w-7xl mx-auto">
      {/* Studio Catalog Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700">
              KOLEKSI MASTERPIECE UNDANGAN DIGITAL
            </span>
          </div>
          <h2 className="font-serif-ceremonial text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Enam Arah Seni Eksklusif Siap Dipresentasikan ke Klien
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            Setiap template dirancang khusus dengan filosofi ornamen budaya murni, tipografi bernilai tinggi,
            sintesis musik tradisional Web Audio, serta kebebasan kustomisasi warna HEX secara instan tanpa perlu database.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl border text-xs font-medium tracking-[0.02em] transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Distinctive Templates Showcase Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredTemplates.map((tpl) => {
            const custom = customizations[tpl.id] || {
              ...tpl.defaultData,
              palette: tpl.defaultPalette,
            };
            const palette = custom.palette || tpl.defaultPalette;
            const isSelected = tpl.id === selectedTemplateId;
            const badge = getTemplateBadge(tpl.id);
            const isCurrentlyPlayingThis = isSelected && isPlayingAudio;

            return (
              <motion.article
                key={tpl.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`bg-white rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between relative shadow-sm ${
                  isSelected
                    ? 'ring-2 ring-amber-500 shadow-xl border border-amber-300'
                    : 'border border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top Kicker & Badge */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-900">
                      {tpl.priceDisplay}
                    </span>
                  </div>

                  {/* Live Art-Directed Mini Preview Card */}
                  <div
                    style={{
                      backgroundColor: palette.canvas,
                      borderColor: palette.border,
                      color: palette.primaryText,
                    }}
                    className="rounded-xl border p-4 relative overflow-hidden group shadow-inner"
                  >
                    {/* Preview Header with Cultural Crest */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        style={{ color: palette.accent }}
                        className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                      >
                        {tpl.cultureOrigin.split(',')[0]}
                      </span>
                      <TemplateCulturalCrest
                        templateId={tpl.id}
                        color={palette.accent}
                        size={32}
                      />
                    </div>

                    {/* 4:5 Editorial Portrait Frame */}
                    <div
                      style={{ borderColor: palette.accent }}
                      className={`relative aspect-[4/5] w-full overflow-hidden border p-1 ${
                        tpl.layoutArchetype === 'priangan-botanical'
                          ? 'rounded-full'
                          : tpl.layoutArchetype === 'kraton-pendopo' ||
                            tpl.layoutArchetype === 'medina-arch'
                          ? 'rounded-t-full rounded-b-[6px]'
                          : tpl.layoutArchetype === 'gonjong-geometric'
                          ? 'rounded-none'
                          : 'rounded-lg'
                      }`}
                    >
                      <img
                        src={custom.heroPhoto}
                        alt={tpl.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${palette.ceremonialDark}E6, transparent)`,
                        }}
                      />
                      <div className="absolute bottom-3.5 inset-x-3 text-center text-white">
                        <p
                          style={{ color: palette.accent }}
                          className="text-[9px] font-semibold tracking-[0.16em] uppercase"
                        >
                          {tpl.characterTagline}
                        </p>
                        <h3
                          style={{ fontFamily: tpl.typography.displayFont }}
                          className="text-2xl mt-0.5 leading-tight text-white"
                        >
                          {custom.groomShort} &amp; {custom.brideShort}
                        </h3>
                        <p className="text-[10px] opacity-80 mt-0.5 text-white/90">
                          {custom.weddingDateDisplay}
                        </p>
                      </div>

                      {/* Quick Audio Test Button overlay */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTemplate(tpl.id, !isCurrentlyPlayingThis);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                          isCurrentlyPlayingThis
                            ? 'bg-amber-600 text-white scale-110 ring-2 ring-white/50'
                            : 'bg-black/60 text-white/90 hover:bg-black/80 hover:scale-105'
                        }`}
                        title={isCurrentlyPlayingThis ? 'Jeda Musik' : 'Dengarkan Musik Tradisional'}
                      >
                        {isCurrentlyPlayingThis ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Color Swatches Preview Bar */}
                    <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {[
                          palette.canvas,
                          palette.primaryText,
                          palette.accent,
                          palette.ceremonialDark,
                        ].map((hex, i) => (
                          <span
                            key={i}
                            style={{ backgroundColor: hex }}
                            className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                            title={hex}
                          />
                        ))}
                        <span
                          style={{ color: palette.mutedText }}
                          className="text-[10px] ml-1 truncate max-w-[120px] font-medium"
                        >
                          {palette.name}
                        </span>
                      </div>
                      <span
                        style={{ color: palette.accent }}
                        className="text-[10px] font-semibold"
                      >
                        Kustom HEX
                      </span>
                    </div>
                  </div>

                  {/* Template Specifications */}
                  <div className="mt-4 px-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-ceremonial text-2xl font-semibold text-slate-900">
                        {tpl.name}
                      </h4>
                      {isSelected && (
                        <span className="text-xs font-semibold text-amber-800 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                          Terpilih
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-amber-700 mt-0.5">
                      {tpl.characterTagline}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                      {tpl.artDirectionNotes}
                    </p>

                    {/* Metadata chips */}
                    <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Palette className="w-3 h-3 text-amber-600" />
                        {tpl.colorPresets.length} Preset Warna
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Music className="w-3 h-3 text-amber-600" />
                        {tpl.musicConfig.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenGuestPreview(tpl.id)}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live Demo Tamu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCustomizer(tpl.id)}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Desain</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Presentation Pitch Banner */}
      <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            STANDAR TINGGI UNTUK KLIEN PERNIKAHAN
          </span>
          <h3 className="font-serif-ceremonial text-2xl sm:text-3xl text-slate-900 mt-1">
            Siap Dipresentasikan ke Calon Pengantin &amp; Wedding Organizer
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Gunakan simulator frame smartphone untuk menunjukkan bagaimana undangan ini tampil di genggaman tamu,
            atau gunakan editor warna untuk menyesuaikan tema busana pengantin secara langsung di depan klien.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenGuestPreview(selectedTemplateId)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl text-xs font-medium tracking-[0.02em] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4" />
            <span>Coba Simulator Tamu</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenCustomizer(selectedTemplateId)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs font-medium tracking-[0.02em] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Kustomisasi Editor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
