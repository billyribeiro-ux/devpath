import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendUp, Clock, CaretRight, Brain,
  Fire, Target, Sparkle, ArrowRight
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useAppStore } from '../store/appStore';
import { showDevpathToast } from '../lib/devpathToast';
import { PINNED_SECTION, scrollToPinnedSection } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const reviewItems = [
  { title: 'Flexbox alignment', due: 'Today', strength: 85, icon: Target },
  { title: 'DOM events', due: 'Tomorrow', strength: 72, icon: Fire },
  { title: 'TypeScript unions', due: '2 days', strength: 60, icon: Brain },
  { title: 'Svelte runes', due: '3 days', strength: 45, icon: Sparkle }
];

export default function ReviewSection() {
  const addXP = useAppStore((s) => s.addXP);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [reviewedTopics, setReviewedTopics] = useState<string[]>([]);

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

      // Graph card entrance from left
      scrollTl.fromTo(graphRef.current,
        { x: '-75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Queue card entrance from right
      scrollTl.fromTo(queueRef.current,
        { x: '75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Graph line draw
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        scrollTl.to(lineRef.current,
          { strokeDashoffset: 0, ease: 'none' },
          0.18
        );
      }

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(graphRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(queueRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-neon';
    if (strength >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrengthBg = (strength: number) => {
    if (strength >= 80) return 'from-neon/30 to-neon/10';
    if (strength >= 60) return 'from-yellow-400/30 to-yellow-400/10';
    return 'from-red-400/30 to-red-400/10';
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-[80] flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/workspace_bg.jpg)',
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
            Spaced <span className="text-neon">repetition.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[30vw]">
            Interleaved reviews so you don't forget what you built. Science-backed learning.
          </p>
        </div>

        {/* Graph + Queue */}
        <div className="flex gap-6">
          {/* Retention Graph Card */}
          <div
            ref={graphRef}
            className="card-dark p-8 w-[44vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <TrendUp size={14} className="text-neon" />
                Retention strength
              </span>
              <span className="font-mono text-xs text-neon">Last 30 days</span>
            </div>

            <div className="flex-1 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* Graph line */}
                <path
                  ref={lineRef}
                  d="M 0 180 Q 50 160 100 140 T 200 100 T 300 70 T 400 40"
                  className="graph-line"
                />

                {/* Area under curve */}
                <path
                  d="M 0 180 Q 50 160 100 140 T 200 100 T 300 70 T 400 40 L 400 200 L 0 200 Z"
                  fill="rgba(57, 255, 20, 0.1)"
                />

                {/* Data points */}
                <circle cx="100" cy="140" r="4" fill="#39FF14" />
                <circle cx="200" cy="100" r="4" fill="#39FF14" />
                <circle cx="300" cy="70" r="4" fill="#39FF14" />
                <circle cx="400" cy="40" r="4" fill="#39FF14" />
              </svg>

              {/* Labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-secondary-light font-mono">
                <span>Day 1</span>
                <span>Day 10</span>
                <span>Day 20</span>
                <span>Day 30</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-3xl font-display font-bold text-neon">78%</span>
                <span className="text-xs text-secondary-light ml-2">avg. retention</span>
              </div>
              <div className="flex items-center gap-2 text-neon bg-neon/10 px-3 py-1.5 rounded-lg">
                <TrendUp size={16} weight="bold" />
                <span className="font-mono text-sm">+12%</span>
              </div>
            </div>
          </div>

          {/* Review Queue Card */}
          <div
            ref={queueRef}
            className="card-dark p-8 w-[40vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <Clock size={14} className="text-neon" />
                Due for review
              </span>
              <span className="pill pill-neon text-xs">4 items</span>
            </div>

            <div className="flex-1 space-y-2 overflow-auto">
              {reviewItems.map((item, index) => {
                const done = reviewedTopics.includes(item.title);
                return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (!done) {
                      addXP(12);
                      useAppStore.setState((s) => ({
                        stats: {
                          ...s.stats,
                          totalReviews: s.stats.totalReviews + 1,
                        },
                      }));
                      setReviewedTopics((prev) => [...prev, item.title]);
                      showDevpathToast(
                        'Review logged',
                        `+12 XP for “${item.title}”.`,
                        'achievement'
                      );
                    } else {
                      scrollToPinnedSection(PINNED_SECTION.tryIt);
                    }
                  }}
                  className={cn(
                    'w-full text-left flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-0',
                    done
                      ? 'bg-neon/10 ring-1 ring-neon/30'
                      : 'bg-white/5',
                    hoveredItem === index &&
                      (done ? 'bg-neon/20 ring-neon/40' : 'bg-white/10')
                  )}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStrengthBg(item.strength)} flex items-center justify-center`}>
                    <item.icon size={20} className={getStrengthColor(item.strength)} weight="fill" />
                  </div>
                  <div className="flex-1">
                    <span className="text-primary-light text-sm block">{item.title}</span>
                    <span className="text-xs text-secondary-light">Due {item.due}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono text-sm font-bold ${getStrengthColor(item.strength)}`}>
                      {item.strength}%
                    </span>
                    <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.strength >= 80 ? 'bg-neon' :
                          item.strength >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${item.strength}%` }}
                      />
                    </div>
                  </div>
                  <CaretRight 
                    size={16} 
                    className={`transition-all ${
                      hoveredItem === index ? 'text-neon translate-x-1' : 'text-white/20'
                    }`} 
                  />
                </button>
              );
              })}
            </div>

            <button
              type="button"
              className="btn-neon w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => {
                addXP(40);
                useAppStore.setState((s) => ({
                  stats: {
                    ...s.stats,
                    totalReviews: s.stats.totalReviews + 1,
                  },
                }));
                showDevpathToast(
                  'Review session',
                  'Session started — +40 XP. Queue items above still grant bonus XP individually.',
                  'achievement'
                );
              }}
            >
              <Brain size={18} weight="fill" />
              Start review session
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
