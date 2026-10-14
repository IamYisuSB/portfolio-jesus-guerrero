// ============================================================
// Sonidos suaves de la mesa, sintetizados con Web Audio (sin archivos).
// Desactivados por defecto; la elección se guarda en el navegador.
// Materiales: 'paper' (roce), 'plastic' (golpe seco), 'metal' (tintineo).
// ============================================================
const KEY = 'sound';
let ctx = null;
let enabled = false;
try { enabled = localStorage.getItem(KEY) === 'on'; } catch {}

export const soundOn = () => enabled;

export function setSound(on) {
  enabled = on;
  try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch {}
  document.dispatchEvent(new CustomEvent('soundchange', { detail: { on } }));
  if (on) play('paper', 0.6); // pequeña confirmación
}

function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/** Ruido blanco corto (para el papel) */
function noise(a, dur) {
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource();
  src.buffer = buf;
  return src;
}

/** Envolvente: sube rápido y se apaga en `dur` segundos */
function env(a, peak, dur) {
  const g = a.createGain();
  const t = a.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(a.destination);
  return g;
}

let last = 0;
/** Reproduce el sonido de un material. strength: 0–1 */
export function play(material, strength = 0.6) {
  if (!enabled) return;
  const now = performance.now();
  if (now - last < 60) return; // evita ráfagas en choques seguidos
  last = now;

  const a = audio();
  const vol = 0.04 + 0.12 * Math.min(1, Math.max(0, strength));
  const t = a.currentTime;

  if (material === 'paper') {
    const src = noise(a, 0.12);
    const f = a.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 2200;
    f.Q.value = 0.8;
    src.connect(f).connect(env(a, vol, 0.12));
    src.start(t);
  } else if (material === 'plastic') {
    const o = a.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(420, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 0.08);
    o.connect(env(a, vol * 1.4, 0.09));
    o.start(t);
    o.stop(t + 0.1);
  } else {
    // metal: dos parciales inarmónicos que se apagan despacio
    for (const [freq, k] of [[1320, 1], [2140, 0.5]]) {
      const o = a.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq;
      o.connect(env(a, vol * 0.6 * k, 0.45));
      o.start(t);
      o.stop(t + 0.5);
    }
  }
}

/** Material de cada tipo de objeto de la mesa */
export const MATERIAL = {
  polaroid: 'paper', cv: 'paper', postit: 'paper', ticket: 'paper', stamp: 'paper',
  phone: 'plastic', key: 'plastic', badge: 'plastic',
};
