// Google Analytics 4 helper — loads only after cookie consent is granted.
// Configure your real values in a local .env file (see .env.example):
//   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
//   VITE_GA_API_SECRET=your_api_secret
// On Render, set these same two variables under your service's
// Environment tab so the production build picks them up too.

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
export const GA_API_SECRET = import.meta.env.VITE_GA_API_SECRET || "";

const CONSENT_KEY = "analytics-consent";

export function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY); // "granted" | "denied" | null
  } catch {
    return null;
  }
}

export function setStoredConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage unavailable (e.g. private browsing) — fail silently,
    // banner will just reappear next visit.
  }
}

let gaLoaded = false;

export function loadGA() {
  if (gaLoaded || !GA_MEASUREMENT_ID) {
    if (!GA_MEASUREMENT_ID) {
      console.warn(
        "Analytics: VITE_GA_MEASUREMENT_ID is not set — add it to your .env file (see .env.example)"
      );
    }
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  gaLoaded = true;
}

// Call this on app load if consent was already granted in a previous visit.
export function initAnalyticsIfConsented() {
  if (getStoredConsent() === "granted") {
    loadGA();
  }
}

// Track a custom event (e.g. resume download). No-ops silently if GA
// hasn't loaded (no consent yet, or ID not configured).
export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// Records a single anonymous "decline" event via GA4's Measurement Protocol.
// This does NOT use gtag.js and does NOT set any browser cookie — it's a
// one-off, ephemeral, unlinkable ping so declines can still be counted
// without tracking the visitor who declined. The client_id is generated
// fresh each time and never stored, so it can't be used to identify or
// re-identify anyone across visits.
export function trackDeclineAnonymously() {
  if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
    console.warn(
      "Analytics: decline tracking skipped — set VITE_GA_MEASUREMENT_ID and VITE_GA_API_SECRET in your .env file"
    );
    return;
  }

  const ephemeralClientId = `${Date.now()}.${Math.floor(Math.random() * 1e10)}`;

  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: ephemeralClientId,
        events: [{ name: "cookie_declined" }],
      }),
    }
  ).catch(() => {
    // Fail silently — this is a best-effort anonymous ping, never worth
    // surfacing an error to the visitor over.
  });
}