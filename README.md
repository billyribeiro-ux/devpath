# DevPath OS

React + TypeScript + Vite learning shell. Use **pnpm** for installs and scripts (see `packageManager` in `package.json`).

## Setup

```bash
pnpm install
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Dev server (Vite + HMR)  |
| `pnpm build`   | Typecheck + production build |
| `pnpm lint`    | ESLint                   |
| `pnpm preview` | Preview production build |

## Stack

- React 19, Vite 8, Tailwind 4, GSAP, Zustand, shadcn-style UI primitives

## ESLint (type-aware)

For stricter type-checked rules, extend `eslint.config.js` with `typescript-eslint` recommendedTypeChecked / strictTypeChecked and point `parserOptions.project` at `tsconfig.json` and `tsconfig.node.json`.
