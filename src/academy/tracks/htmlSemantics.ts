import type { AcademyTrack } from '../types';

/**
 * HTML Semantics: PE7-depth document structure, content models, ARIA, and review habits.
 * 18 lessons. Builds on HTML Foundations.
 */
export const htmlSemanticsTrack: AcademyTrack = {
  id: 'html-semantics',
  menuLabel: 'HTML semantics',
  menuDescription: 'Landmarks, content models, ARIA, a11y — PE7 depth · 18 lessons',
  dialogTitle: 'Academy · HTML semantics',
  lessons: [
    /* ------------------------------------------------------------------ */
    /*  M1 · Why semantics (1-2)                                          */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-01-why',
      shortTitle: '1 · Why semantics',
      title: 'Semantics is an API for every consumer of your page',
      blocks: [
        {
          type: 'p',
          text: 'When you write <div class="header"> instead of <header>, you are hiding information. The div says "I am a generic box." The header says "I am the introductory content for this page or section." Browsers, screen readers, search engines, reader modes, browser extensions, and future developers all consume your HTML — and every one of them benefits from the correct element.',
        },
        {
          type: 'h3',
          text: 'What happens when you get it right',
        },
        {
          type: 'ul',
          items: [
            'Screen readers can list all landmarks and let users jump directly to navigation, main content, or footer.',
            'Search engines understand the hierarchy and topical grouping of your content.',
            'Reader mode strips away chrome and shows the article — but only if it can find <article> or <main>.',
            'Browser extensions (table of contents, outliners) build views from your heading structure.',
            'Future developers understand intent without reading CSS class names.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 mindset',
          text: 'A principal engineer treats the DOM as a public API. Changing a <nav> to a <div> is a breaking change for assistive tech users — even if it looks exactly the same visually.',
        },
      ],
      exercise:
        'The starter uses divs for everything. Replace each div with the semantic element that matches its purpose. Use the class names as hints for what each section actually is.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Semantic HTML</title>
</head>
<body>
  <div class="site-header">
    <div class="logo">DevPath</div>
    <div class="navigation">
      <a href="/">Home</a>
      <a href="/learn">Learn</a>
      <a href="/projects">Projects</a>
    </div>
  </div>
  <div class="main-content">
    <div class="article">
      <h1>Why semantics matter</h1>
      <p>Semantic HTML communicates meaning to every consumer of your page.</p>
    </div>
  </div>
  <div class="site-footer">
    <p>&copy; 2026 DevPath</p>
  </div>
</body>
</html>`,
    },
    {
      id: 'sem-02-content-models',
      shortTitle: '2 · Content models',
      title: 'Flow, phrasing, sectioning — what goes where',
      blocks: [
        {
          type: 'p',
          text: 'HTML elements belong to content categories that define where they can appear. Understanding these categories prevents invalid nesting (like putting a <div> inside a <p>) and explains why certain combinations work and others do not.',
        },
        {
          type: 'h3',
          text: 'The main categories',
        },
        {
          type: 'ul',
          items: [
            'Flow content — most elements (div, p, section, table, form, img…). Can appear in <body>.',
            'Phrasing content — inline-level elements (span, a, strong, em, img, code…). Can appear inside <p>.',
            'Sectioning content — creates a new section in the outline (article, aside, nav, section).',
            'Heading content — h1 through h6. Defines the heading of a section.',
            'Interactive content — elements the user interacts with (a, button, input, select, textarea).',
            'Embedded content — external resources (img, video, audio, iframe, canvas, svg).',
          ],
        },
        {
          type: 'callout',
          title: 'The classic nesting mistake',
          text: 'A <p> can only contain phrasing content. If you put a <div> inside a <p>, the browser closes the <p> before the <div> — your DOM tree does not match your source code. This is why understanding content models matters at the PE7 level.',
        },
        {
          type: 'p',
          text: 'Interactive elements cannot nest inside other interactive elements. A link inside a button, or a button inside a link, creates unpredictable behavior across browsers.',
        },
      ],
      exercise:
        'The starter has invalid nesting. Fix it: move the div out of the paragraph, separate the nested link/button, and ensure each element is in a valid parent.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Content models</title>
</head>
<body>
  <main>
    <h1>Content categories</h1>
    <p>
      This paragraph contains a div which is invalid.
      <div>This div breaks the paragraph.</div>
      The paragraph continues here.
    </p>
    <a href="/pricing">
      <button>Click to see pricing</button>
    </a>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M2 · Document structure (3-5)                                     */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-03-skeleton-review',
      shortTitle: '3 · Document PE7 review',
      title: 'The document skeleton a principal engineer ships',
      blocks: [
        {
          type: 'p',
          text: 'You learned the basic skeleton in Foundations. At the PE7 level, the skeleton carries more weight: language declaration affects hyphenation and translation; charset position affects parsing; description affects search snippets; and the absence of any piece is a review comment.',
        },
        {
          type: 'h3',
          text: 'PE7 skeleton checklist',
        },
        {
          type: 'ul',
          items: [
            '<!DOCTYPE html> — always the first line, no whitespace before it.',
            '<html lang="en"> — lang must match the primary language of the page content.',
            '<meta charset="utf-8"> — must be within the first 1024 bytes.',
            '<meta name="viewport"> — required for responsive rendering on mobile.',
            '<title> — unique, descriptive, under ~60 characters.',
            '<meta name="description"> — accurate summary, under ~155 characters.',
            'Heading structure — one h1, logical hierarchy, no skipped levels.',
          ],
        },
        {
          type: 'callout',
          title: 'The dir attribute',
          text: 'For right-to-left languages (Arabic, Hebrew), add dir="rtl" on <html>. For mixed-direction content, use dir="auto" on the specific element. Missing directionality causes layout issues a PE7 catches in internationalized apps.',
        },
      ],
      exercise:
        'Audit the starter against the checklist. Fix every issue: add missing meta tags, correct the lang, improve the title, add a description, and fix the heading hierarchy.',
      starterHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Page</title>
</head>
<body>
  <h3>Welcome</h3>
  <p>This page has several issues that a principal engineer would flag.</p>
  <h1>About us</h1>
  <p>We build tools for developers.</p>
</body>
</html>`,
    },
    {
      id: 'sem-04-headings-outline',
      shortTitle: '4 · Heading outline',
      title: 'The real rules for headings (not the algorithm myth)',
      blocks: [
        {
          type: 'p',
          text: 'The HTML spec once described a "document outline algorithm" where sectioning elements (article, section) would create implicit heading scopes, letting you restart at h1 inside each section. No browser ever implemented it. The practical rule in 2026 is simple: maintain a single, flat heading hierarchy across the entire page.',
        },
        {
          type: 'h3',
          text: 'Practical heading rules',
        },
        {
          type: 'ul',
          items: [
            'One h1 per page (or per distinct view in a SPA).',
            'Heading levels descend without gaps: h1 → h2 → h3.',
            'You can go back up: after an h3 section ends, the next h2 is fine.',
            'Do not restart at h1 inside a <section> or <article> — browsers ignore that pattern.',
            'Every section of content should have a heading, even if visually hidden (use a utility class, not display:none).',
          ],
        },
        {
          type: 'callout',
          title: 'Testing your outline',
          text: 'Use a browser extension or the W3C validator to view your heading outline. If reading only the headings gives you a clear table of contents of the page, the structure is correct.',
        },
      ],
      exercise:
        'The starter has multiple h1 elements and skipped levels (the outline algorithm myth in action). Fix it to a single h1 with proper h2/h3 descent. Ensure the outline reads like a table of contents.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Heading outline</title>
</head>
<body>
  <header>
    <h1>DevPath</h1>
  </header>
  <main>
    <section>
      <h1>Courses</h1>
      <p>All available learning tracks.</p>
      <section>
        <h1>HTML</h1>
        <p>Learn the foundations of the web.</p>
      </section>
      <section>
        <h1>CSS</h1>
        <p>Style and layout.</p>
      </section>
    </section>
    <section>
      <h1>About</h1>
      <p>Our mission is to make great developers.</p>
    </section>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-05-landmarks',
      shortTitle: '5 · Landmarks',
      title: 'header, nav, main, footer, aside — the landmark map',
      blocks: [
        {
          type: 'p',
          text: 'Landmark elements map to ARIA landmark roles automatically. A screen reader user can open a landmarks list and jump directly to the main content, navigation, or footer. Without landmarks, they must read sequentially or guess where things are.',
        },
        {
          type: 'h3',
          text: 'The landmarks',
        },
        {
          type: 'ul',
          items: [
            '<header> — introductory content. Maps to role="banner" when it is a direct child of body.',
            '<nav> — major navigation blocks. Maps to role="navigation". Use aria-label when you have multiple navs.',
            '<main> — the primary content. Maps to role="main". Exactly one per page.',
            '<aside> — complementary content (sidebar, related links). Maps to role="complementary".',
            '<footer> — footer content. Maps to role="contentinfo" when a direct child of body.',
          ],
        },
        {
          type: 'p',
          text: 'Header and footer inside an <article> or <section> do not create page-level landmarks — they are scoped to that section. Only top-level header/footer get the banner/contentinfo roles.',
        },
        {
          type: 'callout',
          title: 'Multiple navs need labels',
          text: 'If a page has a primary nav and a footer nav, give each an aria-label: <nav aria-label="Primary"> and <nav aria-label="Footer">. Without labels, a screen reader user sees two "navigation" landmarks with no way to tell them apart.',
        },
      ],
      exercise:
        'Replace the generic divs with landmark elements. Add aria-label to distinguish the two navigation regions. Ensure there is exactly one <main>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Landmarks</title>
</head>
<body>
  <div class="top-bar">
    <p>DevPath OS</p>
    <div class="primary-nav">
      <a href="/learn">Learn</a>
      <a href="/build">Build</a>
      <a href="/review">Review</a>
    </div>
  </div>
  <div class="page-content">
    <h1>Dashboard</h1>
    <p>Welcome back. Here is your progress.</p>
  </div>
  <div class="sidebar">
    <h2>Related</h2>
    <p>Recommended tracks based on your role.</p>
  </div>
  <div class="bottom">
    <div class="footer-nav">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
    <p>&copy; 2026 DevPath</p>
  </div>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M3 · Sectioning (6-8)                                             */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-06-article-section',
      shortTitle: '6 · article vs section',
      title: 'When to use article, section, or just a div',
      blocks: [
        {
          type: 'p',
          text: 'The distinction is about self-containment. An <article> is a self-contained composition — something that makes sense on its own, could appear in an RSS feed, or be syndicated. A <section> is a thematic grouping that needs context from the surrounding page. A <div> has no semantic meaning at all.',
        },
        {
          type: 'h3',
          text: 'Decision guide',
        },
        {
          type: 'ul',
          items: [
            'Could it appear in an RSS feed or be understood independently? → <article>.',
            'Is it a thematic grouping of content with a heading? → <section>.',
            'Is it just a styling wrapper with no semantic purpose? → <div>.',
            'Blog post → <article>. Comment on that post → <article> nested inside the post article.',
            'Product card in a list → <article>. The "features" section of a landing page → <section>.',
          ],
        },
        {
          type: 'callout',
          title: 'The heading test',
          text: 'A <section> should (nearly always) have a heading. If you cannot write a meaningful heading for it, it probably should be a <div>. The HTML spec recommends that authors use section only when the element\'s contents would be listed in the document outline.',
        },
      ],
      exercise:
        'The starter uses <section> and <article> incorrectly. A wrapper div is marked as section (it has no heading and is just a layout wrapper). The blog posts should be articles. Fix the elements to match their actual purpose.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>article vs section</title>
</head>
<body>
  <main>
    <h1>Engineering blog</h1>
    <section class="posts-wrapper">
      <section class="post">
        <h2>Shipping CSS at scale</h2>
        <p>How we manage CSS across 40 engineers and 3 products.</p>
        <p>By Ana · April 2026</p>
      </section>
      <section class="post">
        <h2>Accessibility is not optional</h2>
        <p>Why we treat a11y bugs as P0.</p>
        <p>By Ben · March 2026</p>
      </section>
    </section>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-07-aside',
      shortTitle: '7 · aside',
      title: 'Complementary content that can be removed',
      blocks: [
        {
          type: 'p',
          text: 'The <aside> element represents content tangentially related to the surrounding content — something that could be removed without reducing the main content\'s meaning. Sidebars, pull quotes, related links, and advertising are classic aside material.',
        },
        {
          type: 'h3',
          text: 'Where aside lives',
        },
        {
          type: 'ul',
          items: [
            'As a direct child of body → page-level sidebar, maps to complementary landmark.',
            'Inside an article → related content for that article (a glossary entry, a pull quote).',
            'Never use aside for the main navigation or primary content.',
          ],
        },
        {
          type: 'p',
          text: 'The test: if you remove this aside, does the main content still make complete sense? If yes, aside is correct. If removing it breaks the narrative, it belongs in the main flow.',
        },
        {
          type: 'callout',
          title: 'PE7 review',
          text: 'A common mistake is wrapping the entire sidebar in <aside> when parts of it are actually primary navigation or core page content. Only the truly supplementary parts should be aside.',
        },
      ],
      exercise:
        'The starter has a sidebar that mixes primary navigation and supplementary content in one div. Separate them: put the navigation in <nav> and only the supplementary "related posts" section in <aside>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>aside element</title>
</head>
<body>
  <header><h1>DevPath blog</h1></header>
  <main>
    <article>
      <h2>Understanding the cascade</h2>
      <p>CSS specificity determines which rules win when multiple rules target the same element.</p>
    </article>
  </main>
  <div class="sidebar">
    <h2>Categories</h2>
    <a href="/html">HTML</a>
    <a href="/css">CSS</a>
    <a href="/js">JavaScript</a>
    <h2>Related posts</h2>
    <p>You might also like: "CSS layers explained" and "When specificity goes wrong."</p>
  </div>
</body>
</html>`,
    },
    {
      id: 'sem-08-nesting-sections',
      shortTitle: '8 · Nesting sections',
      title: 'Building complex page structures with correct nesting',
      blocks: [
        {
          type: 'p',
          text: 'Real pages have nested sections — a blog post (article) contains sections for introduction, body, and comments; a product page has sections for description, specifications, and reviews. Correct nesting means each section has a heading and each level of nesting makes structural sense.',
        },
        {
          type: 'h3',
          text: 'Nesting patterns',
        },
        {
          type: 'ul',
          items: [
            'Articles can contain sections (logical subsections of the article).',
            'Articles can nest inside articles (e.g., comments on a blog post are each articles).',
            'Sections can contain articles (a "latest posts" section contains post articles).',
            'Each sectioning element should have its own heading.',
            'Header and footer inside a section/article are scoped to that section.',
          ],
        },
        {
          type: 'callout',
          title: 'Common mistake',
          text: 'Wrapping every paragraph in a <section> adds noise without meaning. Section exists for thematic grouping, not as a paragraph-level container. If the section has no heading and only one paragraph, it is probably a div or just a p.',
        },
      ],
      exercise:
        'Structure the blog post with proper nesting: the post should be an <article>, the comments section should be a <section> inside the article, and each individual comment should be an <article>. Add appropriate headings.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nesting sections</title>
</head>
<body>
  <main>
    <h1>Blog</h1>
    <div class="post">
      <h2>Building accessible forms</h2>
      <p>Every input needs a label. Here is how to get it right every time.</p>
      <p>Labels improve usability for everyone, not just screen reader users.</p>
      <div class="comments">
        <h3>Comments</h3>
        <div class="comment">
          <p><strong>Alice:</strong> Great article! The fieldset tip was new to me.</p>
        </div>
        <div class="comment">
          <p><strong>Bob:</strong> Would love a follow-up on ARIA in forms.</p>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M4 · Interactive HTML (9-11)                                      */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-09-details-summary',
      shortTitle: '9 · details & summary',
      title: 'Native disclosure widgets without JavaScript',
      blocks: [
        {
          type: 'p',
          text: 'The <details> element creates a collapsible disclosure widget. The <summary> is the visible label the user clicks to expand/collapse. This is built into the browser — no JavaScript required, keyboard accessible out of the box, and announced correctly by screen readers.',
        },
        {
          type: 'h3',
          text: 'Usage patterns',
        },
        {
          type: 'ul',
          items: [
            'FAQ sections — each question is a summary, the answer is the details content.',
            'Additional information — "show more" patterns where content is not critical but available.',
            'Error details — a summary says "3 errors found," expanded content lists them.',
            'The open attribute makes a details element expanded by default.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 trade-off',
          text: 'Details/summary is not a replacement for a full accordion component with exclusive panels (only one open at a time). For that behavior you need JavaScript. But for simple disclosure, always prefer the native element over a custom solution.',
        },
      ],
      exercise:
        'Convert the FAQ section from hidden paragraphs to <details>/<summary> pairs. Each question should be a <summary> and the answer should be visible when expanded. Open the first one by default with the open attribute.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>details and summary</title>
</head>
<body>
  <main>
    <h1>Frequently asked questions</h1>
    <div class="faq">
      <h2>What is HTML?</h2>
      <p>HTML is the standard markup language for web pages. It describes the structure and content of a page.</p>
    </div>
    <div class="faq">
      <h2>Do I need to learn CSS too?</h2>
      <p>Yes. HTML provides structure, CSS provides presentation. They work together.</p>
    </div>
    <div class="faq">
      <h2>Is JavaScript required?</h2>
      <p>Not for static pages. JavaScript adds interactivity but many features work without it.</p>
    </div>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-10-dialog',
      shortTitle: '10 · dialog',
      title: 'The dialog element — modal and non-modal',
      blocks: [
        {
          type: 'p',
          text: 'The <dialog> element is the browser-native way to create dialogs and modals. When opened with showModal(), it traps focus, creates a backdrop, and handles Escape to close. This is dramatically better than building modals from divs with custom focus trapping.',
        },
        {
          type: 'h3',
          text: 'Modal vs non-modal',
        },
        {
          type: 'ul',
          items: [
            'dialog.showModal() — modal: creates a backdrop, traps focus, blocks interaction with the page.',
            'dialog.show() — non-modal: shown but the rest of the page remains interactive.',
            'dialog.close() — closes the dialog. Also triggered by Escape in modal mode.',
            'The ::backdrop pseudo-element lets you style the overlay behind a modal dialog.',
            'The open attribute is present when the dialog is visible.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 accessibility notes',
          text: 'Dialog automatically handles focus trapping and Escape to close. Add aria-labelledby pointing to the dialog\'s heading for its accessible name. The close button inside should be type="button" (never type="submit" unless submitting a form). Return focus to the element that opened the dialog when it closes.',
        },
      ],
      exercise:
        'The starter has a custom modal built from divs. Convert it to a <dialog> element. Add a <form method="dialog"> around the close button so it closes the dialog natively. Add aria-labelledby linking the dialog to its heading.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>dialog element</title>
  <style>
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
    .modal-box { background: white; padding: 2rem; border-radius: 8px; max-width: 400px; }
  </style>
</head>
<body>
  <main>
    <h1>Settings</h1>
    <button type="button">Open preferences</button>
    <div class="modal-overlay">
      <div class="modal-box">
        <h2>Preferences</h2>
        <p>Choose your notification settings.</p>
        <button type="button">Close</button>
      </div>
    </div>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-11-links-depth',
      shortTitle: '11 · Links in depth',
      title: 'Link semantics, states, and accessible patterns',
      blocks: [
        {
          type: 'p',
          text: 'Beyond basic href, links carry semantics that affect accessibility, security, and navigation. The text of the link, its relationship to the page, and how it behaves all matter at the PE7 level.',
        },
        {
          type: 'h3',
          text: 'Link patterns a principal enforces',
        },
        {
          type: 'ul',
          items: [
            'Link text must describe the destination when read out of context. Screen reader rotor menus show only link text.',
            'rel="noopener noreferrer" on target="_blank" — prevents the opened page from accessing window.opener.',
            'Skip links: <a href="#main-content">Skip to main content</a> as the first focusable element.',
            'aria-current="page" on the link to the current page in navigation — tells screen readers which page is active.',
            'Download links: use the download attribute and tell the user the file type and size in the link text.',
          ],
        },
        {
          type: 'callout',
          title: 'Links vs buttons',
          text: 'Links navigate to a URL. Buttons perform an action. If clicking does not change the URL, it should be a button, not an anchor with href="#" or javascript:void(0). This is the most common element-choice mistake a PE7 flags.',
        },
      ],
      exercise:
        'Fix the navigation: add aria-current="page" to the active link. Replace the fake link (href="#") with a <button>. Improve all link text to be descriptive. Add a skip link before the nav.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Links in depth</title>
</head>
<body>
  <header>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/learn">Learn</a>
      <a href="/projects">Projects</a>
    </nav>
  </header>
  <main id="main-content">
    <h1>Learn</h1>
    <p>Welcome to the learning section.</p>
    <p>Read the <a href="/docs/guide">guide</a>.</p>
    <p><a href="https://github.com/devpath" target="_blank">View source</a></p>
    <a href="#">Toggle dark mode</a>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M5 · Rich content (12-14)                                         */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-12-alt-text-tree',
      shortTitle: '12 · Alt text decisions',
      title: 'The alt text decision tree — informative, decorative, complex',
      blocks: [
        {
          type: 'p',
          text: 'Alt text is not one-size-fits-all. The correct alt depends on the image\'s role in context. A photo that is the main content of a blog post needs a detailed description. The same photo used as a decorative banner needs alt="". A chart needs a text summary.',
        },
        {
          type: 'h3',
          text: 'Decision tree',
        },
        {
          type: 'ul',
          items: [
            'Is it purely decorative (no information)? → alt="" (empty string).',
            'Does it contain text? → alt repeats the text in the image.',
            'Is it a simple informative image? → alt describes what it shows and why it matters in context.',
            'Is it a complex image (chart, diagram)? → Short alt + longer description nearby (figcaption, aria-describedby, or a link to a text version).',
            'Is it a functional image (icon button, logo link)? → alt describes the action or destination.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 test',
          text: 'Read the page with images turned off. Does it still make sense? If an image\'s absence leaves a gap in understanding, its alt text is wrong or missing.',
        },
      ],
      exercise:
        'Each image has a different role. Apply the decision tree: add a descriptive alt to the content photo, alt="" to the decorative separator, the text content for the logo image, and a meaningful description for the chart. Wrap the chart in a figure with a figcaption for the longer description.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alt text decisions</title>
</head>
<body>
  <main>
    <h1>Annual report</h1>
    <img src="https://picsum.photos/seed/logo/200/60" />
    <img src="https://picsum.photos/seed/divider/800/3" />
    <img src="https://picsum.photos/seed/team/800/400" />
    <img src="https://picsum.photos/seed/chart/700/350" />
    <p>Revenue grew 23% year-over-year, driven by the enterprise segment.</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-13-figure-advanced',
      shortTitle: '13 · Figure for everything',
      title: 'Figures are not just for images',
      blocks: [
        {
          type: 'p',
          text: 'The <figure> element wraps any self-contained content that is referenced from the main flow: images, code listings, diagrams, blockquotes, tables, even video. The <figcaption> provides context. Figures can be moved to an appendix or sidebar without breaking the document.',
        },
        {
          type: 'h3',
          text: 'Figure patterns beyond images',
        },
        {
          type: 'ul',
          items: [
            'Code listing with figcaption naming the file or function.',
            'Blockquote with figcaption for attribution.',
            'Table with figcaption as an alternative or supplement to caption.',
            'Video or audio with figcaption for context.',
            'Multiple related images in one figure with one caption.',
          ],
        },
        {
          type: 'callout',
          title: 'Figcaption position',
          text: 'Figcaption can be the first or last child of figure. Convention: before for code listings (you see the title then the code), after for images (you see the image then the caption). Be consistent within a project.',
        },
      ],
      exercise:
        'Wrap the code listing in a <figure> with a <figcaption> before it naming the file. Wrap the blockquote in a <figure> with a <figcaption> after it for attribution.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Figure patterns</title>
</head>
<body>
  <main>
    <h1>Code review notes</h1>
    <p>Here is the function we discussed:</p>
    <pre><code>export function validate(input: string): boolean {
  return input.length &gt; 0 &amp;&amp; input.length &lt; 256;
}</code></pre>
    <p>utils/validate.ts — line 14</p>
    <p>As the spec says:</p>
    <blockquote>
      <p>The figure element represents self-contained content, potentially with an optional caption.</p>
    </blockquote>
    <p>— HTML Living Standard, section 4.4.12</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-14-time-address',
      shortTitle: '14 · time, address, data',
      title: 'Machine-readable inline elements',
      blocks: [
        {
          type: 'p',
          text: 'Some HTML elements exist primarily to make content machine-readable while remaining human-readable. <time> marks dates and times; <address> marks contact information; <data> associates a human label with a machine value.',
        },
        {
          type: 'h3',
          text: 'The elements',
        },
        {
          type: 'ul',
          items: [
            '<time datetime="2026-04-10"> — ISO 8601 format. Browsers, search, and tools can parse it.',
            '<time datetime="14:30"> — time only. Also supports durations: datetime="PT2H30M" (2 hours 30 minutes).',
            '<address> — contact information for the nearest article or body. Not for postal addresses in general content.',
            '<data value="42"> — associates a machine value with displayed text. Useful for product IDs, scores.',
          ],
        },
        {
          type: 'callout',
          title: 'address scoping',
          text: 'The <address> element is specifically for contact information of the author or owner. It is not a general-purpose element for any address. Inside an <article>, it refers to the article\'s author. Outside any article, it refers to the page owner.',
        },
      ],
      exercise:
        'Wrap dates in <time> elements with proper datetime attributes. Add an <address> element for the author\'s contact info. Use <data> for the product ID.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>time, address, data</title>
</head>
<body>
  <main>
    <article>
      <h1>Product update</h1>
      <p>Published on April 10, 2026 at 2:30 PM.</p>
      <p>Product: Widget Pro (SKU: WP-2026-042)</p>
      <p>The meeting lasted 1 hour and 45 minutes.</p>
      <p>Questions? Contact the author:</p>
      <p>Ana Rivera, ana@devpath.dev</p>
    </article>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M6 · Forms PE7 (15-16)                                            */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-15-form-labels',
      shortTitle: '15 · Form labels PE7',
      title: 'Every control needs a programmatic label — no exceptions',
      blocks: [
        {
          type: 'p',
          text: 'A visual label next to an input is not enough. The label must be programmatically associated so assistive tech announces it. Without this association, a screen reader user hears "edit text, blank" and has no idea what the field is for. This is the most common form accessibility failure.',
        },
        {
          type: 'h3',
          text: 'Label methods (in order of preference)',
        },
        {
          type: 'ul',
          items: [
            '<label for="id"> matched to input id — most robust, works everywhere.',
            'Wrapping: <label>Email <input /></label> — implicit association. Works but some AT has edge cases.',
            'aria-label="Email" on the input — when no visible label exists (icon-only search fields).',
            'aria-labelledby="id" — references another element as the label. Useful for complex layouts.',
            'title attribute — last resort. Not announced by all screen readers by default.',
          ],
        },
        {
          type: 'callout',
          title: 'Placeholder is not a label',
          text: 'Placeholder text disappears when the user starts typing. It fails WCAG and causes cognitive load issues. Always provide a real label. Use placeholder only for example format hints, never as the primary label.',
        },
      ],
      exercise:
        'Fix every input: add proper <label for="id"> associations. The search field uses only a placeholder — add an aria-label. Remove the "p" tags being used as fake labels and replace with real label elements.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Form labels</title>
</head>
<body>
  <main>
    <h1>Settings</h1>
    <form>
      <p>Display name</p>
      <input type="text" name="displayName" />
      <p>Email address</p>
      <input type="email" name="email" />
      <p>Bio</p>
      <textarea name="bio" rows="3"></textarea>
      <input type="search" name="q" placeholder="Search settings" />
      <button type="submit">Save</button>
    </form>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-16-form-errors',
      shortTitle: '16 · Error association',
      title: 'Connecting error messages to inputs with aria-describedby',
      blocks: [
        {
          type: 'p',
          text: 'When a form field has an error, the error message must be programmatically connected to the input. Visual proximity is not enough — a screen reader user needs to hear "Email, invalid, please enter a valid email address" when they focus the field, not discover the error by chance.',
        },
        {
          type: 'h3',
          text: 'The pattern',
        },
        {
          type: 'ul',
          items: [
            'aria-describedby="error-id" on the input, pointing to the error message element.',
            'aria-invalid="true" on the input when it has an error.',
            'The error message element should be visible (not display:none) so sighted users see it too.',
            'Use role="alert" or aria-live="polite" on the error container for dynamic errors.',
            'Group errors: fieldset/legend for groups, aria-describedby for individual field errors.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 error pattern',
          text: 'The best pattern: label + input + error span. The input has aria-describedby pointing to the error span. When the field is invalid, add aria-invalid="true" and populate the error span. When valid, remove aria-invalid and empty the span.',
        },
      ],
      exercise:
        'Add aria-describedby to each input linking it to its error message. Add aria-invalid="true" on the invalid fields. Give each error message a unique id. Add role="alert" to the error summary at the top.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Error association</title>
  <style>
    .error { color: #c00; font-size: 0.875rem; }
  </style>
</head>
<body>
  <main>
    <h1>Edit profile</h1>
    <div class="errors-summary">
      <p>Please fix 2 errors below.</p>
    </div>
    <form>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" value="" />
      <p class="error">Name is required.</p>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" value="not-an-email" />
      <p class="error">Please enter a valid email address.</p>
      <label for="bio">Bio</label>
      <textarea id="bio" name="bio">All good here.</textarea>
      <button type="submit">Save</button>
    </form>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M7 · ARIA (17-18)                                                 */
    /* ------------------------------------------------------------------ */
    {
      id: 'sem-17-aria-basics',
      shortTitle: '17 · ARIA basics',
      title: 'When HTML is not enough — roles, states, properties',
      blocks: [
        {
          type: 'p',
          text: 'ARIA (Accessible Rich Internet Applications) adds semantics that HTML alone cannot express. Tabs, sliders, tree views, live regions — these patterns have no native HTML element. ARIA fills the gap by adding roles, states, and properties to elements.',
        },
        {
          type: 'h3',
          text: 'The rules of ARIA',
        },
        {
          type: 'ul',
          items: [
            'First rule: do not use ARIA if a native HTML element does the job. <button> over <div role="button">.',
            'Roles — what the element is: role="tab", role="tabpanel", role="alert", role="dialog".',
            'States — current condition: aria-expanded="true", aria-selected="true", aria-checked="true".',
            'Properties — fixed characteristics: aria-label="Close", aria-describedby="help-text".',
            'All ARIA attributes start with aria-. Roles use the role attribute.',
          ],
        },
        {
          type: 'callout',
          title: 'ARIA promise',
          text: 'Adding role="button" to a div tells screen readers it is a button. But you must also make it focusable (tabindex="0"), handle Enter and Space key events, and provide a visible focus indicator. ARIA changes what is announced, not what the element does. If you add a role without the behavior, you break the contract.',
        },
      ],
      exercise:
        'The custom toggle uses a div with no semantics. Add role="switch", aria-checked="false", and tabindex="0" to make it accessible. Add aria-label. Replace the fake button div with a real <button>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ARIA basics</title>
  <style>
    .toggle { display: inline-block; width: 50px; height: 26px; background: #ccc; border-radius: 13px; cursor: pointer; }
    .toggle.on { background: #39ff14; }
  </style>
</head>
<body>
  <main>
    <h1>Notification settings</h1>
    <p>Email notifications</p>
    <div class="toggle"></div>
    <p>Push notifications</p>
    <div class="toggle on"></div>
    <div class="btn" style="padding: 8px 16px; background: #333; color: #fff; display: inline-block; cursor: pointer;">
      Save settings
    </div>
  </main>
</body>
</html>`,
    },
    {
      id: 'sem-18-review-checklist',
      shortTitle: '18 · PE7 checklist',
      title: 'The semantic HTML review checklist',
      blocks: [
        {
          type: 'h3',
          text: 'Document level',
        },
        {
          type: 'ul',
          items: [
            'Valid DOCTYPE, lang, charset, viewport.',
            'One h1 per page, heading hierarchy without gaps.',
            'Landmark elements: header, nav, main, footer, aside where appropriate.',
            'Multiple navs have aria-label to distinguish them.',
          ],
        },
        {
          type: 'h3',
          text: 'Content level',
        },
        {
          type: 'ul',
          items: [
            'Images have alt text (informative) or alt="" (decorative).',
            'Links have descriptive text; external links have rel="noopener noreferrer".',
            'Tables have caption, thead/tbody, scope on th.',
            'Forms: every input has a label, fieldset/legend for groups, error messages linked with aria-describedby.',
          ],
        },
        {
          type: 'h3',
          text: 'Interactive elements',
        },
        {
          type: 'ul',
          items: [
            'Buttons for actions, links for navigation — never reversed.',
            'Custom widgets have ARIA roles, states, and keyboard support.',
            'Skip link as the first focusable element.',
            'Focus order follows visual order.',
          ],
        },
        {
          type: 'callout',
          title: 'The PE7 review habit',
          text: 'Before approving any PR, tab through the page with a keyboard. Open the accessibility tree in DevTools. Run an automated scan (Axe, Lighthouse). Read the heading outline. If any of these reveals a problem, the code is not ready to ship.',
        },
      ],
      exercise:
        'This page has at least 8 semantic issues. Find and fix them all: missing landmark elements, broken headings, unlabeled inputs, vague links, missing alt text, incorrect element choices, and missing skip link.',
      starterHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Page</title>
</head>
<body>
  <div class="header">
    <div class="nav">
      <a href="/">Home</a>
      <a href="/about">Click here</a>
    </div>
  </div>
  <div class="content">
    <h1>Welcome</h1>
    <h4>About us</h4>
    <p>We make great software.</p>
    <img src="https://picsum.photos/seed/team/400/200" />
    <form>
      <p>Email</p>
      <input type="email" name="email" />
      <a href="#">Submit</a>
    </form>
  </div>
  <div class="footer">
    <p>&copy; 2026</p>
  </div>
</body>
</html>`,
    },
  ],
};
