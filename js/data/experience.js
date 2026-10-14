// ============================================================
// Experiencia, formación e idiomas.
// Lo que esté en [PLACEHOLDER] hay que rellenarlo.
// ============================================================

const P = '[PLACEHOLDER]';

export const experience = [
  {
    start: '2026',
    end: null,         // null = Actualidad
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Gutenberg', 'Astro', 'HTML', 'CSS', 'JavaScript', 'Visual Studio Code', 'GitHub', 'Claude Code'],
    es: {
      role: 'Desarrollador web',
      company: 'Autónomo',
      place: 'Granada',
      summary: 'Desarrollo webs corporativas, tiendas online y aplicaciones a medida, desde el diseño hasta la publicación y el mantenimiento. Trabajo de forma autónoma con clientes de distintos sectores, gestionando cada proyecto de principio a fin.',
      highlights: [
        'Diseño y desarrollo de webs corporativas y landing pages con WordPress, Elementor, Gutenberg y Astro.',
        'Creación y configuración de tiendas online con WooCommerce: catálogo, pasarelas de pago, envíos e impuestos.',
        'Maquetación responsive con HTML, CSS y JavaScript, cuidando el rendimiento, el SEO técnico y la accesibilidad.',
        'Mantenimiento web: actualizaciones, copias de seguridad, seguridad y soporte continuo.',
        'Uso de herramientas de IA (Claude Code, ChatGPT) para programar, automatizar tareas y gestionar catálogos.',
      ],
    },
    en: {
      role: 'Web developer',
      company: 'Self-employed',
      place: 'Granada, Spain',
      summary: 'I build business websites, online shops and custom web apps, from design to launch and maintenance. I work independently with clients from different sectors, managing each project end to end.',
      highlights: [
        'Design and development of business websites and landing pages with WordPress, Elementor, Gutenberg and Astro.',
        'Building and setting up WooCommerce online shops: catalogue, payment gateways, shipping and taxes.',
        'Responsive front-end development with HTML, CSS and JavaScript, with a focus on performance, technical SEO and accessibility.',
        'Website maintenance: updates, backups, security and ongoing support.',
        'Using AI tools (Claude Code, ChatGPT) to code, automate tasks and manage product catalogues.',
      ],
    },
  },
];

// meta: línea extra bajo el centro (código, grado, nivel, horas). units: lo que se aprende (unidades de competencia). icon: icono (sparkles | code | monitor | cap). cert: enlace al certificado (null = sin enlace). tags: temas o tecnologías.
export const education = [
  {
    period: { es: '09/2026 – Actualidad', en: '09/2026 – Present' },
    cert: null,
    tags: [],
    meta: { es: 'IFCD0210 · Grado C · Nivel 3 · 590 h', en: 'IFCD0210 · Grade C · Level 3 · 590 h' },
    // Unidades de competencia oficiales (UC0491_3, UC0492_3, UC0493_3)
    units: {
      es: ['Desarrollo de software en el entorno cliente', 'Desarrollo de software en el entorno servidor', 'Implantación, pruebas y documentación de aplicaciones web'],
      en: ['Client-side software development', 'Server-side software development', 'Deploying, testing and documenting web applications'],
    },
    es: { title: 'Certificado de Desarrollo de Aplicaciones con Tecnologías Web', center: 'Atlántida CIPED' },
    en: { title: 'Certificate in Web Technology Application Development', center: 'Atlántida CIPED' },
  },
  {
    period: '2026',
    icon: 'sparkles',
    cert: 'https://kdrive.infomaniak.com/app/share/2949350/05a2e7e7-11dd-4e99-8487-0c509ebfc6d7/preview/pdf/9',
    tags: ['Claude AI', 'AI Automation', 'Chatbot', 'ChatGPT'],
    es: { title: 'IA Pro para Pymes: Automatización Cognitiva y Agentes Autónomos', center: 'Universidad Camilo José Cela' },
    en: { title: 'Pro AI for SMEs: Cognitive Automation and Autonomous Agents', center: 'Camilo José Cela University' },
  },
  {
    period: '2022',
    icon: 'code',
    cert: 'https://kdrive.infomaniak.com/app/share/2949350/5e3da601-f4f4-44e5-a689-f09fdbd1c860/preview/image/10',
    tags: ['HTML5', 'CSS3', 'Sass', 'Bootstrap'],
    es: { title: 'Desarrollo Web', center: 'CoderHouse' },
    en: { title: 'Web Development', center: 'CoderHouse' },
  },
  {
    period: { es: '10/2021 – 04/2022', en: '10/2021 – 04/2022' },
    icon: 'monitor',
    cert: null,
    tags: [],
    meta: { es: 'IFCT0210 · Grado C · Nivel 2 · 600 h', en: 'IFCT0210 · Grade C · Level 2 · 600 h' },
    // Unidades de competencia oficiales (UC0219_2, UC0957_2, UC0958_2, UC0959_2)
    units: {
      es: ['Instalación y configuración de sistemas operativos', 'Mantenimiento del hardware de equipos y servidores', 'Administración y mantenimiento de software y aplicaciones', 'Seguridad física y lógica de los sistemas'],
      en: ['Installing and configuring operating systems', 'Maintaining computer and server hardware', 'Administering and maintaining software and applications', 'Physical and logical system security'],
    },
    es: { title: 'Certificado de Operación de Sistemas Informáticos', center: 'Academia Hermanos Naranjo, Granada' },
    en: { title: 'Certificate in IT Systems Operation', center: 'Academia Hermanos Naranjo, Granada (Spain)' },
  },
];

export const languages = [
  { es: 'Español', en: 'Spanish', level: { es: 'Nativo', en: 'Native' } },
  { es: 'Inglés', en: 'English', level: { es: 'Básico', en: 'Basic' } },
];
