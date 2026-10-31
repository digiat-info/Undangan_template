import { AdatSuite } from '../data/adatSuites';

class AdatAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentSuite: AdatSuite | null = null;
  private stepIndex: number = 0;
  private masterGain: GainNode | null = null;
  private volume: number = 0.65;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Plays a warm ceremonial Gong Ageng & Kempul strike when opening the wax seal or switching Adat
   */
  public playCeremonialGong(droneHz: number = 146.83) {
    try {
      const ctx = this.ensureContext();
      if (!this.masterGain) return;
      const now = ctx.currentTime;

      // Deep Gong Ageng fundamental + ombak shimmer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      subOsc.type = 'triangle';

      osc1.frequency.setValueAtTime(droneHz, now);
      // Traditional Javanese/Balinese ombak (beating wave)
      osc2.frequency.setValueAtTime(droneHz + 1.8, now);
      subOsc.frequency.setValueAtTime(droneHz * 0.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 4.2);

      osc1.connect(gain);
      osc2.connect(gain);
      subOsc.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);

      osc1.stop(now + 4.3);
      osc2.stop(now + 4.3);
      subOsc.stop(now + 4.3);
    } catch {
      // Ignore audio errors if blocked before gesture
    }
  }

  private triggerMelodyNote(freq: number, timbre: AdatSuite['musicTrack']['timbre'], isStrongBeat: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    if (timbre === 'gamelan') {
      // Bronze Saron / Bonang with overtone harmonic
      const oscFund = this.ctx.createOscillator();
      const oscHarm = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      oscFund.type = 'sine';
      oscHarm.type = 'triangle';
      oscFund.frequency.setValueAtTime(freq, now);
      oscHarm.frequency.setValueAtTime(freq * 2.756, now); // Metallophone partial

      const harmGain = this.ctx.createGain();
      harmGain.gain.setValueAtTime(0.12, now);
      harmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(isStrongBeat ? 0.22 : 0.14, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 2.1);

      oscFund.connect(gain);
      oscHarm.connect(harmGain);
      harmGain.connect(gain);
      gain.connect(this.masterGain);

      oscFund.start(now);
      oscHarm.start(now);
      oscFund.stop(now + 2.15);
      oscHarm.stop(now + 0.5);
    } else if (timbre === 'rindik') {
      // Balinese Bamboo Rindik + paired ombak shimmer
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq + 2.4, now); // Balinese Ngumbang-Ngisep shimmer

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);
    } else if (timbre === 'kacapi' || timbre === 'kecapi_bugis' || timbre === 'hasapi') {
      // Plucked Zither / Lute string envelope + gentle Suling air on strong beats
      const osc = this.ctx.createOscillator();
      const oscOctave = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      oscOctave.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      oscOctave.frequency.setValueAtTime(freq * 2, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.frequency.exponentialRampToValueAtTime(480, now + 0.9);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.45);

      osc.connect(filter);
      oscOctave.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      oscOctave.start(now);
      osc.stop(now + 1.5);
      oscOctave.stop(now + 1.5);

      // Gentle Suling / flute breath on every 4th beat
      if (isStrongBeat && timbre === 'kacapi') {
        const flute = this.ctx.createOscillator();
        const fluteGain = this.ctx.createGain();
        flute.type = 'sine';
        flute.frequency.setValueAtTime(freq * 2, now + 0.12);
        flute.frequency.exponentialRampToValueAtTime(freq * 2.015, now + 1.4);

        fluteGain.gain.setValueAtTime(0.001, now + 0.12);
        fluteGain.gain.linearRampToValueAtTime(0.065, now + 0.45);
        fluteGain.gain.exponentialRampToValueAtTime(0.0008, now + 1.75);

        flute.connect(fluteGain);
        fluteGain.connect(this.masterGain);
        flute.start(now + 0.12);
        flute.stop(now + 1.8);
      }
    } else if (timbre === 'talempong') {
      // Minang Talempong kettle gong + Saluang sustain
      const osc = this.ctx.createOscillator();
      const metal = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      metal.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      metal.frequency.setValueAtTime(freq * 1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.19, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      osc.connect(gain);
      metal.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      metal.start(now);
      osc.stop(now + 1.0);
      metal.stop(now + 1.0);
    }
  }

  public start(suite: AdatSuite) {
    this.ensureContext();
    this.currentSuite = suite;

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }

    this.isPlaying = true;
    this.stepIndex = 0;

    // Play opening ceremonial gong
    this.playCeremonialGong(suite.musicTrack.droneHz);

    const stepDurationMs = Math.round((60 / suite.musicTrack.bpm / 2) * 1000);

    // Melodic contour patterns inspired by traditional gending & kotekan cycles
    const melodicPattern = [0, 1, 2, 4, 3, 2, 1, 3, 4, 5, 4, 2, 3, 1, 2, 0];

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || !this.currentSuite) return;
      const track = this.currentSuite.musicTrack;
      const notes = track.notesHz;

      // Strike Gong Ageng on cycle boundary (every 16 eighth-steps = 1 gongan)
      if (this.stepIndex % 16 === 0 && this.stepIndex > 0) {
        this.playCeremonialGong(track.droneHz);
      }

      const patternIdx = melodicPattern[this.stepIndex % melodicPattern.length] % notes.length;
      const noteFreq = notes[patternIdx];
      const isStrongBeat = this.stepIndex % 4 === 0;

      this.triggerMelodyNote(noteFreq, track.timbre, isStrongBeat);

      // Interlocking Kempyung / Kotekan fifth harmony on off-beats
      if (this.stepIndex % 2 === 1) {
        const harmonyIdx = (patternIdx + 2) % notes.length;
        window.setTimeout(() => {
          if (this.isPlaying && this.currentSuite) {
            this.triggerMelodyNote(notes[harmonyIdx] * 0.5, track.timbre, false);
          }
        }, stepDurationMs * 0.48);
      }

      this.stepIndex++;
    }, stepDurationMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public switchSuite(suite: AdatSuite) {
    this.currentSuite = suite;
    if (this.isPlaying) {
      this.start(suite);
    }
  }
}

export const adatAudio = new AdatAudioEngine();
