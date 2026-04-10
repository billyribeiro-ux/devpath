import { useRef, useLayoutEffect, useState, useMemo, useDeferredValue } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CheckIcon, PaperPlaneRightIcon, MonitorIcon, 
  ListChecksIcon, ClockIcon, TrophyIcon, 
  GitBranchIcon
} from '@phosphor-icons/react';
import { buildHtmlCssPreviewSrcDoc } from '../lib/livePreviewHtml';

gsap.registerPlugin(ScrollTrigger);

const checklist = [
  { id: 1, text: 'Logo left, links right on desktop', points: 10 },
  { id: 2, text: 'Hamburger + slide menu on mobile', points: 15 },
  { id: 3, text: 'Focus trap and ESC to close', points: 15 },
  { id: 4, text: 'Smooth transitions (300ms)', points: 10 }
];

const defaultPreviewHtml = `<div id="app">
  <header class="nav-bar">
    <span class="logo">Brand</span>
    <nav class="nav-links" aria-label="Primary">
      <a href="#">Home</a><a href="#">About</a><a href="#">Contact</a>
    </nav>
    <button type="button" class="nav-cta">Get started</button>
    <button type="button" class="nav-toggle" aria-label="Open menu">☰</button>
  </header>
  <main class="page">
    <h1>Page</h1>
    <p>Navbar task preview — edit HTML/CSS on the left.</p>
  </main>
</div>`;

const defaultPreviewCss = `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #0c1018; color: #e8edf5; }
#app { min-height: 100vh; }
.nav-bar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);
}
.logo { font-weight: 600; font-size: 0.9rem; }
.nav-links { display: flex; gap: 1.25rem; flex-wrap: wrap; }
.nav-links a { color: #a7b1c8; text-decoration: none; font-size: 0.8rem; }
.nav-links a:hover { color: #fff; }
.nav-cta {
  background: #39ff14; color: #0a0a0a; border: 0; padding: 0.4rem 0.9rem;
  border-radius: 6px; font-weight: 600; font-size: 0.75rem; cursor: pointer;
}
.nav-toggle { display: none; background: none; border: 0; color: #fff; font-size: 1.1rem; cursor: pointer; line-height: 1; }
@media (max-width: 640px) {
  .nav-links, .nav-cta { display: none; }
  .nav-toggle { display: block; }
}
.page { padding: 1.25rem; text-align: center; }
.page h1 { font-size: 1rem; margin: 0 0 0.35rem; }
.page p { font-size: 0.75rem; color: #a7b1c8; margin: 0; }
`;

export default function BuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewHtml, setPreviewHtml] = useState(defaultPreviewHtml);
  const [previewCss, setPreviewCss] = useState(defaultPreviewCss);
  const deferredPreviewHtml = useDeferredValue(previewHtml);
  const deferredPreviewCss = useDeferredValue(previewCss);

  const buildPreviewSrcDoc = useMemo(
    () => buildHtmlCssPreviewSrcDoc(deferredPreviewHtml, deferredPreviewCss),
    [deferredPreviewHtml, deferredPreviewCss]
  );

  const toggleCheck = (id: number) => {
    setChecked(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const totalPoints = checklist.reduce((sum, item) => sum + item.points, 0);
  const earnedPoints = checklist
    .filter(item => checked.includes(item.id))
    .reduce((sum, item) => sum + item.points, 0);
  const allChecked = checked.length === checklist.length;

  const confettiParticles = useMemo(() => {
    if (!showConfetti) return [];
    return Array.from({ length: 20 }, (_, i) => {
      const seed = i * 7919 + 104_729;
      const r1 = (seed % 10_000) / 10_000;
      const r2 = ((seed * 7) % 10_000) / 10_000;
      const r3 = ((seed * 13) % 10_000) / 10_000;
      return {
        key: i,
        left: r1 * 100,
        duration: 1 + r2,
        delay: r3 * 0.5,
      };
    });
  }, [showConfetti]);

  const handleSubmit = () => {
    if (allChecked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
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

      // Feature brief entrance from left
      scrollTl.fromTo(briefRef.current,
        { x: '-75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Preview entrance from right
      scrollTl.fromTo(previewRef.current,
        { x: '75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(briefRef.current,
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
      className="section-pinned relative z-[60] flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/keyboard_closeup_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="scrim-heavy z-[1]" />
      <div className="absolute inset-0 grid-overlay z-[2] opacity-40" />
      <div className="absolute inset-0 grain-overlay z-[3]" />

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {confettiParticles.map((p) => (
            <div
              key={p.key}
              className="absolute w-3 h-3 bg-neon rounded-full"
              style={{
                left: `${p.left}%`,
                top: '-20px',
                animation: `confetti-fall ${p.duration}s linear forwards`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-[6vw]">
        {/* Header */}
        <div className="mb-6">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Ship a <span className="text-neon">feature.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[30vw]">
            Tiny, real tasks that stack into real projects. Build, ship, repeat.
          </p>
        </div>

        {/* Feature Brief + Preview */}
        <div className="flex gap-6">
          {/* Feature Brief Card */}
          <div
            ref={briefRef}
            className="card-dark p-8 w-[44vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-neon flex items-center gap-2">
                <TrophyIcon size={14} weight="fill" />
                Feature Task
              </span>
              <div className="flex items-center gap-2">
                <GitBranchIcon size={14} className="text-secondary-light" />
                <span className="text-xs text-secondary-light font-mono">main</span>
              </div>
            </div>

            <h3 className="font-display text-xl font-semibold text-primary-light mb-2">
              Responsive navbar
            </h3>

            <p className="text-sm text-secondary-light mb-6">
              Build a navigation bar that adapts to different screen sizes with smooth animations.
            </p>

            <div className="flex-1 flex flex-col min-h-0 gap-3">
              <div className="flex items-center justify-between shrink-0">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                  <ListChecksIcon size={14} />
                  Acceptance criteria
                </span>
                <span className="text-xs font-mono text-neon">
                  {earnedPoints}/{totalPoints} pts
                </span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="checklist-item cursor-pointer group"
                    onClick={() => toggleCheck(item.id)}
                  >
                    <div className={`checklist-circle transition-all ${checked.includes(item.id) ? 'checked' : 'group-hover:border-neon/50'}`}>
                      {checked.includes(item.id) && <CheckIcon size={12} className="text-background" weight="bold" />}
                    </div>
                    <span className={`text-sm flex-1 transition-all ${
                      checked.includes(item.id) ? 'text-primary-light line-through opacity-50' : 'text-secondary-light group-hover:text-primary-light'
                    }`}>
                      {item.text}
                    </span>
                    <span className="text-xs font-mono text-secondary-light/60">
                      +{item.points}
                    </span>
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-white/10 pt-3 flex flex-col gap-2 min-h-[9rem]">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-neon">
                  Live canvas — HTML &amp; CSS
                </span>
                <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
                  <label className="flex flex-col gap-1 min-h-0">
                    <span className="text-[10px] text-secondary-light font-mono">index.html (body)</span>
                    <textarea
                      value={previewHtml}
                      onChange={(e) => setPreviewHtml(e.target.value)}
                      spellCheck={false}
                      className="min-h-[5.5rem] flex-1 resize-none rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 font-mono text-[10px] leading-relaxed text-primary-light focus:outline-none focus:border-neon/40"
                    />
                  </label>
                  <label className="flex flex-col gap-1 min-h-0">
                    <span className="text-[10px] text-secondary-light font-mono">styles.css</span>
                    <textarea
                      value={previewCss}
                      onChange={(e) => setPreviewCss(e.target.value)}
                      spellCheck={false}
                      className="min-h-[5.5rem] flex-1 resize-none rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 font-mono text-[10px] leading-relaxed text-primary-light focus:outline-none focus:border-neon/40"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-secondary-light">
                  <ClockIcon size={14} />
                  <span>Est. 45 min</span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`btn-neon flex items-center gap-2 transition-all ${!allChecked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  disabled={!allChecked}
                >
                  <PaperPlaneRightIcon size={16} weight="fill" />
                  {allChecked ? 'Submit & celebrate!' : 'Complete all tasks'}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div
            ref={previewRef}
            className="card-dark p-0 w-[40vw] h-[54vh] flex flex-col overflow-hidden"
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <MonitorIcon size={14} className="text-neon" />
                Preview
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Preview Content — iframe viewport follows device toggle */}
            <div className="flex-1 min-h-0 bg-white/5 p-4 flex flex-col items-center justify-start">
              <div
                className={`rounded-xl overflow-hidden border border-white/10 bg-[#0c1018] shadow-2xl transition-[max-width] duration-300 w-full flex flex-col min-h-0 ${
                  previewDevice === 'desktop'
                    ? 'max-w-full'
                    : previewDevice === 'tablet'
                      ? 'max-w-md'
                      : 'max-w-[280px]'
                }`}
              >
                <iframe
                  title="Build task preview"
                  className="h-[min(320px,42vh)] w-full min-h-[200px] flex-1 border-0 bg-[#0c1018]"
                  sandbox=""
                  srcDoc={buildPreviewSrcDoc}
                />
              </div>

              {/* Device Toggle */}
              <div className="mt-4 flex justify-center w-full">
                <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg">
                  {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPreviewDevice(d)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                        previewDevice === d
                          ? 'bg-neon/20 text-neon'
                          : 'text-secondary-light hover:text-primary-light'
                      }`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
