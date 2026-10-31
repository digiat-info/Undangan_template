import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  ChevronUp,
} from 'lucide-react';
import { ADAT_SUITES, AdatSuite } from '../data/adatSuites';
import { adatAudio } from '../utils/adatAudioEngine';

interface FloatingCeremonyAudioPlayerProps {
  activeSuite: AdatSuite;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectSuiteMusic: (suite: AdatSuite) => void;
}

export const FloatingCeremonyAudioPlayer: React.FC<FloatingCeremonyAudioPlayerProps> = ({
  activeSuite,
  isPlaying,
  onTogglePlay,
  onSelectSuiteMusic,
}) => {
  const [showTrackSelector, setShowTrackSelector] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      adatAudio.setVolume(0.4);
      setIsMuted(false);
    } else {
      adatAudio.setVolume(0.0);
      setIsMuted(true);
    }
  };

  const handleStrikeGong = (e: React.MouseEvent) => {
    e.stopPropagation();
    adatAudio.playCeremonialGong(activeSuite.musicTrack.droneHz);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Expandable Traditional Music Ensemble Selector */}
      {showTrackSelector && (
        <div className="mb-2.5 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl text-slate-900 transition-all">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500">
                PUSTAKA LAGU ADAT NUSANTARA
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Sintesis instrumen tradisional langsung
              </p>
            </div>
            <button
              type="button"
              onClick={handleStrikeGong}
              className="px-2.5 py-1 text-[11px] font-medium bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 border border-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
              title="Tabuh Gong Ageng Seremonial"
            >
              Tabuh Gong ◆
            </button>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {ADAT_SUITES.map((suite) => {
              const isSelected = suite.id === activeSuite.id;
              return (
                <button
                  key={suite.id}
                  type="button"
                  onClick={() => {
                    onSelectSuiteMusic(suite);
                    setShowTrackSelector(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                      : 'bg-white border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-amber-700">
                      {suite.regionLabel}
                    </div>
                    <div className="text-xs font-medium text-slate-900 truncate">
                      {suite.musicTrack.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {suite.musicTrack.ensemble}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-xs text-amber-700 font-semibold shrink-0">◆ Aktif</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Floating Ceremony Audio Bar */}
      <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-slate-300 rounded-full px-3.5 py-2 shadow-xl transition-colors">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Jeda Musik Adat' : 'Putar Musik Adat'}
          className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Track Metadata & Soundwave */}
        <button
          type="button"
          onClick={() => setShowTrackSelector((prev) => !prev)}
          className="flex items-center gap-3 text-left pr-1 cursor-pointer group"
        >
          <div className="min-w-0 max-w-[145px] sm:max-w-[190px]">
            <div className="flex items-center gap-1.5">
              <Disc3
                className={`w-3.5 h-3.5 text-amber-600 shrink-0 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
              />
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 truncate">
                {activeSuite.regionLabel}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-900 truncate group-hover:text-amber-700 transition-colors">
              {activeSuite.musicTrack.title}
            </p>
          </div>

          {/* Animated Soundwave Bars in amber-600 */}
          <div className="flex items-end gap-[3px] h-4 px-1" aria-hidden="true">
            {[0.1, 0.35, 0.2, 0.5, 0.15].map((delay, i) => (
              <span
                key={i}
                style={{
                  animation: isPlaying && !isMuted
                    ? `soundwaveBar 0.9s ease-in-out ${delay}s infinite`
                    : 'none',
                  height: isPlaying && !isMuted ? '100%' : '35%',
                }}
                className="w-[2.5px] bg-amber-600 rounded-full transition-all origin-bottom"
              />
            ))}
          </div>

          <ChevronUp
            className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
              showTrackSelector ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Mute / Unmute Button */}
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Suarakan Musik' : 'Bisukan Musik'}
          className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors shrink-0 cursor-pointer border-l border-slate-200 pl-2.5"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
