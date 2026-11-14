import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Edit2,
  Save,
  Check,
  Receipt,
  FileText,
  Sparkles,
} from 'lucide-react';
import { PricingPlanConfig, PaymentTransaction } from '../models/saas.model';
import { SaasAuthService } from '../services/saasAuth.service';

export const FinancePortalView: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlanConfig[]>(() =>
    SaasAuthService.getPricingPlans()
  );
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() =>
    SaasAuthService.getTransactions()
  );
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<number>(0);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    window.setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleStartEditPrice = (plan: PricingPlanConfig) => {
    setEditingPlanId(plan.id);
    setEditPriceInput(plan.priceIdr);
  };

  const handleSavePrice = (planId: string) => {
    const updated = plans.map((p) => {
      if (p.id === planId) {
        return {
          ...p,
          priceIdr: editPriceInput,
          formattedPrice: `Rp ${editPriceInput.toLocaleString('id-ID')}`,
        };
      }
      return p;
    });

    setPlans(updated);
    SaasAuthService.savePricingPlans(updated);
    setEditingPlanId(null);
    showNotification('Harga paket berhasil diperbarui secara realtime!');
  };

  const handleVerifyPayment = (txId: string) => {
    const updated = SaasAuthService.verifyTransaction(txId);
    setTransactions(updated);
    showNotification(`Pembayaran #${txId} berhasil diverifikasi & paket klien diaktifkan!`);
  };

  const totalRevenue = transactions
    .filter((t) => t.status === 'verified')
    .reduce((sum, item) => sum + item.amountIdr, 0);

  const pendingCount = transactions.filter((t) => t.status === 'pending').length;

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <CreditCard className="w-4 h-4" />
            </span>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-emerald-700">
              PORTAL KEUANGAN &amp; PENAGIHAN (BILLING)
            </p>
          </div>
          <h2 className="font-serif-ceremonial text-3xl sm:text-4xl text-slate-900 mt-1">
            Pengaturan Harga Paket &amp; Verifikasi Pembayaran
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
            Atur nominal harga paket Free, Pro 30 Hari, dan VIP Terima Beres, serta lakukan verifikasi mutasi pembayaran klien untuk aktivasi akun instan.
          </p>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">TOTAL OMSET / PENDAPATAN</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Dari transaksi yang telah terverifikasi</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">MENUNGGU VERIFIKASI</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            {pendingCount} Transaksi
          </p>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Perlu konfirmasi mutasi bank</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase text-[10px] tracking-wider">PAKET TERSEDIA</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-serif-ceremonial text-3xl font-semibold text-slate-900 mt-1">
            3 Paket Aktif
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Freemium, Pro Self, VIP Agency</p>
        </div>
      </div>

      {/* SECTION 1: DYNAMIC PRICING MANAGER (KEUANGAN BISA ATUR HARGA) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="font-serif-ceremonial text-2xl font-bold text-slate-900">
            Pengaturan Harga Paket Berlangganan
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Ubah harga paket langsung di bawah ini. Perubahan harga akan otomatis tercermin di proposal klien dan tabel langganan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {plans.map((plan) => {
            const isEditing = editingPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`p-5 rounded-2xl border transition-all ${
                  plan.recommended
                    ? 'border-amber-400 bg-amber-50/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                    {plan.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{plan.durationLabel}</span>
                </div>

                <h4 className="font-serif-ceremonial text-xl font-bold text-slate-900 mt-2">
                  {plan.name}
                </h4>

                <div className="my-4 p-3 bg-white border border-slate-200 rounded-xl">
                  {isEditing ? (
                    <div className="space-y-2">
                      <label className="block text-[10px] text-slate-500 font-semibold uppercase">
                        Nominal Rupiah (IDR):
                      </label>
                      <input
                        type="number"
                        value={editPriceInput}
                        onChange={(e) => setEditPriceInput(parseInt(e.target.value, 10) || 0)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate-900 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleSavePrice(plan.id)}
                        className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Harga Baru</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold font-serif-ceremonial text-slate-900">
                          {plan.formattedPrice}
                        </span>
                        <span className="text-xs text-slate-500 block">/ per acara pernikahan</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStartEditPrice(plan)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        title="Ubah Harga Paket"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {plan.description}
                </p>

                <ul className="text-xs text-slate-600 space-y-1.5 pt-3 border-t border-slate-200">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: PAYMENT VERIFICATION TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="font-serif-ceremonial text-2xl font-bold text-slate-900">
            Verifikasi Mutasi &amp; Pembayaran Masuk
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Daftar pembayaran transfer bank atau QRIS dari klien yang siap diverifikasi.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">No. Invoice</th>
                <th className="py-3 px-3">Klien Pengantin</th>
                <th className="py-3 px-3">Paket</th>
                <th className="py-3 px-3">Metode Bayar</th>
                <th className="py-3 px-3">Nominal (IDR)</th>
                <th className="py-3 px-3">Waktu Bayar</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">{tx.id}</td>
                  <td className="py-3.5 px-3">
                    <strong className="text-slate-900 block">{tx.clientName}</strong>
                    <span className="text-[11px] text-slate-500">{tx.email}</span>
                  </td>
                  <td className="py-3.5 px-3 uppercase text-[11px] font-semibold text-amber-700">
                    {tx.tier}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">{tx.paymentMethod}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    Rp {tx.amountIdr.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 text-[11px]">{tx.createdAt}</td>
                  <td className="py-3.5 px-3">
                    {tx.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-semibold text-[11px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
                        <Clock className="w-3 h-3" />
                        Menunggu Cek
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {tx.status === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => handleVerifyPayment(tx.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium cursor-pointer transition-colors shadow-2xs"
                      >
                        Verifikasi &amp; Aktifkan
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
