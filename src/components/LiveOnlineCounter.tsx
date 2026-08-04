"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Keeps a "live" online-member number gently drifting around the latest
 * known real value (fetched from the Discord API), so the counter feels
 * alive instead of static between fetches. Tracks direction alongside the
 * value so the odometer digits know which way to slide.
 */
function useLiveOnlineCount(base: number) {
  const [state, setState] = useState<{ value: number; direction: 1 | -1 }>({
    value: base,
    direction: 1,
  });
  const baseRef = useRef(base);
  const targetRef = useRef(base);
  const [prevBase, setPrevBase] = useState(base);

  // re-center the drift target when a fresh real value arrives. Adjusting
  // state during render (rather than in an effect) mirrors React's
  // recommended pattern for "state that resets when a prop changes":
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  // (refs are synced separately below — mutating them during render isn't allowed)
  if (base !== prevBase) {
    setPrevBase(base);
    setState((s) => ({ value: base, direction: base >= s.value ? 1 : -1 }));
  }

  useEffect(() => {
    baseRef.current = base;
    targetRef.current = base;
  }, [base]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const delta = Math.round((Math.random() - 0.5) * 10); // roughly -5 ~ +5
      const drifted = targetRef.current + delta;
      const min = baseRef.current - 40;
      const max = baseRef.current + 40;
      const next = Math.min(max, Math.max(min, drifted));

      targetRef.current = next;
      setState((s) => ({ value: next, direction: next >= s.value ? 1 : -1 }));

      timeoutId = setTimeout(tick, 2800 + Math.random() * 2200);
    };

    timeoutId = setTimeout(tick, 2800 + Math.random() * 2200);
    return () => clearTimeout(timeoutId);
  }, []);

  return state;
}

function OdometerChar({
  char,
  direction,
  glyphClassName,
}: {
  char: string;
  direction: 1 | -1;
  glyphClassName: string;
}) {
  const isDigit = /[0-9]/.test(char);

  if (!isDigit) {
    // background-clip:text (used for the gradient) only paints an element's
    // own inline text, so the class must live on the element holding the
    // glyph itself, not on an ancestor wrapper.
    return (
      <span aria-hidden className={`inline-block ${glyphClassName}`}>
        {char}
      </span>
    );
  }

  return (
    // the box is sized in `em`s, which resolve against *this* element's own
    // font-size — so it needs the same size/weight classes as the glyph
    // inside it, or "1em" falls back to the ambient (much smaller) font-size
    <span
      className={`relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top ${glyphClassName}`}
    >
      {/*
        No AnimatePresence here on purpose: we only need the *incoming*
        digit to slide in (the outgoing one just needs to disappear, which
        the remount already does for free). Every motion component replays
        its initial -> animate transition on mount regardless of
        AnimatePresence, so a plain keyed remount is enough — and it avoids
        AnimatePresence's exit bookkeeping, which was leaving stale digit
        layers stacked up when values changed faster than the exit could
        finish.
      */}
      <motion.span
        key={char}
        initial={{ y: direction >= 0 ? "70%" : "-70%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute inset-0 flex items-center justify-center ${glyphClassName}`}
      >
        {char}
      </motion.span>
    </span>
  );
}

type LiveOnlineCounterProps = {
  memberCount: number;
  className?: string;
};

export function LiveOnlineCounter({ memberCount, className = "" }: LiveOnlineCounterProps) {
  const { value, direction } = useLiveOnlineCount(memberCount);
  const chars = value.toLocaleString().split("");

  return (
    <span aria-hidden className="font-mono-num inline-flex">
      {chars.map((char, idx) => (
        <OdometerChar key={idx} char={char} direction={direction} glyphClassName={className} />
      ))}
    </span>
  );
}
