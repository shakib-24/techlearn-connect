"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  duration = 1000
) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(target * progress);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setValue(target);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
