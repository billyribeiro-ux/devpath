import type { LabProject, LabProjectType } from '@/store/appStore';
import {
  buildProjectHtmlPreviewSrcDoc,
  escapeClosingStyleTags,
  type ProjectLabPreviewMode,
} from '@/lib/livePreviewHtml';

/** All lab file paths (internal storage always has these keys). */
export const LAB_EDITOR_TABS = ['index.html', 'styles.css', 'script.js'] as const;
export type LabEditorTab = (typeof LAB_EDITOR_TABS)[number];

/** Editor tabs and mergeable assets for each project type. */
export function labEditorTabsForType(type: LabProjectType): LabEditorTab[] {
  switch (type) {
    case 'html':
      return ['index.html'];
    case 'html-css':
      return ['index.html', 'styles.css'];
    case 'html-css-js':
      return ['index.html', 'styles.css', 'script.js'];
  }
}

/**
 * Files passed into merge/preview for this type only.
 * Omitted keys are not inlined — external links in HTML show as preview comments.
 */
export function labFilesScopedForType(
  files: Record<string, string>,
  type: LabProjectType
): Record<string, string> {
  const out: Record<string, string> = {};
  out['index.html'] = files['index.html'] ?? '';
  if (type === 'html-css' || type === 'html-css-js') {
    out['styles.css'] = files['styles.css'] ?? '';
  }
  if (type === 'html-css-js') {
    out['script.js'] = files['script.js'] ?? '';
  }
  return out;
}

export function emptyLabFiles(): Record<string, string> {
  return {
    'index.html': '',
    'styles.css': '',
    'script.js': '',
  };
}

/** Normalize persisted project: legacy `code` → index.html; ensure tab keys exist. */
export function getLabProjectFiles(p: LabProject): Record<string, string> {
  const base = emptyLabFiles();
  if (p.files && Object.keys(p.files).length > 0) {
    for (const k of Object.keys(p.files)) {
      base[k] = p.files[k];
    }
    return base;
  }
  if (p.code != null && p.code !== '') {
    base['index.html'] = p.code;
  }
  return base;
}

function resolveLabPath(ref: string, files: Record<string, string>): string | undefined {
  const t = ref.trim().replace(/^\.\//, '').replace(/^\//, '');
  if (Object.prototype.hasOwnProperty.call(files, t)) return files[t];
  const leaf = t.split('/').pop();
  if (leaf && Object.prototype.hasOwnProperty.call(files, leaf)) return files[leaf];
  return undefined;
}

/**
 * Inline linked stylesheets and external scripts from `files` into the HTML document.
 * Supports `<link rel="stylesheet" href="styles.css">` and `<script src="script.js"></script>`.
 */
export function mergeLabFilesIntoHtml(
  html: string,
  files: Record<string, string>
): string {
  let out = html.replace(
    /<link\s+[^>]*rel\s*=\s*["']stylesheet["'][^>]*>/gi,
    (tag) => {
      const m = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i);
      if (!m) return tag;
      const resolved = resolveLabPath(m[1], files);
      if (resolved === undefined) {
        return `<!-- preview: missing stylesheet ${m[1]} -->`;
      }
      return `<style>\n${escapeClosingStyleTags(resolved)}\n</style>`;
    }
  );

  out = out.replace(
    /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>\s*<\/script>/gi,
    (_full, src: string) => {
      const resolved = resolveLabPath(src, files);
      if (resolved === undefined) {
        return `<!-- preview: missing script ${src} -->`;
      }
      return `<script>\n${resolved}\n</script>`;
    }
  );

  return out;
}

export function buildLabMultiFilePreviewSrcDoc(
  files: Record<string, string>,
  mode: ProjectLabPreviewMode,
  projectType: LabProjectType
): string {
  const scoped = labFilesScopedForType(files, projectType);
  const htmlEntry = scoped['index.html'] ?? '';
  const merged = mergeLabFilesIntoHtml(htmlEntry, scoped);
  return buildProjectHtmlPreviewSrcDoc(merged, mode);
}
