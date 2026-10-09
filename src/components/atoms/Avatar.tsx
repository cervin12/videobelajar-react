import React from 'react';

export interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  shadow?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  shadow: _shadow = false,
}) => {
  const shadowClass = '';

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover border-2 border-background-dark ${sizeClasses[size]} ${shadowClass} ${className}`}
      loading="lazy"
    />
  );
};
