import React from 'react';
import { TemplateId } from '../models/invitation.model';

interface AnimatedCulturalBgProps {
  templateId: TemplateId;
  accentColor: string;
  variant?: 'hero' | 'section' | 'footer';
  className?: string;
}

export const AnimatedCulturalBg: React.FC<AnimatedCulturalBgProps> = ({
  templateId,
  accentColor,
  variant = 'section',
  className = '',
}) => {
  const opHero = variant === 'hero' ? 0.1 : variant === 'section' ? 0.06 : 0.04;
  const opMid = variant === 'hero' ? 0.07 : variant === 'section' ? 0.04 : 0.03;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {templateId === 'javanese-royal' && <JavaneseBg color={accentColor} opA={opHero} opB={opMid} />}
      {templateId === 'sundanese-romance' && <SundaneseBg color={accentColor} opA={opHero} opB={opMid} />}
      {templateId === 'minang-heritage' && <MinangBg color={accentColor} opA={opHero} opB={opMid} />}
      {templateId === 'balinese-sacred' && <BalineseBg color={accentColor} opA={opHero} opB={opMid} />}
      {templateId === 'islamic-elegance' && <IslamicBg color={accentColor} opA={opHero} opB={opMid} />}
      {templateId === 'modern-nusantara' && <ModernBg color={accentColor} opA={opHero} opB={opMid} />}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   JAVANESE ROYAL — Fine Canting Batik Filigree + Elegant Parang
   ═══════════════════════════════════════════════════════════════ */
const JavaneseBg: React.FC<{color: string; opA: number; opB: number}> = ({color, opA, opB}) => (
  <>
    {/* Fine Canting Batik Hairline Geometry — subtle & non-intrusive (no heavy circles) */}
    <svg className="absolute inset-0 w-full h-full animate-culture-pulse pointer-events-none" style={{opacity: opA * 0.4}}>
      <defs>
        <pattern id="kawungFine" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          {/* Delicate thin stroke petals - pure outline, no solid fill */}
          <path d="M32 12 Q38 24 32 32 Q26 24 32 12Z" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />
          <path d="M32 52 Q38 40 32 32 Q26 40 32 52Z" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />
          <path d="M12 32 Q24 38 32 32 Q24 26 12 32Z" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />
          <path d="M52 32 Q40 38 32 32 Q40 26 52 32Z" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />
          {/* Micro center diamond */}
          <rect x="31" y="31" width="2" height="2" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kawungFine)" />
    </svg>

    {/* Elegant Parang diagonal wave lines — very subtle */}
    <svg className="absolute inset-0 w-full h-full animate-culture-drift pointer-events-none" style={{opacity: opB * 0.35}}>
      <defs>
        <pattern id="parang" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <path d="M0 20 Q20 5 40 20 Q60 35 80 20" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
          <path d="M0 32 Q20 17 40 32 Q60 47 80 32" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#parang)" />
    </svg>

    {/* Authentic Javanese Motif Corner Watermark from client asset */}
    <div className="absolute -top-10 -right-10 w-44 h-44 opacity-[0.07] pointer-events-none select-none">
      <img
        src="/assets/motif_jawa/motif_jawa.png"
        alt="Motif Jawa"
        className="w-full h-full object-contain filter drop-shadow"
      />
    </div>
    <div className="absolute -bottom-10 -left-10 w-44 h-44 opacity-[0.07] pointer-events-none select-none rotate-180">
      <img
        src="/assets/motif_jawa/motif_jawa.png"
        alt="Motif Jawa"
        className="w-full h-full object-contain filter drop-shadow"
      />
    </div>

    {/* Joglo Roof Silhouette — top */}
    <svg viewBox="0 0 400 80" className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] max-w-[500px] animate-culture-sway pointer-events-none" style={{opacity: opA * 0.6}}>
      <path d="M200 5 L320 40 L350 38 L380 45 L400 50 L400 80 L0 80 L0 50 L20 45 L50 38 L80 40 L200 5Z" fill={color} fillOpacity="0.04" />
      <path d="M200 5 L320 40 L350 38 L380 45" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      <path d="M200 5 L80 40 L50 38 L20 45" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
    </svg>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   SUNDANESE ROMANCE — Botanical Leaves + Melati + Siger Crown
   ═══════════════════════════════════════════════════════════════ */
const SundaneseBg: React.FC<{color: string; opA: number; opB: number}> = ({color, opA, opB}) => (
  <>
    {/* Leaf vine — left side */}
    <svg viewBox="0 0 120 600" className="absolute left-0 top-0 h-full w-20 sm:w-28 animate-culture-sway" style={{opacity: opA * 1.4}}>
      <path d="M60 0 Q40 50 55 100 Q70 150 50 200 Q30 250 55 300 Q75 350 50 400 Q30 450 55 500 Q70 550 50 600" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {[80, 180, 280, 380, 480].map((y, i) => (
        <g key={i}>
          <path d={`M${50 + (i%2?10:-10)} ${y} Q${i%2?20:80} ${y-20} ${i%2?10:90} ${y-35}`} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.6" strokeOpacity="0.25" />
          <path d={`M${50 + (i%2?10:-10)} ${y} Q${i%2?20:80} ${y+20} ${i%2?10:90} ${y+35}`} fill={color} fillOpacity="0.08" stroke={color} strokeWidth="0.6" strokeOpacity="0.2" />
        </g>
      ))}
    </svg>
    {/* Leaf vine — right side (mirrored) */}
    <svg viewBox="0 0 120 600" className="absolute right-0 top-0 h-full w-20 sm:w-28 animate-culture-sway-reverse" style={{opacity: opA * 1.4, transform: 'scaleX(-1)'}}>
      <path d="M60 0 Q40 50 55 100 Q70 150 50 200 Q30 250 55 300 Q75 350 50 400 Q30 450 55 500 Q70 550 50 600" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {[80, 180, 280, 380, 480].map((y, i) => (
        <g key={i}>
          <path d={`M${50 + (i%2?10:-10)} ${y} Q${i%2?20:80} ${y-20} ${i%2?10:90} ${y-35}`} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.6" strokeOpacity="0.25" />
        </g>
      ))}
    </svg>
    {/* Floating melati dots */}
    {[15, 35, 55, 75, 85].map((pct, i) => (
      <div key={i} className="absolute animate-culture-float" style={{ left: `${pct}%`, top: '-8px', animationDelay: `${i * 2.5}s`, animationDuration: `${14 + i * 2}s` }}>
        <svg width="12" height="12" viewBox="0 0 20 20" style={{opacity: opB * 3}}>
          <circle cx="10" cy="10" r="4" fill={color} fillOpacity="0.5" />
          <circle cx="10" cy="4" r="3" fill={color} fillOpacity="0.3" />
          <circle cx="10" cy="16" r="3" fill={color} fillOpacity="0.3" />
          <circle cx="4" cy="10" r="3" fill={color} fillOpacity="0.3" />
          <circle cx="16" cy="10" r="3" fill={color} fillOpacity="0.3" />
        </svg>
      </div>
    ))}
  </>
);

/* ═══════════════════════════════════════════════════════════════
   MINANG HERITAGE — Gonjong Spires + Songket Diamond + Rays
   ═══════════════════════════════════════════════════════════════ */
const MinangBg: React.FC<{color: string; opA: number; opB: number}> = ({color, opA, opB}) => (
  <>
    {/* Songket diamond pattern */}
    <svg className="absolute inset-0 w-full h-full animate-culture-pulse" style={{opacity: opB}}>
      <defs>
        <pattern id="songket" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
          <path d="M20 8 L32 20 L20 32 L8 20 Z" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="0.5" strokeOpacity="0.25" />
          <circle cx="20" cy="20" r="2" fill={color} fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#songket)" />
    </svg>
    {/* Gonjong spires — top left */}
    <svg viewBox="0 0 200 120" className="absolute top-0 left-0 w-32 sm:w-48 animate-culture-sway" style={{opacity: opA * 1.5}}>
      <path d="M10 120 L30 50 Q35 10 40 0 L45 10 L50 40 L70 100 L90 40 L95 15 Q100 5 105 0 L110 15 L115 50 L140 120Z" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
    </svg>
    {/* Gonjong spires — top right (mirrored) */}
    <svg viewBox="0 0 200 120" className="absolute top-0 right-0 w-32 sm:w-48 animate-culture-sway-reverse" style={{opacity: opA * 1.5, transform: 'scaleX(-1)'}}>
      <path d="M10 120 L30 50 Q35 10 40 0 L45 10 L50 40 L70 100 L90 40 L95 15 Q100 5 105 0 L110 15 L115 50 L140 120Z" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
    </svg>
    {/* Radiating geometric sunburst */}
    <svg viewBox="0 0 200 200" className="absolute bottom-0 right-0 w-40 h-40 animate-culture-spin" style={{opacity: opB * 0.8}}>
      {Array.from({length: 12}).map((_, i) => {
        const angle = i * 30;
        const rad = (angle * Math.PI) / 180;
        return <line key={i} x1="100" y1="100" x2={100 + Math.cos(rad)*90} y2={100 + Math.sin(rad)*90} stroke={color} strokeWidth="0.6" strokeOpacity="0.25" />;
      })}
    </svg>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   BALINESE SACRED — Candi Bentar + Patra Sari + Lotus
   ═══════════════════════════════════════════════════════════════ */
const BalineseBg: React.FC<{color: string; opA: number; opB: number}> = ({color, opA, opB}) => (
  <>
    {/* Candi Bentar split gate — left */}
    <svg viewBox="0 0 80 300" className="absolute left-0 top-[10%] h-[60%] w-14 sm:w-20" style={{opacity: opA * 1.6}}>
      <path d="M80 0 L80 300 L50 300 L50 240 L55 200 L60 160 L65 120 L70 80 L75 40 L80 0Z" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="0.7" strokeOpacity="0.15" />
      <path d="M70 80 L60 80 L55 60 L50 40 L45 20 L50 15 L55 25 L60 50 L65 70Z" fill={color} fillOpacity="0.04" />
    </svg>
    {/* Candi Bentar split gate — right */}
    <svg viewBox="0 0 80 300" className="absolute right-0 top-[10%] h-[60%] w-14 sm:w-20" style={{opacity: opA * 1.6, transform: 'scaleX(-1)'}}>
      <path d="M80 0 L80 300 L50 300 L50 240 L55 200 L60 160 L65 120 L70 80 L75 40 L80 0Z" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="0.7" strokeOpacity="0.15" />
      <path d="M70 80 L60 80 L55 60 L50 40 L45 20 L50 15 L55 25 L60 50 L65 70Z" fill={color} fillOpacity="0.04" />
    </svg>
    {/* Patra Sari curling scrollwork */}
    <svg className="absolute inset-0 w-full h-full animate-culture-drift" style={{opacity: opB}}>
      <defs>
        <pattern id="patra" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M10 40 Q20 20 40 20 Q60 20 60 40 Q60 55 45 55 Q35 55 35 45 Q35 38 42 38" fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.3" />
          <path d="M70 40 Q60 60 40 60 Q20 60 20 40 Q20 25 35 25 Q45 25 45 35 Q45 42 38 42" fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#patra)" />
    </svg>
    {/* Lotus blooming — center bottom */}
    <svg viewBox="0 0 120 60" className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 animate-culture-bloom" style={{opacity: opA * 2}}>
      {[-30, -15, 0, 15, 30].map((rot, i) => (
        <ellipse key={i} cx="60" cy="50" rx="10" ry="28" fill={color} fillOpacity={0.06 + i*0.01} transform={`rotate(${rot} 60 50)`} />
      ))}
      <circle cx="60" cy="48" r="5" fill={color} fillOpacity="0.15" />
    </svg>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   ISLAMIC ELEGANCE — Arabesque Tiles + Mihrab + 8-Point Star
   ═══════════════════════════════════════════════════════════════ */
const IslamicBg: React.FC<{color: string; opA: number; opB: number}> = ({color, opA, opB}) => (
  <>
    {/* Arabesque interlocking tile pattern */}
    <svg className="absolute inset-0 w-full h-full animate-culture-pulse" style={{opacity: opB}}>
      <defs>
        <pattern id="arabesque" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="0" cy="0" r="20" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="60" cy="0" r="20" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="0" cy="60" r="20" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="60" cy="60" r="20" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
          <path d="M30 10 L50 30 L30 50 L10 30Z" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arabesque)" />
    </svg>
    {/* Mihrab arch — top center */}
    <svg viewBox="0 0 300 160" className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[400px]" style={{opacity: opA * 1.5}}>
      <path d="M30 160 L30 70 C30 30 80 5 150 5 C220 5 270 30 270 70 L270 160" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.15" />
      <path d="M50 160 L50 80 C50 45 90 20 150 20 C210 20 250 45 250 80 L250 160" fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.1" strokeDasharray="4 3" />
    </svg>
    {/* 8-pointed stars scattered */}
    {[{x: '15%', y: '20%', s: 30}, {x: '80%', y: '30%', s: 24}, {x: '10%', y: '75%', s: 20}, {x: '85%', y: '80%', s: 26}].map((star, i) => (
      <svg key={i} viewBox="0 0 50 50" width={star.s} height={star.s} className="absolute animate-culture-spin" style={{left: star.x, top: star.y, opacity: opA * 1.2, animationDuration: `${25 + i*8}s`, animationDelay: `${i*3}s`}}>
        <rect x="10" y="10" width="30" height="30" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" transform="rotate(0 25 25)" />
        <rect x="10" y="10" width="30" height="30" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" transform="rotate(45 25 25)" />
        <circle cx="25" cy="25" r="3" fill={color} fillOpacity="0.2" />
      </svg>
    ))}
  </>
);

/* ═══════════════════════════════════════════════════════════════
   MODERN NUSANTARA — Minimal Lines + Dot Grid + Abstract Curves
   ═══════════════════════════════════════════════════════════════ */
const ModernBg: React.FC<{color: string; opA: number; opB: number}> = ({color, opA, opB}) => (
  <>
    {/* Dot grid */}
    <svg className="absolute inset-0 w-full h-full" style={{opacity: opB * 1.2}}>
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill={color} fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
    {/* Thin editorial rules */}
    <div className="absolute top-[20%] left-[8%] right-[8%] h-px animate-culture-drift" style={{backgroundColor: color, opacity: opA * 0.7}} />
    <div className="absolute top-[80%] left-[8%] right-[8%] h-px animate-culture-drift" style={{backgroundColor: color, opacity: opA * 0.7, animationDelay: '5s'}} />
    {/* Abstract bezier curves */}
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full animate-culture-drift" style={{opacity: opA}}>
      <path d="M0 200 Q100 100 200 200 Q300 300 400 200" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      <path d="M0 250 Q150 150 250 250 Q350 350 400 250" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.1" />
    </svg>
  </>
);
