import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BookOpen, Lightbulb, Code, Copy, 
  Check, ArrowRight, BookmarkSimple,
  ShareNetwork, Question
} from '@phosphor-icons/react';
import { PINNED_SECTION, scrollToPinnedSection } from '../lib/scroll';
import { showDevpathToast } from '../lib/devpathToast';
import { useAppStore } from '../store/appStore';
import { LESSON_CSS_GRID_ID } from '../lib/lessonIds';

gsap.registerPlugin(ScrollTrigger);

const tags = [
  {
    icon: BookOpen,
    label: 'Concept',
    color: 'bg-blue-500/20 text-blue-400',
    scrollTo: PINNED_SECTION.explain,
  },
  {
    icon: Code,
    label: 'Example',
    color: 'bg-neon/20 text-neon',
    scrollTo: PINNED_SECTION.tryIt,
  },
  {
    icon: Lightbulb,
    label: 'Analogy',
    color: 'bg-yellow-500/20 text-yellow-400',
    scrollTo: PINNED_SECTION.explain,
  },
];

export default function LearnSection() {
  const bookmarked = useAppStore((s) => s.bookmarks.includes(LESSON_CSS_GRID_ID));
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const cssSnippet = `.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showDevpathToast('Copy failed', 'Could not access the clipboard.', 'error');
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

      // Headline + body entrance from left
      scrollTl.fromTo(headlineRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(bodyRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Tags: opacity only on a wrapper — never put translate on the flex row or each pill (scrub + x breaks gap)
      if (tagsRef.current) {
        scrollTl.fromTo(
          tagsRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0.08
        );
      }

      // Content panel entrance from right
      scrollTl.fromTo(panelRef.current,
        { x: '65vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.10
      );

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (tagsRef.current) {
        scrollTl.fromTo(
          tagsRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.72
        );
      }

      scrollTl.fromTo(panelRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-40 flex items-center"
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
      <div className="relative z-10 w-full px-[6vw] flex gap-10">
        {/* Left Column */}
        <div className="flex-1 max-w-[32vw]">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Read. <span className="text-neon">Understand.</span>
          </h2>

          <div ref={bodyRef} className="mt-6">
            <p className="text-lg text-secondary-light leading-relaxed">
              Concepts explained in plain English—no fluff, no overload. 
              Learn with examples, analogies, and real-world context.
            </p>
          </div>

          {/* Tags */}
          <div ref={tagsRef} className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              {tags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => scrollToPinnedSection(tag.scrollTo)}
                  className={`pill ${tag.color} inline-flex shrink-0 items-center gap-2 cursor-pointer border-0 outline-none transition-[filter,box-shadow] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(8,10,16,0.9)]`}
                >
                  <tag.icon size={14} weight="fill" className="shrink-0 opacity-90" aria-hidden />
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              title={bookmarked ? 'Remove from saved' : 'Save lesson'}
              onClick={() => {
                toggleBookmark(LESSON_CSS_GRID_ID);
                showDevpathToast(
                  bookmarked ? 'Removed from saved' : 'Lesson saved',
                  bookmarked ? 'You can save it again anytime.' : 'Synced with Dashboard “Save for later”.',
                  'success'
                );
              }}
              className={`p-3 rounded-lg transition-all ${bookmarked ? 'bg-neon/20 text-neon' : 'bg-white/5 text-secondary-light hover:bg-white/10'}`}
            >
              <BookmarkSimple size={20} weight={bookmarked ? 'fill' : 'regular'} />
            </button>
            <button
              type="button"
              className="p-3 bg-white/5 rounded-lg text-secondary-light hover:bg-white/10 transition-colors"
              onClick={async () => {
                const url = `${window.location.origin}${window.location.pathname}`;
                try {
                  await navigator.clipboard.writeText(url);
                  showDevpathToast('Link copied', 'Lesson link is on your clipboard.', 'success');
                } catch {
                  showDevpathToast('Share', url, 'info');
                }
              }}
            >
              <ShareNetwork size={20} />
            </button>
            <button
              type="button"
              className="p-3 bg-white/5 rounded-lg text-secondary-light hover:bg-white/10 transition-colors"
              onClick={() => scrollToPinnedSection(PINNED_SECTION.mentor)}
            >
              <Question size={20} />
            </button>
          </div>
        </div>

        {/* Right Column - Content Panel */}
        <div
          ref={panelRef}
          className="card-dark p-8 w-[54vw] h-[76vh] overflow-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-neon flex items-center gap-2">
              <span className="w-2 h-2 bg-neon rounded-full" />
              CSS Grid
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-light">Lesson 3 of 12</span>
            </div>
          </div>

          <h3 className="font-display text-2xl font-semibold text-primary-light mb-6">
            auto-fit vs auto-fill
          </h3>

          <div className="space-y-6 text-secondary-light leading-relaxed">
            <p>
              When creating responsive grids with <code className="text-neon bg-white/5 px-1.5 py-0.5 rounded font-mono text-sm">repeat()</code>, 
              you have two powerful options: <strong className="text-primary-light">auto-fit</strong> and{' '}
              <strong className="text-primary-light">auto-fill</strong>.
            </p>

            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="font-mono text-sm text-primary-light mb-3 flex items-center gap-2">
                <Lightbulb size={16} className="text-yellow-400" weight="fill" />
                The Key Difference
              </h4>
              <p className="text-lg">
                <span className="text-neon font-semibold">auto-fit</span> collapses empty tracks. 
                <span className="text-blue-400 font-semibold"> auto-fill</span> keeps them.
              </p>
              <p className="mt-3 text-sm">
                That one difference decides how your layout behaves when content shrinks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-neon/30 transition-colors">
                <span className="font-mono text-xs text-neon block mb-2 flex items-center gap-2">
                  <Check size={14} weight="bold" />
                  auto-fit
                </span>
                <p className="text-sm">
                  Use when you want items to stretch and fill available space. 
                  Empty tracks disappear.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-blue-400/30 transition-colors">
                <span className="font-mono text-xs text-blue-400 block mb-2 flex items-center gap-2">
                  <Check size={14} weight="bold" />
                  auto-fill
                </span>
                <p className="text-sm">
                  Use when you want to maintain consistent column widths. 
                  Empty tracks remain.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="code-block p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-secondary-light font-mono">CSS</span>
                  <button 
                    onClick={handleCopy}
                    className="text-xs text-secondary-light hover:text-neon transition-colors flex items-center gap-1"
                  >
                    {copied ? <Check size={14} className="text-neon" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-sm text-primary-light font-mono leading-relaxed">{cssSnippet}</pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                className="btn-ghost text-sm flex items-center gap-2"
                onClick={() => scrollToPinnedSection(PINNED_SECTION.roadmap)}
              >
                View learning path
              </button>
              <button
                type="button"
                className="btn-neon text-sm flex items-center gap-2"
                onClick={() => scrollToPinnedSection(PINNED_SECTION.tryIt)}
              >
                Next: Try it
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
