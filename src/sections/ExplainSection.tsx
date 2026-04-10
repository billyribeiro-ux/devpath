import { useRef, useLayoutEffect, useState, useEffect, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FloppyDiskIcon, ChatTeardropTextIcon, BrainIcon, 
  MagicWandIcon, CheckCircleIcon,
  MicrophoneIcon, TextTIcon
} from '@phosphor-icons/react';
import { showDevpathToast } from '../lib/devpathToast';
import { useAppStore } from '../store/appStore';

const EXPLAIN_NOTE_ID = 'explain-auto-grid';

/** Web Speech API (Chrome exposes `webkitSpeechRecognition`). */
type WebSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onend: ((ev: Event) => void) | null;
  onerror: ((ev: Event) => void) | null;
};

type WebSpeechRecognitionCtor = new () => WebSpeechRecognition;

gsap.registerPlugin(ScrollTrigger);

const prompts = [
  'What is the difference between auto-fit and auto-fill?',
  'When would you use one over the other?',
  'How do they affect responsive behavior?'
];

export default function ExplainSection() {
  const saveNote = useAppStore((s) => s.saveNote);
  const storedUpdatedAt = useAppStore((s) => s.notes[EXPLAIN_NOTE_ID]?.updatedAt);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [explanation, setExplanation] = useState('');
  const [saved, setSaved] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);

  const stopListening = useCallback(() => {
    const r = recognitionRef.current;
    recognitionRef.current = null;
    setListening(false);
    if (r) {
      try {
        r.stop();
      } catch {
        /* recognition may already be stopped */
      }
    }
  }, []);

  const toggleVoice = useCallback(() => {
    if (listening) {
      stopListening();
      return;
    }
    const w = window as Window & {
      SpeechRecognition?: WebSpeechRecognitionCtor;
      webkitSpeechRecognition?: WebSpeechRecognitionCtor;
    };
    const SpeechRecognitionCtor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      showDevpathToast(
        'Not supported',
        'Speech recognition is not available in this browser. Try Chrome or Edge.',
        'error'
      );
      return;
    }
    const rec = new SpeechRecognitionCtor();
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event: SpeechRecognitionEvent) => {
      let chunk = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          chunk += event.results[i][0].transcript;
        }
      }
      if (!chunk.trim()) return;
      setExplanation((prev) => {
        const sep = prev.length > 0 && !/\s$/.test(prev) ? ' ' : '';
        return prev + sep + chunk.trim();
      });
    };
    rec.onend = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    rec.onerror = () => {
      showDevpathToast('Voice input', 'Speech recognition stopped or was denied.', 'info');
      recognitionRef.current = null;
      setListening(false);
    };
    recognitionRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      showDevpathToast('Voice input', 'Could not start speech recognition.', 'error');
      recognitionRef.current = null;
      setListening(false);
    }
  }, [listening, stopListening]);

  useEffect(() => () => stopListening(), [stopListening]);

  const wordCount = useMemo(
    () => explanation.trim().split(/\s+/).filter((w) => w.length > 0).length,
    [explanation]
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const c = useAppStore.getState().notes[EXPLAIN_NOTE_ID]?.content;
      if (!c) return;
      setExplanation((prev) => (prev !== '' ? prev : c));
    });
    return () => cancelAnimationFrame(id);
  }, [storedUpdatedAt]);

  const handleSave = () => {
    if (!explanation.trim()) return;
    saveNote(EXPLAIN_NOTE_ID, explanation.trim(), ['explain-it', 'css-grid']);
    setSaved(true);
    showDevpathToast('Saved', 'Explanation synced to your notes.', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation(e.target.value);
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

      // Prompt card entrance from left
      scrollTl.fromTo(promptRef.current,
        { x: '-75vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Input card entrance from right
      scrollTl.fromTo(inputRef.current,
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

      scrollTl.fromTo(promptRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(inputRef.current,
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
      className="section-pinned relative z-[70] flex items-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/team_collab_bg.jpg)',
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
            Teach it <span className="text-neon">back.</span>
          </h2>
          <p ref={bodyRef} className="mt-3 text-lg text-secondary-light max-w-[30vw]">
            If you can explain it simply, you know it. Retrieval practice strengthens memory.
          </p>
        </div>

        {/* Prompt + Input */}
        <div className="flex gap-6">
          {/* Prompt Card */}
          <div
            ref={promptRef}
            className="card-dark p-8 w-[40vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
                <BrainIcon size={20} className="text-neon" weight="fill" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-neon block">
                  Explain this concept
                </span>
                <span className="text-xs text-secondary-light">Retrieval practice</span>
              </div>
            </div>

            <h3 className="font-display text-xl font-semibold text-primary-light mb-6">
              CSS Grid: auto-fit vs auto-fill
            </h3>

            <div className="flex-1">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2 mb-4">
                <ChatTeardropTextIcon size={14} />
                Guiding questions
              </span>
              <div className="space-y-4">
                {prompts.map((prompt, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-neon font-mono">{i + 1}</span>
                    </div>
                    <span className="text-secondary-light text-sm">{prompt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-br from-neon/10 to-transparent rounded-lg border border-neon/20">
              <div className="flex items-center gap-2 mb-2">
                <MagicWandIcon size={14} className="text-neon" />
                <span className="text-xs text-neon font-mono">Tip</span>
              </div>
              <p className="text-xs text-secondary-light">
                Write as if explaining to a beginner. Avoid jargon. Use analogies.
              </p>
            </div>
          </div>

          {/* Input Card */}
          <div
            ref={inputRef}
            className="card-dark p-8 w-[44vw] h-[54vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-secondary-light flex items-center gap-2">
                <TextTIcon size={14} />
                Your explanation
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-pressed={listening}
                  className={`p-2 rounded-lg transition-colors text-secondary-light hover:bg-white/10 ${
                    listening ? 'bg-neon/20 text-neon ring-1 ring-neon/40' : ''
                  }`}
                  onClick={toggleVoice}
                  title={listening ? 'Stop voice input' : 'Start voice input'}
                >
                  <MicrophoneIcon size={18} weight={listening ? 'fill' : 'regular'} />
                </button>
              </div>
            </div>

            <textarea
              value={explanation}
              onChange={handleInputChange}
              placeholder="Type your explanation here..."
              className="textarea-dark flex-1 mb-4 text-base"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-secondary-light">
                  {wordCount} words
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-colors ${
                        wordCount >= i * 20 ? 'bg-neon' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSave}
                className={`btn-neon flex items-center gap-2 transition-all ${!explanation.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                disabled={!explanation.trim()}
              >
                {saved ? (
                  <>
                    <CheckCircleIcon size={16} weight="fill" />
                    Saved!
                  </>
                ) : (
                  <>
                    <FloppyDiskIcon size={16} weight="fill" />
                    Save explanation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
