# Hammad Ahmed — Senior Android Engineer Portfolio

![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-hammad--ahmed--android--engineer.vercel.app-10b981?style=flat-square)![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=flat-square&logo=next.js)![React](https://img.shields.io/badge/React-19.2-149eca?style=flat-square&logo=react)![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Mongoose_9-47A248?style=flat-square&logo=mongodb)![Node.js](https://img.shields.io/badge/Node.js-20.x+-339933?style=flat-square&logo=nodedotjs&logoColor=white)![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square)

A modern, full-stack, dynamic engineering portfolio built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **MongoDB Atlas**.

All portfolio content (personal profile, hero statistics, career timeline, flagship case studies, architecture layers, technical skills, education, impact metrics, and CV / cover letter document links) is served dynamically from **MongoDB Atlas**. Static media such as the profile photo and project banners are served from the `public/` directory.

- **Live Site**: <https://hammad-ahmed-android-engineer.vercel.app/>

---

## 📑 Table of Contents

- [Technology Stack](#%EF%B8%8F-technology-stack)
- [Key Features](#-key-features)
- [Architecture](#%EF%B8%8F-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [License](#-license)

---

## 🛠️ Technology Stack

| Layer | Technology | Responsibility |
| --- | --- | --- |
| **Framework** | [Next.js 16.4](https://nextjs.org/) (App Router + Turbopack) | Server-side rendering (`force-dynamic`) and serverless API routes |
| **UI Library** | [React 19.2](https://react.dev/) | Concurrent rendering, modular client components, custom hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict end-to-end typing, domain contracts, compile-time safety |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose 9](https://mongoosejs.com/) | Cloud document persistence with serverless connection pooling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Responsive utility-first layout, glassmorphism surfaces, dark/light themes |
| **Security** | [CryptoJS](https://cryptojs.gitbook.io/) + Node.js `crypto` | AES-256 payload and storage encryption, CSRF protection, NoSQL sanitizer, rate limiting |
| **Icons** | [Lucide React](https://lucide.dev/) + custom SVG brand icons | Vector iconography across all portfolio sections |

---

## ✨ Key Features

### 1. Database-Driven Content

- All portfolio sections (`PersonalInfo`, `Services`, `Projects`, `Experiences`, `SkillCategories`, `Education`, `Metrics`, `CoverLetter`) are fetched live from MongoDB Atlas on the server and hydrated into the client.
- Static images (profile photo and project banners) are served from `public/`.

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
- **PDF download**: Supports direct PDF download from cloud storage with client-side PDF generation as a fallback.

### 4. Security

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
│     └─ Modals: CvModal, CoverLetterModal, ProjectDetailModal                 │
├──────────────────────────────────────────────────────────────────────────────┤
│  2. API Route Layer (src/app/api/)                                           │
│     └─ GET  /api/content   -> Public encrypted portfolio read                │
├──────────────────────────────────────────────────────────────────────────────┤
│  3. Validation & Security Layer (src/server/validation/ & security/)         │
│     ├─ portfolioValidator.ts  -> Request schema validation                   │
│     ├─ inputSanitizer.ts      -> NoSQL injection sanitizer                   │
│     ├─ rateLimiter.ts         -> Rate limiter                                │
│     ├─ csrf.ts                -> CSRF origin verification                    │
│     └─ crypto.ts              -> AES-256 payload & storage encryption        │
├──────────────────────────────────────────────────────────────────────────────┤
│  4. Business Logic Layer (src/server/services/)                              │
│     └─ portfolioService.ts    -> Portfolio data orchestration                │
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
│   │   ├── globals.css             # Tailwind v4 styles
│   │   ├── layout.tsx              # Root layout & metadata
│   │   └── page.tsx                # Server-rendered home page
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── modals/                 # CvModal, CoverLetterModal, ProjectDetailModal
│   │   ├── phone/                  # InteractivePhone, SarHajjApp, EcommerceApp,
│   │   │                           # EdgeLightingApp, ToolboxApp, types
│   │   ├── providers/              # ThemeContext (dark / light mode)
│   │   ├── sections/               # Hero, Overview, Metrics, Services, Architecture,
│   │   │                           # Projects, Experience, Skills, Education
│   │   ├── ui/                     # BrandIcons (LinkedIn, GitHub, custom SVGs)
│   │   └── PortfolioHome.tsx       # Root client container
│   ├── config/                     # Server configuration
│   ├── hooks/                      # useActiveSection, useCopyToClipboard, useScrollPosition
│   ├── models/                     # Mongoose models & interfaces
│   ├── server/
│   │   ├── db/                     # Cached MongoDB connection
│   │   ├── http/                   # Standardized API responses
│   │   ├── repositories/           # Data access layer
│   │   ├── security/               # crypto, csrf, inputSanitizer, rateLimiter
│   │   ├── services/               # portfolioService
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

## 📄 License

Licensed under the **Apache License, Version 2.0**. You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.