// Ficha en <dialog> modal. La usan la mesa y la sección de proyectos.
// - Proyecto: galería de capturas + descripción + filas + barra lateral (tipo, año,
//   tecnologías, herramientas, enlaces).
// - Resto (CV, sobre mí, contacto…): ficha sencilla.
// Se cierra con la X, con Esc (nativo del <dialog>) o haciendo clic fuera.
import { lang, t } from './i18n.js';
import { getProject } from './data/projects.js';
import { site } from './data/site.js';

const PLACEHOLDER = '[PLACEHOLDER]';
let dialog;
let lastTrigger = null;
let gallery = null; // { items, index }

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Texto con marca visual si aún es [PLACEHOLDER]. */
const text = (s) => (s === PLACEHOLDER ? `<span class="is-placeholder">${s}</span>` : esc(s));

const isRealUrl = (u) => typeof u === 'string' && /^https?:\/\//.test(u);
/** Ruta de una imagen: texto, o { es, en } si cambia según el idioma. */
const srcOf = (src) => (typeof src === 'string' ? src : src[lang]);
const chips = (list, cls = '') => `<ul class="sheet__chips mono ${cls}" role="list">${list.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`;

function build() {
  dialog = document.createElement('dialog');
  dialog.className = 'sheet';
  dialog.setAttribute('aria-labelledby', 'sheet-title');
  dialog.innerHTML = `
    <div class="sheet__inner">
      <button class="sheet__close icon-btn" type="button" aria-label="${esc(t('sheet.close'))}">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="sheet__body"></div>
    </div>`;
  document.body.append(dialog);

  dialog.querySelector('.sheet__close').addEventListener('click', close);

  dialog.addEventListener('click', (e) => {
    // Clic fuera: el clic cae en el propio <dialog> (zona del backdrop)
    if (e.target === dialog) return close();
    // Enlaces internos (ej. "#contacto"): cerrar antes de navegar
    if (e.target.closest('a[href^="#"]')) return close();
    // Tira de capturas de la ficha tipo tienda
    const shot = e.target.closest('[data-store]');
    if (shot) {
      const strip = dialog.querySelector('.store__shots');
      const dir = shot.dataset.store === 'next' ? 1 : -1;
      strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: 'smooth' });
      return;
    }
    // Galería
    const nav = e.target.closest('[data-gallery]');
    if (nav) {
      const v = nav.dataset.gallery;
      showSlide(v === 'prev' ? gallery.index - 1 : v === 'next' ? gallery.index + 1 : Number(v));
    }
  });

  // Flechas del teclado dentro de la galería
  dialog.addEventListener('keydown', (e) => {
    if (!gallery || !e.target.closest('.gallery')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); showSlide(gallery.index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); showSlide(gallery.index + 1); }
  });

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('has-sheet');
    lastTrigger?.focus({ preventScroll: true });
    lastTrigger = null;
  });
}

// ---------- Galería ----------

function galleryHTML(p) {
  const items = p.gallery || [];
  if (!items.length) {
    return `
      <div class="gallery gallery--empty" aria-hidden="true">
        <div class="gallery__stage card__mock" data-mock="${p.id}">
          <span class="card__mock-bar"><i></i><i></i><i></i></span>
          <span class="card__mock-title">${esc(p[lang].title)}</span>
          <span class="card__mock-lines"><i></i><i></i><i></i></span>
        </div>
      </div>`;
  }
  const many = items.length > 1;
  return `
    <div class="gallery">
      <div class="gallery__stage">
        <img class="gallery__img" src="${esc(srcOf(items[0].src))}" alt="${esc(items[0].alt?.[lang] ?? '')}" width="1280" height="800" decoding="async">
        ${many ? `
          <button class="gallery__nav gallery__nav--prev" type="button" data-gallery="prev" aria-label="${esc(t('gallery.prev'))}">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
          </button>
          <button class="gallery__nav gallery__nav--next" type="button" data-gallery="next" aria-label="${esc(t('gallery.next'))}">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
          </button>
          <span class="gallery__counter mono" aria-live="polite">1 / ${items.length}</span>` : ''}
      </div>
      ${many ? `
        <div class="gallery__thumbs">
          ${items.map((it, i) => `
            <button class="gallery__thumb" type="button" data-gallery="${i}" aria-current="${i === 0}"
                    aria-label="${esc(t('gallery.go').replace('{n}', i + 1).replace('{total}', items.length))}">
              <img src="${esc(srcOf(it.src))}" alt="" width="160" height="100" decoding="async">
            </button>`).join('')}
        </div>` : ''}
    </div>`;
}

function showSlide(i) {
  const { items } = gallery;
  gallery.index = (i + items.length) % items.length;
  const it = items[gallery.index];
  const img = dialog.querySelector('.gallery__img');
  img.src = srcOf(it.src);
  img.alt = it.alt?.[lang] ?? '';
  dialog.querySelector('.gallery__counter').textContent = `${gallery.index + 1} / ${items.length}`;
  dialog.querySelectorAll('.gallery__thumb').forEach((b, n) => b.setAttribute('aria-current', String(n === gallery.index)));
}

// ---------- Ficha tipo Google Play (apps) ----------

function playBadge(p) {
  const [w, h] = lang === 'es' ? [646, 192] : [564, 168];
  const img = `<img class="store__badge-img" src="/img/badges/google-play-${lang}.webp" alt="${esc(t('store.badgeAlt'))}" width="${w}" height="${h}">`;
  if (isRealUrl(p.store.playStore)) {
    return `<a class="store__badge" href="${esc(p.store.playStore)}" target="_blank" rel="noopener">${img}</a>`;
  }
  // Sin enlace todavía: insignia visible pero inactiva
  return `<span class="store__badge is-soon">${img}<span class="store__soon mono">${t('store.soon')}</span></span>`;
}

function storeHTML(p) {
  const c = p[lang];
  const shots = p.gallery.map((it) => `
    <li><img src="${esc(srcOf(it.src))}" alt="${esc(it.alt?.[lang] ?? '')}" width="540" height="960" loading="lazy" decoding="async"></li>`).join('');
  return `
    <div class="store">
      <img class="store__banner" src="${esc(p.store.banner)}" alt="${esc(c.title)}" width="1024" height="500" decoding="async">
      <div class="store__head">
        <img class="store__icon" src="${esc(p.store.icon)}" alt="" width="96" height="96">
        <div class="store__meta">
          <p class="store__name">${esc(c.title)}</p>
          <p class="store__dev">${esc(site.name)}</p>
          <p class="store__cat mono">${esc(p.store.category[lang])}</p>
        </div>
        ${playBadge(p)}
      </div>
      <div class="store__shots-wrap">
        <ul class="store__shots" role="list" tabindex="0" aria-label="${esc(t('store.shots'))}">${shots}</ul>
        <button class="gallery__nav gallery__nav--prev" type="button" data-store="prev" aria-label="${esc(t('gallery.prev'))}">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
        </button>
        <button class="gallery__nav gallery__nav--next" type="button" data-store="next" aria-label="${esc(t('gallery.next'))}">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>`;
}

// ---------- "Cómo está hecha": fragmentos de código ----------

// Resaltado mínimo: comentarios, textos, palabras clave, números y etiquetas HTML
const TOKENS = /(\/\/.*$)|('(?:[^'\\]|\\.)*')|\b(const|let|var|if|else|return|function|true|false)\b|\b(\d+(?:\.\d+)?)\b|(<\/?[a-z]+>?)/gm;

function highlight(src) {
  let out = '';
  let last = 0;
  src.replace(TOKENS, (m, com, str, kw, num, tag, idx) => {
    out += esc(src.slice(last, idx));
    const cls = com ? 'c' : str ? 's' : kw ? 'k' : num ? 'n' : 't';
    out += `<span class="tk-${cls}">${esc(m)}</span>`;
    last = idx + m.length;
    return m;
  });
  return out + esc(src.slice(last));
}

function codeHTML(p) {
  if (!p.code?.length) return '';
  return `
    <section class="howto">
      <h3 class="howto__title">${t('sheet.how')}</h3>
      ${p.code.map((s, i) => `
        <details class="howto__item"${i === 0 ? ' open' : ''}>
          <summary>${esc(s.title[lang])}</summary>
          <pre class="howto__code"><code>${highlight(s[lang])}</code></pre>
        </details>`).join('')}
    </section>`;
}

// ---------- Contenido ----------

function rows(p, c) {
  if (c.rows === null) return '';
  const items = [
    ['sheet.role', c.role],
    ['sheet.challenge', c.challenge],
    ['sheet.work', c.work],
    ['sheet.result', c.result],
  ].filter(([, v]) => v !== undefined);
  return `
    <dl class="sheet__rows">
      ${items.map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${text(v)}</dd></div>`).join('')}
    </dl>`;
}

function actions(p, c) {
  const out = [];
  const ext = '<span aria-hidden="true">↗</span>';

  if (p.action === 'cv') {
    out.push(`<a class="btn btn--accent" href="${esc(site.cv[lang])}">${esc(c.cta)}</a>`);
  } else if (c.cta && isRealUrl(p.url)) {
    out.push(`<a class="btn btn--accent" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(c.cta)} ${ext}</a>`);
  } else if (c.cta && c.ctaHref) {
    out.push(`<a class="btn btn--accent" href="${esc(c.ctaHref)}">${esc(c.cta)}</a>`);
  } else if (c.cta && p.url === PLACEHOLDER) {
    out.push(`<span class="btn btn--accent is-disabled">${esc(c.cta)} · <span class="is-placeholder">URL</span></span>`);
  }

  // Enlaces extra del proyecto (ej. "Descargar para Windows")
  for (const l of p.links ?? []) {
    if (isRealUrl(l.url)) {
      out.push(`<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label[lang])} ${ext}</a>`);
    }
  }

  if (isRealUrl(p.repo)) {
    out.push(`<a class="btn btn--ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">${t('sheet.code')} ${ext}</a>`);
  } else if (p.repo === PLACEHOLDER) {
    out.push(`<span class="btn btn--ghost is-disabled">${t('sheet.code')} · <span class="is-placeholder">URL</span></span>`);
  }

  return out.length ? `<div class="sheet__actions">${out.join('')}</div>` : '';
}

function renderProject(p) {
  const c = p[lang];
  const facts = [
    [t('sheet.type'), chips(p.types.map((ty) => t(`type.${ty}`)), 'sheet__chips--type')],
    [t('sheet.year'), `<p>${text(p.year)}</p>`],
    p.stack.length ? [t('sheet.stack'), chips(p.stack)] : null,
    p.tools.length ? [t('sheet.tools'), chips(p.tools)] : null,
  ].filter(Boolean);

  return `
    ${p.store ? storeHTML(p) : galleryHTML(p)}
    <div class="sheet__content">
      <div class="sheet__main">
        <p class="sheet__label mono">${text(c.label)}</p>
        <h2 class="sheet__title" id="sheet-title">${esc(c.title)}</h2>
        <p class="sheet__summary">${text(c.description ?? c.summary)}</p>
        ${rows(p, c)}
        ${codeHTML(p)}
      </div>
      <aside class="sheet__aside">
        ${facts.map(([k, v]) => `<div class="sheet__fact"><h3 class="sheet__fact-title mono">${k}</h3>${v}</div>`).join('')}
        ${actions(p, c)}
      </aside>
    </div>`;
}

function renderSimple(p) {
  const c = p[lang];
  return `
    <div class="sheet__content sheet__content--simple">
      ${p.photoLarge ? `<div class="sheet__person">
        <img class="sheet__avatar" src="${esc(p.photoLarge)}" alt="" width="104" height="104" decoding="async">
        <div>
          <p class="sheet__label mono">${text(c.label)}</p>
          <h2 class="sheet__title" id="sheet-title">${esc(c.title)}</h2>
        </div>
      </div>` : `
      <p class="sheet__label mono">${text(c.label)}</p>
      <h2 class="sheet__title" id="sheet-title">${esc(c.title)}</h2>`}
      ${(Array.isArray(c.summary) ? c.summary : [c.summary]).map((s) => `<p class="sheet__summary">${text(s)}</p>`).join('')}
      ${actions(p, c)}
    </div>`;
}

export function openSheet(id, trigger = document.activeElement) {
  const p = getProject(id);
  if (!p) return;
  if (!dialog) build();

  const isProject = p.inGrid;
  dialog.classList.toggle('sheet--project', isProject);
  dialog.querySelector('.sheet__body').innerHTML = isProject ? renderProject(p) : renderSimple(p);
  gallery = isProject && !p.store && p.gallery?.length > 1 ? { items: p.gallery, index: 0 } : null;

  lastTrigger = trigger;
  document.documentElement.classList.add('has-sheet');
  dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.sheet__close').focus();
}

export function close() {
  dialog?.close();
}
