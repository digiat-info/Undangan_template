/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Palette,
  SlidersHorizontal,
  Share2,
  Eye,
  LayoutGrid,
  Sparkles,
  Play,
  Pause,
  Smartphone,
  Award,
  Volume2,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClientCustomization,
  TemplateId,
} from './models/invitation.model';
import { TEMPLATE_REGISTRY, getTemplateById } from './data/templateRegistry';
import { StorageService } from './services/storage.service';
import { InvitationController } from './controllers/invitation.controller';
import { ADAT_SUITES, GuestWish } from './data/adatSuites';
import { adatAudio } from './utils/adatAudioEngine';
import { FloatingPetalsOverlay } from './components/NusantaraMotifs';
import { FloatingCeremonyAudioPlayer } from './components/FloatingCeremonyAudioPlayer';
import { DeviceMockupFrame } from './components/DeviceMockupFrame';
import { SaaSHeroSection } from './components/SaaSHeroSection';
import { CatalogSelectionView } from './views/CatalogSelectionView';
import { CustomizationStudioView } from './views/CustomizationStudioView';
import { PublishingDashboardView } from './views/PublishingDashboardView';
import { TemplateInvitationRenderer } from './templates/TemplateInvitationRenderer';

export type AppTab = 'showcase' | 'demo' | 'studio' | 'pitch' | 'fullscreen-guest';

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
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const activeTemplate = getTemplateById(selectedTemplateId);
  const activeCustomization =
    customizations[selectedTemplateId] ||
    StorageService.buildDefaultCustomization(selectedTemplateId);

  const handleSelectTemplate = (id: TemplateId, autoPlayMusic = false) => {
    setSelectedTemplateId(id);
    if (autoPlayMusic) {
      InvitationController.playTemplateAudio(id);
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
      InvitationController.playTemplateAudio(selectedTemplateId);
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
    setWishes((prev) => InvitationController.createNewWish(prev, payload));
  };

  // Bridge active template to FloatingCeremonyAudioPlayer
  const currentAudioSuiteBridge = {
    ...ADAT_SUITES[0],
    regionLabel: activeTemplate.name.toUpperCase(),
    musicTrack: {
      ...activeTemplate.musicConfig,
    },
  };

  const guestAudioSuiteBridge = {
    ...ADAT_SUITES[0],
    regionLabel: 'MUSIK PERNIKAHAN',
    musicTrack: {
      ...activeTemplate.musicConfig,
    },
  };

  // Handler to open guest experience cleanly in a new tab (or fallback to current tab if popup blocked)
  const handleOpenGuestFullscreen = (guestName?: string) => {
    const targetGuest = guestName || activeCustomization.guestRecipientName || 'Tamu Undangan';
    const guestUrl = `/?template=${selectedTemplateId}&to=${encodeURIComponent(targetGuest)}&demo=true`;
    const win = window.open(guestUrl, '_blank');
    if (!win) {
      setCoverResetCount((c) => c + 1);
      setActiveTab('fullscreen-guest');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If in Pure Fullscreen Guest View, render an uncluttered full immersion experience
  // No studio navigation, headers, or dashboards are accessible to guests
  if (activeTab === 'fullscreen-guest') {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative">
        <FloatingPetalsOverlay active={showPetals} />

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
      {/* Ambient Floating Jasmine & Gold Petals */}
      <FloatingPetalsOverlay active={showPetals} />

      {/* =====================================================================
          MAIN HEADER (PREMIUM SAAS NAV)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-5 sm:px-12 py-3.5 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
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
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif-ceremonial text-xl font-bold border border-amber-500/30 shadow-xs group-hover:bg-amber-600 transition-colors">
              D
            </div>
            <div>
              <span className="font-serif-ceremonial text-2xl font-bold tracking-tight text-slate-900">
                DIGIAT
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.14em] text-amber-700 font-semibold ml-2.5 pl-2.5 border-l border-slate-200">
                STUDIO UNDANGAN ADAT &amp; MODERN
              </span>
            </div>
          </a>

          {/* SaaS Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            {[
              { id: 'showcase' as AppTab, label: 'Katalog Template', icon: LayoutGrid },
              { id: 'demo' as AppTab, label: 'Live Demo Tamu', icon: Smartphone, highlight: true },
              { id: 'studio' as AppTab, label: 'Studio Kustomisasi', icon: SlidersHorizontal },
              { id: 'pitch' as AppTab, label: 'Proposal & Paket Klien', icon: Award },
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap relative ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Ambient Toggle & Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowPetals((p) => !p)}
              className="hidden lg:flex px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-600 hover:text-slate-900 items-center gap-1 cursor-pointer"
              title="Aktifkan/Matikan partikel kelopak bunga"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium">{showPetals ? 'Efek On' : 'Efek Off'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
                isPlayingAudio
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
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
                  <Play className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Putar Musik Adat</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('demo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-medium tracking-[0.02em] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs hover:shadow-sm"
            >
              Coba Live Demo
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between gap-1 pt-2.5 mt-2 border-t border-slate-200 overflow-x-auto">
          {[
            { id: 'showcase' as AppTab, label: 'Katalog' },
            { id: 'demo' as AppTab, label: 'Demo iPhone' },
            { id: 'studio' as AppTab, label: 'Editor' },
            { id: 'pitch' as AppTab, label: 'Paket & Link' },
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
      </header>

      {/* =====================================================================
          MAIN ROUTED CONTENT
         ===================================================================== */}
      <main className="flex-1">
        {/* TAB 1: SHOWCASE & SAAS OVERVIEW */}
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

        {/* TAB 2: LIVE DEMO (SMARTPHONE MOCKUP FRAME) */}
        {activeTab === 'demo' && (
          <section className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
            <DeviceMockupFrame
              template={activeTemplate}
              allTemplates={TEMPLATE_REGISTRY}
              onSelectTemplate={(id) => handleSelectTemplate(id, false)}
              isPlayingAudio={isPlayingAudio}
              onToggleAudio={handleToggleAudio}
              onResetCover={() => setCoverResetCount((c) => c + 1)}
              onOpenFullscreen={() => handleOpenGuestFullscreen()}
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

        {/* TAB 3: CUSTOMIZATION STUDIO (PALETTES & CONTENT) */}
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
            onOpenFullGuestView={() => handleOpenGuestFullscreen()}
          />
        )}

        {/* TAB 4: PUBLISHING, LINK GENERATOR & PROPOSAL PRICING */}
        {activeTab === 'pitch' && (
          <PublishingDashboardView
            template={activeTemplate}
            customization={activeCustomization}
            onUpdateCustomization={handleUpdateCustomization}
            wishes={wishes}
            onLaunchGuestExperience={(guestName) => handleOpenGuestFullscreen(guestName)}
            onOpenMobileSimulator={() => {
              setCoverResetCount((c) => c + 1);
              setActiveTab('demo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* =====================================================================
          FOOTER (DIGIAT STUDIO)
         ===================================================================== */}
      <footer className="border-t border-slate-200 bg-white px-5 sm:px-12 py-10 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-ceremonial text-2xl font-bold text-slate-900">
                DIGIAT
              </span>
              <span className="text-xs text-amber-600 font-mono font-semibold">STUDIO v2.0</span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 max-w-xl leading-relaxed">
              Platform &amp; Studio Desain Undangan Digital Pernikahan Premium Indonesia.
              Arsitektur Adat Klasik &amp; Editorial Kontemporer tanpa ketergantungan database, siap di-hosting ke Vercel CDN.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => {
                setActiveTab('showcase');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 cursor-pointer"
            >
              Katalog 6 Template
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('demo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 cursor-pointer"
            >
              Live Demo iPhone
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 cursor-pointer"
            >
              Studio Kustomisasi
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('pitch');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 cursor-pointer"
            >
              Paket Harga &amp; Link Klien
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Ceremony Audio Player */}
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
    </div>
  );
}
