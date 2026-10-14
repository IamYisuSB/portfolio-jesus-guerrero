// Bloque de contacto: email (con botón de copiar), LinkedIn y GitHub.
import { t } from './i18n.js';
import { site } from './data/site.js';

const PLACEHOLDER = '[PLACEHOLDER]';

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Respaldo para navegadores sin Clipboard API o sin permiso
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

/** Enlace a un perfil; si aún es [PLACEHOLDER], se marca y no navega. */
function profile(id, url) {
  const a = document.getElementById(id);
  if (!a) return;
  if (url === PLACEHOLDER || !url) {
    a.classList.add('is-disabled');
    a.removeAttribute('href');
    a.insertAdjacentHTML('beforeend', ' <span class="is-placeholder">URL</span>');
  } else {
    a.href = url;
  }
}

/** Nota del corcho: abre el programa de correo con el mensaje ya escrito. */
function initNote() {
  const form = document.getElementById('note-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const msg = form.elements.message.value.trim();
    if (!msg) {
      form.elements.message.focus();
      form.elements.message.setAttribute('aria-invalid', 'true');
      return;
    }
    form.elements.message.removeAttribute('aria-invalid');
    const subject = t('note.subject') + (name ? ` · ${name}` : '');
    const body = msg + (name ? `\n\n— ${name}` : '');
    // Animación de "clavar" la nota y, después, abrir el correo
    form.classList.remove('is-pinned');
    void form.offsetWidth;
    form.classList.add('is-pinned');
    setTimeout(() => {
      location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 350);
  });
}

export function initContact() {
  const link = document.getElementById('contact-email');
  const btn = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');

  profile('link-linkedin', site.linkedin);
  profile('link-github', site.github);
  initNote();

  if (!link || !btn) return;

  link.textContent = site.email;
  link.href = `mailto:${site.email}`;
  if (site.email === PLACEHOLDER) link.classList.add('is-placeholder');

  let timer;
  btn.addEventListener('click', async () => {
    const ok = await copy(site.email);
    status.textContent = ok ? t('contact.copied') : t('contact.copyError');
    btn.classList.toggle('is-done', ok);
    clearTimeout(timer);
    timer = setTimeout(() => {
      status.textContent = '';
      btn.classList.remove('is-done');
    }, 2500);
  });
}
