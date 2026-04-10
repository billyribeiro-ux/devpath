import { useDeferredValue, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buildAcademyHtmlPreviewSrcDoc } from '@/lib/livePreviewHtml';
import { showDevpathToast } from '@/lib/devpathToast';
import type { AcademyTrack, LessonBlock } from '@/academy/types';
import {
  CaretLeft,
  CaretRight,
  ArrowsClockwise,
  Copy,
  Check,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  track: AcademyTrack;
};

function renderBlock(block: LessonBlock, i: number) {
  switch (block.type) {
    case 'h3':
      return (
        <h3 key={i} className="font-display text-base font-semibold text-primary-light mt-4 first:mt-0">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={i} className="text-sm text-secondary-light leading-relaxed">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="list-disc pl-5 text-sm text-secondary-light space-y-1.5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div
          key={i}
          className="rounded-lg border border-neon/30 bg-neon/5 px-3 py-2.5 mt-3"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-neon mb-1">
            {block.title}
          </p>
          <p className="text-xs text-secondary-light leading-relaxed">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function AcademyDialog({ open, onOpenChange, track }: Props) {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [html, setHtml] = useState(() => track.lessons[0].starterHtml);
  const [copied, setCopied] = useState(false);
  const deferredHtml = useDeferredValue(html);

  const lesson = track.lessons[lessonIndex];
  const total = track.lessons.length;

  const goLesson = (nextIndex: number) => {
    const i = Math.max(0, Math.min(total - 1, nextIndex));
    setLessonIndex(i);
    setHtml(track.lessons[i].starterHtml);
  };

  const srcDoc = useMemo(
    () =>
      buildAcademyHtmlPreviewSrcDoc(deferredHtml, {
        allowJsonLdScripts: track.allowJsonLdScriptsInPreview === true,
      }),
    [deferredHtml, track.allowJsonLdScriptsInPreview]
  );

  const lineCount = Math.max(12, html.split('\n').length);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showDevpathToast('Copy failed', 'Clipboard not available.', 'error');
    }
  };

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
            {track.dialogTitle}
          </DialogTitle>
          <p className="text-xs font-mono text-neon/90">
            Lesson {lessonIndex + 1} of {total} · {lesson.shortTitle}
          </p>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* Narrative */}
          <div className="flex w-full shrink-0 flex-col border-white/10 lg:w-[38%] lg:border-r">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <h2 className="font-display text-xl font-semibold text-primary-light mb-3">
                {lesson.title}
              </h2>
              {lesson.blocks.map((b, i) => renderBlock(b, i))}
              <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-neon mb-2">
                  Your task
                </p>
                <p className="text-sm text-secondary-light leading-relaxed">
                  {lesson.exercise}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 border-t border-white/10 px-4 py-3">
              <button
                type="button"
                disabled={lessonIndex <= 0}
                onClick={() => goLesson(lessonIndex - 1)}
                className="btn-ghost flex items-center gap-1 text-xs disabled:opacity-40"
              >
                <CaretLeft size={16} />
                Previous
              </button>
              <button
                type="button"
                disabled={lessonIndex >= total - 1}
                onClick={() => goLesson(lessonIndex + 1)}
                className="btn-neon ml-auto flex items-center gap-1 text-xs disabled:opacity-40"
              >
                Next
                <CaretRight size={16} />
              </button>
            </div>
          </div>

          {/* Editor + preview */}
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
                      title="Reset starter"
                      onClick={() => setHtml(lesson.starterHtml)}
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
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
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
                  title="HTML preview"
                  className="min-h-0 flex-1 w-full border-0 bg-white"
                  sandbox=""
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
