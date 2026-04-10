import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Folder, GitCommit, CheckCircle, Rocket,
  Code, GitPullRequest, Bug, Star,
  CaretRight, ArrowUpRight
} from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';
import { showDevpathToast } from '../lib/devpathToast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { title: 'Initialized SvelteKit', icon: Rocket, completed: true, time: 'Jan 10' },
  { title: 'Built navbar component', icon: CheckCircle, completed: true, time: 'Jan 12' },
  { title: 'Added responsive grid', icon: Code, completed: true, time: 'Jan 14' },
  { title: 'Deployed to Vercel', icon: Rocket, completed: false, time: 'Pending' },
];

const timelineEventsFull = [
  { title: 'Repo scaffold & linting', icon: GitCommit, completed: true, time: 'Jan 6' },
  { title: 'Design tokens in CSS', icon: Code, completed: true, time: 'Jan 7' },
  ...timelineEvents,
  { title: 'E2E tests for nav', icon: CheckCircle, completed: false, time: 'Backlog' },
];

const concepts = ['SvelteKit', 'CSS Grid', 'Responsive', 'Components'];

const stats = [
  { label: 'Components', value: '4', icon: Code },
  { label: 'Commits', value: '12', icon: GitCommit },
  { label: 'Fixes', value: '3', icon: Bug },
  { label: 'Deploys', value: '1', icon: Rocket }
];

export default function ProjectSection() {
  const addXP = useAppStore((s) => s.addXP);
  const addNotification = useAppStore((s) => s.addNotification);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [timelineOpen, setTimelineOpen] = useState(false);

  const openRepo = () => {
    window.open(
      'https://github.com/new?name=portfolio-v1&description=DevPath%20portfolio%20project',
      '_blank',
      'noopener,noreferrer'
    );
    showDevpathToast('GitHub', 'Opening GitHub to create or open a repository.', 'info');
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

      // Overview card entrance from left
      scrollTl.fromTo(overviewRef.current,
        { x: '-75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Timeline card entrance from right
      scrollTl.fromTo(timelineRef.current,
        { x: '75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Connector line draw
      scrollTl.fromTo(connectorRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' },
        0.18
      );

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(overviewRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(timelineRef.current,
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
      className="section-pinned relative z-[100] flex items-center"
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
        {/* Header */}
        <div className="mb-6">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-primary-light"
          >
            Project <span className="text-neon">memory.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[30vw]">
            A timeline of concepts, files, fixes, and milestones. Your projects remember.
          </p>
        </div>

        {/* Overview + Timeline */}
        <div className="flex gap-6">
          {/* Project Overview Card */}
          <div
            ref={overviewRef}
            className="card-dark p-8 w-[44vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon/30 to-neon/10 flex items-center justify-center">
                  <Folder size={24} className="text-neon" weight="fill" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary-light">
                    Portfolio v1
                  </h3>
                  <span className="font-mono text-xs text-secondary-light">
                    Last updated 2 days ago
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={openRepo}
                title="Open GitHub"
              >
                <ArrowUpRight size={20} className="text-secondary-light" />
              </button>
            </div>

            <div className="flex-1">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light block mb-3">
                Concepts used
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {concepts.map(c => (
                  <span key={c} className="pill pill-default text-xs">{c}</span>
                ))}
              </div>

              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light block mb-3">
                Milestones
              </span>
              <div className="grid grid-cols-4 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                    <stat.icon 
                      size={20} 
                      className="text-neon mx-auto mb-2 group-hover:scale-110 transition-transform" 
                      weight="fill"
                    />
                    <span className="text-2xl font-display font-bold text-primary-light">{stat.value}</span>
                    <span className="text-xs text-secondary-light block mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-light">Status</span>
                <span className="pill pill-neon text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                  In Progress
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GitPullRequest size={16} className="text-secondary-light" />
                <span className="text-xs text-secondary-light">2 open PRs</span>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div
            ref={timelineRef}
            className="card-dark p-8 w-[40vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <GitCommit size={14} className="text-neon" />
                Timeline
              </span>
              <button
                type="button"
                className="text-xs text-neon hover:underline"
                onClick={() => setTimelineOpen(true)}
              >
                View all
              </button>
            </div>

            <div className="flex-1 relative overflow-auto">
              {/* Connector Line */}
              <div
                ref={connectorRef}
                className="absolute left-[15px] top-4 bottom-4 w-[2px] origin-top"
                style={{
                  background: 'linear-gradient(to bottom, #39FF14, rgba(57, 255, 20, 0.2))'
                }}
              />

              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div 
                    key={event.title}
                    onMouseEnter={() => setHoveredEvent(index)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    className="relative flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        event.completed 
                          ? 'bg-neon/20' 
                          : 'bg-white/10'
                      }`}>
                        <event.icon
                          size={16}
                          className={event.completed ? 'text-neon' : 'text-white/40'}
                          weight={event.completed ? 'fill' : 'regular'}
                        />
                      </div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${event.completed ? 'text-primary-light' : 'text-secondary-light'}`}>
                          {event.title}
                        </span>
                        <span className="text-xs text-secondary-light font-mono">{event.time}</span>
                      </div>
                      <span className="text-xs text-secondary-light/60">
                        {event.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <CaretRight 
                      size={16} 
                      className={`transition-all mt-1 ${
                        hoveredEvent === index ? 'text-neon translate-x-1' : 'text-white/20'
                      }`} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn-neon w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => {
                addXP(200);
                useAppStore.setState((s) => ({
                  stats: {
                    ...s.stats,
                    completedProjects: s.stats.completedProjects + 1,
                  },
                }));
                addNotification({
                  title: 'Project',
                  message: 'Portfolio v1 marked complete.',
                  type: 'success',
                });
                showDevpathToast('Shipped', 'Project marked complete — +200 XP.', 'achievement');
              }}
            >
              <Star size={18} weight="fill" />
              Mark as complete
            </button>
          </div>
        </div>

        <Dialog open={timelineOpen} onOpenChange={setTimelineOpen}>
          <DialogContent className="z-[500] max-w-lg border-white/10 bg-[rgba(12,16,24,0.98)] text-primary-light">
            <DialogHeader>
              <DialogTitle className="font-display text-lg">Full timeline</DialogTitle>
            </DialogHeader>
            <ul className="max-h-[60vh] space-y-3 overflow-auto pr-1 text-sm">
              {timelineEventsFull.map((event) => (
                <li
                  key={event.title}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <event.icon
                    size={18}
                    className={event.completed ? 'text-neon mt-0.5' : 'text-white/40 mt-0.5'}
                    weight={event.completed ? 'fill' : 'regular'}
                  />
                  <div>
                    <span className="font-medium text-primary-light">{event.title}</span>
                    <span className="ml-2 font-mono text-xs text-secondary-light">{event.time}</span>
                    <p className="text-xs text-secondary-light/80">
                      {event.completed ? 'Completed' : 'Planned'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
