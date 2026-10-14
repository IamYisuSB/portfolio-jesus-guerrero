// Experiencia (línea de tiempo), formación e idiomas.
import { lang, t } from './i18n.js';
import { experience, education, languages } from './data/experience.js';

const PLACEHOLDER = '[PLACEHOLDER]';
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (s) => (s === PLACEHOLDER ? `<span class="is-placeholder">${s}</span>` : esc(s));

function job(e) {
  const c = e[lang];
  const end = e.end ? text(e.end) : t('exp.present');
  return `
    <li class="tl__item job">
      <p class="job__period mono">${text(e.start)} — ${end}${e.end ? '' : ' <span class="job__live" aria-hidden="true"></span>'}</p>
      <h3 class="job__role">${esc(c.role)}</h3>
      <p class="job__company">${esc(c.company)} · ${esc(c.place)}</p>
      <p class="job__summary">${text(c.summary)}</p>
      <ul class="job__highlights">${c.highlights.map((h) => `<li>${text(h)}</li>`).join('')}</ul>
      <ul class="card__tags mono" role="list">${e.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </li>`;
}

export function initExperience() {
  const jobs = document.getElementById('exp-jobs');
  const edu = document.getElementById('exp-education');
  const langs = document.getElementById('exp-languages');

  if (jobs) jobs.innerHTML = experience.map(job).join('');

  if (edu) {
    const period = (v) => (typeof v === 'object' ? v[lang] : v);
    const cert = (url) => {
      if (url === PLACEHOLDER) return `<span class="edu__cert is-disabled">${t('edu.cert')} · <span class="is-placeholder">URL</span></span>`;
      if (url) return `<a class="edu__cert" href="${esc(url)}" target="_blank" rel="noopener">${t('edu.cert')} <span aria-hidden="true">→</span></a>`;
      return '';
    };
    edu.innerHTML = education.map((e) => `
      <li class="tl__item edu">
        <p class="mono muted">${text(period(e.period))}</p>
        <p class="aside-item__title">${text(e[lang].title)}</p>
        <p class="muted">${text(e[lang].center)}</p>
        ${e.meta ? `<p class="edu__meta mono">${esc(e.meta[lang])}</p>` : ''}
        ${e.units ? `<ul class="edu__units">${e.units[lang].map((u) => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}
        ${e.tags?.length ? `<ul class="edu__tags mono" role="list">${e.tags.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
        ${cert(e.cert)}
      </li>`).join('');
  }

  if (langs) {
    langs.innerHTML = languages.map((l) => `
      <li class="lang-row">
        <span class="aside-item__title">${esc(l[lang])}</span>
        <span class="mono muted">${text(l.level[lang])}</span>
      </li>`).join('');
  }
}
