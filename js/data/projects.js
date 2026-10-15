// ============================================================
// Fichas que se abren desde la mesa y desde la sección de proyectos.
//
// Campos de un proyecto (inGrid: true):
//   id          identificador único
//   types       tipos para los filtros: 'profesional' | 'personal' | 'formacion' | 'ia'
//               (un proyecto puede tener varios, ej. ['personal', 'ia'])
//   year        año
//   url         web pública (botón principal). null = sin web
//   repo        repositorio de código (botón "Ver código"). null = sin código público
//   links       botones extra: [{ label: { es, en }, url }]
//   thumb       miniatura de la tarjeta. null = usa la 1.ª captura de la galería o un dibujo
//   gallery     capturas de la ficha: [{ src, alt: { es, en } }]. Vacío = dibujo
//   stack       tecnologías (HTML, WordPress…)
//   tools       herramientas (VS Code, Figma, Claude Code…)
//   desk        objeto en la mesa (opcional): tipo, posición en % y rotación
//               (el móvil admite screen: { es, en } y la polaroid photo: { es, en })
//   store       app móvil: { banner, icon, playStore, category } → ficha estilo Google Play
//               (playStore con URL = insignia activa; [PLACEHOLDER] = "Próximamente")
//               (gallery.src puede ser { es, en } para capturas por idioma)
//   es / en     label, title, summary (tarjeta), description (ficha),
//               role, challenge, work, result, cta
//
// Fichas solo de mesa (inGrid: false): rows: null = sin filas; action 'cv' = descarga el CV.
//
// Regla: nada inventado. Lo que no está confirmado va como [PLACEHOLDER].
// ============================================================

const P = '[PLACEHOLDER]';

export const projects = [
  // ---------- Proyectos ----------
  {
    id: 'kipack',
    inGrid: true,
    types: ['personal', 'ia'],
    year: '2026',
    url: null,
    repo: 'https://github.com/IamYisuSB/kipack',
    thumb: '/img/proyectos/kipack/thumb.webp',
    // App móvil: la ficha se muestra como una página de Google Play
    store: {
      banner: '/img/proyectos/kipack/banner.webp',
      icon: '/img/proyectos/kipack/icon.webp',
      playStore: 'https://play.google.com/store/apps/details?id=com.fooserd.kipack',
      category: { es: 'Viajes · IA', en: 'Travel · AI' },
    },
    gallery: [
      { src: { es: '/img/proyectos/kipack/es-01.webp', en: '/img/proyectos/kipack/en-01.webp' }, alt: { es: 'Inicio: todos tus viajes en un solo lugar', en: 'Home: all your trips in one place' } },
      { src: { es: '/img/proyectos/kipack/es-02.webp', en: '/img/proyectos/kipack/en-02.webp' }, alt: { es: 'Nuevo viaje: destino, fechas, tipo de viaje y actividades', en: 'New trip: destination, dates, trip type and activities' } },
      { src: { es: '/img/proyectos/kipack/es-03.webp', en: '/img/proyectos/kipack/en-03.webp' }, alt: { es: 'Maleta generada con IA, por categorías y con progreso', en: 'AI-generated suitcase, by category with progress' } },
      { src: { es: '/img/proyectos/kipack/es-04.webp', en: '/img/proyectos/kipack/en-04.webp' }, alt: { es: 'Clima día a día del destino', en: 'Day-by-day weather at the destination' } },
      { src: { es: '/img/proyectos/kipack/es-05.webp', en: '/img/proyectos/kipack/en-05.webp' }, alt: { es: 'Mapa de países visitados y programados', en: 'Map of visited and planned countries' } },
      { src: { es: '/img/proyectos/kipack/es-06.webp', en: '/img/proyectos/kipack/en-06.webp' }, alt: { es: 'Perfil y ajustes de la cuenta', en: 'Profile and account settings' } },
    ],
    stack: ['Flutter', 'Dart', 'Supabase', 'Open-Meteo API'],
    tools: [P],
    desk: { type: 'phone', x: 87, y: 28, rot: 6, screen: { es: '/img/proyectos/kipack/desk-es.webp', en: '/img/proyectos/kipack/desk-en.webp' } },
    es: {
      label: 'App móvil · IA',
      title: 'Kipack',
      summary: 'App con IA que prepara tu maleta: le dices a dónde vas y te organiza el equipaje según el tiempo que hará.',
      description: 'Kipack es una app de viajes con inteligencia artificial. Eliges destino, fechas y tipo de viaje (playa, montaña, ciudad, negocios…) y la IA crea una lista de equipaje personalizada según la previsión del tiempo en tu destino. Mientras haces la maleta vas marcando lo que ya has metido y ves tu progreso. Además, guarda todos tus viajes y los muestra en un mapa de países visitados y programados.',
      role: 'Proyecto propio en solitario: idea, diseño de la app y desarrollo completo en Flutter.',
      challenge: 'Que no se te olvide nada al hacer la maleta. Las listas genéricas no tienen en cuenta el destino, el clima ni el tipo de viaje, y siempre acabas olvidando algo importante o cargando con cosas que no vas a usar.',
      work: 'Una app en Flutter para crear viajes (destino, fechas, tipo de viaje y actividades) que genera con IA la lista de equipaje a partir de la previsión del tiempo de Open-Meteo. La lista se organiza por categorías, se marca a medida que haces la maleta y muestra el progreso. Además, un mapa de países visitados y programados y la gestión de la cuenta.',
      result: 'Publicada y disponible para descargar en Google Play.',
      cta: null,
    },
    en: {
      label: 'Mobile app · AI',
      title: 'Kipack',
      summary: 'An AI app that packs your suitcase: tell it where you are going and it organises your luggage around the weather.',
      description: 'Kipack is an AI-powered travel app. Pick a destination, dates and trip type (beach, mountain, city, business…) and the AI builds a personalised packing list based on the weather forecast at your destination. As you pack, you tick off what is already in your suitcase and track your progress. It also keeps all your trips and shows them on a map of visited and planned countries.',
      role: 'Solo project: idea, app design and full development in Flutter.',
      challenge: 'Never forgetting anything when packing. Generic lists ignore the destination, the weather and the type of trip, so you always end up forgetting something important or carrying things you will never use.',
      work: 'A Flutter app to create trips (destination, dates, trip type and activities) that uses AI to generate the packing list from the Open-Meteo weather forecast. The list is grouped by category, ticked off as you pack and shows your progress. It also includes a map of visited and planned countries and account management.',
      result: 'Live and available to download on Google Play.',
      cta: null,
    },
  },
  {
    id: 'pixelote',
    inGrid: true,
    types: ['personal', 'ia'],
    year: '2026',
    url: 'https://pixelote.de',
    repo: 'https://github.com/IamYisuSB/proyecto-archivos',
    links: [
      { label: { es: 'Descargar para Windows', en: 'Download for Windows' }, url: 'https://pixelote.de/descargar/' },
    ],
    thumb: { es: '/img/proyectos/pixelote/thumb-es.webp', en: '/img/proyectos/pixelote/thumb-en.webp' },
    gallery: [
      { src: { es: '/img/proyectos/pixelote/banner-es.webp', en: '/img/proyectos/pixelote/banner-en.webp' }, alt: { es: 'Pixelote: convierte, comprime y recorta imágenes por lotes', en: 'Pixelote: convert, compress and crop images in bulk' } },
      { src: '/img/proyectos/pixelote/01.webp', alt: { es: 'App en modo claro: zona para soltar imágenes y panel de ajustes', en: 'App in light mode: drop zone and settings panel' } },
      { src: '/img/proyectos/pixelote/02.webp', alt: { es: 'App en modo oscuro', en: 'App in dark mode' } },
      { src: '/img/proyectos/pixelote/03.webp', alt: { es: 'Versión en inglés (también en portugués y alemán)', en: 'English version (also in Portuguese and German)' } },
      { src: '/img/proyectos/pixelote/04.webp', alt: { es: 'Página de descarga de la app para Windows', en: 'Download page for the Windows app' } },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Workers', 'WebAssembly', 'PWA', 'Tauri'],
    tools: ['Visual Studio Code', 'Claude', 'GitHub', 'Vercel'],
    desk: { type: 'polaroid', x: 13, y: 30, rot: -6, photo: { es: '/img/proyectos/pixelote/desk-es.webp', en: '/img/proyectos/pixelote/desk-en.webp' } },
    es: {
      label: 'Web app · PWA · Windows',
      title: 'Pixelote',
      summary: 'Conversor de imágenes por lotes: cambia el formato, comprime, redimensiona y recorta. Todo en el navegador, sin subir nada.',
      description: 'Pixelote convierte, comprime, redimensiona y recorta imágenes por lotes directamente en el navegador: las imágenes nunca se suben a ningún servidor. Lee JPG, PNG, WebP, AVIF, HEIC, TIFF, RAW y más, y exporta a WebP, JPG, PNG, AVIF, GIF, PDF, BMP, TIFF o ICO. Se puede instalar como app y usar sin conexión, tiene versión de escritorio para Windows y está en cuatro idiomas.',
      role: 'Proyecto propio en solitario: idea, diseño y desarrollo, usando Claude como asistente de programación.',
      challenge: 'Las webs para convertir imágenes que ya existían limitaban cuántas podías subir, no dejaban aplicar los cambios a todas a la vez y obligaban a ir imagen por imagen. Quería una herramienta sin límites, que trabajase con lotes enteros y sin subir las fotos a ningún servidor.',
      work: 'Procesado en paralelo en segundo plano con Web Workers y códecs en WebAssembly (MozJPEG y AVIF); comparador antes/después, recorte, giro, marca de agua y atajos que se pueden compartir; app instalable sin conexión (PWA) y versión para Windows con Tauri; seguridad con CSP estricta y librerías verificadas con SRI.',
      result: 'Publicada en la web y como app para Windows (versión 4.4.0).',
      cta: 'Abrir la app',
    },
    en: {
      label: 'Web app · PWA · Windows',
      title: 'Pixelote',
      summary: 'A bulk image converter: change format, compress, resize and crop. Everything runs in the browser, nothing is uploaded.',
      description: 'Pixelote converts, compresses, resizes and crops images in bulk right in the browser: images are never uploaded to a server. It reads JPG, PNG, WebP, AVIF, HEIC, TIFF, RAW and more, and exports to WebP, JPG, PNG, AVIF, GIF, PDF, BMP, TIFF or ICO. It can be installed as an app and used offline, has a Windows desktop version and comes in four languages.',
      role: 'Solo project: idea, design and development, using Claude as a coding assistant.',
      challenge: 'Existing image converter web apps limited how many images you could upload, would not let you apply changes to all of them at once and made you go one by one. I wanted a tool with no limits that works on whole batches without uploading photos to any server.',
      work: 'Parallel background processing with Web Workers and WebAssembly codecs (MozJPEG and AVIF); before/after comparison, cropping, rotation, watermarks and shareable presets; an installable offline app (PWA) and a Windows version built with Tauri; security with a strict CSP and SRI-verified libraries.',
      result: 'Live on the web and as a Windows app (version 4.4.0).',
      cta: 'Open the app',
    },
  },
  {
    id: 'tienda-ubeda',
    inGrid: true,
    types: ['profesional'],
    year: '2026',
    url: 'https://latiendadeubeda.com',
    repo: null,
    thumb: '/img/proyectos/tienda-ubeda/thumb.webp',
    gallery: [
      { src: '/img/proyectos/tienda-ubeda/01.webp', alt: { es: 'Portada de la tienda online', en: 'Online shop homepage' } },
      { src: '/img/proyectos/tienda-ubeda/02.webp', alt: { es: 'Categorías y productos más vendidos', en: 'Categories and best sellers' } },
      { src: '/img/proyectos/tienda-ubeda/03.webp', alt: { es: 'Página de categoría con el catálogo', en: 'Category page with the catalogue' } },
      { src: '/img/proyectos/tienda-ubeda/04.webp', alt: { es: 'Ficha de producto', en: 'Product page' } },
      { src: '/img/proyectos/tienda-ubeda/05.webp', alt: { es: 'Surtidos personalizables de golosinas', en: 'Custom sweet mixes' } },
      { src: '/img/proyectos/tienda-ubeda/06.webp', alt: { es: 'Versión móvil con barra de navegación inferior', en: 'Mobile version with bottom navigation bar' } },
    ],
    stack: ['WordPress', 'WooCommerce', 'PHP', 'CSS', 'JavaScript'],
    tools: ['Gutenberg', 'Claude Code'],
    es: {
      label: 'E-commerce para cliente · WooCommerce',
      title: 'La Tienda de Úbeda',
      summary: 'Tienda online de una tienda de barrio de Úbeda: chuches, bollería, snacks y bebidas, con envío en 24-48 h.',
      description: 'Tienda online para una tienda de barrio de Úbeda que vende golosinas a granel, bollería, snacks, chocolates y bebidas. Los clientes compran por categorías, montan su propio surtido de golosinas y pagan con tarjeta o Bizum, con envío en 24-48 h y atención por WhatsApp.',
      role: 'Encargo de un cliente que quería vender online los productos de su tienda. Diseñé y desarrollé la tienda completa: el tema a medida, la configuración de WooCommerce, los pagos y los envíos.',
      challenge: 'Llevar una tienda física de barrio a la venta online con un catálogo grande de productos pequeños y baratos, y que comprar fuese tan fácil y rápido como entrar en la tienda.',
      work: 'Tema de bloques de WordPress hecho a medida para la marca, sobre WooCommerce: navegación por categorías, catálogo con buscador cargado desde CSV con ayuda de IA, fichas de producto, surtidos de golosinas personalizables, pago con tarjeta y Bizum (Redsys), envíos con Correos, botón de WhatsApp y una versión móvil con barra de navegación inferior tipo app.',
      result: 'Tienda publicada y en funcionamiento.',
      cta: 'Ver la tienda',
    },
    en: {
      label: 'Client e-commerce · WooCommerce',
      title: 'La Tienda de Úbeda',
      summary: 'Online shop for a neighbourhood store in Úbeda, Spain: sweets, pastries, snacks and drinks, delivered in 24-48 h.',
      description: 'An online shop for a neighbourhood store in Úbeda that sells pick-and-mix sweets, pastries, snacks, chocolates and drinks. Customers shop by category, build their own sweet mix and pay by card or Bizum, with 24-48 h delivery and WhatsApp support.',
      role: 'Commissioned by a client who wanted to sell the products of their shop online. I designed and built the whole store: the custom theme, the WooCommerce setup, payments and shipping.',
      challenge: 'Taking a local corner shop online with a large catalogue of small, low-priced products, and making buying as quick and easy as walking into the store.',
      work: 'A custom WordPress block theme built for the brand on top of WooCommerce: category navigation, a searchable catalogue loaded from CSV with the help of AI, product pages, customisable sweet mixes, card and Bizum payments (Redsys), shipping with Correos, a WhatsApp button and a mobile version with an app-style bottom navigation bar.',
      result: 'Shop live and up and running.',
      cta: 'Visit the shop',
    },
  },
  {
    id: 'eclipse-gibraltar',
    inGrid: true,
    types: ['profesional'],
    year: '2026',
    url: 'https://eclipse-gibraltar-2027.vercel.app',
    repo: null,
    thumb: { es: '/img/proyectos/eclipse-gibraltar/thumb-es.webp', en: '/img/proyectos/eclipse-gibraltar/thumb-en.webp' },
    gallery: [
      { src: { es: '/img/proyectos/eclipse-gibraltar/cover-es.webp', en: '/img/proyectos/eclipse-gibraltar/cover-en.webp' }, alt: { es: 'Portada: eclipse animado sobre la bahía de Gibraltar y cuenta atrás hasta la totalidad', en: 'Hero: animated eclipse over the Bay of Gibraltar and countdown to totality' } },
      { src: '/img/proyectos/eclipse-gibraltar/02.webp', alt: { es: 'La experiencia: alojamiento, champán, jamón ibérico y observación privada', en: 'The experience: stay, champagne, Iberian ham and private viewing' } },
      { src: '/img/proyectos/eclipse-gibraltar/03.webp', alt: { es: 'El día: horario del amanecer y de cada fase del eclipse', en: 'The day: sunrise and eclipse phase timeline' } },
      { src: '/img/proyectos/eclipse-gibraltar/04.webp', alt: { es: 'Opciones de alojamiento', en: 'Accommodation options' } },
      { src: '/img/proyectos/eclipse-gibraltar/05.webp', alt: { es: 'Formulario de reserva con servicios adicionales', en: 'Booking form with optional extras' } },
      { src: '/img/proyectos/eclipse-gibraltar/06.webp', alt: { es: 'Versión móvil', en: 'Mobile version' } },
    ],
    stack: ['Astro', 'HTML', 'CSS', 'JavaScript'],
    tools: [P],
    es: {
      label: 'Web para cliente · Reservas',
      title: 'Eclipse Privado · Gibraltar 2027',
      summary: 'Web para promocionar una villa privada frente al Peñón de Gibraltar desde la que ver el eclipse total de Sol del 2 de agosto de 2027.',
      description: 'Web para un cliente que alquila su villa en San García (Algeciras), en primera línea frente al Peñón, para vivir el eclipse total de Sol del 2 de agosto de 2027. La página vende una experiencia exclusiva para un máximo de ocho huéspedes: alojamiento, recepción con champán, jamón ibérico y observación privada, con tres opciones de estancia y servicios extra.',
      role: P,
      challenge: 'Vender una experiencia única con fecha fija y muy pocas plazas: transmitir la emoción del eclipse y la exclusividad de la villa, y convertir las visitas en reservas para un máximo de ocho huéspedes.',
      work: 'Una web en Astro, en español e inglés: portada con el eclipse animado y cuenta atrás hasta la totalidad, secciones que aparecen al hacer scroll, horario del día con cada fase del eclipse, opciones de alojamiento con precios y un formulario de reserva con servicios adicionales y contacto por WhatsApp.',
      result: P,
      cta: 'Ver la web',
    },
    en: {
      label: 'Client website · Bookings',
      title: 'Private Eclipse · Gibraltar 2027',
      summary: 'A website promoting a private villa facing the Rock of Gibraltar to watch the total solar eclipse of 2 August 2027.',
      description: 'A website for a client renting out their seafront villa in San García (Algeciras), facing the Rock of Gibraltar, to experience the total solar eclipse of 2 August 2027. The page sells an exclusive experience for up to eight guests: accommodation, a champagne reception, Iberian ham and private viewing, with three stay options and optional extras.',
      role: P,
      challenge: 'Selling a one-off experience with a fixed date and very few places: conveying the thrill of the eclipse and the exclusivity of the villa, and turning visits into bookings for up to eight guests.',
      work: 'An Astro website in Spanish and English: a hero with an animated eclipse and a countdown to totality, sections that reveal on scroll, a timeline of every eclipse phase, accommodation options with prices and a booking form with optional extras and WhatsApp contact.',
      result: P,
      cta: 'Visit the website',
    },
  },
  {
    id: 'lezzgo-pizza',
    inGrid: true,
    types: ['profesional'],
    year: '2025',
    url: 'https://lezzgopizza.com',
    repo: null,
    thumb: '/img/proyectos/lezzgo-pizza/thumb.webp',
    gallery: [
      { src: '/img/proyectos/lezzgo-pizza/01.webp', alt: { es: 'Portada de la web de la pizzería', en: 'Pizzeria website homepage' } },
      { src: '/img/proyectos/lezzgo-pizza/02.webp', alt: { es: 'Sección "Más que una pizza, una experiencia"', en: '"More than a pizza, an experience" section' } },
      { src: '/img/proyectos/lezzgo-pizza/03.webp', alt: { es: 'Carta por categorías con precios y alérgenos', en: 'Menu by category with prices and allergens' } },
      { src: '/img/proyectos/lezzgo-pizza/04.webp', alt: { es: 'Página "Sobre nosotros"', en: '"About us" page' } },
      { src: '/img/proyectos/lezzgo-pizza/05.webp', alt: { es: 'Galería de fotos de producto', en: 'Product photo gallery' } },
      { src: '/img/proyectos/lezzgo-pizza/06.webp', alt: { es: 'Versión móvil', en: 'Mobile version' } },
    ],
    stack: ['WordPress', 'Elementor Pro', 'CSS'],
    tools: ['Elementor'],
    es: {
      label: 'Web para cliente · Restaurante',
      title: 'LezzGo Pizza',
      summary: 'Web de una pizzería italiana en La Carihuela (Torremolinos): carta online con alérgenos, historia del local y contacto.',
      description: 'Web para LezzGo Pizza, una pizzería de masa italiana en La Carihuela, Torremolinos. Presenta el local con fotografía de producto a pantalla completa, la carta online por categorías con precios y alérgenos, la historia del restaurante, horarios, cómo llegar y contacto, además de la carta en PDF en español e inglés.',
      role: 'Encargo de un cliente que quería la web de su pizzería. Diseñé y desarrollé la web completa: la estructura, el diseño en Elementor, la carta online con alérgenos y la puesta en marcha.',
      challenge: 'Que una pizzería de barrio transmitiera en la web lo mismo que en el local: producto artesanal y ambiente cuidado, y que los clientes encontrasen en segundos la carta, los alérgenos, el horario y cómo llegar.',
      work: 'Una web en WordPress con Elementor Pro: portada con fotografía de producto, carta interactiva con pestañas por categoría (bruschette, pizzas, pasta, postres…) con precios y alérgenos según la normativa europea, páginas de nosotros y contacto, carta en PDF en dos idiomas, selector de idioma, herramientas de accesibilidad y suscripción a la newsletter.',
      result: 'Web publicada y en funcionamiento.',
      cta: 'Ver la web',
    },
    en: {
      label: 'Client website · Restaurant',
      title: 'LezzGo Pizza',
      summary: 'Website for an Italian pizzeria in La Carihuela (Torremolinos, Spain): online menu with allergens, the story of the place and contact.',
      description: 'A website for LezzGo Pizza, an Italian-dough pizzeria in La Carihuela, Torremolinos. It showcases the restaurant with full-width product photography, an online menu by category with prices and allergens, the story of the place, opening hours, directions and contact, plus a PDF menu in Spanish and English.',
      role: 'Commissioned by a client who wanted a website for their pizzeria. I designed and built the whole site: the structure, the Elementor design, the online menu with allergens and the launch.',
      challenge: 'Making a neighbourhood pizzeria feel online the way it does in person, with handmade food and a carefully styled space, and letting customers find the menu, allergens, opening hours and directions in seconds.',
      work: 'A WordPress site built with Elementor Pro: a homepage with product photography, an interactive menu with category tabs (bruschette, pizzas, pasta, desserts…) showing prices and allergens as required by EU rules, about and contact pages, a two-language PDF menu, a language switcher, accessibility tools and a newsletter sign-up.',
      result: 'Website live and up and running.',
      cta: 'Visit the website',
    },
  },
  {
    id: 'fooserd',
    inGrid: true,
    types: ['personal'],
    year: P,
    url: 'https://fooserd.com',
    repo: null,
    thumb: { es: '/img/proyectos/fooserd/thumb-es.webp', en: '/img/proyectos/fooserd/thumb-en.webp' },
    gallery: [
      { src: { es: '/img/proyectos/fooserd/cover-es.webp', en: '/img/proyectos/fooserd/cover-en.webp' }, alt: { es: 'Portada de fooserd.com', en: 'fooserd.com homepage' } },
      { src: '/img/proyectos/fooserd/02.webp', alt: { es: 'Sección de servicios', en: 'Services section' } },
      { src: '/img/proyectos/fooserd/03.webp', alt: { es: 'Proyectos destacados', en: 'Featured projects' } },
      { src: '/img/proyectos/fooserd/04.webp', alt: { es: 'Formulario de contacto y presupuesto', en: 'Contact and quote form' } },
      { src: '/img/proyectos/fooserd/05.webp', alt: { es: 'Versión móvil', en: 'Mobile version' } },
    ],
    stack: ['Astro', 'Tailwind CSS', 'JavaScript'],
    tools: [P],
    es: {
      label: 'Proyecto personal · Marca propia',
      title: 'Fooserd',
      summary: 'Mi web profesional como desarrollador: servicios de desarrollo web, e-commerce e IA, proyectos y contacto.',
      description: 'Fooserd es la web de mi marca como desarrollador autónomo. Presenta los servicios que ofrezco (desarrollo web, tiendas online, integración de IA, automatizaciones y mantenimiento), los proyectos realizados, opiniones de clientes y un formulario para pedir presupuesto. Está en español e inglés y tiene páginas propias para cada servicio y cada proyecto.',
      role: 'Proyecto propio: diseño, desarrollo y contenido de toda la web.',
      challenge: 'Tener una presencia profesional propia que explicase con claridad qué hago, enseñase trabajos reales y convirtiese las visitas en peticiones de presupuesto, en dos idiomas y cargando rápido.',
      work: 'Una web en Astro con Tailwind CSS: portada animada, páginas de servicios y de proyectos, sección de opiniones, formulario de presupuesto, versión en español e inglés, chat de ayuda, gestión de cookies y SEO por servicio y por ciudad.',
      result: 'Web publicada y en funcionamiento.',
      cta: 'Ver la web',
    },
    en: {
      label: 'Personal project · Own brand',
      title: 'Fooserd',
      summary: 'My professional website as a developer: web development, e-commerce and AI services, projects and contact.',
      description: 'Fooserd is the website of my brand as a self-employed developer. It presents the services I offer (web development, online shops, AI integration, automations and maintenance), past projects, client reviews and a quote request form. It is in Spanish and English, with dedicated pages for each service and each project.',
      role: 'My own project: design, development and copy for the whole site.',
      challenge: 'Building my own professional presence that clearly explains what I do, shows real work and turns visits into quote requests, in two languages and loading fast.',
      work: 'An Astro site with Tailwind CSS: an animated homepage, service and project pages, a reviews section, a quote form, Spanish and English versions, a help chat, cookie management and SEO per service and per city.',
      result: 'Website live and up and running.',
      cta: 'Visit the website',
    },
  },
  {
    id: 'este-portfolio',
    inGrid: true,
    types: ['personal'],
    year: '2026',
    url: null,
    repo: 'https://github.com/IamYisuSB/portfolio-jesus-guerrero',
    thumb: '/img/proyectos/este-portfolio/thumb.webp?v=2',
    gallery: [
      { src: '/img/proyectos/este-portfolio/01.webp?v=2', alt: { es: 'Mesa de trabajo interactiva en modo claro', en: 'Interactive desk in light mode' } },
      { src: '/img/proyectos/este-portfolio/02.webp?v=2', alt: { es: 'Mesa con la lámpara apagada: modo oscuro, versión en inglés', en: 'Desk with the lamp off: dark mode, English version' } },
      { src: '/img/proyectos/este-portfolio/03.webp?v=2', alt: { es: 'Sección de habilidades en modo oscuro', en: 'Skills section in dark mode' } },
      { src: '/img/proyectos/este-portfolio/04.webp?v=2', alt: { es: 'Versión móvil: los objetos se apilan bajo el titular', en: 'Mobile version: objects stack below the headline' } },
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    tools: ['Visual Studio Code', 'Claude Code'],
    // "Cómo está hecha": fragmentos reales del código, comentados
    code: [
      {
        title: { es: 'Inercia con fricción', en: 'Inertia with friction' },
        es: `// Cada frame (normalizado a 60 fps) el objeto avanza y frena
o.x += o.vx * dt;
o.y += o.vy * dt;
const f = Math.pow(0.93, dt); // misma fricción a 60 o a 144 Hz
o.vx *= f;
o.vy *= f;

// Rebote en el borde: invierte la velocidad y pierde energía
if (o.x < minX) { o.x = minX; o.vx = Math.abs(o.vx) * 0.55; }`,
        en: `// Every frame (normalised to 60 fps) the object moves and slows down
o.x += o.vx * dt;
o.y += o.vy * dt;
const f = Math.pow(0.93, dt); // same friction at 60 or 144 Hz
o.vx *= f;
o.vy *= f;

// Edge bounce: flip the velocity and lose some energy
if (o.x < minX) { o.x = minX; o.vx = Math.abs(o.vx) * 0.55; }`,
      },
      {
        title: { es: '¿Clic o arrastre?', en: 'Click or drag?' },
        es: `el.addEventListener('pointerdown', (e) => {
  el.setPointerCapture(e.pointerId); // ratón, lápiz y táctil con el mismo código
  start = { x: e.clientX, y: e.clientY };
});

el.addEventListener('pointermove', (e) => {
  // Menos de 5 px es un clic (abre la ficha); más, un arrastre
  if (Math.hypot(e.clientX - start.x, e.clientY - start.y) < 5) return;
  dragging = true;
});`,
        en: `el.addEventListener('pointerdown', (e) => {
  el.setPointerCapture(e.pointerId); // mouse, pen and touch with the same code
  start = { x: e.clientX, y: e.clientY };
});

el.addEventListener('pointermove', (e) => {
  // Under 5 px it is a click (opens the sheet); more, a drag
  if (Math.hypot(e.clientX - start.x, e.clientY - start.y) < 5) return;
  dragging = true;
});`,
      },
      {
        title: { es: 'Choques entre objetos', en: 'Collisions between objects' },
        es: `// Cajas alineadas (AABB): ¿cuánto se solapan en cada eje?
const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x);
const oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);

if (ox > 0 && oy > 0) {
  // Se separan por el eje de menor solapamiento
  // y el golpeado hereda parte de la velocidad
  if (ox < oy) { b.x += Math.sign(b.x - a.x) * ox; b.vx = a.vx * 0.75; }
  else         { b.y += Math.sign(b.y - a.y) * oy; b.vy = a.vy * 0.75; }
}`,
        en: `// Axis-aligned boxes (AABB): how much do they overlap on each axis?
const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x);
const oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);

if (ox > 0 && oy > 0) {
  // Push apart along the axis with the smallest overlap
  // and hand part of the velocity to the object that was hit
  if (ox < oy) { b.x += Math.sign(b.x - a.x) * ox; b.vx = a.vx * 0.75; }
  else         { b.y += Math.sign(b.y - a.y) * oy; b.vy = a.vy * 0.75; }
}`,
      },
      {
        title: { es: 'Modo oscuro sin parpadeo', en: 'Dark mode without flicker' },
        es: `<script>
  // En el <head>, antes de pintar nada: así nunca se ve
  // un destello del tema equivocado al cargar la página
  var t = localStorage.getItem('theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = t;
</script>`,
        en: `<script>
  // In the <head>, before anything is painted: the page never
  // flashes the wrong theme while it loads
  var t = localStorage.getItem('theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = t;
</script>`,
      },
    ],
    desk: { type: 'stamp', x: 86, y: 76, rot: 10 },
    es: {
      label: 'Proyecto personal',
      title: 'Este portfolio',
      summary: 'Una mesa de trabajo interactiva hecha con HTML, CSS y JavaScript, sin frameworks ni librerías.',
      description: 'Mi portfolio planteado como una mesa de trabajo: los objetos se arrastran, se lanzan con inercia y abren fichas como esta. Está hecho sin frameworks ni librerías, en español e inglés y con modo claro y oscuro.',
      role: P,
      challenge: P,
      work: 'Física de arrastre y lanzamiento con inercia, rebotes y choques entre objetos (Pointer Events + requestAnimationFrame), una lámpara que cambia entre modo claro y oscuro con un foco que sigue al cursor, fichas en <dialog> con galería, versión en español e inglés indexable, banner de cookies y textos legales.',
      result: P,
      cta: null,
    },
    en: {
      label: 'Personal project',
      title: 'This portfolio',
      summary: 'An interactive desk built with HTML, CSS and JavaScript, no frameworks or libraries.',
      description: 'My portfolio as a work desk: objects can be dragged, thrown with inertia and opened into detail sheets like this one. Built with no frameworks or libraries, in Spanish and English, with light and dark mode.',
      role: P,
      challenge: P,
      work: 'Drag-and-throw physics with inertia, bounces and collisions between objects (Pointer Events + requestAnimationFrame), a lamp that switches between light and dark mode with a spotlight that follows the cursor, <dialog> detail sheets with a gallery, an indexable Spanish/English version, a cookie banner and legal pages.',
      result: P,
      cta: null,
    },
  },

  // ---------- Solo en la mesa ----------
  {
    id: 'experiencia',
    inGrid: false,
    desk: { type: 'badge', x: 69, y: 10, rot: 4 },
    es: {
      label: 'Disponible',
      title: 'Busco mi próximo equipo',
      summary: 'Después de mi etapa como desarrollador web autónomo, quiero incorporarme a una empresa con contrato y seguir creciendo dentro de un equipo.',
      rows: null,
      cta: 'Ver experiencia',
      ctaHref: '#experiencia',
    },
    en: {
      label: 'Open to work',
      title: 'Looking for my next team',
      summary: 'After working as a self-employed web developer, I want to join a company as an employee and keep growing as part of a team.',
      rows: null,
      cta: 'See experience',
      ctaHref: '#experience',
    },
  },
  {
    id: 'cv',
    inGrid: false,
    action: 'cv',
    desk: { type: 'cv', x: 31, y: 10, rot: -4 },
    es: {
      label: 'Currículum',
      title: 'Mi CV',
      summary: 'Ábrelo en la web, imprímelo o guárdalo en PDF para compartirlo con tu equipo.',
      rows: null,
      cta: 'Ver mi CV',
    },
    en: {
      label: 'Résumé',
      title: 'My CV',
      summary: 'Open it on the web, print it or save it as a PDF to share with your team.',
      rows: null,
      cta: 'View my CV',
    },
  },
  {
    id: 'sobre-mi',
    inGrid: false,
    photo: '/img/personal/avatar.webp?v=6',      // foto del post-it
    photoLarge: '/img/personal/avatar-lg.webp?v=3', // foto de la ficha
    desk: { type: 'postit', x: 12, y: 74, rot: 4 },
    es: {
      label: 'Sobre mí',
      title: 'Hola, soy Jesús',
      summary: [
        'Soy Jesús, desarrollador web en Granada. Empecé diseñando y construyendo webs con WordPress y Elementor, adaptadas a cada cliente y cuidando el diseño, el rendimiento y el posicionamiento.',
        'Ahora estoy dando el salto al código: me estoy formando en programación web (desarrollo en cliente y en servidor) con el certificado IFCD0210, y ya construyo proyectos con código propio, como esta misma web, hecha sin frameworks.',
        'Mi otro gran foco es la inteligencia artificial aplicada. Uso ChatGPT, Claude y GitHub Copilot en mi día a día, y desarrollo chatbots y agentes autónomos con OpenRouter, DeepSeek e InsForge como backend.',
        'Soy de los que, cuando algo le frustra, intenta construir la solución: así nacieron Pixelote, porque ningún conversor me dejaba editar todas mis fotos a la vez, y Kipack, para no volver a olvidarme nada al hacer la maleta. Ahora busco un equipo en el que seguir aprendiendo y aportar todo eso.',
      ],
      rows: null,
      cta: 'Escríbeme',
      ctaHref: '#contacto',
    },
    en: {
      label: 'About me',
      title: "Hi, I'm Jesús",
      summary: [
        "I'm Jesús, a web developer based in Granada, Spain. I started out designing and building websites with WordPress and Elementor, tailored to each client, with care for design, performance and SEO.",
        "Now I'm making the leap into code: I'm training in web programming (client-side and server-side development) through the IFCD0210 professional certificate, and I already build projects with my own code, like this very site, made without frameworks.",
        'My other big focus is applied AI. I use ChatGPT, Claude and GitHub Copilot every day, and I build chatbots and autonomous agents with OpenRouter, DeepSeek and InsForge as the backend.',
        "When something frustrates me, I try to build the fix: that's how Pixelote came about, because no converter let me edit all my photos at once, and Kipack, so I never forget anything when packing again. Now I'm looking for a team where I can keep learning and bring all of that with me.",
      ],
      rows: null,
      cta: 'Get in touch',
      ctaHref: '#contact',
    },
  },
  {
    id: 'contacto',
    inGrid: false,
    desk: { type: 'key', x: 27, y: 88, rot: -8 },
    es: {
      label: 'Contacto',
      title: '¿Hablamos?',
      summary: '¿Buscas a alguien para tu equipo? Escríbeme y lo vemos.',
      rows: null,
      cta: 'Ir a contacto',
      ctaHref: '#contacto',
    },
    en: {
      label: 'Contact',
      title: "Let's talk",
      summary: 'Looking for someone to join your team? Drop me a line.',
      rows: null,
      cta: 'Go to contact',
      ctaHref: '#contact',
    },
  },
];

// Tipos de proyecto, en el orden en que salen los filtros
export const projectTypes = ['profesional', 'personal', 'formacion', 'ia'];

export const getProject = (id) => projects.find((p) => p.id === id);
