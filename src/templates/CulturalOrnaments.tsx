import React from 'react';
import { TemplateId } from '../models/invitation.model';

interface OrnamentProps {
  templateId: TemplateId;
  color: string;
  size?: number;
  className?: string;
}

/**
 * Pure, Non-Mixed Cultural Crest per Template Art Direction
 * Dynamically colored via `color` (supports full client color customization)
 */
export const TemplateCulturalCrest: React.FC<OrnamentProps> = ({
  templateId,
  color,
  size = 110,
  className = '',
}) => {
  switch (templateId) {
    case 'javanese-royal':
      // Pure Javanese Kasunanan Gunungan Kayon & Kawung Lotus
      return (
        <svg
          width={size}
          height={size * 1.25}
          viewBox="0 0 120 150"
          fill="none"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          <path
            d="M60 6C60 6 106 54 106 98C106 122 86 138 60 142C34 138 14 122 14 98C14 54 60 6 60 6Z"
            stroke={color}
            strokeWidth="1.4"
            fill={color}
            fillOpacity="0.08"
          />
          <path
            d="M60 16C60 16 97 57 97 96C97 117 81 130 60 134C39 130 23 117 23 96C23 57 60 16 60 16Z"
            stroke={color}
            strokeWidth="0.8"
            strokeDasharray="3 2"
          />
          <line x1="60" y1="24" x2="60" y2="134" stroke={color} strokeWidth="1.2" />
          <path d="M60 46C48 46 39 38 35 30" stroke={color} strokeWidth="1.1" />
          <path d="M60 46C72 46 81 38 85 30" stroke={color} strokeWidth="1.1" />
          <path d="M60 70C42 70 31 59 27 48" stroke={color} strokeWidth="1.1" />
          <path d="M60 70C78 70 89 59 93 48" stroke={color} strokeWidth="1.1" />
          <path d="M60 94C40 94 28 83 25 70" stroke={color} strokeWidth="1.1" />
          <path d="M60 94C80 94 92 83 95 70" stroke={color} strokeWidth="1.1" />
          {/* Joglo Kraton Sanctuary Base */}
          <path
            d="M42 132V110L60 98L78 110V132H42Z"
            stroke={color}
            strokeWidth="1.1"
            fill={color}
            fillOpacity="0.14"
          />
          <circle cx="60" cy="70" r="5" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1" />
        </svg>
      );

    case 'sundanese-romance':
      // Pure Sundanese Siger Crown & Cascading Ronce Melati Mangle + Botanical Leaves
      return (
        <svg
          width={size}
          height={size * 1.1}
          viewBox="0 0 140 130"
          fill="none"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Graceful Curved Siger Priangan */}
          <path
            d="M20 88C30 62 42 54 48 68C56 44 65 24 70 20C75 24 84 44 92 68C98 54 110 62 120 88H20Z"
            stroke={color}
            strokeWidth="1.4"
            fill={color}
            fillOpacity="0.09"
          />
          <path
            d="M32 88C40 70 48 64 54 74C61 54 67 38 70 34C73 38 79 54 86 74C92 64 100 70 108 88"
            stroke={color}
            strokeWidth="0.9"
          />
          {/* Jasmine Mangle Chains (Untaian Melati) */}
          {[26, 36, 104, 114].map((x, idx) => (
            <g key={idx}>
              <circle cx={x} cy="95" r="2.2" fill={color} />
              <circle cx={x} cy="103" r="2.2" fill={color} fillOpacity="0.8" />
              <circle cx={x} cy="111" r="2.2" fill={color} fillOpacity="0.6" />
              <path d={`M${x} 115L${x - 3} 121L${x} 125L${x + 3} 121Z`} fill={color} />
            </g>
          ))}
          <circle cx="70" cy="64" r="4" fill={color} />
        </svg>
      );

    case 'minang-heritage':
      // Pure Minangkabau Gonjong Rumah Gadang & Suntiang Gadang Geometric Rays
      return (
        <svg
          width={size}
          height={size * 1.1}
          viewBox="0 0 150 130"
          fill="none"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Suntiang Geometric Sunburst */}
          {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((deg, idx) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 75 - Math.cos(rad) * 38;
            const y1 = 96 - Math.sin(rad) * 44;
            const x2 = 75 - Math.cos(rad) * 62;
            const y2 = 96 - Math.sin(rad) * 68;
            return (
              <g key={idx}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.1" />
                <rect
                  x={x2 - 2}
                  y={y2 - 2}
                  width="4"
                  height="4"
                  transform={`rotate(45 ${x2} ${y2})`}
                  fill={color}
                />
              </g>
            );
          })}
          {/* Bold Multi-Spire Bagonjong Roof */}
          <path
            d="M14 68Q44 98 75 46Q106 98 136 68L118 112H32L14 68Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.14"
          />
          {/* Songket Diamond Motif Center */}
          <path d="M75 74L87 92L75 110L63 92L75 74Z" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.25" />
        </svg>
      );

    case 'balinese-sacred':
      // Pure Balinese Candi Bentar Split-Gate & Patra Sari Lotus
      return (
        <svg
          width={size}
          height={size * 1.15}
          viewBox="0 0 130 140"
          fill="none"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Left Candi Bentar Stepped Temple Wing */}
          <path
            d="M53 18V124H18L26 98H34L38 70H45L53 18Z"
            stroke={color}
            strokeWidth="1.4"
            fill={color}
            fillOpacity="0.11"
          />
          {/* Right Candi Bentar Stepped Temple Wing */}
          <path
            d="M77 18V124H112L104 98H96L92 70H85L77 18Z"
            stroke={color}
            strokeWidth="1.4"
            fill={color}
            fillOpacity="0.11"
          />
          {/* Sacred Padma Eight-Petal Star */}
          <circle cx="65" cy="56" r="15" stroke={color} strokeWidth="0.9" strokeDasharray="2 2" />
          <path
            d="M65 34L69 50L85 56L69 62L65 78L61 62L45 56L61 50L65 34Z"
            fill={color}
            fillOpacity="0.28"
            stroke={color}
            strokeWidth="1"
          />
          <line x1="10" y1="124" x2="120" y2="124" stroke={color} strokeWidth="1.4" />
        </svg>
      );

    case 'islamic-elegance':
      // Pure Islamic Rub el Hizb 8-Pointed Star & Mihrab Archway
      return (
        <svg
          width={size}
          height={size * 1.15}
          viewBox="0 0 130 140"
          fill="none"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          {/* Pointed Mihrab Archway */}
          <path
            d="M22 128V66C22 36 42 16 65 10C88 16 108 36 108 66V128H22Z"
            stroke={color}
            strokeWidth="1.3"
            fill={color}
            fillOpacity="0.06"
          />
          {/* Rub el Hizb (Two Overlapping Squares forming 8-Point Geometric Star) */}
          <rect
            x="43"
            y="46"
            width="44"
            height="44"
            stroke={color}
            strokeWidth="1.2"
            fill={color}
            fillOpacity="0.08"
          />
          <rect
            x="43"
            y="46"
            width="44"
            height="44"
            transform="rotate(45 65 68)"
            stroke={color}
            strokeWidth="1.2"
            fill={color}
            fillOpacity="0.08"
          />
          <circle cx="65" cy="68" r="6" stroke={color} strokeWidth="1.1" fill={color} fillOpacity="0.25" />
        </svg>
      );

    case 'modern-nusantara':
    default:
      // Contemporary Architectural Tenun Ikat Minimalist Monogram Lines
      return (
        <svg
          width={size}
          height={size * 0.9}
          viewBox="0 0 140 100"
          fill="none"
          className={`select-none ${className}`}
          aria-hidden="true"
        >
          <rect x="25" y="14" width="90" height="72" stroke={color} strokeWidth="1.2" />
          <rect x="33" y="22" width="74" height="56" stroke={color} strokeWidth="0.75" />
          <path d="M70 14V86" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M52 50L70 32L88 50L70 68L52 50Z" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.12" />
          <circle cx="70" cy="50" r="3" fill={color} />
        </svg>
      );
  }
};

/**
 * Culturally Authentic Section Divider tailored per Template
 */
export const TemplateSectionDivider: React.FC<{
  templateId: TemplateId;
  color: string;
  borderColor: string;
}> = ({ templateId, color, borderColor }) => {
  return (
    <div className="flex items-center justify-center gap-4 my-8 select-none" aria-hidden="true">
      <div
        className="h-[1px] flex-1 max-w-[180px]"
        style={{
          background: `linear-gradient(to right, transparent, ${borderColor}, ${color})`,
        }}
      />
      <div className="flex items-center gap-2" style={{ color }}>
        {templateId === 'minang-heritage' && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs">◇</span>
            <span className="text-sm">◆</span>
            <span className="text-xs">◇</span>
          </div>
        )}
        {templateId === 'islamic-elegance' && (
          <span className="text-sm tracking-widest">۞</span>
        )}
        {templateId === 'sundanese-romance' && (
          <span className="text-xs tracking-[0.2em]">❀ ◆ ❀</span>
        )}
        {templateId === 'balinese-sacred' && (
          <span className="text-xs tracking-[0.15em]">❖ ☸ ❖</span>
        )}
        {templateId === 'javanese-royal' && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-70">◆</span>
            <img
              src="/assets/motif_jawa/motif_jawa.png"
              alt="Motif Batik Jawa"
              className="w-7 h-7 object-contain drop-shadow"
            />
            <span className="text-[10px] opacity-70">◆</span>
          </div>
        )}
        {templateId === 'modern-nusantara' && (
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono">― ◆ ―</span>
        )}
      </div>
      <div
        className="h-[1px] flex-1 max-w-[180px]"
        style={{
          background: `linear-gradient(to left, transparent, ${borderColor}, ${color})`,
        }}
      />
    </div>
  );
};
