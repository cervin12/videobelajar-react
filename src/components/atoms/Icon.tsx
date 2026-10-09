import React from 'react';

export interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
}

const sizeClasses: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

export const Icon: React.FC<IconProps> = ({
  name,
  filled = false,
  className = '',
  size = 'md',
}) => {
  const sizeClass = size !== 'custom' ? sizeClasses[size] : '';
  const fillStyle = filled ? { fontVariationSettings: "'FILL' 1" } : undefined;

  return (
    <span
      className={`material-symbols-outlined leading-none select-none ${sizeClass} ${className}`}
      style={fillStyle}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
