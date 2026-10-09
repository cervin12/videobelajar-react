import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export type ScrollAnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'pop';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: ScrollAnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce,
  });

  const variantClassMap: Record<ScrollAnimationVariant, string> = {
    'fade-up': 'aos-fade-up',
    'fade-down': 'aos-fade-down',
    'fade-left': 'aos-fade-left',
    'fade-right': 'aos-fade-right',
    'zoom-in': 'aos-zoom-in',
    pop: 'aos-pop',
  };

  const animationClass = variantClassMap[variant] || 'aos-fade-up';

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={`aos-item ${animationClass} ${
        isVisible ? 'aos-visible' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
