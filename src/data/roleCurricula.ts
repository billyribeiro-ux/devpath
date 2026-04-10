import { PINNED_SECTION } from '@/lib/scroll';

export type RoleId = 'frontend' | 'fullstack' | 'svelte' | 'ui' | 'principal';

export type CurriculumLesson = {
  id: string;
  /** e.g. "Module 1 · Foundations" */
  module: string;
  title: string;
  /** One-line outcome / what you can do after (PE7-style clarity). */
  summary: string;
  jump: keyof typeof PINNED_SECTION;
};

type Pinned = (typeof PINNED_SECTION)[keyof typeof PINNED_SECTION];

export type CurriculumRoadmapRow = {
  id: string;
  module: string;
  title: string;
  summary: string;
  completed: boolean;
  locked: boolean;
  current?: boolean;
  jumpTo?: Pinned;
};

function rowsFromLessons(lessons: CurriculumLesson[]): CurriculumRoadmapRow[] {
  return lessons.map((l, i) => ({
    id: l.id,
    module: l.module,
    title: l.title,
    summary: l.summary,
    completed: false,
    locked: false,
    current: i === 0,
    jumpTo: PINNED_SECTION[l.jump],
  }));
}

/** Front-end Developer — UI & interactions (0 → shipping interfaces). */
const frontendLessons: CurriculumLesson[] = [
  {
    id: 'fe-01',
    module: 'Module 1 · Platform',
    title: 'How the web platform actually works',
    summary:
      'Requests, responses, rendering pipeline, and using DevTools to see HTML/CSS/JS in motion—not magic.',
    jump: 'learn',
  },
  {
    id: 'fe-02',
    module: 'Module 1 · Platform',
    title: 'HTML as a contract, not decoration',
    summary:
      'Semantic elements, document outline, and why the DOM you ship is an API for browsers and assistive tech.',
    jump: 'learn',
  },
  {
    id: 'fe-03',
    module: 'Module 2 · Accessible UI',
    title: 'Accessibility like a staff engineer',
    summary:
      'WCAG-aligned patterns: focus order, labels, keyboard paths, and testing with the a11y tree—not guesswork.',
    jump: 'learn',
  },
  {
    id: 'fe-04',
    module: 'Module 3 · CSS systems',
    title: 'Cascade, specificity, and custom properties',
    summary:
      'Predictable styling: layers mental model, :where/:is, tokens with CSS variables, and zero-surprise overrides.',
    jump: 'learn',
  },
  {
    id: 'fe-05',
    module: 'Module 3 · CSS systems',
    title: 'Flexbox: alignment in one dimension',
    summary:
      'Main/cross axis, gap, flex-basis vs width, and common layout bugs (overflow, min-size) solved methodically.',
    jump: 'tryIt',
  },
  {
    id: 'fe-06',
    module: 'Module 3 · CSS systems',
    title: 'Grid: two dimensions and responsive tracks',
    summary:
      'auto-fit/auto-fill, minmax, subgrid intuition, and when grid wins over flex—then you prove it in code.',
    jump: 'tryIt',
  },
  {
    id: 'fe-07',
    module: 'Module 4 · JavaScript for UI',
    title: 'JS fundamentals that front-ends rely on',
    summary:
      'Types, coercion you still care about, collections, modules, and debugging stateful UI without thrashing.',
    jump: 'learn',
  },
  {
    id: 'fe-08',
    module: 'Module 4 · JavaScript for UI',
    title: 'DOM, events, and the browser event loop',
    summary:
      'Listeners, delegation, passive listeners, rAF vs microtasks—enough to reason about jank and responsiveness.',
    jump: 'tryIt',
  },
  {
    id: 'fe-09',
    module: 'Module 4 · JavaScript for UI',
    title: 'Async UI: Promises, fetch, and errors users see',
    summary:
      'Loading and error UI, cancellation patterns, and not lying to users about network state.',
    jump: 'project',
  },
  {
    id: 'fe-10',
    module: 'Module 5 · TypeScript',
    title: 'TypeScript for components and props',
    summary:
      'Narrowing, generics where they pay off, and types as documentation your team will actually read.',
    jump: 'learn',
  },
  {
    id: 'fe-11',
    module: 'Module 6 · Architecture',
    title: 'Components, composition, and boundaries',
    summary:
      'Smart vs dumb splits, colocation, and when to lift state—patterns that scale past the tutorial.',
    jump: 'explain',
  },
  {
    id: 'fe-12',
    module: 'Module 7 · Quality bar',
    title: 'Performance: Core Web Vitals you own',
    summary:
      'LCP, INP, CLS: what to measure, what usually breaks them, and how to defend tradeoffs to leadership.',
    jump: 'learn',
  },
  {
    id: 'fe-13',
    module: 'Module 7 · Quality bar',
    title: 'Testing and review discipline',
    summary:
      'Meaningful unit/integration tests, visual regression where it helps, and code review as teaching.',
    jump: 'review',
  },
  {
    id: 'fe-14',
    module: 'Capstone',
    title: 'Ship a real UI feature end-to-end',
    summary:
      'Navbar-to-dashboard slice: checklist-driven delivery, a11y, and a story you can tell in a staff interview.',
    jump: 'build',
  },
];

/** Full-stack Engineer — end-to-end systems. */
const fullstackLessons: CurriculumLesson[] = [
  {
    id: 'fs-01',
    module: 'Module 1 · Foundations',
    title: 'The full stack mental model',
    summary:
      'Browser → network → app server → data: boundaries, failure domains, and where your bugs actually live.',
    jump: 'learn',
  },
  {
    id: 'fs-02',
    module: 'Module 1 · Foundations',
    title: 'HTML, CSS, JS in production apps',
    summary:
      'Enough front-end depth to pair with UI engineers: hydration, bundles, and not breaking the client.',
    jump: 'learn',
  },
  {
    id: 'fs-03',
    module: 'Module 2 · Runtimes',
    title: 'Node (or server runtimes) without folklore',
    summary:
      'Event loop vs worker threads, fs/net at high level, env config, and 12-factor habits.',
    jump: 'learn',
  },
  {
    id: 'fs-04',
    module: 'Module 3 · HTTP & APIs',
    title: 'Designing HTTP APIs that age well',
    summary:
      'REST pragmatics, status codes, idempotency, versioning, and OpenAPI as a team contract.',
    jump: 'project',
  },
  {
    id: 'fs-05',
    module: 'Module 3 · HTTP & APIs',
    title: 'Authn and authz you can defend',
    summary:
      'Sessions vs tokens, CSRF/CORS intuition, OAuth2/OIDC at a principal level—tradeoffs, not buzzwords.',
    jump: 'learn',
  },
  {
    id: 'fs-06',
    module: 'Module 4 · Data',
    title: 'Relational data modeling & SQL',
    summary:
      'Normalization when it helps, indexes and query plans at a glance, migrations as code.',
    jump: 'project',
  },
  {
    id: 'fs-07',
    module: 'Module 4 · Data',
    title: 'Consistency, caching, and stale reads',
    summary:
      'Cache layers, invalidation strategies, and telling users the truth under load.',
    jump: 'explain',
  },
  {
    id: 'fs-08',
    module: 'Module 5 · TypeScript everywhere',
    title: 'Shared types across client and server',
    summary:
      'DTOs, zod (or similar) boundaries, and not lying across the wire.',
    jump: 'learn',
  },
  {
    id: 'fs-09',
    module: 'Module 6 · Reliability',
    title: 'Observability: logs, metrics, traces',
    summary:
      'Structured logging, correlation IDs, SLO thinking—debugging production without heroics.',
    jump: 'project',
  },
  {
    id: 'fs-10',
    module: 'Module 6 · Reliability',
    title: 'Security mindset (OWASP-aware)',
    summary:
      'Injection, XSS, SSRF at architecture level: prevention patterns your team can adopt.',
    jump: 'mentor',
  },
  {
    id: 'fs-11',
    module: 'Module 7 · Delivery',
    title: 'CI/CD, environments, and config',
    summary:
      'Preview deploys, secrets, rollbacks, and feature flags with adult supervision.',
    jump: 'project',
  },
  {
    id: 'fs-12',
    module: 'Module 8 · Collaboration',
    title: 'Working across frontend, platform, and product',
    summary:
      'RFCs, ADRs, and communication that keeps systems coherent—staff-level collaboration.',
    jump: 'notes',
  },
  {
    id: 'fs-13',
    module: 'Capstone',
    title: 'Ship an API + client slice',
    summary:
      'One vertical feature: schema, API, UI consumption, tests, and a launch checklist.',
    jump: 'build',
  },
];

/** Svelte Specialist — modern Svelte / SvelteKit. */
const svelteLessons: CurriculumLesson[] = [
  {
    id: 'sv-01',
    module: 'Module 1 · Foundations',
    title: 'Web platform primer for Svelte devs',
    summary:
      'What the browser guarantees, how modules load, and where Svelte fits in the pipeline.',
    jump: 'learn',
  },
  {
    id: 'sv-02',
    module: 'Module 2 · Svelte 5',
    title: 'Runes: $state, $derived, $effect',
    summary:
      'Fine-grained reactivity without the old stores-first reflex—mental model and migration intuition.',
    jump: 'learn',
  },
  {
    id: 'sv-03',
    module: 'Module 2 · Svelte 5',
    title: 'Components, props, and snippets',
    summary:
      'Composition patterns, slot/snippet ergonomics, and boundaries that stay readable at scale.',
    jump: 'tryIt',
  },
  {
    id: 'sv-04',
    module: 'Module 3 · Styling',
    title: 'Scoped styles & global design tokens',
    summary:
      'Component CSS, :global when unavoidable, and tokens that play with your design system.',
    jump: 'tryIt',
  },
  {
    id: 'sv-05',
    module: 'Module 4 · SvelteKit',
    title: 'Project structure and adapters',
    summary:
      'What SvelteKit owns vs what you own; choosing an adapter for your hosting story.',
    jump: 'learn',
  },
  {
    id: 'sv-06',
    module: 'Module 4 · SvelteKit',
    title: 'Routing: layouts, pages, and errors',
    summary:
      'Nested layouts, error boundaries, and predictable navigation UX.',
    jump: 'build',
  },
  {
    id: 'sv-07',
    module: 'Module 5 · Data loading',
    title: 'load, form actions, and progressive enhancement',
    summary:
      'Server-first data, optimistic UI with care, and forms that work before JS.',
    jump: 'project',
  },
  {
    id: 'sv-08',
    module: 'Module 5 · Data loading',
    title: 'API routes and webhooks',
    summary:
      'When +server wins, streaming responses, and safe handling of secrets.',
    jump: 'project',
  },
  {
    id: 'sv-09',
    module: 'Module 6 · Quality',
    title: 'Testing Svelte components and routes',
    summary:
      'Vitest/Playwright patterns that catch real regressions—not only snapshots.',
    jump: 'review',
  },
  {
    id: 'sv-10',
    module: 'Module 6 · Quality',
    title: 'Performance: SSR, CSR, and hydration',
    summary:
      'What ships to the client, bundle size discipline, and measuring INP in Kit apps.',
    jump: 'learn',
  },
  {
    id: 'sv-11',
    module: 'Module 7 · A11y & UX',
    title: 'Accessibility and focus in SPA-like flows',
    summary:
      'Focus management, announcements, and keyboard flows that survive client navigations.',
    jump: 'learn',
  },
  {
    id: 'sv-12',
    module: 'Module 8 · Shipping',
    title: 'Deploy, monitor, iterate',
    summary:
      'Env-specific config, logging, and rollback-friendly releases.',
    jump: 'project',
  },
  {
    id: 'sv-13',
    module: 'Capstone',
    title: 'Ship a SvelteKit feature slice',
    summary:
      'Auth-aware route, load + action, styled UI, and a short architecture note (ADR-style).',
    jump: 'build',
  },
];

/** UI Engineer — design systems. */
const uiLessons: CurriculumLesson[] = [
  {
    id: 'ui-01',
    module: 'Module 1 · Systems thinking',
    title: 'What a design system is (and is not)',
    summary:
      'Products vs libraries, adoption vs enforcement, and metrics that prove value.',
    jump: 'learn',
  },
  {
    id: 'ui-02',
    module: 'Module 2 · Tokens',
    title: 'Design tokens: color, space, type, radii',
    summary:
      'Naming, scales, and mapping Figma variables to CSS custom properties your engineers trust.',
    jump: 'tryIt',
  },
  {
    id: 'ui-03',
    module: 'Module 2 · Tokens',
    title: 'Theming: light, dark, contrast, brand',
    summary:
      'Semantic tokens, prefers-color-scheme, and high-contrast modes without one-off hacks.',
    jump: 'tryIt',
  },
  {
    id: 'ui-04',
    module: 'Module 3 · Components',
    title: 'Atomic habits: primitives to patterns',
    summary:
      'When to split atoms/molecules vs over-engineering; composition over configuration.',
    jump: 'explain',
  },
  {
    id: 'ui-05',
    module: 'Module 3 · Components',
    title: 'Documentation that engineers use',
    summary:
      'Storybook (or equivalent) patterns: args, a11y checks, and “when to use” guidance.',
    jump: 'learn',
  },
  {
    id: 'ui-06',
    module: 'Module 4 · Motion',
    title: 'Motion systems and reduced motion',
    summary:
      'Duration/easing tokens, choreography, and prefers-reduced-motion as a first-class citizen.',
    jump: 'learn',
  },
  {
    id: 'ui-07',
    module: 'Module 5 · Accessibility',
    title: 'System-level accessibility',
    summary:
      'Focus rings, hit targets, form patterns, and baking WCAG into components—not auditing after.',
    jump: 'learn',
  },
  {
    id: 'ui-08',
    module: 'Module 6 · Governance',
    title: 'Versioning, contribution, and deprecation',
    summary:
      'RFCs for breaking changes, codemods mindset, and communicating upgrades to product teams.',
    jump: 'notes',
  },
  {
    id: 'ui-09',
    module: 'Module 7 · Cross-stack',
    title: 'Tokens and components across frameworks',
    summary:
      'Style Dictionary–class thinking: same tokens powering React, Svelte, and static HTML.',
    jump: 'project',
  },
  {
    id: 'ui-10',
    module: 'Module 8 · Measurement',
    title: 'Adoption, quality, and design debt',
    summary:
      'Linting, usage analytics (privacy-safe), and prioritizing system work like a product.',
    jump: 'dashboard',
  },
  {
    id: 'ui-11',
    module: 'Capstone',
    title: 'Propose and ship one system improvement',
    summary:
      'From audit → RFC → implementation → docs: the PE7-shaped contribution loop.',
    jump: 'build',
  },
];

/** Principal · HTML/CSS (L7) — platform CSS & semantics (2026-oriented track). */
const principalLessons: CurriculumLesson[] = [
  {
    id: 'pe-01',
    module: 'Module 1 · HTML platform',
    title: 'Living HTML: semantics as an interoperability contract',
    summary:
      'Landmarks, headings, and media elements—what parsers and AT actually consume.',
    jump: 'learn',
  },
  {
    id: 'pe-02',
    module: 'Module 1 · HTML platform',
    title: 'Forms: validation, errors, and inclusive defaults',
    summary:
      'Native validation, error association, and patterns that survive touch + keyboard + AT.',
    jump: 'learn',
  },
  {
    id: 'pe-03',
    module: 'Module 2 · Cascade architecture',
    title: '@layer and predictable override graphs',
    summary:
      'Ordering reset → tokens → components → utilities; killing specificity wars with intent.',
    jump: 'learn',
  },
  {
    id: 'pe-04',
    module: 'Module 2 · Cascade architecture',
    title: '@scope, proximity, and component boundaries',
    summary:
      'Donut scoping, when scope beats BEM, and team conventions that scale.',
    jump: 'explain',
  },
  {
    id: 'pe-05',
    module: 'Module 3 · Layout engine',
    title: 'Grid intrinsics: minmax, fit-content, subgrid',
    summary:
      '2D layout for real products; subgrid for shared track lines; Baseline-check before you commit.',
    jump: 'tryIt',
  },
  {
    id: 'pe-06',
    module: 'Module 3 · Layout engine',
    title: 'Container queries and containment',
    summary:
      'container-type, @container, and performance-aware containment patterns.',
    jump: 'tryIt',
  },
  {
    id: 'pe-07',
    module: 'Module 4 · Color & type',
    title: 'OKLCH, color-mix, and wide-gamut tokens',
    summary:
      'Perceptual palettes, contrast under dark mode, and relative color syntax for themes.',
    jump: 'tryIt',
  },
  {
    id: 'pe-08',
    module: 'Module 4 · Color & type',
    title: 'Typography: variable fonts and readability',
    summary:
      'font-variation-settings with restraint; text-wrap: balance/pretty; internationalization hooks.',
    jump: 'learn',
  },
  {
    id: 'pe-09',
    module: 'Module 5 · Motion & scroll',
    title: 'Scroll-driven animation & @starting-style',
    summary:
      'Where supported: timeline scroll(); entry transitions; always respect prefers-reduced-motion.',
    jump: 'learn',
  },
  {
    id: 'pe-10',
    module: 'Module 5 · Motion & scroll',
    title: 'View Transitions: same-doc and cross-doc',
    summary:
      'User-agent choreography, accessibility caveats, and progressive enhancement.',
    jump: 'learn',
  },
  {
    id: 'pe-11',
    module: 'Module 6 · Overlays',
    title: 'Anchor positioning & popover top-layer',
    summary:
      'anchor(), inset-area, popover + :popover-open; stacking vs dialog semantics.',
    jump: 'tryIt',
  },
  {
    id: 'pe-12',
    module: 'Module 7 · Delivery',
    title: 'Interop: Baseline, @supports, and honest fallbacks',
    summary:
      'Feature queries, layered caps, and explaining risk to product and legal.',
    jump: 'explain',
  },
  {
    id: 'pe-13',
    module: 'Module 7 · Delivery',
    title: 'CSS delivery: critical CSS, caching, HTTP/3 intuition',
    summary:
      'What actually blocks first paint; cache lifetimes; bundler output you defend in review.',
    jump: 'project',
  },
  {
    id: 'pe-14',
    module: 'Capstone',
    title: 'Ship a resilient CSS architecture slice',
    summary:
      'Tokens + layers + one complex layout (grid + container queries) + written tradeoff note.',
    jump: 'build',
  },
];

const byRole: Record<RoleId, CurriculumLesson[]> = {
  frontend: frontendLessons,
  fullstack: fullstackLessons,
  svelte: svelteLessons,
  ui: uiLessons,
  principal: principalLessons,
};

export function getCurriculumForRole(roleId: string): CurriculumRoadmapRow[] {
  const key = roleId as RoleId;
  const lessons = byRole[key];
  if (!lessons) return rowsFromLessons(frontendLessons);
  return rowsFromLessons(lessons);
}

export function getLessonCountForRole(roleId: string): number {
  const key = roleId as RoleId;
  return byRole[key]?.length ?? frontendLessons.length;
}
