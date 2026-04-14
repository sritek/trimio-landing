"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const CONSENT_KEY = "trimio-cookie-consent";
const CONSENT_VERSION = "1"; // bump this to re-ask consent after policy changes

type ConsentState = "pending" | "accepted" | "declined";

function getStoredConsent(): ConsentState {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return "pending";
    const parsed = JSON.parse(stored);
    if (parsed.version !== CONSENT_VERSION) return "pending";
    return parsed.consent as ConsentState;
  } catch {
    return "pending";
  }
}

function storeConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      consent,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    }));
  } catch {}
}

/**
 * Injects GA4 script — only called after consent is granted.
 * Uses Google's gtag.js directly instead of @next/third-parties
 * so we have full control over when it loads.
 */
function loadGA4() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId || document.getElementById("ga4-script")) return;

  // Google consent mode — set to granted
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
  });

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) { window.dataLayer!.push(args); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId, { anonymize_ip: true });
  };
}

/**
 * Injects Microsoft Clarity — only called after consent is granted.
 */
function loadClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!clarityId || document.getElementById("clarity-script")) return;

  const script = document.createElement("script");
  script.id = "clarity-script";
  script.async = true;
  script.textContent = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`;
  document.head.appendChild(script);
}

/**
 * Removes all analytics cookies and reloads to clear in-memory state.
 */
function removeAnalyticsCookies() {
  const cookiesToRemove = ["_ga", "_gid", "_gat", "_clck", "_clsk"];
  const domain = window.location.hostname;

  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    if (cookiesToRemove.some(c => name.startsWith(c))) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
}

// Type declarations
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>("accepted"); // default to hide banner on SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);

    // If previously accepted, load analytics immediately
    if (stored === "accepted") {
      loadGA4();
      loadClarity();
    }

    // Set default consent mode for GA4 (denied until accepted)
    if (stored === "pending") {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) { window.dataLayer!.push(args); }
      window.gtag = gtag;
      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, []);

  const handleAccept = useCallback(() => {
    storeConsent("accepted");
    setConsent("accepted");
    loadGA4();
    loadClarity();
  }, []);

  const handleDecline = useCallback(() => {
    storeConsent("declined");
    setConsent("declined");
    removeAnalyticsCookies();

    // Disable GA
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (gaId) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
    }
  }, []);

  // Don't render on server or if consent already given
  if (!mounted || consent !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 animate-fade-in">
      <div className="max-w-lg mx-auto bg-background border border-border rounded-2xl shadow-2xl p-5 font-[family-name:var(--font-geist-sans)]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-foreground">Cookie preferences</h3>
          <button
            onClick={handleDecline}
            aria-label="Dismiss cookie banner"
            className="text-muted-foreground hover:text-foreground transition shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          We use cookies for analytics (Google Analytics, Microsoft Clarity) to understand how visitors use our site.
          No cookies are set until you accept.{" "}
          <a href="/privacy" className="underline text-foreground hover:opacity-80">Privacy Policy</a>
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="flex-1 text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition font-medium"
          >
            Decline all
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 text-sm px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
