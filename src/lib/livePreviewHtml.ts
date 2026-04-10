/**
 * Build isolated iframe srcdoc for live HTML/CSS previews.
 * Escapes patterns that would break out of <style> or execute script in srcdoc.
 */
export function escapeClosingStyleTags(css: string): string {
  return css.replace(/<\/style/gi, '<\\/style');
}

export function escapeClosingScriptTags(html: string): string {
  return html.replace(/<\/script/gi, '<\\/script');
}

/** Neutralize real <script> tags in learner HTML (preview is not a JS sandbox). */
export function neutralizeScriptOpenTags(html: string): string {
  return html.replace(/<script/gi, '&lt;script');
}

const tryItPreviewBaseCss = `
*,*::before,*::after{box-sizing:border-box}
html,body{height:100%;margin:0}
body{background:#0b0f16;color:#e4e9f2;font-family:ui-sans-serif,system-ui,sans-serif;padding:1rem;line-height:1.5}
.preview-cell{
  display:flex;align-items:center;justify-content:center;min-height:3.5rem;padding:1rem;text-align:center;
  font-size:0.875rem;font-weight:500;border:1px solid rgba(255,255,255,0.12);border-radius:0.75rem;
  background:linear-gradient(135deg,rgba(57,255,20,0.15),rgba(57,255,20,0.05));
}
.preview-cell:nth-child(2){background:linear-gradient(135deg,rgba(96,165,250,0.2),rgba(96,165,250,0.08))}
.preview-cell:nth-child(3){background:linear-gradient(135deg,rgba(192,132,252,0.2),rgba(192,132,252,0.08))}
.preview-cell:nth-child(4){background:linear-gradient(135deg,rgba(244,114,182,0.2),rgba(244,114,182,0.08))}
`;

export function buildCssOnlyPreviewSrcDoc(userCss: string, bodyMarkup: string): string {
  const css = escapeClosingStyleTags(userCss);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>${tryItPreviewBaseCss}</style>
<style>${css}</style></head><body>${bodyMarkup}</body></html>`;
}

export function buildHtmlCssPreviewSrcDoc(userHtml: string, userCss: string): string {
  const css = escapeClosingStyleTags(userCss);
  const html = neutralizeScriptOpenTags(escapeClosingScriptTags(userHtml));
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
*,*::before,*::after{box-sizing:border-box}
html,body{min-height:100%;margin:0}
</style>
<style>${css}</style></head><body>${html}</body></html>`;
}

/**
 * Preview learner-written HTML body fragment in an isolated iframe (no script execution).
 * Uses a readable default page background for semantic markup exercises.
 */
export function buildLearnerHtmlFragmentPreviewSrcDoc(bodyHtml: string): string {
  const safe = neutralizeScriptOpenTags(escapeClosingScriptTags(bodyHtml));
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="description" content="Academy preview — your semantic HTML practice."/>
<title>Academy preview</title>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:1.25rem;font-family:system-ui,-apple-system,sans-serif;line-height:1.6;background:#f4f4f5;color:#111}
</style></head><body>${safe}</body></html>`;
}

/**
 * Academy: learner edits a full HTML document — use as iframe srcdoc after neutralizing scripts.
 */
export function buildAcademyHtmlPreviewSrcDoc(
  fullDocumentHtml: string,
  options?: { allowJsonLdScripts?: boolean }
): string {
  if (options?.allowJsonLdScripts) {
    return sanitizeHtmlAllowingJsonLd(fullDocumentHtml);
  }
  return neutralizeScriptOpenTags(escapeClosingScriptTags(fullDocumentHtml));
}

/** User lab: full document preview. Safe mode strips scripts; scripts mode runs JS in a sandboxed iframe. */
export type ProjectLabPreviewMode = 'safe' | 'scripts';

export function buildProjectHtmlPreviewSrcDoc(
  fullDocumentHtml: string,
  mode: ProjectLabPreviewMode
): string {
  if (mode === 'scripts') {
    return escapeClosingScriptTags(fullDocumentHtml);
  }
  return buildAcademyHtmlPreviewSrcDoc(fullDocumentHtml);
}

/**
 * Strip executable scripts; keep only script type="application/ld+json" for structured-data lessons.
 * JSON-LD blocks are extracted before escapeClosingScriptTags so real closing tags stay intact.
 */
function sanitizeHtmlAllowingJsonLd(html: string): string {
  const blocks: string[] = [];
  const token = (idx: number) => `<!--__ACADEMY_LD_JSON_${idx}__-->`;
  let n = 0;
  const withHolders = html.replace(
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    (m) => {
      const t = token(n);
      blocks[n] = m;
      n += 1;
      return t;
    }
  );
  let s = neutralizeScriptOpenTags(escapeClosingScriptTags(withHolders));
  blocks.forEach((block, idx) => {
    s = s.replace(token(idx), block);
  });
  return s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (block) => {
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(block)) return block;
    return '<!-- preview: script removed -->';
  });
}

/** Hint string for Try-it footer from learner CSS. */
export function detectGridModeSnippet(css: string): string {
  if (/auto-fit/i.test(css)) return 'auto-fit';
  if (/auto-fill/i.test(css)) return 'auto-fill';
  if (/subgrid/i.test(css)) return 'subgrid';
  if (/grid-template-columns/i.test(css)) return 'grid';
  return 'CSS';
}
