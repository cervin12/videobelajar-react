import { create } from 'zustand';

export interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const getInitialTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('skillpop-theme') || localStorage.getItem('theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }
  return false;
};

export const applyThemeToDOM = (isDark: boolean) => {
  if (typeof document !== 'undefined') {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (document.body) {
        document.body.classList.add('dark');
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (document.body) {
        document.body.classList.remove('dark');
      }
    }
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('skillpop-theme', isDark ? 'dark' : 'light');
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: getInitialTheme(),
  toggleTheme: () => {
    const next = !get().isDark;
    applyThemeToDOM(next);
    set({ isDark: next });
  },
  setTheme: (isDark: boolean) => {
    applyThemeToDOM(isDark);
    set({ isDark });
  },
}));
