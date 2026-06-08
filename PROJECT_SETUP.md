# Veylix Staffing: Project Setup Documentation

This document records every decision made during the production-grade project
foundation setup for **veylix-staffing**.

---

## 1. Framework & Runtime

| Decision        | Value      | Rationale                                  |
| --------------- | ---------- | ------------------------------------------ |
| Next.js         | **16.2.6** | Latest stable via `create-next-app@latest` |
| React           | **19.2.4** | Bundled with Next.js 16                    |
| TypeScript      | **5.9.3**  | Strict mode with extended path aliases     |
| Package manager | **npm**    | Per project spec                           |

---

## 2. Installed Packages (Production)

| Package                    | Version | Purpose                                                     |
| -------------------------- | ------- | ----------------------------------------------------------- |
| `next`                     | 16.2.6  | App Router framework                                        |
| `react` / `react-dom`      | 19.2.4  | UI runtime                                                  |
| `framer-motion`            | 12.40.0 | Component animations                                        |
| `gsap`                     | 3.15.0  | Timeline / scroll animations                                |
| `@gsap/react`              | 2.1.2   | GSAP React integration                                      |
| `lenis`                    | 1.3.23  | Smooth scroll (replaces deprecated `@studio-freight/lenis`) |
| `lucide-react`             | 1.17.0  | Icon library                                                |
| `react-fast-marquee`       | 1.6.5   | Logo / text marquee                                         |
| `react-parallax-tilt`      | 1.7.329 | Card tilt effects                                           |
| `react-countup`            | 6.5.3   | Animated stat counters                                      |
| `@tsparticles/react`       | 4.1.1   | Particle effects (React)                                    |
| `@tsparticles/slim`        | 4.1.1   | Lightweight particle engine                                 |
| `clsx`                     | 2.1.1   | Conditional class names                                     |
| `tailwind-merge`           | 3.6.0   | Tailwind class deduplication                                |
| `class-variance-authority` | 0.7.1   | Variant-based component styling                             |
| `react-hook-form`          | 7.76.1  | Form state management                                       |
| `@hookform/resolvers`      | 5.4.0   | Zod resolver for forms                                      |
| `zod`                      | 4.4.3   | Schema validation                                           |
| `next-sitemap`             | 4.2.3   | Sitemap + robots.txt generation                             |

---

## 3. Installed Packages (Development)

| Package                             | Version | Purpose                             |
| ----------------------------------- | ------- | ----------------------------------- |
| `typescript`                        | 5.9.3   | Type checking                       |
| `tailwindcss`                       | 3.4.19  | Utility-first CSS (v3, see below)   |
| `postcss`                           | 8.5.15  | CSS processing                      |
| `autoprefixer`                      | 10.5.0  | Vendor prefixes                     |
| `eslint`                            | 9.39.4  | Linting                             |
| `eslint-config-next`                | 16.2.6  | Next.js ESLint rules (flat config)  |
| `eslint-config-prettier`            | 10.1.8  | Disable ESLint/Prettier conflicts   |
| `eslint-plugin-import`              | 2.32.0  | Import order & validation           |
| `eslint-plugin-unused-imports`      | 4.4.1   | Remove dead imports                 |
| `eslint-import-resolver-typescript` | 4.4.4   | Resolve `@/` path aliases in ESLint |
| `@typescript-eslint/eslint-plugin`  | 8.60.0  | TypeScript lint rules               |
| `@typescript-eslint/parser`         | 8.60.0  | TypeScript parser for ESLint        |
| `typescript-eslint`                 | 8.60.0  | Flat config TypeScript integration  |
| `prettier`                          | 3.8.3   | Code formatting                     |
| `prettier-plugin-tailwindcss`       | 0.8.0   | Sort Tailwind classes               |
| `husky`                             | 9.1.7   | Git hooks                           |
| `lint-staged`                       | 17.0.6  | Pre-commit staged linting           |
| `@commitlint/cli`                   | 21.0.2  | Commit message validation           |
| `@commitlint/config-conventional`   | 21.0.2  | Conventional Commits preset         |
| `tsc-files`                         | 1.1.4   | Type-check staged files             |
| `@next/bundle-analyzer`             | 16.2.6  | Bundle size analysis                |
| `cross-env`                         | 10.1.0  | Cross-platform env vars in scripts  |
| `jest`                              | 30.4.2  | Unit testing                        |
| `jest-environment-jsdom`            | 30.4.1  | DOM test environment                |
| `@testing-library/react`            | 16.3.2  | React component testing             |
| `@testing-library/jest-dom`         | 6.9.1   | DOM matchers                        |
| `@testing-library/user-event`       | 14.6.1  | User interaction simulation         |
| `ts-jest`                           | 29.4.11 | TypeScript Jest transformer         |

**Note:** `eslint-plugin-no-console` does not exist on npm. The built-in ESLint
`no-console` rule is used instead.

---

## 4. Key Configuration Decisions

### Tailwind CSS v3 (not v4)

`create-next-app@latest` scaffolds Tailwind v4 with CSS-first config. The spec
requires a full `tailwind.config.ts` with design tokens. We:

- Installed `tailwindcss@3`, `postcss`, `autoprefixer`
- Removed `@tailwindcss/postcss` (v4 plugin)
- Applied the full Veylix design token system (`vx-*` colors, typography, etc.)

### Lenis smooth scroll

The spec listed `@studio-freight/lenis` (deprecated). We installed **`lenis`**
(v1.3.23) and use a module singleton in `src/lib/lenis.ts` via `getLenis()` /
`initLenis()`. We do not assign to `window.lenis` because the modern Lenis
package declares its own conflicting global type.

### ESLint flat config

Next.js 16's `eslint-config-next` only supports **ESLint 9 flat config**. The
legacy `.eslintrc.js` (kept per spec) cannot extend `next/core-web-vitals` without
circular reference errors. Active linting runs via **`eslint.config.mjs`**, which
mirrors all rules from the spec's `.eslintrc.js`.

### TypeScript jsx setting

The spec requested `"jsx": "preserve"`. Next.js 16 build auto-updates this to
`"react-jsx"` (React automatic runtime). This is required for Next.js 16 and was
retained after the first production build.

### React hooks

`useMounted` and `useMediaQuery` use `useSyncExternalStore` instead of
`useEffect` + `setState` to satisfy React 19's `react-hooks/set-state-in-effect`
rule from `eslint-config-next`.

### Environment variables

- `.env.local`: local dev secrets (gitignored)
- `.env.example`: committed template for onboarding
- `.gitignore` updated to ignore `.env.local`, `.env.production`, `.env.*.local`
  while allowing `.env.example`

### Security headers

Configured in `next.config.ts`: X-Frame-Options, X-Content-Type-Options,
Referrer-Policy, Permissions-Policy, DNS prefetch, and long-cache headers for
`/fonts/*`.

---

## 5. Folder Structure

```
src/
├── app/
│   ├── (marketing)/          # Public route group
│   │   ├── layout.tsx        # Marketing shell (pass-through for now)
│   │   └── page.tsx          # Homepage placeholder
│   ├── providers/            # Client-side context providers
│   │   ├── LenisProvider.tsx # Smooth scroll initialization
│   │   ├── PageTransition.tsx# Page enter animation wrapper
│   │   └── index.tsx         # Provider composition barrel
│   ├── globals.css           # Tailwind + Veylix design utilities
│   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   └── not-found.tsx         # Custom 404 page
│
├── components/
│   ├── ui/                   # Primitive UI (cursor, buttons, cards, etc.)
│   ├── sections/             # Page sections (hero, services, footer, etc.)
│   └── common/               # Layout helpers (Container, Section, Label)
│
├── config/
│   ├── site.ts               # Site metadata, socials, contact info
│   └── navigation.ts         # Nav link configuration
│
├── constants/
│   ├── animations.ts         # Shared Framer Motion variants
│   └── breakpoints.ts        # Responsive breakpoint values
│
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities (cn, Lenis, GSAP helpers)
├── styles/                   # next/font declarations
├── types/                    # Global type augmentations
└── utils/                    # Convenience re-exports (cn)
```

All component and section files are **empty shells** (`return null`), ready for
Phase 2 homepage development. No UI logic has been implemented.

---

## 6. Git Workflow

| Branch      | Purpose                                    |
| ----------- | ------------------------------------------ |
| `main`      | Production (protected, PR required)        |
| `develop`   | Integration branch (current active branch) |
| `feature/*` | New features, branch from `develop`        |
| `fix/*`     | Bug fixes, branch from `develop`           |
| `chore/*`   | Maintenance, branch from `develop`         |

### Husky hooks

- **pre-commit** → `lint-staged` (ESLint fix + Prettier)
- **commit-msg** → `commitlint` (Conventional Commits)
- **pre-push** → `tsc --noEmit` (full type check)

---

## 7. Onboarding Guide (Next Developer)

### Prerequisites

- Node.js 20+
- npm 10+
- Git

### Setup

```bash
git clone <repo-url>
cd veylix-staffing
npm install
cp .env.example .env.local   # then fill in values
npm run dev                    # http://localhost:3000
```

### Before committing

```bash
npm run validate   # type-check + lint + format:check
```

### Commit message format

```
<type>: <subject>

Examples:
  feat: add hero section with framer motion animations
  fix: resolve navbar hydration mismatch on mobile
  chore: install gsap and configure tailwind design tokens
```

Allowed types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`,
`test`, `build`, `revert`, `wip`

### Recommended VS Code extensions

See `.vscode/extensions.json`: Prettier, ESLint, Tailwind CSS IntelliSense,
Error Lens, and others.

---

## 8. Verification Results

All checks passed at setup completion:

| Command                | Result                           |
| ---------------------- | -------------------------------- |
| `npm run type-check`   | ✅ 0 errors                      |
| `npm run lint`         | ✅ 0 errors, 0 warnings          |
| `npm run format:check` | ✅ 0 issues                      |
| `npm run test`         | ✅ Pass (0 tests)                |
| `npm run build`        | ✅ Production build + sitemap    |
| `npm run dev`          | ✅ Server ready, `/` returns 200 |

---

## 9. Next Steps: Phase 2 Homepage Development

1. Implement `Navbar`, `HeroSection`, and remaining section components
2. Wire sections into `src/app/(marketing)/page.tsx`
3. Add Lenis CSS import and smooth scroll polish
4. Implement `CustomCursor`, `ScrollProgress`, and animation variants
5. Add real content, imagery, and SEO metadata per page

**Setup is complete. No UI has been built.**
