import { useEffect, useCallback, useState } from 'react';

export interface Shortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const [showHelp, setShowHelp] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement) {
      // Allow Escape even in inputs
      if (event.key !== 'Escape') return;
    }

    // Toggle help with ?
    if (event.key === '?' && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      setShowHelp(prev => !prev);
      return;
    }

    // Close help with Escape
    if (event.key === 'Escape' && showHelp) {
      event.preventDefault();
      setShowHelp(false);
      return;
    }

    for (const shortcut of shortcuts) {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = !!shortcut.ctrl === event.ctrlKey;
      const altMatch = !!shortcut.alt === event.altKey;
      const shiftMatch = !!shortcut.shift === event.shiftKey;
      const metaMatch = !!shortcut.meta === event.metaKey;

      if (keyMatch && ctrlMatch && altMatch && shiftMatch && metaMatch) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  }, [shortcuts, showHelp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { showHelp, setShowHelp };
}

// Common shortcuts
export const createNavigationShortcuts = (
  scrollToSection: (index: number) => void
): Shortcut[] => [
  { key: 'h', description: 'Go to Home', action: () => scrollToSection(0) },
  { key: 'r', description: 'Go to Roadmap', action: () => scrollToSection(1) },
  { key: 'd', description: 'Go to Dashboard', action: () => scrollToSection(2) },
  { key: 'l', description: 'Go to Learn', action: () => scrollToSection(3) },
  { key: 't', description: 'Go to Try', action: () => scrollToSection(4) },
  { key: 'b', description: 'Go to Build', action: () => scrollToSection(5) },
  { key: 'e', description: 'Go to Explain', action: () => scrollToSection(6) },
  { key: 's', description: 'Go to Review', action: () => scrollToSection(7) },
  { key: 'n', description: 'Go to Notes', action: () => scrollToSection(8) },
  { key: 'p', description: 'Go to Projects', action: () => scrollToSection(9) },
  { key: 'm', description: 'Go to Mistakes', action: () => scrollToSection(10) },
  { key: 'a', description: 'Go to AI Mentor', action: () => scrollToSection(11) },
];
