import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: (e: MouseEvent<HTMLElement>) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'portfolio-theme';

const LIGHT_BG = '#f5f4ed';
const DARK_BG = '#141413';

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Call before React render to avoid theme flash */
export function applyThemeClassToDocument(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
  const animating = useRef(false);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyThemeClassToDocument(t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  useEffect(() => {
    applyThemeClassToDocument(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (animating.current) return;
      const next: Theme = theme === 'light' ? 'dark' : 'light';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTheme(next);
        return;
      }

      animating.current = true;
      const x = e.clientX;
      const y = e.clientY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      /** % radius is unreliable across browsers; px guarantees full cover from click point */
      const coverRadiusPx =
        Math.ceil(Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))) + 8;

      const overlay = document.createElement('div');
      const targetBg = next === 'dark' ? DARK_BG : LIGHT_BG;
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.cssText = [
        'position:fixed',
        'inset:0',
        'z-index:2147483646',
        'pointer-events:none',
        'will-change:clip-path',
        `background:${targetBg}`,
        `clip-path:circle(0px at ${x}px ${y}px)`,
      ].join(';');
      document.body.appendChild(overlay);

      const runExpand = () => {
        overlay.style.transition = 'clip-path 0.75s cubic-bezier(0.4, 0, 0.2, 1)';
        overlay.style.clipPath = `circle(${coverRadiusPx}px at ${x}px ${y}px)`;
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(runExpand);
      });

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        overlay.removeEventListener('transitionend', onEnd);
        applyThemeClassToDocument(next);
        localStorage.setItem(STORAGE_KEY, next);
        flushSync(() => {
          setThemeState(next);
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            overlay.remove();
            animating.current = false;
          });
        });
      };

      const onEnd = (ev: TransitionEvent) => {
        if (ev.propertyName === 'clip-path') finish();
      };

      overlay.addEventListener('transitionend', onEnd);
      window.setTimeout(finish, 1000);
    },
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
