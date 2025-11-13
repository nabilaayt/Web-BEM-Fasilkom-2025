import { useEffect, useRef, useState } from "react";

/**
 * useInView hook
 * Returns [ref, inView]
 * Options: root, rootMargin, threshold, once (default true)
 */
export default function useInView(options = {}) {
  const { root = null, rootMargin = "-10% 0px -10% 0px", threshold = 0.06, once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(entry.target);
          } else {
            if (!once) setInView(false);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [root, rootMargin, threshold, once]);

  return [ref, inView];
}
