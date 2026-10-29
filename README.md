# Hammad Ahmed — Senior Android Engineer Portfolio

![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-hammad--ahmed--android--engineer.vercel.app-10b981?style=for-the-badge)

![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=next.js)

![React](https://img.shields.io/badge/React-19.2-149eca?style=for-the-badge&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)

![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Mongoose_9-47A248?style=for-the-badge&logo=mongodb)

![Node.js](https://img.shields.io/badge/Node.js-20.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)

![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)A modern, full-stack, dynamic engineering portfolio and content management platform built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **MongoDB Atlas**.

All portfolio content (personal profile, hero statistics, career timeline, flagship case studies, architecture layers, technical skills, education, impact metrics, and CV / cover letter document links) is served dynamically from **MongoDB Atlas**. Static media such as the profile photo and project banners are served from the `public/` directory.

- **Live Site**: <https://hammad-ahmed-android-engineer.vercel.app/>

---

## 📑 Table of Contents

- [Technology Stack](#%EF%B8%8F-technology-stack)
- [Key Features](#-key-features)
- [Architecture](#%EF%B8%8F-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#%EF%B8%8F-deployment)
- [License](#-license)

---

## 🛠️ Technology Stack

| Layer | Technology | Responsibility |
| --- | --- | --- |
| **Framework** | [Next.js 16.4](https://nextjs.org/) (App Router + Turbopack) | Server-side rendering (`force-dynamic`), serverless API routes, SEO metadata and sitemaps |
| **UI Library** | [React 19.2](https://react.dev/) | Concurrent rendering, modular client components, custom hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict end-to-end typing, domain contracts, compile-time safety |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose 9](https://mongoosejs.com/) | Cloud document persistence with serverless connection pooling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Responsive utility-first layout, glassmorphism surfaces, dark/light themes |
| **Security** | [CryptoJS](https://cryptojs.gitbook.io/) + Node.js `crypto` | AES-256 payload and storage encryption, CSRF protection, NoSQL sanitizer, rate limiting |
| **Authentication** | Signed session cookies (JWT / HMAC-SHA256) | `HttpOnly`, `SameSite=Lax` sessions for admin access |
| **Icons** | [Lucide React](https://lucide.dev/) + custom SVG brand icons | Vector iconography across the portfolio and admin panel |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge network, serverless execution, automated CI/CD |

---

## ✨ Key Features

### 1. Database-Driven Content

- All portfolio sections (`PersonalInfo`, `Services`, `Projects`, `Experiences`, `SkillCategories`, `Education`, `Metrics`, `CoverLetter`) are fetched live from MongoDB Atlas on the server and hydrated into the client.
- Images (profile photo and project banners) are served from `public/` via `resolveAvatarPublicImage` and `resolveProjectPublicImage`.

### 2. Interactive Android Device Simulator (`InteractivePhone`)

A phone-frame component with four live app modes, smooth internal scrolling, and interactive controls:

| Mode | Component | Highlights |
| --- | --- | --- |
| **SAR Hajj** | `SarHajjApp` | Live crowd and attendance operations, station filtering, offline Room DB sync simulation, `Admin` / `Candidate` role switching |
| **5 SaaS Apps** | `EcommerceApp` | Multi-tenant e-commerce and food ordering across 5 tenant brands, branch selection, menu modifiers, cart calculation, live order tracking |
| **Edge Light** | `EdgeLightingApp` | 60 FPS edge-lighting studio with border width, glow speed, corner radius, emoji/shape borders, and notch style controls |
| **Toolbox** | `ToolboxApp` | 36-in-1 utility suite: compass, speed test, QR generator, flashlight, synth piano, magnifier, diagnostics |

### 3. Executive CV & Cover Letter Viewers

- `CvModal`: Recruiter-ready CV preview with verified impact metrics, skill matrix, work experience, key production systems, and academic credentials.
- `CoverLetterModal`: Formatted cover letter reader loaded from MongoDB.
- **PDF download**: Converts a configured Google Drive link into a direct download endpoint, with client-side PDF generation as a fallback.

### 4. Admin Panel (`/admin-console`)

- **Fixed sidebar** with grouped navigation, live item counts, database status indicator, a **View Site** shortcut, and one-click sign-out.
- **Section editors**:
  - **Profile & Documents**: name, title, bio, contact links, CV / cover letter links, hero stats, cover letter text
  - **Work Experience**: add, reorder, edit, and delete roles, highlights, and tech stacks
  - **Showcase Projects**: flagship projects, category tags, metrics, highlights, and 3-layer architecture breakdowns (Presentation, Domain, Data)
  - **Services Offered**: engineering services and deliverables
  - **Skills & Stack**: skill categories and technologies
  - **Education & Impact Metrics**: degrees and top-level engineering KPIs
  - **SEO Indexing**: one-click search engine broadcast
  - **Admin Settings** (`SettingsTab`): clear individual sections or all records, wipe the local encrypted cache, or discard edits and reload from MongoDB
- `ConfirmDeleteModal`: every destructive action (item deletion, section clearing, cache reset, database reload) requires explicit confirmation.

### 5. Multi-Engine SEO Broadcaster (`seoService`)

Automated `sitemap.xml` and `robots.txt` generation, plus one-click ping of canonical URLs and the sitemap to 9 search ecosystems:

1. Google Search & Chrome
2. Microsoft Bing & Edge
3. IndexNow protocol (Bing, Yandex, Naver, Seznam, Yep)
4. DuckDuckGo
5. Brave
6. Yahoo! Search
7. Yandex
8. Naver & Whale Browser
9. Seznam.cz

### 6. Browser Extension DOM Shield (`ExtensionShield`)

Detects and removes unstyled DOM nodes injected below the footer by third-party browser extensions (job-tracker overlays, for example) using CSS containment rules and a `MutationObserver` hook (`useExtensionShield`).

### 7. Security

- AES-256 encrypted public content payloads and local storage
- CSRF origin verification
- Recursive NoSQL injection sanitizer
- Brute-force login rate limiting and lockout
- `HttpOnly`, `SameSite=Lax` signed session cookies
- Runtime request payload validation

---

## 🏗️ Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                          Next.js 16 App Router (SSR)                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  1. Presentation Layer (src/components/)                                     │
│     ├─ Public Sections: Hero, Overview + InteractivePhone, Metrics,          │
│     │  Services, Architecture, Projects, Experience, Skills, Education       │
│     ├─ Modals: CvModal, CoverLetterModal, ProjectDetailModal                 │
│     ├─ Admin Panel: AdminDashboard, ConfirmDeleteModal, Section Editor Tabs  │
│     └─ DOM Protection: ExtensionShield + useExtensionShield                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  2. API Route Layer (src/app/api/)                                           │
│     ├─ GET  /api/content            -> Public encrypted portfolio read       │
│     ├─ POST /api/portal/auth        -> Admin login (rate-limited + CSRF)     │
│     ├─ DELETE /api/portal/auth      -> Admin logout (clears session cookie)  │
│     ├─ GET/PUT/POST /api/portal/content -> Authenticated CRUD operations     │
│     └─ GET/POST /api/portal/seo     -> Multi-engine sitemap & IndexNow ping  │
├──────────────────────────────────────────────────────────────────────────────┤
│  3. Validation & Security Layer (src/server/validation/ & security/)         │
│     ├─ portfolioValidator.ts  -> Request schema validation                   │
│     ├─ inputSanitizer.ts      -> NoSQL injection sanitizer                   │
│     ├─ rateLimiter.ts         -> Rate limiter & lockout guard                │
│     ├─ csrf.ts                -> CSRF origin verification                    │
│     └─ crypto.ts              -> AES-256 payload & storage encryption        │
├──────────────────────────────────────────────────────────────────────────────┤
│  4. Business Logic Layer (src/server/services/)                              │
│     ├─ portfolioService.ts    -> Portfolio read/write orchestration          │
│     ├─ authService.ts         -> Credential and session verification         │
│     └─ seoService.ts          -> 9-engine SEO & IndexNow dispatch            │
├──────────────────────────────────────────────────────────────────────────────┤
│  5. Data Access Layer (src/server/repositories/ & db/)                       │
│     ├─ portfolioRepository.ts -> Atomic MongoDB queries & persistence        │
│     ├─ connection.ts          -> Cached Mongoose connection pool             │
│     └─ models/Portfolio.ts    -> Mongoose schemas & TypeScript contracts     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```text
Portfolio/
├── public/                         # Static images (profile photo, project banners)
├── src/
│   ├── app/                        # App Router pages, metadata & API routes
│   │   ├── admin-console/          # Admin Panel (dashboard + login)
│   │   ├── api/
│   │   │   ├── content/route.ts    # Public portfolio data endpoint
│   │   │   └── portal/
│   │   │       ├── auth/route.ts   # Admin login / logout
│   │   │       ├── content/route.ts# Authenticated content updates
│   │   │       └── seo/route.ts    # Multi-engine SEO ping
│   │   ├── globals.css             # Tailwind v4 styles & extension-shield rules
│   │   ├── layout.tsx              # Root layout, SEO metadata, JSON-LD
│   │   ├── page.tsx                # Server-rendered home page
│   │   ├── robots.ts               # Dynamic robots.txt
│   │   └── sitemap.ts              # Dynamic sitemap.xml
│   ├── components/
│   │   ├── admin/
│   │   │   ├── common/             # ConfirmDeleteModal, ItemListInput
│   │   │   ├── tabs/               # Profile, Experience, Projects, Services,
│   │   │   │                       # Skills, Education, Metrics, Seo, Settings
│   │   │   ├── AdminDashboard.tsx  # Admin controller & fixed sidebar shell
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminLoginForm.tsx
│   │   ├── common/                 # ExtensionShield
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── modals/                 # CvModal, CoverLetterModal, ProjectDetailModal
│   │   ├── phone/                  # InteractivePhone, SarHajjApp, EcommerceApp,
│   │   │                           # EdgeLightingApp, ToolboxApp, types
│   │   ├── providers/              # ThemeContext (dark / light mode)
│   │   ├── sections/               # Hero, Overview, Metrics, Services, Architecture,
│   │   │                           # Projects, Experience, Skills, Education
│   │   ├── ui/                     # BrandIcons (LinkedIn, GitHub, custom SVGs)
│   │   └── PortfolioHome.tsx       # Root client container
│   ├── config/                     # Validated server configuration
│   ├── hooks/                      # useActiveSection, useCopyToClipboard,
│   │                               # useExtensionShield, useScrollPosition
│   ├── models/                     # Mongoose models & interfaces
│   ├── server/
│   │   ├── db/                     # Cached MongoDB connection
│   │   ├── http/                   # Standardized API responses
│   │   ├── repositories/           # Data access layer
│   │   ├── security/               # crypto, csrf, inputSanitizer, rateLimiter
│   │   ├── services/               # auth, portfolio, seo
│   │   └── validation/             # Payload validation
│   ├── types/                      # admin, api, portfolio contracts
│   └── utils/                      # apiClient, basePath, documentUtils, secureStorage
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v20.x` LTS or higher
- **MongoDB Atlas** cluster
- **Package manager**: `npm`, `pnpm`, or `yarn`

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create a local .env.local file with your database connection string,
#    admin credentials, and security secrets (never commit this file)

# 3. Start the development server
npm run dev
```

- Public portfolio: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin-console>

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npx tsc --noEmit` | Run the TypeScript type check |
| `npm run build` | Create a production build |

---

## ☁️ Deployment

1. Push the repository to GitHub and import it into [Vercel](https://vercel.com/).
2. Add the required environment variables in **Vercel Project Settings**.
3. Deploy. Vercel builds and serves the app automatically at <https://hammad-ahmed-android-engineer.vercel.app/>.

---

## 📄 License

Licensed under the **Apache License, Version 2.0**. You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the `LICENSE` file for the specific language governing permissions and limitations.# Hammad Ahmed — Senior Android Engineer Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-hammad--ahmed--android--engineer.vercel.app-10b981?style=for-the-badge)](https://hammad-ahmed-android-engineer.vercel.app/) ![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=next.js) ![React](https://img.shields.io/badge/React-19.2-149eca?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss) ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Mongoose_9-47A248?style=for-the-badge&logo=mongodb) ![Node.js](https://img.shields.io/badge/Node.js-20.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel) ![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)

A modern, full-stack, dynamic engineering portfolio built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **MongoDB Atlas**.

All portfolio content (personal profile, hero statistics, career timeline, flagship case studies, architecture layers, technical skills, education, impact metrics, and CV / cover letter document links) is served dynamically from **MongoDB Atlas**. Static media such as the profile photo and project banners are served from the `public/` directory.

- **Live Site**: <https://hammad-ahmed-android-engineer.vercel.app/>

---

## 📑 Table of Contents

- [Technology Stack](#️-technology-stack)
- [Key Features](#-key-features)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#️-deployment)
- [License](#-license)

---

## 🛠️ Technology Stack

| Layer | Technology | Responsibility |
| --- | --- | --- |
| **Framework** | [Next.js 16.4](https://nextjs.org/) (App Router + Turbopack) | Server-side rendering (`force-dynamic`), serverless API routes, SEO metadata and sitemaps |
| **UI Library** | [React 19.2](https://react.dev/) | Concurrent rendering, modular client components, custom hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict end-to-end typing, domain contracts, compile-time safety |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose 9](https://mongoosejs.com/) | Cloud document persistence with serverless connection pooling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Responsive utility-first layout, glassmorphism surfaces, dark/light themes |
| **Security** | [CryptoJS](https://cryptojs.gitbook.io/) + Node.js `crypto` | AES-256 payload and storage encryption, CSRF protection, NoSQL sanitizer, rate limiting |
| **Icons** | [Lucide React](https://lucide.dev/) + custom SVG brand icons | Vector iconography across the portfolio |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge network, serverless execution, automated CI/CD |

---

## ✨ Key Features

### 1. Database-Driven Content

- All portfolio sections (`PersonalInfo`, `Services`, `Projects`, `Experiences`, `SkillCategories`, `Education`, `Metrics`, `CoverLetter`) are fetched live from MongoDB Atlas on the server and hydrated into the client.
- Images (profile photo and project banners) are served from `public/` via `resolveAvatarPublicImage` and `resolveProjectPublicImage`.

### 2. Interactive Android Device Simulator (`InteractivePhone`)

A phone-frame component with four live app modes, smooth internal scrolling, and interactive controls:

| Mode | Component | Highlights |
| --- | --- | --- |
| **SAR Hajj** | `SarHajjApp` | Live crowd and attendance operations, station filtering, offline Room DB sync simulation, `Admin` / `Candidate` role switching |
| **5 SaaS Apps** | `EcommerceApp` | Multi-tenant e-commerce and food ordering across 5 tenant brands, branch selection, menu modifiers, cart calculation, live order tracking |
| **Edge Light** | `EdgeLightingApp` | 60 FPS edge-lighting studio with border width, glow speed, corner radius, emoji/shape borders, and notch style controls |
| **Toolbox** | `ToolboxApp` | 36-in-1 utility suite: compass, speed test, QR generator, flashlight, synth piano, magnifier, diagnostics |

### 3. Executive CV & Cover Letter Viewers

- **`CvModal`**: Recruiter-ready CV preview with verified impact metrics, skill matrix, work experience, key production systems, and academic credentials.
- **`CoverLetterModal`**: Formatted cover letter reader loaded from MongoDB.
- **PDF download**: Converts a configured Google Drive link into a direct download endpoint, with client-side PDF generation as a fallback.

### 4. Multi-Engine SEO (`seoService`)

Automated `sitemap.xml` and `robots.txt` generation, plus broadcast of canonical URLs and the sitemap to 9 search ecosystems:

1. Google Search & Chrome
2. Microsoft Bing & Edge
3. IndexNow protocol (Bing, Yandex, Naver, Seznam, Yep)
4. DuckDuckGo
5. Brave
6. Yahoo! Search
7. Yandex
8. Naver & Whale Browser
9. Seznam.cz

### 5. Browser Extension DOM Shield (`ExtensionShield`)

Detects and removes unstyled DOM nodes injected below the footer by third-party browser extensions (job-tracker overlays, for example) using CSS containment rules and a `MutationObserver` hook (`useExtensionShield`).

### 6. Security

- AES-256 encrypted public content payloads and local storage
- CSRF origin verification
- Recursive NoSQL injection sanitizer
- Rate limiting
- Runtime request payload validation

---

## 🏗️ Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                          Next.js 16 App Router (SSR)                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  1. Presentation Layer (src/components/)                                     │
│     ├─ Public Sections: Hero, Overview + InteractivePhone, Metrics,          │
│     │  Services, Architecture, Projects, Experience, Skills, Education       │
│     ├─ Modals: CvModal, CoverLetterModal, ProjectDetailModal                 │
│     └─ DOM Protection: ExtensionShield + useExtensionShield                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  2. API Route Layer (src/app/api/)                                           │
│     ├─ GET  /api/content   -> Public encrypted portfolio read                │
│     └─ SEO route           -> Multi-engine sitemap & IndexNow ping           │
├──────────────────────────────────────────────────────────────────────────────┤
│  3. Validation & Security Layer (src/server/validation/ & security/)         │
│     ├─ portfolioValidator.ts  -> Request schema validation                   │
│     ├─ inputSanitizer.ts      -> NoSQL injection sanitizer                   │
│     ├─ rateLimiter.ts         -> Rate limiter                                │
│     ├─ csrf.ts                -> CSRF origin verification                    │
│     └─ crypto.ts              -> AES-256 payload & storage encryption        │
├──────────────────────────────────────────────────────────────────────────────┤
│  4. Business Logic Layer (src/server/services/)                              │
│     ├─ portfolioService.ts    -> Portfolio read/write orchestration          │
│     └─ seoService.ts          -> 9-engine SEO & IndexNow dispatch            │
├──────────────────────────────────────────────────────────────────────────────┤
│  5. Data Access Layer (src/server/repositories/ & db/)                       │
│     ├─ portfolioRepository.ts -> Atomic MongoDB queries & persistence        │
│     ├─ connection.ts          -> Cached Mongoose connection pool             │
│     └─ models/Portfolio.ts    -> Mongoose schemas & TypeScript contracts     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```text
Portfolio/
├── public/                         # Static images (profile photo, project banners)
├── src/
│   ├── app/                        # App Router pages, metadata & API routes
│   │   ├── api/
│   │   │   └── content/route.ts    # Public portfolio data endpoint
│   │   ├── globals.css             # Tailwind v4 styles & extension-shield rules
│   │   ├── layout.tsx              # Root layout, SEO metadata, JSON-LD
│   │   ├── page.tsx                # Server-rendered home page
│   │   ├── robots.ts               # Dynamic robots.txt
│   │   └── sitemap.ts              # Dynamic sitemap.xml
│   ├── components/
│   │   ├── common/                 # ExtensionShield
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── modals/                 # CvModal, CoverLetterModal, ProjectDetailModal
│   │   ├── phone/                  # InteractivePhone, SarHajjApp, EcommerceApp,
│   │   │                           # EdgeLightingApp, ToolboxApp, types
│   │   ├── providers/              # ThemeContext (dark / light mode)
│   │   ├── sections/               # Hero, Overview, Metrics, Services, Architecture,
│   │   │                           # Projects, Experience, Skills, Education
│   │   ├── ui/                     # BrandIcons (LinkedIn, GitHub, custom SVGs)
│   │   └── PortfolioHome.tsx       # Root client container
│   ├── config/                     # Validated server configuration
│   ├── hooks/                      # useActiveSection, useCopyToClipboard,
│   │                               # useExtensionShield, useScrollPosition
│   ├── models/                     # Mongoose models & interfaces
│   ├── server/
│   │   ├── db/                     # Cached MongoDB connection
│   │   ├── http/                   # Standardized API responses
│   │   ├── repositories/           # Data access layer
│   │   ├── security/               # crypto, csrf, inputSanitizer, rateLimiter
│   │   ├── services/               # portfolio, seo
│   │   └── validation/             # Payload validation
│   ├── types/                      # api, portfolio contracts
│   └── utils/                      # apiClient, basePath, documentUtils, secureStorage
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v20.x` LTS or higher
- **MongoDB Atlas** cluster
- **Package manager**: `npm`, `pnpm`, or `yarn`

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npx tsc --noEmit` | Run the TypeScript type check |
| `npm run build` | Create a production build |

---

## ☁️ Deployment

1. Push the repository to GitHub and import it into [Vercel](https://vercel.com/).
2. Add the required environment variables in **Vercel Project Settings**.
3. Deploy. Vercel builds and serves the app automatically at <https://hammad-ahmed-android-engineer.vercel.app/>.

---

## 📄 License

Licensed under the **Apache License, Version 2.0**. You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the `LICENSE` file for the specific language governing permissions and limitations.