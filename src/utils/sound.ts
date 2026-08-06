// Web Audio API Sound Generator & Cheerful BGM Engine for Kids Math Quiz

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public speechEnabled: boolean = true;

  private isBgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  private bgmStep: number = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Cheerful Kids Background Music Loop (Toy Marimba & Music Box Style)
  startBGM() {
    if (!this.enabled || this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.bgmStep = 0;

    // Cheerful C-Major Kids Melody (Frequencies in Hz & Duration in seconds)
    const melody = [
      { note: 659.25, dur: 0.18 }, { note: 783.99, dur: 0.18 }, { note: 1046.5, dur: 0.32 }, { note: 0, dur: 0.12 },
      { note: 880.00, dur: 0.18 }, { note: 783.99, dur: 0.18 }, { note: 659.25, dur: 0.32 }, { note: 0, dur: 0.12 },
      { note: 587.33, dur: 0.18 }, { note: 659.25, dur: 0.18 }, { note: 698.46, dur: 0.32 }, { note: 0, dur: 0.12 },
      { note: 659.25, dur: 0.18 }, { note: 587.33, dur: 0.18 }, { note: 523.25, dur: 0.32 }, { note: 0, dur: 0.12 },

      { note: 523.25, dur: 0.18 }, { note: 659.25, dur: 0.18 }, { note: 783.99, dur: 0.18 }, { note: 1046.5, dur: 0.18 },
      { note: 880.00, dur: 0.18 }, { note: 1046.5, dur: 0.18 }, { note: 783.99, dur: 0.32 }, { note: 0, dur: 0.12 },
      { note: 698.46, dur: 0.18 }, { note: 659.25, dur: 0.18 }, { note: 587.33, dur: 0.18 }, { note: 392.00, dur: 0.18 },
      { note: 523.25, dur: 0.35 }, { note: 0, dur: 0.1 },  { note: 523.25, dur: 0.25 }, { note: 0, dur: 0.15 }
    ];

    const bass = [
      130.81, 0, 196.00, 0, 174.61, 0, 196.00, 0,
      130.81, 0, 196.00, 0, 174.61, 0, 196.00, 0,
      130.81, 0, 196.00, 0, 174.61, 0, 196.00, 0,
      130.81, 0, 196.00, 0, 196.00, 0, 130.81, 0
    ];

    this.bgmTimer = window.setInterval(() => {
      if (!this.enabled || !this.isBgmPlaying) {
        this.stopBGM();
        return;
      }
      try {
        this.initCtx();
        if (!this.ctx) return;

        const step = this.bgmStep % melody.length;
        const item = melody[step];
        const bassFreq = bass[step % bass.length];

        // Play melody note
        if (item.note > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(item.note, this.ctx.currentTime);

          // Soft music box envelope (Volume at 0.035 for gentle background volume)
          gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + item.dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + item.dur + 0.04);
        }

        // Play warm bass note
        if (bassFreq > 0 && step % 2 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();

          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, this.ctx.currentTime);

          bassGain.gain.setValueAtTime(0.025, this.ctx.currentTime);
          bassGain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + 0.3);

          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);

          bassOsc.start();
          bassOsc.stop(this.ctx.currentTime + 0.32);
        }

        this.bgmStep++;
      } catch {
        // Audio error safety
      }
    }, 210); // Bouncy ~140 BPM speed
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer !== null) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio error ignored safely
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch {
      // Audio error ignored
    }
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Audio error ignored
    }
  }

  playTick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Audio error ignored
    }
  }

  playHurry() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio error ignored
    }
  }

  playVictory() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      arpeggio.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.55);
      });
    } catch {
      // Audio error ignored
    }
  }

  speakText(text: string) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech error ignored
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundFx = new SoundEngine();
