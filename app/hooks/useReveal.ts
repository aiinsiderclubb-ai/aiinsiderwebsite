import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight replacement for framer-motion's useInView.
 * Returns a ref to attach and a boolean that flips to true once
 * the element enters the viewport (with optional rootMargin).
 */
export function useReveal(rootMargin = '-80px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
}
