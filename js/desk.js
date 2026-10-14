// ============================================================
// Mesa de trabajo: objetos que se arrastran, se lanzan con inercia
// y, con un clic (o Enter), abren la ficha del proyecto.
// ============================================================
import { lang, t } from './i18n.js';
import { projects } from './data/projects.js';
import { openSheet } from './sheet.js';
import { toggleTheme, isDark } from './theme.js';
import { play, soundOn, setSound, MATERIAL } from './sound.js';

const FRICTION = 0.93;      // velocidad que se conserva por frame (a 60 fps)
const BOUNCE = 0.55;        // energía que se conserva al chocar con un borde
const CLICK_PX = 5;         // por debajo de esto, es clic y no arrastre
const MAX_SPEED = 55;       // px/frame, para que un lanzamiento no se dispare
const TILT = 1.1;           // grados de inclinación por px/frame de velocidad
const MAX_TILT = 16;
const LIFT = 1.06;          // escala mientras se arrastra

const mqMobile = matchMedia('(max-width: 820px)');
const mqReduced = matchMedia('(prefers-reduced-motion: reduce)');

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// ---------- Dibujo de cada objeto (HTML/CSS, sin imágenes) ----------

/** Contenido de la foto: captura real si `thumb` existe; si no, una mini web dibujada. */
const pick = (v) => (v && typeof v === 'object' ? v[lang] : v);
const photo = (p) => {
  const src = pick(p.desk.photo) || pick(p.thumb);
  return src
    ? `<img src="${esc(src)}" alt="" loading="lazy" decoding="async" draggable="false">`
    : '<span class="mini-web"><i class="mini-web__bar"></i><i class="mini-web__h"></i><i class="mini-web__p"></i><i class="mini-web__p mini-web__p--short"></i><i class="mini-web__block"></i></span>';
};

const draw = {
  polaroid: (p, c) => `
    <span class="obj-polaroid__photo">${photo(p)}</span>
    <span class="obj-polaroid__caption">${esc(c.title)}</span>`,

  phone: (p, c) => p.desk.screen ? `
    <span class="obj-phone__screen obj-phone__screen--img">
      <img src="${esc(p.desk.screen[lang])}" alt="" width="196" height="400" decoding="async" draggable="false">
    </span>` : `
    <span class="obj-phone__screen">
      <span class="obj-phone__top"><i></i>${esc(c.title)}</span>
      <span class="obj-phone__grid">
        <span class="obj-phone__item"><i></i><b></b></span>
        <span class="obj-phone__item"><i></i><b></b></span>
        <span class="obj-phone__item"><i></i><b></b></span>
        <span class="obj-phone__item"><i></i><b></b></span>
      </span>
      <span class="obj-phone__cta"></span>
    </span>`,

  postit: (p, c) => `
    <span class="obj-postit__tape"></span>
    ${p.photo ? `<span class="obj-postit__photo"><img src="${esc(p.photo)}" alt="" width="64" height="64" decoding="async" draggable="false"><i class="obj-postit__clip"></i></span>` : ''}
    <span class="obj-postit__title">${esc(c.label)}</span>
    <span class="obj-postit__lines"><i></i><i></i><i></i></span>`,

  stamp: () => `
    <svg viewBox="0 0 120 120" class="obj-stamp__svg">
      <defs><path id="stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
      <circle cx="60" cy="60" r="57" class="obj-stamp__ring"/>
      <circle cx="60" cy="60" r="33" class="obj-stamp__ring obj-stamp__ring--thin"/>
      <text class="obj-stamp__around"><textPath href="#stamp-ring">${lang === 'en' ? 'NO FRAMEWORKS · HTML · CSS · JS ·' : 'SIN FRAMEWORKS · HTML · CSS · JS ·'}</textPath></text>
      <text x="60" y="66" class="obj-stamp__aa" text-anchor="middle">&lt;/&gt;</text>
      <text x="60" y="80" class="obj-stamp__wcag" text-anchor="middle">vanilla</text>
    </svg>`,

  cv: () => `
    <span class="obj-cv__head">
      <i class="obj-cv__avatar">JG</i>
      <span class="obj-cv__who"><b>Jesús Guerrero</b><small>${lang === 'en' ? 'Web developer' : 'Desarrollador web'}</small></span>
    </span>
    <span class="obj-cv__lines"><i></i><i></i><i></i><i></i><i></i></span>
    <span class="obj-cv__pdf">PDF ↓</span>`,

  badge: () => `
    <span class="obj-badge__clip"></span>
    <span class="obj-badge__top">${lang === 'en' ? 'OPEN TO WORK' : 'DISPONIBLE'}</span>
    <span class="obj-badge__avatar">JG</span>
    <span class="obj-badge__name">Jesús Guerrero</span>
    <span class="obj-badge__role">${lang === 'en' ? 'Web developer' : 'Desarrollador web'}</span>
    <span class="obj-badge__bar"></span>`,

  ticket: (p, c) => `
    <span class="obj-ticket__main">
      <span class="obj-ticket__kicker">BOARDING PASS</span>
      <span class="obj-ticket__route">GRX <span class="obj-ticket__plane">✈</span> IA</span>
      <span class="obj-ticket__name">${esc(c.title)}</span>
    </span>
    <span class="obj-ticket__stub"><i class="obj-ticket__barcode"></i></span>`,

  key: () => '<span class="obj-key__cap">hola</span>',
};

// ---------- Estado ----------

const objs = [];
let desk, layer, W = 0, H = 0;
let zTop = 10;
let raf = 0;
let lastTime = 0;
let interactive = true; // false en móvil (≤820px)

function render(o) {
  o.el.style.transform =
    `translate3d(${o.x - o.w / 2}px, ${o.y - o.h / 2}px, 0) rotate(${o.rot}deg) scale(${o.scale})`;
}

function measure() {
  W = desk.clientWidth;
  H = desk.clientHeight;
  objs.forEach((o) => {
    o.w = o.el.offsetWidth;
    o.h = o.el.offsetHeight;
  });
}

/** Posición inicial en px a partir de los % del archivo de datos. */
function home(o) {
  return {
    x: clamp((W * o.cfg.x) / 100, o.w / 2, W - o.w / 2),
    y: clamp((H * o.cfg.y) / 100, o.h / 2, H - o.h / 2),
  };
}

function layout() {
  if (!interactive) return;
  measure();
  objs.forEach((o) => {
    if (!o.moved) {
      Object.assign(o, home(o));
    } else {
      o.x = clamp(o.x, o.w / 2, W - o.w / 2);
      o.y = clamp(o.y, o.h / 2, H - o.h / 2);
    }
    render(o);
  });
}

// ---------- Bucle de animación (se para solo) ----------

function kick() {
  if (raf) return;
  lastTime = performance.now();
  raf = requestAnimationFrame(tick);
}

function tick(now) {
  // dt normalizado a frames de 60 fps, para que la física no dependa de la pantalla
  const dt = Math.min(3, (now - lastTime) / 16.667);
  lastTime = now;
  const reduced = mqReduced.matches;
  let busy = false;

  for (const o of objs) {
    if (o.dragging) {
      // Inclinación según la velocidad del arrastre; se endereza si te paras
      o.dragV *= Math.pow(0.8, dt);
      const target = reduced ? o.cfg.rot : o.cfg.rot + clamp(o.dragV * TILT, -MAX_TILT, MAX_TILT);
      o.rot += (target - o.rot) * Math.min(1, 0.25 * dt);
      o.scale += (LIFT - o.scale) * Math.min(1, 0.3 * dt);
      render(o);
      busy = true;
      continue;
    }

    if (o.returning) {
      // "Ordenar la mesa": vuelve a casa con suavizado
      const k = Math.min(1, 0.14 * dt);
      o.x += (o.returning.x - o.x) * k;
      o.y += (o.returning.y - o.y) * k;
      if (Math.abs(o.returning.x - o.x) < 0.5 && Math.abs(o.returning.y - o.y) < 0.5) {
        o.x = o.returning.x;
        o.y = o.returning.y;
        o.returning = null;
      }
    } else if (o.vx || o.vy) {
      // Inercia con fricción
      o.x += o.vx * dt;
      o.y += o.vy * dt;
      const f = Math.pow(FRICTION, dt);
      o.vx *= f;
      o.vy *= f;

      // Rebote en los bordes de la mesa
      const minX = o.w / 2, maxX = W - o.w / 2, minY = o.h / 2, maxY = H - o.h / 2;
      const speed = Math.hypot(o.vx, o.vy);
      const edge = o.x < minX || o.x > maxX || o.y < minY || o.y > maxY;
      if (edge && speed > 4) play(MATERIAL[o.cfg.type], speed / 30);
      if (o.x < minX) { o.x = minX; o.vx = Math.abs(o.vx) * BOUNCE; }
      if (o.x > maxX) { o.x = maxX; o.vx = -Math.abs(o.vx) * BOUNCE; }
      if (o.y < minY) { o.y = minY; o.vy = Math.abs(o.vy) * BOUNCE; }
      if (o.y > maxY) { o.y = maxY; o.vy = -Math.abs(o.vy) * BOUNCE; }

      if (Math.hypot(o.vx, o.vy) < 0.05) o.vx = o.vy = 0;
    }

    // Vuelve suavemente a su rotación base y a su tamaño
    o.rot += (o.cfg.rot - o.rot) * Math.min(1, 0.12 * dt);
    o.scale += (1 - o.scale) * Math.min(1, 0.2 * dt);
    if (Math.abs(o.rot - o.cfg.rot) < 0.05) o.rot = o.cfg.rot;
    if (Math.abs(o.scale - 1) < 0.002) o.scale = 1;

    const moving = o.returning || o.vx || o.vy || o.rot !== o.cfg.rot || o.scale !== 1;
    if (moving) busy = true;
    render(o);
  }

  // Choques entre objetos: si alguno se ha movido, puede empujar a otros
  if (collide(dt, reduced)) {
    busy = true;
    objs.forEach(render);
  }
  objs.forEach((o) => { o.px = o.x; o.py = o.y; });

  raf = busy ? requestAnimationFrame(tick) : 0;
}

// ---------- Choques entre objetos ----------

const HIT_SIZE = 0.82;   // caja de choque algo menor que el objeto (sombras, giro)
const TRANSFER = 0.75;   // parte de la velocidad que se pasa al objeto golpeado

/**
 * Colisión por cajas alineadas (AABB). El objeto en movimiento (lanzado o
 * arrastrado) separa al otro por el eje de menor solapamiento y le transmite
 * su velocidad en ese eje. Devuelve true si hubo algún choque.
 */
function collide(dt, reduced) {
  let hit = false;
  for (const a of objs) {
    if (a.returning || !(a.dragging || a.vx || a.vy)) continue;
    // Velocidad de "a": la de la inercia o, si se arrastra, la del puntero
    const avx = a.dragging ? (a.x - a.px) / dt : a.vx;
    const avy = a.dragging ? (a.y - a.py) / dt : a.vy;

    for (const b of objs) {
      if (b === a || b.dragging || b.returning) continue;
      const ox = ((a.w + b.w) / 2) * HIT_SIZE - Math.abs(a.x - b.x);
      const oy = ((a.h + b.h) / 2) * HIT_SIZE - Math.abs(a.y - b.y);
      if (ox <= 0 || oy <= 0) continue;
      hit = true;
      b.moved = true;
      const sp = Math.hypot(avx, avy);
      if (sp > 2) play(MATERIAL[b.cfg.type], sp / 25);

      if (ox < oy) {
        const s = Math.sign(b.x - a.x) || 1;
        // El arrastrado no cede: aparta al otro entero. Si no, se reparten el empuje.
        if (a.dragging) b.x += s * ox; else { b.x += (s * ox) / 2; a.x -= (s * ox) / 2; }
        if (!reduced) {
          b.vx = avx * TRANSFER + b.vx * 0.2;
          if (!a.dragging) a.vx *= 0.35;
        }
      } else {
        const s = Math.sign(b.y - a.y) || 1;
        if (a.dragging) b.y += s * oy; else { b.y += (s * oy) / 2; a.y -= (s * oy) / 2; }
        if (!reduced) {
          b.vy = avy * TRANSFER + b.vy * 0.2;
          if (!a.dragging) a.vy *= 0.35;
        }
      }
      for (const o of [a, b]) {
        o.x = clamp(o.x, o.w / 2, W - o.w / 2);
        o.y = clamp(o.y, o.h / 2, H - o.h / 2);
      }
    }
  }
  return hit;
}

// ---------- Puntero (ratón y táctil) ----------

function onDown(e, o) {
  if (!interactive || e.button > 0) return;
  o.el.setPointerCapture(e.pointerId);
  o.pointerId = e.pointerId;
  o.start = { x: e.clientX, y: e.clientY };
  o.grab = { x: o.x - e.clientX, y: o.y - e.clientY };
  o.samples = [{ x: e.clientX, y: e.clientY, t: e.timeStamp }];
  o.dragged = false;
  o.vx = o.vy = 0;
  o.returning = null;
}

function onMove(e, o) {
  if (o.pointerId !== e.pointerId) return;

  if (!o.dragged) {
    if (Math.hypot(e.clientX - o.start.x, e.clientY - o.start.y) < CLICK_PX) return;
    // A partir de aquí es un arrastre
    o.dragged = true;
    o.dragging = true;
    o.dragV = 0;
    o.px = o.x;
    o.py = o.y;
    o.el.style.zIndex = ++zTop;
    o.el.classList.add('is-dragging');
    kick();
  }

  const prev = o.samples[o.samples.length - 1];
  const dtf = Math.max(1, e.timeStamp - prev.t) / 16.667;
  o.dragV = o.dragV * 0.6 + ((e.clientX - prev.x) / dtf) * 0.4;

  o.samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
  if (o.samples.length > 6) o.samples.shift();

  o.x = clamp(e.clientX + o.grab.x, o.w / 2, W - o.w / 2);
  o.y = clamp(e.clientY + o.grab.y, o.h / 2, H - o.h / 2);
}

function onUp(e, o) {
  if (o.pointerId !== e.pointerId) return;
  o.pointerId = null;
  if (!o.dragged) return; // es un clic: lo gestiona el evento "click"

  o.dragging = false;
  o.moved = true;
  o.el.classList.remove('is-dragging');
  o.justDragged = true; // anula el "click" que el navegador lanza tras soltar

  // Velocidad de lanzamiento: movimiento de los últimos ~100 ms
  const now = e.timeStamp;
  const recent = o.samples.filter((s) => now - s.t < 100);
  if (!mqReduced.matches && e.type === 'pointerup' && recent.length > 1) {
    const a = recent[0];
    const b = recent[recent.length - 1];
    const frames = Math.max(1, b.t - a.t) / 16.667;
    o.vx = clamp((b.x - a.x) / frames, -MAX_SPEED, MAX_SPEED);
    o.vy = clamp((b.y - a.y) / frames, -MAX_SPEED, MAX_SPEED);
  }
  play(MATERIAL[o.cfg.type], 0.5);
  kick();
}

function onClick(e, o) {
  if (o.justDragged) {
    o.justDragged = false;
    e.preventDefault();
    return;
  }
  // Clic corto o Enter/Espacio con el teclado
  openSheet(o.id, o.el);
}

// ---------- "Ordenar la mesa" ----------

function tidy() {
  measure();
  objs.forEach((o) => {
    o.moved = false;
    o.vx = o.vy = 0;
    const h = home(o);
    if (mqReduced.matches) {
      Object.assign(o, h);
      o.rot = o.cfg.rot;
      render(o);
    } else {
      o.returning = h;
    }
  });
  kick();
}

// ---------- Modo móvil (≤820px): sin arrastre, objetos en columna ----------

function setMode() {
  interactive = !mqMobile.matches;
  desk.classList.toggle('is-static', !interactive);
  if (interactive) {
    layout();
  } else {
    cancelAnimationFrame(raf);
    raf = 0;
    objs.forEach((o) => {
      o.el.style.transform = '';
      o.el.style.zIndex = '';
      o.dragging = false;
      o.el.classList.remove('is-dragging');
    });
  }
}

// ---------- Lámpara: cambia entre modo claro y oscuro ----------

function buildLamp() {
  const lamp = document.createElement('button');
  lamp.type = 'button';
  lamp.className = 'lamp';
  lamp.innerHTML = `
    <span class="lamp__cable" aria-hidden="true"></span>
    <span class="lamp__head" aria-hidden="true">
      <span class="lamp__shade"></span>
      <span class="lamp__bulb"></span>
      <span class="lamp__chain"><i></i></span>
    </span>
    <span class="lamp__light" aria-hidden="true"></span>`;

  const sync = () => {
    const off = isDark();
    lamp.classList.toggle('is-off', off);
    lamp.setAttribute('aria-pressed', String(off));
    lamp.setAttribute('aria-label', t(off ? 'lamp.on' : 'lamp.off'));
    lamp.title = t(off ? 'lamp.on' : 'lamp.off');
  };
  sync();
  document.addEventListener('themechange', sync);

  lamp.addEventListener('click', () => {
    // Tirón de la cadena: balanceo corto y cambio de tema
    lamp.classList.remove('is-pulled');
    void lamp.offsetWidth; // reinicia la animación
    lamp.classList.add('is-pulled');
    play('metal', 0.5);
    toggleTheme();
  });
  return lamp;
}

// ---------- Foco de luz en modo oscuro: sigue al cursor por la mesa ----------

function initSpotlight() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  desk.classList.add('has-spot');
  let frame = 0;
  const move = (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const r = desk.getBoundingClientRect();
      desk.style.setProperty('--mx', `${e.clientX - r.left}px`);
      desk.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  };
  desk.addEventListener('pointermove', move);
  // Al salir, la luz vuelve a la lámpara
  desk.addEventListener('pointerleave', () => {
    desk.style.removeProperty('--mx');
    desk.style.removeProperty('--my');
  });
}

// ---------- Arranque ----------

export function initDesk() {
  desk = document.getElementById('desk');
  if (!desk) return;

  layer = document.createElement('div');
  layer.className = 'desk__objects';

  projects.filter((p) => p.desk).forEach((p, i) => {
    const c = p[lang];
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `desk-obj obj-${p.desk.type}`;
    el.dataset.id = p.id;
    el.style.setProperty('--rot', `${p.desk.rot}deg`);
    el.style.zIndex = 10 + i;
    el.setAttribute('aria-label', `${c.title} — ${c.label}. ${t('desk.objHint')}`);
    el.innerHTML = `<span class="desk-obj__art" aria-hidden="true">${draw[p.desk.type](p, c)}</span>`;
    layer.append(el);

    const o = {
      id: p.id, el, cfg: p.desk,
      x: 0, y: 0, w: 0, h: 0, vx: 0, vy: 0,
      rot: p.desk.rot, scale: 1,
      moved: false, dragging: false, dragged: false, justDragged: false,
      pointerId: null, samples: [], dragV: 0, returning: null,
      px: 0, py: 0, // posición del frame anterior (velocidad al arrastrar)
    };
    objs.push(o);

    el.addEventListener('pointerdown', (e) => onDown(e, o));
    el.addEventListener('pointermove', (e) => onMove(e, o));
    el.addEventListener('pointerup', (e) => onUp(e, o));
    el.addEventListener('pointercancel', (e) => onUp(e, o));
    el.addEventListener('click', (e) => onClick(e, o));
    el.addEventListener('dragstart', (e) => e.preventDefault());
  });

  // Pista y botón de ordenar
  const hint = document.createElement('p');
  hint.className = 'desk__hint mono';
  hint.innerHTML = `<span class="desk__hint-pointer">${esc(t('desk.hint'))}</span><span class="desk__hint-touch">${esc(t('desk.hintTouch'))}</span>`;

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'desk__reset mono';
  reset.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>${esc(t('desk.reset'))}`;
  reset.addEventListener('click', tidy);

  // Sonido: desactivado por defecto
  const sound = document.createElement('button');
  sound.type = 'button';
  sound.className = 'desk__sound';
  const syncSound = () => {
    const on = soundOn();
    sound.setAttribute('aria-pressed', String(on));
    sound.setAttribute('aria-label', t(on ? 'sound.off' : 'sound.on'));
    sound.title = t(on ? 'sound.off' : 'sound.on');
    sound.innerHTML = on
      ? '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>'
      : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
  };
  syncSound();
  sound.addEventListener('click', () => setSound(!soundOn()));
  document.addEventListener('soundchange', syncSound);

  const tools = document.createElement('div');
  tools.className = 'desk__tools';
  tools.append(sound, reset);

  desk.append(layer, hint, tools, buildLamp());
  initSpotlight();

  setMode();
  new ResizeObserver(() => layout()).observe(desk);
  mqMobile.addEventListener('change', setMode);
  // Las fuentes cambian el tamaño de los objetos al cargar
  document.fonts?.ready.then(layout);

  desk.classList.add('is-ready');
}
