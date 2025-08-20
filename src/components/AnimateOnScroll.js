'use client';

import { useState, useEffect, useRef } from 'react';

export default function AnimateOnScroll({ children, className, animationClasses, threshold = 0.1 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} transition-all duration-1000 ${isVisible ? animationClasses.visible : animationClasses.hidden}`}>
      {children}
    </div>
  );
}
