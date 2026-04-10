import { useEffect, useRef } from 'react';
import { XIcon, CommandIcon, ArrowUpIcon, ArrowDownIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';

interface KeyboardHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: '?', desc: 'Toggle this help' },
  { key: 'H', desc: 'Go to Home' },
  { key: 'R', desc: 'Go to Roadmap' },
  { key: 'D', desc: 'Go to Dashboard' },
  { key: 'L', desc: 'Go to Learn' },
  { key: 'T', desc: 'Go to Try' },
  { key: 'B', desc: 'Go to Build' },
  { key: 'E', desc: 'Go to Explain' },
  { key: 'S', desc: 'Go to Review (Spaced)' },
  { key: 'N', desc: 'Go to Notes' },
  { key: 'P', desc: 'Go to Projects' },
  { key: 'M', desc: 'Go to Mistakes' },
  { key: 'A', desc: 'Go to AI Mentor' },
  { key: '↑ / ↓', desc: 'Navigate sections' },
  { key: 'ESC', desc: 'Close modals' },
];

export default function KeyboardHelp({ isOpen, onClose }: KeyboardHelpProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      scale: 0.95, opacity: 0, y: 20, duration: 0.2
    });
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.2, onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(7, 10, 18, 0.9)', backdropFilter: 'blur(12px)' }}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="card-dark w-full max-w-lg p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
              <CommandIcon size={20} className="text-neon" weight="bold" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-primary-light">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs text-secondary-light">Navigate faster</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <XIcon size={20} className="text-secondary-light" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <span className="text-sm text-secondary-light">{shortcut.desc}</span>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-neon">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-6 text-xs text-secondary-light">
          <div className="flex items-center gap-2">
            <ArrowUpIcon size={14} />
            <ArrowDownIcon size={14} />
            <span>Scroll to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
