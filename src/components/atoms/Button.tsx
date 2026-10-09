import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'yellow' | 'outline' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  neoShadow?: boolean;
  activeLift?: boolean;
  iconOnly?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#A3E635] text-background-dark hover:bg-primary-dark',
  secondary: 'bg-white dark:bg-[#1E293B] text-background-dark dark:text-white hover:bg-slate-100 dark:hover:bg-[#253248]',
  yellow: 'bg-[#FDE047] text-background-dark hover:bg-[#EAB308]',
  outline: 'bg-transparent text-background-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/5',
  ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-background-dark dark:hover:text-white border-transparent',
  icon: 'bg-white dark:bg-[#131A2A] text-background-dark dark:text-slate-200 hover:bg-[#FDE047]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  neoShadow: _neoShadow = false,
  activeLift = true,
  iconOnly = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const isGhost = variant === 'ghost';
  const borderClass = isGhost ? '' : 'neo-border';
  const shadowClass = '';
  const liftClass =
    activeLift && !disabled
      ? 'hover:-translate-y-0.5 active:translate-y-0'
      : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const sizeClass = iconOnly ? 'p-2' : sizeClasses[size];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-black tracking-wide rounded-xl transition-all select-none ${variantClasses[variant]} ${sizeClass} ${borderClass} ${shadowClass} ${liftClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
