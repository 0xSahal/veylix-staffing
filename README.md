# Veylix Staffing — Web Platform

Premium staffing agency website built with Next.js 16, TypeScript, Tailwind CSS,
Framer Motion, and GSAP.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion + GSAP + Lenis
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier + Husky + Commitlint

## Getting Started

```bash
npm install
npm run dev        # Start dev server (http://localhost:3000)
```

## Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start dev server with Turbopack  |
| `npm run build`      | Production build                 |
| `npm run lint`       | Run ESLint (zero warnings)       |
| `npm run format`     | Format all files with Prettier   |
| `npm run type-check` | TypeScript type checking         |
| `npm run test`       | Run Jest tests                   |
| `npm run validate`   | Type check + lint + format check |
| `npm run analyze`    | Bundle size analysis             |

## Commit Convention

Follows Conventional Commits:
`feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `revert`

## Branch Strategy

- `main` → production (protected, requires PR)
- `develop` → integration branch
- `feature/*` → new features (branch from develop)
- `fix/*` → bug fixes (branch from develop)
- `chore/*` → maintenance
