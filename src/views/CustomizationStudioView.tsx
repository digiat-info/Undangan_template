import React, { useState } from 'react';
import {
  Palette,
  User,
  Calendar,
  Image as ImageIcon,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Share2,
  Eye,
  Volume2,
  Gift,
  Plus,
  Trash2,
  CreditCard,
  QrCode,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import {
  ClientCustomization,
  ColorPalette,
  TemplateId,
  TemplateSchema,
  BankAccountModel,
} from '../models/invitation.model';
import { GuestWish } from '../data/adatSuites';
import { TemplateInvitationRenderer } from '../templates/TemplateInvitationRenderer';

interface CustomizationStudioViewProps {
  templates: TemplateSchema[];
  activeTemplate: TemplateSchema;
  customization: ClientCustomization;
  onSelectTemplate: (id: TemplateId) => void;
  onUpdateCustomization: (updated: ClientCustomization) => void;
  onResetDefaults: (id: TemplateId) => void;
  wishes: GuestWish[];
  onAddWish: (payload: {
    name: string;
    relation: string;
    attendance: 'Hadir' | 'Berhalangan';
    guestsCount: number;
    message: string;
    adatTag: string;
  }) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onProceedToPublish: () => void;
  onOpenFullGuestView: () => void;
}

export const CustomizationStudioView: React.FC<CustomizationStudioViewProps> = ({
  templates,
  activeTemplate,
  customization,
  onSelectTemplate,
  onUpdateCustomization,
  onResetDefaults,
  wishes,
  onAddWish,
  isPlayingAudio,
  onToggleAudio,
  onProceedToPublish,
  onOpenFullGuestView,
}) => {
  const [editorTab, setEditorTab] = useState<'warna' | 'mempelai' | 'acara' | 'hadiah' | 'foto'>('warna');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('mobile');

  const handleColorChange = (
    key: keyof Omit<ColorPalette, 'id' | 'name'>,
    value: string
  ) => {
    onUpdateCustomization({
      ...customization,
      palette: {
        ...customization.palette,
        id: 'custom-client',
        name: 'Palet Kustom Klien',
        [key]: value,
      },
    });
  };

  const handlePresetClick = (preset: ColorPalette) => {
    onUpdateCustomization({
      ...customization,
      palette: { ...preset },
    });
  };

  const handleFieldChange = (field: keyof ClientCustomization, value: any) => {
    onUpdateCustomization({
      ...customization,
      [field]: value,
    });
  };

  // Bank accounts management
  const handleBankChange = (index: number, key: keyof BankAccountModel, value: string) => {
    const updatedBanks = [...customization.banks];
    updatedBanks[index] = { ...updatedBanks[index], [key]: value };
    handleFieldChange('banks', updatedBanks);
  };

  const handleAddBank = () => {
    const newBank: BankAccountModel = {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '1234567890',
      accountHolder: `a.n. ${customization.groomShort}`,
    };
    handleFieldChange('banks', [...customization.banks, newBank]);
  };

  const handleRemoveBank = (index: number) => {
    const updatedBanks = customization.banks.filter((_, i) => i !== index);
    handleFieldChange('banks', updatedBanks);
  };

  return (
    <section className="px-4 sm:px-8 py-8 max-w-[1440px] mx-auto">
      {/* Top Studio Header Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700">
            STUDIO KUSTOMISASI DESAIN &amp; WARNA KLIEN (LIVE PREVIEW)
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h2 className="font-serif-ceremonial text-2xl sm:text-3xl text-slate-900">
              Editor Template: {activeTemplate.name}
            </h2>
            <span className="text-xs text-slate-500">
              · {activeTemplate.characterTagline}
            </span>
          </div>
        </div>

        {/* Device Responsive Simulator & Publish Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Responsive Viewport Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                previewDevice === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-amber-600" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                previewDevice === 'tablet'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5 text-amber-600" />
              <span>Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                previewDevice === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-600" />
              <span>Smartphone</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenFullGuestView}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Mode Tamu Penuh</span>
          </button>

          <button
            type="button"
            onClick={onProceedToPublish}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan Link &amp; Proposal</span>
          </button>
        </div>
      </div>

      {/* Main Split Workspace: Left Control Sidebar (4 cols) + Right Live Invitation Canvas (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR: CUSTOMIZATION CONTROLS */}
        <aside className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm lg:sticky lg:top-20 max-h-[85vh] overflow-y-auto">
          {/* Template Quick Switcher */}
          <div className="pb-4 border-b border-slate-200">
            <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-1.5">
              PILIH TEMPLATE STUDIO (6 DESAIN)
            </label>
            <select
              value={activeTemplate.id}
              onChange={(e) => onSelectTemplate(e.target.value as TemplateId)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.code} · {tpl.name} ({tpl.cultureOrigin})
                </option>
              ))}
            </select>
          </div>

          {/* 5 Editor Category Tabs */}
          <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 border border-slate-200/80 rounded-xl my-4">
            <button
              type="button"
              onClick={() => setEditorTab('warna')}
              className={`py-2 px-1 rounded-lg text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                editorTab === 'warna'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              <span>Warna</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('mempelai')}
              className={`py-2 px-1 rounded-lg text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                editorTab === 'mempelai'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>Mempelai</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('acara')}
              className={`py-2 px-1 rounded-lg text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                editorTab === 'acara'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Acara</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('hadiah')}
              className={`py-2 px-1 rounded-lg text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                editorTab === 'hadiah'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Hadiah</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('foto')}
              className={`py-2 px-1 rounded-lg text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                editorTab === 'foto'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Foto</span>
            </button>
          </div>

          {/* ===============================================================
              TAB 1: COLOR CUSTOMIZER
             =============================================================== */}
          {editorTab === 'warna' && (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                  PRESET PALET WARNA ({activeTemplate.name})
                </p>
                <div className="space-y-2">
                  {activeTemplate.colorPresets.map((preset) => {
                    const isCurrent = customization.palette.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-50 border-amber-300 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className={`text-xs font-medium ${isCurrent ? 'text-amber-950 font-semibold' : 'text-slate-800'}`}>
                          {preset.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {[
                            preset.canvas,
                            preset.primaryText,
                            preset.accent,
                            preset.ceremonialDark,
                          ].map((c, idx) => (
                            <span
                              key={idx}
                              style={{ backgroundColor: c }}
                              className="w-4 h-4 rounded-full border border-black/20 shadow-2xs"
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2.5">
                  KUSTOMISASI WARNA BEBAS (COLOR PICKER)
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      key: 'canvas' as const,
                      label: 'Warna Latar Utama (Canvas)',
                      desc: 'Warna kertas / latar belakang halaman undangan',
                    },
                    {
                      key: 'surface' as const,
                      label: 'Warna Kartu Permukaan (Surface)',
                      desc: 'Latar kotak acara, profil, dan kotak hadiah',
                    },
                    {
                      key: 'primaryText' as const,
                      label: 'Warna Teks Utama',
                      desc: 'Warna teks judul dan nama mempelai',
                    },
                    {
                      key: 'mutedText' as const,
                      label: 'Warna Teks Sekunder',
                      desc: 'Keterangan tanggal, alamat, dan deskripsi',
                    },
                    {
                      key: 'accent' as const,
                      label: 'Warna Emas / Aksen (Accent)',
                      desc: 'Warna ornamen budaya, bingkai, dan tombol CTA',
                    },
                    {
                      key: 'border' as const,
                      label: 'Warna Garis Bingkai (Border)',
                      desc: 'Garis pembatas ornamen dan pemisah bagian',
                    },
                    {
                      key: 'ceremonialDark' as const,
                      label: 'Warna Sampul / Bagian Gelap',
                      desc: 'Latar sampul pembuka dan doa restu',
                    },
                  ].map((field) => (
                    <div
                      key={field.key}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="min-w-0">
                        <label className="block text-xs font-medium text-slate-800">
                          {field.label}
                        </label>
                        <span className="block text-[10px] text-slate-500 truncate">
                          {field.desc}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="color"
                          value={customization.palette[field.key]}
                          onChange={(e) => handleColorChange(field.key, e.target.value)}
                          className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={customization.palette[field.key]}
                          onChange={(e) => handleColorChange(field.key, e.target.value)}
                          className="w-16 px-1.5 py-1 text-[11px] font-mono uppercase bg-white border border-slate-300 rounded text-center text-slate-800"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 2: BRIDE & GROOM PROFILES
             =============================================================== */}
          {editorTab === 'mempelai' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama Panggilan Pria
                </label>
                <input
                  type="text"
                  value={customization.groomShort}
                  onChange={(e) => handleFieldChange('groomShort', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama Lengkap &amp; Gelar Pria
                </label>
                <input
                  type="text"
                  value={customization.groomFull}
                  onChange={(e) => handleFieldChange('groomFull', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Silsilah Orang Tua Pria
                </label>
                <input
                  type="text"
                  value={customization.groomParents}
                  onChange={(e) => handleFieldChange('groomParents', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Instagram Pria
                </label>
                <input
                  type="text"
                  value={customization.groomInstagram || ''}
                  placeholder="@username"
                  onChange={(e) => handleFieldChange('groomInstagram', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="pt-3 border-t border-slate-200">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama Panggilan Wanita
                </label>
                <input
                  type="text"
                  value={customization.brideShort}
                  onChange={(e) => handleFieldChange('brideShort', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama Lengkap &amp; Gelar Wanita
                </label>
                <input
                  type="text"
                  value={customization.brideFull}
                  onChange={(e) => handleFieldChange('brideFull', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Silsilah Orang Tua Wanita
                </label>
                <input
                  type="text"
                  value={customization.brideParents}
                  onChange={(e) => handleFieldChange('brideParents', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Instagram Wanita
                </label>
                <input
                  type="text"
                  value={customization.brideInstagram || ''}
                  placeholder="@username"
                  onChange={(e) => handleFieldChange('brideInstagram', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 3: CEREMONY EVENTS & GENERAL DETAILS
             =============================================================== */}
          {editorTab === 'acara' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Tanggal Tampilan Seremonial
                </label>
                <input
                  type="text"
                  value={customization.weddingDateDisplay}
                  onChange={(e) => handleFieldChange('weddingDateDisplay', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Kota / Wilayah Utama
                </label>
                <input
                  type="text"
                  value={customization.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nama Tamu Undangan Default (Pada Sampul)
                </label>
                <input
                  type="text"
                  value={customization.guestRecipientName}
                  onChange={(e) => handleFieldChange('guestRecipientName', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Slug URL Pasangan
                </label>
                <input
                  type="text"
                  value={customization.slug}
                  onChange={(e) => handleFieldChange('slug', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Rangkaian Acara List */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                  RANGKAIAN ACARA ({customization.events.length} SESI)
                </p>
                <div className="space-y-3">
                  {customization.events.map((ev, idx) => (
                    <div key={ev.id || idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <input
                        type="text"
                        value={ev.title}
                        placeholder="Nama Acara (e.g. Akad Nikah)"
                        onChange={(e) => {
                          const updated = [...customization.events];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          handleFieldChange('events', updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={ev.date}
                          placeholder="Hari & Tanggal"
                          onChange={(e) => {
                            const updated = [...customization.events];
                            updated[idx] = { ...updated[idx], date: e.target.value };
                            handleFieldChange('events', updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800"
                        />
                        <input
                          type="text"
                          value={ev.time}
                          placeholder="Waktu (e.g. 08.00 - 10.00)"
                          onChange={(e) => {
                            const updated = [...customization.events];
                            updated[idx] = { ...updated[idx], time: e.target.value };
                            handleFieldChange('events', updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800"
                        />
                      </div>
                      <input
                        type="text"
                        value={ev.venue}
                        placeholder="Nama Tempat / Gedung"
                        onChange={(e) => {
                          const updated = [...customization.events];
                          updated[idx] = { ...updated[idx], venue: e.target.value };
                          handleFieldChange('events', updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-800"
                      />
                      <textarea
                        rows={2}
                        value={ev.address}
                        placeholder="Alamat Lengkap"
                        onChange={(e) => {
                          const updated = [...customization.events];
                          updated[idx] = { ...updated[idx], address: e.target.value };
                          handleFieldChange('events', updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 4: DIGITAL GIFTS, BANK ACCOUNTS & QRIS (USER REQUESTED!)
             =============================================================== */}
          {editorTab === 'hadiah' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500">
                    REKENING BANK PENERIMA ({customization.banks.length})
                  </p>
                  <button
                    type="button"
                    onClick={handleAddBank}
                    className="text-[11px] font-medium text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Rekening</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {customization.banks.map((bank, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-amber-700">
                          Rekening #{idx + 1}
                        </span>
                        {customization.banks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBank(idx)}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            title="Hapus Rekening"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Nama Bank</label>
                        <input
                          type="text"
                          value={bank.bankName}
                          placeholder="e.g. Bank Central Asia (BCA)"
                          onChange={(e) => handleBankChange(idx, 'bankName', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Nomor Rekening</label>
                        <input
                          type="text"
                          value={bank.accountNumber}
                          placeholder="e.g. 1234567890"
                          onChange={(e) => handleBankChange(idx, 'accountNumber', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Atas Nama (Pemilik)</label>
                        <input
                          type="text"
                          value={bank.accountHolder}
                          placeholder="e.g. a.n. R.M. Bagaskara"
                          onChange={(e) => handleBankChange(idx, 'accountHolder', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QRIS Image URL Input */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2 flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-amber-600" />
                  <span>KODE QRIS (GAMBAR BARCODE)</span>
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    URL Gambar QRIS (JPG / PNG)
                  </label>
                  <input
                    type="url"
                    value={customization.qrisImageUrl || ''}
                    placeholder="https://i.imgur.com/... atau URL gambar QRIS klien"
                    onChange={(e) => handleFieldChange('qrisImageUrl', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Jika dikosongkan, template akan menampilkan simulasi QRIS barcode elegan otomatis.
                  </p>
                  {customization.qrisImageUrl && (
                    <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <p className="text-[10px] text-slate-500 mb-1">Pratinjau QRIS Klien:</p>
                      <img
                        src={customization.qrisImageUrl}
                        alt="QRIS Preview"
                        className="w-24 h-24 object-contain mx-auto border border-slate-200 bg-white p-1 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Physical Gift Shipping Address */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>ALAMAT PENGIRIMAN KADO FISIK</span>
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Alamat Lengkap &amp; Kode Pos
                  </label>
                  <textarea
                    rows={3}
                    value={customization.giftAddress || ''}
                    placeholder="Contoh: Jl. Slamet Riyadi No. 214, Kemlayan, Kec. Serengan, Kota Surakarta 57151"
                    onChange={(e) => handleFieldChange('giftAddress', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Tamu dapat menekan tombol "Salin Alamat" untuk mengirim kado atau parsel via kurir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 5: PHOTOGRAPHY URLS
             =============================================================== */}
          {editorTab === 'foto' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  URL Foto Sampul Utama (Hero)
                </label>
                <input
                  type="url"
                  value={customization.heroPhoto}
                  onChange={(e) => handleFieldChange('heroPhoto', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  URL Foto Mempelai Pria
                </label>
                <input
                  type="url"
                  value={customization.groomPhoto}
                  onChange={(e) => handleFieldChange('groomPhoto', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  URL Foto Mempelai Wanita
                </label>
                <input
                  type="url"
                  value={customization.bridePhoto}
                  onChange={(e) => handleFieldChange('bridePhoto', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  URL Foto Penutup (Closing)
                </label>
                <input
                  type="url"
                  value={customization.closingPhoto || ''}
                  placeholder="https://images.unsplash.com/..."
                  onChange={(e) => handleFieldChange('closingPhoto', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Gallery Photos List */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                  FOTO GALERI MOMEN ({customization.gallery.length} FOTO)
                </p>
                <div className="space-y-3">
                  {customization.gallery.map((g, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-700">Foto #{idx + 1} {idx === 0 ? '(Utama/Lebar)' : ''}</span>
                      <input
                        type="url"
                        value={g.url}
                        placeholder="URL Foto..."
                        onChange={(e) => {
                          const updated = [...customization.gallery];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          handleFieldChange('gallery', updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={g.caption}
                        placeholder="Keterangan / Caption..."
                        onChange={(e) => {
                          const updated = [...customization.gallery];
                          updated[idx] = { ...updated[idx], caption: e.target.value };
                          handleFieldChange('gallery', updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reset to Template Defaults */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onResetDefaults(activeTemplate.id)}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ke Default Template</span>
            </button>
            <span className="text-[11px] text-amber-700 font-medium">
              Tersimpan Otomatis
            </span>
          </div>
        </aside>

        {/* RIGHT WORKSPACE: LIVE RESPONSIVE TEMPLATE RENDERER */}
        <div className="lg:col-span-8 flex justify-center">
          <div
            className={`w-full transition-all duration-500 ${
              previewDevice === 'mobile'
                ? 'max-w-[420px] border-[8px] border-[#18181B] rounded-[38px] shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto ring-4 ring-black/10'
                : previewDevice === 'tablet'
                ? 'max-w-[740px] border-[6px] border-[#18181B] rounded-[24px] shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto ring-4 ring-black/10'
                : 'max-w-full'
            }`}
          >
            <TemplateInvitationRenderer
              template={activeTemplate}
              custom={customization}
              wishes={wishes}
              onAddWish={onAddWish}
              isPlayingAudio={isPlayingAudio}
              onToggleAudio={onToggleAudio}
              viewportMode={previewDevice}
              startWithCoverOpen={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
