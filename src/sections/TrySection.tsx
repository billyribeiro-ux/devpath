import { useRef, useLayoutEffect, useState, useMemo, useDeferredValue } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowsClockwise, Eye, Play, 
  Copy, Check, Download, Share
} from '@phosphor-icons/react';
import { showDevpathToast } from '../lib/devpathToast';
import {
  buildCssOnlyPreviewSrcDoc,
  detectGridModeSnippet,
} from '../lib/livePreviewHtml';

gsap.registerPlugin(ScrollTrigger);

const initialCode = `.container {
  display: grid;
  grid-template-columns: repeat(
    auto-fit, 
    minmax(150px, 1fr)
  );
  gap: 1rem;
  padding: 1rem;
}`;

const previewBodyMarkup = `<div class="container">
  <div class="preview-cell">Item 1</div>
  <div class="preview-cell">Item 2</div>
  <div class="preview-cell">Item 3</div>
  <div class="preview-cell">Item 4</div>
</div>`;

export default function TrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [previewNonce, setPreviewNonce] = useState(0);
  const deferredCode = useDeferredValue(code);

  const previewSrcDoc = useMemo(
    () => buildCssOnlyPreviewSrcDoc(deferredCode, previewBodyMarkup),
    [deferredCode]
  );

  const lineCount = Math.max(8, code.split('\n').length);
  const gridHint = detectGridModeSnippet(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showDevpathToast('Copy failed', 'Could not access the clipboard.', 'error');
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setPreviewNonce((n) => n + 1);
    setTimeout(() => setIsRunning(false), 400);
  };

  const handleReset = () => {
    setCode(initialCode);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Headline entrance from top
      scrollTl.fromTo(headlineRef.current,
        { y: '-22vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(bodyRef.current,
        { y: '-20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Editor entrance from left
      scrollTl.fromTo(editorRef.current,
        { x: '-75vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.08
      );

      // Preview entrance from right
      scrollTl.fromTo(previewRef.current,
        { x: '75vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.12
      );

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(editorRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(previewRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-50 flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/modern_office_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="scrim-heavy z-[1]" />
      <div className="absolute inset-0 grid-overlay z-[2] opacity-40" />
      <div className="absolute inset-0 grain-overlay z-[3]" />

      {/* Content */}
      <div className="relative z-10 w-full px-[6vw]">
        {/* Header */}
        <div className="mb-6">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Edit. <span className="text-neon">Observe.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[28vw]">
            Change the code. See the result instantly. Experiment and learn by doing.
          </p>
        </div>

        {/* Editor + Preview */}
        <div className="flex gap-6">
          {/* Editor Card */}
          <div
            ref={editorRef}
            className="card-dark p-0 w-[42vw] h-[54vh] flex flex-col overflow-hidden"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  styles.css
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-secondary-light hover:text-neon"
                  title="Copy code"
                >
                  {copied ? <Check size={16} className="text-neon" /> : <Copy size={16} />}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-secondary-light hover:text-neon"
                  title="Reset code"
                >
                  <ArrowsClockwise size={16} />
                </button>
              </div>
            </div>

            {/* Code Area — flex so gutter and textarea never overlap */}
            <div className="flex-1 min-h-0 flex">
              <div
                className="w-10 shrink-0 bg-white/5 border-r border-white/10 py-4 pr-2 text-right select-none"
                aria-hidden
              >
                {Array.from({ length: lineCount }, (_, i) => i + 1).map((n) => (
                  <div key={n} className="text-xs text-white/30 font-mono leading-relaxed">
                    {n}
                  </div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-w-0 min-h-0 flex-1 resize-none bg-transparent py-4 pl-3 pr-4 font-mono text-sm text-primary-light focus:outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Editor Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-secondary-light font-mono">
                {code.length} chars
              </span>
              <button
                type="button"
                onClick={handleRun}
                className="btn-neon text-sm flex items-center gap-2 px-4 py-2"
              >
                <Play size={14} weight="fill" className={isRunning ? 'animate-pulse' : ''} />
                Run
              </button>
            </div>
          </div>

          {/* Preview Card */}
          <div
            ref={previewRef}
            className="card-dark p-0 w-[42vw] h-[54vh] flex flex-col overflow-hidden"
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <Eye size={14} className="text-neon" />
                Live preview
                <span className="normal-case text-[10px] text-white/40 font-sans tracking-normal">
                  (updates as you type)
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-secondary-light"
                  title="Download as styles.css"
                  onClick={() => {
                    const blob = new Blob([code], { type: 'text/css;charset=utf-8' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = 'styles.css';
                    a.click();
                    URL.revokeObjectURL(a.href);
                    showDevpathToast('Downloaded', 'Saved as styles.css', 'success');
                  }}
                >
                  <Download size={16} />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-secondary-light"
                  title="Copy snippet"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(code);
                      showDevpathToast('Shared', 'CSS copied to clipboard.', 'success');
                    } catch {
                      showDevpathToast('Share', 'Could not copy to clipboard.', 'error');
                    }
                  }}
                >
                  <Share size={16} />
                </button>
              </div>
            </div>

            {/* Preview: isolated iframe so learner CSS applies to .container + .preview-cell */}
            <div className="flex-1 min-h-0 bg-[#0b0f16]">
              <iframe
                key={previewNonce}
                title="CSS grid preview"
                className="h-full w-full border-0 bg-[#0b0f16]"
                sandbox=""
                srcDoc={previewSrcDoc}
              />
            </div>

            {/* Preview Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-white/5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary-light">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Live
                </span>
                <span>4 cells</span>
                <span className="font-mono text-neon/90">{gridHint}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
