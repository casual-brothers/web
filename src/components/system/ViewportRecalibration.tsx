"use client";

import { useEffect } from "react";

export default function ViewportRecalibration() {
  useEffect(() => {
    const repaintClass = "viewport-repaint-active";
    const sentinelId = "viewport-repaint-sentinel";

    const recalibrate = () => {
      const viewportWidth = Math.max(
        window.innerWidth,
        window.visualViewport?.width ?? 0,
        document.documentElement.clientWidth,
      );

      document.documentElement.style.setProperty("--app-vw", `${Math.round(viewportWidth)}px`);
      document.documentElement.classList.add(repaintClass);

      let sentinel = document.getElementById(sentinelId);
      if (!sentinel) {
        sentinel = document.createElement("div");
        sentinel.id = sentinelId;
        sentinel.setAttribute("aria-hidden", "true");
        document.body.appendChild(sentinel);
      }

      void document.documentElement.offsetWidth;
      void document.body.offsetWidth;
      window.dispatchEvent(new Event("resize"));

      requestAnimationFrame(() => {
        document.documentElement.classList.remove(repaintClass);
        sentinel?.remove();
      });
    };

    const schedule = () => {
      const delays = [0, 50, 150, 350, 750, 1500];
      const timers = delays.map((delay) => window.setTimeout(recalibrate, delay));
      requestAnimationFrame(() => requestAnimationFrame(recalibrate));
      return timers;
    };

    let timers = schedule();
    const reschedule = () => {
      timers.forEach(window.clearTimeout);
      timers = schedule();
    };

    window.addEventListener("load", reschedule, { once: true });
    window.addEventListener("pageshow", reschedule);
    window.addEventListener("orientationchange", reschedule);
    window.visualViewport?.addEventListener("resize", reschedule);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("pageshow", reschedule);
      window.removeEventListener("orientationchange", reschedule);
      window.visualViewport?.removeEventListener("resize", reschedule);
      document.documentElement.classList.remove(repaintClass);
      document.getElementById(sentinelId)?.remove();
    };
  }, []);

  return null;
}
