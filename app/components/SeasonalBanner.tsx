"use client";
import { useState, useEffect } from "react";

export default function SeasonalBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show April (3) through August (7) — month is 0-indexed
    const month = new Date().getMonth();
    const inSeason = month >= 3 && month <= 7;
    const dismissed = sessionStorage.getItem("seasonalBannerDismissed") === "1";
    if (inSeason && !dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    sessionStorage.setItem("seasonalBannerDismissed", "1");
    setVisible(false);
  }

  return (
    <div className="bg-brand-accent text-white px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-center flex-1">
          Storm season is here — install slots are filling fast.{" "}
          <a href="#contact" className="underline font-bold hover:opacity-80">
            Get a free quote today
          </a>
          .
        </p>
        <button onClick={dismiss} className="shrink-0 hover:opacity-70 transition-opacity" aria-label="Dismiss banner">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
