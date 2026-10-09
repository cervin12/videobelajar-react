import { useEffect, useRef, useState } from 'react';

export interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => {
              setIsVisible(true);
            }, delay);
            if (triggerOnce) {
              observer.unobserve(element);
            }
            return () => clearTimeout(timer);
          } else {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(element);
            }
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isVisible };
}
