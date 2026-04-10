/**
 * Principal Engineer (L7) — HTML & CSS mastery track.
 * Scope: modern platform HTML + CSS through early 2026 (specs & browser support evolve—verify in Baseline / MDN).
 */
export type TrackPhase = {
  id: string;
  title: string;
  summary: string;
  topics: string[];
};

export const PRINCIPAL_HTML_CSS_TRACK_ID = 'principal-html-css-l7';

export const principalHtmlCssPhases: TrackPhase[] = [
  {
    id: 'html-living-a11y',
    title: 'HTML living standard & accessibility',
    summary: 'Semantics, landmarks, forms, media, and WCAG-aligned patterns.',
    topics: [
      'Landmarks (main, nav, header, footer) and heading outline',
      'Forms: implicit/explicit labels, error association, native validation',
      'Focus management, skip links, :focus-visible vs :focus',
      'ARIA only when HTML is insufficient; live regions basics',
    ],
  },
  {
    id: 'css-cascade-layers-scope',
    title: 'Cascade, @layer, and @scope',
    summary: 'Predictable overrides for large apps and design systems.',
    topics: [
      '@layer ordering (reset, tokens, components, utilities)',
      '@scope proximity and donut scoping for component CSS',
      'Specificity, :where() / :is(), and zero-specificity resets',
    ],
  },
  {
    id: 'layout-grid-subgrid-masonry',
    title: 'Grid, subgrid, and layout evolution',
    summary: '2D layout, alignment, and subgrid for nested structure.',
    topics: [
      'grid-template-areas, minmax(), fit-content(), intrinsic sizing',
      'Subgrid for rows/columns aligned across nested grids',
      'Masonry-style tracks (where supported) vs grid fallback patterns',
    ],
  },
  {
    id: 'container-queries',
    title: 'Container queries & containment',
    summary: 'Component-driven responsive design independent of viewport.',
    topics: [
      'container-type: inline-size / size; @container rules',
      'contain, content-visibility, and performance tradeoffs',
    ],
  },
  {
    id: 'color-typography-2026',
    title: 'Color spaces, typography, and rendering',
    summary: 'Wide-gamut–ready tokens and modern font features.',
    topics: [
      'OKLCH / LCH, color-mix(), relative color syntax',
      'system-ui font stacks, variable fonts, font-variation-settings',
      'text-wrap: balance / pretty; hyphenation and readability',
    ],
  },
  {
    id: 'motion-scroll-2026',
    title: 'Motion, scroll, and view transitions',
    summary: 'Purposeful animation with accessibility in mind.',
    topics: [
      'Scroll-driven animations (animation-timeline: scroll()) where available',
      '@starting-style and entry transitions; prefers-reduced-motion',
      'View Transitions API (cross-document and same-document patterns)',
    ],
  },
  {
    id: 'anchor-positioning',
    title: 'Anchor positioning & popovers',
    summary: 'Tooltips, menus, and overlays tied to anchors.',
    topics: [
      'position-anchor, anchor(), inset-area; popover + :popover-open',
      'Stacking contexts vs top-layer (dialog, popover)',
    ],
  },
  {
    id: 'interop-real-world',
    title: 'Interop, progressive enhancement, delivery',
    summary: 'How Principal-level ICs ship resilient UI.',
    topics: [
      'Baseline / MDN as source of truth; feature queries and fallbacks',
      'Critical CSS, HTTP caching, and modern bundling assumptions',
      'Design tokens in CSS (custom properties) across themes',
    ],
  },
];
