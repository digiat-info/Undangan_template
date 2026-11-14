import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ParallaxAssetConfig } from '../models/invitation.model';

interface ParallaxAssetLayerProps {
  assetConfig?: ParallaxAssetConfig;
  accentColor?: string;
  isCoverSealed?: boolean;
}

export const ParallaxAssetLayer: React.FC<ParallaxAssetLayerProps> = ({
  assetConfig,
  accentColor = '#D97706',
  isCoverSealed = false,
}) => {
  if (!assetConfig) return null;

  const {
    enableParallax = true,
    parallaxIntensity = 'medium',
    bgTextureUrl,
    bgTextureOpacity = 0.12,
    bgTextureBlendMode = 'luminosity',
    cornerOrnamentUrl,
    cornerOrnamentOpacity = 0.85,
    sideBordersUrl,
    floatingMotifs = true,
  } = assetConfig;

  // Multiplier for parallax depth based on user setting
  const intensityMultiplier =
    parallaxIntensity === 'deep' ? 0.35 : parallaxIntensity === 'subtle' ? 0.08 : 0.18;

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 90 });

  // Parallax offsets
  const bgTranslateY = useTransform(
    smoothScrollY,
    [0, 2000],
    enableParallax ? [0, -2000 * intensityMultiplier] : [0, 0]
  );

  const cornerTranslateY = useTransform(
    smoothScrollY,
    [0, 2000],
    enableParallax ? [0, -2000 * (intensityMultiplier * 0.5)] : [0, 0]
  );

  const floatParticle1Y = useTransform(
    smoothScrollY,
    [0, 2000],
    enableParallax ? [0, -2000 * 0.28] : [0, 0]
  );

  const floatParticle2Y = useTransform(
    smoothScrollY,
    [0, 2000],
    enableParallax ? [0, -2000 * 0.42] : [0, 0]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* ===================================================================
          1. PARALLAX AMBIENT WALLPAPER / TEXTURE LAYER
          Strictly isolated with user-defined blend mode and opacity so text
          and bride/groom photos never clash or get obscured.
         =================================================================== */}
      {bgTextureUrl && (
        <motion.div
          style={{
            y: bgTranslateY,
            backgroundImage: `url(${bgTextureUrl})`,
            opacity: bgTextureOpacity,
            mixBlendMode: bgTextureBlendMode,
          }}
          className="absolute -top-24 -bottom-24 -left-12 -right-12 bg-repeat bg-contain transition-opacity duration-300"
        />
      )}

      {/* ===================================================================
          2. ELEGANT SIDE PILLAR BORDERS (LEFT & RIGHT)
         =================================================================== */}
      {sideBordersUrl && !isCoverSealed && (
        <>
          <div
            style={{
              backgroundImage: `url(${sideBordersUrl})`,
              opacity: 0.08,
            }}
            className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-repeat-y bg-contain z-0"
          />
          <div
            style={{
              backgroundImage: `url(${sideBordersUrl})`,
              opacity: 0.08,
            }}
            className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-repeat-y bg-contain scale-x-[-1] z-0"
          />
        </>
      )}

      {/* ===================================================================
          3. PARALLAX CORNER ORNAMENTS (CANTING / FLOURISH MOTIFS)
         =================================================================== */}
      {cornerOrnamentUrl && (
        <motion.div
          style={{ y: cornerTranslateY }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Top-Left Flourish */}
          <div
            style={{ opacity: cornerOrnamentOpacity }}
            className="absolute top-3 left-3 sm:top-5 sm:left-5 w-10 h-10 sm:w-16 sm:h-16"
          >
            <img
              src={cornerOrnamentUrl}
              alt=""
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>

          {/* Top-Right Flourish (Flipped) */}
          <div
            style={{ opacity: cornerOrnamentOpacity }}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 sm:w-16 sm:h-16 scale-x-[-1]"
          >
            <img
              src={cornerOrnamentUrl}
              alt=""
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
        </motion.div>
      )}

      {/* ===================================================================
          4. AMBIENT FLOATING MOTIF PARTICLES (PARALLAX GLIDE)
         =================================================================== */}
      {floatingMotifs && cornerOrnamentUrl && (
        <>
          <motion.div
            style={{ y: floatParticle1Y }}
            className="absolute top-[28%] left-[6%] sm:left-[10%] opacity-20 w-8 h-8 pointer-events-none animate-pulse"
          >
            <img
              src={cornerOrnamentUrl}
              alt=""
              className="w-full h-full object-contain rotate-12"
            />
          </motion.div>

          <motion.div
            style={{ y: floatParticle2Y }}
            className="absolute top-[65%] right-[6%] sm:right-[10%] opacity-20 w-10 h-10 pointer-events-none"
          >
            <img
              src={cornerOrnamentUrl}
              alt=""
              className="w-full h-full object-contain -rotate-45"
            />
          </motion.div>
        </>
      )}
    </div>
  );
};
