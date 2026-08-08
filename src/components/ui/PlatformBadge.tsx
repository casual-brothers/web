import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/basePath";

type PlatformBadgeProps = {
  platform: string;
  compact?: boolean;
  href?: string;
};

type PlatformMeta = {
  asset?: string;
  alt: string;
  label: string;
  tone: string;
  kind?: "device";
};

function getPlatformMeta(platform: string): PlatformMeta {
  const value = platform.toLowerCase();

  if (value.includes("nintendo switch 2")) {
    return {
      asset: "/images/nintendo-2-1.svg",
      alt: "Nintendo Switch logo",
      label: "Switch 2",
      tone: "#e60012",
    };
  }

  if (value.includes("nintendo switch")) {
    return {
      asset: "/images/nintendo-2-1.svg",
      alt: "Nintendo Switch logo",
      label: "Switch",
      tone: "#e60012",
    };
  }

  if (value.includes("playstation 5")) {
    return {
      asset: "/images/playstation-wordmark.svg",
      alt: "PlayStation logo",
      label: "PS5",
      tone: "#0070cc",
    };
  }

  if (value.includes("playstation 4")) {
    return {
      asset: "/images/playstation-wordmark.svg",
      alt: "PlayStation logo",
      label: "PS4",
      tone: "#0070cc",
    };
  }

  if (value.includes("playstation")) {
    return {
      asset: "/images/playstation-wordmark.svg",
      alt: "PlayStation logo",
      label: "PlayStation",
      tone: "#0070cc",
    };
  }

  if (value.includes("xbox series")) {
    return {
      asset: "/images/xbox-9.svg",
      alt: "Xbox logo",
      label: "Series X|S",
      tone: "#107c10",
    };
  }

  if (value.includes("xbox one")) {
    return {
      asset: "/images/xbox-9.svg",
      alt: "Xbox logo",
      label: "Xbox One",
      tone: "#107c10",
    };
  }

  if (value.includes("xbox")) {
    return {
      asset: "/images/xbox-9.svg",
      alt: "Xbox logo",
      label: "Xbox",
      tone: "#107c10",
    };
  }

  if (value.includes("nintendo")) {
    return {
      asset: "/images/nintendo-2-1.svg",
      alt: "Nintendo logo",
      label: "Nintendo",
      tone: "#e60012",
    };
  }

  if (value === "pc" || value.includes("windows")) {
    return {
      alt: "PC platform icon",
      label: "PC",
      tone: "#00a4ef",
      kind: "device",
    };
  }

  if (value.includes("steam")) {
    return {
      asset: "/images/steam.svg",
      alt: "Steam logo",
      label: "Steam",
      tone: "#8ab4f8",
    };
  }

  return {
    alt: `${platform} platform icon`,
    label: platform,
    tone: "#7cff00",
    kind: "device",
  };
}

function DeviceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="3" y="3.5" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 20.5h8M12 15.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 7.5h9M7.5 10.5h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity=".65" />
    </svg>
  );
}

export default function PlatformBadge({ platform, compact = false, href }: PlatformBadgeProps) {
  const meta = getPlatformMeta(platform);

  const badge = (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/25 hover:text-white ${compact ? "px-3 py-2 text-[10px]" : "px-3.5 py-2.5 text-[11px]"}`}
      style={{ ["--platform-tone" as string]: meta.tone }}
      aria-label={platform}
    >
      <span
        className="flex h-5 min-w-5 items-center justify-center text-[var(--platform-tone)]"
        aria-hidden="true"
      >
        {meta.asset ? (
          <Image
            src={assetPath(meta.asset)}
            alt=""
            width={meta.asset.includes("windows") ? 20 : 84}
            height={meta.asset.includes("windows") ? 20 : 22}
            className={`h-auto w-auto max-w-[84px] object-contain ${meta.asset.includes("xbox") ? "max-h-5" : "max-h-4"}`}
          />
        ) : (
          <DeviceIcon />
        )}
      </span>
      <span className="font-display font-bold uppercase tracking-[0.08em]">{meta.label}</span>
      {href && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 opacity-55" />}
    </span>
  );

  if (!href) return badge;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${platform} — open store`}>
      {badge}
    </a>
  );
}
