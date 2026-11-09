Analyzed README.md:L1-78
Analyzed package.json:L1-53
Analyzed App.tsx:L1-60
Analyzed LandingPage.tsx:L1-60
Edited README.md
Ran check git status for README.md

I have created a comprehensive, production-grade [`README.md`](file:///e:/Document/Projects/harisenin/videobelajar%201.1/videobelajar1.1/README.md) for the project. 

Here is the complete text:

***

# SkillPop (VideoBelajar 1.1)

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.1-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![MSW](https://img.shields.io/badge/MSW-3.0-FF6A00?logo=mock-service-worker&logoColor=white)](https://mswjs.io/)
[![CI](https://github.com/cervin12/videobelajar-react/actions/workflows/ci.yml/badge.svg)](https://github.com/cervin12/videobelajar-react/actions)

> A modern, responsive creative learning and masterclass platform designed for digital artists, animators, 3D modelers, game developers, and VFX creators. Built with React 19, Vite, Tailwind CSS v4, and a fully tested mock API layer via Mock Service Worker (MSW).

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Testing Strategy & Test Plan](#-testing-strategy--test-plan)
- [API & Mocking Architecture](#-api--mocking-architecture)
- [Theme & Personalization](#-theme--personalization)
- [Continuous Integration (CI/CD)](#-continuous-integration-cicd)
- [License](#-license)

---

## 🌟 Overview

**SkillPop / VideoBelajar 1.1** offers a rich, interactive educational experience tailored for creative disciplines. The platform features an end-to-end learning workflow—from browsing curated masterclasses with live search, filters, and syllabus breakdowns, to managing coursework, XP progress, and personal notes with optimistic UI updates and resilient offline fallbacks.

---

## ✨ Key Features

### 1. 🎨 Masterclass Course Catalog (`CoursePage`)
- **Discipline & Software Filtering:** Filter courses across tracks (*2D & Sakuga, 3D Modeling, Concept Art, VFX, Game Dev*) and industry software (*Blender, Maya, Houdini, Unreal Engine, Photoshop*).
- **Difficulty Levels:** Beginner, Intermediate, Advanced, and Master cohorts.
- **Search & Pagination:** Real-time query search matching titles, instructors, and toolsets with paginated navigation.
- **Interactive Syllabus View:** Weekly breakdowns with learning outcomes, mentor bios, and course prerequisites.

### 2. ⚡ Gamified Student Dashboard (`StudentDashboardPage`)
- **Active Enrolled Courses:** Track live progress bars, module milestones, and upcoming sprint deadlines.
- **XP & Level Progression:** Interactive sprint completion awarding XP and persisting profile changes.
- **Mentor Redlines & WIP Reviews:** Feedback loop module with revision status, critique notes, and downloadable assets.
- **Guild Achievements & Discord Jams:** Earnable quest badges, community event calendars, and project resources.

### 3. 📝 Smart Creative Notes (`NotesPage`)
- **Rich Note Creation:** Quick capture for ideas, pipeline checklists, and technical study notes.
- **Checklist Mode:** Interactive checklists with live toggle, completed strikethrough, and item deletion.
- **Visual Organization:** Color-coded cards, pinned note sections, and normalized tag management (`#blender`, `#shaders`).
- **Optimistic UI with Rollback:** State updates immediately on user action and automatically rolls back if server errors occur.
- **Filter & Search:** Live search filtering titles, body text, checklists, and active tag chips.

### 4. 🔐 Dual-Mode Authentication (`AuthPage`)
- **Sign In & Registration:** Seamless toggle between log in and register modes.
- **Creative Track Selection:** Specialize your account track during onboarding.
- **Validation & Security:** Client-side validation, password visibility toggle, and descriptive error banners.
- **Simulated OAuth Providers:** One-click login simulation for Google, GitHub, Discord, and Apple.

### 5. 🧭 App Shell & Routing (`App.tsx`)
- **Hash-Based Routing:** Instant client-side navigation (`#landing`, `#courses`, `#dashboard`, `#notes`, `#auth`).
- **Floating Switcher:** Persistent floating quick-switcher dock for instant page transitions.
- **Responsive Drawer:** Off-canvas mobile navigation sidebar with user session indicators.

---

## 🛠 Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) | Utilizing latest React features, concurrent rendering, and strict typing |
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) | Strict type checking with comprehensive domain models |
| **Bundler** | [Vite 8](https://vitejs.dev/) | Fast HMR development server and optimized Rollup/Rolldown production builds |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS framework with native CSS variables and dark mode support |
| **Icons & UI** | Material Symbols & Headless UI | Modern icon system and accessible unstyled UI primitives |
| **API Mocking** | [MSW 3.0](https://mswjs.io/) | Mock Service Worker for network interception in both browser and unit tests |
| **Testing** | [Vitest 5.1](https://vitest.dev/) | High-speed unit & integration test runner powered by Vite |
| **DOM Testing** | [React Testing Library](https://testing-library.com/) | User-centric DOM assertions and component testing utilities |
| **CI / CD** | [GitHub Actions](https://github.com/features/actions) | Automated linting, typechecking, testing, and production builds |

---

## 📁 Project Architecture

```
videobelajar1.1/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated CI build, lint, test workflow
├── public/
│   └── mockServiceWorker.js       # MSW browser service worker script
├── src/
│   ├── assets/                    # Static assets & images
│   ├── components/                # Atomic design system
│   │   ├── atoms/                 # Button, Avatar, Icon, Rating, Select, Skeleton, etc.
│   │   ├── molecules/             # SearchBar, ThemeToggle, PriceTag, DisciplinePill, etc.
│   │   ├── organisms/             # Header, Sidebar, CourseCard, HeroSection, FilterBar, etc.
│   │   └── __tests__/             # L4 Shared component tests
│   ├── data/                      # Seed mock datasets (courses, notes, dashboard)
│   ├── hooks/                     # Custom React hooks (useScrollAnimation, etc.)
│   ├── mocks/
│   │   ├── browser.ts             # MSW worker initialization for browser development
│   │   └── handlers.ts            # REST handlers with localStorage persistence & fallbacks
│   ├── pages/
│   │   ├── AuthPage.tsx           # Authentication view (Login / Register)
│   │   ├── CoursePage.tsx         # Catalog and syllabus view
│   │   ├── LandingPage.tsx        # Homepage, hero showcase, marketing sections
│   │   ├── NotesPage.tsx          # Study notes & checklist manager
│   │   ├── StudentDashboardPage.tsx# Student learning stats, WIP reviews, XP tracker
│   │   └── __tests__/             # L2 Page integration test suites
│   ├── services/
│   │   ├── api.ts                 # Unified typed API client with resilient fallbacks
│   │   └── __tests__/             # L1 API service unit test suite
│   ├── test/
│   │   ├── setup.ts               # Vitest global environment & teardown setup
│   │   └── setupServer.ts         # MSW Node server configuration for tests
│   ├── types/                     # TypeScript definitions (courses, notes, student)
│   ├── App.tsx                    # Main app shell, hash routing, floating switcher
│   └── main.tsx                   # Entry point, theme initialization, MSW startup
├── test-plan.md                   # Complete test architecture and scenario matrix
├── vitest.config.ts               # Vitest configuration (jsdom, coverage, sequential run)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher
- **Package Manager**: [pnpm](https://pnpm.io/) (recommended), `npm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cervin12/videobelajar-react.git
   cd videobelajar-react
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the local development server:**
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to `http://localhost:5173`. MSW will automatically initialize in the browser console.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `pnpm build` | Typechecks using `tsc -b` and builds production bundle to `dist/` |
| `pnpm preview` | Locally previews the production build from `dist/` |
| `pnpm lint` | Runs ESLint across all TypeScript and React files |
| `pnpm test` | Starts Vitest in interactive watch mode |
| `pnpm test:run` | Executes all test suites once and outputs summary |
| `pnpm test:coverage` | Runs full test suite and outputs v8 coverage metrics |

---

## 🧪 Testing Strategy & Test Plan

The project follows a rigorous 4-layer testing strategy defined in [`test-plan.md`](test-plan.md), ensuring both **happy paths** (data flow & rendering) and **failure paths** (error handling, rollbacks, fallbacks) are verified.

```
       ▲
      / \     L4: Shared Components (ThemeToggle, Sidebar, Header) [4 tests]
     /---\
    /     \    L3: App Navigation (Routing, Hash changes, Switcher) [5 tests]
   /-------\
  /         \   L2: Page Integration (Notes, Auth, Courses, Dashboard) [58 tests]
 /-----------\
/             \  L1: API Service Layer (Typed requests, Fallbacks, Headers) [27 tests]
---------------
```

### Test Suite Summary: 94 / 94 Passing (100%)

| Layer | Focus Area | File | Tests |
|---|---|---|:---:|
| **L1** | API Service Layer | `src/services/__tests__/api.test.ts` | 27 / 27 |
| **L2** | Notes Management | `src/pages/__tests__/NotesPage.test.tsx` | 28 / 28 |
| **L2** | Authentication Flow | `src/pages/__tests__/AuthPage.test.tsx` | 14 / 14 |
| **L2** | Course Catalog & Detail | `src/pages/__tests__/CoursePage.test.tsx` | 10 / 10 |
| **L2** | Student Dashboard | `src/pages/__tests__/StudentDashboardPage.test.tsx` | 6 / 6 |
| **L3** | App Shell Navigation | `src/__tests__/App.test.tsx` | 5 / 5 |
| **L4** | Shared UI Components | `src/components/__tests__/SharedComponents.test.tsx` | 4 / 4 |

Run the test suite at any time:
```bash
pnpm test:run
```

---

## 📡 API & Mocking Architecture

The application operates without requiring an external backend server. All networking is handled seamlessly via **Mock Service Worker (MSW)** and the typed client in [`src/services/api.ts`](src/services/api.ts):

- **In-Memory & LocalStorage Persistence:** Notes (`skillpop-notes`) and student profiles (`skillpop_mock_student_profile`) persist across page refreshes.
- **Fail-Safe Fallbacks:** If an API endpoint encounters a network error or returns an unexpected status code (500), the service layer automatically catches the issue, logs a clear warning, and gracefully resolves seeded fallback datasets without breaking the UI.
- **Optimistic State Management:** Notes creation and deletion update state immediately for rapid user feedback; should the backend respond with an error, state is seamlessly rolled back.

---

## 🌓 Theme & Personalization

SkillPop comes equipped with a theme engine supporting **Dark Mode** and **Light Mode**:
- Automatically senses user system preferences via `prefers-color-scheme`.
- Persists theme preferences in `localStorage['skillpop-theme']`.
- Toggled in one click from either the header, the floating navigation switcher, or the mobile drawer.

---

## 🤖 Continuous Integration (CI/CD)

Every push and pull request to `main` triggers our GitHub Actions pipeline ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)), running:
1. Dependency caching and installation (`pnpm install --frozen-lockfile`)
2. TypeScript compilation verification (`pnpm tsc -b`)
3. Code linting (`pnpm lint`)
4. Full Vitest test suite execution (`pnpm test:run`)
5. Production bundle build validation (`pnpm build`)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

***

The updated content has been saved directly to [`README.md`](file:///e:/Document/Projects/harisenin/videobelajar%201.1/videobelajar1.1/README.md). Would you like me to commit and push this update to GitHub as well?
