// Proyectos con filtros por tipo. Clic en una tarjeta → abre la ficha con galería.
import { lang, t } from './i18n.js';
import { projects, projectTypes } from './data/projects.js';
import { openSheet } from './sheet.js';

const PLACEHOLDER = '[PLACEHOLDER]';
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (s) => (s === PLACEHOLDER ? `<span class="is-placeholder">${s}</span>` : esc(s));

/** Miniatura: thumb, o la 1.ª captura de la galería, o una ventana dibujada en CSS. */
function thumb(p) {
  const pick = (v) => (v && typeof v === 'object' ? v[lang] : v);
  const src = pick(p.thumb) || pick(p.gallery?.[0]?.src);
  if (src) {
    const alt = t('project.thumbAlt').replace('{title}', p[lang].title);
    return `<img class="card__img" src="${esc(src)}" alt="${esc(alt)}" width="800" height="500" loading="lazy" decoding="async">`;
  }
  return `
    <div class="card__mock" data-mock="${p.id}" aria-hidden="true">
      <span class="card__mock-bar"><i></i><i></i><i></i></span>
      <span class="card__mock-title">${esc(p[lang].title)}</span>
      <span class="card__mock-lines"><i></i><i></i><i></i></span>
    </div>`;
}

function card(p) {
  const c = p[lang];
  const types = p.types.map((ty) => `<li class="type-pill" data-type="${ty}">${esc(t(`type.${ty}`))}</li>`).join('');
  const stack = p.stack.length
    ? `<ul class="card__tags mono" role="list">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
    : '';
  return `
    <li class="card" data-types="${p.types.join(' ')}">
      <div class="card__media">
        ${thumb(p)}
        <ul class="card__types" role="list">${types}</ul>
      </div>
      <div class="card__body">
        <p class="card__label mono">${text(c.label)}</p>
        <h3 class="card__title">
          <button class="card__link" type="button" data-sheet="${p.id}">${esc(c.title)}</button>
        </h3>
        <p class="card__summary">${text(c.summary)}</p>
        ${stack}
        <span class="card__more mono" aria-hidden="true">${t('project.open')} →</span>
      </div>
    </li>`;
}

export function initProjects() {
  const grid = document.getElementById('project-grid');
  const bar = document.getElementById('project-filters');
  const status = document.getElementById('filter-status');
  if (!grid) return;

  // data-limit en el grid: la portada muestra solo los primeros (el orden de projects.js)
  const all = projects.filter((p) => p.inGrid);
  const limit = Number(grid.dataset.limit) || all.length;
  const items = all.slice(0, limit);
  grid.innerHTML = items.map(card).join('');

  // Botón "Ver todos los proyectos": muestra el total
  const more = document.getElementById('more-count');
  if (more) more.textContent = all.length;
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-sheet]');
    if (btn) openSheet(btn.dataset.sheet, btn);
  });

  if (!bar) return;

  // Solo se muestran los tipos que tienen al menos un proyecto
  const count = (ty) => items.filter((p) => p.types.includes(ty)).length;
  const used = projectTypes.filter((ty) => count(ty) > 0);
  const chip = (ty, n, pressed) => `
    <button type="button" class="chip" data-filter="${ty}" aria-pressed="${pressed}">
      ${esc(t(`type.${ty}`))}<span class="chip__count mono" aria-hidden="true">${n}</span>
    </button>`;

  bar.innerHTML = chip('all', items.length, true) + used.map((ty) => chip(ty, count(ty), false)).join('');
  bar.hidden = used.length < 2; // con un solo tipo, los filtros sobran

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

    let visible = 0;
    grid.querySelectorAll('.card').forEach((el) => {
      const show = f === 'all' || el.dataset.types.split(' ').includes(f);
      el.hidden = !show;
      if (show) visible++;
    });
    if (status) status.textContent = t(visible === 1 ? 'filter.countOne' : 'filter.count').replace('{n}', visible);
  });
}
