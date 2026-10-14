// ============================================================
// Habilidades, agrupadas por categoría.
//
// Categoría: id, icon (de lineIcons), títulos es/en.
// Habilidad: name (o { es, en }), icon, tipo de icono ('brand' = logo
//            oficial, 'line' = icono de trazo), color de marca y una
//            línea corta que explica para qué la uso.
// ============================================================

export const skills = [
  {
    id: 'dev',
    icon: 'code',
    es: 'Desarrollo web',
    en: 'Web development',
    items: [
      { name: 'HTML', icon: 'html5', kind: 'brand', color: '#E34F26',
        es: 'Maquetación semántica', en: 'Semantic markup' },
      { name: 'CSS', icon: 'css3', kind: 'brand', color: '#1572B6',
        es: 'Layouts responsive y animación', en: 'Responsive layouts and motion' },
      { name: 'JavaScript', icon: 'javascript', kind: 'brand', color: '#F7DF1E', ink: '#16202E',
        es: 'Interacción y lógica en el navegador', en: 'Browser interactivity and logic' },
    ],
  },
  {
    id: 'cms',
    icon: 'layers',
    es: 'CMS y e-commerce',
    en: 'CMS & e-commerce',
    items: [
      { name: 'WordPress', icon: 'wordpress', kind: 'brand', color: '#21759B',
        es: 'Desarrollo y configuración de sitios', en: 'Site building and setup' },
      { name: 'Gutenberg', icon: 'blocks', kind: 'line', color: '#3858E9',
        es: 'Temas de bloques y edición completa del sitio', en: 'Block themes and full site editing' },
      { name: 'Elementor', icon: 'elementor', kind: 'brand', color: '#92003B',
        es: 'Maquetación con constructor visual', en: 'Visual page building' },
      { name: 'WooCommerce', icon: 'bag', kind: 'line', color: '#96588A',
        es: 'Configuración de tiendas online', en: 'Online shop setup' },
    ],
  },
  {
    id: 'quality',
    icon: 'gem',
    es: 'Calidad',
    en: 'Quality',
    items: [
      { name: { es: 'Accesibilidad WCAG 2.1 AA', en: 'Accessibility WCAG 2.1 AA' },
        icon: 'access', kind: 'line', color: '#FF5B2E',
        es: 'Pautas WCAG 2.1 nivel AA', en: 'WCAG 2.1 level AA guidelines' },
      { name: { es: 'Mantenimiento web', en: 'Website maintenance' },
        icon: 'wrench', kind: 'line', color: '#16202E',
        es: 'Actualizaciones y soporte continuo', en: 'Updates and ongoing support' },
    ],
  },
  {
    id: 'tools',
    icon: 'toolbox',
    es: 'Herramientas',
    en: 'Tools',
    items: [
      { name: 'Visual Studio Code', icon: 'editor', kind: 'line', color: '#007ACC',
        es: 'Mi editor de código', en: 'My code editor' },
      { name: 'GitHub', icon: 'github', kind: 'brand', color: '#181717',
        es: 'Repositorios y control de versiones', en: 'Repositories and version control' },
    ],
  },
  {
    id: 'ai',
    icon: 'sparkles',
    es: 'IA aplicada',
    en: 'Applied AI',
    wide: true, // ocupa todo el ancho, con las habilidades en dos columnas
    items: [
      { name: 'Claude Code', icon: 'claude', kind: 'brand', color: '#D97757',
        es: 'Agente de programación en el terminal', en: 'Coding agent in the terminal' },
      { name: 'ChatGPT', icon: 'openai', kind: 'brand', color: '#10A37F',
        es: 'Investigación, ideas y redacción', en: 'Research, ideas and writing' },
      { name: { es: 'Automatización de catálogos (CSV)', en: 'Catalogue automation (CSV)' },
        icon: 'table', kind: 'line', color: '#2E9E6B',
        es: 'Fichas de producto generadas con IA', en: 'AI-generated product listings' },
      { name: { es: 'Herramientas con IA', en: 'AI-powered tools' },
        icon: 'bolt', kind: 'line', color: '#7B5CFF',
        es: 'Prototipos con APIs de IA', en: 'Prototypes with AI APIs' },
    ],
  },
];
