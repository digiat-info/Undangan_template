import React, { useState } from 'react';
import {
  Users,
  Shield,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Palette,
  ArrowRight,
} from 'lucide-react';
import { ClientAccountSummary, SubscriptionTier } from '../models/saas.model';
import { SaasAuthService } from '../services/saasAuth.service';

interface AdminManagementViewProps {
  onOpenClientInvitation: (slug: string, templateId: string) => void;
  onOpenDesignerWorkspace: () => void;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  onOpenClientInvitation,
  onOpenDesignerWorkspace,
}) => {
  const [clients, setClients] = useState<ClientAccountSummary[]>(() =>
    SaasAuthService.getClients()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    window.setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleExtend = (clientId: string, clientName: string) => {
    const updated = SaasAuthService.extendClientSubscription(clientId, 30);
    setClients(updated);
    showNotification(`Masa aktif ${clientName} berhasil ditambah +30 Hari!`);
  };

  const handleChangeTier = (clientId: string, newTier: SubscriptionTier, clientName: string) => {
    const updated = SaasAuthService.changeClientTier(clientId, newTier);
    setClients(updated);
    showNotification(`Paket ${clientName} diubah ke ${newTier.toUpperCase()}`);
  };

  const filteredClients = clients.filter((c) => {
    const matchQuery =
      c.groomBrideNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = filterTier === 'all' || c.subscription.tier === filterTier;
    return matchQuery && matchTier;
  });

  const totalClients = clients.length;
  const activePro = clients.filter((c) => c.subscription.tier === 'pro' && c.subscription.status === 'active').length;
  const expiredCount = clients.filter((c) => c.subscription.status === 'expired').length;
  const vipCount = clients.filter((c) => c.subscription.tier === 'vip_agency').length;

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              <Shield className="w-4 h-4" />
            </span>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-purple-700">
              PORTAL KONTROL SUPER ADMINISTRATOR (OWNER)
            </p>
          </div>
          <h2 className="font-serif-ceremonial text-3xl sm:text-4xl text-slate-900 mt-1">
            Manajemen Pelanggan &amp; Masa Aktif Undangan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
            Pantau seluruh klien pengantin, kelola masa aktif 30 hari, aktivasi akun, dan delegasikan pesanan VIP Terima Beres ke Desainer.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDesignerWorkspace}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Lihat Board Desainer</span>
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">TOTAL PELANGGAN</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            {totalClients} Klien
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Pengantin terdaftar di sistem</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">PAKET PRO (30 HARI)</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            {activePro} Aktif
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Full access link personal</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">KEDALUWARSA / EXPIRED</span>
            <Clock className="w-4 h-4 text-red-500" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            {expiredCount} Klien
          </p>
          <p className="text-[11px] text-red-600 font-medium mt-1">Editing terkunci, butuh perpanjangan</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">VIP TERIMA BERES</span>
            <Palette className="w-4 h-4 text-blue-600" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            {vipCount} Pesanan
          </p>
          <p className="text-[11px] text-blue-600 font-medium mt-1">Dikerjakan tim Desainer</p>
        </div>
      </div>

      {/* Client List & Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama pengantin, email, atau slug..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Paket:</span>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none"
            >
              <option value="all">Semua Paket</option>
              <option value="free">Paket Free (Freemium)</option>
              <option value="pro">Paket Pro (Self-Service)</option>
              <option value="vip_agency">Paket VIP (Terima Beres)</option>
            </select>
          </div>
        </div>

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Klien Pengantin</th>
                <th className="py-3 px-3">Paket Langganan</th>
                <th className="py-3 px-3">Masa Aktif (30 Hari)</th>
                <th className="py-3 px-3">Template</th>
                <th className="py-3 px-3">Tamu &amp; Doa</th>
                <th className="py-3 px-3 text-right">Aksi Administrator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredClients.map((client) => {
                const sub = client.subscription;
                const isExpired = sub.status === 'expired';

                return (
                  <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div>
                        <strong className="text-slate-900 text-xs block">{client.groomBrideNames}</strong>
                        <span className="text-[11px] text-slate-500">{client.email} · {client.phone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <select
                        value={sub.tier}
                        onChange={(e) => handleChangeTier(client.id, e.target.value as SubscriptionTier, client.groomBrideNames)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border cursor-pointer ${
                          sub.tier === 'vip_agency'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : sub.tier === 'pro'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="free">Free (Dasar)</option>
                        <option value="pro">Pro (30 Hari)</option>
                        <option value="vip_agency">VIP Terima Beres</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-3">
                      {isExpired ? (
                        <div className="flex items-center gap-1.5 text-red-600 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Masa Aktif Habis (Expired)</span>
                        </div>
                      ) : sub.tier === 'free' ? (
                        <span className="text-slate-500 text-[11px]">Akses Terbatas (Freemium)</span>
                      ) : (
                        <div>
                          <span className="text-emerald-700 font-semibold text-xs">
                            Sisa {sub.daysRemaining} Hari
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Hingga {new Date(sub.expiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="capitalize text-slate-800 text-[11px]">
                        {client.templateId.replace('-', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-slate-900 text-xs font-semibold">{client.wishesCount} Doa</span>
                      <span className="text-[10px] text-slate-500 block">RSVP: {client.confirmedGuests} hadir</span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleExtend(client.id, client.groomBrideNames)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[11px] font-medium cursor-pointer transition-colors"
                          title="Tambah masa aktif 30 hari lagi"
                        >
                          +30 Hari
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenClientInvitation(client.slug, client.templateId)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          title="Buka pratinjau undangan klien"
                        >
                          <ExternalLink className="w-3 h-3 text-amber-400" />
                          <span>Lihat Undangan</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
