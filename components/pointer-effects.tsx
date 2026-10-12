"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to CSS. Every element marked `data-spotlight`
 * gets `--mx` / `--my` (pointer position relative to itself), and the visual
 * effects in globals.css read those. Only runs for mouse/trackpad users who
 * haven't asked for reduced motion; the effects stay hidden otherwise.
 */
export function PointerEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const root = document.documentElement;
    root.dataset.pointerFx = "";

    let x = -9999;
    let y = -9999;
    let frame = 0;

    const update = () => {
      frame = 0;
      const elements = document.querySelectorAll<HTMLElement>("[data-spotlight]");
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        // Skip anything well outside the viewport.
        if (rect.bottom < -400 || rect.top > window.innerHeight + 400) continue;
        el.style.setProperty("--mx", `${x - rect.left}px`);
        el.style.setProperty("--my", `${y - rect.top}px`);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // Elements move under a still pointer while scrolling.
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      delete root.dataset.pointerFx;
    };
  }, []);

  return null;
}
