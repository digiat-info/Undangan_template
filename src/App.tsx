/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  LayoutGrid,
  Sparkles,
  Play,
  Pause,
  Smartphone,
  Award,
  AlertTriangle,
  Clock,
  MessageCircle,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import {
  ClientCustomization,
  TemplateId,
} from './models/invitation.model';
import {
  UserRole,
  SubscriptionTier,
  UserProfile,
  ClientSubscription,
} from './models/saas.model';
import { TEMPLATE_REGISTRY, getTemplateById } from './data/templateRegistry';
import { StorageService } from './services/storage.service';
import { InvitationController } from './controllers/invitation.controller';
import { SaasController } from './controllers/saas.controller';
import { SaasAuthService } from './services/saasAuth.service';
import { BUSINESS_CONFIG, buildWhatsAppUrl, WA_TEMPLATES } from './config/business.config';
import { ADAT_SUITES, GuestWish } from './data/adatSuites';
import { adatAudio } from './utils/adatAudioEngine';
import { FloatingPetalsOverlay } from './components/NusantaraMotifs';
import { FloatingCeremonyAudioPlayer } from './components/FloatingCeremonyAudioPlayer';
import { DeviceMockupFrame } from './components/DeviceMockupFrame';
import { SaaSHeroSection } from './components/SaaSHeroSection';
import { SaaSRoleSwitcherBar } from './components/SaaSRoleSwitcherBar';
import { SaaSAuthModal } from './components/SaaSAuthModal';
import { CatalogSelectionView } from './views/CatalogSelectionView';
import { CustomizationStudioView } from './views/CustomizationStudioView';
import { PublishingDashboardView } from './views/PublishingDashboardView';
import { AdminManagementView } from './views/AdminManagementView';
import { DesignerWorkspaceView } from './views/DesignerWorkspaceView';
import { FinancePortalView } from './views/FinancePortalView';
import { TemplateInvitationRenderer } from './templates/TemplateInvitationRenderer';
import { isSupabaseConfigured, SupabaseService } from './services/supabase.service';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export type AppTab = 'showcase' | 'demo' | 'studio' | 'pitch' | 'fullscreen-guest' | 'admin' | 'designer-board' | 'finance';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('showcase');
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>('javanese-royal');

  // Persisted state for customizations and guestbook wishes
  const [customizations, setCustomizations] = useState<Record<TemplateId, ClientCustomization>>(() =>
    StorageService.loadAllCustomizations()
  );

  const [wishes, setWishes] = useState<GuestWish[]>(() =>
    StorageService.loadWishes()
  );

  // Audio & ambient petals
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showPetals, setShowPetals] = useState<boolean>(true);
  const [coverResetCount, setCoverResetCount] = useState<number>(0);

  // ===================== SaaS Role & Subscription State =====================
  const [currentUser, setCurrentUser] = useState<UserProfile>(() =>
    SaasAuthService.getCurrentUser()
  );
  const [currentSubscription, setCurrentSubscription] = useState<ClientSubscription>(() =>
    SaasAuthService.getCurrentSubscription()
  );
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Parse URL query parameters on initial mount (for Vercel sharing & demo links)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTemplate = params.get('template') || params.get('t');
      const urlGuest = params.get('to') || params.get('kepada');
      const urlView = params.get('view') || params.get('mode');
      const isDemo = params.get('demo') === 'true' || params.get('guest') === 'true';

      if (urlTemplate) {
        const validTemplate = TEMPLATE_REGISTRY.find((t) => t.id === urlTemplate);
        if (validTemplate) {
          setSelectedTemplateId(validTemplate.id);
        }
      }

      if (urlGuest) {
        const decodedGuest = decodeURIComponent(urlGuest);
        setCustomizations((prev) => {
          const currentTpl = (urlTemplate as TemplateId) || 'javanese-royal';
          const existing = prev[currentTpl] || StorageService.buildDefaultCustomization(currentTpl);
          const updated = {
            ...prev,
            [currentTpl]: {
              ...existing,
              guestRecipientName: decodedGuest,
            },
          };
          StorageService.saveAllCustomizations(updated);
          return updated;
        });
      }

      if (isDemo || urlView === 'guest' || urlView === 'fullscreen' || Boolean(urlGuest)) {
        setCoverResetCount((c) => c + 1);
        setActiveTab('fullscreen-guest');
      } else if (urlView === 'demo') {
        setActiveTab('demo');
      } else if (urlView === 'studio' || urlView === 'editor') {
        setActiveTab('studio');
      } else if (urlView === 'pitch' || urlView === 'pricing') {
        setActiveTab('pitch');
      }

      // Fetch remote RSVP wishes from Supabase if connected
      if (isSupabaseConfigured()) {
        const slug = 'arya-sekar';
        SupabaseService.fetchWishes(slug).then((remoteWishes) => {
          if (remoteWishes && remoteWishes.length > 0) {
            setWishes(remoteWishes);
          }
        });
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Ensure audio is immediately and completely stopped whenever returning to public landing page
  useEffect(() => {
    if (activeTab === 'showcase') {
      adatAudio.stop();
      setIsPlayingAudio(false);
    }
  }, [activeTab]);

  const activeTemplate = getTemplateById(selectedTemplateId);
  const activeCustomization =
    customizations[selectedTemplateId] ||
    StorageService.buildDefaultCustomization(selectedTemplateId);

  const handleSelectTemplate = (id: TemplateId, autoPlayMusic = false) => {
    setSelectedTemplateId(id);
    const targetCustom = customizations[id] || StorageService.buildDefaultCustomization(id);
    if (autoPlayMusic) {
      InvitationController.playCustomizationAudio(targetCustom);
      setIsPlayingAudio(true);
    } else {
      InvitationController.ringTemplateGong(id);
    }
  };

  const handleUpdateCustomization = (updated: ClientCustomization) => {
    setCustomizations((prev) => {
      const next = { ...prev, [updated.templateId]: updated };
      StorageService.saveAllCustomizations(next);
      return next;
    });

    // Cloud Database Sync: persist to Supabase PostgreSQL in background if configured
    if (isSupabaseConfigured()) {
      SupabaseService.saveInvitation(updated);
    }
  };

  const handleResetDefaults = (id: TemplateId) => {
    const fresh = InvitationController.resetTemplateDefaults(id);
    handleUpdateCustomization(fresh);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      adatAudio.stop();
      setIsPlayingAudio(false);
    } else {
      InvitationController.playCustomizationAudio(activeCustomization);
      setIsPlayingAudio(true);
    }
  };

  const handleAddWish = (payload: {
    name: string;
    relation: string;
    attendance: 'Hadir' | 'Berhalangan';
    guestsCount: number;
    message: string;
    adatTag: string;
  }) => {
    setWishes((prev) => {
      const next = InvitationController.createNewWish(prev, payload);
      // Cloud Database Sync: persist wish to Supabase guest_wishes table
      if (isSupabaseConfigured() && next[0]) {
        SupabaseService.submitWish(activeCustomization.slug, next[0]);
      }
      return next;
    });
  };

  // Bridge active template or custom MP3 to FloatingCeremonyAudioPlayer
  const isCustomMp3 = Boolean(activeCustomization.audioConfig?.customMp3Url);
  const currentAudioSuiteBridge = {
    ...ADAT_SUITES[0],
    regionLabel: isCustomMp3
      ? (activeCustomization.audioConfig?.customMp3Artist || 'LAGU PENGANTIN').toUpperCase()
      : activeTemplate.name.toUpperCase(),
    musicTrack: {
      ...activeTemplate.musicConfig,
      title: isCustomMp3
        ? (activeCustomization.audioConfig?.customMp3Title || 'Lagu Pernikahan')
        : activeTemplate.musicConfig.title,
      ensemble: isCustomMp3
        ? (activeCustomization.audioConfig?.customMp3Artist || 'MP3 Kustom')
        : activeTemplate.musicConfig.ensemble,
    },
  };

  const guestAudioSuiteBridge = {
    ...ADAT_SUITES[0],
    regionLabel: isCustomMp3 ? 'LAGU PERNIKAHAN' : 'MUSIK TRADISIONAL',
    musicTrack: {
      ...activeTemplate.musicConfig,
      title: isCustomMp3
        ? (activeCustomization.audioConfig?.customMp3Title || 'Lagu Pernikahan')
        : activeTemplate.musicConfig.title,
      ensemble: isCustomMp3
        ? (activeCustomization.audioConfig?.customMp3Artist || 'MP3 Kustom')
        : activeTemplate.musicConfig.ensemble,
    },
  };

  // Handler to open guest experience cleanly for a specific template
  const handleOpenGuestFullscreen = (targetTemplateId?: TemplateId, guestName?: string) => {
    const chosenTemplateId = targetTemplateId || selectedTemplateId;
    setSelectedTemplateId(chosenTemplateId);

    // Stop landing page audio before entering preview
    adatAudio.stop();
    setIsPlayingAudio(false);

    // Reset cover envelope and switch to immersive fullscreen guest view
    setCoverResetCount((c) => c + 1);
    setActiveTab('fullscreen-guest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===================== SaaS Role Switching & Auth Handlers (via SaasController) =====================
  const handleSwitchRole = (role: UserRole, tier?: SubscriptionTier) => {
    const result = SaasController.switchUserRole(role, tier);
    setCurrentUser(result.user);
    setCurrentSubscription(result.sub);

    // When switching to a regular user, return from internal role dashboards
    if (role === 'user') {
      if (['admin', 'designer-board', 'finance'].includes(activeTab)) {
        setActiveTab('showcase');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLoginAsRole = (role: UserRole, tier?: SubscriptionTier) => {
    handleSwitchRole(role, tier);
    setShowAuthModal(false);
  };

  const handleOpenRoleDashboard = (role: UserRole) => {
    const dashboardMap: Partial<Record<UserRole, AppTab>> = {
      admin: 'admin',
      designer: 'designer-board',
      finance: 'finance',
    };
    const target = dashboardMap[role];
    if (target) {
      setActiveTab(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenClientInvitation = (slug: string, templateId: string) => {
    const validTemplate = TEMPLATE_REGISTRY.find((t) => t.id === templateId);
    const chosen = validTemplate ? (validTemplate.id as TemplateId) : selectedTemplateId;
    handleOpenGuestFullscreen(chosen, 'Tamu Undangan');
  };

  const handleOpenClientEditor = (templateId: TemplateId) => {
    setSelectedTemplateId(templateId);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if user is in a role dashboard view
  const isRoleDashboardActive = ['admin', 'designer-board', 'finance'].includes(activeTab);

  // Subscription alert status computed via SaasController
  const subscriptionBanner = SaasController.getSubscriptionAlert(currentSubscription, currentUser.role);

  // If in Pure Fullscreen Guest View, render an uncluttered full immersion experience
  // No studio navigation, headers, or dashboards are accessible to guests
  if (activeTab === 'fullscreen-guest') {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative">
        <FloatingPetalsOverlay active={showPetals} />

        {/* Floating Top Navigation Bar in Fullscreen Guest View */}
        <div className="fixed top-4 inset-x-4 sm:inset-x-8 z-50 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={() => {
              adatAudio.stop();
              setIsPlayingAudio(false);
              setActiveTab('showcase');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-xl cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Tutup Preview & Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-300" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="pointer-events-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-xs text-slate-200 shadow-lg">
              <span>Tema:</span>
              <span className="font-bold text-fuchsia-300">{activeTemplate.name}</span>
            </div>

            <a
              href={buildWhatsAppUrl(WA_TEMPLATES.orderPlan(activeTemplate.name, activeTemplate.priceDisplay))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pesan Desain Ini</span>
            </a>
          </div>
        </div>

        <main className="max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
          <TemplateInvitationRenderer
            key={`${selectedTemplateId}-${coverResetCount}`}
            template={activeTemplate}
            custom={activeCustomization}
            wishes={wishes}
            onAddWish={handleAddWish}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={handleToggleAudio}
            viewportMode="desktop"
            startWithCoverOpen={false}
          />
        </main>

        <FloatingCeremonyAudioPlayer
          activeSuite={guestAudioSuiteBridge}
          isPlaying={isPlayingAudio}
          onTogglePlay={handleToggleAudio}
          hideTrackSelector={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative flex flex-col justify-between">
      {/* Ambient Floating Jasmine & Gold Petals — only in internal mode / invitation view */}
      <FloatingPetalsOverlay active={showPetals && currentUser.role !== 'user'} />

      {/* =====================================================================
          SAAS ROLE SWITCHER BAR (STICKY TOP — INTERNAL TEAM ONLY)
         ===================================================================== */}
      {currentUser.role !== 'user' && (
      <SaaSRoleSwitcherBar
        currentUser={currentUser}
        currentSubscription={currentSubscription}
        onSwitchRole={handleSwitchRole}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onOpenRoleDashboard={handleOpenRoleDashboard}
      />
      )}

      {/* Subscription Countdown Banner (internal team view only — "sekali bayar" model has no expiry for customers) */}
      {currentUser.role !== 'user' && subscriptionBanner && (
        <div className={`${subscriptionBanner.color} text-white px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2`}>
          {subscriptionBanner.type === 'expired' && <AlertTriangle className="w-3.5 h-3.5" />}
          {subscriptionBanner.type === 'warning' && <Clock className="w-3.5 h-3.5" />}
          {subscriptionBanner.type === 'active' && <Sparkles className="w-3.5 h-3.5" />}
          <span>{subscriptionBanner.text}</span>
          {subscriptionBanner.action && (
            <button
              type="button"
              className="ml-2 px-2.5 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold transition-colors cursor-pointer"
              onClick={() => window.open(subscriptionBanner.actionUrl || buildWhatsAppUrl(WA_TEMPLATES.renewalOrUpgrade), '_blank')}
            >
              {subscriptionBanner.action}
            </button>
          )}
        </div>
      )}

      {/* =====================================================================
          MAIN HEADER — Two variants: floating pill capsule for public, full for internal team
         ===================================================================== */}
      {!isRoleDashboardActive && (
      <header className={`sticky ${currentUser.role !== 'user' ? 'top-[40px]' : 'top-3 sm:top-4'} z-40 px-3 sm:px-6 transition-all`}>
        <div className="max-w-6xl mx-auto flex min-h-14 sm:min-h-16 items-center justify-between gap-3 rounded-full border border-slate-200/90 bg-white/95 px-4 sm:px-6 shadow-sm backdrop-blur-md">
          {/* Brand Logo & Tagline */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('showcase');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-950 via-[#79124e] to-[#a71366] text-white flex items-center justify-center font-serif-ceremonial text-xl font-bold border border-fuchsia-300/30 shadow-xs group-hover:scale-105 transition-all p-1.5 overflow-hidden">
              <img
                src={BUSINESS_CONFIG.brand.logoUrl}
                alt={BUSINESS_CONFIG.brand.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-serif-ceremonial text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {BUSINESS_CONFIG.brand.name}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.14em] text-[#a71366] font-semibold ml-2.5 pl-2.5 border-l border-slate-200">
                {BUSINESS_CONFIG.brand.tagline}
              </span>
            </div>
          </a>

          {/* PUBLIC USER: Clean pill navigation links + WA CTA */}
          {currentUser.role === 'user' && (
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600">
                <a
                  href="#katalog-digiat"
                  className="px-3.5 py-1.5 rounded-full hover:text-[#a71366] hover:bg-fuchsia-50/80 transition-colors cursor-pointer"
                >
                  Katalog
                </a>
                <a
                  href="#paket-harga"
                  className="px-3.5 py-1.5 rounded-full hover:text-[#a71366] hover:bg-fuchsia-50/80 transition-colors cursor-pointer"
                >
                  Paket Harga
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenGuestFullscreen(selectedTemplateId, 'Tamu Undangan')}
                  className="px-3.5 py-1.5 rounded-full hover:text-[#a71366] hover:bg-fuchsia-50/80 transition-colors cursor-pointer flex items-center gap-1.5 text-slate-600 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5 text-[#a71366]" />
                  <span>Demo Tamu</span>
                </button>
              </nav>

              <a
                href={buildWhatsAppUrl(WA_TEMPLATES.generalInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs hover:shadow-md flex items-center gap-2 hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Pesan via WhatsApp</span>
                <span className="sm:hidden">Pesan</span>
              </a>
            </div>
          )}

          {/* INTERNAL TEAM: Full navigation tabs */}
          {currentUser.role !== 'user' && (
            <>
              <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-full border border-slate-200/80">
                {[
                  { id: 'showcase' as AppTab, label: 'Katalog Template', icon: LayoutGrid },
                  { id: 'demo' as AppTab, label: 'Live Demo Tamu', icon: Smartphone, highlight: true },
                  { id: 'studio' as AppTab, label: 'Studio Kustomisasi', icon: SlidersHorizontal },
                  { id: 'pitch' as AppTab, label: 'Link Tamu & Proposal', icon: Award },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap relative ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-fuchsia-400' : ''}`} />
                      <span>{item.label}</span>
                      {item.highlight && !isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPetals((p) => !p)}
                  className="hidden lg:flex px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-600 hover:text-slate-900 items-center gap-1 cursor-pointer"
                  title="Aktifkan/Matikan partikel kelopak bunga"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#a71366]" />
                  <span className="text-[11px] font-medium">{showPetals ? 'Efek On' : 'Efek Off'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
                    isPlayingAudio
                      ? 'bg-[#a71366] text-white border-[#a71366] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Jeda Musik</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#a71366]" />
                      <span className="hidden sm:inline">Putar Musik Adat</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Row — Internal team only */}
        {currentUser.role !== 'user' && (
        <div className="md:hidden flex items-center justify-between gap-1 pt-2.5 mt-2 border-t border-slate-200 overflow-x-auto">
          {[
            { id: 'showcase' as AppTab, label: 'Katalog' },
            { id: 'demo' as AppTab, label: 'Demo iPhone' },
            { id: 'studio' as AppTab, label: 'Editor' },
            { id: 'pitch' as AppTab, label: 'Link & Proposal' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        )}
      </header>
      )}

      {/* =====================================================================
          MAIN CONTENT — Public sees single-page catalog; Team sees tabbed views
         ===================================================================== */}
      {!isRoleDashboardActive && (
      <main className="flex-1">
        {/* PUBLIC USER: Single scrollable page (Hero + Catalog) */}
        {currentUser.role === 'user' && (
          <div>
            <SaaSHeroSection
              activeTemplate={activeTemplate}
              onExploreTemplates={() => {
                const el = document.getElementById('katalog-digiat');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenLiveDemo={() => {
                handleOpenGuestFullscreen(selectedTemplateId);
              }}
              onOpenStudio={() => {
                const el = document.getElementById('katalog-digiat');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <CatalogSelectionView
              templates={TEMPLATE_REGISTRY}
              selectedTemplateId={selectedTemplateId}
              customizations={customizations}
              isPlayingAudio={isPlayingAudio}
              isPublicView={true}
              onSelectTemplate={(id) => handleSelectTemplate(id, false)}
              onOpenCustomizer={(id) => {
                handleOpenGuestFullscreen(id);
              }}
              onOpenGuestPreview={(id) => {
                handleOpenGuestFullscreen(id);
              }}
            />
          </div>
        )}

        {/* INTERNAL TEAM: Tabbed views (showcase, demo, studio, pitch) */}
        {currentUser.role !== 'user' && (
          <>
            {activeTab === 'showcase' && (
              <div>
                <SaaSHeroSection
                  activeTemplate={activeTemplate}
                  onExploreTemplates={() => {
                    const el = document.getElementById('katalog-digiat');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenLiveDemo={() => {
                    setActiveTab('demo');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenStudio={() => {
                    setActiveTab('studio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <CatalogSelectionView
                  templates={TEMPLATE_REGISTRY}
                  selectedTemplateId={selectedTemplateId}
                  customizations={customizations}
                  isPlayingAudio={isPlayingAudio}
                  onSelectTemplate={(id, autoPlay) => handleSelectTemplate(id, autoPlay ?? true)}
                  onOpenCustomizer={(id) => {
                    handleSelectTemplate(id, false);
                    setActiveTab('studio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenGuestPreview={(id) => {
                    handleSelectTemplate(id, true);
                    setCoverResetCount((c) => c + 1);
                    setActiveTab('demo');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'demo' && (
              <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
                <DeviceMockupFrame
                  template={activeTemplate}
                  allTemplates={TEMPLATE_REGISTRY}
                  onSelectTemplate={(id) => handleSelectTemplate(id, false)}
                  isPlayingAudio={isPlayingAudio}
                  onToggleAudio={handleToggleAudio}
                  onResetCover={() => setCoverResetCount((c) => c + 1)}
                  onOpenFullscreen={() => handleOpenGuestFullscreen(selectedTemplateId)}
                >
                  <TemplateInvitationRenderer
                    key={`${selectedTemplateId}-${coverResetCount}`}
                    template={activeTemplate}
                    custom={activeCustomization}
                    wishes={wishes}
                    onAddWish={handleAddWish}
                    isPlayingAudio={isPlayingAudio}
                    onToggleAudio={handleToggleAudio}
                    viewportMode="mobile"
                    startWithCoverOpen={false}
                  />
                </DeviceMockupFrame>
              </section>
            )}

            {activeTab === 'studio' && (
              <CustomizationStudioView
                templates={TEMPLATE_REGISTRY}
                activeTemplate={activeTemplate}
                customization={activeCustomization}
                onSelectTemplate={(id) => handleSelectTemplate(id, false)}
                onUpdateCustomization={handleUpdateCustomization}
                onResetDefaults={handleResetDefaults}
                wishes={wishes}
                onAddWish={handleAddWish}
                isPlayingAudio={isPlayingAudio}
                onToggleAudio={handleToggleAudio}
                onProceedToPublish={() => {
                  setActiveTab('pitch');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenFullGuestView={() => handleOpenGuestFullscreen(selectedTemplateId)}
                subscription={currentSubscription}
              />
            )}

            {activeTab === 'pitch' && (
              <PublishingDashboardView
                template={activeTemplate}
                customization={activeCustomization}
                onUpdateCustomization={handleUpdateCustomization}
                wishes={wishes}
                onLaunchGuestExperience={(guestName) => handleOpenGuestFullscreen(selectedTemplateId, guestName)}
                onOpenMobileSimulator={() => {
                  setCoverResetCount((c) => c + 1);
                  setActiveTab('demo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                subscription={currentSubscription}
              />
            )}
          </>
        )}
      </main>
      )}

      {/* =====================================================================
          ROLE DASHBOARD VIEWS (Admin / Designer / Finance)
         ===================================================================== */}
      {activeTab === 'admin' && (
        <main className="flex-1">
          <AdminManagementView
            onOpenClientInvitation={handleOpenClientInvitation}
            onOpenDesignerWorkspace={() => {
              setActiveTab('designer-board');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {activeTab === 'designer-board' && (
        <main className="flex-1">
          <DesignerWorkspaceView
            onOpenClientEditor={handleOpenClientEditor}
          />
        </main>
      )}

      {activeTab === 'finance' && (
        <main className="flex-1">
          <FinancePortalView />
        </main>
      )}

      {/* =====================================================================
          FOOTER (DIGIAT STUDIO) — Hidden on role dashboards
         ===================================================================== */}
      {!isRoleDashboardActive && (
      <footer className="border-t border-slate-200 bg-white px-5 sm:px-12 py-10 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-ceremonial text-2xl font-bold text-slate-900">
                {BUSINESS_CONFIG.brand.name}
              </span>
              <span className="text-xs text-[#a71366] font-mono font-semibold">STUDIO v2.0</span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 max-w-xl leading-relaxed">
              {BUSINESS_CONFIG.brand.subtagline}.
              Solusi undangan digital pernikahan resmi dari DiGiat Group Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <a
              href="#katalog-digiat"
              className="hover:text-slate-900 cursor-pointer"
            >
              Katalog 6 Template
            </a>
            <a
              href="#paket-harga"
              className="hover:text-slate-900 cursor-pointer"
            >
              Paket Harga
            </a>
            <a
              href={buildWhatsAppUrl(WA_TEMPLATES.generalInquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Konsultasi WhatsApp
            </a>
          </div>
        </div>
      </footer>
      )}

      {/* Floating Ceremony Audio Player — Only in Studio/Demo views for internal team, NEVER on public landing page */}
      {currentUser.role !== 'user' && ['demo', 'studio'].includes(activeTab) && (
        <FloatingCeremonyAudioPlayer
          activeSuite={currentAudioSuiteBridge}
          isPlaying={isPlayingAudio}
          onTogglePlay={handleToggleAudio}
          onSelectSuiteMusic={(suite) => {
            const mapRegionToTemplate: Record<string, TemplateId> = {
              jawa: 'javanese-royal',
              sunda: 'sundanese-romance',
              minang: 'minang-heritage',
              bali: 'balinese-sacred',
              batak: 'modern-nusantara',
              bugis: 'islamic-elegance',
            };
            const targetId = mapRegionToTemplate[suite.id] || 'javanese-royal';
            handleSelectTemplate(targetId, true);
          }}
        />
      )}

      {/* Floating WhatsApp Support Button */}
      <FloatingWhatsApp />

      {/* SaaS Auth Modal (Login / Register Preview) */}
      <SaaSAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginAsRole={handleLoginAsRole}
      />
    </div>
  );
}
