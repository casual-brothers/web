export const COOKIE_CONSENT_KEY = "cb-cookie-consent";
export const COOKIE_CONSENT_EVENT = "cb-cookie-consent-change";
export const COOKIE_PREFERENCES_EVENT = "cb-cookie-preferences-open";

export type CookieConsent = "accepted" | "rejected" | null;

export function readCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function saveCookieConsent(value: Exclude<CookieConsent, null>) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
}
