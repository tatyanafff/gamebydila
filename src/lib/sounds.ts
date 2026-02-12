const audioCtx = () =>
  new (window.AudioContext || (window as any).webkitAudioContext)();

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
) {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + duration,
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export const sounds = {
  tap: () => playTone(800, 0.08),

  purchase: () => {
    playTone(523, 0.1);
    setTimeout(() => playTone(659, 0.1), 100);
    setTimeout(() => playTone(784, 0.15), 200);
  },

  outfit: () => {
    playTone(440, 0.08);
    setTimeout(() => playTone(660, 0.12), 80);
  },

  shutter: () => {
    playTone(1200, 0.05);
    setTimeout(() => playTone(800, 0.08), 60);
  },

  welcome: () => {
    playTone(392, 0.15);
    setTimeout(() => playTone(523, 0.15), 150);
    setTimeout(() => playTone(659, 0.2), 300);
  },
};
