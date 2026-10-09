import React from 'react';

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  className = '',
  id,
}) => {
  const displayClass = className.includes('hidden') ? '' : 'flex';

  return (
    <button
      id={id}
      aria-label="Toggle theme"
      onClick={onToggle}
      className={`w-10 h-10 rounded-full border-2 border-neutral-900 dark:border-neutral-700 items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer ${displayClass} ${className}`.trim()}
      type="button"
    >
      {isDark ? (
        <span className="material-symbols-rounded text-xl text-pop-yellow">light_mode</span>
      ) : (
        <span className="material-symbols-rounded text-xl">dark_mode</span>
      )}
    </button>
  );
};
