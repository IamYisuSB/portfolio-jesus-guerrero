// ============================================================
// Cajón secreto: un tirador en el borde inferior de la mesa abre un
// cajón con lo personal (aficiones, música, un dato curioso y un secreto).
// ============================================================
import { lang } from './i18n.js';
import { drawer } from './data/drawer.js';
import { play } from './sound.js';

const PLACEHOLDER = '[PLACEHOLDER]';
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (s) => (s === PLACEHOLDER ? `<span class="is-placeholder">${s}</span>` : esc(s));

const L = {
  es: {
    open: 'Abrir el cajón', close: 'Cerrar el cajón', handle: 'cajón',
    hobbies: 'Cuando no programo', music: 'Mi banda sonora', fact: 'Datos curiosos',
    secret: 'Has encontrado el cajón 🎉',
    secretText: 'Te cuento otro secreto: esta web tiene una terminal escondida. Pulsa la tecla <kbd>º</kbd> (a la izquierda del 1) o el botón de abajo.',
    terminal: 'Abrir la terminal',
  },
  en: {
    open: 'Open the drawer', close: 'Close the drawer', handle: 'drawer',
    hobbies: 'When I\'m not coding', music: 'My coding soundtrack', fact: 'Fun facts',
    secret: 'You found the drawer 🎉',
    secretText: 'Here\'s another secret: this site has a hidden terminal. Press the <kbd>`</kbd> key (left of 1) or the button below.',
    terminal: 'Open the terminal',
  },
}[lang];

const ICON = {
  hobbies: '<path d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.4 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21z"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  fact: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z"/>',
  secret: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

function item(k, title, body, cls = '') {
  return `
    <article class="drawer__item ${cls}">
      <span class="drawer__icon">${icon(k)}</span>
      <h3 class="drawer__title">${title}</h3>
      ${body}
    </article>`;
}

export function initDrawer() {
  const desk = document.getElementById('desk');
  if (!desk) return;

  // Panel del cajón, justo debajo de la mesa
  const panel = document.createElement('div');
  panel.className = 'drawer';
  panel.id = 'drawer';
  panel.hidden = true;
  const li = (arr) => `<ul>${arr[lang].map((x) => `<li>${text(x)}</li>`).join('')}</ul>`;
  const songs = `<div class="drawer__songs">${drawer.music.map((song) => `
    <a class="drawer__song" href="${esc(song.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${song.title} — ${song.artist}`)}">
      <img class="drawer__song-cover" src="${esc(song.cover)}" alt="" width="56" height="56" loading="lazy">
      <span class="drawer__song-info">
        <span class="drawer__song-title">${esc(song.title)}</span>
        <span class="drawer__song-artist">${esc(song.artist)}</span>
      </span>
    </a>`).join('')}</div>`;
  panel.innerHTML = `
    <div class="drawer__inner">
      <div class="drawer__box">
        ${item('hobbies', L.hobbies, li(drawer.hobbies))}
        ${item('music', L.music, songs)}
        ${item('fact', L.fact, li(drawer.fact))}
        ${item('secret', L.secret, `<p>${L.secretText}</p><button class="btn btn--ink btn--sm" type="button" data-open-terminal>&gt;_ ${L.terminal}</button>`, 'drawer__item--secret')}
      </div>
    </div>`;
  desk.after(panel);

  // Tirador en el borde inferior de la mesa
  const handle = document.createElement('button');
  handle.type = 'button';
  handle.className = 'drawer-handle';
  handle.setAttribute('aria-controls', 'drawer');
  handle.innerHTML = `<span class="drawer-handle__bar" aria-hidden="true"></span><span class="drawer-handle__label mono">${L.handle}</span>`;

  const sync = (open) => {
    handle.setAttribute('aria-expanded', String(open));
    handle.setAttribute('aria-label', open ? L.close : L.open);
    handle.title = open ? L.close : L.open;
  };
  sync(false);

  handle.addEventListener('click', () => {
    const open = panel.hidden;
    play('plastic', 0.6);
    if (open) {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-open'));
      setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 250);
    } else {
      panel.classList.remove('is-open');
      setTimeout(() => { panel.hidden = true; }, 450);
    }
    sync(open);
  });
  desk.append(handle);
}
