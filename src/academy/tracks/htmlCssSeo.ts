import type { AcademyTrack } from '../types';

/**
 * HTML + CSS hooks that affect discovery, rendering, and quality signals.
 * Align narrative with Google Search Central themes (helpful content, technical requirements);
 * re-verify official docs — guidance changes.
 */
export const htmlCssSeoTrack: AcademyTrack = {
  id: 'html-css-seo',
  menuLabel: 'HTML / CSS + modern SEO',
  menuDescription: 'Metadata, canonical, social, JSON-LD, CWV — Apr 2026–aligned habits',
  dialogTitle: 'Academy · HTML/CSS + SEO',
  allowJsonLdScriptsInPreview: true,
  lessons: [
    {
      id: 'seo-01-onpage',
      shortTitle: '1 · On-page metadata',
      title: 'Title and description that match the page',
      blocks: [
        {
          type: 'p',
          text: 'The title element is a strong signal for result titles; the meta description often feeds the snippet. Neither replaces writing useful body content — they summarize it honestly.',
        },
        {
          type: 'h3',
          text: 'PE7 habits',
        },
        {
          type: 'ul',
          items: [
            'One clear title per document; avoid boilerplate stuffing.',
            'Meta description: concise summary of this URL, not keyword spam.',
            'Viewport meta is required for mobile-first indexing — you already ship it in every lesson template.',
          ],
        },
        {
          type: 'callout',
          title: 'April 2026 reminder',
          text:
            'Search systems emphasize helpful, people-first pages and solid technical basics. When Google publishes updates, read the official announcement and Search Central — not third-party “what Google wants” threads.',
        },
      ],
      exercise:
        'Write a specific <title> (under ~60 characters is a practical SERP target). Add <meta name="description" content="…"> that describes only what this page delivers. Remove the duplicate vague title in the body.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page</title>
</head>
<body>
  <main>
    <h1>Page</h1>
    <p>Pricing for teams who ship accessible interfaces.</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'seo-02-canonical-robots',
      shortTitle: '2 · Canonical & robots',
      title: 'Control duplicates and indexation',
      blocks: [
        {
          type: 'p',
          text: 'Canonical link points search engines at the preferred URL when duplicates exist (query params, HTTP/HTTPS, www). It is a hint, not a guarantee — still fix duplicates at the source when you can.',
        },
        {
          type: 'h3',
          text: 'robots meta',
        },
        {
          type: 'p',
          text: 'noindex removes the page from results (use on staging, thank-you pages, thin utility routes). nofollow on meta is rarely what people think — prefer granular link-level rel on anchors when needed.',
        },
      ],
      exercise:
        'Add <link rel="canonical" href="https://example.com/pricing"> in head. Add <meta name="robots" content="index, follow"> for this public page (explicit is fine for learning).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pricing — Example Co</title>
  <meta name="description" content="Transparent pricing for teams." />
</head>
<body>
  <main>
    <h1>Pricing</h1>
    <p>We publish one URL for this content.</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'seo-03-social',
      shortTitle: '3 · Social & discovery previews',
      title: 'Open Graph and Twitter / X cards',
      blocks: [
        {
          type: 'p',
          text: 'Open Graph tags shape how links look when shared (Slack, iMessage, many social crawlers). Twitter/X uses its own namespaced tags; implement both when share quality matters.',
        },
        {
          type: 'h3',
          text: 'Minimum viable set',
        },
        {
          type: 'ul',
          items: [
            'og:title, og:description, og:image (absolute URL), og:url, og:type.',
            'twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image.',
          ],
        },
      ],
      exercise:
        'Fill in og: and twitter: meta tags for this pricing page. Use https://example.com/og/pricing.png as a placeholder image URL.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pricing — Example Co</title>
  <meta name="description" content="Transparent pricing for teams." />
  <link rel="canonical" href="https://example.com/pricing" />
</head>
<body>
  <main>
    <h1>Pricing</h1>
  </main>
</body>
</html>`,
    },
    {
      id: 'seo-04-jsonld',
      shortTitle: '4 · Structured data (JSON-LD)',
      title: 'Article schema the validator will accept',
      blocks: [
        {
          type: 'p',
          text: 'JSON-LD in a script type application/ld+json block describes entities to eligible search features. Invalid or misleading markup can cause manual actions — ship only what you can maintain.',
        },
        {
          type: 'h3',
          text: 'Preview note',
        },
        {
          type: 'p',
          text: 'This academy preview allows JSON-LD scripts only; other script tags are stripped. Test with Google’s Rich Results Test against your deployed URL.',
        },
      ],
      exercise:
        'Complete the Article JSON-LD: set headline, datePublished (ISO 8601), author name, and a publisher Organization with name "Example Co". Ensure JSON is valid.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Article — Example Co</title>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "",
    "datePublished": "",
    "author": {
      "@type": "Person",
      "name": ""
    },
    "publisher": {
      "@type": "Organization",
      "name": "Example Co"
    }
  }
  </script>
</head>
<body>
  <main>
    <article>
      <h1>Shipping safer CSS to production</h1>
      <p>By Alex Rivera · April 9, 2026</p>
      <p>How we layer, scope, and measure CSS on large teams.</p>
    </article>
  </main>
</body>
</html>`,
    },
    {
      id: 'seo-05-cwv-css',
      shortTitle: '5 · CSS & CWV',
      title: 'What you paint and when it moves',
      blocks: [
        {
          type: 'p',
          text: 'Core Web Vitals (LCP, INP, CLS) are user metrics; search uses them among many signals. CSS that delays first paint, or layout without reserved space for media, hurts real users first.',
        },
        {
          type: 'h3',
          text: 'Practical hooks',
        },
        {
          type: 'ul',
          items: [
            'Reserve space for images and embeds (width/height or aspect-ratio).',
            'Avoid huge render-blocking style unless you have a critical CSS strategy.',
            'Animations: respect prefers-reduced-motion; heavy main-thread animation hurts INP.',
          ],
        },
      ],
      exercise:
        'In the style block, add aspect-ratio: 16/9 on .hero-img and object-fit: cover on the img so the hero reserves space. Add @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } } as a teaching pattern (tune per project in production).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Landing — Example Co</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; }
    .hero-img { max-width: 100%; }
  </style>
</head>
<body>
  <main>
    <img class="hero-img" src="https://picsum.photos/seed/hero/1200/675" alt="" width="1200" height="675" />
    <h1>Build accessible UIs faster</h1>
  </main>
</body>
</html>`,
    },
    {
      id: 'seo-06-checklist',
      shortTitle: '6 · PE7 shipping checklist',
      title: 'Before you ask for indexation',
      blocks: [
        {
          type: 'h3',
          text: 'Technical',
        },
        {
          type: 'ul',
          items: [
            '200 OK on the canonical URL; no accidental noindex on production.',
            'Sitemap includes important URLs; robots.txt does not block what should be crawled.',
            'Structured data validates; matches visible content (no fake ratings).',
          ],
        },
        {
          type: 'h3',
          text: 'Content',
        },
        {
          type: 'ul',
          items: [
            'Page answers the query it targets; headings reflect the narrative.',
            'E-E-A-T signals where relevant: who wrote this, why trust them.',
          ],
        },
        {
          type: 'callout',
          title: 'Principal move',
          text:
            'Document assumptions in a short note: target query, canonical strategy, and measurement (Search Console, RUM). That is how you scale SEO decisions across teams.',
        },
      ],
      exercise:
        'Add a visible <address> in the footer with a fictional contact email. Add <link rel="alternate" hreflang="en" href="https://example.com/"> as a single-locale example (multilingual sites add one alternate per locale).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Example Co — Home</title>
  <meta name="description" content="We help teams ship accessible interfaces." />
  <link rel="canonical" href="https://example.com/" />
</head>
<body>
  <header><h1>Example Co</h1></header>
  <main><p>Welcome.</p></main>
  <footer>
    <p>© 2026 Example Co</p>
  </footer>
</body>
</html>`,
    },
  ],
};
