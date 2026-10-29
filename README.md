# Hammad Ahmed — Senior Android Engineer Portfolio & Admin Panel

[![Live Production Portfolio](https://img.shields.io/badge/Live_Portfolio-hammad--ahmed--android--engineer.vercel.app-10b981?style=for-the-badge)](https://hammad-ahmed-android-engineer.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-149eca?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Mongoose_9-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

A modern, full-stack, zero-fallback dynamic engineering portfolio and content management platform built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **MongoDB Atlas**.

Every piece of portfolio content—personal profile, hero statistics, career timeline, flagship case studies, system architecture layers, technical skills, education, impact metrics, and PDF document links—is served strictly from **MongoDB Atlas** without relying on local static assets or hardcoded fallback data.

- **Production URL**: [https://hammad-ahmed-android-engineer.vercel.app/](https://hammad-ahmed-android-engineer.vercel.app/)
- **Admin Panel Route**: `/admin-console`
- **Admin Login Route**: `/admin-console/login`

---

## 🛠️ Technology Stack

| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.4](https://nextjs.org/) (App Router + Turbopack) | Server-side rendering (`force-dynamic`), Serverless API Routes, SEO Metadata & Sitemaps |
| **UI Library** | [React 19.2](https://react.dev/) | Concurrent UI rendering, modular client components, custom hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict end-to-end static typing, domain contracts, and compile-time safety |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) & [Mongoose 9](https://mongoosejs.com/) | Cloud document persistence (`portfolio` database) with serverless connection pooling |
| **Styling Engine** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first responsive layout, glassmorphism surfaces, dark/light theme support |
| **Security & Crypto** | [CryptoJS](https://cryptojs.gitbook.io/) & Node.js `crypto` | AES-256 payload & storage encryption, CSRF protection, NoSQL sanitizer, brute-force lockout |
| **Authentication** | JWT / HMAC-SHA256 Session Cookies | `HttpOnly`, `SameSite=Lax` signed session tokens for Admin Panel access |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons | Clean vector iconography across portfolio sections and Admin Panel |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge network, serverless API execution, and automated CI/CD |

---

## ✨ Key Features & Capabilities

### 1. 100% Database-Driven Content + Optimized Public Folder Images
- All portfolio sections (`PersonalInfo`, `Services`, `Projects`, `Experiences`, `SkillCategories`, `Education`, `Metrics`, and `CoverLetter`) are fetched live from **MongoDB Atlas** on the server and hydrated into the client.
- Visual images (profile photo `/profilePic.jpg` and project showcase banners `/yamamacm.jpg`, `/media_apps.jpg`, `/saas-apps.jpg`, `/edge-lighting.jpg`, `/toolbox.jpg`, `/audiobooks_app.jpg`) are served directly from the `public/` folder via `resolveAvatarPublicImage` and `resolveProjectPublicImage`.

### 2. Interactive Android Device Simulator (`InteractivePhone`)
- **4 Live App Modes** with proportional tab buttons:
  - **`SAR Train`**: Live train telemetry, GPS speed tracking, offline sync queue, and localized Arabic/English UI preview for Saudi Railway (`SAR / YamamaCM`).
  - **`ShareHands`**: Community resource-sharing feed, geolocation filters, and real-time chat/donation workflows.
  - **`OrderFast`**: High-conversion restaurant ordering flow, live kitchen status tracker, and Checkout.com / Tap payment integration preview.
  - **`5 SaaS Apps`**: Multi-tenant SaaS suite showcase (`OrderFast`, `MenuPlus`, `Shater`, `Tomooh`, `2030 Vision`) with interactive app cards.

### 3. Executive CV & Cover Letter PDF Viewers (`CvModal` & `CoverLetterModal`)
- **In-App Executive CV Preview (`CvModal`)**: Formatted, recruiter-ready view displaying verified career impact metrics, technical skill matrix, full work experience, **Key Production Systems & Flagship Applications** (full-width detailed cards), and academic credentials.
- **Direct Google Drive PDF Download**: Clicking **Download PDF** transforms the configured Google Drive `resumeDriveLink` into a direct download endpoint (`uc?export=download&id=...`) with client-side PDF generation fallback if no external drive link is set.
- **Cover Letter Reader (`CoverLetterModal`)**: Displays formatted cover letter paragraphs from MongoDB with one-click PDF generation and direct Google Drive document support.

### 4. Fixed-Sidebar Portfolio Admin Panel (`/admin-console`)
- **Viewport-Locked Left Sidebar Navigation**: Permanently anchored (`fixed inset-y-0 left-0 h-screen w-72`) with grouped navigation, live item count badges, MongoDB connection status indicator, **View Site** link (automatically points to `https://hammad-ahmed-android-engineer.vercel.app/` in production), and one-click sign-out.
- **Dedicated Section Editors**:
  - **Profile & Documents**: Edit name, title, bio, contact links, Google Drive CV/Cover Letter links, hero stats, and cover letter text.
  - **Work Experience**: Add, reorder, edit, or delete career history, highlights, and tech stacks.
  - **Showcase Projects**: Manage flagship projects, category tags, metrics, highlights, and 3-layer architecture breakdowns (`Presentation`, `Domain`, `Data`).
  - **Services Offered**: Manage specialized engineering services and deliverables.
  - **Skills & Stack**: Organize skill categories and individual technologies.
  - **Education & Impact Metrics**: Manage academic degrees and top-level engineering KPIs.
- **Universal Delete Confirmation Dialog (`ConfirmDeleteModal`)**: Every destructive action across all tabs—including individual item deletions, section-wide data clearing, cache resets, and database reloads—prompts the administrator with a dedicated confirmation modal before executing.
- **Granular Admin Settings (`SettingsTab`)**:
  - Selectively delete all records in any individual portfolio section (`Work Experience`, `Showcase Projects`, `Services`, `Skills`, `Education`, or `Impact Metrics`).
  - Clear local AES-256 browser cache, discard unsaved edits and reload live state from MongoDB, or delete all portfolio section records at once.

### 5. Multi-Engine Global SEO Broadcaster (`seoService` & `SeoTab`)
- One-click **Ping All Search Engines & Browsers** from the Admin Panel broadcasts `sitemap.xml` and canonical URLs across **9 global search & browser ecosystems**:
  1. **Google Search & Chrome**
  2. **Microsoft Bing & Edge**
  3. **IndexNow Protocol** (Bing, Yandex, Naver, Seznam, Yep)
  4. **DuckDuckGo Search & Browser**
  5. **Brave Search & Browser**
  6. **Yahoo! Search** (`Slurp`)
  7. **Yandex Search & Browser**
  8. **Naver Search & Whale Browser**
  9. **Seznam.cz Search & Browser**

### 6. Browser Extension DOM Shield (`ExtensionShield` & `useExtensionShield`)
- Actively detects and removes unstyled DOM nodes injected below the footer by third-party browser extensions (such as Careerflow, Simplify, and job-tracker overlays) using CSS containment rules and a `MutationObserver` hook.

---

## 🏗️ Clean Layered Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                          Next.js 16 App Router (SSR)                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  1. Presentation Layer (src/components/)                                     │
│     ├─ Public Sections: Hero, Overview + InteractivePhone, Metrics,          │
│     │  Services, Architecture, Projects, Experience, Skills, Education       │
│     ├─ Modals: CvModal, CoverLetterModal, ProjectDetailModal                 │
│     ├─ Admin Panel: AdminDashboard (Fixed Sidebar), ConfirmDeleteModal,      │
│     │  ProfileTab, ExperienceTab, ProjectsTab, ServicesTab, SkillsTab,       │
│     │  EducationTab, MetricsTab, SeoTab, SettingsTab                         │
│     └─ DOM Protection: ExtensionShield + useExtensionShield                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  2. API Route Layer (src/app/api/)                                           │
│     ├─ GET  /api/content         -> Public AES-256 encrypted portfolio read  │
│     ├─ POST /api/portal/auth     -> Admin login (rate-limited + CSRF)        │
│     ├─ DELETE /api/portal/auth   -> Admin logout (clears HttpOnly cookie)    │
│     ├─ GET/PUT/POST /api/portal/content -> Authenticated CRUD operations     │
│     └─ GET/POST /api/portal/seo  -> Multi-engine sitemap & IndexNow ping     │
├──────────────────────────────────────────────────────────────────────────────┤
│  3. Validation & Security Layer (src/server/validation/ & security/)         │
│     ├─ Request schema validation (portfolioValidator.ts)                     │
│     ├─ NoSQL injection sanitizer (inputSanitizer.ts)                         │
│     ├─ Brute-force IP rate limiter & lockout guard (rateLimiter.ts)          │
│     ├─ CSRF origin verification (csrf.ts)                                    │
│     └─ AES-256 payload & storage encryption (crypto.ts)                      │
├──────────────────────────────────────────────────────────────────────────────┤
│  4. Business Logic Layer (src/server/services/)                              │
│     ├─ portfolioService.ts       -> Portfolio read/write orchestration       │
│     ├─ authService.ts            -> Credential verification & JWT issuance   │
│     └─ seoService.ts             -> 9-engine global SEO & IndexNow dispatch  │
├──────────────────────────────────────────────────────────────────────────────┤
│  5. Data Access & Repository Layer (src/server/repositories/ & db/)          │
│     ├─ portfolioRepository.ts    -> Atomic MongoDB queries & transactions    │
│     ├─ connection.ts             -> Cached Mongoose connection pool          │
│     └─ models/Portfolio.ts       -> Mongoose schemas (portfolios, services,  │
│        projects, experiences, skillcategories, educations, metrics, logs)    │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Directory Structure

```text
Portfolio/
├── public/                               # Static images served directly by Next.js
│   ├── audiobooks_app.jpg
│   ├── ecommerce_suite.jpg
│   ├── edge-lighting.jpg
│   ├── hammad-avatar.jpg
│   ├── media_apps.jpg
│   ├── profilePic.jpg
│   ├── saas-apps.jpg
│   ├── toolbox.jpg
│   └── yamamacm.jpg
├── src/
│   ├── app/                              # Next.js App Router pages, metadata & API routes
│   │   ├── admin-console/                # Admin Panel routes (/admin-console)
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # Admin Login page (/admin-console/login)
│   │   │   └── page.tsx                  # Admin Panel dashboard page
│   │   ├── api/                          # Serverless API endpoints
│   │   │   ├── content/
│   │   │   │   └── route.ts              # Public portfolio data endpoint
│   │   │   └── portal/
│   │   │       ├── auth/route.ts         # Admin authentication & logout endpoint
│   │   │       ├── content/route.ts      # Authenticated content update endpoint
│   │   │       └── seo/route.ts          # Multi-engine SEO ping endpoint
│   │   ├── globals.css                   # Tailwind v4 styles & extension-shield rules
│   │   ├── layout.tsx                    # Root layout, SEO metadata, JSON-LD structured data
│   │   ├── page.tsx                      # Dynamic server-rendered home page
│   │   ├── robots.ts                     # Dynamic robots.txt generator
│   │   └── sitemap.ts                    # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── admin/                        # Admin Panel UI components
│   │   │   ├── common/
│   │   │   │   ├── ConfirmDeleteModal.tsx # Universal deletion/reset confirmation dialog
│   │   │   │   └── ItemListInput.tsx     # Reusable array field editor with delete confirmation
│   │   │   ├── tabs/                     # Section-specific Admin Panel tabs
│   │   │   │   ├── EducationTab.tsx
│   │   │   │   ├── ExperienceTab.tsx
│   │   │   │   ├── MetricsTab.tsx
│   │   │   │   ├── ProfileTab.tsx
│   │   │   │   ├── ProjectsTab.tsx
│   │   │   │   ├── SeoTab.tsx
│   │   │   │   ├── ServicesTab.tsx
│   │   │   │   ├── SettingsTab.tsx
│   │   │   │   └── SkillsTab.tsx
│   │   │   ├── AdminDashboard.tsx        # Main Admin Panel controller & fixed sidebar shell
│   │   │   ├── AdminHeader.tsx           # Admin Panel header component
│   │   │   └── AdminLoginForm.tsx        # Admin authentication form
│   │   ├── common/
│   │   │   └── ExtensionShield.tsx       # Client guard suppressing 3rd-party extension DOM
│   │   ├── layout/
│   │   │   ├── Footer.tsx                # Site footer with navigation & document triggers
│   │   │   └── Navbar.tsx                # Sticky top navigation bar & theme toggle
│   │   ├── modals/
│   │   │   ├── CoverLetterModal.tsx      # Cover Letter reader & PDF download modal
│   │   │   ├── CvModal.tsx               # Executive CV preview & Google Drive PDF download
│   │   │   └── ProjectDetailModal.tsx    # Deep-dive project case study & architecture modal
│   │   ├── phone/                        # Interactive Android device simulator
│   │   │   ├── InteractivePhone.tsx      # Phone frame, status bar, & 4-tab app switcher
│   │   │   ├── OrderFastScreen.tsx       # OrderFast e-commerce app simulation
│   │   │   ├── SaasAppsScreen.tsx        # 5 SaaS Apps ecosystem screen
│   │   │   ├── SarTrainScreen.tsx        # SAR Train mission-critical app simulation
│   │   │   └── ShareHandsScreen.tsx      # ShareHands community app simulation
│   │   ├── providers/
│   │   │   └── ThemeContext.tsx          # Dark / Light mode theme provider
│   │   ├── sections/                     # Modular landing page sections
│   │   │   ├── ArchitectureSection.tsx   # Clean Architecture & MVI/MVVM breakdown
│   │   │   ├── EducationSection.tsx      # Academic credentials section
│   │   │   ├── ExperienceSection.tsx     # Career timeline section
│   │   │   ├── HeroSection.tsx           # Hero banner, CTAs, & interactive phone preview
│   │   │   ├── MetricsSection.tsx        # Engineering impact metrics grid
│   │   │   ├── OverviewSection.tsx       # Executive overview & core pillars
│   │   │   ├── ProjectsSection.tsx       # Flagship projects showcase grid
│   │   │   ├── ServicesSection.tsx       # Android engineering services grid
│   │   │   └── SkillsSection.tsx         # Technical skills & tooling matrix
│   │   ├── ui/
│   │   │   └── BrandIcons.tsx            # LinkedIn, GitHub, and custom vector icons
│   │   └── PortfolioHome.tsx             # Root client container coordinating modals & sections
│   ├── config/
│   │   └── serverConfig.ts               # Validated server environment configuration
│   ├── hooks/
│   │   ├── useActiveSection.ts           # IntersectionObserver hook for active nav tracking
│   │   ├── useCopyToClipboard.ts         # Clipboard copy helper hook
│   │   ├── useExtensionShield.ts         # MutationObserver removing injected extension nodes
│   │   └── useScrollPosition.ts          # Window scroll threshold detector
│   ├── models/
│   │   └── Portfolio.ts                  # Mongoose models & TypeScript interfaces
│   ├── server/
│   │   ├── db/
│   │   │   └── connection.ts             # MongoDB Atlas cached connection manager
│   │   ├── http/
│   │   │   └── apiResponse.ts            # Standardized JSON response helpers
│   │   ├── repositories/
│   │   │   └── portfolioRepository.ts    # Database CRUD & collection synchronization
│   │   ├── security/
│   │   │   ├── crypto.ts                 # AES-256 payload encryption/decryption
│   │   │   ├── csrf.ts                   # CSRF request validation
│   │   │   ├── inputSanitizer.ts         # Recursive NoSQL injection sanitizer
│   │   │   └── rateLimiter.ts            # Brute-force login lockout & rate limiting
│   │   ├── services/
│   │   │   ├── authService.ts            # Admin authentication & token verification
│   │   │   ├── portfolioService.ts       # Portfolio business logic service
│   │   │   └── seoService.ts             # Multi-engine SEO & IndexNow ping service
│   │   └── validation/
│   │       └── portfolioValidator.ts     # Runtime request payload validation
│   ├── types/
│   │   ├── admin.ts                      # Admin Panel tab & notification types
│   │   ├── api.ts                        # API request/response & SEO ping contracts
│   │   └── portfolio.ts                  # Core portfolio domain types
│   └── utils/
│       ├── apiClient.ts                  # Typed client HTTP wrapper for Admin Panel & public API
│       ├── basePath.ts                   # Asset URL normalizer
│       ├── documentUtils.ts              # Google Drive direct download link converter & PDF generator
│       └── secureStorage.ts              # AES-256 encrypted localStorage manager
├── next.config.ts                        # Next.js configuration
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # Strict TypeScript configuration
└── README.md                             # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Atlas Connection String (uses the 'portfolio' database)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Portfolio

# Admin Panel Credentials
ADMIN_USERNAME=hammad
ADMIN_PASSWORD=<your-secure-admin-password>

# Security & Cryptographic Secrets
ADMIN_JWT_SECRET=<your-256-bit-jwt-secret>
PORTFOLIO_ENCRYPTION_KEY=<your-256-bit-aes-encryption-key>

# Public Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://hammad-ahmed-android-engineer.vercel.app
```

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js**: `v20.x` LTS or higher
- **Database**: MongoDB Atlas cluster with the `portfolio` database configured

### Installation & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   - Public Portfolio: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin-console](http://localhost:3000/admin-console)

3. **Type-check & build for production**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## ☁️ Deployment on Vercel

1. Push the repository to GitHub and import it into [Vercel](https://vercel.com/).
2. Configure the environment variables (`MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, `PORTFOLIO_ENCRYPTION_KEY`, `NEXT_PUBLIC_SITE_URL`) in Vercel Project Settings.
3. Deploy. In production:
   - The public portfolio is served at [https://hammad-ahmed-android-engineer.vercel.app/](https://hammad-ahmed-android-engineer.vercel.app/).
   - Clicking **View Site** inside the Admin Panel (`/admin-console`) opens `https://hammad-ahmed-android-engineer.vercel.app/` in a new tab.

---

## 📄 License

Proprietary and confidential. Built for **Hammad Ahmed — Senior Android Engineer**.
