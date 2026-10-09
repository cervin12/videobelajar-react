import React from 'react';
import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  iconName?: string;
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  iconName = 'expand_more',
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <select
        className={`w-full h-12 px-3.5 bg-white dark:bg-[#182235] neo-border rounded-xl text-background-dark dark:text-white font-bold text-sm appearance-none cursor-pointer focus:outline-none transition-all pr-10 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#182235] text-background-dark dark:text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-background-dark dark:text-slate-300 pointer-events-none flex items-center">
        <Icon name={iconName} size="md" className="font-bold" />
      </span>
    </div>
  );
};
