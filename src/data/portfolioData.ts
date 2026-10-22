export interface Project {
  id: string;
  title: string;
  subtitle: string;
  clientOrCompany: string;
  role: string;
  category: "Enterprise" | "SaaS & E-Commerce" | "Media & Utilities" | "System Tools";
  image: string;
  impactHighlight: string;
  summary: string;
  techStack: string[];
  features: string[];
  architectureDetails: {
    pattern: string;
    offlineStrategy?: string;
    networking?: string;
    payments?: string;
    highlights: string[];
  };
  metrics: { label: string; value: string }[];
  playStoreUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  bullets: string[];
  skills: string[];
  statsBadge?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export const PERSONAL_INFO = {
  name: "Hammad Ahmed",
  title: "Senior Android Engineer",
  tagline: "Kotlin • Jetpack Compose • Clean Architecture • Offline-First Systems",
  location: "Islamabad, Pakistan",
  email: "hammadahmedawan95@gmail.com",
  phone: "+92 311 9069464",
  phoneDisplay: "+92 311 9069464",
  whatsappUrl: "https://wa.me/923119069464",
  linkedin: "https://www.linkedin.com/in/hammad-ahmed-android-engineer",
  github: "https://github.com/HammadAhmed-AndroidDeveloper",
  pdfResume: "Hammad_Ahmed_Android_Engineer_CV.pdf",
  docxResume: "Hammad_Ahmed_Android_Engineer_CV.docx",
  coverLetterDocx: "Hammad_Ahmed_Cover_Letter.docx",
  summary:
    "Senior Android Engineer with 5+ years of experience shipping high-reliability applications to Google Play—from 5 SaaS e-commerce and food-ordering apps to the SAR/YamamaCM mission-critical platform built for the Saudi Ministry of Transport during Hajj Season 25/26. Champion of Clean Architecture, MVI/MVVM, and Hilt, achieving 99.99% crash-free sessions, ~90% fewer ANRs, and ~50% faster cold starts.",
  experienceYears: "5+",
  crashFreeRate: "99.99%",
  anrReduction: "~90%",
  coldStartBoost: "~50%",
  batteryOptimization: "~40%",
  saasAppsCount: "5",
  availability: "Available for Full-time Remote Roles (KSA, UAE, EU, US, Global)",
  currentEducation: "Master of Computer Science (NUST)",
};

export const METRICS_DATA = [
  {
    value: "99.99%",
    label: "Crash-Free Rate",
    description: "Maintained across production releases through modular architecture and SOLID codebases",
    icon: "ShieldCheck",
  },
  {
    value: "~90%",
    label: "Fewer ANRs",
    description: "Eliminated UI freezes by moving heavy tasks off main thread via Coroutines & Flow",
    icon: "Zap",
  },
  {
    value: "5 SaaS Apps",
    label: "Live on Google Play",
    description: "End to end delivery of e commerce, F&B, B2C, and digital wallet solutions with integrated checkout.",
    icon: "ShoppingBag",
  },
  {
    value: "Hajj 25/26",
    label: "SAR / YamamaCM App",
    description: "Built an offline first app for Saudi Ministry of Transport with Room based data sync for critical field operations.",
    icon: "Compass",
  },
  {
    value: "~50%",
    label: "Faster Cold Starts",
    description: "Optimized memory, startup traces, and dependency injection using Android Profiler.",
    icon: "Gauge",
  },
  {
    value: "50+ Tools",
    label: "In <15MB Package",
    description: "Developed a lightweight toolbox with 50+ utilities, device monitoring, and anti theft features and more",
    icon: "Wrench",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "yamamacm",
    title: "SAR / YamamaCM Hajj Platform",
    subtitle: "Role-Based Field Attendance & Candidate Duty Platform (Hajj 25/26)",
    clientOrCompany: "Wulooj / Saudi Ministry of Transport (SAR)",
    role: "Senior Android Engineer",
    category: "Enterprise",
    image: "yamamacm.jpg",
    impactHighlight: "Mission-critical offline-first system for Hajj Seasons 2025 & 2026 across 30+ stations",
    summary:
      "Architected the SAR/YamamaCM mission-critical application for the Saudi Government (Ministry of Transport / SAR) deployed across high-density Hajj pilgrimage zones for Seasons 2025 and 2026. Built with a modular role-based architecture featuring an Admin Module for candidate roster check-in across 30+ stations and rotational shifts (Early, Late, Night), alongside a Candidate Module for personal station assignments, reporting supervisor details, assigned shift hours, and digital meal voucher claims (with only one module active per user session). Engineered with a reliable offline-first architecture using encrypted Room DB and background WorkManager workers ensuring data integrity even during severe crowd-density cellular blackouts.",
    techStack: [
      "Kotlin",
      "Clean Architecture",
      "MVVM",
      "Room Database (Encrypted)",
      "WorkManager Sync Engine",
      "Jetpack Compose",
      "Hilt DI",
      "Coroutines & Flow",
      "Retrofit 2 / OkHttp",
      "Firebase FCM",
      "Google Maps & Geofencing",
    ],
    features: [
      "Role-Based Architecture (Admin & Candidate): Field attendance roster with presence status toggles (Present, Absent, Break), alongside Candidate personal portal with station, shift, and supervisor details (single active module per user session).",
      "Multi-Station & Rotational Shift Scheduling: Geofenced mapping across 30+ stations in Mina, Arafat, and Muzdalifah with rotational Early, Late, and Night shift allocations.",
      "Offline-First Synchronization Engine: Guaranteed data integrity during cellular blackouts via local Room transactions and automatic WorkManager background retry with exponential backoff.",
      "Digital Meal Voucher Verification: One-tap digital meal confirmation (Breakfast, Lunch, Dinner) preventing duplicate disbursements.",
      "Temporary Leave & Extension Workflows: In-app leave requests, emergency extensions, and timestamped audit logging for ministry field command centers.",
    ],
    architectureDetails: {
      pattern: "Clean Architecture + MVVM + Modular Core",
      offlineStrategy: "Encrypted Room DB local-first cache + WorkManager sync engine with exponential backoff",
      networking: "Retrofit 2 with OkHttp interceptors, JWT auto-refresh & exponential retry",
      highlights: [
        "Guaranteed data integrity with zero records dropped during severe crowd network blackouts",
        "Automatic background sync completed in under 2 seconds upon network restoration",
      ],
    },
    metrics: [
      { label: "Data Integrity Rate", value: "100%" },
      { label: "Duty Stations Managed", value: "30+ Stations" },
      { label: "Sync Latency Upon Reconnect", value: "< 1.8s" },
    ],
  },
  {
    id: "ecommerce-suite",
    title: "5 SaaS E-Commerce Native Apps Suite",
    subtitle: "Single-Core Multi-Tenant Architecture with 7-Stage End-to-End Ordering & Live Tracking",
    clientOrCompany: "Wulooj (Riyadh, Saudi Arabia)",
    role: "Senior Android Engineer",
    category: "SaaS & E-Commerce",
    image: "ecommerce_suite.jpg",
    impactHighlight: "5 production apps shipped to Google Play with Checkout.com & Tap Payments SDKs",
    summary:
      "Architected and deployed 5 commercial SaaS mobile applications across food & beverage, quick commerce, and retail delivery throughout Saudi Arabia. Designed a modular white-label core engine that dynamically compiles brand identities, custom color tokens, localized catalogs, and branch configurations from a single robust codebase. Delivered an end-to-end purchasing and fulfillment journey: geolocated branch discovery (Delivery vs. Curbside Pickup), responsive menu dashboards with promotional campaigns, structured item modifier groups (options, premium add-ons, and special instructions), persistent cart management with cross-sell recommendations, secure multi-channel checkout (Mada, Digital Wallets, Visa/Mastercard with 3D-Secure, and Cash on Delivery), loyalty rewards redemption, promo coupon engine, and live GPS courier radar tracking with real-time ETA updates.",
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture",
      "Hilt DI",
      "Checkout.com Flow SDK",
      "Tap Payments SDK",
      "Coroutines & StateFlow",
      "Retrofit 2",
      "Mapbox & Google Maps",
      "Room Database",
      "DataStore",
    ],
    features: [
      "White-Label Multi-Tenant Engine: Single unified core driving 5 standalone brands with dynamic theme tokens, localized branch inventories, and multi-currency pricing.",
      "Custom Item Modifier Pipeline: Dynamic configuration of options, custom ingredients, and premium add-ons with instantaneous price recalculation.",
      "Regional Payment Gateway Integrations: Embedded Checkout.com Flow SDK and Tap Payments with tokenized 3D-Secure authentication and fault-tolerant retry handling.",
      "Real-Time GPS Tracking & Radar: Simulated courier movement, radar pulse visualization, live ETA calculations, and in-app driver messaging.",
      "Loyalty Rewards & Promotional Discounts: Tiered VIP points redemption, coupon code verification, and digital wallet balances.",
    ],
    architectureDetails: {
      pattern: "Multi-Module Clean Architecture with Isolated Feature Components",
      payments: "Checkout.com Flow SDK, Tap Payments, Tokenized 3D-Secure session handling",
      networking: "Reactive Retrofit + StateFlow unidirectional data flow (UDF)",
      highlights: [
        "Unified modular core library powering 5 distinct client apps on Google Play",
        "Resilient cart persistence across app lifecycles via DataStore and local Room database",
        "99.99% crash-free session stability sustained during high-traffic Ramadan campaigns",
      ],
    },
    metrics: [
      { label: "Apps Shipped to Play Store", value: "5 Production Apps" },
      { label: "Payment Success Rate", value: "99.99% Trans. Rate" },
      { label: "Production Crash-Free Rate", value: "99.99%" },
    ],
  },
  {
    id: "utility-toolbox",
    title: "All-in-One Utility Toolbox (50 Tools)",
    subtitle: "Low-Latency Hardware Sensor Suite & Anti-Theft Protection in <15MB",
    clientOrCompany: "Join App Studio",
    role: "Senior Android Developer",
    category: "System Tools",
    image: "toolbox_app.jpg",
    impactHighlight: "50 calibrated hardware tools and sensor gauges packed into an ultra-optimized <15MB APK",
    summary:
      "Designed and delivered an ultra-lightweight, high-performance Android utility suite featuring 50 specialized instruments and hardware sensor tools: Internet Speed Test, QR Code Generator, Flashlight, Password Generator, Metal Detector (magnetic field microteslas), 8-key Interactive Piano, Screen Magnifier, 6-Axis Hardware Sensors Inspector, Voice Recorder, Ambient Thermometer, Pedometer Step Tracker, BMI Calculator, Standard Calculator, GPS Speedometer, Unit Converter, World Clock, GPS Camera, Precision Stopwatch, Live Weather Radar, Speech to Text, Barometric Altimeter, Device Info, Color Detector (HEX/RGB), Quick Notes, Digital Compass (heading azimuth), On-screen Ruler, Area Land Converter, Fuel Cost Trip Calculator, Currency Exchange, Dual-Axis Bubble Leveler, Battery Health & Temperature Monitor, RAM Memory Cleaner, Age Calculator, and Tap Tally Counter. Engineered with low-latency 60Hz sensor listeners and aggressive R8/ProGuard shrinking to keep the entire binary under 15MB.",
    techStack: [
      "Kotlin",
      "Android Sensors SDK",
      "Camera2 / CameraManager",
      "AudioRecord / AudioTrack",
      "Clean Architecture",
      "Coroutines & Flow",
      "DataStore",
      "R8 / ProGuard Optimization",
    ],
    features: [
      "50 Dedicated Utility Tools: Real-time domain calculations and hardware sensor hooks across 50 tools without placeholder stubs.",
      "Hardware Sensor Calibration: 60Hz polling for magnetometer, accelerometer, barometer, and gyroscope with low-pass noise filtering.",
      "Anti-Theft Intruder Alert: Sensor-triggered intruder selfie capture via CameraManager upon incorrect PIN entry or unexpected device motion.",
      "Ultra-Compact Binary Footprint: Aggressive R8 rules, vector drawables, and resource shrinking keeping the full 50 tool suite under 15MB.",
    ],
    architectureDetails: {
      pattern: "Modular Utility Provider Pattern with Sensor Listener Pooling",
      offlineStrategy: "100% Offline-capable standalone utilities with zero network dependency for core tools",
      highlights: [
        "Lifecycle-aware sensor listener pooling reducing battery consumption by 40%",
        "Cold start launch in under 250ms with zero heavy third-party framework overhead",
      ],
    },
    metrics: [
      { label: "Total Tools Packed", value: "50 Tools" },
      { label: "App Binary Size", value: "< 15 MB" },
      { label: "Battery Drain Reduced", value: "40%" },
    ],
  },
  {
    id: "edge-lighting",
    title: "Dynamic Edge Lighting Designer",
    subtitle: "Hardware-Accelerated 60 FPS Canvas Shaders, Emojis & Custom Bezel Effects",
    clientOrCompany: "Funsol Technologies",
    role: "Android Engineer",
    category: "Media & Utilities",
    image: "edge_lighting.jpg",
    impactHighlight: "Hardware-accelerated edge illumination maintaining a locked 60 FPS with zero frame drops",
    summary:
      "Engineered a high-performance edge lighting customizer application rendering dynamic illuminated borders and ambient glow effects around mobile screen curves, bezels, and display notches. Developed custom hardware-accelerated Canvas drawing pipelines and Kotlin Coroutines supporting multiple styling types, themes, customizable icons, emojis, and vibrant single/multi-color gradients. Features real-time animation velocity controls, border thickness adjustments, and tailored notch adaptations locked at a smooth 60 FPS.",
    techStack: [
      "Kotlin",
      "Custom Android Views & Canvas",
      "Hardware Acceleration",
      "Coroutines",
      "Flow",
      "WorkManager",
      "WindowInsets API",
    ],
    features: [
      "Diverse Edge Styles & Themes: Multiple border animation effects including neon glow, flowing particle trails, and decorative contours.",
      "Custom Emojis, Icons & Shapes: Rich collection of decorative icons, emojis, and geometric symbols orbiting screen edges.",
      "Vibrant Color & Multi-Color Customization: Dynamic color gradients, multi-tone blends, and custom palette creation with real-time preview.",
      "Display Notch & Bezel Adaptation: Precision screen edge mapping for punch-hole cameras, curved displays, and various notch designs.",
      "Notification & Alert Illumination: Background service triggering custom perimeter lighting for incoming calls and application notifications.",
    ],
    architectureDetails: {
      pattern: "Clean Architecture + MVVM with Hardware-Accelerated Custom View Pipeline",
      highlights: [
        "Maintained steady 60 FPS animation with zero UI stutter or frame drops",
        "Zero object allocation inside onDraw routines to eliminate garbage collector pauses",
      ],
    },
    metrics: [
      { label: "Rendering Performance", value: "60 FPS Locked" },
      { label: "ANR Reduction", value: "~90% Reduction" },
      { label: "Overdraw Optimization", value: "< 1.2x" },
    ],
  },
  {
    id: "audiobooks-app",
    title: "Audio Books & Media Streaming Platform",
    subtitle: "High-Fidelity Audio Playback Engine, Resumable Downloads & Background Service",
    clientOrCompany: "Funsol Technologies",
    role: "Android Engineer",
    category: "Media & Utilities",
    image: "audiobooks_app.jpg",
    impactHighlight: "Sub-300ms stream buffering and rock-solid background media service with offline sync",
    summary:
      "Created the native core audio streaming and listening experience for a popular audiobook application on Google Play. Designed Media3 / ExoPlayer integration with adaptive bitrate streaming, resumable background chapter downloads via WorkManager, system lockscreen and notification media session controllers, and millisecond-accurate playback position caching with zero progress loss.",
    techStack: [
      "Kotlin",
      "Jetpack Components",
      "Media3 / ExoPlayer",
      "MediaSessionService",
      "Clean Architecture",
      "MVVM",
      "Room Database",
      "WorkManager",
    ],
    features: [
      "Adaptive Streaming & Offline Downloads: Automatic bitrate switching and chunked background chapter downloads with resumable WorkManager tasks.",
      "Background Audio Service: System lockscreen and notification media controls with synchronized playback state and scrub bars.",
      "Favorites & Listening Progress: Real-time second-by-second position caching in Room DB so users never lose their spot across sessions.",
      "Audio Focus Management: Automatic ducking and pausing during incoming calls, alarms, and navigation voice prompts.",
    ],
    architectureDetails: {
      pattern: "Clean Architecture + Service-Bound Media Engine",
      offlineStrategy: "Chunked media file caching + Room DB playback positions",
      highlights: [
        "Sub-300ms playback startup latency from cold start",
        "Seamless audio focus transitions during system interruptions",
      ],
    },
    metrics: [
      { label: "Startup Latency", value: "50% Faster (<300ms)" },
      { label: "Crash-Free Sessions", value: "99.99%" },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "wulooj",
    role: "Senior Android Engineer",
    company: "Wulooj",
    location: "Riyadh, Saudi Arabia (Remote)",
    period: "Apr 2025 – Present",
    type: "Full-Time Remote",
    summary:
      "Leading Android development and architecture for major SaaS e-commerce, F&B, and Saudi Government initiatives across distributed teams in Saudi Arabia, Egypt, and India.",
    bullets: [
      "Delivered 5 SaaS e-commerce, food and beverage (F&B), and B2C apps to Google Play, from concept to launch, using Clean Architecture, Hilt dependency injection, and modular feature packages.",
      "Architected SAR/YamamaCM, a Saudi Government (Ministry of Transport) app for Hajj 2025 and 2026 where admins record duty attendance across stations, manage temporary leave/extensions, and candidates confirm meals—engineered offline-first with Room for automatic background sync.",
      "Engineered end-to-end customer purchasing flows: multi-branch menus, dynamic cart, multi-step checkout, and custom UI micro-animations.",
      "Integrated secure payments with Checkout.com flows and Tap Payments SDKs, employing tokenized session validation and explicit transaction failure recovery.",
      "Developed digital wallet & loyalty systems: rewards redemption, in-app balance, credit gifting, and appointment bookings.",
      "Aligned API contracts and release roadmaps with cross-functional product, UI/UX, QA, and backend engineering teams.",
    ],
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture",
      "Hilt",
      "Room",
      "Checkout.com SDK",
      "Tap Payments",
      "WorkManager",
      "Distributed Teams",
    ],
    statsBadge: "5 SaaS Apps • Hajj 25/26 System",
  },
  {
    id: "funsol",
    role: "Android Engineer",
    company: "Funsol Technologies Pvt Ltd",
    location: "Rawalpindi, Pakistan",
    period: "Mar 2024 – Mar 2025",
    type: "Full-Time",
    summary:
      "Spearheaded core architectural refactoring and performance engineering, achieving outstanding crash-free and ANR benchmarks across high-traffic apps.",
    bullets: [
      "Reached 99.99% crash-free sessions across production releases by refactoring legacy monolithic code and modularizing core layers with SOLID principles and Hilt.",
      "Reduced Application Not Responding (ANRs) by ~90% on complex screens by delegating heavy computation and I/O off the main thread with Kotlin Coroutines and StateFlow.",
      "Implemented background data synchronization and scheduled tasks with WorkManager and Coroutines, maintaining fresh app state with minimal CPU and battery usage.",
      "Standardized team development workflows by mentoring developers and establishing native development guidelines using Kotlin, Jetpack Compose, and Clean Architecture.",
    ],
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Coroutines & StateFlow",
      "WorkManager",
      "Performance Profiling",
      "ANR Optimization",
      "Hilt",
    ],
    statsBadge: "99.99% Crash-Free • -90% ANRs",
  },
  {
    id: "joinapp",
    role: "Android Developer",
    company: "Join App Studio",
    location: "Rawalpindi, Pakistan",
    period: "Sep 2023 – Mar 2024",
    type: "Full-Time",
    summary:
      "Focused on GPS mapping optimization, hardware sensors, and packing high-density utility features into lightweight native applications.",
    bullets: [
      "Reduced battery drain by ~40% during extended navigation in GPS and mapping apps built with Kotlin, Mapbox SDK, and Google Maps API by optimizing background location polling and map-layer memory management.",
      "Engineered an all-in-one utility toolbox packing 50+ distinct tools into a single app under 15 MB, featuring sensor-triggered intruder selfie captures and security alarms via CameraManager.",
    ],
    skills: [
      "Kotlin",
      "Mapbox SDK",
      "Google Maps API",
      "Sensors SDK",
      "CameraManager",
      "Battery Optimization",
      "Room",
    ],
    statsBadge: "-40% Battery Drain • 50+ Tools in <15MB",
  },
  {
    id: "sharehands",
    role: "Android Developer",
    company: "Share Hands",
    location: "Rawalpindi, Pakistan",
    period: "Mar 2022 – Sep 2023",
    type: "Full-Time",
    summary:
      "Optimized app cold starts, built comprehensive automated test suites, and deployed consumer apps across Android versions.",
    bullets: [
      "Cut cold-start time by ~50% and enhanced image caching by profiling with Android Profiler and optimizing initial startup traces and memory allocation.",
      "Reduced regression defects significantly by writing automated JUnit and MockK unit test suites in collaboration with QA.",
      "Launched a portfolio of consumer apps on Google Play with consistent Material Design UI across varying screen sizes and tablet form factors.",
    ],
    skills: [
      "Kotlin",
      "Android Profiler",
      "JUnit",
      "MockK",
      "Material Design",
      "Google Play Console",
      "OkHttp",
    ],
    statsBadge: "-50% Cold Start • High Test Coverage",
  },
  {
    id: "exceed",
    role: "Android Developer",
    company: "Exceed IT Solutions",
    location: "Peshawar, Pakistan",
    period: "Feb 2021 – Mar 2022",
    type: "Full-Time",
    summary:
      "Engineered cutting-edge camera translation tools and custom Android Input Method Editors (IME keyboards).",
    bullets: [
      "Engineered a real-time camera translator combining CameraX, OCR (Optical Character Recognition), and translation APIs to extract and translate text from live video streams.",
      "Built a custom Android keyboard (Input Method Editor, IME) featuring low-latency touch response, custom key layouts, and seamless text insertion APIs.",
      "Enabled resilient offline persistence with SQLite/Room and integrated Firebase Cloud Messaging (FCM) and Crashlytics.",
    ],
    skills: ["Java", "Kotlin", "CameraX", "ML Kit / OCR", "IME Keyboard", "SQLite", "Firebase Crashlytics"],
    statsBadge: "CameraX OCR • Custom IME Keyboard",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    description: "Modern expressive languages and foundational Android platform knowledge",
    iconName: "Code2",
    skills: [
      { name: "Kotlin", level: 98, highlight: true },
      { name: "Java", level: 90 },
      { name: "Python", level: 82 },
      { name: "SQL", level: 88 },
      { name: "Android SDK", level: 96, highlight: true },
      { name: "Material Design 3", level: 94 },
    ],
  },
  {
    category: "Architecture & Design",
    description: "Battle-tested scalable patterns for maintainable enterprise applications",
    iconName: "Layers",
    skills: [
      { name: "Clean Architecture", level: 98, highlight: true },
      { name: "MVVM ", level: 96, highlight: true },
      { name: "Hilt / Dagger DI", level: 95, highlight: true },
      { name: "Multi-Module Architecture", level: 92 },
      { name: "SOLID Principles", level: 95 },
      { name: "Repository Pattern", level: 96 },
    ],
  },
  {
    category: "Modern UI & Concurrency",
    description: "Declarative UI and non-blocking asynchronous data streaming",
    iconName: "Smartphone",
    skills: [
      { name: "Jetpack Compose", level: 95, highlight: true },
      { name: "Kotlin Coroutines", level: 96, highlight: true },
      { name: "Flow & StateFlow", level: 95, highlight: true },
      { name: "WorkManager", level: 94 },
      { name: "Navigation Component", level: 92 },
      { name: "Lifecycle Management", level: 95 },
    ],
  },
  {
    category: "Offline-First & Database",
    description: "Guaranteed offline durability and seamless background synchronization",
    iconName: "Database",
    skills: [
      { name: "Room Database", level: 96, highlight: true },
      { name: "DataStore Preferences", level: 92 },
      { name: "Offline-First Sync", level: 95, highlight: true },
      { name: "SQLite Optimization", level: 90 },
      { name: "ExoPlayer / Media3 Cache", level: 88 },
    ],
  },
  {
    category: "Networking & Payments",
    description: "Resilient API integration and secure e-commerce payment gateways",
    iconName: "CreditCard",
    skills: [
      { name: "Checkout.com Flow SDK", level: 94, highlight: true },
      { name: "Tap Payments SDK", level: 94, highlight: true },
      { name: "Retrofit 2 & OkHttp 3", level: 96 },
      { name: "OAuth 2.0 & Token Auth", level: 92 },
      { name: "REST APIs & JSON", level: 96 },
    ],
  },
  {
    category: "Profiling & Quality",
    description: "Zero-tolerance crash prevention, ANR reduction, and CI/CD releases",
    iconName: "Gauge",
    skills: [
      { name: "Android Profiler", level: 92, highlight: true },
      { name: "ANR & Memory Optimization", level: 95, highlight: true },
      { name: "JUnit & MockK Testing", level: 90 },
      { name: "Firebase Crashlytics & FCM", level: 94 },
      { name: "R8 / ProGuard Obfuscation", level: 90 },
      { name: "Google Play Console Deploy", level: 95 },
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Master of Computer Science (MS CS)",
    institution: "National University of Sciences & Technology (NUST)",
    location: "Rawalpindi, Pakistan",
    period: "Sep 2024 – Present",
    details:
      "Advanced postgraduate studies concentrating on distributed computing, cloud architectures, advanced mobile systems, algorithm design, and scalable software systems at Pakistan's premier engineering university.",
  },
  {
    degree: "Bachelor of Software Engineering (BS SE)",
    institution: "Abasyn University",
    location: "Peshawar, Pakistan",
    period: "Sep 2018 – Dec 2022",
    details:
      "In-depth four-year software engineering degree with core focus on object-oriented programming, data structures & algorithms, mobile application engineering, database design, and software design patterns.",
  },
];

export const COVER_LETTER_TEXT = `HAMMAD AHMED
Senior Android Engineer | Kotlin | Jetpack Compose | Clean Architecture
Islamabad | +92 311 9069464 | hammadahmedawan95@gmail.com
LinkedIn: linkedin.com/in/hammad-ahmed-android-engineer | GitHub: github.com/HammadAhmed-AndroidDeveloper

Dear Hiring Manager,

I am writing to apply for the Senior Android Engineer position at your company. With 5+ years of experience building native Android applications using Kotlin and Jetpack Compose, I have worked across the full application development lifecycle, from architecture and API integration to testing, performance optimization, and Google Play release. I am particularly interested in remote opportunities where I can contribute my technical expertise while working effectively with a distributed team.

Throughout my experience, I have delivered five SaaS, e-commerce, food and beverage, and B2C applications, implementing complex purchase workflows, multi-step checkout, order tracking, wallets, rewards, and secure payment integrations using Checkout.com and Tap Payments SDKs.

I also architected SAR/YamamaCM, an offline-first application developed for Saudi Arabia's Ministry of Transport to support Hajj operations in 2025 and 2026. The application enables administrators to manage candidate attendance, duty assignments, temporary leave, and extensions, while candidates can view their assignments and confirm meals. Using Room for local data storage and background synchronization, the application supports essential operations without internet access and synchronizes recorded data when connectivity returns.

I focus on measurable engineering outcomes, having achieved 99.99% crash-free sessions, approximately 90% fewer ANRs, around 50% faster cold starts, and 40% lower battery drain in navigation applications. I apply Clean Architecture, MVVM, Hilt, Kotlin Coroutines, Flow, Retrofit, and unit testing to build maintainable, efficient, and reliable Android applications.

Beyond technical development, I collaborate closely with backend, product, UI/UX, and QA teams across Saudi Arabia, Egypt, and India. I am comfortable working in remote and distributed teams, participating in code reviews, and contributing throughout the development and testing lifecycle. I am also completing a Master of Computer Science at NUST.

I would welcome the opportunity to join your company as an Android Engineer and contribute to building reliable, high-quality mobile applications. I believe my experience in delivering production-ready Android apps, improving application performance, and collaborating across distributed teams would allow me to make a meaningful contribution to your engineering team.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my experience aligns with your team's needs.

Sincerely,
Hammad Ahmed
Senior Android Engineer
+92 311 9069464
hammadahmedawan95@gmail.com
LinkedIn: linkedin.com/in/hammad-ahmed-android-engineer
GitHub: github.com/HammadAhmed-AndroidDeveloper`;
