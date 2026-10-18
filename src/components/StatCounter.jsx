import { useEffect, useRef, useState } from "react";
import { animate, irregular } from "animejs";

export default function StatCounter({ value, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const counter = { value: 0 };
            animate(counter, {
              value,
              duration,
              ease: irregular(6, 40),
              onUpdate: () => setDisplay(Math.round(counter.value)),
              onComplete: () => setDisplay(value),
            });
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="font-display tabular-nums">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
