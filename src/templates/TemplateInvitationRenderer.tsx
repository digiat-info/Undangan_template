import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Copy,
  Check,
  Gift,
  Send,
  MailOpen,
  Volume2,
  ExternalLink,
  CheckCircle2,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClientCustomization,
  TemplateSchema,
} from '../models/invitation.model';
import { GuestWish } from '../data/adatSuites';
import {
  TemplateCulturalCrest,
  TemplateSectionDivider,
} from './CulturalOrnaments';
import { AnimatedCulturalBg } from '../components/AnimatedCulturalBg';
import { InvitationController } from '../controllers/invitation.controller';

interface TemplateInvitationRendererProps {
  template: TemplateSchema;
  custom: ClientCustomization;
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
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  startWithCoverOpen?: boolean;
}

export const TemplateInvitationRenderer: React.FC<TemplateInvitationRendererProps> = ({
  template,
  custom,
  wishes,
  onAddWish,
  isPlayingAudio,
  onToggleAudio,
  viewportMode = 'desktop',
  startWithCoverOpen = true,
}) => {
  const { palette } = custom;
  const archetype = template.layoutArchetype;

  // Opening cover state (so client or guest can experience the full Opening Cover -> Content -> Closing flow)
  const [isCoverSealed, setIsCoverSealed] = useState<boolean>(!startWithCoverOpen);
  const [copiedBankIdx, setCopiedBankIdx] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);

  useEffect(() => {
    setIsCoverSealed(!startWithCoverOpen);
  }, [startWithCoverOpen, template.id]);

  // RSVP & Guestbook form state
  const [rsvpName, setRsvpName] = useState<string>('');
  const [rsvpRelation, setRsvpRelation] = useState<string>('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'Hadir' | 'Berhalangan'>('Hadir');
  const [rsvpGuests, setRsvpGuests] = useState<number>(2);
  const [rsvpMessage, setRsvpMessage] = useState<string>('');
  const [justSubmittedWish, setJustSubmittedWish] = useState<boolean>(false);

  // Countdown timer
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20,
  });

  useEffect(() => {
    const compute = () => {
      const target = new Date(custom.weddingDateISO).getTime();
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    compute();
    const id = window.setInterval(compute, 1000);
    return () => window.clearInterval(id);
  }, [custom.weddingDateISO]);

  const handleOpenCover = () => {
    setIsCoverSealed(false);
    if (!isPlayingAudio) {
      onToggleAudio();
    } else {
      InvitationController.ringTemplateGong(template.id);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankIdx(key);
    window.setTimeout(() => setCopiedBankIdx(null), 2200);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    onAddWish({
      name: rsvpName,
      relation: rsvpRelation || 'Kerabat & Sahabat',
      attendance: rsvpAttendance,
      guestsCount: rsvpGuests,
      message: rsvpMessage,
      adatTag: template.name.toUpperCase(),
    });

    InvitationController.ringTemplateGong(template.id);
    setRsvpName('');
    setRsvpRelation('');
    setRsvpMessage('');
    setJustSubmittedWish(true);
    window.setTimeout(() => setJustSubmittedWish(false), 3800);
  };

  // Dynamic frame shape based on cultural archetype
  const getPortraitFrameClass = () => {
    switch (archetype) {
      case 'kraton-pendopo':
      case 'medina-arch':
        return 'rounded-t-full rounded-b-[6px]';
      case 'priangan-botanical':
        return 'rounded-full';
      case 'gonjong-geometric':
        return 'rounded-none border-2';
      case 'bali-paduraksa':
        return 'rounded-t-[40px] rounded-b-[4px]';
      case 'kinfolk-editorial':
      default:
        return 'rounded-[2px]';
    }
  };

  const getCeremonialKicker = () => {
    switch (template.id) {
      case 'javanese-royal':
        return "PAWIWAHAN SUCI · WALIMATUL 'URS";
      case 'sundanese-romance':
        return "WALIMATUL 'URS · NIKAH SUCI";
      case 'minang-heritage':
        return "BARALEK GADANG · WALIMATUL 'URS";
      case 'balinese-sacred':
        return "PAWIWAHAN AGUNG · SACRED UNION";
      case 'islamic-elegance':
        return "WALIMATUL 'URS · PERNIKAHAN ISLAMI";
      case 'modern-nusantara':
      default:
        return "THE WEDDING CELEBRATION";
    }
  };

  const isCompact = viewportMode === 'mobile';

  return (
    <div
      style={{
        backgroundColor: palette.canvas,
        color: palette.primaryText,
        fontFamily: template.typography.bodyFont,
      }}
      className={`relative w-full transition-colors duration-500 overflow-hidden ${
        isCoverSealed ? 'h-full min-h-[580px] sm:min-h-[720px] flex flex-col justify-between' : 'rounded-[8px] border'
      }`}
    >
      {/* =====================================================================
          01. OPENING CEREMONIAL COVER OVERLAY (SAMPUL PEMBUKA)
          HANYA DITAMPILKAN KETIKA UNDANGAN BELUM DIBUKA
         ===================================================================== */}
      {isCoverSealed ? (
        <div
          style={{
            backgroundColor: palette.ceremonialDark,
            color: '#FFFFFF',
          }}
          className="w-full h-full min-h-[580px] sm:min-h-[720px] py-6 sm:py-10 px-4 sm:px-10 flex flex-col items-center justify-between text-center relative overflow-hidden select-none"
        >
          {/* Background Hero Photo with Dark Ceremonial Scrim */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <img
              src={custom.heroPhoto}
              alt={template.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${palette.ceremonialDark}E6, ${palette.ceremonialDark}CC, ${palette.ceremonialDark})`,
              }}
            />
          </div>

          {/* Authentic Javanese Royal Damask & Carved Border Wallpaper */}
          {template.id === 'javanese-royal' && (
            <div
              className="absolute inset-0 pointer-events-none opacity-15 bg-cover bg-bottom mix-blend-luminosity z-0"
              style={{ backgroundImage: 'url(/assets/motif_jawa/6541342_1560.jpg)' }}
            />
          )}

          {/* Dynamic Animated Cultural Motif Background (Batik, Gonjong, Siger, etc.) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <AnimatedCulturalBg
              templateId={template.id}
              accentColor={palette.accent}
              variant="hero"
            />
          </div>

          {/* Top Ceremonial Label */}
          <div className="relative z-10 pt-1">
            <span
              style={{ color: palette.accent }}
              className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase px-3.5 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-xs"
            >
              {getCeremonialKicker()}
            </span>
          </div>

          {/* Center Ornament + Couple Names */}
          <div className="relative z-10 max-w-lg mx-auto my-auto py-2">
            <div className="flex justify-center mb-3 items-center gap-2">
              {template.id === 'javanese-royal' && (
                <img
                  src="/assets/motif_jawa/motif_jawa.png"
                  alt="Motif Jawa Kiri"
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow opacity-90 scale-x-[-1] animate-gunungan"
                />
              )}
              <div className="animate-gunungan">
                <TemplateCulturalCrest
                  templateId={template.id}
                  color={palette.accent}
                  size={isCompact ? 60 : 84}
                />
              </div>
              {template.id === 'javanese-royal' && (
                <img
                  src="/assets/motif_jawa/motif_jawa.png"
                  alt="Motif Jawa Kanan"
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow opacity-90 animate-gunungan-reverse"
                />
              )}
            </div>

            <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase opacity-80 font-medium">
              UNDANGAN PERNIKAHAN
            </p>
            <h1
              style={{
                fontFamily: template.typography.displayFont,
                letterSpacing: template.typography.headingTracking,
              }}
              className="text-3xl sm:text-5xl font-normal mt-1.5 text-white text-balance leading-tight"
            >
              {custom.groomShort}{' '}
              <span style={{ color: palette.accent }} className="italic font-serif">
                &amp;
              </span>{' '}
              {custom.brideShort}
            </h1>
            <p className="text-[11px] sm:text-xs opacity-85 mt-1.5">
              {custom.weddingDateDisplay} · {custom.city}
            </p>

            {/* Personalized Guest Box */}
            <div
              style={{
                borderColor: `${palette.accent}66`,
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
              className="mt-4 sm:mt-5 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl border backdrop-blur-md shadow-lg"
            >
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase opacity-75">
                KEPADA YTH. BAPAK / IBU / SAUDARA / I
              </p>
              <p
                style={{ fontFamily: template.typography.displayFont }}
                className="text-lg sm:text-2xl text-white mt-1 font-medium"
              >
                {custom.guestRecipientName}
              </p>
              <p className="text-[10px] sm:text-[11px] opacity-75 mt-0.5">{custom.guestRecipientLocation}</p>
            </div>
          </div>

          {/* Unseal Cover CTA */}
          <div className="relative z-10 flex flex-col items-center pb-2">
            <button
              type="button"
              onClick={handleOpenCover}
              style={{ backgroundColor: palette.accent }}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-white text-xs sm:text-sm font-semibold tracking-[0.06em] uppercase flex items-center gap-2.5 shadow-xl hover:opacity-95 transition-all cursor-pointer animate-seal"
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Undangan &amp; Putar Musik</span>
            </button>
            <span className="text-[10px] opacity-70 mt-2 font-medium">
              ♪ {template.musicConfig.title} ({template.musicConfig.ensemble})
            </span>
          </div>
        </div>
      ) : (
        /* =====================================================================
            02. MAIN ART-DIRECTED INVITATION BODY
            HANYA DITAMPILKAN SETELAH PENGUNJUNG MENGKLIK "BUKA UNDANGAN"
           ===================================================================== */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderColor: palette.border }}
          className="m-2 sm:m-4 border rounded-[6px] overflow-hidden relative"
        >
          {/* Authentic Javanese Royal Mandala Pillar Side Borders */}
          {template.id === 'javanese-royal' && (
            <>
              <div
                className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none opacity-[0.06] bg-repeat-y bg-contain z-0"
                style={{ backgroundImage: 'url(/assets/motif_jawa/spanduk-mandala-abstrak.png)' }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none opacity-[0.06] bg-repeat-y bg-contain scale-x-[-1] z-0"
                style={{ backgroundImage: 'url(/assets/motif_jawa/spanduk-mandala-abstrak.png)' }}
              />
            </>
          )}
          {/* Top Utility Strip inside Invitation (Re-open Cover & Music Control) */}
          <div
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
            }}
            className="px-4 py-2.5 border-b flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                style={{ color: palette.accent }}
                className="font-semibold tracking-[0.14em] uppercase text-[10px] truncate"
              >
                ◆ THE WEDDING OF {custom.groomShort.toUpperCase()} &amp; {custom.brideShort.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsCoverSealed(true)}
                style={{
                  borderColor: palette.border,
                  color: palette.primaryText,
                }}
                className="px-2.5 py-1 rounded-[3px] border text-[11px] hover:opacity-80 cursor-pointer whitespace-nowrap"
              >
                Tutup / Sampul
              </button>
              <button
                type="button"
                onClick={onToggleAudio}
                style={{
                  backgroundColor: isPlayingAudio ? palette.accent : 'transparent',
                  borderColor: palette.accent,
                  color: isPlayingAudio ? '#FFFFFF' : palette.primaryText,
                }}
                className="px-2.5 py-1 rounded-[3px] border text-[11px] flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Volume2 className="w-3 h-3" />
                <span>{isPlayingAudio ? 'Musik On' : 'Putar Musik'}</span>
              </button>
            </div>
          </div>

        {/* ===================================================================
            HERO SECTION — ADAPTED TO TEMPLATE ARCHETYPE
           =================================================================== */}
        {archetype === 'kinfolk-editorial' ? (
          /* MODERN NUSANTARA: Asymmetric Magazine Split Hero */
          <div className={`grid grid-cols-1 ${isCompact ? '' : 'lg:grid-cols-12'} items-stretch`}>
            <div
              className={`${
                isCompact ? '' : 'lg:col-span-7'
              } relative min-h-[420px] sm:min-h-[540px] bg-black overflow-hidden`}
            >
              <img
                src={custom.heroPhoto}
                alt={`${custom.groomShort} & ${custom.brideShort}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[10px] font-mono tracking-[0.25em] uppercase opacity-80">
                  THE WEDDING CELEBRATION OF
                </p>
                <h1
                  style={{ fontFamily: template.typography.displayFont }}
                  className="text-4xl sm:text-6xl mt-1 leading-none"
                >
                  {custom.groomShort} &amp; {custom.brideShort}
                </h1>
              </div>
            </div>

            <div
              style={{ backgroundColor: palette.surface }}
              className={`${
                isCompact ? '' : 'lg:col-span-5'
              } p-7 sm:p-10 flex flex-col justify-between`}
            >
              <div>
                <p
                  style={{ color: palette.accent }}
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                >
                  THE WEDDING INVITATION
                </p>
                <TemplateCulturalCrest
                  templateId={template.id}
                  color={palette.accent}
                  size={70}
                  className="my-5"
                />
                <p
                  style={{
                    fontFamily: template.typography.displayFont,
                    color: palette.primaryText,
                  }}
                  className="text-xl sm:text-2xl italic leading-relaxed"
                >
                  {template.openingScriptureOrPepatah.quote}
                </p>
                <p style={{ color: palette.mutedText }} className="text-xs mt-3 leading-relaxed">
                  {template.openingScriptureOrPepatah.translation}
                </p>
              </div>

              <div
                style={{ borderColor: palette.border }}
                className="pt-6 mt-8 border-t flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold uppercase tracking-wider">{custom.weddingDateDisplay}</p>
                  <p style={{ color: palette.mutedText }}>{custom.city}</p>
                </div>
                <span style={{ color: palette.accent }} className="font-mono text-[10px] uppercase tracking-widest font-semibold">
                  OFFICIAL INVITATION
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* CEREMONIAL HERITAGE HERO (Javanese, Sundanese, Minang, Balinese, Islamic) */
          <div className="relative px-5 py-12 sm:px-12 sm:py-16 text-center overflow-hidden">
            {/* Authentic Javanese Royal Wall/Tapestry Backdrop Texture */}
            {template.id === 'javanese-royal' && (
              <div
                className="absolute inset-0 pointer-events-none opacity-10 bg-cover bg-bottom mix-blend-luminosity z-0"
                style={{ backgroundImage: 'url(/assets/motif_jawa/6541342_1560.jpg)' }}
              />
            )}

            {/* Left & Right Swaying Authentic Cultural Ornaments */}
            <div className="pointer-events-none absolute -left-8 sm:left-6 bottom-8 opacity-25 sm:opacity-35 animate-gunungan">
              <TemplateCulturalCrest
                templateId={template.id}
                color={palette.accent}
                size={isCompact ? 90 : 135}
              />
            </div>
            <div className="pointer-events-none absolute -right-8 sm:right-6 bottom-8 opacity-25 sm:opacity-35 animate-gunungan-reverse">
              <TemplateCulturalCrest
                templateId={template.id}
                color={palette.accent}
                size={isCompact ? 90 : 135}
              />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <p
                style={{ color: palette.accent }}
                className="text-[11px] font-semibold tracking-[0.18em] uppercase"
              >
                {getCeremonialKicker()}
              </p>
              <p
                style={{
                  color: palette.mutedText,
                  fontFamily: template.typography.displayFont,
                }}
                className="text-sm sm:text-base italic mt-1.5"
              >
                {template.greetingHeader}
              </p>

              {/* Center Interactive Cultural Crest */}
              <div className="flex justify-center my-5">
                <button
                  type="button"
                  onClick={() => InvitationController.ringTemplateGong(template.id)}
                  className="group cursor-pointer focus:outline-none"
                  title="Sentuh ornamen untuk membunyikan instrumen seremonial"
                >
                  <TemplateCulturalCrest
                    templateId={template.id}
                    color={palette.accent}
                    size={86}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </div>

              {/* Framed Hero Photograph with Authentic Javanese Motif Accent */}
              <div className="max-w-md mx-auto relative group">
                {template.id === 'javanese-royal' && (
                  <img
                    src="/assets/motif_jawa/motif_jawa.png"
                    alt="Motif Batik Jawa"
                    className="absolute -top-3.5 -right-3.5 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none select-none drop-shadow-xl z-20 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div
                  style={{
                    backgroundColor: palette.surface,
                    borderColor: palette.accent,
                  }}
                  className={`p-2.5 border ${getPortraitFrameClass()} shadow-md relative z-10`}
                >
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden ${getPortraitFrameClass()}`}
                  >
                    <img
                      src={custom.heroPhoto}
                      alt={`${custom.groomShort} & ${custom.brideShort}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${palette.ceremonialDark}E6, ${palette.ceremonialDark}33, transparent)`,
                      }}
                    />
                    <div className="absolute bottom-6 inset-x-4 text-center text-white">
                      <p
                        style={{ color: palette.accent }}
                        className="text-[10px] font-semibold tracking-[0.16em] uppercase"
                      >
                        PAWIWAHAN &amp; JANJI SUCI
                      </p>
                      <h1
                        style={{
                          fontFamily: template.typography.displayFont,
                          letterSpacing: template.typography.headingTracking,
                        }}
                        className="text-3xl sm:text-5xl mt-1 text-balance"
                      >
                        {custom.groomShort}{' '}
                        <span style={{ color: palette.accent }} className="italic font-normal">
                          &amp;
                        </span>{' '}
                        {custom.brideShort}
                      </h1>
                      <p className="text-xs opacity-90 mt-2">
                        {custom.weddingDateDisplay} · {custom.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Philosophical Scripture / Pepatah Adat */}
              <blockquote className="mt-8 max-w-xl mx-auto px-3">
                <p
                  style={{
                    fontFamily: template.typography.displayFont,
                    color: palette.primaryText,
                  }}
                  className="text-lg sm:text-2xl italic leading-relaxed"
                >
                  {template.openingScriptureOrPepatah.quote}
                </p>
                <p
                  style={{ color: palette.mutedText }}
                  className="text-xs sm:text-sm mt-2 leading-relaxed"
                >
                  {template.openingScriptureOrPepatah.translation}
                </p>
                <cite
                  style={{ color: palette.accent }}
                  className="block text-[11px] font-semibold tracking-[0.1em] uppercase not-italic mt-2"
                >
                  — {template.openingScriptureOrPepatah.source}
                </cite>
              </blockquote>

              {/* Live Countdown Timer */}
              <div className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: 'HARI', val: countdown.days },
                  { label: 'JAM', val: countdown.hours },
                  { label: 'MENIT', val: countdown.minutes },
                  { label: 'DETIK', val: countdown.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    style={{
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                    }}
                    className="border rounded-[4px] py-3 px-2 text-center"
                  >
                    <div
                      style={{
                        fontFamily: template.typography.displayFont,
                        color: palette.primaryText,
                      }}
                      className="tabular-nums text-2xl sm:text-3xl font-semibold"
                    >
                      {String(unit.val).padStart(2, '0')}
                    </div>
                    <div
                      style={{ color: palette.mutedText }}
                      className="text-[10px] font-semibold tracking-[0.12em] uppercase mt-0.5"
                    >
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <TemplateSectionDivider
          templateId={template.id}
          color={palette.accent}
          borderColor={palette.border}
        />

        {/* ===================================================================
            03. COUPLE LINEAGE SECTION (PROFIL MEMPELAI & ORANG TUA)
           =================================================================== */}
        <div
          style={{ backgroundColor: palette.surface }}
          className="px-5 py-10 sm:px-12 sm:py-14 relative overflow-hidden"
        >
          {/* Subtle animated cultural motif watermark strictly isolated in background z-0 */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <AnimatedCulturalBg
              templateId={template.id}
              accentColor={palette.accent}
              variant="section"
            />
          </div>

          <div className="relative z-10 text-center max-w-xl mx-auto mb-10">
            <p
              style={{ color: palette.accent }}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            >
              MEMPELAI BERBAHAGIA
            </p>
            <h2
              style={{ fontFamily: template.typography.displayFont }}
              className="text-3xl sm:text-4xl mt-1"
            >
              Putra &amp; Putri Terbaik Kami
            </h2>
            <p style={{ color: palette.mutedText }} className="text-xs sm:text-sm mt-2">
              Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, perkenankanlah kami menyatukan
              ikatan suci kedua putra-putri kami:
            </p>
          </div>

          <div
            className={`grid gap-8 max-w-4xl mx-auto relative z-10 ${
              isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {/* Groom Card */}
            <div
              style={{
                backgroundColor: palette.canvas,
                borderColor: palette.border,
              }}
              className="border rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center relative z-10 shadow-lg group"
            >
              {/* Authentic Javanese Batik Corner Motif on Top-Right */}
              {template.id === 'javanese-royal' && (
                <img
                  src="/assets/motif_jawa/motif_jawa.png"
                  alt="Motif Jawa"
                  className="absolute -top-3.5 -right-3.5 w-16 h-16 pointer-events-none select-none drop-shadow-md z-20 transition-transform duration-500 group-hover:scale-110"
                />
              )}

              <div
                style={{ borderColor: palette.accent }}
                className={`w-36 h-44 sm:w-40 sm:h-52 overflow-hidden border-2 p-1 mb-4 relative z-10 bg-neutral-900/40 shadow-md ${getPortraitFrameClass()}`}
              >
                <img
                  src={custom.groomPhoto}
                  alt={custom.groomFull}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover relative z-10 ${getPortraitFrameClass()}`}
                />
              </div>

              <span
                style={{ color: palette.accent }}
                className="text-[10px] font-semibold tracking-[0.14em] uppercase relative z-10"
              >
                MEMPELAI PRIA
              </span>
              <h3
                style={{ fontFamily: template.typography.displayFont }}
                className="text-2xl sm:text-3xl font-medium mt-1 text-balance relative z-10"
              >
                {custom.groomFull}
              </h3>
              <p
                style={{ color: palette.mutedText }}
                className="text-xs sm:text-sm mt-2 leading-relaxed max-w-xs relative z-10"
              >
                {custom.groomParents}
              </p>
            </div>

            {/* Bride Card */}
            <div
              style={{
                backgroundColor: palette.canvas,
                borderColor: palette.border,
              }}
              className="border rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center relative z-10 shadow-lg group"
            >
              {/* Authentic Javanese Batik Corner Motif on Top-Left (Mirrored) */}
              {template.id === 'javanese-royal' && (
                <img
                  src="/assets/motif_jawa/motif_jawa.png"
                  alt="Motif Jawa"
                  className="absolute -top-3.5 -left-3.5 w-16 h-16 pointer-events-none select-none drop-shadow-md z-20 scale-x-[-1] transition-transform duration-500 group-hover:scale-110"
                />
              )}

              <div
                style={{ borderColor: palette.accent }}
                className={`w-36 h-44 sm:w-40 sm:h-52 overflow-hidden border-2 p-1 mb-4 relative z-10 bg-neutral-900/40 shadow-md ${getPortraitFrameClass()}`}
              >
                <img
                  src={custom.bridePhoto}
                  alt={custom.brideFull}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover relative z-10 ${getPortraitFrameClass()}`}
                />
              </div>

              <span
                style={{ color: palette.accent }}
                className="text-[10px] font-semibold tracking-[0.14em] uppercase relative z-10"
              >
                MEMPELAI WANITA
              </span>
              <h3
                style={{ fontFamily: template.typography.displayFont }}
                className="text-2xl sm:text-3xl font-medium mt-1 text-balance relative z-10"
              >
                {custom.brideFull}
              </h3>
              <p
                style={{ color: palette.mutedText }}
                className="text-xs sm:text-sm mt-2 leading-relaxed max-w-xs relative z-10"
              >
                {custom.brideParents}
              </p>
            </div>
          </div>
        </div>

        <TemplateSectionDivider
          templateId={template.id}
          color={palette.accent}
          borderColor={palette.border}
        />

        {/* ===================================================================
            04. CEREMONIAL EVENTS & PHILOSOPHY (RANGKAIAN ACARA & MAPS)
           =================================================================== */}
        <div className="px-5 py-10 sm:px-12 sm:py-14">
          <div className="text-center max-w-xl mx-auto mb-9">
            <p
              style={{ color: palette.accent }}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            >
              RANGKAIAN PROSESI &amp; LOKASI
            </p>
            <h2
              style={{ fontFamily: template.typography.displayFont }}
              className="text-3xl sm:text-4xl mt-1"
            >
              Waktu &amp; Tempat Pelaksanaan
            </h2>
          </div>

          <div
            className={`grid gap-6 ${
              isCompact
                ? 'grid-cols-1'
                : custom.events.length === 3
                ? 'grid-cols-1 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {custom.events.map((ev) => (
              <div
                key={ev.id}
                style={{
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                }}
                className="border rounded-[6px] p-6 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <span
                    style={{ color: palette.accent }}
                    className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                  >
                    {ev.stageCode}
                  </span>
                  <h3
                    style={{ fontFamily: template.typography.displayFont }}
                    className="text-2xl mt-1 font-medium"
                  >
                    {ev.title}
                  </h3>

                  <div
                    style={{ borderColor: palette.border }}
                    className="mt-4 pt-4 border-t space-y-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                      <span className="tabular-nums">{ev.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: palette.accent }}
                      />
                      <div>
                        <p className="font-semibold">{ev.venue}</p>
                        <p style={{ color: palette.mutedText }} className="mt-0.5">
                          {ev.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: palette.canvas,
                      borderColor: palette.border,
                    }}
                    className="mt-4 p-3.5 rounded-[4px] border text-xs leading-relaxed"
                  >
                    <span
                      style={{ color: palette.accent }}
                      className="block text-[10px] font-semibold tracking-[0.1em] uppercase mb-1"
                    >
                      Makna Prosesi
                    </span>
                    <span style={{ color: palette.mutedText }}>{ev.philosophy}</span>
                  </div>
                </div>

                <div
                  style={{ borderColor: palette.border }}
                  className="mt-5 pt-3.5 border-t flex items-center justify-between"
                >
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${ev.venue} ${ev.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: palette.accent }}
                    className="text-xs font-medium inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>Petunjuk Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TemplateSectionDivider
          templateId={template.id}
          color={palette.accent}
          borderColor={palette.border}
        />

        {/* ===================================================================
            05. LOVE STORY & EDITORIAL PHOTO GALLERY
           =================================================================== */}
        <div
          style={{ backgroundColor: palette.surface }}
          className="px-5 py-10 sm:px-12 sm:py-14"
        >
          <div
            className={`grid gap-10 ${
              isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            {/* Love Story Column */}
            <div className={isCompact ? '' : 'lg:col-span-5'}>
              <p
                style={{ color: palette.accent }}
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              >
                KISAH PERJALANAN
              </p>
              <h2
                style={{ fontFamily: template.typography.displayFont }}
                className="text-3xl mt-1"
              >
                Lembaran Cerita Kami
              </h2>

              <div className="mt-6 space-y-4">
                {custom.loveStory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: palette.canvas,
                      borderColor: palette.border,
                    }}
                    className="p-4 rounded-[4px] border"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        style={{ color: palette.accent }}
                        className="font-mono font-semibold"
                      >
                        {item.year}
                      </span>
                      <span>·</span>
                      <span className="text-[10px] font-semibold tracking-[0.12em] uppercase">
                        {item.phase}
                      </span>
                    </div>
                    <h3
                      style={{ fontFamily: template.typography.displayFont }}
                      className="text-xl mt-1 font-medium"
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{ color: palette.mutedText }}
                      className="text-xs sm:text-sm mt-1 leading-relaxed"
                    >
                      {item.story}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Gallery Column */}
            <div className={isCompact ? '' : 'lg:col-span-7'}>
              <p
                style={{ color: palette.accent }}
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              >
                GALERI POTRET
              </p>
              <h2
                style={{ fontFamily: template.typography.displayFont }}
                className="text-3xl mt-1"
              >
                Momen Kebersamaan
              </h2>

              <div
                className={`mt-6 grid gap-4 ${
                  isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {custom.gallery.map((photo, index) => {
                  const isFeatured = custom.gallery.length % 2 !== 0 && index === 0 && !isCompact;
                  return (
                    <figure
                      key={index}
                      style={{
                        backgroundColor: palette.canvas,
                        borderColor: palette.border,
                      }}
                      className={`p-2.5 border rounded-xl shadow-xs transition-transform duration-500 hover:-translate-y-0.5 ${
                        isFeatured ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className={`overflow-hidden rounded-lg ${isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <figcaption
                        style={{ color: palette.mutedText }}
                        className="text-xs mt-2 px-1 flex items-center justify-between"
                      >
                        <span className="font-medium">{photo.caption}</span>
                        <span style={{ color: palette.accent }}>◆</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            06. DIGITAL ENVELOPE / ANGPAO & GIFT REGISTRY SECTION
           =================================================================== */}
        <div className="px-5 py-10 sm:px-12 sm:py-14">
          <div className="max-w-3xl mx-auto text-center">
            <p
              style={{ color: palette.accent }}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            >
              TANDA KASIH &amp; AMPLOP DIGITAL
            </p>
            <h2
              style={{ fontFamily: template.typography.displayFont }}
              className="text-3xl sm:text-4xl mt-1"
            >
              Kirimkan Tanda Kasih
            </h2>
            <p
              style={{ color: palette.mutedText }}
              className="text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed"
            >
              Doa restu Anda adalah karunia terindah bagi kami. Namun apabila Bapak/Ibu/Saudara/i
              hendak memberikan tanda kasih secara digital, dapat melalui rekening resmi berikut:
            </p>

            <div
              className={`mt-7 grid gap-4 text-left ${
                isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {custom.banks.map((b, idx) => {
                const key = `tpl-bank-${idx}`;
                const copied = copiedBankIdx === key;
                return (
                  <div
                    key={key}
                    style={{
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                    }}
                    className="border rounded-[6px] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        style={{ color: palette.accent }}
                        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                      >
                        {b.bankName}
                      </span>
                      <p className="font-mono tabular-nums text-lg font-semibold mt-2 tracking-wider">
                        {b.accountNumber}
                      </p>
                      <p style={{ color: palette.mutedText }} className="text-xs mt-0.5">
                        {b.accountHolder}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText(b.accountNumber.replace(/\s+/g, ''), key)}
                      style={{
                        borderColor: palette.accent,
                        color: palette.primaryText,
                      }}
                      className="mt-4 py-2 px-3 rounded-[4px] border text-xs font-medium flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                          <span>Nomor Rekening Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}

              {/* Physical Gift & QRIS Card */}
              <div
                style={{
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                }}
                className="border rounded-[6px] p-5 flex flex-col justify-between"
              >
                <div>
                  <span
                    style={{ color: palette.accent }}
                    className="text-[11px] font-semibold tracking-[0.12em] uppercase flex items-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Kado Fisik &amp; QRIS</span>
                  </span>
                  <p className="text-xs mt-2 leading-relaxed">
                    {custom.giftAddress}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(custom.giftAddress, 'gift-addr')
                    }
                    style={{
                      borderColor: palette.border,
                      color: palette.primaryText,
                    }}
                    className="flex-1 py-2 px-3 rounded-[4px] border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedBankIdx === 'gift-addr' ? (
                      <>
                        <Check className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                        <span>Alamat Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQrisModal((prev) => !prev)}
                    style={{ backgroundColor: palette.accent }}
                    className="py-2 px-3 rounded-[4px] text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QRIS</span>
                  </button>
                </div>
              </div>
            </div>

            {showQrisModal && (
              <div
                style={{
                  backgroundColor: palette.surface,
                  borderColor: palette.accent,
                }}
                className="mt-4 p-5 rounded-[6px] border max-w-xs mx-auto animate-wish-pop"
              >
                <p className="text-xs font-semibold uppercase tracking-wider">
                  QRIS {custom.groomShort} &amp; {custom.brideShort}
                </p>
                <div className="my-3 mx-auto w-36 h-36 bg-white p-2.5 border rounded-[4px]">
                  {custom.qrisImageUrl ? (
                    <img src={custom.qrisImageUrl} alt="QRIS" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                  ) : (
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#241811]">
                      <rect x="6" y="6" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="5" />
                      <rect x="13" y="13" width="12" height="12" fill="currentColor" />
                      <rect x="68" y="6" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="5" />
                      <rect x="75" y="13" width="12" height="12" fill="currentColor" />
                      <rect x="6" y="68" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="5" />
                      <rect x="13" y="75" width="12" height="12" fill="currentColor" />
                      <rect x="44" y="44" width="12" height="12" fill={palette.accent} />
                      <rect x="40" y="12" width="16" height="6" fill="currentColor" />
                      <rect x="14" y="44" width="20" height="6" fill="currentColor" />
                      <rect x="64" y="44" width="22" height="6" fill="currentColor" />
                      <rect x="42" y="72" width="24" height="8" fill="currentColor" />
                    </svg>
                  )}
                </div>
                <p style={{ color: palette.mutedText }} className="text-[11px]">
                  Pindai melalui aplikasi M-Banking atau dompet digital Anda
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            07. RSVP & POP-IN GUESTBOOK WISHES (CEREMONIAL DARK PANEL)
           =================================================================== */}
        <div
          style={{
            backgroundColor: palette.ceremonialDark,
            color: '#FFFFFF',
          }}
          className="px-5 py-12 sm:px-12 sm:py-16 relative overflow-hidden"
        >
          {/* Authentic Javanese Royal Backdrop */}
          {template.id === 'javanese-royal' && (
            <div
              className="absolute inset-0 pointer-events-none opacity-10 bg-cover bg-bottom mix-blend-luminosity z-0"
              style={{ backgroundImage: 'url(/assets/motif_jawa/6541342_1560.jpg)' }}
            />
          )}
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <p
                style={{ color: palette.accent }}
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              >
                KONFIRMASI KEHADIRAN &amp; UCAPAN DOA
              </p>
              <h2
                style={{ fontFamily: template.typography.displayFont }}
                className="text-3xl sm:text-4xl text-white mt-1"
              >
                Buku Tamu &amp; Doa Restu
              </h2>
            </div>

            <div
              className={`grid gap-8 ${
                isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
              }`}
            >
              {/* RSVP Form */}
              <form
                onSubmit={handleRsvpSubmit}
                style={{
                  backgroundColor: palette.canvas,
                  color: palette.primaryText,
                  borderColor: palette.accent,
                }}
                className={`${
                  isCompact ? '' : 'lg:col-span-5'
                } rounded-[6px] p-5 sm:p-6 border self-start`}
              >
                <h3
                  style={{ fontFamily: template.typography.displayFont }}
                  className="text-2xl font-medium"
                >
                  Kirim Ucapan &amp; RSVP
                </h3>
                <div className="mt-4 space-y-3.5">
                  <div>
                    <label
                      style={{ color: palette.mutedText }}
                      className="block text-xs font-medium mb-1"
                    >
                      Nama Lengkap Tamu
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Contoh: Ibu R.Ay. Kartika"
                      style={{
                        backgroundColor: palette.surface,
                        borderColor: palette.border,
                        color: palette.primaryText,
                      }}
                      className="w-full border rounded-[4px] px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      style={{ color: palette.mutedText }}
                      className="block text-xs font-medium mb-1"
                    >
                      Hubungan / Kerabat
                    </label>
                    <input
                      type="text"
                      value={rsvpRelation}
                      onChange={(e) => setRsvpRelation(e.target.value)}
                      placeholder="Contoh: Sahabat Mempelai / Kerabat"
                      style={{
                        backgroundColor: palette.surface,
                        borderColor: palette.border,
                        color: palette.primaryText,
                      }}
                      className="w-full border rounded-[4px] px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label
                        style={{ color: palette.mutedText }}
                        className="block text-xs font-medium mb-1"
                      >
                        Kehadiran
                      </label>
                      <select
                        value={rsvpAttendance}
                        onChange={(e) =>
                          setRsvpAttendance(e.target.value as 'Hadir' | 'Berhalangan')
                        }
                        style={{
                          backgroundColor: palette.surface,
                          borderColor: palette.border,
                          color: palette.primaryText,
                        }}
                        className="w-full border rounded-[4px] px-2.5 py-2 text-sm"
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Berhalangan">Berhalangan</option>
                      </select>
                    </div>
                    <div>
                      <label
                        style={{ color: palette.mutedText }}
                        className="block text-xs font-medium mb-1"
                      >
                        Jumlah Tamu
                      </label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(Number(e.target.value))}
                        disabled={rsvpAttendance === 'Berhalangan'}
                        style={{
                          backgroundColor: palette.surface,
                          borderColor: palette.border,
                          color: palette.primaryText,
                        }}
                        className="w-full border rounded-[4px] px-2.5 py-2 text-sm disabled:opacity-50"
                      >
                        <option value={1}>1 Orang</option>
                        <option value={2}>2 Orang</option>
                        <option value={3}>3 Orang</option>
                        <option value={4}>4 Orang</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ color: palette.mutedText }}
                      className="block text-xs font-medium mb-1"
                    >
                      Untaian Doa &amp; Ucapan
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Tuliskan doa restu untuk kedua mempelai..."
                      style={{
                        backgroundColor: palette.surface,
                        borderColor: palette.border,
                        color: palette.primaryText,
                      }}
                      className="w-full border rounded-[4px] px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: palette.accent }}
                    className="w-full py-3 px-4 rounded-[4px] text-white text-xs font-medium tracking-[0.05em] uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Doa Restu</span>
                  </button>

                  {justSubmittedWish && (
                    <div
                      style={{ borderColor: palette.accent }}
                      className="p-2.5 rounded-[4px] border text-xs flex items-center gap-2 animate-wish-pop"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                      <span>Ucapan Anda berhasil ditambahkan ke daftar doa!</span>
                    </div>
                  )}
                </div>
              </form>

              {/* Wish List Stream with Subtle Pop-In Animation */}
              <div className={`${isCompact ? '' : 'lg:col-span-7'} space-y-3 max-h-[420px] overflow-y-auto pr-1`}>
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    style={{
                      borderColor: wish.isNew ? palette.accent : `${palette.accent}4D`,
                      backgroundColor: wish.isNew
                        ? 'rgba(255, 255, 255, 0.14)'
                        : 'rgba(255, 255, 255, 0.06)',
                    }}
                    className={`rounded-[6px] p-4 border transition-all ${
                      wish.isNew ? 'animate-wish-pop shadow-md' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ fontFamily: template.typography.displayFont }}
                          className="text-lg text-white font-medium"
                        >
                          {wish.name}
                        </span>
                        {wish.isNew && (
                          <span
                            style={{
                              backgroundColor: palette.accent,
                              color: '#FFFFFF',
                            }}
                            className="px-2 py-0.5 rounded-[3px] text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            Baru
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] opacity-80">
                        <span style={{ color: palette.accent }}>{wish.attendance}</span>
                        {wish.attendance === 'Hadir' && (
                          <>
                            <span>·</span>
                            <span className="tabular-nums">{wish.guestsCount} Tamu</span>
                          </>
                        )}
                        <span>·</span>
                        <span>{wish.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-[11px] opacity-70 mt-0.5">{wish.relation}</p>
                    <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
                      “{wish.message}”
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            08. CLOSING CEREMONIAL SECTION (PENUTUP & KELUARGA BESAR)
           =================================================================== */}
        <div
          style={{ backgroundColor: palette.surface }}
          className="px-6 py-14 sm:px-12 sm:py-16 text-center relative overflow-hidden"
        >
          <AnimatedCulturalBg
            templateId={template.id}
            accentColor={palette.accent}
            variant="footer"
          />
          <div className="relative z-10 max-w-xl mx-auto">
            <div className="flex justify-center mb-5 items-center gap-3">
              {template.id === 'javanese-royal' && (
                <img
                  src="/assets/motif_jawa/motif_jawa.png"
                  alt="Motif Jawa"
                  className="w-9 h-9 object-contain drop-shadow opacity-90 scale-x-[-1]"
                />
              )}
              <TemplateCulturalCrest
                templateId={template.id}
                color={palette.accent}
                size={76}
              />
              {template.id === 'javanese-royal' && (
                <img
                  src="/assets/motif_jawa/motif_jawa.png"
                  alt="Motif Jawa"
                  className="w-9 h-9 object-contain drop-shadow opacity-90"
                />
              )}
            </div>

            <p
              style={{ color: palette.mutedText }}
              className="text-xs sm:text-sm leading-relaxed"
            >
              {template.closingStatement.honorificClosing}
            </p>

            <p
              style={{ color: palette.accent }}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase mt-6"
            >
              KAMI YANG BERBAHAGIA
            </p>
            <h2
              style={{ fontFamily: template.typography.displayFont }}
              className="text-3xl sm:text-5xl mt-1"
            >
              {custom.groomShort} &amp; {custom.brideShort}
            </h2>
            <p
              style={{ color: palette.mutedText }}
              className="text-xs mt-2 font-medium"
            >
              {template.closingStatement.familySignature}
            </p>

            <div
              style={{ borderColor: palette.border, color: palette.mutedText }}
              className="mt-10 pt-5 border-t text-[11px] flex items-center justify-center gap-2"
            >
              <span>The Wedding of {custom.groomShort} &amp; {custom.brideShort}</span>
              <span>·</span>
              <span>Doa Restu &amp; Bahagia Selamanya</span>
            </div>
          </div>
        </div>
      </motion.div>
      )}
    </div>
  );
};
