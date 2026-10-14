import { t } from './i18n.js';

const root = document.documentElement;
const mq = matchMedia('(prefers-color-scheme: dark)');

function stored() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}

export const isDark = () => root.dataset.theme === 'dark';

/** Avisa a quien muestre el tema (botón del menú, lámpara de la mesa). */
function notify() {
  document.dispatchEvent(new CustomEvent('themechange', { detail: { dark: isDark() } }));
}

/** Cambia entre claro y oscuro y guarda la elección. */
export function toggleTheme() {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  notify();
}

function updateButton(btn) {
  btn.setAttribute('aria-pressed', String(isDark()));
  btn.setAttribute('aria-label', t(isDark() ? 'theme.toLight' : 'theme.toDark'));
}

export function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    updateButton(btn);
    btn.addEventListener('click', toggleTheme);
    document.addEventListener('themechange', () => updateButton(btn));
  }

  // Si el usuario nunca eligió, seguir los cambios del sistema
  mq.addEventListener('change', (e) => {
    if (stored()) return;
    root.dataset.theme = e.matches ? 'dark' : 'light';
    notify();
  });
}
