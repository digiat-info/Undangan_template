import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Maximize2,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'motion/react';
import { TemplateSchema, TemplateId } from '../models/invitation.model';

interface DeviceMockupFrameProps {
  template: TemplateSchema;
  allTemplates: TemplateSchema[];
  onSelectTemplate: (id: TemplateId) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onResetCover: () => void;
  onOpenFullscreen: () => void;
  children: React.ReactNode;
}

export const DeviceMockupFrame: React.FC<DeviceMockupFrameProps> = ({
  template,
  allTemplates,
  onSelectTemplate,
  isPlayingAudio,
  onToggleAudio,
  onResetCover,
  onOpenFullscreen,
  children,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet'>('mobile');
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Device Toolbar (Presenter Controls) */}
      <div className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Left: Template Switcher Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTemplateDropdown((v) => !v)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-800 transition-all cursor-pointer shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-slate-500 font-normal">Template:</span>
            <strong className="text-slate-900 font-semibold">{template.name}</strong>
            <span className="text-[10px] bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded font-mono font-medium">
              {template.code}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showTemplateDropdown && (
            <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50">
              <div className="text-[10px] font-semibold text-slate-400 uppercase px-3 py-1.5 tracking-wider border-b border-slate-100 mb-1">
                Pilih Arah Seni Adat &amp; Modern
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {allTemplates.map((t) => {
                  const isCur = t.id === template.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelectTemplate(t.id);
                        setShowTemplateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        isCur
                          ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200'
                          : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div>
                        <div className="text-slate-900 font-medium">{t.name}</div>
                        <div className="text-[10px] text-slate-500">{t.characterTagline}</div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-600 font-semibold">{t.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
            <span>Smartphone (390px)</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              deviceMode === 'tablet'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5 text-amber-600" />
            <span>Tablet (720px)</span>
          </button>
        </div>

        {/* Right: Actions (Reset Cover & Fullscreen) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetCover}
            title="Ulangi simulasi dari Sampul Pembuka (Segel Lilin)"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Ulangi Sampul</span>
          </button>

          <button
            type="button"
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Musik Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Musik Mati</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Mode Layar Penuh</span>
          </button>
        </div>
      </div>

      {/* Simulator Guidance Pill */}
      <div className="mb-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-medium">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>
            Simulasi Interaktif Tamu: Buka sampul lilin dengan memencet tombol, lalu gulir layar di dalam bezel smartphone
          </span>
        </span>
      </div>

      {/* Realistic Device Bezel */}
      <motion.div
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`relative transition-all duration-300 ${
          deviceMode === 'mobile'
            ? 'w-[390px] sm:w-[412px] h-[840px] max-h-[85vh]'
            : 'w-full max-w-[740px] h-[880px] max-h-[88vh]'
        }`}
      >
        {/* Device Outer Chassis with Titanium Metallic Border */}
        <div className="w-full h-full bg-[#18181B] rounded-[48px] p-3 shadow-2xl border-[3px] border-[#3F3F46] ring-8 ring-black/15 flex flex-col relative overflow-hidden">
          {/* Subtle Screen Reflection Highlight */}
          <div className="absolute top-0 right-10 w-40 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none z-40" />

          {/* Screen Container */}
          <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col border border-black/10">
            {/* Top iOS / Mobile Status Bar & Dynamic Island */}
            <div className="relative z-40 h-11 bg-black text-white px-6 flex items-center justify-between text-[11px] font-semibold select-none shrink-0">
              {/* Left Clock */}
              <span className="tracking-tight font-medium">09:41</span>

              {/* Dynamic Island Pill */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 h-6 w-28 bg-[#09090B] rounded-full flex items-center justify-between px-2.5 border border-white/10 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1C1917] border border-white/15 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-[#3B82F6]/70" />
                </span>
                {isPlayingAudio ? (
                  <div className="flex items-center gap-0.5">
                    <span className="w-0.5 h-2 bg-amber-400 animate-[soundwaveBar_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3 bg-amber-400 animate-[soundwaveBar_0.6s_ease-in-out_infinite_0.1s]" />
                    <span className="w-0.5 h-1.5 bg-amber-400 animate-[soundwaveBar_0.7s_ease-in-out_infinite_0.2s]" />
                  </div>
                ) : (
                  <span className="text-[8px] text-zinc-400 tracking-wider uppercase font-mono">
                    DIGIAT
                  </span>
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Right Icons: 5G & Battery */}
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] tracking-wider font-mono">5G</span>
                {/* Battery Icon */}
                <div className="w-5 h-2.5 rounded-[3px] border border-white/60 p-[1px] flex items-center">
                  <div className="h-full w-full bg-white rounded-[1.5px]" />
                </div>
              </div>
            </div>

            {/* Inner Scrollable Invitation Viewport */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain relative scroll-smooth focus:outline-none"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#94A3B8 #F1F5F9',
              }}
            >
              {children}
            </div>

            {/* Bottom iOS Home Indicator Bar */}
            <div className="h-4 bg-black/95 flex items-center justify-center shrink-0 z-40">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
