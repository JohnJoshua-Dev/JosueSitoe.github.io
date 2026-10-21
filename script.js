/**
 * JOSUÉ SITOE — PORTFOLIO JAVASCRIPT
 * Interactivity: Typewriter, Orbitals, Animated Progress Bars, 
 * Counters, Project Filtering, Interactive Case Study Modal, Form Validation,
 * Toast Notifications, Back to Top, and Bilingual I18n (PT / EN).
 */

// ── 1. Bilingual I18n Dictionary ──
window.PORTFOLIO_I18N = {
  pt: {
    // Nav
    nav_home: "Início",
    nav_services: "Serviços",
    nav_skills: "Especialidades",
    nav_portfolio: "Projectos",
    nav_resume: "Currículo",
    nav_contact: "Contacto",
    nav_hire_me: "Contactar »",

    // Hero
    hero_avail: "Disponível para Novos Projectos",
    hero_location: "Maputo, Moçambique",
    hero_greeting_prefix: "Olá! Eu sou",
    hero_role_desc: "Desenvolvedor de Software Fullstack focado na construção de sistemas web robustos, aplicações móveis fluidas e arquitecturas de backend altamente escaláveis.",
    hero_btn_resume: "Baixar CV",
    hero_btn_watch: "Ver Projectos",

    // Services
    services_tag: "O Que Ofereço",
    services_title: "Serviços & Soluções de Desenvolvimento",
    service_1_title: "Backend & Cloud APIs",
    service_1_item_1: "Arquitecturas RESTful & Microsserviços",
    service_1_item_2: "Node.js, Laravel, Python & Java",
    service_1_item_3: "PostgreSQL, MySQL & SQL Server",
    service_1_item_4: "Sistemas Multi-tenant & Autenticação JWT",
    service_1_item_5: "Escalabilidade & Otimização de Performance",

    service_2_title: "Frontend & UI Engineering",
    service_2_item_1: "Interfaces Modernas com React & Next.js",
    service_2_item_2: "Single Page Applications (SPA) de Alta Performance",
    service_2_item_3: "Design Systems com Tailwind CSS & CSS Moderno",
    service_2_item_4: "Animações Fluidas & Micro-interacções",
    service_2_item_5: "Responsividade Impecável & Acessibilidade Web",

    service_3_title: "Mobile Apps & Automação",
    service_3_item_1: "Apps Multiplataforma Android & iOS com Flutter",
    service_3_item_2: "Progressive Web Apps (PWA) Offline-First",
    service_3_item_3: "Integração com Inteligência Artificial & OCR",
    service_3_item_4: "Automação de Processos Empresariais",
    service_3_item_5: "Backoffices & Dashboards em Tempo Real",

    // Skills
    skills_tag: "Domínio Técnico",
    skills_title: "Especialidades & Competências",
    skills_desc: "Com formação em Engenharia Informática e vasta experiência prática em sistemas corporativos e plataformas digitais em Moçambique, aplico boas práticas de arquitectura de software para criar produtos fiáveis, performantes e prontos para escalar globalmente.",
    skills_btn_cv: "Ver Currículo Completo",

    skill_backend: "Arquitectura Backend & APIs",
    skill_frontend: "Frontend Moderno & UI Engineering (React/Next)",
    skill_db: "Modelação de Dados & Otimização SQL",
    skill_mobile: "Desenvolvimento Mobile & PWA (Flutter)",
    skill_cloud: "Sistemas Multi-tenant & Integrações Cloud",

    // Stats
    stat_years: "Anos de Experiência",
    stat_projects: "Projectos Concluídos",
    stat_quality: "Compromisso & Qualidade",

    // Portfolio
    portfolio_tag: "Portfólio em Destaque",
    portfolio_title: "Projectos & Casos de Sucesso",
    filter_all: "Todos",
    filter_web: "Web & SaaS",
    filter_mobile: "Mobile & PWA",
    filter_backend: "APIs & Backend",
    filter_enterprise: "Sistemas Enterprise",
    btn_details: "Ver Detalhes",
    btn_live_demo: "Demo Ao Vivo",
    btn_view_site: "Ver Site",

    // Contact
    contact_tag: "Vamos Conversar",
    contact_title: "Tem um projecto em mente? Vamos falar.",
    contact_desc: "Estou disponível para novos projectos de consultoria, contratos remotos para o exterior e colaborações estratégicas.",
    contact_label_email: "Correio Electrónico",
    contact_label_whatsapp: "WhatsApp Directo",
    contact_label_location: "Localização",
    form_label_name: "O Seu Nome",
    form_placeholder_name: "Ex: Joshua Sitoe",
    form_label_email: "O Seu Email",
    form_placeholder_email: "nome@empresa.com",
    form_label_subject: "Assunto / Tipo de Projecto",
    form_placeholder_subject: "Ex: Desenvolvimento de Plataforma Web ou App",
    form_label_msg: "Mensagem",
    form_placeholder_msg: "Descreva os objectivos do seu projecto ou proposta...",
    btn_submit_msg: "Enviar Mensagem",

    // Modal
    modal_title_overview: "Visão Geral do Projecto",
    modal_title_arch: "Arquitectura & Tecnologias",
    modal_title_features: "Principais Funcionalidades & Desafios",
    modal_btn_close: "Fechar",
    modal_btn_visit: "Aceder à Aplicação",

    // Toast
    toast_fill_all: "Por favor, preencha todos os campos obrigatórios.",
    toast_valid_email: "Por favor, insira um email válido.",
    toast_success: "Mensagem enviada com sucesso! Entrarei em contacto em breve.",

    // Footer
    footer_role: "Desenvolvedor Fullstack · Maputo, Moçambique",
    footer_rights: "© 2026 Josué Sitoe. Todos os direitos reservados."
  },

  en: {
    // Nav
    nav_home: "Home",
    nav_services: "Services",
    nav_skills: "Skills",
    nav_portfolio: "Projects",
    nav_resume: "Resume",
    nav_contact: "Contact",
    nav_hire_me: "Hire Me »",

    // Hero
    hero_avail: "Available for New Projects",
    hero_location: "Maputo, Mozambique",
    hero_greeting_prefix: "Hello! I'm",
    hero_role_desc: "Fullstack Developer specializing in resilient web applications, mobile platforms, and high-throughput backend architectures.",
    hero_btn_resume: "Get Resume",
    hero_btn_watch: "Watch Work",

    // Services
    services_tag: "What I Offer",
    services_title: "Services Provided For My Clients",
    service_1_title: "Backend & Cloud APIs",
    service_1_item_1: "RESTful Architectures & Microservices",
    service_1_item_2: "Node.js, Laravel, Python & Java",
    service_1_item_3: "PostgreSQL, MySQL & SQL Server",
    service_1_item_4: "Multi-tenant Systems & JWT Authentication",
    service_1_item_5: "Scalability & Performance Optimization",

    service_2_title: "Frontend & UI Engineering",
    service_2_item_1: "Modern Web Interfaces with React & Next.js",
    service_2_item_2: "High-Performance Single Page Applications (SPA)",
    service_2_item_3: "Design Systems with Tailwind CSS & Modern CSS",
    service_2_item_4: "Fluid Micro-interactions & Smooth Motion",
    service_2_item_5: "Pixel-perfect Responsiveness & Accessibility",

    service_3_title: "Mobile Apps & Automation",
    service_3_item_1: "Cross-platform Android & iOS Apps with Flutter",
    service_3_item_2: "Progressive Web Apps (PWA) Offline-First",
    service_3_item_3: "AI & OCR Document Scanner Integrations",
    service_3_item_4: "Business Process Automation & Real-time Reports",
    service_3_item_5: "Real-time Backoffice & Analytics Dashboards",

    // Skills
    skills_tag: "Special Skills",
    skills_title: "My Special Skill Field Here",
    skills_desc: "Backed by Computer Engineering training and extensive production experience delivering enterprise systems in Mozambique, I unite architectural rigor with great UX to deliver robust, scalable software.",
    skills_btn_cv: "View Full Resume",

    skill_backend: "Backend & System Architecture",
    skill_frontend: "Modern Frontend & UI Engineering (React/Next)",
    skill_db: "Database Design & SQL Optimization",
    skill_mobile: "Mobile & PWA Engineering (Flutter)",
    skill_cloud: "Multi-tenant Systems & Cloud APIs",

    // Stats
    stat_years: "Years of Experience",
    stat_projects: "Projects Completed",
    stat_quality: "Client Satisfaction",

    // Portfolio
    portfolio_tag: "Awesome Portfolio",
    portfolio_title: "My Complete Projects",
    filter_all: "All",
    filter_web: "Web & SaaS",
    filter_mobile: "Mobile & PWA",
    filter_backend: "APIs & Backend",
    filter_enterprise: "Enterprise Systems",
    btn_details: "View Details",
    btn_live_demo: "Live Demo",
    btn_view_site: "Visit Site",

    // Contact
    contact_tag: "Get in Touch",
    contact_title: "Have a project in mind? Let's talk.",
    contact_desc: "I am available for contract opportunities, international remote roles, and technical collaborations.",
    contact_label_email: "Email Address",
    contact_label_whatsapp: "Direct WhatsApp",
    contact_label_location: "Location",
    form_label_name: "Your Name",
    form_placeholder_name: "E.g. Joshua Sitoe",
    form_label_email: "Your Email",
    form_placeholder_email: "name@company.com",
    form_label_subject: "Subject / Project Type",
    form_placeholder_subject: "E.g. Fullstack Platform or Mobile App",
    form_label_msg: "Message",
    form_placeholder_msg: "Tell me about your project, timeline and goals...",
    btn_submit_msg: "Send Message",

    // Modal
    modal_title_overview: "Project Overview",
    modal_title_arch: "Architecture & Tech Stack",
    modal_title_features: "Key Features & Challenges Solved",
    modal_btn_close: "Close",
    modal_btn_visit: "Visit Application",

    // Toast
    toast_fill_all: "Please fill in all required fields.",
    toast_valid_email: "Please enter a valid email address.",
    toast_success: "Message sent successfully! I will get in touch shortly.",

    // Footer
    footer_role: "Fullstack Developer · Maputo, Mozambique",
    footer_rights: "© 2026 Josué Sitoe. All rights reserved."
  }
};

// ── 2. Detailed Project Data Dictionary ──
window.PROJECTS_DATA = {
  "lavagem-auto": {
    category: "mobile",
    title: { pt: "Lavagem Auto", en: "Lavagem Auto" },
    desc: {
      pt: "Plataforma multi-tenant de lavagem automóvel ao domicílio e oficina. Inclui backoffice para operadores e PWA móvel com agendamento e pagamento de comissões.",
      en: "Multi-tenant mobile & web on-demand car wash booking platform with dispatch management and commission automation."
    },
    client: { pt: "Sector Automóvel / Serviços", en: "Automotive Services" },
    period: "2024 - 2025",
    tags: ["Node.js", "Multi-tenant", "PWA", "PostgreSQL", "REST API"],
    liveUrl: "https://lavagem-mobile.vercel.app",
    secondaryUrl: "https://autolavagem-api.onrender.com",
    secondaryLabel: { pt: "Backoffice Web", en: "Web Backoffice" },
    overview: {
      pt: "Sistema completo que digitaliza o serviço de lavagem automóvel. Clientes solicitam lavagens indicando a localização exata e modelo do carro; operadores recebem pedidos em tempo real com desconto automático de taxa de intermediação.",
      en: "Full ecosystem modernizing vehicle wash services. Vehicle owners book appointments at home or garage; operators receive requests in real-time with automated system fee retention."
    },
    features: [
      { pt: "Arquitectura multi-tenant para gerir múltiplas garagens e operadores independentes.", en: "Multi-tenant architecture isolating operations across independent garages." },
      { pt: "Progressive Web App (PWA) instalável em Android e iOS com funcionamento offline.", en: "Progressive Web App installable on iOS and Android with offline capability." },
      { pt: "Painel administrativo de controlo financeiro, métricas e taxas de comissão.", en: "Administrative dashboard with financial reporting and fee commission engine." }
    ]
  },

  "credium-smart": {
    category: "backend",
    title: { pt: "API Credium Smart", en: "Credium Smart API" },
    desc: {
      pt: "Backend robusto e API para solução multi-tenant de gestão inteligente de microcrédito: análise de risco, cobranças, RH e liquidações.",
      en: "Enterprise multi-tenant microcredit backend platform managing loan workflows, risk scoring, repayments, and HR."
    },
    client: { pt: "Credium Smart Fintech", en: "Credium Smart Fintech" },
    period: "2024",
    tags: ["Laravel", "MySQL", "Multi-tenant", "Fintech", "Security"],
    liveUrl: "https://crediumsmart.com",
    overview: {
      pt: "Desenvolvimento do motor central de microcrédito cobrindo o ciclo de vida completo do cliente: desde a submissão da proposta, cálculo automático de juros e amortizações, até lembretes de pagamento e conformidade regulatória.",
      en: "Core microcredit calculation and disbursement engine covering loan origination, interest amortization schedules, repayment triggers, and audit compliance."
    },
    features: [
      { pt: "Isolamento estrito de dados entre inquilinos (multi-tenant) com elevada segurança.", en: "Strict tenant data segregation ensuring institutional data compliance." },
      { pt: "Cálculo de juros compostos e planos de amortização flexíveis em milissegundos.", en: "Real-time interest amortization and dynamic installment recalculation." },
      { pt: "Integração de endpoints RESTful para consumo por aplicações web e mobile.", en: "High-throughput RESTful endpoints designed for web and mobile frontends." }
    ]
  },

  "central-academica": {
    category: "enterprise",
    title: { pt: "Central Académica", en: "Central Académica" },
    desc: {
      pt: "Sistema de gestão escolar integrado com digitalização automática por OCR de certificados, pautas e documentos oficiais.",
      en: "Comprehensive school management system equipped with automated optical document scanning and OCR ingestion."
    },
    client: { pt: "Instituições de Ensino", en: "Academic Institutions" },
    period: "2023 - 2024",
    tags: ["Python", "OCR", "MySQL", "Gestão Escolar"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Plataforma de controlo pedagógico e administrativo que elimina o preenchimento manual de notas através da leitura óptica inteligente de pautas em papel.",
      en: "School administration and student records system replacing manual data entry with automated optical character recognition on paper exams."
    },
    features: [
      { pt: "Processamento de imagem e reconhecimento de caracteres (OCR) para extrair notas.", en: "Computer vision and OCR pipeline reading grade tables from scanned documents." },
      { pt: "Gestão completa de matrículas, turmas, professores e emissão de declarações com QR Code.", en: "Student registration, course scheduling, and verifiable QR-coded transcript issuance." },
      { pt: "Relatórios estatísticos de aproveitamento escolar por disciplina e ano lectivo.", en: "Comprehensive grade analytics and academic pass rate reporting." }
    ]
  },

  "portal-pedidos": {
    category: "enterprise",
    title: { pt: "Portal de Pedidos", en: "Orders & Workflow Portal" },
    desc: {
      pt: "Plataforma corporativa de gestão de requisições internas entre departamentos com relatórios em Excel e notificações instantâneas.",
      en: "Enterprise procurement and internal requisition management portal with dynamic Excel generation and instant notifications."
    },
    client: { pt: "Sector Empresarial", en: "Enterprise Client" },
    period: "2023",
    tags: ["Laravel", "React", "SQL Server", "Excel Export", "Workflows"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Eliminou o trânsito de emails e formulários físicos de compras entre departamentos, implementando fluxos de aprovação com hierarquias, SLA de resposta e auditoria.",
      en: "Eliminated fragmented email requisition chains by implementing hierarchical approval rules, SLA tracking, and audit-logged procurement orders."
    },
    features: [
      { pt: "Fluxos de aprovação hierárquicos personalizáveis com assinaturas digitais.", en: "Configurable multi-level managerial approval chains with digital audit trails." },
      { pt: "Geração instantânea de relatórios consolidados em Microsoft Excel.", en: "High-performance automated Microsoft Excel spreadsheet data exportation." },
      { pt: "Dashboard reactivo construído em React com sincronização de estado.", en: "Interactive React administrative interface with live status notifications." }
    ]
  },

  "siagd": {
    category: "enterprise",
    title: { pt: "SIAGD", en: "SIAGD Performance System" },
    desc: {
      pt: "Sistema Integrado de Análise e Gestão de Desempenho para monitorização de metas, avaliações 360°, gestão de férias e KPIs.",
      en: "Integrated Performance Management System tracking organizational OKRs, 360° employee reviews, and vacation management."
    },
    client: { pt: "Sector Público / Corporativo", en: "Corporate / Institutional" },
    period: "2024",
    tags: ["Node.js", "PostgreSQL", "KPIs", "RH Enterprise"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Solução desenhada para alinhar os objectivos estratégicos da organização com as tarefas individuais dos colaboradores, desde a auto-avaliação até à avaliação pelos directores.",
      en: "Strategic solution aligning institutional OKRs with individual employee deliverables, managing self-appraisals and executive evaluations."
    },
    features: [
      { pt: "Módulo de avaliação em cadeia: autoavaliação, chefia directa e validação executiva.", en: "Multi-tiered review flow: self-assessment, managerial appraisal, and board validation." },
      { pt: "Gestão inteligente de férias com prevenção de sobreposição de equipas.", en: "Automated leave tracking preventing department scheduling conflicts." },
      { pt: "Métricas de produtividade e relatórios de progresso em tempo real.", en: "Executive productivity metrics and team goal attainment indicators." }
    ]
  },

  "gerador-propostas": {
    category: "web",
    title: { pt: "Gerador de Propostas", en: "Commercial Proposal Engine" },
    desc: {
      pt: "Aplicação web que gera propostas comerciais dinâmicas, criando em simultâneo uma Landing Page exclusiva e um PowerPoint (PPTX) com telemetria.",
      en: "Automated business proposal generator synthesizing interactive client landing pages and PPTX decks with view analytics."
    },
    client: { pt: "Equipas Comerciais", en: "B2B Sales Teams" },
    period: "2024 - 2025",
    tags: ["Node.js", "Python", "Supabase", "Telemetry", "PPTX Automation"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Permite à equipa de vendas criar propostas interactivas em minutos. A plataforma rastreia se o cliente abriu a proposta, quanto tempo permaneceu em cada secção e disponibiliza botões imediatos de fecho de negócio.",
      en: "Empowers sales teams to generate bespoke proposal landing pages in minutes. Tracks client read receipts, section dwelling times, and embedded closing CTAs."
    },
    features: [
      { pt: "Criação simultânea de link web interactivo e ficheiro PowerPoint .pptx.", en: "Simultaneous rendering of both interactive web proposal and downloadable PPTX." },
      { pt: "Rastreio em tempo real de visualização e telemetria de leitura do cliente.", en: "Granular client viewing telemetry notifying reps the instant a proposal is opened." },
      { pt: "Base de dados no Supabase com autenticação e CDN integrada.", en: "Built on Supabase with fast cloud storage and real-time event triggers." }
    ]
  },

  "ouvir-texto": {
    category: "web",
    title: { pt: "OuvirTexto (AI Speech)", en: "OuvirTexto (AI Speech)" },
    desc: {
      pt: "Conversor inteligente de texto para voz com síntese de fala e inteligência artificial para promover acessibilidade digital a pessoas com deficiência visual.",
      en: "AI-assisted text-to-speech accessibility platform converting written content into natural audio streams for visually impaired users."
    },
    client: { pt: "Inovação Social & Acessibilidade", en: "Social Innovation & Accessibility" },
    period: "2023",
    tags: ["JavaScript", "Web Speech API", "AI Synthesis", "Accessibility"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Aplicação voltada para inclusão digital, permitindo a utilizadores colar qualquer texto ou carregar artigos e ouvi-los com cadência, velocidade ajustável e suporte a vários idiomas.",
      en: "Digital inclusion platform allowing users to paste any article or document and listen with natural speech cadences and variable pitch/rate controls."
    },
    features: [
      { pt: "Síntese de voz com modulação de velocidade, tom e seleção de vozes neurais.", en: "Speech synthesis engine with fine pitch, tempo and voice modulation controls." },
      { pt: "Interface minimalista e desenhada segundo as directrizes de acessibilidade WCAG.", en: "Clean interface compliant with WCAG accessibility guidelines." },
      { pt: "Funcionalidade instantânea no navegador sem necessidade de plugins externos.", en: "Zero external dependencies: 100% browser-native synthesis engine." }
    ]
  },

  "app-stock": {
    category: "mobile",
    title: { pt: "AppStockP4y", en: "AppStockP4y" },
    desc: {
      pt: "Sistema de gestão de inventário e vendas para web e mobile com sincronização em tempo real entre armazéns e pontos de venda.",
      en: "Multi-platform stock management and POS app synchronizing inventory in real-time across decentralized warehouses."
    },
    client: { pt: "Comércio & Varejo", en: "Retail & Supply Chain" },
    period: "2023 - 2024",
    tags: ["Flutter", "Laravel", "SQL Server", "Barcode Scanner"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Controla entradas, saídas, níveis críticos de stock e vendas de retalho, com suporte a leitura de códigos de barra pela câmara do telemóvel e relatórios fiscais.",
      en: "Manages warehouse dispatch, low-stock threshold triggers, and retail points of sale with phone camera barcode scanning integration."
    },
    features: [
      { pt: "App móvel desenvolvida em Flutter para Android e iOS com leitura de código de barras.", en: "Cross-platform Flutter mobile application with integrated barcode reading." },
      { pt: "Sincronização imediata com base de dados central em SQL Server.", en: "Immediate bidirectional state synchronization with central SQL Server database." },
      { pt: "Alertas automáticos de ruptura de stock e controlo de lotes por data de validade.", en: "Automated stock depletion warning alerts and batch expiration tracking." }
    ]
  },

  "assinatura-digital": {
    category: "backend",
    title: { pt: "Assinatura Digital", en: "Digital Signature Engine" },
    desc: {
      pt: "API e portal de assinatura digital de documentos que permite definir as coordenadas exactas da rubrica em PDFs corporativos com conformidade legal.",
      en: "Digital document signing API allowing users to position verified signatures with exact X/Y coordinate precision on enterprise PDFs."
    },
    client: { pt: "Sector Jurídico / Corporativo", en: "Enterprise Legal & Ops" },
    period: "2024",
    tags: ["Laravel", "SQL Server", "PDF Processing", "Security"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Componente arquitectural integrado no Portal de Pedidos que agilizou a aprovação de compras, substituindo impressões físicas por assinaturas digitais com carimbo temporal.",
      en: "Security microservice enabling instantaneous corporate approvals by embedding legally auditable signatures and timestamps on PDF contracts."
    },
    features: [
      { pt: "Editor visual para posicionamento de campos de assinatura no documento.", en: "Visual canvas editor for dragging signature boxes onto exact document coordinates." },
      { pt: "Geração de certificado de conformidade com hash de integridade e timestamp.", en: "Verification audit certificate stamping each signed page with integrity hash." },
      { pt: "API RESTful pronta para integração em qualquer sistema externo.", en: "Modular RESTful endpoints consumable by external enterprise portals." }
    ]
  },

  "myweeding": {
    category: "web",
    title: { pt: "MyWeeding Platform", en: "MyWeeding Platform" },
    desc: {
      pt: "Plataforma web de celebração com contagem decrescente em tempo real, lista de presentes interactiva com reserva por checkbox e mapa integrado.",
      en: "Custom interactive wedding experience platform featuring real-time countdown, gift registry booking, and live venue navigation."
    },
    client: { pt: "Projecto Especial Ao Vivo", en: "Special Live Project" },
    period: "2024",
    tags: ["HTML5", "CSS3", "JavaScript", "Canvas API", "GitHub Pages"],
    liveUrl: "https://johnjoshua-dev.github.io/JosueSitoe.github.io/myweeding/",
    overview: {
      pt: "Experiência web elegante criada de raiz para um casamento memorável. Conectada com animações fluidas em Canvas, lista de presentes interactiva que evita presentes duplicados e mapa integrado.",
      en: "Bespoke digital celebration web app. Powered by fluid HTML5 Canvas animations, an interactive gift booking registry preventing duplicate selections, and venue maps."
    },
    features: [
      { pt: "Contador regressivo ultra-preciso em tempo real sincronizado por fuso horário.", en: "Real-time timezone-synchronized countdown clock." },
      { pt: "Lista de presentes interactiva com bloqueio imediato para evitar duplicações.", en: "Interactive gift registry with real-time reservation locking." },
      { pt: "Hospedado no GitHub Pages com performance perfeita de carregamento.", en: "Zero-latency deployment on GitHub Pages with lightweight responsive design." }
    ]
  },

  "gestao-academica-java": {
    category: "enterprise",
    title: { pt: "Gestão Universitária Java", en: "Java University Management" },
    desc: {
      pt: "Aplicação Java Web empresarial para gestão de faculdades: módulos financeiros, alocação de docentes, pautas e exames académicos.",
      en: "Enterprise Java web architecture managing university faculties: tuition fees, teacher allocation, courses, and exam scoring."
    },
    client: { pt: "Ensino Superior", en: "Higher Education" },
    period: "2023",
    tags: ["Java", "Java Web", "MySQL", "MVC Architecture"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Sistema concebido segundo os padrões rigorosos de arquitectura MVC em Java, gerindo toda a cadeia administrativa de uma instituição de ensino universitário.",
      en: "Engineered according to rigorous Java Enterprise MVC architectural patterns, handling academic faculties, fee accounting, and student transcripts."
    },
    features: [
      { pt: "Módulo de tesouraria com controlo de propinas, multas e emissão de recibos.", en: "Treasury and tuition accounting module with automated late fee calculation." },
      { pt: "Alocação de horários e salas evitando conflitos de docentes.", en: "Teacher and classroom schedule solver preventing room double-bookings." },
      { pt: "Código-fonte aberto e documentado no repositório GitHub.", en: "Modular and documented open-source code available on GitHub." }
    ]
  },

  "we-code": {
    category: "enterprise",
    title: { pt: "Iniciativa We Code", en: "We Code Initiative" },
    desc: {
      pt: "Programa de capacitação prática em Java que criei para guiar estudantes universitários a transformar a teoria académica em soluções funcionais do mercado.",
      en: "Educational programming mentorship initiative founded to help university students bridge academic theory with production software delivery."
    },
    client: { pt: "Comunidade Académica", en: "Developer Community" },
    period: "2025 (3 Meses)",
    tags: ["Java", "Mentoria", "Clean Code", "Design Patterns"],
    liveUrl: null,
    githubUrl: "https://github.com/JohnJoshua-Dev",
    overview: {
      pt: "Iniciativa criada para acelerar o desenvolvimento de jovens talentos de engenharia informática em Maputo, ensinando padrões de projecto (OOP, SOLID, Clean Code) através da construção de projectos reais.",
      en: "Community initiative founded in Maputo to accelerate software engineering students through hands-on project building, SOLID design principles, and Git workflows."
    },
    features: [
      { pt: "Orientação técnica prática de 3 meses cobrindo fundamentos e mercado real.", en: "3-month practical curriculum bridging theoretical fundamentals with industry demands." },
      { pt: "Workshops de boas práticas: Git, Clean Architecture e Testes Unitários.", en: "Hands-on workshops teaching Git collaboration, clean code, and unit testing." },
      { pt: "Orientação de alunos que hoje desenvolvem software para o mercado moçambicano.", en: "Mentored aspiring engineers who now build production software in Mozambique." }
    ]
  }
};

// ── 3. DOM Ready Initialization ──
document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initHeaderScroll();
  initMobileMenu();
  initSkillsObserver();
  initCountersObserver();
  initPortfolioFilters();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initLanguageSwitcher();
  initScrollReveal();
});

// ── 4. Typewriter Effect ──
function initTypewriter() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  const roles = [
    "React & Next.js",
    "Laravel & Node.js",
    "Flutter & Mobile Apps",
    "PostgreSQL & Cloud APIs",
    "Sistemas Multi-tenant",
    "Clean Architecture & DevOps"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 45 : 95;

    if (!isDeleting && charIdx === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

// ── 5. Header Scroll Effect ──
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ── 6. Mobile Menu ──
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const panel = document.getElementById("mobile-nav-panel");
  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
    const icon = toggleBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  panel.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      panel.classList.remove("open");
      const icon = toggleBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  });
}

// ── 7. Skills Animated Progress Bars ──
function initSkillsObserver() {
  const skillsSection = document.getElementById("habilidades");
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skill-fill").forEach(fill => {
          const target = fill.getAttribute("data-width") || "80%";
          fill.style.width = target;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(skillsSection);
}

// ── 8. Counters Observer ──
function initCountersObserver() {
  const statsSection = document.getElementById("estatisticas");
  if (!statsSection) return;

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".counter-num").forEach(countUp);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  observer.observe(statsSection);
}

// ── 9. Portfolio Filter Tabs & Slider Controls ──
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Slider buttons (scroll to top of grid or cycle)
  const prevBtn = document.getElementById("portfolio-prev");
  const nextBtn = document.getElementById("portfolio-next");
  const grid = document.querySelector(".portfolio-grid");

  if (prevBtn && nextBtn && grid) {
    prevBtn.addEventListener("click", () => {
      grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    nextBtn.addEventListener("click", () => {
      grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
}

// ── 10. Interactive Case Study Modal ──
function initProjectModal() {
  const overlay = document.getElementById("project-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");
  if (!overlay || !closeBtn) return;

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeModal();
    }
  });

  // Open modal buttons
  document.querySelectorAll("[data-open-project]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projId = btn.getAttribute("data-open-project");
      openProjectModal(projId);
    });
  });
}

function openProjectModal(projId) {
  const data = window.PROJECTS_DATA[projId];
  if (!data) return;

  const lang = document.documentElement.lang === "en" ? "en" : "pt";
  const overlay = document.getElementById("project-modal-overlay");

  // Populate Title & Meta
  document.getElementById("modal-project-title").textContent = data.title[lang] || data.title.pt;
  document.getElementById("modal-project-client").textContent = data.client[lang] || data.client.pt;
  document.getElementById("modal-project-period").textContent = data.period;

  // Tags
  const tagsContainer = document.getElementById("modal-project-tags");
  tagsContainer.innerHTML = "";
  data.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "tag-badge";
    span.textContent = t;
    tagsContainer.appendChild(span);
  });

  // Overview
  document.getElementById("modal-project-overview").textContent = data.overview[lang] || data.overview.pt;

  // Features list
  const featuresList = document.getElementById("modal-project-features");
  featuresList.innerHTML = "";
  data.features.forEach(f => {
    const li = document.createElement("li");
    li.className = "modal-feature-item";
    li.innerHTML = `<i class="fas fa-check-circle"></i><span>${f[lang] || f.pt}</span>`;
    featuresList.appendChild(li);
  });

  // Action links in modal footer
  const liveBtn = document.getElementById("modal-live-btn");
  if (data.liveUrl) {
    liveBtn.style.display = "inline-flex";
    liveBtn.href = data.liveUrl;
  } else if (data.githubUrl) {
    liveBtn.style.display = "inline-flex";
    liveBtn.href = data.githubUrl;
    liveBtn.innerHTML = `<i class="fab fa-github"></i> <span>GitHub Code</span>`;
  } else {
    liveBtn.style.display = "none";
  }

  // Open overlay
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

// ── 11. Contact Form & Toast Feedback ──
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name")?.value.trim();
    const email = document.getElementById("form-email")?.value.trim();
    const message = document.getElementById("form-message")?.value.trim();
    const lang = document.documentElement.lang === "en" ? "en" : "pt";
    const dict = window.PORTFOLIO_I18N[lang];

    if (!name || !email || !message) {
      showToast(dict.toast_fill_all, "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast(dict.toast_valid_email, "error");
      return;
    }

    showToast(dict.toast_success, "success");
    form.reset();
  });
}

function showToast(message, type = "success") {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    document.body.appendChild(toast);
  }

  const icon = type === "success" ? "✅" : "⚠️";
  toast.className = `toast-msg show ${type}`;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// ── 12. Floating Back to Top Button ──
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── 13. Language Switcher (PT / EN) ──
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll(".lang-btn");

  function applyLang(lang) {
    if (!window.PORTFOLIO_I18N[lang]) lang = "pt";
    const dict = window.PORTFOLIO_I18N[lang];

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    document.documentElement.lang = lang;

    langBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Update Resume Download & View Links
    const cvLink = document.getElementById("hero-cv-link");
    if (cvLink) {
      cvLink.href = lang === "en" ? "cv/?lang=en" : "cv/";
    }

    const downloadLink = document.getElementById("hero-download-link");
    if (downloadLink) {
      const file = lang === "en" ? "cv/cv-Josué-EN.pdf" : "cv/cv-Josué.pdf";
      downloadLink.href = file + "?v=6";
      downloadLink.setAttribute("download", lang === "en" ? "cv-Josue-EN.pdf" : "cv-Josue.pdf");
    }

    try {
      localStorage.setItem("portfolio_lang", lang);
    } catch (e) {}
  }

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  // Check saved or URL param
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  let savedLang = null;
  try {
    savedLang = localStorage.getItem("portfolio_lang");
  } catch (e) {}

  applyLang(urlLang || savedLang || "pt");
}

// ── 14. Scroll Reveal Animations ──
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}
