"use client";

import { useEffect } from "react";

export default function ViewportRecalibration() {
  useEffect(() => {
    const recalibrate = () => {
      document.documentElement.style.setProperty("--app-vw", `${window.innerWidth}px`);
      window.dispatchEvent(new Event("resize"));
    };

    const schedule = () => {
      recalibrate();
      requestAnimationFrame(() => {
        recalibrate();
        requestAnimationFrame(recalibrate);
      });
    };

    schedule();
    window.addEventListener("load", schedule, { once: true });
    window.addEventListener("pageshow", schedule);

    return () => {
      window.removeEventListener("pageshow", schedule);
    };
  }, []);

  return null;
}
