import React from 'react';
import { useThemeStore } from '../../stores/useThemeStore';

export interface ThemeToggleProps {
  isDark?: boolean;
  onToggle?: () => void;
  onSelectTheme?: (dark: boolean) => void;
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark: propIsDark,
  onToggle,
  onSelectTheme,
  className = '',
  id = 'themeToggle',
}) => {
  const storeIsDark = useThemeStore((s) => s.isDark);
  const storeToggleTheme = useThemeStore((s) => s.toggleTheme);

  const effectiveIsDark = propIsDark !== undefined ? propIsDark : storeIsDark;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    } else if (onSelectTheme) {
      onSelectTheme(!effectiveIsDark);
    } else {
      storeToggleTheme();
    }
  };

  return (
    <button
      type="button"
      id={id}
      aria-label="Toggle theme"
      onClick={handleClick}
      className={`w-10 h-10 rounded-full border-2 border-neutral-900 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${className}`.trim()}
    >
      {effectiveIsDark ? (
        <span className="material-symbols-rounded text-xl text-pop-yellow">light_mode</span>
      ) : (
        <span className="material-symbols-rounded text-xl">dark_mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;
