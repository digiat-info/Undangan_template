import React from 'react';
import { AdatRegion } from '../data/adatSuites';

interface MotifProps {
  region: AdatRegion;
  className?: string;
  size?: number;
}

/**
 * Bespoke Cultural Crown / Crest SVG Ornament per Indonesian Adat Region
 */
export const RegionalCrestOrnament: React.FC<MotifProps> = ({
  region,
  className = '',
  size = 120,
}) => {
  switch (region) {
    case 'jawa':
      // Gunungan Wayang (Kayon) — Tree of Life & Sacred Gate
      return (
        <svg
          width={size}
          height={size * 1.25}
          viewBox="0 0 120 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Outer Kayon Leaf Silhouette */}
          <path
            d="M60 6C60 6 106 54 106 98C106 122 86 138 60 142C34 138 14 122 14 98C14 54 60 6 60 6Z"
            stroke="#D97706"
            strokeWidth="1.25"
            fill="#D97706"
            fillOpacity="0.06"
          />
          <path
            d="M60 15C60 15 98 57 98 96C98 117 81 131 60 135C39 131 22 117 22 96C22 57 60 15 60 15Z"
            stroke="#D97706"
            strokeWidth="0.75"
            strokeDasharray="2 2"
          />
          {/* Central Tree of Life (Kalpataru) */}
          <line x1="60" y1="24" x2="60" y2="134" stroke="#D97706" strokeWidth="1.2" />
          {/* Symmetrical Branches & Lotus Buds */}
          <path d="M60 45C48 45 40 37 36 30" stroke="#D97706" strokeWidth="1" />
          <path d="M60 45C72 45 80 37 84 30" stroke="#D97706" strokeWidth="1" />
          <path d="M60 68C42 68 32 58 28 48" stroke="#D97706" strokeWidth="1" />
          <path d="M60 68C78 68 88 58 92 48" stroke="#D97706" strokeWidth="1" />
          <path d="M60 92C40 92 28 82 26 70" stroke="#D97706" strokeWidth="1" />
          <path d="M60 92C80 92 92 82 94 70" stroke="#D97706" strokeWidth="1" />
          {/* Sacred Joglo Gate at Base */}
          <path
            d="M42 132V110L60 98L78 110V132H42Z"
            stroke="#D97706"
            strokeWidth="1"
            fill="#D97706"
            fillOpacity="0.12"
          />
          <circle cx="60" cy="68" r="5" fill="#D97706" fillOpacity="0.35" stroke="#D97706" strokeWidth="1" />
          <circle cx="60" cy="42" r="3.5" fill="#D97706" />
        </svg>
      );

    case 'minang':
      // Suntiang Gadang & Gonjong Rumah Gadang
      return (
        <svg
          width={size}
          height={size * 1.1}
          viewBox="0 0 140 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Radiant Suntiang Golden Halo */}
          <path
            d="M20 96C20 62 42 36 70 36C98 36 120 62 120 96"
            stroke="#D97706"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M32 96C32 69 49 48 70 48C91 48 108 69 108 96"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          {/* Suntiang Bungo Sarunai Rays */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180].map((deg, idx) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 70 - Math.cos(rad) * 38;
            const y1 = 96 - Math.sin(rad) * 48;
            const x2 = 70 - Math.cos(rad) * 58;
            const y2 = 96 - Math.sin(rad) * 68;
            return (
              <g key={idx}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D97706" strokeWidth="1" />
                <circle cx={x2} cy={y2} r="2.5" fill="#D97706" />
              </g>
            );
          })}
          {/* Gonjong Roof Silhouette */}
          <path
            d="M16 74Q43 98 70 54Q97 98 124 74L110 112H30L16 74Z"
            stroke="#D97706"
            strokeWidth="1.4"
            fill="#D97706"
            fillOpacity="0.1"
          />
          <path d="M55 112L70 84L85 112" stroke="#D97706" strokeWidth="1" />
        </svg>
      );

    case 'bali':
      // Candi Bentar & Patra Sari Bali
      return (
        <svg
          width={size}
          height={size * 1.15}
          viewBox="0 0 130 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Left Candi Bentar Wing */}
          <path
            d="M54 20V124H20L28 96H36L40 68H46L54 20Z"
            stroke="#D97706"
            strokeWidth="1.3"
            fill="#D97706"
            fillOpacity="0.09"
          />
          {/* Right Candi Bentar Wing */}
          <path
            d="M76 20V124H110L102 96H94L90 68H84L76 20Z"
            stroke="#D97706"
            strokeWidth="1.3"
            fill="#D97706"
            fillOpacity="0.09"
          />
          {/* Radiant Sun / Padma Lotus in Center */}
          <circle cx="65" cy="54" r="14" stroke="#D97706" strokeWidth="0.9" strokeDasharray="2 2" />
          <path d="M65 34L69 48L83 54L69 60L65 74L61 60L47 54L61 48L65 34Z" fill="#D97706" fillOpacity="0.3" stroke="#D97706" strokeWidth="1" />
          <line x1="12" y1="124" x2="118" y2="124" stroke="#D97706" strokeWidth="1.2" />
        </svg>
      );

    case 'sunda':
      // Siger Priangan Crown & Jasmine Mangle
      return (
        <svg
          width={size}
          height={size * 1.1}
          viewBox="0 0 140 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Siger Crown Peaks */}
          <path
            d="M18 92L32 52L50 72L70 26L90 72L108 52L122 92H18Z"
            stroke="#D97706"
            strokeWidth="1.4"
            fill="#D97706"
            fillOpacity="0.09"
          />
          <path
            d="M28 92L40 64L54 78L70 42L86 78L100 64L112 92"
            stroke="#D97706"
            strokeWidth="0.9"
          />
          {/* Dangling Ronce Melati Chains */}
          {[26, 34, 106, 114].map((x, idx) => (
            <g key={idx}>
              <line x1={x} y1="92" x2={x} y2="122" stroke="#D97706" strokeWidth="0.9" strokeDasharray="2 3" />
              <circle cx={x} cy="123" r="2.5" fill="#D97706" />
            </g>
          ))}
          <circle cx="70" cy="68" r="4" fill="#D97706" />
        </svg>
      );

    case 'batak':
      // Gorga Batak & Rumah Bolon Crown
      return (
        <svg
          width={size}
          height={size * 1.15}
          viewBox="0 0 130 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Rumah Bolon Soaring Saddle Roof */}
          <path
            d="M16 32Q65 78 114 32L98 104H32L16 32Z"
            stroke="#D97706"
            strokeWidth="1.4"
            fill="#D97706"
            fillOpacity="0.09"
          />
          {/* Gorga Spiral Curls */}
          <path d="M40 86C40 76 50 74 52 82C54 90 44 94 38 88" stroke="#D97706" strokeWidth="1.1" />
          <path d="M90 86C90 76 80 74 78 82C76 90 86 94 92 88" stroke="#D97706" strokeWidth="1.1" />
          <path d="M65 24L72 44L65 62L58 44L65 24Z" stroke="#D97706" strokeWidth="1.1" fill="#D97706" fillOpacity="0.2" />
          <line x1="24" y1="112" x2="106" y2="112" stroke="#D97706" strokeWidth="1.2" />
        </svg>
      );

    case 'bugis':
    default:
      // Sulapa Eppa (Four-Cornered Sacred Diamond) & Simpolong Floral Crest
      return (
        <svg
          width={size}
          height={size * 1.15}
          viewBox="0 0 130 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Outer Sulapa Eppa Diamond */}
          <path
            d="M65 16L114 70L65 124L16 70L65 16Z"
            stroke="#D97706"
            strokeWidth="1.4"
            fill="#D97706"
            fillOpacity="0.08"
          />
          {/* Inner Nested Diamond */}
          <path
            d="M65 30L100 70L65 110L30 70L65 30Z"
            stroke="#D97706"
            strokeWidth="0.9"
            strokeDasharray="3 2"
          />
          {/* Bugis Bunga Simpolong Star */}
          <path
            d="M65 44L72 63L91 70L72 77L65 96L58 77L39 70L58 63L65 44Z"
            stroke="#D97706"
            strokeWidth="1.1"
            fill="#D97706"
            fillOpacity="0.22"
          />
          <circle cx="65" cy="70" r="4" fill="#D97706" />
        </svg>
      );
  }
};

/**
 * Nusantara Motif Divider — Centered vector Kawung/Songket ornament flanked by 1px gradient rules
 */
export const NusantaraDivider: React.FC<{ className?: string; dark?: boolean }> = ({
  className = '',
  dark = false,
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-6 select-none ${className}`} aria-hidden="true">
      <div
        className={`h-[1px] flex-1 max-w-[160px] ${
          dark
            ? 'bg-gradient-to-r from-transparent via-[#D97706]/50 to-[#D97706]'
            : 'bg-gradient-to-r from-transparent via-[#E2E8F0] to-[#D97706]'
        }`}
      />
      <div className="flex items-center gap-2 text-[#D97706]">
        <span className="text-[10px]">◆</span>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="animate-spin-slow">
          {/* Batik Kawung Four-Petal Sacred Geometry */}
          <path
            d="M14 2C17 7 17 11 14 14C11 11 11 7 14 2Z"
            stroke="#D97706"
            strokeWidth="1.1"
            fill="#D97706"
            fillOpacity="0.15"
          />
          <path
            d="M14 26C17 21 17 17 14 14C11 17 11 21 14 26Z"
            stroke="#D97706"
            strokeWidth="1.1"
            fill="#D97706"
            fillOpacity="0.15"
          />
          <path
            d="M2 14C7 11 11 11 14 14C11 17 7 17 2 14Z"
            stroke="#D97706"
            strokeWidth="1.1"
            fill="#D97706"
            fillOpacity="0.15"
          />
          <path
            d="M26 14C21 11 17 11 14 14C17 17 21 17 26 14Z"
            stroke="#D97706"
            strokeWidth="1.1"
            fill="#D97706"
            fillOpacity="0.15"
          />
          <circle cx="14" cy="14" r="2" fill="#D97706" />
        </svg>
        <span className="text-[10px]">◆</span>
      </div>
      <div
        className={`h-[1px] flex-1 max-w-[160px] ${
          dark
            ? 'bg-gradient-to-l from-transparent via-[#D97706]/50 to-[#D97706]'
            : 'bg-gradient-to-l from-transparent via-[#E2E8F0] to-[#D97706]'
        }`}
      />
    </div>
  );
};

/**
 * Floating Jasmine (Melati) & Champagne Gold Leaf Petals for the Living Invitation Canvas
 */
export const FloatingPetalsOverlay: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null;

  const petals = [
    { left: '7%', delay: '0s', duration: '15s', size: 14 },
    { left: '19%', delay: '3.2s', duration: '18s', size: 11 },
    { left: '34%', delay: '1.5s', duration: '16s', size: 15 },
    { left: '52%', delay: '5.0s', duration: '19s', size: 12 },
    { left: '68%', delay: '2.1s', duration: '14s', size: 16 },
    { left: '83%', delay: '4.4s', duration: '17s', size: 13 },
    { left: '92%', delay: '6.8s', duration: '16s', size: 11 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20" aria-hidden="true">
      {petals.map((p, idx) => (
        <div
          key={idx}
          style={{
            left: p.left,
            animation: `floatPetal ${p.duration} linear ${p.delay} infinite`,
          }}
          className="absolute -top-8 opacity-0"
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1C13.5 5.5 15 9.5 10 19C5 9.5 6.5 5.5 10 1Z"
              fill="#D97706"
              fillOpacity="0.32"
              stroke="#D97706"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
