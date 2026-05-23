"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GrantBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("grantBannerDismissed") === "1";
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("grantBannerDismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="bg-green-700 text-white px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-center flex-1">
          Michigan homeowners: Get up to{" "}
          <span className="text-yellow-300 font-extrabold">$7,131.75 back</span>{" "}
          on a safe room installation.{" "}
          <Link href="/grant" className="underline font-bold hover:opacity-80">
            Learn More &rarr;
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss grant banner"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
