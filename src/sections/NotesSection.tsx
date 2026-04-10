import { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TagIcon, LinkSimpleIcon, FileTextIcon, PlusIcon,
  MagnifyingGlassIcon, DotsThreeIcon, ShareNetworkIcon,
  PushPinIcon, ClockIcon
} from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { showDevpathToast } from '../lib/devpathToast';

gsap.registerPlugin(ScrollTrigger);

const noteTags = [
  { name: 'CSS', color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Accessibility', color: 'bg-purple-500/20 text-purple-400' },
  { name: 'Typography', color: 'bg-pink-500/20 text-pink-400' }
];

const NOTE_TITLE = 'When to use rem vs em';

const NOTE_EXPORT_BODY = [
  'Use rem for consistent sizing relative to the root element. Perfect for typography scales and spacing that should remain consistent across components.',
  'Use em for component-relative sizing. Great for buttons and elements that should scale with their parent font size.',
  'Think of rem as global and em as local. When in doubt, use rem for consistency.',
].join('\n\n');

const linkedConcepts = [
  { name: 'CSS Sizing', x: 50, y: 50, connections: 3 },
  { name: 'Responsive', x: 150, y: 100, connections: 2 },
  { name: 'Typography', x: 100, y: 180, connections: 4 },
  { name: 'rem vs em', x: 200, y: 150, active: true, connections: 5 },
  { name: 'Projects', x: 250, y: 80, connections: 2 }
];

export default function NotesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [extraTags, setExtraTags] = useState<{ name: string; color: string }[]>([]);

  const filteredConcepts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return linkedConcepts;
    return linkedConcepts.filter((c) => c.name.toLowerCase().includes(q));
  }, [searchQuery]);

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

      // Editor card entrance from left
      scrollTl.fromTo(editorRef.current,
        { x: '-75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Graph panel entrance from right
      scrollTl.fromTo(graphRef.current,
        { x: '75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Graph nodes entrance with stagger
      const nodes = nodesRef.current?.querySelectorAll('.graph-node');
      if (nodes && nodes.length > 0) {
        scrollTl.fromTo(nodes,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.04, ease: 'none' },
          0.18
        );
      }

      // EXIT phase
      scrollTl.fromTo([headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(editorRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(graphRef.current,
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
      className="section-pinned relative z-[90] flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/modern_office_bg.jpg)',
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
            Linked <span className="text-neon">knowledge.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[30vw]">
            Your notes, connected to concepts, bugs, and projects. A second brain for code.
          </p>
        </div>

        {/* Editor + Graph */}
        <div className="flex gap-6">
          {/* Note Editor Card */}
          <div
            ref={editorRef}
            className="card-dark p-0 w-[44vw] h-[54vh] flex flex-col overflow-hidden"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <FileTextIcon size={18} className="text-neon" />
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light">
                  Note
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPinned(!isPinned)}
                  className={`p-2 rounded-lg transition-colors ${isPinned ? 'bg-neon/20 text-neon' : 'text-secondary-light hover:bg-white/10'}`}
                >
                  <PushPinIcon size={18} weight={isPinned ? 'fill' : 'regular'} />
                </button>
                <button
                  type="button"
                  className="p-2 text-secondary-light hover:bg-white/10 rounded-lg transition-colors"
                  onClick={async () => {
                    const title = 'When to use rem vs em';
                    try {
                      await navigator.clipboard.writeText(title);
                      showDevpathToast('Copied', 'Note title copied to clipboard.', 'success');
                    } catch {
                      showDevpathToast('Share', title, 'info');
                    }
                  }}
                >
                  <ShareNetworkIcon size={18} />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="p-2 text-secondary-light hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Note actions"
                    >
                      <DotsThreeIcon size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="z-[400] min-w-[12rem] border-white/10 bg-[rgba(12,16,24,0.98)] text-primary-light"
                  >
                    <DropdownMenuItem
                      className="focus:bg-white/10"
                      onClick={async () => {
                        const tags = [...noteTags, ...extraTags].map((t) => t.name).join(', ');
                        const text = `${NOTE_TITLE}\n\nTags: ${tags}\n\n${NOTE_EXPORT_BODY}`;
                        try {
                          await navigator.clipboard.writeText(text);
                          showDevpathToast('Copied', 'Note copied as plain text.', 'success');
                        } catch {
                          showDevpathToast('Copy failed', 'Clipboard not available.', 'error');
                        }
                      }}
                    >
                      Copy note
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="focus:bg-white/10"
                      onClick={() => {
                        const payload = {
                          exportedAt: new Date().toISOString(),
                          title: NOTE_TITLE,
                          tags: [...noteTags, ...extraTags],
                          body: NOTE_EXPORT_BODY,
                        };
                        const blob = new Blob([JSON.stringify(payload, null, 2)], {
                          type: 'application/json;charset=utf-8',
                        });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = 'devpath-note.json';
                        a.click();
                        URL.revokeObjectURL(a.href);
                        showDevpathToast('Exported', 'Saved devpath-note.json', 'success');
                      }}
                    >
                      Export JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-6 overflow-auto">
              <h3 className="font-display text-xl font-semibold text-primary-light mb-4">
                {NOTE_TITLE}
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {[...noteTags, ...extraTags].map((tag) => (
                  <span key={tag.name} className={`pill ${tag.color} flex items-center gap-1.5 text-xs`}>
                    <TagIcon size={10} weight="fill" />
                    {tag.name}
                  </span>
                ))}
                <button
                  type="button"
                  className="pill bg-white/5 text-secondary-light hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs"
                  onClick={() => {
                    setExtraTags((prev) => {
                      if (prev.some((t) => t.name === 'Demo')) return prev;
                      return [...prev, { name: 'Demo', color: 'bg-neon/20 text-neon' }];
                    });
                    showDevpathToast('TagIcon added', 'Added tag “Demo” to this note.', 'success');
                  }}
                >
                  <PlusIcon size={10} />
                  Add tag
                </button>
              </div>

              <div className="space-y-4 text-secondary-light text-sm leading-relaxed">
                <p>
                  Use <code className="text-neon bg-white/5 px-1.5 py-0.5 rounded font-mono">rem</code> for 
                  consistent sizing relative to the root element. Perfect for typography 
                  scales and spacing that should remain consistent across components.
                </p>
                <p>
                  Use <code className="text-neon bg-white/5 px-1.5 py-0.5 rounded font-mono">em</code> for 
                  component-relative sizing. Great for buttons and elements that should 
                  scale with their parent's font size.
                </p>
                <div className="p-4 bg-white/5 rounded-lg border-l-2 border-neon">
                  <p className="text-xs text-secondary-light italic">
                    "Think of rem as global and em as local. When in doubt, use rem for consistency."
                  </p>
                </div>
              </div>
            </div>

            {/* Editor Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-secondary-light">
                <LinkSimpleIcon size={14} className="text-neon" />
                <span>Linked to 5 concepts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary-light">
                <ClockIcon size={14} />
                <span>Edited 2h ago</span>
              </div>
            </div>
          </div>

          {/* Graph Panel */}
          <div
            ref={graphRef}
            className="card-dark p-6 w-[40vw] h-[54vh] flex flex-col"
          >
            {/* Graph Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <LinkSimpleIcon size={14} className="text-neon" />
                Linked concepts
              </span>
              <div className="relative">
                <MagnifyingGlassIcon size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-secondary-light" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-white/5 border border-white/10 rounded-lg pl-7 pr-3 py-1.5 text-xs text-primary-light placeholder:text-secondary-light/50 focus:outline-none focus:border-neon/50 w-32"
                />
              </div>
            </div>

            {/* Graph Visualization */}
            <div ref={nodesRef} className="flex-1 relative bg-white/5 rounded-xl overflow-hidden">
              <svg className="absolute inset-0 w-full h-full">
                {/* Connection lines */}
                <line x1="100" y1="50" x2="150" y2="100" className="node-graph-line" />
                <line x1="150" y1="100" x2="200" y2="150" className="node-graph-line" />
                <line x1="100" y1="50" x2="100" y2="180" className="node-graph-line" />
                <line x1="200" y1="150" x2="250" y2="80" className="node-graph-line" />
                <line x1="150" y1="100" x2="100" y2="50" className="node-graph-line" />
              </svg>

              {filteredConcepts.map((concept) => (
                <div
                  key={concept.name}
                  className={`graph-node absolute px-3 py-2 rounded-lg text-xs font-mono cursor-pointer transition-all hover:scale-110 hover:z-10 ${
                    concept.active
                      ? 'bg-neon/20 border border-neon text-neon shadow-lg shadow-neon/20'
                      : 'bg-white/5 border border-white/10 text-secondary-light hover:bg-white/10'
                  }`}
                  style={{ left: concept.x, top: concept.y }}
                >
                  <div className="flex items-center gap-2">
                    <span>{concept.name}</span>
                    <span className="text-[10px] opacity-60">{concept.connections}</span>
                  </div>
                </div>
              ))}
              {filteredConcepts.length === 0 && searchQuery.trim() !== '' && (
                <p className="absolute inset-0 flex items-center justify-center text-xs text-secondary-light p-4">
                  No concepts match &quot;{searchQuery.trim()}&quot;.
                </p>
              )}
            </div>

            {/* Graph Legend */}
            <div className="mt-4 flex items-center gap-4 text-xs text-secondary-light">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neon" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/30" />
                <span>Linked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full border border-white/30" />
                <span>Related</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
