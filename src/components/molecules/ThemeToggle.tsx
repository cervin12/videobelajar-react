import React from 'react';

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle?: () => void;
  onSelectTheme?: (dark: boolean) => void;
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  onSelectTheme,
  className = '',
  id = 'themeToggle',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    } else if (onSelectTheme) {
      onSelectTheme(!isDark);
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
      {isDark ? (
        <span className="material-symbols-rounded text-xl text-pop-yellow">light_mode</span>
      ) : (
        <span className="material-symbols-rounded text-xl">dark_mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;
