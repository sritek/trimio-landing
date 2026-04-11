"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "trimio-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
    // Disable GA if user declines
    if (typeof window !== "undefined") {
      (window as any)["ga-disable-" + process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID] = true;
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 animate-fade-in">
      <div className="max-w-xl mx-auto bg-background border border-border rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 font-[family-name:var(--font-geist-sans)]">
        <p className="text-sm text-muted-foreground flex-1">
          We use cookies for analytics to improve your experience.{" "}
          <a href="/privacy" className="underline text-foreground hover:opacity-80">Learn more</a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-3 py-1.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
