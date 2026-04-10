import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRightIcon, MapTrifoldIcon, BrainIcon, RobotIcon,
  GithubLogoIcon, TwitterLogoIcon, EnvelopeIcon,
  RocketIcon, StarIcon, HeartIcon
} from '@phosphor-icons/react';
import { PINNED_SECTION, scrollToPinnedSection } from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: MapTrifoldIcon, title: 'Roadmaps', desc: 'Structured learning paths', stat: '50+ topics', section: PINNED_SECTION.roadmap as number },
  { icon: BrainIcon, title: 'Notes & links', desc: 'Connected knowledge base', stat: 'Unlimited', section: PINNED_SECTION.notes as number },
  { icon: RobotIcon, title: 'AI mentor', desc: 'Personalized guidance', stat: '24/7', section: PINNED_SECTION.mentor as number },
];

const footerLinks: { label: string; href: string; external?: boolean }[] = [
  { label: 'Product', href: 'https://github.com/topics/learn-to-code', external: true },
  {
    label: 'Privacy',
    href: 'https://www.w3.org/TR/privacy-principles/',
    external: true,
  },
  { label: 'Terms', href: 'https://opensource.org/licenses/MIT', external: true },
  { label: 'Contact', href: 'mailto:hello@devpath.local?subject=DevPath%20OS' },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section - elements animate as they enter viewport
      gsap.fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );

      const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
      if (featureCards && featureCards.length > 0) {
        gsap.fromTo(featureCards,
          { y: 70, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5
            }
          }
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[130] min-h-screen"
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

      {/* Content */}
      <div className="relative z-10 px-[6vw] py-[12vh]">
        {/* Main CTA Area */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon/10 rounded-full border border-neon/30 mb-8">
            <RocketIcon size={16} className="text-neon" />
            <span className="text-sm text-neon font-mono">v2.0 Now Available</span>
          </div>

          <h2
            ref={headlineRef}
            className="font-display text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-primary-light"
          >
            Start <span className="text-neon">building.</span>
          </h2>

          <p ref={bodyRef} className="mt-8 text-xl text-secondary-light max-w-xl mx-auto">
            Free to start. No credit card. Your data stays yours. Join thousands of developers on their learning journey.
          </p>

          <div ref={ctaRef} className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <button
              type="button"
              className="btn-neon group flex items-center gap-2 text-lg px-10 py-5 hover:scale-105 transition-transform"
              onClick={() => scrollToPinnedSection(PINNED_SECTION.roadmap)}
            >
              <StarIcon size={20} weight="fill" className="group-hover:rotate-12 transition-transform" />
              Create your path
              <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              className="btn-ghost text-lg px-10 py-5 flex items-center gap-2"
              onClick={() => scrollToPinnedSection(PINNED_SECTION.roadmap)}
            >
              View example roadmap
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center justify-center gap-8 text-secondary-light/60">
            <div className="flex items-center gap-2">
              <HeartIcon size={16} className="text-red-400" weight="fill" />
              <span className="text-sm">Loved by 10k+ developers</span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon size={16} className="text-yellow-400" weight="fill" />
              <span className="text-sm">4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Feature Recap */}
        <div ref={featuresRef} className="flex justify-center gap-6 mb-24 flex-wrap">
          {features.map((feature) => (
            <div
              key={feature.title}
              role="button"
              tabIndex={0}
              onClick={() => scrollToPinnedSection(feature.section)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToPinnedSection(feature.section);
                }
              }}
              className="feature-card card-dark p-8 text-center w-[280px] hover:border-neon/30 transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-xl bg-neon/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-neon/20 transition-colors">
                <feature.icon size={32} className="text-neon group-hover:scale-110 transition-transform" weight="fill" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-light mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary-light mb-4">{feature.desc}</p>
              <span className="text-xs font-mono text-neon">{feature.stat}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="border-t border-white/10 pt-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
                <RocketIcon size={20} className="text-neon" weight="fill" />
              </div>
              <span className="font-mono text-lg font-bold text-primary-light">DevPath OS</span>
            </div>

            <div className="flex items-center gap-8 flex-wrap justify-center">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-secondary-light hover:text-neon transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-light hover:text-neon hover:bg-white/5 rounded-lg transition-all"
                aria-label="GitHub"
              >
                <GithubLogoIcon size={20} weight="fill" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-light hover:text-neon hover:bg-white/5 rounded-lg transition-all"
                aria-label="X"
              >
                <TwitterLogoIcon size={20} weight="fill" />
              </a>
              <a
                href="mailto:hello@devpath.local?subject=DevPath%20OS"
                className="p-2 text-secondary-light hover:text-neon hover:bg-white/5 rounded-lg transition-all"
                aria-label="Email"
              >
                <EnvelopeIcon size={20} weight="fill" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="font-mono text-xs text-secondary-light/60">
              © 2026 DevPath OS. All rights reserved. Built with 
              <HeartIcon size={12} className="inline mx-1 text-red-400" weight="fill" />
              for developers.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
