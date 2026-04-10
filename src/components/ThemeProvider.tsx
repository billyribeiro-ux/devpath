import { useEffect, useState, useSyncExternalStore } from 'react';
import { useAppStore, type Theme } from '../store/appStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppStore((state) => state.theme);
  const mounted = useIsClient();

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', t === 'dark');
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches);
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export function ThemeToggle() {
  const { theme, setTheme } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: 'Sun' },
    { value: 'dark', label: 'Dark', icon: 'Moon' },
    { value: 'system', label: 'System', icon: 'Monitor' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        title="Theme"
      >
        {theme === 'light' && <span className="text-lg">☀️</span>}
        {theme === 'dark' && <span className="text-lg">🌙</span>}
        {theme === 'system' && <span className="text-lg">💻</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-background border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${
                theme === t.value ? 'text-neon bg-neon/10' : 'text-secondary-light'
              }`}
            >
              <span>{t.label}</span>
              {theme === t.value && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
