# Interactive Web Portfolio & Device Simulator

A modern, high-performance web application built with **Next.js 16**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**. The application features an interactive mobile device simulator, dynamic component architecture, glassmorphic UI design, and automated static export for zero-downtime hosting.

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.2` | App Router, static page pre-rendering, Turbopack build engine |
| **UI Library** | [React](https://react.dev/) / React DOM | `19.3.0` | Modern React primitives, hooks, concurrent rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.0.0` | Static typing, interface definitions, compile-time safety |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.0.0` | Utility-first styling engine via `@tailwindcss/postcss` |
| **PostCSS** | [PostCSS](https://postcss.org/) | `^8.5.31` | CSS transformations and vendor prefixing pipeline |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.61.0` | Lightweight SVG icons |
| **Class Utilities** | `clsx` & `tailwind-merge` | `2.1.1` / `3.7.0` | Dynamic, conflict-free CSS class name generation |
| **Typography** | `next/font/google` (Geist) | Built-in | Zero layout-shift self-hosted font optimization |
| **Deployment** | GitHub Actions & GitHub Pages | v4 | Automated CI/CD pipeline for static bundle deployment |

---

## 🏗️ System Architecture & How This Project Is Built

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js 16 (App Router)                         │
├────────────────────────────────────────────────────────────────────────┤
│                               React 19                                 │
├──────────────────────────────┬─────────────────────────────────────────┤
│        UI Components         │              State & Data               │
│  - Hero & Navigation Bar     │  - Centralized Data Store               │
│  - Interactive Phone Chassis │  - Theme Context (Dark Mode System)     │
│  - Modal Dialog Windows      │  - Base Path Dynamic Resolver           │
│  - Animated Canvas Surface   │  - Unidirectional Event Callbacks       │
├──────────────────────────────┴─────────────────────────────────────────┤
│                         Tailwind CSS v4 Engine                         │
│       - Obsidian dark theme with custom ambient glow accents           │
│       - Hardware-accelerated CSS keyframe animations & transitions      │
│       - Responsive breakpoints (sm, md, lg, xl, 2xl)                   │
├────────────────────────────────────────────────────────────────────────┤
│                          Turbopack Compiler                            │
│                 (Static Export: output: "export" -> ./out)             │
├────────────────────────────────────────────────────────────────────────┤
│                         GitHub Actions CI/CD                           │
│                (Automated production build and deploy)                 │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Next.js 16 App Router & Static Generation
- Configured with `output: "export"` in `next.config.ts`, generating pure static HTML, CSS, and JavaScript bundles without requiring a Node.js runtime server.
- Uses `src/app/layout.tsx` for global HTML structure, viewport configurations, font injection, and structured metadata.
- Main application shell assembled in `src/app/page.tsx` with dynamic client-side hydration boundaries.

### 2. Styling System & Visual Design
- **Tailwind CSS v4**: Built with `@tailwindcss/postcss` and integrated directly into `@import "tailwindcss"`.
- **Obsidian Dark Theme**: Palette constructed with deep zinc (`#09090b`), translucent dark slate surfaces (`rgba(24, 24, 27, 0.75)`), and neon accent glows (emerald, teal, cyan, and amber).
- **Glassmorphism**: Backdrop blur filters (`backdrop-blur-md`), translucent border gradients, and dynamic shadow elevations.
- **Hardware-Accelerated Animations**: CSS keyframe animations for radar scanning pulses, ambient glowing borders, and smooth spring transitions.

### 3. Interactive Virtual Device Simulator Architecture
The phone simulator is built as an isolated component system within `src/components/phone/`:
- **Chassis & Hardware Frame**: Outer frame featuring curved corners, antenna bands, volume and power button cutouts, dynamic camera notch, and real-time battery/signal status bar.
- **Dynamic Viewport Router**: Internal state router allowing seamless switching between different interactive application screens without page reloads.
- **Canvas Rendering Loop**: Integrated HTML5 `<canvas>` element utilizing hardware-accelerated 2D rendering contexts and `requestAnimationFrame` animation loops locked at 60 FPS.
- **Interactive Controls**: Touch-friendly toggles, sliders, tab bars, and interactive modals simulating mobile operating system behaviors.

### 4. Component Hierarchy
- **Header & Navigation** (`Navbar.tsx`): Sticky header with backdrop blur, active section tracking, and mobile drawer menu.
- **Hero Surface** (`HeroSection.tsx`): Primary viewport introducing the platform with call-to-action buttons and quick metrics.
- **Content Sections**:
  - `ImpactMetrics.tsx`: Metric counter cards with subtle gradient borders.
  - `SkillsSection.tsx`: Categorized skill chips with interactive hover states.
  - `ArchitectureSection.tsx`: Visual architectural flow diagrams.
  - `ExperienceSection.tsx` & `EducationSection.tsx`: Chronological timeline cards.
  - `ProjectsSection.tsx`: Filterable project showcase cards with deep-dive modal triggers.
  - `ContactSection.tsx`: Dynamic mailto form generator with validated input fields.
- **Modal System** (`ProjectDetailModal.tsx`, `CoverLetterModal.tsx`): Accessible dialog overlays with backdrop blur, scroll locking, and keyboard escape handling.

### 5. SEO & Structured Data Architecture
- Single `<h1>` tag with structured semantic headings (`<header>`, `<main>`, `<section>`, `<footer>`).
- Standard OpenGraph and Twitter card metadata for link previews.
- Schema.org structured data embedded via JSON-LD in `src/app/layout.tsx`.
- Fully responsive layout supporting viewports from 320px mobile to 4K ultra-wide screens.

---

## 📁 Directory Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment pipeline
├── public/                     # Static public assets (images, icons, documents)
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   ├── *.svg                   # System vector icons
│   └── *.jpg                   # UI previews and images
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 import & custom styling
│   │   ├── layout.tsx          # Root layout, fonts, and metadata configuration
│   │   └── page.tsx            # Main application page
│   ├── components/
│   │   ├── ArchitectureSection.tsx
│   │   ├── BrandIcons.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CoverLetterModal.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ImpactMetrics.tsx
│   │   ├── InteractivePhone.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectDetailModal.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ThemeContext.tsx
│   │   └── phone/              # Virtual phone simulator modules
│   │       ├── types.ts
│   │       ├── SarHajjApp.tsx
│   │       ├── EcommerceApp.tsx
│   │       ├── EdgeLightingApp.tsx
│   │       └── ToolboxApp.tsx
│   ├── data/
│   │   └── portfolioData.ts    # Application data store
│   └── utils/
│       └── basePath.ts         # Asset and route path resolver
├── .gitignore                  # Git exclusion rules
├── eslint.config.mjs           # ESLint linting configuration
├── next.config.ts              # Next.js static export & basePath config
├── package.json                # Project dependencies and npm scripts
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project documentation
├── TECH_STACK.md               # Detailed technical reference
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node `v20.x` LTS recommended)
- **Package Manager**: `npm` (`v9+`), `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser. Hot Module Replacement (HMR) will automatically reflect code changes in real time.

### Static Production Build

Compile and export the application into static HTML, CSS, and JS:
```bash
npm run build
```

The output will be generated inside the `./out` directory.

To preview the production build locally:
```bash
npx serve out
```

### Code Linting

Run ESLint to check for code quality and style compliance:
```bash
npm run lint
```

---

## 🌐 Automated Deployment (CI/CD)

The application includes a fully automated deployment workflow using **GitHub Actions** (`.github/workflows/deploy.yml`):

1. **Trigger**: Pushes to the `main` or `master` branch.
2. **Setup**: Installs Node.js 20 and dependencies via `npm ci`.
3. **Build**: Executes `npm run build` to generate the static `./out` bundle.
4. **Deploy**: Uploads the `./out` directory artifact and deploys directly to **GitHub Pages**.

### GitHub Pages Setup
1. Navigate to **Repository Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push to `main` to trigger the build and deployment.
