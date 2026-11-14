import React, { useState } from 'react';
import {
  Palette,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit3,
  Layers,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';
import { TemplateId } from '../models/invitation.model';

interface DesignerWorkspaceViewProps {
  onOpenClientEditor: (templateId: TemplateId) => void;
}

export const DesignerWorkspaceView: React.FC<DesignerWorkspaceViewProps> = ({
  onOpenClientEditor,
}) => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-VIP-01',
      clientName: 'Rendy Syahputra & Citra Kirana',
      templateId: 'minang-heritage' as TemplateId,
      assignedDesigner: 'Maya Danastri, S.Ds.',
      status: 'in_progress',
      deadline: 'Besok, 18:00 WIB',
      notes: 'Minta ornamen Rumah Gadang dan warna merah marun emas khas Minang Bukittinggi. Foto prewed sudah di-upload ke drive.',
      revisionCount: 1,
    },
    {
      id: 'ORD-VIP-02',
      clientName: 'Aditya Pratama & Gita Gutawa',
      templateId: 'javanese-royal' as TemplateId,
      assignedDesigner: 'Maya Danastri, S.Ds.',
      status: 'review',
      deadline: '3 Hari lagi',
      notes: 'Gunakan gendhing Kebo Giro, font display Jawa Kraton, dan font nama kedua orang tua lengkap dengan gelar bangsawan.',
      revisionCount: 2,
    },
    {
      id: 'ORD-VIP-03',
      clientName: 'Farhan & Nabila (Revisi Tambahan)',
      templateId: 'islamic-elegance' as TemplateId,
      assignedDesigner: 'Budi Hartanto, S.Sn.',
      status: 'completed',
      deadline: 'Selesai Kemarin',
      notes: 'Penambahan nomor rekening Mandiri dan QRIS Bank Syariah Indonesia.',
      revisionCount: 3,
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return { label: 'Sedang Didesain', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'review':
        return { label: 'Menunggu Review Klien', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'completed':
        return { label: 'Selesai & Disetujui', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Antrean Baru', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <Palette className="w-4 h-4" />
            </span>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-blue-700">
              WORKSPACE TIM DESAINER KREATIF
            </p>
          </div>
          <h2 className="font-serif-ceremonial text-3xl sm:text-4xl text-slate-900 mt-1">
            Antrean Pesanan Paket VIP "Terima Beres"
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
            Bantu klien pengantin VIP yang memilih layanan terima jadi. Atur palet warna adat, sesuaikan aset ornamen AI/parallax, serta susun foto prewedding terbaik mereka.
          </p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {orders.map((order) => {
          const statusInfo = getStatusBadge(order.status);

          return (
            <div
              key={order.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{order.id}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif-ceremonial text-xl font-bold text-slate-900">
                    {order.clientName}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5 capitalize">
                    Template: {order.templateId.replace('-', ' ')}
                  </p>
                </div>

                <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Catatan Klien:</span>
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{order.notes}"
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Desainer: <strong>{order.assignedDesigner}</strong></span>
                  <span className="text-red-600 font-medium">{order.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Status Alur:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-200 bg-white cursor-pointer"
                  >
                    <option value="in_progress">Sedang Didesain</option>
                    <option value="review">Kirim Review Klien</option>
                    <option value="completed">Selesai &amp; Disetujui</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenClientEditor(order.templateId)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Buka Studio Desain Klien</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
