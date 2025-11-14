import type { Language } from "@/lib/translations"

// service-data.ts stores the localized long-form copy for each service detail page.

export type ServiceSlug =
  | "web-design-suite"
  | "website-audit"
  | "website-redesign-seo"
  | "email-design"
  | "ad-design"
  | "full-brand-package"

type ServiceCopy = {
  title: string
  subtitle: string
  description: string
  features: string[]
  process: Array<{ title: string; description: string }>
  benefits: Array<{ title: string; description: string }>
  pricing: { starting: string; description: string }
}

export type ServiceContent = ServiceCopy
type ServiceData = Record<ServiceSlug, Record<Language, ServiceCopy>>

export const servicesData: ServiceData = {
  "web-design-suite": {
    en: {
      title: "Web Design + Development + Hosting + SEO",
      subtitle: "One engagement that takes you from blank page to a fast, hosted, search-ready site.",
      description:
        "Strategy, UX, UI, code, hosting, and SEO are handled by a single partner so you get a cohesive launch. We translate your goals into a systemized design language, build a performant site, configure managed hosting, and ship with the technical SEO foundations already in place.",
      features: [
        "Discovery and brand alignment intensive",
        "Information architecture, UX flows, and wireframes",
        "High-fidelity UI system and component library",
        "Custom development with modern frameworks/CMS",
        "Performance, accessibility, and QA verification",
        "Managed hosting setup, monitoring, and backups",
        "Technical SEO (schema, metadata, redirects, sitemap)",
        "Analytics, conversion, and tag management setup",
      ],
      process: [
        {
          title: "Strategy Intensive",
          description: "Clarify goals, audience, success metrics, and content priorities.",
        },
        {
          title: "Experience Design",
          description: "Map journeys, wireframe, and craft a modular design system.",
        },
        {
          title: "Build & Integrate",
          description: "Develop the site, connect CMS/data sources, and harden performance.",
        },
        {
          title: "Launch & Optimize",
          description: "Deploy to managed hosting, implement SEO + analytics, and document operations.",
        },
      ],
      benefits: [
        {
          title: "Single Ownership",
          description: "One point of contact for design, development, hosting, and SEO.",
        },
        {
          title: "Future-Proof Stack",
          description: "Clean architecture that is easy to extend and maintain.",
        },
        {
          title: "Search-Ready Launch",
          description: "Metadata, schema, and tracking are in place from day one.",
        },
      ],
      pricing: {
        starting: "$8,500",
        description: "Comprehensive build with guided launch support.",
      },
    },
    bg: {
      title: "Уеб дизайн + разработка + хостинг + SEO",
      subtitle: "Една услуга, която ви води от празен екран до бърз, хостнат и SEO-готов сайт.",
      description:
        "Стратегия, UX, UI, разработка, хостинг и SEO са в едни ръце, за да получите последователен резултат. Превръщам целите ви в дизайн система, изграждам производителен сайт, конфигурирам хостинг и предавам проекта с готови технически SEO основи.",
      features: [
        "Интензив за стратегия и бранд",
        "Информационна архитектура, UX потоци и wireframes",
        "Високофиделна UI система и компонентна библиотека",
        "Персонализирана разработка с модерни рамки/CMS",
        "Тестове за производителност, достъпност и качество",
        "Настройка на управляван хостинг, мониторинг и бекъпи",
        "Техническо SEO (schema, мета данни, редиректи, sitemap)",
        "Настройка на аналитики, конверсии и tag management",
      ],
      process: [
        {
          title: "Стратегически интензив",
          description: "Изяснявам цели, аудитория, KPI и приоритети за съдържание.",
        },
        {
          title: "Дизайн на изживяването",
          description: "Планирам journeys, изработвам wireframes и модулна дизайн система.",
        },
        {
          title: "Изграждане и интеграция",
          description: "Разработвам сайта, свързвам CMS/данни и оптимизирам производителността.",
        },
        {
          title: "Пуск и оптимизация",
          description: "Деплой на управляван хостинг, SEO + аналитики и документация.",
        },
      ],
      benefits: [
        {
          title: "Един отговорен партньор",
          description: "Координирам дизайн, код, хостинг и SEO без разминавания.",
        },
        {
          title: "Модерен технологичен стек",
          description: "Чист код и архитектура за лесна поддръжка и надграждане.",
        },
        {
          title: "Готов за търсачки старт",
          description: "Мета данни, schema и проследяване са активни от първия ден.",
        },
      ],
      pricing: {
        starting: "$8,500",
        description: "Цялостна изработка с подкрепа при старта.",
      },
    },
  },
  "website-audit": {
    en: {
      title: "Website Audit",
      subtitle: "Actionable diagnosis across UX, performance, accessibility, and SEO.",
      description:
        "When you need clarity before investing in updates, an audit surfaces exactly what is working, what is broken, and what to tackle first. You receive a prioritized roadmap with effort estimates, benchmark data, and quick wins.",
      features: [
        "Heuristic UX and content review",
        "Technical SEO crawl and indexability report",
        "Performance & Core Web Vitals analysis",
        "Accessibility and compliance scan",
        "Analytics, funnels, and event review",
        "Competitive & keyword snapshot",
        "Prioritized issue list with effort estimates",
        "30-day action plan workshop",
      ],
      process: [
        {
          title: "Intake & Goals",
          description: "Gather context, audience data, and KPIs.",
        },
        {
          title: "Data Capture",
          description: "Run crawls, audits, speed tests, and analytics exports.",
        },
        {
          title: "Evaluation",
          description: "Score findings, identify root causes, and group themes.",
        },
        {
          title: "Roadmap Workshop",
          description: "Review recommendations, timelines, and ownership.",
        },
      ],
      benefits: [
        {
          title: "Clarity",
          description: "Know what to fix and why it matters.",
        },
        {
          title: "Quick Wins",
          description: "Immediate optimizations you can deploy this week.",
        },
        {
          title: "Aligned Stakeholders",
          description: "Shared roadmap keeps teams focused on impact.",
        },
      ],
      pricing: {
        starting: "$1,200",
        description: "Two-week audit sprint with live debrief.",
      },
    },
    bg: {
      title: "Одит на уебсайт",
      subtitle: "Практичен анализ на UX, производителност, достъпност и SEO.",
      description:
        "Когато искате яснота преди инвестиция, одитът показва какво работи, какво е проблем и какво да приоритизирате. Получавате roadmap с приоритети, оценка на усилието и бенчмаркове.",
      features: [
        "Хеуристичен преглед на UX и съдържание",
        "Технически SEO crawl и доклад за индексация",
        "Анализ на производителност и Core Web Vitals",
        "Скен за достъпност и съответствие",
        "Преглед на аналитики, фунии и събития",
        "Снимка на конкуренти и ключови думи",
        "Списък с проблеми и оценка на усилието",
        "Работилница с план за 30 дни",
      ],
      process: [
        {
          title: "Откриване и цели",
          description: "Събирам контекст, аудитория и KPI.",
        },
        {
          title: "Събиране на данни",
          description: "Пускам crawl, тестове за скорост и изнасям аналитики.",
        },
        {
          title: "Оценка",
          description: "Скоринг на находките и групиране по теми.",
        },
        {
          title: "Работилница",
          description: "Обсъждаме препоръките, сроковете и отговорните лица.",
        },
      ],
      benefits: [
        {
          title: "Ясна картина",
          description: "Знаете какво да оправите и защо е важно.",
        },
        {
          title: "Бързи победи",
          description: "Оптимизации, които може да внедрите веднага.",
        },
        {
          title: "Синхрон в екипа",
          description: "Общ план, който фокусира всички върху резултатите.",
        },
      ],
      pricing: {
        starting: "$1,200",
        description: "Двуседмичен одит с live сесия за представяне.",
      },
    },
  },
  "website-redesign-seo": {
    en: {
      title: "Website Redesign + SEO",
      subtitle: "Refresh your experience while strengthening organic performance.",
      description:
        "A redesign is the perfect moment to fix structural issues and modernize SEO. I pair new UX/UI with technical SEO, schema, redirects, and content optimization so you relaunch with momentum instead of recovering for months.",
      features: [
        "UX audit and persona alignment",
        "Modern UI refresh and component library",
        "Content architecture and messaging updates",
        "Conversion-focused page templates",
        "Technical SEO remediation plan",
        "On-page copy and metadata optimization",
        "Redirect mapping and migration checklist",
        "Post-launch monitoring and tuning",
      ],
      process: [
        {
          title: "Research & SEO Baseline",
          description: "Audit the current site, rankings, and content gaps.",
        },
        {
          title: "Experience Design",
          description: "Redesign key pages and interactions around new goals.",
        },
        {
          title: "Build & Migrate",
          description: "Implement designs, update content, and prep redirects.",
        },
        {
          title: "Launch & Optimize",
          description: "Monitor performance, fine-tune SEO, and hand off learnings.",
        },
      ],
      benefits: [
        {
          title: "Cohesive Refresh",
          description: "Design, messaging, and SEO evolve together.",
        },
        {
          title: "Organic Lift",
          description: "Technical fixes and content tuning drive visibility.",
        },
        {
          title: "Low-Risk Migration",
          description: "Structured redirects and QA protect current rankings.",
        },
      ],
      pricing: {
        starting: "$5,500",
        description: "Includes redesign, SEO remediation, and launch support.",
      },
    },
    bg: {
      title: "Редизайн на уебсайт + SEO",
      subtitle: "Обновете изживяването и подсилете органичните резултати.",
      description:
        "Редизайнът е моментът да коригираме структурата и да модернизираме SEO. Съчетававам нов UX/UI с техническо SEO, schema, редиректи и оптимизация на съдържание, за да стартирате с тласък, а не с месеци възстановяване.",
      features: [
        "UX одит и подравняване с персони",
        "Модерен UI и компонентна библиотека",
        "Обновена архитектура и послания",
        "Шаблони с фокус върху конверсии",
        "План за техническо SEO и поправки",
        "Он-пейдж оптимизация и мета данни",
        "Карта на редиректите и чеклист за миграция",
        "Мониторинг и оптимизация след пуск",
      ],
      process: [
        {
          title: "Проучване и SEO база",
          description: "Анализирам текущия сайт, ранкинги и съдържателни пропуски.",
        },
        {
          title: "Дизайн на изживяването",
          description: "Редизайн на ключови страници спрямо новите цели.",
        },
        {
          title: "Изграждане и миграция",
          description: "Имплементирам дизайна, обновявам съдържание и подготвям редиректи.",
        },
        {
          title: "Пуск и оптимизация",
          description: "Следя резултатите, настройвам SEO и предавам знанията.",
        },
      ],
      benefits: [
        {
          title: "Единен резултат",
          description: "Дизайн, послания и SEO се развиват заедно.",
        },
        {
          title: "Органичен ръст",
          description: "Технически подобрения и съдържание повишават видимостта.",
        },
        {
          title: "Контролирана миграция",
          description: "Структурирани редиректи и QA пазят текущите позиции.",
        },
      ],
      pricing: {
        starting: "$5,500",
        description: "Включва редизайн, SEO подобрения и подкрепа при пуск.",
      },
    },
  },
  "email-design": {
    en: {
      title: "HTML Email Design",
      subtitle: "Beautiful, responsive emails that look perfect everywhere",
      description:
        "Email is still one of the most effective marketing channels. I design and code custom HTML emails that work flawlessly across all email clients and devices, helping you connect with your audience effectively.",
      features: [
        "Custom Email Templates",
        "Responsive Design",
        "Cross-Client Compatibility",
        "Brand Integration",
        "CTA Optimization",
        "Modular Components",
        "A/B Testing Support",
        "Email Accessibility",
      ],
      process: [
        {
          title: "Requirements",
          description: "Understanding your email marketing goals",
        },
        {
          title: "Design",
          description: "Creating beautiful layouts aligned with your brand",
        },
        {
          title: "Development",
          description: "Coding bulletproof HTML that works everywhere",
        },
        {
          title: "Testing",
          description: "Verifying rendering across clients and devices",
        },
      ],
      benefits: [
        {
          title: "Consistent Rendering",
          description: "Reliable performance across inboxes",
        },
        {
          title: "Higher Engagement",
          description: "CTA-first layouts that boost clicks",
        },
        {
          title: "Faster Production",
          description: "Modular systems for quick iterations",
        },
      ],
      pricing: {
        starting: "$400",
        description: "Per template design & build",
      },
    },
    bg: {
      title: "HTML имейл дизайн",
      subtitle: "Красиви, адаптивни имейли, които изглеждат отлично навсякъде",
      description:
        "Имейлът остава един от най-силните канали. Създавам и кодирам персонализирани HTML шаблони, които работят безупречно във всички клиенти и устройства, за да общувате ефективно с аудиторията си.",
      features: [
        "Персонализирани имейл шаблони",
        "Адаптивен дизайн",
        "Съвместимост между клиенти",
        "Интеграция с бранда",
        "Оптимизация на CTA",
        "Модулни компоненти",
        "Поддръжка за A/B тестове",
        "Достъпност в имейлите",
      ],
      process: [
        {
          title: "Изисквания",
          description: "Определям целите на кампанията",
        },
        {
          title: "Дизайн",
          description: "Създавам красиви оформления по вашия бранд",
        },
        {
          title: "Разработка",
          description: "Кодиране на надежден HTML, който работи навсякъде",
        },
        {
          title: "Тестване",
          description: "Проверка във всички клиенти и устройства",
        },
      ],
      benefits: [
        {
          title: "Консистентно изобразяване",
          description: "Гарантирана визия във всеки inbox",
        },
        {
          title: "По-високо ангажиране",
          description: "CTA-фокусирани дизайни за повече кликове",
        },
        {
          title: "Бързо производство",
          description: "Модулни системи за лесни итерации",
        },
      ],
      pricing: {
        starting: "$400",
        description: "Цена на шаблон (дизайн + код)",
      },
    },
  },
  "ad-design": {
    en: {
      title: "Ad Design",
      subtitle: "High-performing ad creatives for every platform",
      description:
        "Stand out in crowded digital spaces with compelling ad creatives. I design high-performing ads optimized for platforms like Google, Facebook, Instagram, LinkedIn, and more.",
      features: [
        "Multi-Platform Ad Sets",
        "Static & Motion Graphics",
        "Platform-Specific Sizes",
        "Copy & Visual Alignment",
        "A/B Test Variations",
        "Brand Compliance",
        "Landing Page Alignment",
        "Performance Handover",
      ],
      process: [
        {
          title: "Brief & Objectives",
          description: "Defining campaign goals and messaging",
        },
        {
          title: "Concepts",
          description: "Exploring creative directions and hooks",
        },
        {
          title: "Design & Build",
          description: "Producing polished assets for each platform",
        },
        {
          title: "Delivery",
          description: "Supplying exports and source files",
        },
      ],
      benefits: [
        {
          title: "Platform-Optimized",
          description: "Designed for each platform's best practices",
        },
        {
          title: "Attention-Grabbing",
          description: "Designs that stop the scroll",
        },
        {
          title: "Fast Turnaround",
          description: "Quick iterations for timely campaigns",
        },
      ],
      pricing: {
        starting: "$300",
        description: "Per ad set",
      },
    },
    bg: {
      title: "Дизайн на реклами",
      subtitle: "Ефективни рекламни визии за всяка платформа",
      description:
        "Откроявайте се в препълнения дигитален поток с убедителни реклами. Създавам изпълнения, оптимизирани за Google, Facebook, Instagram, LinkedIn и други канали.",
      features: [
        "Рекламни сетове за различни платформи",
        "Статични и анимирани графики",
        "Размери по изискванията на мрежите",
        "Съгласуване между текст и визия",
        "Вариации за A/B тестове",
        "Спазване на бранд насоки",
        "Съгласуване с целевата страница",
        "Предаване на файлове за изпълнение",
      ],
      process: [
        {
          title: "Brief и цели",
          description: "Дефинирам посланията и KPI",
        },
        {
          title: "Концепции",
          description: "Изследвам идеи и куки за вниманието",
        },
        {
          title: "Дизайн и продукция",
          description: "Изработвам завършени материали за всеки канал",
        },
        {
          title: "Доставка",
          description: "Предоставям файлове и формати за пуск",
        },
      ],
      benefits: [
        {
          title: "Оптимизирани за платформата",
          description: "Съобразени с добрите практики на всяка мрежа",
        },
        {
          title: "Привличат вниманието",
          description: "Дизайни, които спират скролването",
        },
        {
          title: "Бърза изработка",
          description: "Срещам кратки срокове и бързи кампании",
        },
      ],
      pricing: {
        starting: "$300",
        description: "Цена за рекламен сет",
      },
    },
  },
  "full-brand-package": {
    en: {
      title: "Full Brand Package",
      subtitle: "Website, hosting, SEO, one HTML email, one ad creative, and a clear launch plan.",
      description:
        "When you need everything built under one vision, this package aligns your brand touchpoints. We define the story, design and develop the site, handle hosting, craft an email template and ad creative, and optimize SEO so you can launch campaigns immediately.",
      features: [
        "Brand narrative and messaging workshop",
        "Signature website design + development",
        "Managed hosting configuration and monitoring",
        "Technical + content SEO optimization",
        "Custom HTML email template",
        "Ad creative (static or motion)",
        "Copy kit for onboarding and campaigns",
        "Launch week support & training",
      ],
      process: [
        {
          title: "Brand Intensive",
          description: "Define voice, visuals, and success metrics for every channel.",
        },
        {
          title: "Experience Design",
          description: "Create the website system, email, and ad styles in parallel.",
        },
        {
          title: "Build & Produce",
          description: "Develop the site, code the email, and deliver ready-to-run ad assets.",
        },
        {
          title: "Launch & Enable",
          description: "Set up hosting, SEO, training, and go-live support.",
        },
      ],
      benefits: [
        {
          title: "Unified Story",
          description: "Every asset speaks the same visual and verbal language.",
        },
        {
          title: "One Team, All Assets",
          description: "No juggling freelancers or disconnected deliverables.",
        },
        {
          title: "Campaign Ready",
          description: "Launch with a site, email, ad, and SEO already aligned.",
        },
      ],
      pricing: {
        starting: "$12,000",
        description: "Full engagement with multi-channel assets and launch support.",
      },
    },
    bg: {
      title: "Пълен бранд пакет",
      subtitle: "Уебсайт, хостинг, SEO, един HTML имейл, една реклама и ясен план за старт.",
      description:
        "Когато искате всичко под една визия, този пакет подравнява всички допирни точки. Определям историята, проектирам и разработвам сайта, настройвам хостинг, създавам имейл шаблон и рекламно каре и оптимизирам SEO, за да стартирате кампании веднага.",
      features: [
        "Работилница за бранд и послания",
        "Авторски дизайн и разработка на сайт",
        "Конфигуриране и мониторинг на хостинг",
        "Техническа и съдържателна SEO оптимизация",
        "Персонализиран HTML имейл шаблон",
        "Рекламен креатив (статика или анимация)",
        "Copy комплект за onboarding и кампании",
        "Подкрепа и обучение през launch седмицата",
      ],
      process: [
        {
          title: "Бранд интензив",
          description: "Дефинираме глас, визия и KPI за всички канали.",
        },
        {
          title: "Дизайн на изживяването",
          description: "Паралелно изграждам визия за сайта, имейла и рекламата.",
        },
        {
          title: "Изработка",
          description: "Разработвам сайта, кодирам имейла и подготвям готови рекламни активи.",
        },
        {
          title: "Пуск и подкрепа",
          description: "Настройвам хостинг, SEO, обучение и подкрепа при старта.",
        },
      ],
      benefits: [
        {
          title: "Единна история",
          description: "Всички активи говорят на един визуален и словесен език.",
        },
        {
          title: "Един екип за всичко",
          description: "Няма нужда да координирате отделни изпълнители.",
        },
        {
          title: "Готов за кампании",
          description: "Стартирате с уебсайт, имейл, реклама и SEO в синхрон.",
        },
      ],
      pricing: {
        starting: "$12,000",
        description: "Пълно партньорство с мултиканални активи и подкрепа.",
      },
    },
  },
}
