import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Heart,
  ArrowRight,
  Shield,
  Palette,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { UserRole, SubscriptionTier } from '../models/saas.model';

interface SaaSAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsRole: (role: UserRole, tier?: SubscriptionTier) => void;
}

export const SaaSAuthModal: React.FC<SaaSAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginAsRole,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('klien.arya@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [coupleNames, setCoupleNames] = useState('Arya & Sekar');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginAsRole('user', 'pro');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-serif-ceremonial text-xl font-bold mx-auto mb-2 border border-amber-500/30 shadow-xs">
            D
          </div>
          <h3 className="font-serif-ceremonial text-2xl font-bold text-slate-900">
            DIGIAT STUDIO
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Portal Klien Undangan Digital Pernikahan Indonesia
          </p>
        </div>

        {/* Tab Switcher: Masuk vs Daftar */}
        <div className="flex rounded-xl bg-slate-100 p-1 my-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar Pengantin Baru
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Nama Panggilan Kedua Mempelai
              </label>
              <div className="relative">
                <Heart className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  placeholder="Contoh: Raden & Sekar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs mt-2"
          >
            <span>{authMode === 'login' ? 'Masuk ke Dashboard Undangan' : 'Mulai Buat Undangan (Free Trial)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2.5 text-center">
            Atau Uji Coba Demo Peran Cepat (1-Klik):
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onLoginAsRole('user', 'free');
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-[11px] font-medium text-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <div>
                <p className="font-semibold text-slate-900">Klien Free</p>
                <p className="text-[9px] text-slate-500">Fitur dasar terkunci</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginAsRole('user', 'pro');
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-[11px] font-medium text-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <div>
                <p className="font-semibold text-slate-900">Klien Pro (30h)</p>
                <p className="text-[9px] text-slate-500">Full Access aktif</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginAsRole('admin');
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-[11px] font-medium text-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <div>
                <p className="font-semibold text-slate-900">Super Admin</p>
                <p className="text-[9px] text-slate-500">Kontrol pelanggan</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginAsRole('designer');
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-[11px] font-medium text-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              <div>
                <p className="font-semibold text-slate-900">Desainer</p>
                <p className="text-[9px] text-slate-500">Pesanan Terima Beres</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginAsRole('finance');
                onClose();
              }}
              className="col-span-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-[11px] font-medium text-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900">Keuangan / Finance</p>
                <p className="text-[9px] text-slate-500">Atur harga paket &amp; verifikasi mutasi transfer bank</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
