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
  Layers,
  Upload,
  Database,
  Sparkles,
  Check,
  HelpCircle,
  FileText,
  Sliders,
  CheckCircle2,
  X,
  Music,
  Play,
  Pause,
  FileAudio,
  Radio,
} from 'lucide-react';
import {
  ClientCustomization,
  ColorPalette,
  TemplateId,
  TemplateSchema,
  BankAccountModel,
  ParallaxAssetConfig,
} from '../models/invitation.model';
import { GuestWish } from '../data/adatSuites';
import { ClientSubscription } from '../models/saas.model';
import { TemplateInvitationRenderer } from '../templates/TemplateInvitationRenderer';
import { isSupabaseConfigured, SupabaseService } from '../services/supabase.service';

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
  subscription?: ClientSubscription;
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
  subscription,
}) => {
  const [editorTab, setEditorTab] = useState<'warna' | 'mempelai' | 'acara' | 'hadiah' | 'foto' | 'aset' | 'musik'>('warna');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('mobile');
  const [isUploading, setIsUploading] = useState<string | null>(null);

  // Audio configuration helpers
  const handleAudioConfigChange = (patch: Partial<NonNullable<ClientCustomization['audioConfig']>>) => {
    const current = customization.audioConfig || {
      sourceType: 'preset_synth',
      customMp3Url: '',
      customMp3Title: activeTemplate.musicConfig.title,
      customMp3Artist: activeTemplate.musicConfig.ensemble,
      autoPlay: true,
    };
    onUpdateCustomization({
      ...customization,
      audioConfig: {
        ...current,
        ...patch,
      },
    });
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('audio') && !file.name.endsWith('.mp3')) {
      alert('Mohon pilih file format audio (.mp3)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert('Ukuran file maksimal 15MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      onUpdateCustomization({
        ...customization,
        audioConfig: {
          sourceType: 'custom_mp3',
          customMp3Url: dataUrl,
          customMp3Title: cleanName,
          customMp3Artist: `${customization.groomShort} & ${customization.brideShort}`,
          autoPlay: true,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  // Feature gating for Free tier
  const isFreeTier = subscription?.tier === 'free';
  const isExpired = subscription?.status === 'expired';
  const isLocked = isFreeTier || isExpired;

  const handleAssetConfigChange = <K extends keyof ParallaxAssetConfig>(
    key: K,
    value: ParallaxAssetConfig[K]
  ) => {
    const current: ParallaxAssetConfig = customization.assetConfig || {
      enableParallax: true,
      parallaxIntensity: 'medium',
      bgTextureUrl: '',
      bgTextureOpacity: 0.12,
      bgTextureBlendMode: 'luminosity',
      cornerOrnamentUrl: '',
      cornerOrnamentOpacity: 0.85,
      sideBordersUrl: '',
      dividerOrnamentUrl: '',
      floatingMotifs: true,
    };
    onUpdateCustomization({
      ...customization,
      assetConfig: {
        ...current,
        [key]: value,
      },
    });
  };

  const handleFileUpload = async (
    targetField: string,
    file: File,
    folder = 'assets'
  ) => {
    try {
      setIsUploading(targetField);
      const url = await SupabaseService.uploadAsset(file, folder);

      if (targetField === 'heroPhoto') {
        handleFieldChange('heroPhoto', url);
      } else if (targetField === 'groomPhoto') {
        handleFieldChange('groomPhoto', url);
      } else if (targetField === 'bridePhoto') {
        handleFieldChange('bridePhoto', url);
      } else if (targetField === 'closingPhoto') {
        handleFieldChange('closingPhoto', url);
      } else if (targetField === 'qrisImageUrl') {
        handleFieldChange('qrisImageUrl', url);
      } else if (targetField.startsWith('gallery-')) {
        const idx = parseInt(targetField.replace('gallery-', ''), 10);
        const updated = [...customization.gallery];
        if (updated[idx]) {
          updated[idx] = { ...updated[idx], url };
          handleFieldChange('gallery', updated);
        }
      } else if (targetField === 'bgTextureUrl') {
        handleAssetConfigChange('bgTextureUrl', url);
      } else if (targetField === 'cornerOrnamentUrl') {
        handleAssetConfigChange('cornerOrnamentUrl', url);
      } else if (targetField === 'dividerOrnamentUrl') {
        handleAssetConfigChange('dividerOrnamentUrl', url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(null);
    }
  };

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

          {/* 7 Editor Category Tabs */}
          <div className="grid grid-cols-7 gap-1 p-1 bg-slate-100 border border-slate-200/80 rounded-xl my-4">
            <button
              type="button"
              onClick={() => setEditorTab('warna')}
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                editorTab === 'foto'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Foto</span>
            </button>
            <button
              type="button"
              onClick={() => !isLocked && setEditorTab('aset')}
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all relative ${
                isLocked
                  ? 'text-slate-400 cursor-not-allowed opacity-60'
                  : editorTab === 'aset'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold cursor-pointer'
                  : 'text-slate-600 hover:text-slate-900 cursor-pointer'
              }`}
              title={isLocked ? 'Tersedia di Paket Pro — Upgrade untuk membuka fitur ini' : 'Parallax & Aset Kustom'}
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Parallax</span>
              {isLocked && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[7px]">🔒</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('musik')}
              className={`py-2 px-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium flex flex-col items-center gap-1 transition-all cursor-pointer relative ${
                editorTab === 'musik'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-amber-600" />
              <span>Musik</span>
              {customization.audioConfig?.customMp3Url && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
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
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-amber-600" />
                    <span>KODE QRIS (GAMBAR BARCODE)</span>
                  </p>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>{isUploading === 'qrisImageUrl' ? 'Mengunggah...' : 'Upload QRIS'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'qrisImageUrl'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('qrisImageUrl', file, 'qris');
                      }}
                    />
                  </label>
                </div>
                <div>
                  <input
                    type="url"
                    value={customization.qrisImageUrl || ''}
                    placeholder="https://... atau klik Upload QRIS di atas"
                    onChange={(e) => handleFieldChange('qrisImageUrl', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Upload gambar barcode QRIS klien, atau tempel URL langsung.
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
              TAB 5: PHOTOGRAPHY & ASSET UPLOADS
             =============================================================== */}
          {editorTab === 'foto' && (
            <div className="space-y-4">
              {/* Hero Photo */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Foto Sampul Utama (Hero)</label>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3 text-amber-600" />
                    <span>{isUploading === 'heroPhoto' ? 'Mengunggah...' : 'Upload Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'heroPhoto'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('heroPhoto', file, 'photos');
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {customization.heroPhoto && (
                    <img
                      src={customization.heroPhoto}
                      alt="Hero"
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <input
                    type="url"
                    value={customization.heroPhoto}
                    placeholder="https://... atau klik Upload Foto di atas"
                    onChange={(e) => handleFieldChange('heroPhoto', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Groom Photo */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Foto Mempelai Pria</label>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3 text-amber-600" />
                    <span>{isUploading === 'groomPhoto' ? 'Mengunggah...' : 'Upload Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'groomPhoto'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('groomPhoto', file, 'photos');
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {customization.groomPhoto && (
                    <img
                      src={customization.groomPhoto}
                      alt="Pria"
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <input
                    type="url"
                    value={customization.groomPhoto}
                    placeholder="https://... atau klik Upload Foto"
                    onChange={(e) => handleFieldChange('groomPhoto', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Bride Photo */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Foto Mempelai Wanita</label>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3 text-amber-600" />
                    <span>{isUploading === 'bridePhoto' ? 'Mengunggah...' : 'Upload Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'bridePhoto'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('bridePhoto', file, 'photos');
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {customization.bridePhoto && (
                    <img
                      src={customization.bridePhoto}
                      alt="Wanita"
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <input
                    type="url"
                    value={customization.bridePhoto}
                    placeholder="https://... atau klik Upload Foto"
                    onChange={(e) => handleFieldChange('bridePhoto', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Closing Photo */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">Foto Penutup (Closing)</label>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3 text-amber-600" />
                    <span>{isUploading === 'closingPhoto' ? 'Mengunggah...' : 'Upload Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'closingPhoto'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('closingPhoto', file, 'photos');
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {customization.closingPhoto && (
                    <img
                      src={customization.closingPhoto}
                      alt="Closing"
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <input
                    type="url"
                    value={customization.closingPhoto || ''}
                    placeholder="https://..."
                    onChange={(e) => handleFieldChange('closingPhoto', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Gallery Photos List */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                  FOTO GALERI MOMEN ({customization.gallery.length} FOTO)
                </p>
                <div className="space-y-3">
                  {customization.gallery.map((g, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-700">
                          Foto #{idx + 1} {idx === 0 ? '(Utama/Featured)' : ''}
                        </span>
                        <label className="text-[10px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3 h-3 text-amber-600" />
                          <span>{isUploading === `gallery-${idx}` ? 'Mengunggah...' : 'Ganti Foto'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isUploading === `gallery-${idx}`}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(`gallery-${idx}`, file, 'gallery');
                            }}
                          />
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        {g.url && (
                          <img
                            src={g.url}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        )}
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
                      </div>
                      <input
                        type="text"
                        value={g.caption}
                        placeholder="Keterangan / Caption Momen..."
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

          {/* ===============================================================
              TAB 6: ASET DESAIN & EFEK PARALLAX (USER REQUESTED!)
             =============================================================== */}
          {editorTab === 'aset' && (
            <div className="space-y-5">
              {isLocked && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-2">
                  <span className="text-2xl">🔒</span>
                  <h4 className="text-sm font-bold text-amber-800">Fitur Parallax & Upload Aset Terkunci</h4>
                  <p className="text-xs text-amber-700">
                    {isExpired
                      ? 'Masa aktif paket Anda telah habis. Hubungi Admin untuk perpanjangan.'
                      : 'Upgrade ke Paket Pro untuk membuka efek parallax, upload tekstur wallpaper, dan ornamen kustom AI.'}
                  </p>
                  <span className="inline-block px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-semibold">
                    {isExpired ? 'Perpanjang via Admin' : 'Tersedia di Paket Pro — Rp 149.000'}
                  </span>
                </div>
              )}
              {/* Parallax Engine Toggle & Depth Intensity */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Efek Animasi Parallax</span>
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Ornamen &amp; wallpaper melayang dinamis saat halaman di-scroll
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customization.assetConfig?.enableParallax ?? true}
                      onChange={(e) => handleAssetConfigChange('enableParallax', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600" />
                  </label>
                </div>

                {customization.assetConfig?.enableParallax && (
                  <div className="pt-2 border-t border-slate-200/80">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                      Intensitas Kedalaman Parallax
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'subtle', label: 'Halus (8%)' },
                        { id: 'medium', label: 'Sedang (18%)' },
                        { id: 'deep', label: 'Dramatis (35%)' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleAssetConfigChange('parallaxIntensity', item.id as any)}
                          className={`py-1.5 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                            (customization.assetConfig?.parallaxIntensity || 'medium') === item.id
                              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs font-semibold'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Wallpaper / Ambient Texture Asset */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800">
                      Latar Belakang / Wallpaper Tekstur
                    </label>
                    <p className="text-[10px] text-slate-500">
                      Diisolasi pada layer latar belakang sehingga teks tidak pernah bertabrakan
                    </p>
                  </div>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3 text-amber-600" />
                    <span>{isUploading === 'bgTextureUrl' ? 'Mengunggah...' : 'Upload Tekstur'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'bgTextureUrl'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('bgTextureUrl', file, 'textures');
                      }}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  {customization.assetConfig?.bgTextureUrl && (
                    <img
                      src={customization.assetConfig.bgTextureUrl}
                      alt="Wallpaper Texture"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                    />
                  )}
                  <input
                    type="url"
                    value={customization.assetConfig?.bgTextureUrl || ''}
                    placeholder="URL gambar tekstur / batik..."
                    onChange={(e) => handleAssetConfigChange('bgTextureUrl', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Quick Texture Presets */}
                <div>
                  <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Preset Tekstur Siap Pakai:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'Batik Kasunanan', url: '/assets/motif_jawa/6541342_1560.jpg' },
                      { label: 'Damask Mewah', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Kertas Linen', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Polos (Tanpa Tekstur)', url: '' },
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleAssetConfigChange('bgTextureUrl', preset.url)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${
                          (customization.assetConfig?.bgTextureUrl || '') === preset.url
                            ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opacity & Blend Mode controls */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-1">
                      Opasitas Tekstur: {Math.round((customization.assetConfig?.bgTextureOpacity || 0.12) * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.04"
                      max="0.40"
                      step="0.02"
                      value={customization.assetConfig?.bgTextureOpacity ?? 0.12}
                      onChange={(e) => handleAssetConfigChange('bgTextureOpacity', parseFloat(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-600 mb-1">
                      Mode Blend
                    </label>
                    <select
                      value={customization.assetConfig?.bgTextureBlendMode || 'luminosity'}
                      onChange={(e) => handleAssetConfigChange('bgTextureBlendMode', e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800"
                    >
                      <option value="luminosity">Luminosity (Elegan)</option>
                      <option value="overlay">Overlay (Kontras)</option>
                      <option value="multiply">Multiply (Gelap)</option>
                      <option value="soft-light">Soft Light (Halus)</option>
                      <option value="normal">Normal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Corner Ornament Motif Asset (PNG Transparent) */}
              <div className="pt-3 border-t border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800">
                      Ornamen Sudut &amp; Canting (PNG Transparan)
                    </label>
                    <p className="text-[10px] text-slate-500">
                      Ornamen dekoratif di 4 sudut dan pembatas seremonial
                    </p>
                  </div>
                  <label className="text-[11px] text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3 h-3 text-amber-600" />
                    <span>{isUploading === 'cornerOrnamentUrl' ? 'Mengunggah...' : 'Upload Ornamen'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading === 'cornerOrnamentUrl'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('cornerOrnamentUrl', file, 'ornaments');
                      }}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  {customization.assetConfig?.cornerOrnamentUrl && (
                    <img
                      src={customization.assetConfig.cornerOrnamentUrl}
                      alt="Corner Ornament"
                      className="w-10 h-10 rounded-lg object-contain border border-slate-200 shrink-0 bg-slate-900 p-1"
                    />
                  )}
                  <input
                    type="url"
                    value={customization.assetConfig?.cornerOrnamentUrl || ''}
                    placeholder="URL motif PNG transparan..."
                    onChange={(e) => {
                      handleAssetConfigChange('cornerOrnamentUrl', e.target.value);
                      handleAssetConfigChange('dividerOrnamentUrl', e.target.value);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      handleAssetConfigChange('cornerOrnamentUrl', '/assets/motif_jawa/motif_jawa.png');
                      handleAssetConfigChange('dividerOrnamentUrl', '/assets/motif_jawa/motif_jawa.png');
                    }}
                    className="text-[10px] px-2.5 py-1 rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    Motif Canting Jawa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleAssetConfigChange('cornerOrnamentUrl', '');
                      handleAssetConfigChange('dividerOrnamentUrl', '');
                    }}
                    className="text-[10px] px-2.5 py-1 rounded-lg border bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    Tanpa Ornamen
                  </button>
                </div>

                {/* Corner ornament opacity */}
                <div className="pt-1">
                  <label className="block text-[10px] font-medium text-slate-600 mb-1">
                    Opasitas Ornamen: {Math.round((customization.assetConfig?.cornerOrnamentOpacity || 0.85) * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.20"
                    max="1.00"
                    step="0.05"
                    value={customization.assetConfig?.cornerOrnamentOpacity ?? 0.85}
                    onChange={(e) => handleAssetConfigChange('cornerOrnamentOpacity', parseFloat(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 7: MUSIK & UPLOAD LAGU MP3 KUSTOM (USER REQUESTED!)
             ================================================================= */}
          {editorTab === 'musik' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-slate-200">
                <div className="flex items-center gap-1.5 text-amber-700 font-semibold text-xs mb-1">
                  <Music className="w-4 h-4 text-amber-600" />
                  <span>KUSTOMISASI MUSIK LATAR &amp; UPLOAD MP3</span>
                </div>
                <h3 className="font-serif-ceremonial text-xl font-bold text-slate-900">
                  Audio Pengiring Undangan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Pilih antara musik tradisional autentik daerah atau upload lagu romantis MP3 kesukaan kedua mempelai.
                </p>
              </div>

              {/* Status Audio Terpilih */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {customization.audioConfig?.customMp3Url
                          ? (customization.audioConfig.customMp3Title || 'Lagu MP3 Kustom')
                          : activeTemplate.musicConfig.title}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {customization.audioConfig?.customMp3Url
                          ? `Artis: ${customization.audioConfig.customMp3Artist || 'Pilihan Pengantin'} · Sumber: File MP3`
                          : `Ensemble: ${activeTemplate.musicConfig.ensemble} · Skala: ${activeTemplate.musicConfig.scaleName}`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onToggleAudio}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Jeda</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-amber-600" />
                        <span>Dengarkan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pilihan Sumber Audio */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  1. Pilih Sumber Audio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAudioConfigChange({
                        sourceType: 'preset_synth',
                        customMp3Url: '',
                        customMp3Title: activeTemplate.musicConfig.title,
                        customMp3Artist: activeTemplate.musicConfig.ensemble,
                      });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      !customization.audioConfig?.customMp3Url
                        ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Radio className="w-4 h-4 text-amber-600 mb-1.5" />
                    <p className="text-xs font-bold text-slate-900">Musik Adat Autentik</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Sintesis gending tradisional bawaan template</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!customization.audioConfig?.customMp3Url) {
                        handleAudioConfigChange({
                          sourceType: 'custom_mp3',
                          customMp3Title: 'Lagu Pilihan Pengantin',
                          customMp3Artist: `${customization.groomShort} & ${customization.brideShort}`,
                        });
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      customization.audioConfig?.customMp3Url
                        ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <FileAudio className="w-4 h-4 text-emerald-600 mb-1.5" />
                    <p className="text-xs font-bold text-slate-900">Upload File MP3</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Gunakan lagu MP3 kesukaan mempelai</p>
                  </button>
                </div>
              </div>

              {/* Area Upload MP3 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Upload File MP3 Pengantin
                </label>

                <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-5 text-center transition-colors bg-slate-50/60">
                  <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    Klik untuk Pilih File MP3
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Format: .mp3 · Maksimal 15 MB
                  </p>
                  <input
                    type="file"
                    accept="audio/mp3,audio/*"
                    onChange={handleAudioFileUpload}
                    className="hidden"
                    id="audio-file-upload-input"
                  />
                  <label
                    htmlFor="audio-file-upload-input"
                    className="inline-block mt-3 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
                  >
                    Pilih File Audio dari Perangkat
                  </label>
                </div>

                {/* Input URL Alternatif (Misal dari Supabase Storage) */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Atau Masukkan Tautan / URL File MP3 Langsung (CDN / Supabase Storage):
                  </label>
                  <input
                    type="url"
                    value={customization.audioConfig?.customMp3Url?.startsWith('data:') ? '' : (customization.audioConfig?.customMp3Url || '')}
                    onChange={(e) => {
                      handleAudioConfigChange({
                        sourceType: 'custom_mp3',
                        customMp3Url: e.target.value,
                      });
                    }}
                    placeholder="https://your-supabase-project.supabase.co/storage/v1/object/public/wedding-music/lagu.mp3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  {customization.audioConfig?.customMp3Url?.startsWith('data:') && (
                    <p className="text-[10px] text-emerald-600 font-medium mt-1">
                      ✓ File MP3 lokal berhasil dimuat ke memori browser.
                    </p>
                  )}
                </div>

                {/* Metadata Lagu */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Judul Lagu
                    </label>
                    <input
                      type="text"
                      value={customization.audioConfig?.customMp3Title || ''}
                      onChange={(e) => handleAudioConfigChange({ customMp3Title: e.target.value })}
                      placeholder="Contoh: A Thousand Years"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Penyanyi / Artis
                    </label>
                    <input
                      type="text"
                      value={customization.audioConfig?.customMp3Artist || ''}
                      onChange={(e) => handleAudioConfigChange({ customMp3Artist: e.target.value })}
                      placeholder="Contoh: Christina Perri"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Koleksi Lagu Siap Pakai (1-Klik Terapkan) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Pilihan Lagu Populer Bebas Lisensi (1-Klik Pakai)
                </label>

                <div className="space-y-2">
                  {[
                    {
                      title: 'Canon in D (Romantic Piano & Strings)',
                      artist: 'Wedding Classic Ensemble',
                      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=romantic-wedding-piano-10657.mp3',
                    },
                    {
                      title: 'Acoustic Love Song (Beautiful In White Style)',
                      artist: 'Acoustic Guitarist',
                      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=acoustic-guitars-ambient-uplifting-18118.mp3',
                    },
                    {
                      title: 'Islamic Wedding Nasheed (Barakah Seremonial)',
                      artist: 'Middle East Harmony',
                      url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f7756f.mp3?filename=islamic-background-123491.mp3',
                    },
                  ].map((track, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-slate-200 hover:border-amber-400 bg-slate-50/50 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{track.title}</p>
                        <p className="text-[10px] text-slate-500 truncate">{track.artist}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleAudioConfigChange({
                            sourceType: 'custom_mp3',
                            customMp3Url: track.url,
                            customMp3Title: track.title,
                            customMp3Artist: track.artist,
                          });
                        }}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold rounded-md shrink-0 cursor-pointer shadow-2xs"
                      >
                        Gunakan Lagu Ini
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombol Hapus Lagu Kustom */}
              {customization.audioConfig?.customMp3Url && (
                <button
                  type="button"
                  onClick={() => {
                    handleAudioConfigChange({
                      sourceType: 'preset_synth',
                      customMp3Url: '',
                      customMp3Title: activeTemplate.musicConfig.title,
                      customMp3Artist: activeTemplate.musicConfig.ensemble,
                    });
                  }}
                  className="w-full py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kembalikan ke Musik Adat Bawaan Template</span>
                </button>
              )}
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
