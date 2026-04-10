import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './App.css';

// Import sections
import HeroSection from './sections/HeroSection';
import RoadmapSection from './sections/RoadmapSection';
import DashboardSection from './sections/DashboardSection';
import LearnSection from './sections/LearnSection';
import TrySection from './sections/TrySection';
import BuildSection from './sections/BuildSection';
import ExplainSection from './sections/ExplainSection';
import ReviewSection from './sections/ReviewSection';
import NotesSection from './sections/NotesSection';
import ProjectSection from './sections/ProjectSection';
import MistakeSection from './sections/MistakeSection';
import MentorSection from './sections/MentorSection';
import CTASection from './sections/CTASection';

// Import components
import KeyboardHelp from './components/KeyboardHelp';
import ParticleBackground from './components/ParticleBackground';
import ThemeProvider from './components/ThemeProvider';
import { ToastContainer } from './components/Toast';
import UserProfile from './components/UserProfile';
import SearchModal from './components/SearchModal';
import XPNotification from './components/XPNotification';
import LevelUpModal from './components/LevelUpModal';

// Import store
import { useAppStore } from './store/appStore';
import { scrollToPinnedSection } from './lib/scroll';

// Import icons
import { 
  MapTrifoldIcon, SquaresFourIcon, BrainIcon, 
  FolderIcon, RobotIcon, CommandIcon, MagnifyingGlassIcon,
  UserIcon, BellIcon, FireIcon, GraduationCapIcon, FolderPlusIcon
} from '@phosphor-icons/react';
import AcademyDialog from '@/components/academy/AcademyDialog';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import StartLearningModal from '@/components/StartLearningModal';
import { getAcademyTrack } from '@/academy/registry';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { label: 'Roadmap', icon: MapTrifoldIcon, section: 1 },
  { label: 'Dashboard', icon: SquaresFourIcon, section: 2 },
  { label: 'Notes', icon: BrainIcon, section: 8 },
  { label: 'Projects', icon: FolderIcon, section: 9 },
  { label: 'Mentor', icon: RobotIcon, section: 11 },
];

function App() {
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toasts, setToasts] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'achievement';
  }>>([]);
  const [xpNotification, setXpNotification] = useState<{ amount: number; reason: string } | null>(null);
  const [celebrateLevel, setCelebrateLevel] = useState<number | null>(null);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [academyTrackId, setAcademyTrackId] = useState<string | null>(null);
  const [academyNonce, setAcademyNonce] = useState(0);
  const [startLearningOpen, setStartLearningOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const { 
    stats, 
    unreadCount,
    notifications,
    markNotificationRead,
    clearNotifications,
  } = useAppStore();

  const scrollToSection = useCallback((index: number) => {
    scrollToPinnedSection(index);
  }, []);

  useEffect(() => {
    let prevLevel = useAppStore.getState().stats.level;
    const unsub = useAppStore.subscribe((state) => {
      const next = state.stats.level;
      if (next > prevLevel) {
        setCelebrateLevel(next);
        useAppStore.getState().addNotification({
          title: 'Level up',
          message: `You reached level ${next}.`,
          type: 'achievement',
        });
      }
      prevLevel = next;
    });
    return unsub;
  }, []);

  // Add toast
  const addToast = useCallback((title: string, message: string, type: 'success' | 'error' | 'info' | 'achievement') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
  }, []);

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        if (e.key !== 'Escape') return;
      }

      if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        setShowHelp(prev => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (showHelp) setShowHelp(false);
        if (showProfile) setShowProfile(false);
        if (showSearch) setShowSearch(false);
        if (showNotifications) setShowNotifications(false);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        return;
      }

      const keyMap: Record<string, number> = {
        'h': 0, 'r': 1, 'd': 2, 'l': 3, 't': 4,
        'b': 5, 'e': 6, 's': 7, 'n': 8, 'p': 9,
        'm': 10, 'a': 11,
      };

      if (keyMap[e.key.toLowerCase()] !== undefined) {
        e.preventDefault();
        scrollToSection(keyMap[e.key.toLowerCase()]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp, showProfile, showSearch, showNotifications, scrollToSection]);

  useEffect(() => {
    const onToast = (e: Event) => {
      const d = (e as CustomEvent<{ title: string; message: string; type: 'success' | 'error' | 'info' | 'achievement' }>).detail;
      if (d?.title) addToast(d.title, d.message ?? '', d.type ?? 'info');
    };
    window.addEventListener('devpath-toast', onToast);
    return () => window.removeEventListener('devpath-toast', onToast);
  }, [addToast]);

  useEffect(() => {
    if (!showNotifications) return;
    const close = (ev: MouseEvent) => {
      const t = ev.target;
      if (t instanceof Element && (t.closest('[data-notification-bell]') || t.closest('[data-notification-panel]'))) return;
      setShowNotifications(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [showNotifications]);

  // Setup global snap
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  // Welcome toast on first load
  useEffect(() => {
    const hasVisited = localStorage.getItem('devpath-visited');
    if (!hasVisited) {
      setTimeout(() => {
        addToast('Welcome to DevPath OS v3!', 'Press ? for keyboard shortcuts', 'info');
        localStorage.setItem('devpath-visited', 'true');
      }, 2000);
    }
  }, [addToast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const unreadNotifications = unreadCount();
  const academyTrack = academyTrackId ? getAcademyTrack(academyTrackId) : undefined;

  const launchAcademy = useCallback((trackId: string) => {
    setAcademyTrackId(trackId);
    setAcademyNonce((n) => n + 1);
    setAcademyOpen(true);
  }, []);

  return (
    <ThemeProvider>
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[200] px-[6vw] py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center">
              <CommandIcon size={18} className="text-neon" weight="fill" />
            </div>
            <span className="font-mono text-sm font-bold text-primary-light">
              DevPath OS
            </span>
            <span className="text-xs text-neon font-mono bg-neon/10 px-2 py-0.5 rounded">v3</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStartLearningOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-secondary-light transition-colors hover:border-neon/30 hover:bg-neon/10 hover:text-primary-light"
            >
              <GraduationCapIcon size={18} className="text-neon" weight="fill" />
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] sm:inline">
                Start Learning
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCreateProjectOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-secondary-light transition-colors hover:border-neon/30 hover:bg-neon/10 hover:text-primary-light"
              title="Project lab"
            >
              <FolderPlusIcon size={18} className="text-neon" weight="fill" />
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] sm:inline">
                New project
              </span>
            </button>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.section)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-secondary-light hover:text-primary-light hover:bg-white/5 transition-all text-sm"
              >
                <item.icon size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.08em]">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <button 
              onClick={() => setShowSearch(true)}
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-secondary-light hover:bg-white/10 transition-colors"
            >
              <MagnifyingGlassIcon size={16} />
              <span className="text-xs">Search</span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">⌘K</kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                type="button"
                data-notification-bell
                aria-expanded={showNotifications}
                aria-haspopup="true"
                onClick={() => setShowNotifications((v) => !v)}
                className="relative p-2 bg-white/5 rounded-lg text-secondary-light hover:bg-white/10 transition-colors"
              >
                <BellIcon size={18} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-0.5 bg-neon rounded-full text-[10px] text-background font-bold flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div
                  data-notification-panel
                  className="absolute right-0 top-full mt-2 w-80 max-h-72 overflow-auto rounded-xl border border-white/10 bg-[rgba(12,16,24,0.98)] shadow-xl z-[250] p-2"
                  role="menu"
                >
                  <div className="flex items-center justify-between px-2 py-1.5 mb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-secondary-light">Inbox</span>
                    {notifications.length > 0 && (
                      <button
                        type="button"
                        className="text-[10px] text-neon hover:underline"
                        onClick={() => clearNotifications()}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="px-2 py-4 text-sm text-secondary-light text-center">No notifications yet</p>
                  ) : (
                    <ul className="space-y-1">
                      {notifications.map((n) => (
                        <li key={n.id}>
                          <button
                            type="button"
                            className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                              n.read ? 'text-secondary-light hover:bg-white/5' : 'bg-neon/10 text-primary-light hover:bg-neon/15'
                            }`}
                            onClick={() => markNotificationRead(n.id)}
                          >
                            <span className="font-medium block">{n.title}</span>
                            <span className="text-xs opacity-80">{n.message}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Streak */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-orange-500/10 rounded-lg">
              <FireIcon size={16} className="text-orange-400" weight="fill" />
              <span className="text-sm font-bold text-orange-400">{stats.streak}</span>
            </div>

            {/* Profile */}
            <button 
              onClick={() => setShowProfile(true)}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon/30 to-neon/10 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <UserIcon size={18} className="text-neon" weight="fill" />
            </button>

            {/* Help */}
            <kbd 
              onClick={() => setShowHelp(true)}
              className="hidden md:flex items-center justify-center w-8 h-8 bg-white/5 rounded-lg text-xs font-mono text-secondary-light cursor-pointer hover:bg-white/10 transition-colors"
            >
              ?
            </kbd>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <StartLearningModal
        open={startLearningOpen}
        onOpenChange={setStartLearningOpen}
        onLaunchAcademy={launchAcademy}
        onGoRoadmap={() => scrollToSection(1)}
      />

      {academyTrack && (
        <AcademyDialog
          key={academyNonce}
          open={academyOpen}
          onOpenChange={setAcademyOpen}
          track={academyTrack}
        />
      )}

      <CreateProjectModal
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
      />

      <KeyboardHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <SearchModal
        key={showSearch ? 'search-open' : 'search-closed'}
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />

      {/* Effects */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {xpNotification && (
        <XPNotification 
          amount={xpNotification.amount} 
          reason={xpNotification.reason}
          onComplete={() => setXpNotification(null)}
        />
      )}

      {celebrateLevel !== null && (
        <LevelUpModal level={celebrateLevel} onClose={() => setCelebrateLevel(null)} />
      )}

      {/* Main Content */}
      <main className="bg-primary-dark relative z-10">
        <HeroSection />
        <RoadmapSection />
        <DashboardSection />
        <LearnSection />
        <TrySection />
        <BuildSection />
        <ExplainSection />
        <ReviewSection />
        <NotesSection />
        <ProjectSection />
        <MistakeSection />
        <MentorSection />
        <CTASection />
      </main>
    </ThemeProvider>
  );
}

export default App;