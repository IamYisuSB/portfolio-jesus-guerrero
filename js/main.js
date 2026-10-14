import { initTheme } from './theme.js';
import { initDesk } from './desk.js';
import { initProjects } from './projects.js';
import { initExperience } from './experience.js';
import { initSkills } from './skills.js';
import { initContact } from './contact.js';
import { openSheet } from './sheet.js';
import { initCookies } from './cookies.js';
import { initTerminal } from './terminal.js';
import { initDrawer } from './drawer.js';

initTheme();
initDesk();
initDrawer();
initProjects();
initExperience();
initSkills();
initContact();
initCookies();
initTerminal();

document.getElementById('year').textContent = new Date().getFullYear();

// Enlace directo a una ficha: /#ficha-este-portfolio abre esa ficha al cargar
const deepLink = location.hash.match(/^#ficha-([\w-]+)$/);
if (deepLink) openSheet(deepLink[1], document.getElementById('project-grid'));
