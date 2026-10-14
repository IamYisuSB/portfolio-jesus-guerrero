// ============================================================
// Terminal oculta: se abre con la tecla a la izquierda del 1
// (º en teclado español, ` en inglés) o desde el pie de página.
// Comandos en español e inglés: help, proyectos, abrir, cv, contacto…
// ============================================================
import { lang } from './i18n.js';
import { projects } from './data/projects.js';
import { site } from './data/site.js';
import { openSheet } from './sheet.js';
import { toggleTheme } from './theme.js';
import { soundOn, setSound } from './sound.js';

const L = {
  es: {
    title: 'jesus@portfolio: ~',
    label: 'Terminal',
    close: 'Cerrar terminal',
    welcome: 'Bienvenido a la terminal del portfolio. Escribe <b>help</b> para ver los comandos.',
    unknown: (c) => `Comando no encontrado: ${c}. Prueba con <b>help</b>.`,
    help: [
      ['help', 'muestra esta ayuda'],
      ['whoami', 'quién soy'],
      ['proyectos', 'lista de proyectos'],
      ['abrir &lt;n&gt;', 'abre la ficha del proyecto n'],
      ['cv', 'abre mi currículum'],
      ['contacto', 'email y perfiles'],
      ['email', 'copia mi email'],
      ['tema', 'cambia entre claro y oscuro'],
      ['sonido', 'activa o silencia el sonido'],
      ['clear', 'limpia la pantalla'],
      ['exit', 'cierra la terminal'],
    ],
    whoami: 'Jesús Guerrero · Desarrollador web en Granada. WordPress, WooCommerce, JavaScript e IA aplicada. Buscando mi próximo equipo.',
    projectsHint: 'Escribe <b>abrir 1</b> (o el número que quieras) para ver la ficha.',
    noProject: 'No existe ese proyecto. Escribe <b>proyectos</b> para ver la lista.',
    opening: (t) => `Abriendo «${t}»…`,
    copied: 'Email copiado al portapapeles.',
    theme: 'Tema cambiado.',
    soundOn: 'Sonido activado.',
    soundOff: 'Sonido silenciado.',
    cv: 'Abriendo el currículum…',
    hire: '🎉 Permiso concedido. Excelente decisión: escríbeme y hablamos.',
    coffee: '☕ Recargando… listo. Seguimos programando.',
    sudo: 'Buen intento 😏 Prueba con <b>sudo contratar</b>.',
  },
  en: {
    title: 'jesus@portfolio: ~',
    label: 'Terminal',
    close: 'Close terminal',
    welcome: 'Welcome to the portfolio terminal. Type <b>help</b> to see the commands.',
    unknown: (c) => `Command not found: ${c}. Try <b>help</b>.`,
    help: [
      ['help', 'show this help'],
      ['whoami', 'who I am'],
      ['projects', 'list projects'],
      ['open &lt;n&gt;', 'open project n'],
      ['cv', 'open my résumé'],
      ['contact', 'email and profiles'],
      ['email', 'copy my email'],
      ['theme', 'toggle light/dark mode'],
      ['sound', 'turn sound on or off'],
      ['clear', 'clear the screen'],
      ['exit', 'close the terminal'],
    ],
    whoami: 'Jesús Guerrero · Web developer in Granada, Spain. WordPress, WooCommerce, JavaScript and applied AI. Looking for my next team.',
    projectsHint: 'Type <b>open 1</b> (or any number) to see the details.',
    noProject: 'That project does not exist. Type <b>projects</b> to see the list.',
    opening: (t) => `Opening "${t}"…`,
    copied: 'Email copied to the clipboard.',
    theme: 'Theme switched.',
    soundOn: 'Sound on.',
    soundOff: 'Sound muted.',
    cv: 'Opening the résumé…',
    hire: '🎉 Permission granted. Great call: drop me a line and let\'s talk.',
    coffee: '☕ Recharging… done. Back to coding.',
    sudo: 'Nice try 😏 Try <b>sudo hire-me</b>.',
  },
}[lang];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const link = (url, text = url) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(text)}</a>`;
const isUrl = (u) => typeof u === 'string' && /^https?:\/\//.test(u);
const cvUrl = lang === 'en' ? '/en/cv/' : '/cv/';

let box, out, input, lastFocus = null;
const history = [];
let hIndex = 0;

const list = () => projects.filter((p) => p.inGrid);

function print(html, cls = '') {
  const line = document.createElement('div');
  line.className = `term__line ${cls}`;
  line.innerHTML = html;
  out.append(line);
  out.scrollTop = out.scrollHeight;
}

// Alias en español e inglés → comando
const ALIAS = {
  help: 'help', ayuda: 'help', '?': 'help',
  whoami: 'whoami', sobre: 'whoami', about: 'whoami',
  proyectos: 'projects', projects: 'projects', ls: 'projects',
  abrir: 'open', open: 'open',
  cv: 'cv', curriculum: 'cv', resume: 'cv',
  contacto: 'contact', contact: 'contact',
  email: 'email', correo: 'email',
  tema: 'theme', theme: 'theme',
  sonido: 'sound', sound: 'sound',
  clear: 'clear', limpiar: 'clear', cls: 'clear',
  exit: 'exit', salir: 'exit', quit: 'exit',
  github: 'github', linkedin: 'linkedin',
  cafe: 'coffee', 'café': 'coffee', coffee: 'coffee',
  sudo: 'sudo',
};

const COMMANDS = {
  help() {
    print(L.help.map(([c, d]) => `<span class="term__cmd">${c.padEnd(14, ' ').replace(/ /g, '&nbsp;')}</span>${d}`).join('<br>'));
  },
  whoami() { print(esc(L.whoami)); },
  projects() {
    print(list().map((p, i) => `<span class="term__num">${String(i + 1).padStart(2, ' ').replace(' ', '&nbsp;')}</span> ${esc(p[lang].title)} <span class="term__dim">· ${esc(p[lang].label)}</span>`).join('<br>'));
    print(L.projectsHint, 'term__dim');
  },
  open(arg) {
    const items = list();
    const n = Number(arg);
    const p = Number.isInteger(n) && n >= 1 ? items[n - 1] : items.find((x) => x.id === arg);
    if (!p) return print(L.noProject, 'term__err');
    print(esc(L.opening(p[lang].title)));
    setTimeout(() => { close(); openSheet(p.id); }, 250);
  },
  cv() { print(L.cv); setTimeout(() => { location.href = cvUrl; }, 300); },
  contact() {
    const rows = [`email&nbsp;&nbsp;&nbsp; <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`];
    if (isUrl(site.linkedin)) rows.push(`linkedin ${link(site.linkedin)}`);
    if (isUrl(site.github)) rows.push(`github&nbsp;&nbsp; ${link(site.github)}`);
    print(rows.join('<br>'));
  },
  async email() {
    try { await navigator.clipboard.writeText(site.email); print(L.copied); } catch { print(esc(site.email)); }
  },
  theme() { toggleTheme(); print(L.theme); },
  sound() { setSound(!soundOn()); print(soundOn() ? L.soundOn : L.soundOff); },
  clear() { out.innerHTML = ''; },
  exit() { close(); },
  github() { if (isUrl(site.github)) window.open(site.github, '_blank', 'noopener'); },
  linkedin() { if (isUrl(site.linkedin)) window.open(site.linkedin, '_blank', 'noopener'); },
  coffee() { print(L.coffee); },
  sudo(arg) { print(/^(contratar|hire-me|hire)$/i.test(arg) ? L.hire : L.sudo, /^(contratar|hire-me|hire)$/i.test(arg) ? 'term__ok' : ''); },
};

function run(raw) {
  const line = raw.trim();
  print(`<span class="term__prompt">$</span> ${esc(line)}`, 'term__echo');
  if (!line) return;
  history.push(line);
  hIndex = history.length;
  const [name, ...rest] = line.split(/\s+/);
  const cmd = ALIAS[name.toLowerCase()];
  if (!cmd) return print(L.unknown(esc(name)), 'term__err');
  COMMANDS[cmd](rest.join(' '));
}

function build() {
  box = document.createElement('section');
  box.className = 'term';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', L.label);
  box.innerHTML = `
    <div class="term__bar">
      <span class="term__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="term__title mono">${esc(L.title)}</span>
      <button class="term__close" type="button" aria-label="${esc(L.close)}">×</button>
    </div>
    <div class="term__out mono" aria-live="polite"></div>
    <form class="term__form mono" autocomplete="off">
      <label class="term__prompt" for="term-input">$</label>
      <input class="term__input" id="term-input" type="text" spellcheck="false" autocapitalize="off">
    </form>`;
  document.body.append(box);
  out = box.querySelector('.term__out');
  input = box.querySelector('.term__input');

  box.querySelector('.term__close').addEventListener('click', close);
  box.querySelector('.term__form').addEventListener('submit', (e) => {
    e.preventDefault();
    run(input.value);
    input.value = '';
  });
  box.addEventListener('click', (e) => { if (!e.target.closest('a, button')) input.focus(); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      hIndex = Math.max(0, hIndex - 1);
      input.value = history[hIndex];
    }
    if (e.key === 'ArrowDown' && history.length) {
      e.preventDefault();
      hIndex = Math.min(history.length, hIndex + 1);
      input.value = history[hIndex] ?? '';
    }
    if (e.key === 'Tab') {
      // Autocompletado del comando
      e.preventDefault();
      const v = input.value.toLowerCase();
      const match = Object.keys(ALIAS).find((k) => k.startsWith(v) && v);
      if (match) input.value = match + ' ';
    }
  });

  print(L.welcome, 'term__dim');
}

export function open() {
  if (!box) build();
  lastFocus = document.activeElement;
  box.hidden = false;
  requestAnimationFrame(() => box.classList.add('is-open'));
  input.focus();
}

export function close() {
  if (!box || box.hidden) return;
  box.classList.remove('is-open');
  box.hidden = true;
  lastFocus?.focus?.({ preventScroll: true });
}

export function initTerminal() {
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Backquote' || e.ctrlKey || e.metaKey || e.altKey) return;
    const tgt = e.target;
    const typing = tgt.closest?.('input, textarea, select, [contenteditable="true"]');
    if (typing && tgt !== input) return;
    e.preventDefault();
    box && !box.hidden ? close() : open();
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-terminal]')) { e.preventDefault(); open(); }
  });
}
