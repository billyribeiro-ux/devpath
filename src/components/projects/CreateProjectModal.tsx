import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buildProjectHtmlPreviewSrcDoc } from '@/lib/livePreviewHtml';
import { showDevpathToast } from '@/lib/devpathToast';
import {
  useAppStore,
  type LabProject,
  type LabProjectType,
} from '@/store/appStore';
import {
  ArrowsClockwise,
  Copy,
  Check,
  FloppyDisk,
  Plus,
  Trash,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TYPE_OPTIONS: { value: LabProjectType; label: string; hint: string }[] = [
  { value: 'html', label: 'HTML', hint: 'Markup only; scripts are not run in preview.' },
  { value: 'html-css', label: 'HTML + CSS', hint: 'Full page with styles; scripts not run.' },
  {
    value: 'html-css-js',
    label: 'HTML + CSS + JS',
    hint: 'Interactive preview runs in a sandboxed iframe (your code only).',
  },
];

const STARTERS: Record<LabProjectType, string> = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My page</title>
</head>
<body>
  <main>
    <h1>Hello</h1>
    <p>Edit this document.</p>
  </main>
</body>
</html>`,
  'html-css': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My page</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      min-height: 100vh;
      background: #f4f4f5;
      color: #111;
      padding: 2rem;
    }
    h1 { color: #0b0f16; }
  </style>
</head>
<body>
  <h1>Hello</h1>
  <p>Change the HTML and CSS.</p>
</body>
</html>`,
  'html-css-js': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My page</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      min-height: 100vh;
      background: #0b0f16;
      color: #e4e9f2;
      padding: 2rem;
    }
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(57, 255, 20, 0.4);
      background: rgba(57, 255, 20, 0.12);
      color: #b8ff9a;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1 id="title">Hello</h1>
  <button type="button" id="btn">Run JS</button>
  <script>
    document.getElementById('btn').addEventListener('click', function () {
      document.getElementById('title').textContent = 'From JavaScript';
    });
  </script>
</body>
</html>`,
};

function previewModeForType(t: LabProjectType): 'safe' | 'scripts' {
  return t === 'html-css-js' ? 'scripts' : 'safe';
}

export default function CreateProjectModal({ open, onOpenChange }: Props) {
  const labProjects = useAppStore((s) => s.labProjects);
  const addLabProject = useAppStore((s) => s.addLabProject);
  const updateLabProject = useAppStore((s) => s.updateLabProject);
  const removeLabProject = useAppStore((s) => s.removeLabProject);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState<LabProjectType>('html-css');
  const [code, setCode] = useState(STARTERS['html-css']);
  const [copied, setCopied] = useState(false);

  const deferredCode = useDeferredValue(code);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadProject = useCallback((p: LabProject) => {
    setEditingId(p.id);
    setProjectName(p.name);
    setProjectType(p.type);
    setCode(p.code);
  }, []);

  const startNewDraft = useCallback(() => {
    setEditingId(null);
    setProjectName('');
    setProjectType('html-css');
    setCode(STARTERS['html-css']);
  }, []);

  const srcDoc = useMemo(
    () =>
      buildProjectHtmlPreviewSrcDoc(deferredCode, previewModeForType(projectType)),
    [deferredCode, projectType]
  );

  const lineCount = Math.max(12, code.split('\n').length);

  const persistPatch = useCallback(
    (patch: Partial<Pick<LabProject, 'name' | 'type' | 'code'>>) => {
      if (!editingId) return;
      updateLabProject(editingId, patch);
    },
    [editingId, updateLabProject]
  );

  useEffect(() => {
    if (!editingId || !open) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      persistPatch({ name: projectName, type: projectType, code });
    }, 500);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [editingId, open, projectName, projectType, code, persistPatch]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showDevpathToast('Copy failed', 'Clipboard not available.', 'error');
    }
  };

  const handleSaveNew = () => {
    const name = projectName.trim();
    if (!name) {
      showDevpathToast('Name required', 'Add a project name before saving.', 'error');
      return;
    }
    const created = addLabProject({ name, type: projectType, code });
    setEditingId(created.id);
    showDevpathToast('Saved', `"${created.name}" is in your projects list.`, 'success');
  };

  const handleResetStarter = () => {
    setCode(STARTERS[projectType]);
    if (editingId) persistPatch({ code: STARTERS[projectType] });
  };

  const handleTypeChange = (next: LabProjectType) => {
    setProjectType(next);
    if (editingId) updateLabProject(editingId, { type: next });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this project from your list?')) return;
    removeLabProject(id);
    if (editingId === id) startNewDraft();
    showDevpathToast('Removed', 'Project deleted.', 'info');
  };

  const iframeSandbox =
    projectType === 'html-css-js' ? 'allow-scripts' : '';

  const sortedProjects = useMemo(
    () => [...labProjects].sort((a, b) => b.updatedAt - a.updatedAt),
    [labProjects]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        overlayClassName="fixed inset-0 z-[310] bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        className={cn(
          'fixed z-[320] flex max-h-[min(900px,92vh)] w-[min(1360px,calc(100vw-1.25rem))] max-w-none translate-x-[-50%] translate-y-[-50%] flex-col gap-0 overflow-hidden border border-white/10 bg-[rgba(10,12,18,0.97)] p-0 text-primary-light shadow-2xl sm:max-w-none'
        )}
      >
        <DialogHeader className="shrink-0 border-b border-white/10 px-5 py-4 text-left">
          <DialogTitle className="font-display text-lg tracking-tight text-primary-light">
            Project lab
          </DialogTitle>
          <p className="text-xs font-mono text-neon/90">
            {editingId ? 'Editing saved project · autosaves' : 'New draft · save to keep'}
          </p>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="flex w-full shrink-0 flex-col border-white/10 lg:w-[38%] lg:border-r">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neon mb-1.5">
                  Project name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Landing hero"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-primary-light placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neon mb-1.5">
                  Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) =>
                    handleTypeChange(e.target.value as LabProjectType)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-primary-light focus:border-neon/40 focus:outline-none"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-secondary-light leading-relaxed">
                  {TYPE_OPTIONS.find((o) => o.value === projectType)?.hint}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-neon mb-2">
                  My projects
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    type="button"
                    onClick={startNewDraft}
                    className="btn-ghost inline-flex items-center gap-1 text-xs"
                  >
                    <Plus size={14} />
                    New draft
                  </button>
                  {!editingId && (
                    <button
                      type="button"
                      onClick={handleSaveNew}
                      className="btn-neon inline-flex items-center gap-1 text-xs"
                    >
                      <FloppyDisk size={14} />
                      Save project
                    </button>
                  )}
                </div>
                {sortedProjects.length === 0 ? (
                  <p className="text-xs text-secondary-light">No saved projects yet.</p>
                ) : (
                  <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {sortedProjects.map((p) => (
                      <li
                        key={p.id}
                        className={cn(
                          'flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs transition-colors',
                          editingId === p.id
                            ? 'border-neon/40 bg-neon/10'
                            : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                        )}
                      >
                        <button
                          type="button"
                          className="min-w-0 flex-1 text-left font-mono text-primary-light truncate"
                          onClick={() => loadProject(p)}
                        >
                          {p.name}
                        </button>
                        <span className="shrink-0 text-[10px] uppercase text-secondary-light">
                          {p.type === 'html' ? 'html' : p.type === 'html-css' ? 'css' : 'js'}
                        </span>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(p.id)}
                          className="shrink-0 rounded p-1 text-secondary-light hover:bg-red-500/15 hover:text-red-300"
                        >
                          <Trash size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-h-[320px] flex-1 flex-col lg:min-h-0">
            <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-white/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              <div className="flex min-h-[220px] flex-col lg:min-h-0">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-secondary-light">
                    index.html
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      title="Reset to starter for this type"
                      onClick={handleResetStarter}
                      className="rounded p-1.5 text-secondary-light hover:bg-white/10 hover:text-neon"
                    >
                      <ArrowsClockwise size={16} />
                    </button>
                    <button
                      type="button"
                      title="Copy"
                      onClick={handleCopy}
                      className="rounded p-1.5 text-secondary-light hover:bg-white/10 hover:text-neon"
                    >
                      {copied ? <Check size={16} className="text-neon" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex min-h-0 flex-1">
                  <div
                    className="w-9 shrink-0 border-r border-white/10 bg-white/5 py-3 pr-1 text-right font-mono text-[10px] leading-[1.35rem] text-white/35 select-none"
                    aria-hidden
                  >
                    {Array.from({ length: lineCount }, (_, n) => (
                      <div key={n + 1}>{n + 1}</div>
                    ))}
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                    className="min-h-0 min-w-0 flex-1 resize-none bg-transparent p-3 font-mono text-xs leading-[1.35rem] text-primary-light focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex min-h-[200px] flex-col bg-[#f4f4f5] lg:min-h-0">
                <div className="flex items-center gap-2 border-b border-black/10 px-3 py-2 bg-white">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">
                    Live preview
                  </span>
                  <span className="text-[10px] text-neutral-400">updates as you type</span>
                </div>
                <iframe
                  key={projectType}
                  title="Project preview"
                  className="min-h-0 flex-1 w-full border-0 bg-white"
                  sandbox={iframeSandbox}
                  srcDoc={srcDoc}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
