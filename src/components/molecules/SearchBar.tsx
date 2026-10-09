import React from 'react';
import { Icon } from '../atoms/Icon';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showKbd?: boolean;
  className?: string;
  id?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search course ...',
  showKbd = true,
  className = '',
  id = 'courseSearch',
}) => {
  return (
    <div className={`relative flex items-center w-full px-2 ${className}`}>
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-background-dark dark:text-slate-300 pointer-events-none flex items-center">
        <Icon name="search" size="md" className="font-bold" />
      </span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-14 bg-white dark:bg-[#182235] neo-border rounded-xl text-background-dark dark:text-white font-bold text-sm placeholder:text-slate-500 focus:outline-none focus:bg-[#FEF08A]/30 transition-all"
      />
      {showKbd && (
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#FDE047] text-background-dark font-extrabold text-[11px] border border-background-dark select-none pointer-events-none">
          ⌘K
        </kbd>
      )}
    </div>
  );
};
