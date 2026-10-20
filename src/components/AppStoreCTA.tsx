"use client";

import {useLocale} from "next-intl";

import {getAppStoreUrl} from "@/config/product";
import {usePathname} from "@/i18n/navigation";
import {trackAppStoreClick} from "@/lib/analytics";

export type AppStoreClickLocation =
  | "hero"
  | "article"
  | "pricing"
  | "footer"
  | "support"
  | "changelog"
  | "showcase"
  | "learn"
  | "home-final";

export type AppStoreCTAProps = {
  location: AppStoreClickLocation;
  label: string;
  ariaLabel?: string;
  pageId?: string;
  className?: string;
};

export default function AppStoreCTA({
  location,
  label,
  ariaLabel,
  pageId,
  className = "",
}: AppStoreCTAProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/").filter(Boolean);
  if (pathnameSegments[0] === locale) pathnameSegments.shift();
  const resolvedPageId = pageId ?? (pathnameSegments.join("/") || "home");

  return (
    <a
      href={getAppStoreUrl(locale)}
      data-app-store-placement={location}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAppStoreClick({pageId: resolvedPageId, locale, placement: location})}
      className={`app-store-badge-link ${className}`}
      aria-label={ariaLabel ?? label}
    >
      {/* Reuse Apple's supplied artwork unchanged; the accessible label is localized. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/app-store-badge.svg"
        alt={label}
        width="162"
        height="54"
        className="h-[54px] w-auto"
      />
    </a>
  );
}
