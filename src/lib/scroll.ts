import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/** Indices of pinned full-screen sections in DOM order (see App.tsx `<main>`). */
export const PINNED_SECTION = {
  hero: 0,
  roadmap: 1,
  dashboard: 2,
  learn: 3,
  tryIt: 4,
  build: 5,
  explain: 6,
  review: 7,
  notes: 8,
  project: 9,
  mistake: 10,
  mentor: 11,
} as const;

export function scrollToPinnedSection(index: number): void {
  const triggers = ScrollTrigger.getAll()
    .filter((st) => st.vars.pin)
    .sort((a, b) => a.start - b.start);

  const st = triggers[index];
  if (st === undefined) return;

  gsap.to(window, {
    scrollTo: { y: st.start, autoKill: false },
    duration: 1,
    ease: 'power2.inOut',
  });
}
