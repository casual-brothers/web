"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_EVENT,
  openCookiePreferences,
  readCookieConsent,
} from "@/lib/cookieConsent";

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
}

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    if (parsed.pathname.includes("/embed/")) return parsed.pathname.split("/embed/")[1]?.split("/")[0] || "";
    return parsed.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

export default function LiteYouTubeEmbed({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const consent = useSyncExternalStore(subscribeToConsent, readCookieConsent, () => null);
  const videoId = useMemo(() => extractYouTubeId(url), [url]);

  if (!videoId) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand underline">
        {title}
      </a>
    );
  }

  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const hasMediaConsent = consent === "accepted";

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
      {active && hasMediaConsent ? (
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : hasMediaConsent ? (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group relative aspect-video w-full cursor-pointer overflow-hidden text-left"
          aria-label={`Play ${title}`}
        >
          <img src={thumbnail} alt="" className="h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-95" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-brand px-6 py-4 font-display text-xs font-black uppercase tracking-[0.14em] text-background transition-colors group-hover:bg-white">
              Play trailer
            </span>
          </span>
        </button>
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#11151a] to-black px-6 text-center">
          <p className="max-w-xl text-sm leading-relaxed text-white/60">
            This trailer is hosted by YouTube. Accept external media to load it.
          </p>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="rounded border border-brand bg-brand px-5 py-3 font-display text-xs font-black uppercase tracking-[0.12em] text-background transition-colors hover:bg-brand-hover hover:text-white"
          >
            Cookie preferences
          </button>
        </div>
      )}
      <noscript>
        <a href={url}>{title}</a>
      </noscript>
    </div>
  );
}
