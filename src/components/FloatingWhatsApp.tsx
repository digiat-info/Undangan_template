import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_CONFIG, buildWhatsAppUrl, WA_TEMPLATES } from '../config/business.config';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const waUrl = buildWhatsAppUrl(WA_TEMPLATES.generalInquiry);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Floating Tooltip Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl p-3.5 max-w-[240px] text-left relative"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
              title="Tutup Pesan"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 text-[#a71366] font-semibold text-[11px] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>DIGIAT Wedding Support</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Ada pertanyaan seputar paket atau mau order terima beres? Chat CS kami via WhatsApp!
            </p>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Online &amp; Fast Response
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title="Hubungi Admin DIGIAT via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        <div className="text-left hidden sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-100 leading-tight">
            Tanya Admin
          </p>
          <p className="text-xs font-bold leading-tight">
            Chat WhatsApp
          </p>
        </div>
      </a>
    </div>
  );
};
