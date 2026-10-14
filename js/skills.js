// Sección de habilidades: tarjetas por categoría, cada habilidad con su icono.
import { lang } from './i18n.js';
import { skills } from './data/skills.js';
import { brandIcons, lineIcons } from './data/skill-icons.js';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const text = (v) => (typeof v === 'string' ? v : v[lang]);

function icon(item) {
  const svg = item.kind === 'brand'
    ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${brandIcons[item.icon]}"/></svg>`
    : `<svg viewBox="0 0 24 24" class="is-line" aria-hidden="true">${lineIcons[item.icon]}</svg>`;
  const style = `--brand:${item.color};${item.ink ? `--brand-ink:${item.ink};` : ''}`;
  return `<span class="skill__icon skill__icon--${item.kind}" data-icon="${item.icon}" style="${style}">${svg}</span>`;
}

export function initSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = skills.map((group, i) => `
    <li class="skill-group${group.wide ? ' skill-group--wide' : ''}" data-skill="${group.id}">
      <div class="skill-group__head">
        <span class="skill-group__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">${lineIcons[group.icon]}</svg>
        </span>
        <h3 class="skill-group__title">${esc(group[lang])}</h3>
        <span class="skill-group__num mono" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      </div>
      <ul class="skill-group__list" role="list">
        ${group.items.map((item) => `
          <li class="skill">
            ${icon(item)}
            <span class="skill__text">
              <span class="skill__name">${esc(text(item.name))}</span>
              <span class="skill__desc">${esc(item[lang])}</span>
            </span>
          </li>`).join('')}
      </ul>
    </li>`).join('');
}
