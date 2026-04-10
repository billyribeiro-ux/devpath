import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRightIcon, CaretDownIcon, CodeIcon, TerminalIcon, 
  LightningIcon, StarIcon, RocketIcon, SparkleIcon,
  PlayIcon, UsersIcon, TrophyIcon
} from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';
import { PINNED_SECTION, scrollToPinnedSection } from '../lib/scroll';
import { showDevpathToast } from '../lib/devpathToast';

gsap.registerPlugin(ScrollTrigger);

const floatingIcons = [
  { Icon: CodeIcon, size: 48, x: '85%', y: '20%', delay: 0, opacity: 0.2 },
  { Icon: TerminalIcon, size: 32, x: '75%', y: '35%', delay: 0.5, opacity: 0.15 },
  { Icon: LightningIcon, size: 64, x: '90%', y: '50%', delay: 1, opacity: 0.1 },
  { Icon: StarIcon, size: 24, x: '80%', y: '70%', delay: 0.3, opacity: 0.25 },
  { Icon: RocketIcon, size: 40, x: '70%', y: '80%', delay: 0.7, opacity: 0.15 },
];

const stats = [
  { value: '50K+', label: 'Developers', icon: UsersIcon },
  { value: '4.9', label: 'Rating', icon: StarIcon },
  { value: '1M+', label: 'Lessons', icon: TrophyIcon },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { addXP } = useAppStore();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background parallax
      loadTl.fromTo(bgRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      );

      // Floating icons with staggered animation
      const icons = floatingRef.current?.querySelectorAll('.floating-icon');
      icons?.forEach((icon, i) => {
        gsap.to(icon, {
          y: '+=20',
          duration: 2.5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
        
        gsap.fromTo(icon,
          { opacity: 0, scale: 0 },
          { opacity: floatingIcons[i]?.opacity || 0.2, scale: 1, duration: 0.8, delay: 0.5 + i * 0.2 }
        );
      });

      // Micro label with glow
      loadTl.fromTo(microRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.3
      );

      // Headline with 3D effect
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        loadTl.fromTo(words,
          { y: 80, opacity: 0, rotateX: -60, transformOrigin: 'center bottom' },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
          0.4
        );
      }

      // Subheadline
      loadTl.fromTo(subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.8
      );

      // CTAs with bounce
      loadTl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' },
        1
      );

      // Stats
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && statItems.length > 0) {
        loadTl.fromTo(statItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          1.2
        );
      }

      // Scroll-driven EXIT animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subRef.current, ctaRef.current, microRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(bgRef.current, { opacity: 1, scale: 1 });
          }
        }
      });

      // EXIT
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-25vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(subRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(microRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '15vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(statsRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.1, opacity: 0.2, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-10 flex items-center"
    >
      {/* Background Image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 transition-transform duration-100"
        style={{
          backgroundImage: 'url(/hero_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0,
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px) scale(1.1)`
        }}
      />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(57, 255, 20, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0, 217, 255, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, rgba(7, 10, 18, 0.9) 0%, rgba(7, 10, 18, 0.7) 50%, rgba(7, 10, 18, 0.9) 100%)
          `
        }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay-dense z-[2] opacity-50" />

      {/* Grain */}
      <div className="absolute inset-0 grain-overlay z-[3]" />

      {/* Floating Icons */}
      <div ref={floatingRef} className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className="floating-icon absolute"
            style={{ 
              left: item.x, 
              top: item.y,
              opacity: 0
            }}
          >
            <item.Icon 
              size={item.size} 
              className="text-neon" 
              weight="thin"
              style={{ opacity: item.opacity }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-[6vw]">
        {/* Micro Label */}
        <span
          ref={microRef}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-neon mb-8 px-4 py-2 bg-neon/10 rounded-full border border-neon/30"
          style={{ opacity: 0 }}
        >
          <SparkleIcon size={14} className="animate-pulse" weight="fill" />
          DevPath OS v3.0 — Ultimate Learning Platform
        </span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(3rem,8vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-primary-light max-w-[75vw] mb-8"
          style={{ perspective: '1200px' }}
        >
          <span className="word inline-block">Master</span>{' '}
          <span className="word inline-block text-neon drop-shadow-[0_0_30px_rgba(57,255,20,0.5)]">CodeIcon.</span>
          <br />
          <span className="word inline-block">Build</span>{' '}
          <span className="word inline-block">Your</span>{' '}
          <span className="word inline-block bg-gradient-to-r from-neon to-cyan-400 bg-clip-text text-transparent">Future.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-xl md:text-2xl text-secondary-light max-w-[45vw] leading-relaxed mb-10"
          style={{ opacity: 0 }}
        >
          The ultimate learning OS for developers. Roadmaps, AI mentoring, 
          gamified challenges, and a community that pushes you forward.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex items-center gap-4 mb-16"
          style={{ opacity: 0 }}
        >
          <button 
            type="button"
            className="btn-neon group flex items-center gap-3 text-base px-8 py-4 text-lg"
            onClick={() => {
              addXP(10);
              showDevpathToast('Nice!', '+10 XP — opening Learn.', 'achievement');
              scrollToPinnedSection(PINNED_SECTION.learn);
            }}
          >
            <PlayIcon size={22} weight="fill" className="group-hover:scale-110 transition-transform" />
            Start Your Journey
            <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            className="btn-ghost group flex items-center gap-3 text-base px-8 py-4"
            onClick={() => scrollToPinnedSection(PINNED_SECTION.roadmap)}
          >
            <CaretDownIcon size={20} className="group-hover:translate-y-1 transition-transform" weight="bold" />
            Explore Features
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex items-center gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <stat.icon size={20} className="text-neon" weight="fill" />
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-primary-light">{stat.value}</span>
                <span className="text-xs text-secondary-light block">{stat.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-10 bg-white/10 ml-4" />
              )}
            </div>
          ))}
        </div>

        {/* Keyboard hint */}
        <div className="mt-12 flex items-center gap-3 text-secondary-light/50">
          <kbd className="px-2 py-1 bg-white/5 rounded-lg text-xs font-mono border border-white/10">?</kbd>
          <span className="text-xs">for keyboard shortcuts</span>
          <span className="text-white/20">•</span>
          <kbd className="px-2 py-1 bg-white/5 rounded-lg text-xs font-mono border border-white/10">⌘K</kbd>
          <span className="text-xs">to search</span>
        </div>
      </div>
    </section>
  );
}
