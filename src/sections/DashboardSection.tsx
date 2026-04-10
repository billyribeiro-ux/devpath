import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FireIcon, TargetIcon, BookOpenIcon, PlayIcon, 
  CalendarIcon, CaretRightIcon, TrendUpIcon, 
  ClockIcon, StarIcon, LightningIcon
} from '@phosphor-icons/react';
import { PINNED_SECTION, scrollToPinnedSection } from '../lib/scroll';
import { showDevpathToast } from '../lib/devpathToast';
import DailyChallenges from '../components/DailyChallenges';
import { useAppStore } from '../store/appStore';
import { LESSON_CSS_GRID_ID } from '../lib/lessonIds';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: FireIcon,
    label: 'Streak',
    value: '12 days',
    change: '+3',
    color: 'text-orange-400',
    scrollTo: PINNED_SECTION.tryIt,
  },
  {
    icon: TargetIcon,
    label: 'Mastery',
    value: '34%',
    change: '+5%',
    color: 'text-neon',
    scrollTo: PINNED_SECTION.review,
  },
  {
    icon: BookOpenIcon,
    label: 'Reviews',
    value: '12 due',
    change: '2 new',
    color: 'text-blue-400',
    scrollTo: PINNED_SECTION.review,
  },
];

export default function DashboardSection() {
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const lessonSaved = useAppStore((s) => s.bookmarks.includes(LESSON_CSS_GRID_ID));
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mainTaskRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

      // Stats row entrance
      const statCards = statsRef.current?.querySelectorAll('.stats-card');
      if (statCards && statCards.length > 0) {
        scrollTl.fromTo(statCards,
          { y: '-28vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.05
        );
      }

      // Main task card entrance from left
      scrollTl.fromTo(mainTaskRef.current,
        { x: '-65vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.10
      );

      // Side cards entrance from right
      const sideCards = sideCardsRef.current?.querySelectorAll('.side-card');
      if (sideCards && sideCards.length > 0) {
        scrollTl.fromTo(sideCards,
          { x: '65vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.12
        );
      }

      // EXIT phase
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (statCards && statCards.length > 0) {
        scrollTl.fromTo(statCards,
          { y: 0, opacity: 1 },
          { y: '-14vh', opacity: 0, ease: 'power2.in' },
          0.72
        );
      }

      scrollTl.fromTo(mainTaskRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (sideCards && sideCards.length > 0) {
        scrollTl.fromTo(sideCards,
          { x: 0, opacity: 1 },
          { x: '22vw', opacity: 0, ease: 'power2.in' },
          0.72
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-30 flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/laptop_notes_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="scrim-heavy z-[1]" />
      <div className="absolute inset-0 grid-overlay z-[2] opacity-40" />
      <div className="absolute inset-0 grain-overlay z-[3]" />

      {/* Content */}
      <div className="relative z-10 w-full px-[6vw]">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
            >
              Today's <span className="text-neon">focus</span>
            </h2>
            <p className="mt-2 text-secondary-light flex items-center gap-2">
              <ClockIcon size={14} className="text-neon" />
              <span className="text-sm">Wednesday, January 15</span>
            </p>
          </div>

          {/* Stats Row */}
          <div ref={statsRef} className="flex gap-4">
            {stats.map((stat) => (
              <button
                key={stat.label}
                type="button"
                onClick={() => scrollToPinnedSection(stat.scrollTo)}
                className="stats-card min-w-[140px] group cursor-pointer hover:border-neon/30 transition-colors text-left border-0 bg-transparent p-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon size={22} className={stat.color} weight="fill" />
                  <span className="text-xs font-mono text-neon">{stat.change}</span>
                </div>
                <div className="stats-value text-2xl">{stat.value}</div>
                <div className="stats-label">{stat.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Row */}
        <div className="mt-8 flex gap-6">
          {/* Main Task Card */}
          <div
            ref={mainTaskRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`card-dark p-8 flex-1 max-w-[50vw] h-[54vh] flex flex-col transition-all duration-300 ${
              isHovered ? 'border-neon/40' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-neon flex items-center gap-2">
                <LightningIcon size={14} weight="fill" />
                Current lesson
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((i) => (
                  <StarIcon 
                    key={i} 
                    size={12} 
                    className={i <= 2 ? 'text-neon' : 'text-white/20'}
                    weight={i <= 2 ? 'fill' : 'regular'}
                  />
                ))}
              </div>
            </div>

            <h3 className="font-display text-2xl font-semibold text-primary-light mb-3">
              CSS Grid: auto-fit vs auto-fill
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <span className="pill pill-default text-xs flex items-center gap-1">
                <TrendUpIcon size={10} />
                Intermediate
              </span>
              <span className="text-xs text-secondary-light flex items-center gap-1">
                <ClockIcon size={12} />
                15 min
              </span>
            </div>

            <p className="text-secondary-light leading-relaxed mb-6 flex-1">
              Master the difference between auto-fit and auto-fill in CSS Grid. 
              Learn when to use each approach for responsive layouts that adapt 
              gracefully to different screen sizes. This lesson includes interactive 
              examples and a hands-on coding challenge.
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn-neon group flex items-center gap-2"
                onClick={() => scrollToPinnedSection(PINNED_SECTION.learn)}
              >
                <PlayIcon size={18} weight="fill" className="group-hover:scale-110 transition-transform" />
                Start lesson
              </button>
              <button
                type="button"
                className="btn-ghost text-sm"
                onClick={() => {
                  const wasSaved = lessonSaved;
                  toggleBookmark(LESSON_CSS_GRID_ID);
                  showDevpathToast(
                    wasSaved ? 'Removed' : 'Saved',
                    wasSaved
                      ? 'Removed CSS Grid lesson from your saved list.'
                      : 'Lesson saved — open Learn anytime from your path.',
                    'success'
                  );
                }}
              >
                {lessonSaved ? 'Saved · tap to remove' : 'Save for later'}
              </button>
            </div>
          </div>

          {/* Side Cards */}
          <div ref={sideCardsRef} className="flex flex-col gap-4 w-[30vw]">
            <div className="side-card card-dark p-6 flex-1 hover:border-neon/20 transition-colors">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2 mb-3">
                <TargetIcon size={14} className="text-neon" />
                Next up
              </span>
              <p className="text-primary-light text-sm mb-2">
                Practice: Build a responsive card grid
              </p>
              <p className="text-xs text-secondary-light mb-3">
                Apply what you learned in a real project
              </p>
              <button
                type="button"
                className="flex items-center text-neon text-sm group cursor-pointer bg-transparent border-0 p-0"
                onClick={() => scrollToPinnedSection(PINNED_SECTION.tryIt)}
              >
                <span className="font-mono text-xs group-hover:underline">View task</span>
                <CaretRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <button
              type="button"
              className="side-card card-dark p-6 flex-1 hover:border-neon/20 transition-colors text-left w-full"
              onClick={() => scrollToPinnedSection(PINNED_SECTION.review)}
            >
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2 mb-3">
                <CalendarIcon size={14} className="text-neon" />
                Weekly review
              </span>
              <p className="text-primary-light text-sm mb-1">
                12 cards due for review
              </p>
              <p className="text-secondary-light text-xs mb-3">
                Strongest topic: DOM events
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-neon to-neon/60 rounded-full" />
                </div>
                <span className="font-mono text-xs text-neon">75%</span>
              </div>
            </button>

            <div className="side-card card-dark p-4 flex-1 min-h-0 flex flex-col overflow-hidden max-h-[42vh]">
              <DailyChallenges embedded />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
