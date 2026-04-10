import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Warning, Clock, Target, TrendDown,
  Lightning, Brain, ArrowRight, CheckCircle,
  XCircle, WarningCircle
} from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';
import { showDevpathToast } from '../lib/devpathToast';

gsap.registerPlugin(ScrollTrigger);

const initialErrors = [
  { message: 'Cannot reassign const variable', time: '2 hours ago', count: 3, type: 'syntax' as const },
  { message: 'TypeError: undefined is not iterable', time: 'Yesterday', count: 2, type: 'runtime' as const },
  { message: 'Missing return statement', time: '2 days ago', count: 1, type: 'logic' as const },
  { message: 'Unexpected token', time: '3 days ago', count: 1, type: 'syntax' as const },
];

export default function MistakeSection() {
  const addXP = useAppStore((s) => s.addXP);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [errorRows, setErrorRows] = useState(initialErrors);

  const handlePractice = () => {
    addXP(35);
    showDevpathToast('Practice', '+35 XP — drill session started.', 'achievement');
    setIsPracticing(true);
    setTimeout(() => setIsPracticing(false), 2000);
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

      // Pattern card entrance from left
      scrollTl.fromTo(patternRef.current,
        { x: '-75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // History card entrance from right
      scrollTl.fromTo(historyRef.current,
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

      scrollTl.fromTo(patternRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(historyRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'syntax': return XCircle;
      case 'runtime': return WarningCircle;
      case 'logic': return Brain;
      default: return Warning;
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'syntax': return 'text-red-400';
      case 'runtime': return 'text-yellow-400';
      case 'logic': return 'text-blue-400';
      default: return 'text-orange-400';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-[110] flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/desk_whiteboard_bg.jpg)',
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
            className="font-display text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Turn errors into <span className="text-neon">progress.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[30vw]">
            We remember what keeps breaking—so you can fix the pattern. Learn from mistakes.
          </p>
        </div>

        {/* Pattern + History */}
        <div className="flex gap-6">
          {/* Error Pattern Card */}
          <div
            ref={patternRef}
            className="card-dark p-8 w-[44vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/30 to-red-500/10 flex items-center justify-center">
                <WarningCircle size={28} className="text-red-400" weight="fill" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-red-400 block">
                  Recurring Pattern
                </span>
                <span className="text-sm text-secondary-light">High frequency error</span>
              </div>
            </div>

            <h3 className="font-display text-xl font-semibold text-primary-light mb-4">
              Confusing let vs const
            </h3>

            <p className="text-secondary-light text-sm mb-6">
              Reassigned a const variable three times this week. This pattern suggests 
              a gap in understanding variable declaration and mutability in JavaScript.
            </p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-lg">
                <TrendDown size={18} className="text-red-400" />
                <div>
                  <span className="text-lg font-bold text-red-400 block">3</span>
                  <span className="text-xs text-secondary-light">occurrences</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-neon/10 rounded-lg">
                <Target size={18} className="text-neon" />
                <div>
                  <span className="text-lg font-bold text-neon block">85%</span>
                  <span className="text-xs text-secondary-light">fix rate</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={handlePractice}
                className={`btn-neon w-full flex items-center justify-center gap-2 transition-all ${isPracticing ? 'bg-neon/50' : ''}`}
              >
                {isPracticing ? (
                  <>
                    <CheckCircle size={18} weight="fill" />
                    Practice started!
                  </>
                ) : (
                  <>
                    <Lightning size={18} weight="fill" />
                    Practice this pattern
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* History List Card */}
          <div
            ref={historyRef}
            className="card-dark p-8 w-[40vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <Clock size={14} className="text-neon" />
                Recent errors
              </span>
              <button
                type="button"
                className="text-xs text-neon hover:underline"
                onClick={() => setErrorRows([])}
              >
                Clear all
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-auto">
              {errorRows.length === 0 ? (
                <p className="text-sm text-secondary-light text-center py-8">No recent errors — nice work.</p>
              ) : null}
              {errorRows.map((error, i) => {
                const ErrorIcon = getErrorIcon(error.type);
                return (
                  <div
                    key={i}
                    className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <ErrorIcon size={18} className={getErrorColor(error.type)} weight="fill" />
                        <div>
                          <span className="text-primary-light text-sm block">{error.message}</span>
                          <span className="font-mono text-xs text-secondary-light">{error.time}</span>
                        </div>
                      </div>
                      {error.count > 1 && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg font-mono">
                          {error.count}x
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-light">Total this week</span>
                <span className="text-neon font-mono font-bold">7 errors</span>
              </div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-red-400 to-neon rounded-full" />
              </div>
              <p className="text-xs text-secondary-light mt-2">
                You're improving! 25% fewer errors than last week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
