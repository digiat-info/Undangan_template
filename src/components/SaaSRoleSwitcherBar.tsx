import React, { useState } from 'react';
import {
  Shield,
  Palette,
  CreditCard,
  User,
  Sparkles,
  ChevronDown,
  LogIn,
  SlidersHorizontal,
} from 'lucide-react';
import { UserRole, SubscriptionTier, UserProfile, ClientSubscription } from '../models/saas.model';

interface SaaSRoleSwitcherBarProps {
  currentUser: UserProfile;
  currentSubscription: ClientSubscription;
  onSwitchRole: (role: UserRole, tier?: SubscriptionTier) => void;
  onOpenAuthModal: () => void;
  onOpenRoleDashboard: (role: UserRole) => void;
}

export const SaaSRoleSwitcherBar: React.FC<SaaSRoleSwitcherBarProps> = ({
  currentUser,
  currentSubscription,
  onSwitchRole,
  onOpenAuthModal,
  onOpenRoleDashboard,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleConfig: Record<UserRole, { label: string; badge: string; color: string; icon: any }> = {
    user: {
      label: 'Klien Pengantin',
      badge: currentSubscription.tier === 'free' ? 'Starter Rp39rb' : currentSubscription.status === 'expired' ? 'Paket Expired' : currentSubscription.tier === 'vip_agency' ? 'VIP Rp299rb' : 'Premium Rp99rb',
      color: 'bg-amber-600 text-white',
      icon: User,
    },
    admin: {
      label: 'Super Admin',
      badge: 'Owner / Kontrol Penuh',
      color: 'bg-purple-600 text-white',
      icon: Shield,
    },
    designer: {
      label: 'Desainer Studio',
      badge: 'Editor Terima Beres',
      color: 'bg-blue-600 text-white',
      icon: Palette,
    },
    finance: {
      label: 'Keuangan & Billing',
      badge: 'Kelola Harga & Mutasi',
      color: 'bg-emerald-600 text-white',
      icon: CreditCard,
    },
  };

  const activeRoleData = roleConfig[currentUser.role];
  const ActiveIcon = activeRoleData.icon;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-6 py-2 sticky top-0 z-50 text-xs shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Role Indicator & Quick Role Dropdown */}
        <div className="flex items-center gap-2 relative">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold hidden md:inline">
            PANEL AKSES TIM:
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleDropdown((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer text-xs font-medium"
            >
              <ActiveIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeRoleData.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-900/80 text-amber-300 font-mono">
                {activeRoleData.badge}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {/* Dropdown Menu */}
            {showRoleDropdown && (
              <div className="absolute top-full left-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                <p className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  SWITCH PERAN INTERNAL (1-KLIK):
                </p>

                {(['user', 'admin', 'designer', 'finance'] as UserRole[]).map((r) => {
                  const item = roleConfig[r];
                  const Icon = item.icon;
                  const isSelected = currentUser.role === r;

                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        onSwitchRole(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 text-amber-400 font-semibold'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{item.badge}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* If Role is User, show Quick Tier Selector */}
          {currentUser.role === 'user' && (
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto">
              <button
                type="button"
                onClick={() => onSwitchRole('user', 'free')}
                className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  currentSubscription.tier === 'free'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Paket Starter Rp 39.000 sekali bayar"
              >
                Starter Rp39rb
              </button>

              <button
                type="button"
                onClick={() => onSwitchRole('user', 'pro')}
                className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  currentSubscription.tier === 'pro' && currentSubscription.status !== 'expired'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Paket Premium Rp 99.000 sekali bayar"
              >
                <Sparkles className="w-2.5 h-2.5 inline mr-1 text-amber-300" />
                Premium Rp99rb
              </button>

              <button
                type="button"
                onClick={() => onSwitchRole('user', 'vip_agency')}
                className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  currentSubscription.tier === 'vip_agency'
                    ? 'bg-purple-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-purple-300'
                }`}
                title="Paket VIP Terima Beres Rp 299.000: dikerjakan tim Desainer"
              >
                VIP Rp299rb
              </button>
            </div>
          )}
        </div>

        {/* Right: User Profile & Portal Navigation */}
        <div className="flex items-center gap-2">
          {currentUser.role !== 'user' && (
            <button
              type="button"
              onClick={() => onOpenRoleDashboard(currentUser.role)}
              className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Buka Portal {activeRoleData.label}</span>
            </button>
          )}

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            {currentUser.avatarUrl && (
              <img
                src={currentUser.avatarUrl}
                alt=""
                className="w-6 h-6 rounded-full object-cover border border-amber-400/50 shrink-0"
              />
            )}
            <span className="text-xs text-slate-200 font-medium truncate max-w-[130px] hidden sm:inline">
              {currentUser.name}
            </span>

            <button
              type="button"
              onClick={onOpenAuthModal}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Pratinjau Layar Login / Registrasi Klien"
            >
              <LogIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
