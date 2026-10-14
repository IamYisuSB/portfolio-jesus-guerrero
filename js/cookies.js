// ============================================================
// Banner de cookies.
//
// Hoy la web solo usa almacenamiento imprescindible (la preferencia de tema
// y la propia elección de cookies), que no necesita consentimiento. El banner
// informa y guarda la elección para cuando se añadan cookies opcionales
// (por ejemplo, analítica): se consultan con hasConsent('analytics') y se
// escucha el evento 'cookieconsent' para activarlas después de aceptar.
// ============================================================
import { lang, t } from './i18n.js';

const KEY = 'cookie-consent';
const VERSION = 1; // súbelo si cambian las categorías: el banner vuelve a salir

const policyUrl = lang === 'en' ? '/en/cookies/' : '/cookies/';

function read() {
  try {
    const c = JSON.parse(localStorage.getItem(KEY));
    return c && c.v === VERSION ? c : null;
  } catch {
    return null;
  }
}

function save(analytics) {
  const choice = { v: VERSION, necessary: true, analytics, date: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch {}
  document.dispatchEvent(new CustomEvent('cookieconsent', { detail: choice }));
  return choice;
}

/** ¿El visitante aceptó esta categoría? ('necessary' siempre es true) */
export function hasConsent(category) {
  if (category === 'necessary') return true;
  return Boolean(read()?.[category]);
}

let banner;

function build() {
  banner = document.createElement('section');
  banner.className = 'cookies';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', t('cookies.label'));
  banner.innerHTML = `
    <p class="cookies__title">${t('cookies.title')}</p>
    <p class="cookies__text">${t('cookies.text')} <a href="${policyUrl}">${t('cookies.more')}</a></p>
    <div class="cookies__actions">
      <button class="btn btn--ghost btn--sm" type="button" data-cookies="reject">${t('cookies.reject')}</button>
      <button class="btn btn--accent btn--sm" type="button" data-cookies="accept">${t('cookies.accept')}</button>
    </div>`;
  document.body.append(banner);

  banner.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cookies]');
    if (!b) return;
    save(b.dataset.cookies === 'accept');
    hide();
  });
}

function show() {
  if (!banner) build();
  banner.hidden = false;
  requestAnimationFrame(() => banner.classList.add('is-open'));
}

function hide() {
  banner.classList.remove('is-open');
  banner.hidden = true;
}

export function initCookies() {
  if (!read()) show();

  // Enlace "Configurar cookies" del pie: vuelve a mostrar el banner
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cookie-settings]');
    if (!b) return;
    e.preventDefault();
    show();
    banner.querySelector('[data-cookies="accept"]').focus();
  });
}
