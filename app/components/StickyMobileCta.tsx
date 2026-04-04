"use client";
import { useState } from "react";

export default function StickyMobileCta() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("stickyCtaDismissed") === "1";
    }
    return false;
  });

  if (dismissed) return null;

  function dismiss() {
    sessionStorage.setItem("stickyCtaDismissed", "1");
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 pb-[env(safe-area-inset-bottom,12px)]">
      <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-700 leading-snug shrink-0">
          Free Quote<br />No Obligation
        </p>
        <div className="flex gap-2 flex-1 justify-end">
          <a
            href="tel:+19896277291"
            className="bg-brand text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Call Now
          </a>
          <a
            href="#contact"
            className="bg-brand-accent text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Get Quote
          </a>
        </div>
        <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 ml-1 shrink-0" aria-label="Dismiss">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
