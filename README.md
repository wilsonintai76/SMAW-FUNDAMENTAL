# SMAW FUNDAMENTAL

An interactive AWS D1.1 technical operating guide and training application for
**Shielded Metal Arc Welding (SMAW)** — SOP 7.1, covering arc principles,
amperage and heat-input control, machine components, machine types and
standards, polarity, process labelling, pre-weld procedures and joint
configuration.

**Live:** https://smaw-fundamental.wilson-b6f.workers.dev

## Contents

The guide is organised as a dashboard plus nine navigable clauses:

| Clause | Topic |
| ------ | ----- |
| Overview | Dashboard with entry points into every clause |
| 7.1.1 | Welding principles and the arc |
| 7.1.2 | Amperage, voltage and heat input |
| 7.1.3 | Machine components |
| 7.1.4 | Machine types and standards |
| 7.1.5 | Process advantages and limitations |
| 7.1.6 | Polarity (static diagram plus animated simulation) |
| 7.1.7 | Pre-welding process and SOP |
| 7.1.8 | Joint configurations |
| 7.1.9 | Joint selection guidance |

Supporting tools: an interactive parameter calculator, a technical glossary, a
safety protocol drawer, a 10-question mastery quiz, and a print/PDF export
helper.

## Tech stack

- **React 19** with `React.lazy` + `Suspense` code splitting per clause
- **Vite 6** (`@vitejs/plugin-react`, `@tailwindcss/vite`)
- **Tailwind CSS 4** (`@theme` tokens, `tw-animate-css` for enter/exit animations)
- **lucide-react** for iconography
- **TypeScript 5.8** (`tsc --noEmit` used as the lint step)
- **Cloudflare Workers Static Assets** for hosting

No backend, no API keys, no runtime network calls — the app is fully static.

## Getting started

**Prerequisites:** Node.js 20 or newer.

```bash
npm install     # install dependencies
npm run dev     # dev server on http://localhost:3000
```

## Scripts

| Script | What it does |
| ------ | ------------ |
| `npm run dev` | Vite dev server on port 3000, bound to `0.0.0.0` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | `tsc --noEmit` — type-check only, no emit |
| `npm run clean` | Delete `dist/` (cross-platform) |
| `npm run deploy` | Build, then `wrangler deploy` to Cloudflare |

## Deployment

Hosting is a Cloudflare Worker serving static assets straight out of `dist/`,
with SPA fallback so deep links resolve to `index.html`
([wrangler.jsonc](./wrangler.jsonc)):

```jsonc
{
  "name": "smaw-fundamental",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

```bash
npx wrangler login   # once, as wilson@poliku.edu.my
npm run deploy       # build + deploy
```

## Project structure

```
src/
├── App.tsx                  # section state machine, lazy routes
├── components/              # clause views, simulations and modal tools
│   ├── Navbar.tsx           # desktop sidebar + mobile bottom nav
│   ├── OverviewDashboard.tsx
│   ├── Section7xx*.tsx      # one component per clause
│   └── ...
├── data/weldingData.ts      # all technical content, parameters and quiz
├── lib/
│   ├── weldMath.ts          # heat-input and arc-voltage maths
│   └── useModalA11y.ts      # shared dialog a11y (focus trap, Escape, scroll lock)
├── types.ts                 # shared domain types
└── index.css                # Tailwind entry, theme tokens, print styles
```

Technical content lives entirely in [src/data/weldingData.ts](./src/data/weldingData.ts),
so parameters, electrode ranges and quiz questions can be updated without
touching component code.

## Responsiveness and accessibility

- Fluid layouts verified from 375 px upward; no horizontal scroll on mobile.
- `viewport-fit=cover` plus a `.safe-area-bottom` utility keeps the sticky
  mobile navigation clear of iOS home-indicator safe areas.
- All five modals share `useModalA11y`: Escape to dismiss, Tab focus trap,
  background scroll lock with scrollbar-width compensation, and focus
  restoration to the invoking element.
- The animated polarity simulation pauses when off-screen
  (`IntersectionObserver`) and respects `prefers-reduced-motion`.
- `@media print` rules strip chrome for the print/PDF export path.

## Disclaimer

This application is an educational training aid. Welding parameters,
electrode selections and joint preparations shown here are illustrative;
always work to the qualified **Welding Procedure Specification (WPS)** and
applicable code requirements for the job. Entries that depend on a specific
WPS are labelled `Per WPS`.
