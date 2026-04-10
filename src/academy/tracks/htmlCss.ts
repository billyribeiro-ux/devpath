import type { AcademyTrack } from '../types';

/**
 * HTML + CSS: CSS from zero through modern layout.
 * 20 lessons, PE7 voice. Uses inline <style> blocks in starterHtml.
 */
export const htmlCssTrack: AcademyTrack = {
  id: 'html-css',
  menuLabel: 'HTML + CSS',
  menuDescription: 'CSS from zero — cascade, box model, flexbox, grid, responsive · 20 lessons',
  dialogTitle: 'Academy · HTML + CSS',
  lessons: [
    /* ------------------------------------------------------------------ */
    /*  M1 · Intro (1-2)                                                  */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-01-what-is-css',
      shortTitle: '1 · What is CSS',
      title: 'Selectors, properties, values — the three building blocks',
      blocks: [
        {
          type: 'p',
          text: 'CSS (Cascading Style Sheets) controls how HTML elements look: colors, spacing, typography, layout. A CSS rule has three parts — a selector that targets elements, a property that names what you are changing, and a value that sets the new state. Every visual decision on the web starts with these three pieces.',
        },
        {
          type: 'h3',
          text: 'Anatomy of a rule',
        },
        {
          type: 'ul',
          items: [
            'Selector — which elements: h1, .card, #hero, [type="email"].',
            'Property — what to change: color, font-size, margin, display.',
            'Value — the setting: red, 1.5rem, 0 auto, flex.',
            'Declaration — one property: value pair inside the curly braces.',
            'Rule (rule set) — selector + declaration block: h1 { color: navy; }',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 note',
          text: 'CSS is not "making things pretty." It controls visual communication — hierarchy, grouping, feedback, responsiveness. A principal treats CSS as engineering: systematic, predictable, maintainable.',
        },
      ],
      exercise:
        'The page has no styles. Add a <style> block in the head. Set the body font to a sans-serif stack. Change the h1 color to navy. Add a bottom border to the h1.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>What is CSS</title>
</head>
<body>
  <h1>Hello CSS</h1>
  <p>This page has no styles yet. Time to add some.</p>
  <p>CSS turns structure into visual communication.</p>
</body>
</html>`,
    },
    {
      id: 'css-02-three-ways',
      shortTitle: '2 · CSS delivery',
      title: 'Inline, internal, external — how CSS reaches the page',
      blocks: [
        {
          type: 'p',
          text: 'There are three ways to apply CSS: inline styles (the style attribute), an internal stylesheet (a <style> element in <head>), and an external stylesheet (a <link> to a .css file). Each has different scope, specificity weight, and maintenance characteristics.',
        },
        {
          type: 'h3',
          text: 'When to use which',
        },
        {
          type: 'ul',
          items: [
            'Inline (style="…") — highest specificity, hardest to maintain. Use only for truly dynamic one-off values set by JavaScript.',
            'Internal (<style>) — scoped to the page. Good for single-page demos, emails, or critical CSS inlining.',
            'External (<link rel="stylesheet">) — the default for production. Separates concerns, is cached by the browser, shared across pages.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 practice',
          text: 'In our academy exercises, we use <style> blocks inside the HTML because each lesson is self-contained. In production, external stylesheets are the standard. Inline styles should be rare and intentional.',
        },
      ],
      exercise:
        'The starter uses inline styles on every element. Move all styles to an internal <style> block using appropriate selectors. Remove all style attributes.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSS delivery</title>
</head>
<body>
  <h1 style="color: #1a1a2e; font-family: Georgia, serif;">CSS delivery methods</h1>
  <p style="color: #333; line-height: 1.6; font-family: system-ui, sans-serif;">Inline styles are hard to maintain.</p>
  <p style="color: #333; line-height: 1.6; font-family: system-ui, sans-serif;">Move these to a style block.</p>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M2 · Cascade (3-4)                                                */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-03-cascade',
      shortTitle: '3 · The cascade',
      title: 'Origin, specificity, source order — who wins',
      blocks: [
        {
          type: 'p',
          text: 'When multiple CSS rules target the same element, the cascade determines which one wins. It is not random — it follows a precise algorithm: origin (user-agent, author, user), specificity (how targeted the selector is), and source order (later wins when specificity ties).',
        },
        {
          type: 'h3',
          text: 'Specificity scoring',
        },
        {
          type: 'ul',
          items: [
            'Inline styles: 1,0,0,0 — highest (rarely use).',
            'IDs: 0,1,0,0 — #hero beats any number of classes.',
            'Classes, attributes, pseudo-classes: 0,0,1,0 — .card, [type="text"], :hover.',
            'Elements, pseudo-elements: 0,0,0,1 — h1, p, ::before.',
            'Universal (*) and combinators (+, >, ~) add no specificity.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 habit',
          text: 'Keep specificity flat. Prefer classes over IDs for styling. Avoid nesting selectors deeply (.sidebar .nav .list .item .link — that is 5 classes of specificity). The flatter your specificity, the easier your CSS is to override and maintain.',
        },
      ],
      exercise:
        'The heading is blue from a class, red from an ID, and green from a type selector. Predict which wins without running, then verify. Add a comment in the style block explaining why. Then remove the ID rule and make the class rule win over the element rule.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>The cascade</title>
  <style>
    h1 {
      color: green;
    }

    .title {
      color: blue;
    }

    #main-title {
      color: red;
    }
  </style>
</head>
<body>
  <h1 id="main-title" class="title">What color am I?</h1>
  <p>Specificity decides: element &lt; class &lt; id &lt; inline.</p>
</body>
</html>`,
    },
    {
      id: 'css-04-inheritance',
      shortTitle: '4 · Inheritance',
      title: 'Which properties inherit and how to control them',
      blocks: [
        {
          type: 'p',
          text: 'Some CSS properties pass from parent to child automatically — this is inheritance. Text properties (color, font-family, font-size, line-height, letter-spacing) generally inherit. Box properties (margin, padding, border, width, background) do not. Understanding this prevents redundant rules.',
        },
        {
          type: 'h3',
          text: 'Control keywords',
        },
        {
          type: 'ul',
          items: [
            'inherit — force a property to take the parent\'s value (even if it would not normally inherit).',
            'initial — reset to the CSS spec\'s default value for that property.',
            'unset — inherit if the property normally inherits; otherwise initial.',
            'revert — roll back to the user-agent stylesheet value (useful for resetting overrides).',
          ],
        },
        {
          type: 'callout',
          title: 'Why this matters at scale',
          text: 'In a large codebase, inheritance bugs cascade (pun intended). A color set on body affects every text element. If you then set color on a component, its children inherit the component color, not body. Understanding the chain prevents "why is this text the wrong color?" bugs.',
        },
      ],
      exercise:
        'Set a font-family and color on the body. Notice how the heading and paragraphs inherit them. Then set a different color on the .card div — see how its children inherit the card color. Use inherit on the link to pick up the card\'s color instead of the default blue.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Inheritance</title>
  <style>
    /* Add your styles here */
  </style>
</head>
<body>
  <h1>Inheritance</h1>
  <p>This text inherits styles from body.</p>
  <div class="card">
    <h2>Card title</h2>
    <p>Card content inherits from the card div.</p>
    <a href="#">Learn more</a>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M3 · Box model (5-7)                                              */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-05-box-model',
      shortTitle: '5 · Box model',
      title: 'Content, padding, border, margin — every element is a box',
      blocks: [
        {
          type: 'p',
          text: 'Every element in CSS generates a rectangular box. That box has four layers from inside out: content (your text or image), padding (space between content and border), border (the visible edge), and margin (space outside the border, between this element and others).',
        },
        {
          type: 'h3',
          text: 'The layers',
        },
        {
          type: 'ul',
          items: [
            'Content — the element\'s text or child elements. Sized by width/height.',
            'Padding — inner spacing. Background color fills into padding.',
            'Border — visible edge. Has width, style (solid, dashed), and color.',
            'Margin — outer spacing. Transparent. Adjacent vertical margins collapse (the larger wins).',
          ],
        },
        {
          type: 'callout',
          title: 'box-sizing: border-box',
          text: 'By default (content-box), width sets the content width — padding and border are added on top. With border-box, width includes padding and border. Every modern project starts with * { box-sizing: border-box; } because it makes sizing intuitive.',
        },
      ],
      exercise:
        'Add box-sizing: border-box to the universal selector. Style the .card with padding, a border, and margin. Set a width and notice how border-box keeps it predictable. Add margin between the two cards and observe margin collapsing.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Box model</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      color: #1a1a2e;
    }
  </style>
</head>
<body>
  <h1>Box model</h1>
  <div class="card">
    <h2>Card one</h2>
    <p>Content sits inside the box.</p>
  </div>
  <div class="card">
    <h2>Card two</h2>
    <p>Margin separates boxes from each other.</p>
  </div>
</body>
</html>`,
    },
    {
      id: 'css-06-display',
      shortTitle: '6 · Display',
      title: 'block, inline, inline-block, none — fundamental layout modes',
      blocks: [
        {
          type: 'p',
          text: 'The display property determines how an element participates in layout. Block elements stack vertically and take full width. Inline elements flow with text and ignore width/height. Inline-block flows with text but respects width/height. None removes the element from layout entirely.',
        },
        {
          type: 'h3',
          text: 'The four classic values',
        },
        {
          type: 'ul',
          items: [
            'block — div, p, h1-h6, section. Full width, vertical stacking.',
            'inline — span, a, strong, em. Flows with text. width/height have no effect.',
            'inline-block — like inline but respects width, height, vertical margin/padding.',
            'none — element is removed from the DOM layout (not painted, not accessible). Use visibility:hidden to hide visually but keep in layout.',
          ],
        },
        {
          type: 'callout',
          title: 'Accessibility of display:none',
          text: 'display:none removes the element from the accessibility tree — screen readers will not announce it. If you need to hide visually but keep it for screen readers, use a "visually hidden" utility class (clip, position:absolute, overflow:hidden).',
        },
      ],
      exercise:
        'Make the inline links display as inline-block so you can add padding and a background color. Give the .badge spans display:inline-block with a fixed width. Hide the .secret element using display:none.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Display</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1rem; }
  </style>
</head>
<body>
  <h1>Display property</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/learn">Learn</a>
    <a href="/build">Build</a>
  </nav>
  <p>Status: <span class="badge">Active</span> <span class="badge">Pro</span></p>
  <p class="secret">This text should be hidden.</p>
  <p>This text remains visible.</p>
</body>
</html>`,
    },
    {
      id: 'css-07-sizing',
      shortTitle: '7 · Sizing',
      title: 'Width, height, min/max — sizing without overflow',
      blocks: [
        {
          type: 'p',
          text: 'Fixed width and height can cause overflow when content does not fit. In responsive design, you rarely set a fixed height. Instead, you set constraints: min-width, max-width, min-height. This lets the element adapt while staying within bounds.',
        },
        {
          type: 'h3',
          text: 'Sizing strategies',
        },
        {
          type: 'ul',
          items: [
            'width: 100% — fill the parent. Combine with max-width for a readable line length.',
            'max-width: 65ch — a comfortable reading line length (~65 characters).',
            'min-height: 100vh — at least the full viewport height (useful for page layouts).',
            'Never set a fixed height on text containers — content grows, and overflow hides it.',
            'overflow: auto — adds scrollbars only when content overflows.',
          ],
        },
        {
          type: 'callout',
          title: 'The ch unit',
          text: 'ch is the width of the "0" character in the current font. max-width: 65ch creates a line that is comfortable to read regardless of font size. This is a PE7 touch that improves readability without media queries.',
        },
      ],
      exercise:
        'Set max-width: 65ch on the .prose container and center it with margin: 0 auto. Give the .hero section a min-height of 50vh. Add overflow: auto to the .code-block so long lines scroll instead of breaking layout.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sizing</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Sizing in CSS</h1>
    <p>Use constraints, not fixed dimensions.</p>
  </section>
  <div class="prose">
    <h2>Why max-width matters</h2>
    <p>Lines that stretch across the full viewport are hard to read. The optimal line length is 50–75 characters. Setting max-width on a text container solves this.</p>
    <pre class="code-block"><code>const reallyLongVariableName = calculateSomethingComplex(inputDataFromTheRemoteServiceEndpoint, configurationOptions);</code></pre>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M4 · Color and type (8-10)                                        */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-08-colors',
      shortTitle: '8 · Colors',
      title: 'Hex, RGB, HSL, and the currentColor keyword',
      blocks: [
        {
          type: 'p',
          text: 'CSS supports multiple color formats. Hex (#1a1a2e) is compact. RGB (rgb(26, 26, 46)) is intuitive for mixing. HSL (hsl(240, 28%, 14%)) is the most human-friendly because you can reason about hue, saturation, and lightness independently — making it easy to create palettes.',
        },
        {
          type: 'h3',
          text: 'Color formats',
        },
        {
          type: 'ul',
          items: [
            'Hex: #rrggbb or shorthand #rgb. Add alpha with #rrggbbaa.',
            'RGB: rgb(0-255, 0-255, 0-255). Alpha: rgba(…, 0-1) or rgb(… / 0.5).',
            'HSL: hsl(hue 0-360, saturation 0-100%, lightness 0-100%). The PE7 choice for palettes.',
            'currentColor — inherits the element\'s computed color value. Useful for borders and SVG fills.',
            'Named colors: red, navy, tomato — fine for prototyping, too imprecise for production.',
          ],
        },
        {
          type: 'callout',
          title: 'HSL for palette design',
          text: 'To build a color palette with HSL: pick a hue (e.g., 220 for blue). Create variants by changing lightness (light: 90%, medium: 50%, dark: 20%) and reducing saturation for muted tones. This systematic approach is how design systems work.',
        },
      ],
      exercise:
        'Replace the named colors with HSL values. Create a cohesive palette: pick one hue and create light, medium, and dark variants by changing lightness. Use currentColor for the card border.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Colors</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif;
      background: white;
      color: black;
      padding: 2rem;
    }
    h1 { color: blue; }
    .card {
      background: lightblue;
      border: 2px solid blue;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    .card h2 { color: darkblue; }
    a { color: blue; }
  </style>
</head>
<body>
  <h1>Color palette</h1>
  <div class="card">
    <h2>Featured course</h2>
    <p>Learn CSS colors, from hex to HSL.</p>
    <a href="#">Start learning</a>
  </div>
</body>
</html>`,
    },
    {
      id: 'css-09-fonts',
      shortTitle: '9 · Fonts',
      title: 'Font family, size, weight, and the system font stack',
      blocks: [
        {
          type: 'p',
          text: 'Typography is the largest contributor to a page\'s visual character. CSS gives you control over the font face, size, weight, and style. The key engineering decision is the font stack — the fallback chain the browser follows when a font is unavailable.',
        },
        {
          type: 'h3',
          text: 'Font properties',
        },
        {
          type: 'ul',
          items: [
            'font-family — a stack: "Inter", system-ui, -apple-system, sans-serif. First available wins.',
            'font-size — prefer rem (relative to root). 1rem = the root font size (usually 16px).',
            'font-weight — 100 (thin) to 900 (black). normal=400, bold=700. Variable fonts support any value.',
            'font-style — normal, italic, oblique.',
            'The system font stack: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif — uses each OS\'s native font.',
          ],
        },
        {
          type: 'callout',
          title: 'rem vs px vs em',
          text: 'rem scales with the user\'s browser font size preference. px ignores it. em is relative to the parent\'s font size (which cascades and can be confusing). PE7 rule: use rem for font-size, em for spacing that should scale with text size (padding on a button), px for borders and shadows.',
        },
      ],
      exercise:
        'Set the body to a system font stack with font-size: 1rem and line-height: 1.6. Style the h1 with font-size: 2.5rem and font-weight: 700. Make the .mono class use a monospace stack. Set small text to 0.875rem.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Fonts</title>
  <style>
    * { box-sizing: border-box; }
    body { padding: 2rem; }
  </style>
</head>
<body>
  <h1>Typography in CSS</h1>
  <p>Good typography makes content readable and establishes visual hierarchy.</p>
  <p>The system font stack uses each operating system's native font.</p>
  <p class="mono">const greeting = "Hello, world";</p>
  <p><small>Last updated: April 2026</small></p>
</body>
</html>`,
    },
    {
      id: 'css-10-text',
      shortTitle: '10 · Text properties',
      title: 'Line height, spacing, alignment, and wrapping',
      blocks: [
        {
          type: 'p',
          text: 'Beyond the font itself, CSS controls the spacing and flow of text. Line height affects readability, letter spacing affects density, text alignment affects scanning patterns, and word wrapping prevents overflow.',
        },
        {
          type: 'h3',
          text: 'Text properties',
        },
        {
          type: 'ul',
          items: [
            'line-height — the space between lines. Body text: 1.5–1.7. Headings: 1.1–1.3. Use unitless values.',
            'letter-spacing — space between characters. Subtle: 0.01em–0.05em. Avoid large values except for all-caps text.',
            'text-align — left (default for LTR), center, right, justify. Avoid justify for body text (creates uneven gaps).',
            'text-transform — uppercase, lowercase, capitalize. Use for stylistic display, not data.',
            'overflow-wrap: break-word — prevents long words (URLs) from breaking layout.',
            'text-wrap: balance — balances line lengths in headings (modern browsers).',
          ],
        },
        {
          type: 'callout',
          title: 'Unitless line-height',
          text: 'Always use unitless line-height (1.5 not 1.5em or 24px). A unitless value is a multiplier of the element\'s own font-size — it scales correctly when font-size changes. A fixed value can cause overlapping or excessive spacing.',
        },
      ],
      exercise:
        'Set line-height: 1.6 on the body. Give the heading a tighter line-height (1.2). Add letter-spacing: 0.1em and text-transform: uppercase to the .label class. Center-align the .hero section. Add overflow-wrap: break-word to the paragraph containing the URL.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Text properties</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 65ch; margin: 0 auto; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Text properties control readability</h1>
    <p class="label">Featured article</p>
  </section>
  <p>Good line height gives your text room to breathe. Too tight and lines blur together. Too loose and the eye loses its place.</p>
  <p>Visit our documentation at https://docs.devpath.dev/guides/very-long-path/that-might-overflow/the-container-on-small-screens for details.</p>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M5 · Units (11)                                                   */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-11-units',
      shortTitle: '11 · Units',
      title: 'px, em, rem, %, vw, vh — when to use each',
      blocks: [
        {
          type: 'p',
          text: 'CSS has many units but in practice you use a handful constantly. The choice between them is not arbitrary — each unit has properties that make it right for specific situations. Using the wrong unit creates scaling bugs, accessibility issues, or layout breakage.',
        },
        {
          type: 'h3',
          text: 'The unit guide',
        },
        {
          type: 'ul',
          items: [
            'rem — relative to root font-size. Use for font-size, spacing, media query breakpoints. Respects user preferences.',
            'em — relative to parent font-size. Use for component-internal spacing that scales with text (button padding).',
            'px — absolute. Use for borders, shadows, and values that should not scale.',
            '% — relative to the parent element. Use for fluid widths.',
            'vw / vh — viewport width/height. 100vw = full viewport width. Use for hero sections, full-bleed layouts.',
            'ch — width of "0". Use for max-width on text containers (65ch ≈ ideal reading width).',
          ],
        },
        {
          type: 'callout',
          title: 'The 100vh mobile trap',
          text: '100vh on mobile includes the address bar, which changes height as you scroll. Use 100dvh (dynamic viewport height) for full-height layouts that account for mobile browser chrome.',
        },
      ],
      exercise:
        'Refactor the starter to use appropriate units: rem for font sizes and spacing, px for the border, % for the card width, vw for the hero width, and ch for the prose max-width. Replace the px font-sizes.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSS units</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif;
      font-size: 16px;
      padding: 20px;
      margin: 0;
    }
    .hero {
      width: 960px;
      padding: 40px;
      background: hsl(220, 50%, 95%);
    }
    h1 { font-size: 36px; }
    p { font-size: 16px; line-height: 24px; }
    .card {
      width: 400px;
      padding: 20px;
      border: 1px solid hsl(220, 20%, 80%);
      border-radius: 8px;
      margin-top: 20px;
    }
    .prose { max-width: 700px; margin: 20px auto; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Understanding CSS units</h1>
    <p>Each unit has a purpose. Using the right one prevents scaling bugs.</p>
  </section>
  <div class="prose">
    <div class="card">
      <h2>rem vs px</h2>
      <p>rem respects user font-size preferences. px does not.</p>
    </div>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M6 · Backgrounds and borders (12)                                 */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-12-backgrounds',
      shortTitle: '12 · Backgrounds & borders',
      title: 'Gradients, radius, shadows — visual depth',
      blocks: [
        {
          type: 'p',
          text: 'Backgrounds, border-radius, and box-shadow add visual depth to elements. These properties are how you create cards, buttons, banners, and decorative surfaces. Understanding them prevents the "everything is a flat rectangle" problem.',
        },
        {
          type: 'h3',
          text: 'Key properties',
        },
        {
          type: 'ul',
          items: [
            'background shorthand: color, image, position, size, repeat — in one declaration.',
            'linear-gradient(direction, color-stops) — smooth color transitions. Great for subtle backgrounds.',
            'radial-gradient(shape, color-stops) — circular gradients from a center point.',
            'border-radius — rounds corners. Use 50% for circles, small values (4px–8px) for cards.',
            'box-shadow: x y blur spread color — elevation effect. Stack multiple shadows for depth.',
          ],
        },
        {
          type: 'callout',
          title: 'Subtle beats flashy',
          text: 'PE7 design taste: subtle gradients (a 5% lightness shift), small radii (8px), and soft shadows (0 2px 8px rgba(0,0,0,0.1)) communicate quality. Harsh shadows and neon gradients communicate "my first CSS project."',
        },
      ],
      exercise:
        'Add a subtle gradient background to the .hero section. Give the .card a border-radius and box-shadow for elevation. Create a .pill class with border-radius: 9999px for the tags. Add a subtle inset shadow to the input.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Backgrounds and borders</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; color: hsl(220, 25%, 15%); }
    .hero { padding: 3rem 2rem; }
    .card { padding: 1.5rem; margin: 1.5rem; border: 1px solid hsl(220, 20%, 85%); }
    .pill { display: inline-block; padding: 0.25rem 0.75rem; background: hsl(220, 50%, 93%); font-size: 0.875rem; margin: 0.25rem; }
    input { padding: 0.5rem; border: 1px solid hsl(220, 20%, 80%); width: 100%; margin-top: 0.5rem; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Visual depth with CSS</h1>
    <p>Subtle effects communicate quality.</p>
  </section>
  <div class="card">
    <h2>Tags</h2>
    <span class="pill">HTML</span>
    <span class="pill">CSS</span>
    <span class="pill">A11y</span>
    <h2>Search</h2>
    <input type="search" placeholder="Search courses…" aria-label="Search courses" />
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M7 · Position (13)                                                */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-13-position',
      shortTitle: '13 · Position',
      title: 'static, relative, absolute, fixed, sticky — and z-index',
      blocks: [
        {
          type: 'p',
          text: 'The position property controls how an element is placed relative to its normal flow position, its parent, or the viewport. Most elements are static (default). The other values let you layer elements, pin headers, or overlay content.',
        },
        {
          type: 'h3',
          text: 'Position values',
        },
        {
          type: 'ul',
          items: [
            'static — default. In normal flow. top/left/right/bottom have no effect.',
            'relative — stays in flow but can be offset with top/left. Creates a positioning context for absolute children.',
            'absolute — removed from flow. Positioned relative to the nearest positioned ancestor (not static).',
            'fixed — removed from flow. Positioned relative to the viewport. Stays during scroll.',
            'sticky — in flow until a scroll threshold, then becomes fixed. Great for table headers and nav bars.',
          ],
        },
        {
          type: 'callout',
          title: 'z-index and stacking contexts',
          text: 'z-index only works on positioned elements (not static). Each positioned element with a z-index creates a stacking context — children cannot escape their parent\'s stacking context. This is why "z-index: 9999" sometimes does not work. The fix is understanding stacking contexts, not adding bigger numbers.',
        },
      ],
      exercise:
        'Make the header sticky so it stays at the top when scrolling. Position the .badge absolutely inside the .card (make the card position:relative first). Add z-index to ensure the header stays above the cards.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Position</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; }
    .header { background: hsl(220, 25%, 15%); color: white; padding: 1rem 2rem; }
    .content { padding: 2rem; }
    .card { border: 1px solid hsl(220, 20%, 85%); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; }
    .badge { background: hsl(150, 60%, 45%); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
  </style>
</head>
<body>
  <header class="header">
    <strong>DevPath</strong> — Learning platform
  </header>
  <div class="content">
    <div class="card">
      <span class="badge">New</span>
      <h2>HTML Foundations</h2>
      <p>20 lessons from absolute zero.</p>
    </div>
    <div class="card">
      <h2>CSS Essentials</h2>
      <p>Box model, layout, responsive design.</p>
    </div>
    <div class="card">
      <h2>Accessibility</h2>
      <p>ARIA, landmarks, keyboard navigation.</p>
    </div>
    <div class="card">
      <h2>Performance</h2>
      <p>Core Web Vitals, lazy loading, font optimization.</p>
    </div>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M8 · Flexbox (14-15)                                              */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-14-flexbox',
      shortTitle: '14 · Flexbox basics',
      title: 'Main axis, cross axis, gap, and alignment',
      blocks: [
        {
          type: 'p',
          text: 'Flexbox is a one-dimensional layout system — it arranges items along a single axis (horizontal or vertical). Setting display: flex on a container makes its direct children flex items. Flex replaced float-based layouts and is now the go-to for navigation bars, card rows, centering, and any single-axis alignment.',
        },
        {
          type: 'h3',
          text: 'Core concepts',
        },
        {
          type: 'ul',
          items: [
            'display: flex — creates a flex container. Children become flex items.',
            'flex-direction: row (default) | column — sets the main axis.',
            'justify-content — distributes items along the main axis: flex-start, center, space-between, space-evenly.',
            'align-items — aligns items on the cross axis: stretch (default), center, flex-start, flex-end.',
            'gap — space between items. Replaces the old margin-right-on-all-but-last hack.',
          ],
        },
        {
          type: 'callout',
          title: 'Centering with flex',
          text: 'The famous CSS centering problem is solved with three properties: display: flex; justify-content: center; align-items: center; Add min-height: 100vh if you want to center in the viewport. This pattern should be muscle memory.',
        },
      ],
      exercise:
        'Make the .nav a flex container with space-between alignment and a gap. Center the .hero content vertically and horizontally using flex. Make the .cards container flex with wrapping enabled.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Flexbox basics</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; }
    .nav { background: hsl(220, 25%, 15%); color: white; padding: 1rem 2rem; }
    .nav a { color: hsl(220, 80%, 80%); text-decoration: none; }
    .hero { background: hsl(220, 50%, 95%); padding: 2rem; min-height: 40vh; }
    .cards { padding: 2rem; }
    .card { border: 1px solid hsl(220, 20%, 85%); padding: 1.5rem; border-radius: 8px; width: 280px; }
  </style>
</head>
<body>
  <nav class="nav">
    <strong>DevPath</strong>
    <a href="/learn">Learn</a>
    <a href="/build">Build</a>
    <a href="/about">About</a>
  </nav>
  <section class="hero">
    <h1>Learn CSS layout</h1>
    <p>Flexbox makes alignment intuitive.</p>
  </section>
  <div class="cards">
    <div class="card">
      <h2>Card 1</h2>
      <p>Content here.</p>
    </div>
    <div class="card">
      <h2>Card 2</h2>
      <p>Content here.</p>
    </div>
    <div class="card">
      <h2>Card 3</h2>
      <p>Content here.</p>
    </div>
  </div>
</body>
</html>`,
    },
    {
      id: 'css-15-flex-items',
      shortTitle: '15 · Flex items',
      title: 'flex-grow, flex-shrink, flex-basis — controlling item behavior',
      blocks: [
        {
          type: 'p',
          text: 'While the flex container controls the overall layout, flex item properties control how each child grows, shrinks, and sizes itself within the available space. The flex shorthand (flex: grow shrink basis) is how experienced developers express item behavior in one declaration.',
        },
        {
          type: 'h3',
          text: 'Item properties',
        },
        {
          type: 'ul',
          items: [
            'flex-grow — how much extra space the item takes (0 = none, 1 = take proportional share).',
            'flex-shrink — how much the item shrinks when space is tight (0 = never shrink).',
            'flex-basis — the starting size before grow/shrink. Often used instead of width in flex contexts.',
            'flex: 1 — shorthand for flex: 1 1 0%. Item grows and shrinks equally.',
            'flex: none — shorthand for flex: 0 0 auto. Item stays its natural size.',
            'align-self — override align-items for one item (center, flex-end, stretch).',
          ],
        },
        {
          type: 'callout',
          title: 'flex-basis vs width',
          text: 'In a flex context, use flex-basis instead of width. flex-basis respects the main axis direction (it becomes height in a column layout). width always means horizontal, which breaks when you change flex-direction.',
        },
      ],
      exercise:
        'Make the sidebar fixed-width (250px flex-basis, no shrink) and the main content flex: 1 to fill remaining space. Give each card in the footer flex: 1 so they share space equally. Use align-self: center on the logo.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Flex items</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; }
    .layout { display: flex; min-height: 80vh; }
    .sidebar { background: hsl(220, 25%, 95%); padding: 1.5rem; }
    .main { padding: 1.5rem; }
    .header { display: flex; background: hsl(220, 25%, 15%); color: white; padding: 1rem 2rem; gap: 1rem; }
    .logo { font-size: 1.5rem; font-weight: 700; }
    .footer-cards { display: flex; gap: 1rem; padding: 1.5rem; background: hsl(220, 25%, 95%); }
    .fcard { padding: 1rem; background: white; border-radius: 8px; }
  </style>
</head>
<body>
  <header class="header">
    <span class="logo">DevPath</span>
    <p>Your learning platform</p>
  </header>
  <div class="layout">
    <aside class="sidebar">
      <h2>Navigation</h2>
      <p>Sidebar content</p>
    </aside>
    <main class="main">
      <h1>Dashboard</h1>
      <p>Main content fills the remaining space.</p>
    </main>
  </div>
  <div class="footer-cards">
    <div class="fcard"><h3>HTML</h3><p>20 lessons</p></div>
    <div class="fcard"><h3>CSS</h3><p>20 lessons</p></div>
    <div class="fcard"><h3>A11y</h3><p>18 lessons</p></div>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M9 · Grid (16-17)                                                 */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-16-grid-fundamentals',
      shortTitle: '16 · Grid fundamentals',
      title: 'Two-dimensional layout with CSS grid',
      blocks: [
        {
          type: 'p',
          text: 'CSS Grid is a two-dimensional layout system — it controls rows and columns simultaneously. While flexbox handles one axis at a time, grid handles both. Use grid for page layouts, card grids, dashboards, and any design where items align in both directions.',
        },
        {
          type: 'h3',
          text: 'Core grid properties',
        },
        {
          type: 'ul',
          items: [
            'display: grid — creates a grid container.',
            'grid-template-columns — defines column tracks: 1fr 1fr 1fr (three equal columns).',
            'grid-template-rows — defines row tracks (often implicit from content).',
            'fr — the fractional unit. 1fr 2fr means the second column is twice as wide as the first.',
            'gap — space between rows and columns. Same as in flexbox.',
            'Items automatically flow into the next cell. You can also place them explicitly.',
          ],
        },
        {
          type: 'callout',
          title: 'fr vs percentage',
          text: 'fr distributes available space after fixed and gap sizes are subtracted. % includes gaps in the calculation, which can cause overflow. Always prefer fr over % in grid layouts.',
        },
      ],
      exercise:
        'Create a 3-column card grid using grid-template-columns with fr units. Add gap for spacing. Make the .featured card span 2 columns using grid-column: span 2.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Grid fundamentals</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; padding: 2rem; }
    .grid { /* make this a grid */ }
    .card { padding: 1.5rem; border: 1px solid hsl(220, 20%, 85%); border-radius: 8px; }
    .featured { background: hsl(220, 50%, 95%); }
  </style>
</head>
<body>
  <h1>Course catalog</h1>
  <div class="grid">
    <div class="card featured">
      <h2>HTML Foundations</h2>
      <p>Start from absolute zero and build your first web pages.</p>
    </div>
    <div class="card">
      <h2>CSS Essentials</h2>
      <p>Box model, layout, responsive design.</p>
    </div>
    <div class="card">
      <h2>Accessibility</h2>
      <p>ARIA, landmarks, keyboard nav.</p>
    </div>
    <div class="card">
      <h2>Performance</h2>
      <p>Core Web Vitals and optimization.</p>
    </div>
    <div class="card">
      <h2>SEO</h2>
      <p>Meta, structured data, search.</p>
    </div>
  </div>
</body>
</html>`,
    },
    {
      id: 'css-17-grid-auto',
      shortTitle: '17 · Grid auto-fit',
      title: 'auto-fit, auto-fill, and minmax — responsive grids without media queries',
      blocks: [
        {
          type: 'p',
          text: 'The combination of auto-fit (or auto-fill) with minmax() creates grids that are responsive without a single media query. The browser creates as many columns as fit, each with a minimum and maximum size. This is one of the most powerful layout patterns in modern CSS.',
        },
        {
          type: 'h3',
          text: 'The pattern',
        },
        {
          type: 'ul',
          items: [
            'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) — fills columns that are at least 250px, expanding to share leftover space.',
            'auto-fit — empty tracks collapse to 0. Items stretch into remaining space.',
            'auto-fill — empty tracks keep their size. Space after the last item is preserved.',
            'minmax(min, max) — a track that is at least min and at most max.',
          ],
        },
        {
          type: 'p',
          text: 'This single line replaces what used to be 20+ lines of media queries and float-based grid systems. The grid adapts from 1 column on phones to 4+ columns on wide screens.',
        },
        {
          type: 'callout',
          title: 'PE7 pattern',
          text: 'The repeat(auto-fit, minmax(…)) pattern is the default for card grids in modern apps. If you see a card grid with media queries switching from 1 to 2 to 3 to 4 columns, replace it with this one-liner.',
        },
      ],
      exercise:
        'Replace the fixed 3-column grid with repeat(auto-fit, minmax(280px, 1fr)). Resize the preview pane to see the cards reflow responsively. Try changing auto-fit to auto-fill and notice the difference.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Grid auto-fit</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; padding: 2rem; }
    h1 { margin-bottom: 1.5rem; }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5rem;
    }
    .card {
      padding: 1.5rem;
      background: white;
      border: 1px solid hsl(220, 20%, 85%);
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .card h2 { margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <h1>Responsive grid</h1>
  <div class="grid">
    <div class="card"><h2>HTML</h2><p>Structure and semantics.</p></div>
    <div class="card"><h2>CSS</h2><p>Style and layout.</p></div>
    <div class="card"><h2>JavaScript</h2><p>Interactivity and logic.</p></div>
    <div class="card"><h2>React</h2><p>Component-based UI.</p></div>
    <div class="card"><h2>Node.js</h2><p>Server-side JavaScript.</p></div>
    <div class="card"><h2>Testing</h2><p>Quality assurance.</p></div>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M10 · Responsive (18)                                             */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-18-responsive',
      shortTitle: '18 · Responsive design',
      title: 'Media queries, mobile-first, and responsive patterns',
      blocks: [
        {
          type: 'p',
          text: 'Responsive design means your page works on every screen size — from a 320px phone to a 2560px ultra-wide. The strategy is mobile-first: start with styles for the smallest screen, then add complexity with media queries as space becomes available.',
        },
        {
          type: 'h3',
          text: 'Media query fundamentals',
        },
        {
          type: 'ul',
          items: [
            '@media (min-width: 640px) { … } — styles apply at 640px and above (mobile-first).',
            '@media (max-width: 639px) { … } — desktop-first (avoid; harder to maintain).',
            'Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl) — adjust for your design.',
            'Use rem for breakpoints: @media (min-width: 40rem) — scales with user font preferences.',
            '@media (prefers-color-scheme: dark) — detect user dark mode preference.',
          ],
        },
        {
          type: 'callout',
          title: 'Mobile-first is engineering, not philosophy',
          text: 'Mobile-first means your base CSS is the simple, single-column layout. Complexity (multi-column, larger spacing, bigger fonts) is additive. This produces smaller CSS for mobile devices (which need it most) and is easier to reason about than overriding desktop styles for mobile.',
        },
      ],
      exercise:
        'Refactor the layout to mobile-first: start with a single-column layout and the nav stacked. At 640px, switch to a side-by-side layout and a horizontal nav. At 1024px, increase the max-width of the content area.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Responsive design</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; }
    .nav {
      background: hsl(220, 25%, 15%);
      color: white;
      padding: 1rem;
    }
    .nav a { color: hsl(220, 80%, 80%); text-decoration: none; margin-right: 1rem; }
    .layout { padding: 1.5rem; }
    .sidebar { background: hsl(220, 25%, 95%); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
    .main { }
    .main h1 { margin-bottom: 1rem; }
    /* Add media queries here */
  </style>
</head>
<body>
  <nav class="nav">
    <strong>DevPath</strong>
    <a href="/">Home</a>
    <a href="/learn">Learn</a>
    <a href="/build">Build</a>
  </nav>
  <div class="layout">
    <aside class="sidebar">
      <h2>Tracks</h2>
      <p>HTML · CSS · JavaScript</p>
    </aside>
    <main class="main">
      <h1>Welcome</h1>
      <p>Resize the preview to see the layout adapt.</p>
      <p>Mobile-first means base styles are for small screens.</p>
    </main>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M11 · Modern (19-20)                                              */
    /* ------------------------------------------------------------------ */
    {
      id: 'css-19-custom-properties',
      shortTitle: '19 · Custom properties',
      title: 'CSS variables for theming and consistency',
      blocks: [
        {
          type: 'p',
          text: 'CSS custom properties (variables) let you define values once and reference them throughout your stylesheet. They cascade and can be overridden at any level, making them perfect for theming, component variants, and maintaining consistency.',
        },
        {
          type: 'h3',
          text: 'How they work',
        },
        {
          type: 'ul',
          items: [
            'Declare: --color-primary: hsl(220, 60%, 50%); in :root for global scope.',
            'Use: color: var(--color-primary);',
            'Fallback: var(--color-primary, navy) — uses navy if --color-primary is not defined.',
            'Override at any level: .dark-theme { --color-primary: hsl(220, 60%, 70%); }',
            'They cascade — children inherit values from parents.',
          ],
        },
        {
          type: 'callout',
          title: 'Theme switching',
          text: 'Define your color palette as custom properties on :root. For dark mode, override them inside @media (prefers-color-scheme: dark) or a .dark class. Every element using var(--color-bg) automatically updates. This is how every modern design system works.',
        },
      ],
      exercise:
        'Define a color palette using custom properties on :root (primary, background, text, card-bg, border). Apply them throughout the stylesheet. Then add a .dark-theme class that overrides the variables for dark mode. Apply that class to the html element to test.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Custom properties</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: hsl(220, 20%, 98%);
      color: hsl(220, 25%, 15%);
      padding: 2rem;
    }
    h1 { color: hsl(220, 60%, 50%); margin-bottom: 1rem; }
    .card {
      background: white;
      border: 1px solid hsl(220, 20%, 85%);
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .card h2 { color: hsl(220, 60%, 50%); }
    a { color: hsl(220, 60%, 50%); }
    .btn {
      display: inline-block;
      background: hsl(220, 60%, 50%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <h1>Design system colors</h1>
  <div class="card">
    <h2>HTML Foundations</h2>
    <p>Learn HTML from absolute zero.</p>
    <a href="#" class="btn">Start learning</a>
  </div>
  <div class="card">
    <h2>CSS Essentials</h2>
    <p>Box model through modern layout.</p>
    <a href="#" class="btn">Start learning</a>
  </div>
</body>
</html>`,
    },
    {
      id: 'css-20-pseudo',
      shortTitle: '20 · Pseudo-classes & elements',
      title: 'Styling states and generated content',
      blocks: [
        {
          type: 'p',
          text: 'Pseudo-classes target element states (:hover, :focus, :first-child). Pseudo-elements create virtual elements (::before, ::after, ::first-line). Together they let you style dynamic behavior and add decorative content without extra HTML.',
        },
        {
          type: 'h3',
          text: 'Essential pseudo-classes',
        },
        {
          type: 'ul',
          items: [
            ':hover — mouse over. Never the only way to reveal information (fails on touch).',
            ':focus — keyboard focus. Must have a visible indicator (outline). :focus-visible for keyboard-only focus.',
            ':first-child / :last-child — position-based. :nth-child(odd) for alternating rows.',
            ':not(.class) — negation. Exclude elements from a selector.',
            ':is(h1, h2, h3) — matches any in the list. Reduces selector repetition.',
          ],
        },
        {
          type: 'h3',
          text: 'Pseudo-elements',
        },
        {
          type: 'ul',
          items: [
            '::before / ::after — generated content. Must have content: "…"; Can be empty: content: "".',
            '::first-line / ::first-letter — style the first line or character of a text block.',
            '::placeholder — style the placeholder text in inputs (subtle, lower contrast).',
            '::selection — style highlighted text.',
          ],
        },
        {
          type: 'callout',
          title: 'Accessibility of pseudo-content',
          text: 'Content added with ::before and ::after may or may not be announced by screen readers (behavior varies). Never put critical information in pseudo-elements. Use them for decorative content only — icons, bullets, visual separators.',
        },
      ],
      exercise:
        'Add :hover and :focus-visible styles to the buttons and links. Use ::before on the .required label to add a red asterisk. Style odd table rows with :nth-child(odd). Add a ::after on external links to show an arrow indicator.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pseudo-classes and elements</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; padding: 2rem; color: hsl(220, 25%, 15%); }
    h1 { margin-bottom: 1.5rem; }
    .btn {
      display: inline-block;
      background: hsl(220, 60%, 50%);
      color: white;
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      margin-bottom: 1.5rem;
    }
    label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
    .required { }
    input { display: block; padding: 0.5rem; border: 1px solid hsl(220, 20%, 80%); border-radius: 4px; margin-bottom: 1rem; width: 300px; }
    table { border-collapse: collapse; width: 100%; margin-top: 1.5rem; }
    th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid hsl(220, 20%, 90%); }
    a.external { color: hsl(220, 60%, 50%); }
  </style>
</head>
<body>
  <h1>Pseudo-classes &amp; elements</h1>
  <a href="#" class="btn">Hover me</a>
  <form>
    <label class="required" for="name">Full name</label>
    <input type="text" id="name" name="name" placeholder="Jane Doe" required />
    <label for="email">Email (optional)</label>
    <input type="email" id="email" name="email" placeholder="jane@example.com" />
  </form>
  <table>
    <thead>
      <tr><th>Track</th><th>Lessons</th><th>Level</th></tr>
    </thead>
    <tbody>
      <tr><td>HTML</td><td>20</td><td>Beginner</td></tr>
      <tr><td>Semantics</td><td>18</td><td>Intermediate</td></tr>
      <tr><td>CSS</td><td>20</td><td>Beginner</td></tr>
      <tr><td>A11y</td><td>15</td><td>Advanced</td></tr>
    </tbody>
  </table>
  <p style="margin-top:1.5rem">Learn more at <a href="https://web.dev" class="external" target="_blank" rel="noopener noreferrer">web.dev</a>.</p>
</body>
</html>`,
    },
  ],
};
