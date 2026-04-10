import type { AcademyTrack } from '../types';

/**
 * HTML → hero (start): documents, outline, landmarks.
 * SEO notes reflect durable signals (semantic structure, helpful content) as of early 2026;
 * always verify current Google Search documentation.
 */
export const htmlSemanticsTrack: AcademyTrack = {
  id: 'html-semantics',
  menuLabel: 'HTML & semantics',
  menuDescription: 'Documents, outline, landmarks — PE7 foundation',
  dialogTitle: 'Academy · HTML & semantics',
  lessons: [
    {
      id: 'html-01-skeleton',
      shortTitle: '1 · Document skeleton',
      title: 'Your first valid HTML document',
      blocks: [
        {
          type: 'p',
          text: 'HTML is not “programming the look.” It is a structured message to the browser and to assistive tech: “here is the title, here is the main content, here is navigation.” That contract is what Principal-level engineers defend in review.',
        },
        {
          type: 'h3',
          text: 'The non-negotiable skeleton',
        },
        {
          type: 'ul',
          items: [
            'DOCTYPE — tells the browser to use standards mode (use the short HTML5 doctype in the editor).',
            'html lang — language of the page (a11y, hyphenation, translation tools; crawlers use it as a signal).',
            'head — metadata: charset, viewport, title, description.',
            'body — everything visible on the page.',
          ],
        },
        {
          type: 'callout',
          title: 'Search & semantics (2026)',
          text:
            'Google’s systems still reward pages that are easy to crawl and understand: clear titles, sensible heading hierarchy, and fast, usable pages. There is no magic meta tag that replaces helpful content and solid HTML. Keep Search Central / SEO docs in your bookmarks and re-read when guidance updates.',
        },
        {
          type: 'p',
          text: 'In the editor you have a starter fragment. In real files you’d wrap it in the full document; here the preview injects a safe page around your markup so you can focus on structure.',
        },
      ],
      exercise:
        'Ensure the document has a clear <title> and that <html lang> matches the language (try "en" or "es"). Add a <meta name="description" content="…"> in the head section of your snippet (we show head+body in the fragment below—keep tags valid).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Replace this with your page title</title>
</head>
<body>
  <p>Hello — this is visible content inside the body.</p>
</body>
</html>`,
    },
    {
      id: 'html-02-headings',
      shortTitle: '2 · Headings & outline',
      title: 'One H1, a real outline, no typography hacks',
      blocks: [
        {
          type: 'p',
          text: 'Headings create an outline. Screen reader users skim by heading; search engines use them (with everything else) to understand topical structure. Using <h3> because it “looks smaller” without an <h2> above it breaks the outline — that’s a PE7 review comment.',
        },
        {
          type: 'h3',
          text: 'Rules of thumb',
        },
        {
          type: 'ul',
          items: [
            'Exactly one h1 per view/document (unless you use a deliberate multi-document pattern).',
            'Do not skip levels: h1 → h2 → h3, never h1 → h4.',
            'Size and color belong in CSS, not in heading level choice.',
          ],
        },
        {
          type: 'callout',
          title: 'Why this matters for SEO',
          text:
            'A logical heading structure helps machines map sections to topics. It does not replace writing for humans — it complements it.',
        },
      ],
      exercise:
        'Fix the heading levels so they follow h1 → h2 → h3 in order. Add one more <h2> with a short section that belongs under the same h1.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Heading practice</title>
</head>
<body>
  <h1>Our product</h1>
  <h3>Pricing</h3>
  <p>Plans for every team.</p>
  <h3>Features</h3>
  <p>Everything you need to ship.</p>
</body>
</html>`,
    },
    {
      id: 'html-03-landmarks',
      shortTitle: '3 · Landmarks',
      title: 'header, nav, main, footer — semantics that scale',
      blocks: [
        {
          type: 'p',
          text: 'Landmarks let users jump to “main” or “navigation” with a keystroke. They also clarify layout for everyone reading the DOM. <div id="header"> is not a substitute for <header> when the element is actually a banner for the site or section.',
        },
        {
          type: 'h3',
          text: 'Minimal PE7 pattern',
        },
        {
          type: 'ul',
          items: [
            'header — introductory/branding for its nearest sectioning ancestor or the page.',
            'nav — major navigation blocks (more than one is OK; use aria-label when needed).',
            'main — primary content; exactly one per document in most pages.',
            'footer — footer for section or page.',
            'article vs section: article = self-contained composition; section = thematic grouping.',
          ],
        },
        {
          type: 'p',
          text: 'Refactor the generic divs below into landmarks. Add aria-label="Primary" on nav when you have multiple navigation regions.',
        },
      ],
      exercise:
        'Replace the wrapper divs with <header>, <nav>, <main>, and <footer>. Keep class names if you like; focus on semantics.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Landmarks practice</title>
</head>
<body>
  <div class="banner">
    <p>DevPath</p>
    <div class="menu">
      <a href="#main">Skip to content</a>
      <a href="/learn">Learn</a>
      <a href="/try">Try</a>
    </div>
  </div>
  <div class="content" id="main">
    <h1>Lesson</h1>
    <p>Semantic HTML pays dividends in a11y and maintenance.</p>
  </div>
  <div class="bottom">
    <p>© 2026</p>
  </div>
</body>
</html>`,
    },
    {
      id: 'html-04-links',
      shortTitle: '4 · Links',
      title: 'Links that make sense out of context',
      blocks: [
        {
          type: 'p',
          text: 'Link text is read alone by screen reader rotor menus and by search snippets in some contexts. “Click here” and raw URLs fail the out-of-context test — a PE7 review will ask you to rename them.',
        },
        {
          type: 'h3',
          text: 'Non-negotiables',
        },
        {
          type: 'ul',
          items: [
            'Describe the destination: “Read the accessibility guidelines” beats “Click here”.',
            'If you open a new tab (target="_blank"), add rel="noopener noreferrer" for security and privacy.',
            'Skip links at the top of the page jump keyboard users to main — pair with id on main.',
          ],
        },
        {
          type: 'callout',
          text: 'Crawlers follow links; internal linking helps discovery, but manipulative “link schemes” violate guidelines. Link for humans first.',
          title: 'SEO angle',
        },
      ],
      exercise:
        'Replace vague link text with descriptive labels. For any external link opening in a new tab, add rel="noopener noreferrer". Keep the skip link pointing at main.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Links practice</title>
</head>
<body>
  <a href="#main-content">Skip to main</a>
  <header>
    <h1>DevPath</h1>
    <nav aria-label="Primary">
      <a href="/learn">Click here</a>
      <a href="https://example.com/docs" target="_blank">Docs</a>
    </nav>
  </header>
  <main id="main-content">
    <p>Read more: <a href="/pricing">https://example.com/pricing</a></p>
  </main>
</body>
</html>`,
    },
    {
      id: 'html-05-figure',
      shortTitle: '5 · Images & figure',
      title: 'alt text, dimensions, and figcaption',
      blocks: [
        {
          type: 'p',
          text: 'Images are content or decoration. Assistive tech needs a text alternative when the image conveys information; decorative images should use alt="" so they are skipped.',
        },
        {
          type: 'h3',
          text: 'figure / figcaption',
        },
        {
          type: 'p',
          text: 'Use figure when the image (or code block, diagram) is a unit of content with an optional caption. The caption is figcaption — it is exposed to assistive tech as associated with the figure.',
        },
        {
          type: 'h3',
          text: 'Layout stability (CWV)',
        },
        {
          type: 'p',
          text: 'Width and height on img (or aspect-ratio in CSS) reserve space before the image loads, reducing CLS. That is both a user experience win and a signal search systems care about indirectly through quality.',
        },
      ],
      exercise:
        'Give the logo a proper alt if it represents the brand name; use alt="" for the purely decorative divider. Wrap the diagram and its caption in figure/figcaption. Add width and height on the photo img (use any plausible numbers, e.g. 800 and 450).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Images practice</title>
</head>
<body>
  <main>
    <h1>Gallery</h1>
    <img src="https://picsum.photos/seed/logo/120/40" />
    <img src="https://picsum.photos/seed/divider/600/8" />
    <div>
      <img src="https://picsum.photos/seed/team/800/450" />
      <p>Our team at the offsite in Lisbon.</p>
    </div>
  </main>
</body>
</html>`,
    },
    {
      id: 'html-06-forms',
      shortTitle: '6 · Forms (basics)',
      title: 'Labels, names, and the submit contract',
      blocks: [
        {
          type: 'p',
          text: 'Every control needs a programmatic label (label for=id, or implicit nesting, or aria-label when design leaves no room — last resort). Without it, you fail WCAG and make autofill and voice control worse.',
        },
        {
          type: 'h3',
          text: 'Buttons',
        },
        {
          type: 'p',
          text: 'Inside a form, button defaults to type="submit". A control that should not submit must use type="button". Principal engineers grep for naked button inside forms.',
        },
        {
          type: 'h3',
          text: 'Groups',
        },
        {
          type: 'p',
          text: 'fieldset with legend groups related radios or checkboxes so the group has one spoken label.',
        },
      ],
      exercise:
        'Associate every input with a label via for/id. Wrap the plan radios in a fieldset with legend "Plan". Make the cancel control type="button" so it does not submit the form.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Forms practice</title>
</head>
<body>
  <main>
    <h1>Sign up</h1>
    <form action="/signup" method="post">
      <p>Email</p>
      <input type="email" name="email" autocomplete="email" />
      <p>Plan</p>
      <label><input type="radio" name="plan" value="pro" /> Pro</label>
      <label><input type="radio" name="plan" value="free" /> Free</label>
      <button>Cancel</button>
      <button type="submit">Create account</button>
    </form>
  </main>
</body>
</html>`,
    },
  ],
};
