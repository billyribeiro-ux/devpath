import type { AcademyTrack } from '../types';

/**
 * HTML Foundations: absolute zero → fluent HTML.
 * 20 lessons, PE7 voice: why before what, plain English, review-grade habits from day one.
 */
export const htmlFoundationsTrack: AcademyTrack = {
  id: 'html-foundations',
  menuLabel: 'HTML foundations',
  menuDescription: 'From zero — tags, documents, forms, tables, media · 20 lessons',
  dialogTitle: 'Academy · HTML foundations',
  lessons: [
    /* ------------------------------------------------------------------ */
    /*  M1 · Basics (1-4)                                                 */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-01-what-is-html',
      shortTitle: '1 · What is HTML',
      title: 'HTML is a contract, not decoration',
      blocks: [
        {
          type: 'p',
          text: 'HTML stands for HyperText Markup Language. It is how you tell the browser — and every machine that reads the page — what your content means. A paragraph is not a paragraph because it looks like one; it is a paragraph because you wrapped it in <p>. That distinction separates decoration from meaning, and it is the single most important idea in web development.',
        },
        {
          type: 'h3',
          text: 'Tags, elements, and how the browser reads them',
        },
        {
          type: 'p',
          text: 'An HTML tag is a keyword wrapped in angle brackets: <p>, <h1>, <img>. Most tags come in pairs — an opening tag and a closing tag — and everything between them is the content of that element. A few tags are self-closing because they have no content: <br>, <hr>, <img>. The browser reads your tags top to bottom, builds a tree (the DOM), and renders pixels from that tree.',
        },
        {
          type: 'ul',
          items: [
            'Opening tag: <p> — starts a paragraph element.',
            'Closing tag: </p> — ends that paragraph element.',
            'Element = opening tag + content + closing tag.',
            'Self-closing (void) tags like <img /> have no closing pair.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 principle',
          text: 'The HTML you ship is an API. Screen readers, search engines, browser extensions, and future you all consume it. If you pick elements for how they look instead of what they mean, every consumer of your page gets the wrong information.',
        },
      ],
      exercise:
        'Look at the starter. The heading uses a <div> instead of a proper heading tag. Change it to an <h1>. Then change the "paragraph" <div> to a real <p>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My first page</title>
</head>
<body>
  <div>Welcome to HTML</div>
  <div>This text should be a paragraph, not a div.</div>
</body>
</html>`,
    },
    {
      id: 'hf-02-attributes',
      shortTitle: '2 · Attributes',
      title: 'Attributes add detail to elements',
      blocks: [
        {
          type: 'p',
          text: 'Attributes live inside the opening tag and give extra information about an element. They always follow the pattern name="value". Some attributes are required for the element to work correctly (like href on a link), and some are optional but strongly recommended (like alt on an image).',
        },
        {
          type: 'h3',
          text: 'Common attributes you will use everywhere',
        },
        {
          type: 'ul',
          items: [
            'id — a unique identifier for that element on the entire page. Never reuse the same id.',
            'class — a reusable label for styling or scripting. Multiple elements can share a class.',
            'lang — declares the language of the element\'s content ("en", "es", "pt").',
            'title — advisory text shown as a tooltip. Do not rely on it for critical info.',
          ],
        },
        {
          type: 'h3',
          text: 'Boolean attributes',
        },
        {
          type: 'p',
          text: 'Some attributes are true just by being present. <input disabled> means the input is disabled — you do not write disabled="true". If the attribute is absent, it is false. This is called a boolean attribute.',
        },
        {
          type: 'callout',
          title: 'PE7 review check',
          text: 'Duplicate IDs are a spec violation and break label/input associations, fragment links, and ARIA references. A principal engineer will always flag them.',
        },
      ],
      exercise:
        'The starter has two elements with the same id. Fix it so each id is unique. Add a lang="en" attribute to the <html> tag (it is missing). Add an appropriate class to both paragraphs.',
      starterHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Attributes</title>
</head>
<body>
  <h1>Attributes practice</h1>
  <p id="intro">HTML attributes add meaning to elements.</p>
  <p id="intro">Each id must be unique on the page.</p>
</body>
</html>`,
    },
    {
      id: 'hf-03-valid-document',
      shortTitle: '3 · Valid document',
      title: 'The five parts every HTML document needs',
      blocks: [
        {
          type: 'p',
          text: 'Every HTML page has the same skeleton. Skip any piece and the browser will guess what you meant — sometimes incorrectly. Principal engineers enforce a valid skeleton in every template because it removes a class of rendering and accessibility bugs.',
        },
        {
          type: 'h3',
          text: 'The five required pieces',
        },
        {
          type: 'ul',
          items: [
            '<!DOCTYPE html> — tells the browser to use standards mode, not quirks mode.',
            '<html lang="…"> — root element; lang sets the language for the entire document.',
            '<head> — metadata container: charset, viewport, title, description, styles.',
            '<title> — the text shown in the browser tab and in search results.',
            '<body> — everything visible on the page lives here.',
          ],
        },
        {
          type: 'callout',
          title: 'Why charset and viewport matter',
          text: 'charset="utf-8" ensures every character renders correctly (accents, emoji, CJK). The viewport meta tag makes the page work on phones — without it, mobile browsers render at desktop width and zoom out.',
        },
      ],
      exercise:
        'The starter is missing the DOCTYPE, the lang attribute, the charset meta, and the viewport meta. Add all four so this becomes a fully valid HTML5 document.',
      starterHtml: `<html>
<head>
  <title>Fix this skeleton</title>
</head>
<body>
  <h1>Almost valid</h1>
  <p>This page is missing several required pieces.</p>
</body>
</html>`,
    },
    {
      id: 'hf-04-text-content',
      shortTitle: '4 · Text elements',
      title: 'Paragraphs, line breaks, and preformatted text',
      blocks: [
        {
          type: 'p',
          text: 'HTML collapses whitespace. Ten spaces and three newlines in your source code render as a single space in the browser. That is by design — it lets you format your source for readability without affecting the output. When you actually need a line break, structure, or preserved formatting, you use specific elements.',
        },
        {
          type: 'h3',
          text: 'Text elements',
        },
        {
          type: 'ul',
          items: [
            '<p> — a paragraph. The most common text container. Browsers add vertical spacing around it.',
            '<br> — a line break within a paragraph (use for addresses or poems, not for spacing).',
            '<hr> — a thematic break between sections. Renders as a horizontal line by default.',
            '<pre> — preserves whitespace and line breaks exactly as written. Often paired with <code>.',
            '<blockquote> — a block of quoted text from another source. Add cite="url" for the source.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 anti-pattern',
          text: 'Using <br><br> to create spacing between blocks is a layout hack. Use CSS margin/padding instead. A principal engineer will flag this in review because it breaks when styles change and confuses screen readers.',
        },
      ],
      exercise:
        'The starter uses <br> tags for spacing between paragraphs. Replace them with proper <p> elements. Wrap the quote in a <blockquote> and the code snippet in <pre><code>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Text elements</title>
</head>
<body>
  <h1>Text content</h1>
  This is the first paragraph.
  <br><br>
  This is the second paragraph.
  <br><br>
  "Any fool can write code that a computer can understand." — Martin Fowler
  <br><br>
  function hello() { return "world"; }
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M2 · Structure (5-8)                                              */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-05-headings',
      shortTitle: '5 · Headings',
      title: 'One H1 and a real heading outline',
      blocks: [
        {
          type: 'p',
          text: 'Headings (h1 through h6) create a document outline. Screen reader users navigate by heading — they press a key and jump from heading to heading to understand the page structure. Search engines use headings to understand what each section is about.',
        },
        {
          type: 'h3',
          text: 'The heading rules',
        },
        {
          type: 'ul',
          items: [
            'One <h1> per page — the main topic of the document.',
            'Never skip levels: h1 → h2 → h3, never h1 → h4.',
            'Do not pick headings for their size. Size is a CSS concern.',
            'Each heading should describe the section that follows it.',
          ],
        },
        {
          type: 'p',
          text: 'Think of headings like an outline in a book: the h1 is the chapter title, h2 elements are major sections, h3 elements are subsections. If your outline does not make sense when you read only the headings, your structure is wrong.',
        },
        {
          type: 'callout',
          title: 'PE7 review comment',
          text: 'If someone chose <h3> because "h1 is too big," tell them to use CSS to change the size. Heading level communicates structure, not appearance.',
        },
      ],
      exercise:
        'The starter has broken heading levels — h4 is used because someone wanted smaller text. Fix the outline so it follows h1 → h2 → h3 in order. Add one more h2 section with a paragraph.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Heading outline</title>
</head>
<body>
  <h1>Web Development Guide</h1>
  <h4>Getting Started</h4>
  <p>Begin with the fundamentals.</p>
  <h4>Tools You Need</h4>
  <p>A browser and a text editor are enough to start.</p>
  <h6>Recommended Editors</h6>
  <p>VS Code, Cursor, or any editor you are comfortable with.</p>
</body>
</html>`,
    },
    {
      id: 'hf-06-lists',
      shortTitle: '6 · Lists',
      title: 'Ordered, unordered, and why they matter',
      blocks: [
        {
          type: 'p',
          text: 'Lists are for groups of related items. Using a list instead of a series of paragraphs or divs tells the browser (and assistive tech) that these items belong together and how many there are. A screen reader announces "list, 5 items" — that context helps users decide whether to listen or skip.',
        },
        {
          type: 'h3',
          text: 'When to use which',
        },
        {
          type: 'ul',
          items: [
            '<ul> — unordered list. Items have no sequence. Navigation menus, feature lists, tag clouds.',
            '<ol> — ordered list. Sequence matters. Steps in a recipe, ranked results, instructions.',
            '<li> — list item. Must be a direct child of <ul> or <ol>.',
            'Nested lists: put the inner <ul> or <ol> inside an <li> of the outer list.',
          ],
        },
        {
          type: 'callout',
          title: 'Real-world pattern',
          text: 'Navigation bars are usually built as <nav> containing a <ul> of <li> elements with <a> links inside. This is not just convention — it tells screen readers "here is a list of 5 navigation links," which is more useful than a pile of anonymous anchors.',
        },
      ],
      exercise:
        'The starter has list items without a list wrapper. Wrap the ingredients in a <ul> and the steps in an <ol>. Make sure each item is inside an <li>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lists</title>
</head>
<body>
  <h1>Pancake Recipe</h1>
  <h2>Ingredients</h2>
  <p>Flour</p>
  <p>Eggs</p>
  <p>Milk</p>
  <p>Butter</p>
  <h2>Steps</h2>
  <p>Mix dry ingredients together.</p>
  <p>Add wet ingredients and stir until smooth.</p>
  <p>Heat a pan over medium heat.</p>
  <p>Pour batter and cook until bubbles form, then flip.</p>
</body>
</html>`,
    },
    {
      id: 'hf-07-description-lists',
      shortTitle: '7 · Description lists',
      title: 'Key-value pairs with dl, dt, dd',
      blocks: [
        {
          type: 'p',
          text: 'A description list (<dl>) groups terms and their descriptions. Think of it as a glossary, FAQ, or metadata display. Each term is a <dt> (description term) and each description is a <dd> (description details). One term can have multiple descriptions, and multiple terms can share a description.',
        },
        {
          type: 'h3',
          text: 'When to reach for dl',
        },
        {
          type: 'ul',
          items: [
            'Glossaries and dictionaries.',
            'Metadata displays: "Author: Jane, Published: 2026".',
            'FAQ pages where each question is a term and each answer is a description.',
            'Any key-value pair display — dl is semantically richer than a table for this.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 nuance',
          text: 'Description lists are underused. Many developers default to <ul> or a table for key-value data. When the relationship is genuinely "term → definition/description," <dl> communicates that structure to assistive tech in a way neither alternative can.',
        },
      ],
      exercise:
        'Convert the list of terms and definitions into a proper <dl> with <dt> for each term and <dd> for each definition.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Description lists</title>
</head>
<body>
  <h1>Web Glossary</h1>
  <p><strong>HTML</strong></p>
  <p>HyperText Markup Language — the structure of web pages.</p>
  <p><strong>CSS</strong></p>
  <p>Cascading Style Sheets — controls how HTML elements look.</p>
  <p><strong>DOM</strong></p>
  <p>Document Object Model — the browser's tree representation of your HTML.</p>
</body>
</html>`,
    },
    {
      id: 'hf-08-links',
      shortTitle: '8 · Links',
      title: 'The anchor element and where it takes you',
      blocks: [
        {
          type: 'p',
          text: 'The <a> element (anchor) is how you create links. The href attribute is the destination. Links are the foundation of the web — they connect pages together and let users navigate. Getting links right is critical for accessibility, security, and how search engines discover your content.',
        },
        {
          type: 'h3',
          text: 'Link fundamentals',
        },
        {
          type: 'ul',
          items: [
            'href — the URL to navigate to. Can be absolute (https://…), relative (/about), or a fragment (#section).',
            'target="_blank" — opens in a new tab. Always pair with rel="noopener noreferrer" for security.',
            'Link text — the clickable words. Must describe the destination. "Click here" is never acceptable.',
            'Skip links — a link at the very top of the page that jumps keyboard users to the main content.',
          ],
        },
        {
          type: 'callout',
          title: 'Why link text matters',
          text: 'Screen readers can list all links on a page. If every link says "click here" or "read more," that list is useless. A PE7 review will always flag vague link text.',
        },
      ],
      exercise:
        'Fix the link text to describe where each link goes. Add rel="noopener noreferrer" to the external link. Add a skip link at the top of body that points to the main element\'s id.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Links</title>
</head>
<body>
  <header>
    <h1>DevPath</h1>
    <nav>
      <a href="/learn">Click here</a>
      <a href="/projects">Here</a>
      <a href="https://github.com" target="_blank">Link</a>
    </nav>
  </header>
  <main>
    <p>Links are the web's connective tissue.</p>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M3 · Media (9-11)                                                 */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-09-images',
      shortTitle: '9 · Images',
      title: 'img, alt text, and layout stability',
      blocks: [
        {
          type: 'p',
          text: 'The <img> element embeds an image. It is a void element — no closing tag. The src attribute points to the image file and the alt attribute provides a text alternative for screen readers, search engines, and when the image fails to load.',
        },
        {
          type: 'h3',
          text: 'Alt text rules',
        },
        {
          type: 'ul',
          items: [
            'If the image conveys information: describe what it shows. "Team photo at Lisbon offsite" not "image".',
            'If the image is purely decorative: use alt="" (empty string). The screen reader skips it.',
            'Never start with "image of" or "picture of" — the screen reader already announces it as an image.',
            'If the image contains text: the alt should include that text.',
          ],
        },
        {
          type: 'h3',
          text: 'Width, height, and CLS',
        },
        {
          type: 'p',
          text: 'Always set width and height attributes on <img>. The browser uses them to reserve space before the image loads, preventing the page from jumping around (Cumulative Layout Shift). This is both a user experience win and a quality signal.',
        },
      ],
      exercise:
        'Add meaningful alt text to the content image. Set alt="" on the decorative divider. Add width and height attributes to both images (use 800x450 for the photo and 600x4 for the divider).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Images</title>
</head>
<body>
  <main>
    <h1>Our Team</h1>
    <img src="https://picsum.photos/seed/team/800/450" />
    <img src="https://picsum.photos/seed/line/600/4" />
    <p>We build tools for developers who care about quality.</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-10-figure',
      shortTitle: '10 · Figure & caption',
      title: 'Self-contained content with figure and figcaption',
      blocks: [
        {
          type: 'p',
          text: 'The <figure> element wraps self-contained content that is referenced from the main flow — images, diagrams, code listings, charts. The <figcaption> is its optional caption and is associated with the figure for assistive tech.',
        },
        {
          type: 'h3',
          text: 'When to use figure',
        },
        {
          type: 'ul',
          items: [
            'An image with a caption that explains it.',
            'A code sample that is referenced in the surrounding text.',
            'A diagram, chart, or illustration.',
            'A quote (blockquote) with attribution in figcaption.',
          ],
        },
        {
          type: 'p',
          text: 'The key test: could this content be moved to an appendix or sidebar without breaking the surrounding text? If yes, <figure> is appropriate. The figcaption can appear as the first or last child of figure.',
        },
        {
          type: 'callout',
          title: 'PE7 distinction',
          text: 'Not every image needs <figure>. An inline illustration that is part of the text flow (like an icon or avatar) should be a plain <img>. Use <figure> when the content is a referenced unit with optional captioning.',
        },
      ],
      exercise:
        'Wrap the photo and its caption text in a <figure> with <figcaption>. Wrap the code sample and its description in a second <figure>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Figure</title>
</head>
<body>
  <main>
    <h1>Project documentation</h1>
    <img src="https://picsum.photos/seed/arch/600/340" alt="System architecture diagram" width="600" height="340" />
    <p>Figure 1: High-level architecture of the notification service.</p>
    <pre><code>const notify = (msg) =&gt; channel.send(msg);</code></pre>
    <p>Listing 1: The core notification function.</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-11-media',
      shortTitle: '11 · Audio & video',
      title: 'Embedding media that everyone can use',
      blocks: [
        {
          type: 'p',
          text: 'The <audio> and <video> elements let you embed media directly in HTML. Both support multiple <source> children so the browser can pick the best format it supports. Accessibility requires text alternatives — captions for video, transcripts for audio.',
        },
        {
          type: 'h3',
          text: 'Common attributes',
        },
        {
          type: 'ul',
          items: [
            'controls — shows the browser\'s built-in play/pause/volume UI. Always include this.',
            'preload="metadata" — loads only the duration and dimensions, not the full file.',
            'poster (video only) — an image shown before the video plays.',
            '<source src="…" type="video/mp4"> — specify format so the browser picks what it supports.',
            '<track kind="captions" src="…" srclang="en"> — provides captions for deaf/hard-of-hearing users.',
          ],
        },
        {
          type: 'callout',
          title: 'Accessibility requirement',
          text: 'Video without captions fails WCAG 1.2.2. Audio without a transcript fails WCAG 1.2.1. A principal engineer ensures every media element has a text alternative before shipping.',
        },
      ],
      exercise:
        'Add the controls attribute to both the audio and video elements. Add a <source> with type to each. Add fallback text between the tags ("Your browser does not support…"). On the video, add a poster attribute (use any image URL).',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Media</title>
</head>
<body>
  <main>
    <h1>Media elements</h1>
    <h2>Podcast episode</h2>
    <audio>
      <source src="podcast.mp3" />
    </audio>
    <h2>Demo video</h2>
    <video width="640" height="360">
      <source src="demo.mp4" />
    </video>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M4 · Tables (12-13)                                               */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-12-tables-basic',
      shortTitle: '12 · Tables basics',
      title: 'Rows, cells, and when tables are the right choice',
      blocks: [
        {
          type: 'p',
          text: 'Tables are for tabular data — information that belongs in rows and columns, like a spreadsheet, a schedule, or a comparison chart. Tables are not for page layout (that died in the early 2000s). Using a table for layout confuses screen readers, which announce "table with 3 rows and 4 columns" — misleading when the "table" is actually a page grid.',
        },
        {
          type: 'h3',
          text: 'Core table elements',
        },
        {
          type: 'ul',
          items: [
            '<table> — the container for all table content.',
            '<tr> — a table row.',
            '<th> — a header cell. By default bold and centered. Announces as a header to screen readers.',
            '<td> — a data cell. Regular content.',
            '<caption> — a visible title for the table. Always include one.',
          ],
        },
        {
          type: 'callout',
          title: 'Why caption matters',
          text: 'The <caption> element is the table\'s accessible name. Without it, a screen reader user encounters a table with no context for what data it contains. A PE7 review always checks for caption.',
        },
      ],
      exercise:
        'The starter has data in divs. Convert it into a proper <table> with <caption>, a header row using <th>, and data rows using <td>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tables</title>
</head>
<body>
  <main>
    <h1>Team roster</h1>
    <div>
      <div>Name — Role — Location</div>
      <div>Ana — Engineer — Lisbon</div>
      <div>Ben — Designer — London</div>
      <div>Cal — PM — New York</div>
    </div>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-13-tables-advanced',
      shortTitle: '13 · Tables advanced',
      title: 'Scope, thead, tbody, tfoot — tables screen readers love',
      blocks: [
        {
          type: 'p',
          text: 'For simple tables, the browser can infer which headers belong to which cells. For complex tables (merged cells, multi-level headers), you need the scope attribute on <th> to tell assistive tech the direction: scope="col" for column headers, scope="row" for row headers.',
        },
        {
          type: 'h3',
          text: 'Structural grouping',
        },
        {
          type: 'ul',
          items: [
            '<thead> — wraps the header row(s). Browsers may repeat it when printing across pages.',
            '<tbody> — wraps the body rows. Can have multiple tbody groups.',
            '<tfoot> — wraps footer rows (totals, summaries). Renders at the bottom.',
          ],
        },
        {
          type: 'p',
          text: 'These elements do not change the visual layout by default but provide structure. Screen readers use them to navigate large tables — "jump to next row group" is a real command.',
        },
        {
          type: 'callout',
          title: 'PE7 habit',
          text: 'Every table in a PE7 review has: <caption>, <thead>/<tbody>, scope on th elements, and no layout abuse. If you see a table without these, fix it before shipping.',
        },
      ],
      exercise:
        'Add <thead>, <tbody>, and <tfoot> to the table. Add scope="col" to the column headers and scope="row" to the row headers. Add a <caption>.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Advanced tables</title>
</head>
<body>
  <main>
    <h1>Quarterly sales</h1>
    <table>
      <tr>
        <th>Region</th>
        <th>Q1</th>
        <th>Q2</th>
        <th>Q3</th>
      </tr>
      <tr>
        <th>North</th>
        <td>$12k</td>
        <td>$15k</td>
        <td>$18k</td>
      </tr>
      <tr>
        <th>South</th>
        <td>$9k</td>
        <td>$11k</td>
        <td>$14k</td>
      </tr>
      <tr>
        <th>Total</th>
        <td>$21k</td>
        <td>$26k</td>
        <td>$32k</td>
      </tr>
    </table>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M5 · Forms (14-17)                                                */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-14-form-inputs',
      shortTitle: '14 · Form inputs',
      title: 'Input types and the label contract',
      blocks: [
        {
          type: 'p',
          text: 'Forms collect data from users. The <form> element is the container; <input> elements are the controls. Every input must have a programmatic label so assistive tech can announce what the field is for. Without a label, a screen reader user hears "edit text, blank" — useless.',
        },
        {
          type: 'h3',
          text: 'Input types you will use constantly',
        },
        {
          type: 'ul',
          items: [
            'type="text" — single-line text (the default).',
            'type="email" — validates email format; mobile keyboards show @.',
            'type="password" — masks input; never send over HTTP.',
            'type="number" — numeric input with increment/decrement.',
            'type="tel" — phone number; mobile shows a numeric keypad.',
            'type="url" — validates URL format.',
            'type="search" — semantic search field; may show a clear button.',
          ],
        },
        {
          type: 'callout',
          title: 'The label rule',
          text: 'Use <label for="id"> matched to the input\'s id, or wrap the input inside the label. The for/id pattern is more robust across assistive tech. A principal engineer treats unlabeled inputs as a bug, not a style issue.',
        },
      ],
      exercise:
        'Associate every input with a <label> using the for/id pattern. Add appropriate type attributes (email for the email field, password for the password field). Add the name attribute to each input.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Form inputs</title>
</head>
<body>
  <main>
    <h1>Sign in</h1>
    <form action="/login" method="post">
      <p>Email</p>
      <input />
      <p>Password</p>
      <input />
      <button type="submit">Sign in</button>
    </form>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-15-select-textarea',
      shortTitle: '15 · Select & textarea',
      title: 'Dropdowns, multi-line text, and datalist',
      blocks: [
        {
          type: 'p',
          text: 'Not all input is a single text line. <select> gives the user a dropdown of predefined choices. <textarea> accepts multi-line text. <datalist> offers autocomplete suggestions while still allowing free-form input.',
        },
        {
          type: 'h3',
          text: 'Element patterns',
        },
        {
          type: 'ul',
          items: [
            '<select> contains <option> elements. Add a disabled first option as a placeholder prompt.',
            '<textarea> — set rows and cols for initial size. The name attribute is required for form submission.',
            '<datalist> is linked to an <input> via the list attribute. The input shows suggestions but accepts any value.',
            '<optgroup> groups options inside a select with a label attribute.',
          ],
        },
        {
          type: 'callout',
          title: 'When not to use select',
          text: 'If you have fewer than 5 options, radio buttons are often better UX — all choices are visible without interaction. A select with 2 options ("Yes" / "No") is almost always better as a checkbox or radio pair.',
        },
      ],
      exercise:
        'Add a <label> to the select and textarea. Add a disabled placeholder option to the select. Create a datalist with at least 3 suggestions and link it to the "skills" input using the list attribute.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Select and textarea</title>
</head>
<body>
  <main>
    <h1>Profile</h1>
    <form>
      <select name="role">
        <option value="frontend">Front-end</option>
        <option value="backend">Back-end</option>
        <option value="fullstack">Full-stack</option>
        <option value="design">Design</option>
      </select>
      <textarea name="bio"></textarea>
      <input type="text" name="skills" placeholder="Add a skill" />
      <button type="submit">Save</button>
    </form>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-16-fieldset-validation',
      shortTitle: '16 · Fieldset & validation',
      title: 'Grouping controls and built-in validation',
      blocks: [
        {
          type: 'p',
          text: '<fieldset> groups related form controls and <legend> provides the group\'s label. This is critical for radio buttons and checkboxes — without a fieldset/legend, a screen reader user hears each radio in isolation with no group context.',
        },
        {
          type: 'h3',
          text: 'Built-in validation',
        },
        {
          type: 'ul',
          items: [
            'required — the field must be filled before submission. The browser shows a native message.',
            'minlength / maxlength — character count constraints for text inputs.',
            'min / max — range constraints for number and date inputs.',
            'pattern — a regex the value must match (use with title to explain the expected format).',
            'The :valid and :invalid CSS pseudo-classes let you style validation state.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 perspective on validation',
          text: 'Native validation is a first line of defense, not a security boundary. Always validate on the server too. But skipping native validation means users get no feedback until the server round-trip — that is bad UX a principal flags.',
        },
      ],
      exercise:
        'Wrap the radio buttons in a <fieldset> with a <legend>. Add the required attribute to the email input. Add minlength="8" to the password input. Add pattern and title to the username input requiring only letters and numbers.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Fieldset and validation</title>
</head>
<body>
  <main>
    <h1>Create account</h1>
    <form action="/signup" method="post">
      <label for="user">Username</label>
      <input type="text" id="user" name="user" />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" />
      <label for="pass">Password</label>
      <input type="password" id="pass" name="pass" />
      <p>Choose your plan:</p>
      <label><input type="radio" name="plan" value="free" /> Free</label>
      <label><input type="radio" name="plan" value="pro" /> Pro</label>
      <label><input type="radio" name="plan" value="team" /> Team</label>
      <button type="submit">Sign up</button>
    </form>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-17-form-patterns',
      shortTitle: '17 · Form patterns',
      title: 'PE7 form habits that survive production',
      blocks: [
        {
          type: 'p',
          text: 'Beyond individual elements, there are form patterns that separate junior code from principal-grade code. These patterns improve accessibility, autofill accuracy, and maintenance.',
        },
        {
          type: 'h3',
          text: 'Patterns to always apply',
        },
        {
          type: 'ul',
          items: [
            'Use autocomplete attributes: "email", "given-name", "family-name", "current-password", "new-password" — password managers and autofill depend on these.',
            'Buttons inside forms default to type="submit". If a button should not submit, use type="button" explicitly.',
            'Use inputmode for mobile keyboards: inputmode="numeric" shows numbers, inputmode="url" shows the URL keyboard.',
            'Group error messages with aria-describedby linking the error to the input.',
          ],
        },
        {
          type: 'callout',
          title: 'Principal engineer grep',
          text: 'Grep for <button> inside <form> without an explicit type. If it is not a submit, it must say type="button". Implicit submit is one of the most common form bugs.',
        },
        {
          type: 'p',
          text: 'Also consider the method attribute: GET is for search-like forms (the query ends up in the URL, which is useful). POST is for forms that create or change data (sign up, checkout).',
        },
      ],
      exercise:
        'Add autocomplete attributes to the name and email fields. Change the "Cancel" button to type="button" so it does not submit. Add inputmode="email" to the email field. Add aria-describedby on the password input linking it to the hint paragraph\'s id.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Form patterns</title>
</head>
<body>
  <main>
    <h1>Contact us</h1>
    <form action="/contact" method="post">
      <label for="name">Full name</label>
      <input type="text" id="name" name="name" required />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />
      <label for="pw">Password</label>
      <input type="password" id="pw" name="pw" minlength="8" required />
      <p>At least 8 characters, mix letters and numbers.</p>
      <label for="msg">Message</label>
      <textarea id="msg" name="msg" rows="4" required></textarea>
      <button>Cancel</button>
      <button type="submit">Send</button>
    </form>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M6 · Inline semantics (18-19)                                     */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-18-emphasis-importance',
      shortTitle: '18 · Emphasis & importance',
      title: 'strong, em, mark, small — meaning, not style',
      blocks: [
        {
          type: 'p',
          text: 'Inline semantic elements add meaning within a sentence. <strong> signals importance (not just bold). <em> signals emphasis (not just italic). Using CSS for bold/italic is purely visual; these elements carry meaning that screen readers convey through voice changes.',
        },
        {
          type: 'h3',
          text: 'The elements',
        },
        {
          type: 'ul',
          items: [
            '<strong> — strong importance, urgency, or seriousness. Read with stress by screen readers.',
            '<em> — emphatic stress. Changes the meaning of a sentence: "I did not say she stole it" vs "I did not say she stole it."',
            '<mark> — highlighted text, typically for search results or references. Not the same as visual highlighting for decoration.',
            '<small> — side comments, fine print, legal text. Not for making text visually smaller.',
            '<sub> / <sup> — subscript (H₂O) and superscript (x²). Use for chemical formulas, footnotes, math.',
          ],
        },
        {
          type: 'callout',
          title: 'PE7 distinction',
          text: '<b> and <i> exist but carry no semantic weight — they are presentational. If the bold or italic conveys meaning (a warning, a book title, a foreign phrase), use <strong>, <cite>, or <i> with a class. If it is purely decorative, use CSS font-weight or font-style.',
        },
      ],
      exercise:
        'Replace the <b> tag around "Warning" with <strong>. Replace the <i> tag around the emphasized phrase with <em>. Wrap the fine print in <small>. Use <mark> on the search term.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Inline semantics</title>
</head>
<body>
  <main>
    <h1>Search results for "accessibility"</h1>
    <p><b>Warning:</b> this action cannot be undone.</p>
    <p>We <i>strongly recommend</i> reading the documentation first.</p>
    <p>Found 3 results matching accessibility in the archive.</p>
    <p>Terms of service apply. See section 4.2 for details.</p>
  </main>
</body>
</html>`,
    },
    {
      id: 'hf-19-code-time-abbr',
      shortTitle: '19 · Code, time, abbr',
      title: 'Technical inline elements for precise markup',
      blocks: [
        {
          type: 'p',
          text: 'HTML has purpose-built inline elements for code, keyboard input, dates, abbreviations, and citations. Using them correctly helps documentation tools, search engines, and assistive tech understand your content at a granular level.',
        },
        {
          type: 'h3',
          text: 'The elements',
        },
        {
          type: 'ul',
          items: [
            '<code> — inline code: variable names, function names, short snippets. Usually rendered in monospace.',
            '<kbd> — keyboard input: <kbd>Ctrl</kbd>+<kbd>S</kbd>. Tells the reader "press this key."',
            '<samp> — sample output from a program.',
            '<var> — a variable in a mathematical or programming context.',
            '<abbr title="…"> — an abbreviation. The title shows the expansion on hover and to screen readers.',
            '<time datetime="…"> — a date/time in machine-readable format. Browsers and tools can parse it.',
            '<cite> — the title of a creative work (book, article, film). Not for the author name.',
          ],
        },
        {
          type: 'callout',
          title: 'Why <time> matters',
          text: 'The datetime attribute on <time> lets machines parse dates regardless of how you display them: "April 10, 2026" to the user, datetime="2026-04-10" for the machine. Search features, calendars, and translation tools use this.',
        },
      ],
      exercise:
        'Wrap the function name in <code>. Wrap the keyboard shortcut keys in <kbd>. Change the date to a <time> element with a datetime attribute. Add an <abbr> with a title for "HTML".',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Technical inline elements</title>
</head>
<body>
  <main>
    <h1>Developer notes</h1>
    <p>Call the fetchData function to load the API response.</p>
    <p>Save your work with Ctrl+S before closing.</p>
    <p>Published on April 10, 2026.</p>
    <p>HTML is the foundation of every web page.</p>
  </main>
</body>
</html>`,
    },

    /* ------------------------------------------------------------------ */
    /*  M7 · Head and meta (20)                                           */
    /* ------------------------------------------------------------------ */
    {
      id: 'hf-20-head-meta',
      shortTitle: '20 · Head & meta',
      title: 'Everything invisible that makes the page work',
      blocks: [
        {
          type: 'p',
          text: 'The <head> element contains metadata — information about the page that is not visible content. This is where you declare the character set, viewport behavior, page title, description, linked stylesheets, favicons, and more. Getting the head right is a PE7 concern because it affects rendering, SEO, social sharing, and performance.',
        },
        {
          type: 'h3',
          text: 'Essential head elements',
        },
        {
          type: 'ul',
          items: [
            '<meta charset="utf-8"> — must be in the first 1024 bytes of the document.',
            '<meta name="viewport" content="width=device-width, initial-scale=1"> — required for mobile.',
            '<title> — shown in the tab, bookmarks, and search results. Keep under ~60 characters.',
            '<meta name="description" content="…"> — a page summary for search snippets. Keep under ~155 characters.',
            '<link rel="stylesheet" href="…"> — external CSS. Render-blocking unless handled.',
            '<link rel="icon" href="…"> — favicon shown in the tab.',
            '<base href="…"> — sets the base URL for all relative links (rarely needed, use with care).',
          ],
        },
        {
          type: 'callout',
          title: 'Order matters',
          text: 'charset should be the very first meta in head. Viewport should follow. Title and description come next. Stylesheets go after metadata. This order ensures the browser interprets the document correctly before applying styles.',
        },
      ],
      exercise:
        'The head is out of order and missing elements. Reorder so charset is first, then viewport. Add a <meta name="description"> with a meaningful description. Add a favicon link. Give the page a specific title under 60 characters.',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main>
    <h1>DevPath learning platform</h1>
    <p>Learn web development from zero to principal engineer.</p>
  </main>
</body>
</html>`,
    },
  ],
};
