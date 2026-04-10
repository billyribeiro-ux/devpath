import { useRef, useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Circle, CheckCircle, CaretRight, Lock, Sparkle } from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';
import { scrollToPinnedSection } from '../lib/scroll';
import { getCurriculumForRole, type CurriculumRoadmapRow } from '../data/roleCurricula';
import { learningRoles } from '../data/learningRoles';

gsap.registerPlugin(ScrollTrigger);

const roleCurriculumIntro: Record<string, string> = {
  frontend:
    'Zero → hero: platform, accessible UI, CSS layout, JS/TS, performance, and a shipped capstone—taught with principal-level clarity.',
  fullstack:
    'End-to-end: HTTP, auth, data, TypeScript across the wire, reliability, security, delivery—then ship a vertical slice.',
  svelte:
    'Runes-first Svelte 5, Kit routing and loads, progressive enhancement, testing, performance—then a real Kit feature.',
  ui:
    'Tokens, theming, documentation, motion, a11y, governance, and cross-framework systems—then a system RFC you could defend.',
  principal:
    'L7 HTML/CSS: cascade architecture, grid & container queries, color & motion, anchor positioning, delivery—then a resilient architecture slice.',
};

export default function RoadmapSection() {
  const roadmapRoleId = useAppStore((s) => s.roadmapRoleId);
  const setRoadmapRoleId = useAppStore((s) => s.setRoadmapRoleId);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState(roadmapRoleId);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    setSelectedRole(roadmapRoleId);
  }, [roadmapRoleId]);

  const roadmapItems = useMemo(
    () => getCurriculumForRole(selectedRole),
    [selectedRole]
  );

  const completedCount = roadmapItems.filter((i) => i.completed).length;
  const progress = Math.round((completedCount / roadmapItems.length) * 100);
  const intro = roleCurriculumIntro[selectedRole] ?? roleCurriculumIntro.frontend;

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

      scrollTl.fromTo(headlineRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(bodyRef.current,
        { x: '-45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(selectorRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(roadmapRef.current,
        { x: '65vw', opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(connectorRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([bodyRef.current, selectorRef.current],
        { y: 0, opacity: 1 },
        { y: '12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(roadmapRef.current,
        { x: 0, opacity: 1 },
        { x: '25vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-20 flex items-center"
    >
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

      <div className="relative z-10 w-full px-[6vw] flex gap-10">
        <div className="flex-1 max-w-[44vw]">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Pick a <span className="text-neon">path</span>
          </h2>

          <div ref={bodyRef} className="mt-8">
            <p className="text-lg text-secondary-light max-w-[32vw] leading-relaxed">
              Each role is a full <span className="text-primary-light">0 → hero</span> syllabus: explicit modules,
              outcomes, and jumps into Learn, Try it, Build, and the rest of the experience—PE7-style clarity, not a toy checklist.
            </p>
          </div>

          <div
            ref={selectorRef}
            className="mt-8 card-dark p-6 max-w-[30vw]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light block mb-4">
              Select your role
            </span>
            <div className="space-y-2">
              {learningRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role.id);
                    setRoadmapRoleId(role.id);
                  }}
                  className={`w-full text-left flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                    selectedRole === role.id 
                      ? 'bg-neon/10 border-neon/50' 
                      : 'hover:bg-white/5 border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    selectedRole === role.id ? 'bg-neon/20' : 'bg-white/5'
                  }`}>
                    <role.icon 
                      size={20} 
                      className={selectedRole === role.id ? 'text-neon' : 'text-secondary-light'}
                      weight={selectedRole === role.id ? 'fill' : 'regular'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm block ${selectedRole === role.id ? 'text-primary-light' : 'text-secondary-light'}`}>
                      {role.label}
                    </span>
                    <span className="text-xs text-secondary-light/60">{role.desc}</span>
                  </div>
                  <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedRole === role.id ? 'border-neon' : 'border-white/30'
                  }`}>
                    {selectedRole === role.id && <div className="w-2 h-2 rounded-full bg-neon" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={roadmapRef}
          className="card-dark p-6 w-[46vw] min-w-0 h-[72vh] flex flex-col"
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
              <Sparkle size={14} className="text-neon" weight="fill" />
              Your curriculum
            </span>
            <span className="font-mono text-xs text-neon shrink-0">{progress}% complete</span>
          </div>
          <p className="text-xs text-secondary-light/90 leading-relaxed mb-4 line-clamp-3">
            {intro}
          </p>

          <div className="relative flex-1 min-h-0 space-y-1 overflow-auto pr-1">
            <div
              ref={connectorRef}
              className="absolute left-[19px] top-6 bottom-6 w-[2px] origin-top"
              style={{
                background: 'linear-gradient(to bottom, #39FF14 0%, rgba(57, 255, 20, 0.3) 50%, rgba(57, 255, 20, 0.1) 100%)'
              }}
            />

            {roadmapItems.map((item, index) => (
              <RoadmapLessonRow
                key={item.id}
                item={item}
                index={index}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-secondary-light">
                {completedCount} of {roadmapItems.length} completed
              </span>
              <span className="font-mono text-xs text-neon">{progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon to-neon/60 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapLessonRow({
  item,
  index,
  hoveredItem,
  setHoveredItem,
}: {
  item: CurriculumRoadmapRow;
  index: number;
  hoveredItem: number | null;
  setHoveredItem: (n: number | null) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHoveredItem(index)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => {
        if (item.locked) return;
        if (item.jumpTo !== undefined) scrollToPinnedSection(item.jumpTo);
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        if (item.locked) return;
        if (item.jumpTo !== undefined) scrollToPinnedSection(item.jumpTo);
      }}
      className={`relative flex items-start gap-4 p-3 rounded-lg transition-all duration-300 ${
        item.locked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
      } ${item.current ? 'bg-neon/10' : ''} ${hoveredItem === index ? 'bg-white/5' : ''}`}
    >
      <div className="relative z-10 pt-0.5">
        {item.completed ? (
          <CheckCircle size={28} className="text-neon" weight="fill" />
        ) : item.locked ? (
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
            <Lock size={14} className="text-white/40" />
          </div>
        ) : item.current ? (
          <div className="w-7 h-7 rounded-full bg-neon/20 flex items-center justify-center ring-2 ring-neon ring-offset-2 ring-offset-background">
            <div className="w-3 h-3 rounded-full bg-neon animate-pulse" />
          </div>
        ) : (
          <Circle size={28} className="text-white/30" weight="regular" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.06em] text-neon/70 block mb-0.5">
          {item.module}
        </span>
        <span className={`text-sm block leading-snug ${
          item.completed ? 'text-primary-light' : 
          item.locked ? 'text-white/40' : 'text-primary-light'
        }`}>
          {item.title}
        </span>
        <span className={`text-xs mt-1 block leading-relaxed line-clamp-2 ${
          item.locked ? 'text-white/30' : 'text-secondary-light/90'
        }`}>
          {item.summary}
        </span>
        {item.current && (
          <span className="text-xs text-neon font-mono mt-1 inline-block">Start here</span>
        )}
      </div>
      {!item.locked && (
        <CaretRight 
          size={16} 
          className={`shrink-0 mt-1 transition-all ${
            hoveredItem === index ? 'text-neon translate-x-1' : 'text-white/20'
          }`} 
        />
      )}
    </div>
  );
}
