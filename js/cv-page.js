// ============================================================
// Página del CV (/cv/ y /en/cv/): se monta a partir de los datos de
// la web y se imprime o guarda como PDF desde el navegador.
// ============================================================
import { lang } from './i18n.js';
import { initTheme } from './theme.js';
import { initCookies } from './cookies.js';
import { site } from './data/site.js';
import { cv } from './data/cv.js';
import { experience, education, languages } from './data/experience.js';
import { skills } from './data/skills.js';
import { projects } from './data/projects.js';

const PLACEHOLDER = '[PLACEHOLDER]';
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (s) => (s === PLACEHOLDER ? '' : esc(s));
const pick = (v) => (v && typeof v === 'object' ? v[lang] : v);
const isUrl = (u) => typeof u === 'string' && /^https?:\/\//.test(u);
const host = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const L = {
  es: {
    profile: 'Perfil', experience: 'Experiencia', education: 'Formación', projects: 'Proyectos destacados',
    contact: 'Contacto', skills: 'Habilidades', languages: 'Idiomas', present: 'Actualidad',
    portfolio: 'Portfolio con fichas y capturas de cada proyecto',
  },
  en: {
    profile: 'Profile', experience: 'Experience', education: 'Education', projects: 'Featured projects',
    contact: 'Contact', skills: 'Skills', languages: 'Languages', present: 'Present',
    portfolio: 'Portfolio with details and screenshots of each project',
  },
}[lang];

const ICON = {
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
};
const ico = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

function render() {
  const root = document.getElementById('cv');
  if (!root) return;

  const contact = [
    `<li>${ico('pin')}${esc(site.location)}${lang === 'en' ? ', Spain' : ''}</li>`,
    `<li>${ico('mail')}<a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>`,
    isUrl(site.linkedin) ? `<li>${ico('link')}<a href="${esc(site.linkedin)}">${esc(host(site.linkedin))}</a></li>` : '',
    isUrl(site.github) ? `<li>${ico('link')}<a href="${esc(site.github)}">${esc(host(site.github))}</a></li>` : '',
    `<li>${ico('globe')}<a href="${lang === 'en' ? '/en/' : '/'}">${esc(location.host || 'portfolio')}</a></li>`,
  ].join('');

  const jobs = experience.map((e) => {
    const c = e[lang];
    return `
      <article class="cv-item">
        <header class="cv-item__head">
          <h3>${esc(c.role)} <span>· ${esc(c.company)}, ${esc(c.place)}</span></h3>
          <p class="cv-item__date">${text(e.start)} – ${e.end ? text(e.end) : L.present}</p>
        </header>
        <p>${text(c.summary)}</p>
        <ul>${c.highlights.filter((h) => h !== PLACEHOLDER).map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      </article>`;
  }).join('');

  const edu = education.map((e) => {
    const c = e[lang];
    const meta = e.meta ? ` · ${esc(e.meta[lang])}` : '';
    return `
      <article class="cv-item cv-item--compact">
        <header class="cv-item__head">
          <h3>${text(c.title)}</h3>
          <p class="cv-item__date">${text(pick(e.period))}</p>
        </header>
        <p class="cv-item__sub">${text(c.center)}${meta}</p>
      </article>`;
  }).join('');

  const projs = cv.projects.map((id) => projects.find((p) => p.id === id)).filter(Boolean).map((p) => {
    const c = p[lang];
    const url = isUrl(p.url) ? ` · <a href="${esc(p.url)}">${esc(host(p.url))}</a>` : '';
    return `
      <article class="cv-item cv-item--compact">
        <header class="cv-item__head">
          <h3>${esc(c.title)} <span>· ${text(c.label)}</span></h3>
          <p class="cv-item__date">${text(p.year)}</p>
        </header>
        <p>${text(c.summary)}${url}</p>
      </article>`;
  }).join('');

  const name = (i) => (typeof i.name === 'string' ? i.name : i.name[lang]);
  const skillGroups = skills.map((g) => `
    <div class="cv-skill">
      <h4>${esc(g[lang])}</h4>
      <p>${g.items.map((i) => esc(name(i))).join(' · ')}</p>
    </div>`).join('');

  const langs = languages.map((l) => `<li><span>${esc(l[lang])}</span><span>${text(l.level[lang])}</span></li>`).join('');

  root.innerHTML = `
    <header class="cv-head">
      <img class="cv-head__photo" src="/img/personal/avatar-lg.webp?v=3" alt="" width="104" height="104">
      <div>
        <h1 class="cv-head__name">${esc(cv.fullName)}</h1>
        <p class="cv-head__role">${esc(cv.role[lang])}</p>
      </div>
    </header>

    <div class="cv-cols">
      <main class="cv-main">
        <section class="cv-sec"><h2>${L.profile}</h2><p>${esc(cv.profile[lang])}</p></section>
        <section class="cv-sec"><h2>${L.experience}</h2>${jobs}</section>
        <section class="cv-sec"><h2>${L.projects}</h2>${projs}
          <p class="cv-note">${L.portfolio}: <a href="${lang === 'en' ? '/en/' : '/'}">${esc(location.host || 'portfolio')}</a></p>
        </section>
      </main>
      <aside class="cv-side">
        <section class="cv-sec"><h2>${L.contact}</h2><ul class="cv-contact">${contact}</ul></section>
        <section class="cv-sec"><h2>${L.skills}</h2>${skillGroups}</section>
        <section class="cv-sec"><h2>${L.education}</h2>${edu}</section>
        <section class="cv-sec"><h2>${L.languages}</h2><ul class="cv-langs">${langs}</ul></section>
      </aside>
    </div>`;
}

initTheme();
render();
initCookies();
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
document.getElementById('cv-print')?.addEventListener('click', () => window.print());
