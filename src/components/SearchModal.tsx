import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  MagnifyingGlass, Clock,
  BookOpen, Code, Folder, Brain
} from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';
import { scrollToPinnedSection, PINNED_SECTION } from '../lib/scroll';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  { type: 'lesson' as const, title: 'CSS Grid Fundamentals', icon: BookOpen },
  { type: 'lesson' as const, title: 'JavaScript Async/Await', icon: BookOpen },
  { type: 'practice' as const, title: 'Build a Navbar', icon: Code },
  { type: 'project' as const, title: 'Portfolio v1', icon: Folder },
  { type: 'note' as const, title: 'When to use rem vs em', icon: Brain },
  { type: 'lesson' as const, title: 'TypeScript Basics', icon: BookOpen },
  { type: 'practice' as const, title: 'Responsive Cards', icon: Code },
  { type: 'project' as const, title: 'Dashboard UI', icon: Folder },
];

function sectionForSearchType(type: (typeof searchItems)[number]['type']): number {
  switch (type) {
    case 'lesson':
      return PINNED_SECTION.learn;
    case 'practice':
      return PINNED_SECTION.tryIt;
    case 'project':
      return PINNED_SECTION.project;
    case 'note':
      return PINNED_SECTION.notes;
    default:
      return PINNED_SECTION.learn;
  }
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchHistory, addSearch } = useAppStore();

  const goToResult = useCallback(
    (title: string, type: (typeof searchItems)[number]['type']) => {
      addSearch(title);
      scrollToPinnedSection(sectionForSearchType(type));
      onClose();
    },
    [addSearch, onClose]
  );

  const filteredItems = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return searchItems.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      gsap.fromTo('.search-modal-content',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2 }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredItems.length === 0) return;
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredItems.length === 0) return;
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        const item = filteredItems[selectedIndex];
        goToResult(item.title, item.type);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, goToResult]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[400] flex items-start justify-center pt-[20vh]"
      style={{ background: 'rgba(7, 10, 18, 0.9)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div 
        className="search-modal-content w-full max-w-xl card-dark overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <MagnifyingGlass size={20} className="text-secondary-light" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search lessons, projects, notes..."
            className="flex-1 bg-transparent text-primary-light placeholder:text-secondary-light/50 focus:outline-none"
          />
          <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-secondary-light">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-auto">
          {query ? (
            filteredItems.length > 0 ? (
              <div className="p-2">
                <span className="text-xs text-secondary-light px-3 py-2 block">Results</span>
                {filteredItems.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => goToResult(item.title, item.type)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      selectedIndex === index 
                        ? 'bg-neon/10 text-primary-light' 
                        : 'text-secondary-light hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={18} className={selectedIndex === index ? 'text-neon' : 'text-secondary-light'} />
                    <span className="flex-1">{item.title}</span>
                    <span className="text-xs text-secondary-light/60 capitalize">{item.type}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-secondary-light">No results found</p>
              </div>
            )
          ) : (
            <div className="p-2">
              {searchHistory.length > 0 && (
                <>
                  <span className="text-xs text-secondary-light px-3 py-2 block">Recent Searches</span>
                  {searchHistory.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        addSearch(term);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-secondary-light hover:bg-white/5 transition-colors"
                    >
                      <Clock size={16} />
                      <span>{term}</span>
                    </button>
                  ))}
                </>
              )}
              <span className="text-xs text-secondary-light px-3 py-2 block">Popular</span>
              {['CSS Grid', 'JavaScript', 'React', 'TypeScript'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-secondary-light hover:bg-white/5 transition-colors"
                >
                  <MagnifyingGlass size={16} />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 text-xs text-secondary-light">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd>
              <span>to select</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
