"use client";

import {useLocale} from "next-intl";

import {PRODUCT_FACTS} from "@/config/product";
import {usePathname} from "@/i18n/navigation";
import {trackAppStoreClick} from "@/lib/analytics";

export const APP_STORE_URL = PRODUCT_FACTS.appStoreUrl;

export type AppStoreClickLocation =
  | "header"
  | "hero"
  | "article"
  | "pricing"
  | "footer"
  | "support"
  | "changelog"
  | "showcase"
  | "learn"
  | "home-final";

type AppStoreCTAProps = {
  location: AppStoreClickLocation;
  label: string;
  ariaLabel?: string;
  pageId?: string;
  className?: string;
  badge?: boolean;
};

export default function AppStoreCTA({
  location,
  label,
  ariaLabel,
  pageId,
  className = "",
  badge = false,
}: AppStoreCTAProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/").filter(Boolean);
  if (pathnameSegments[0] === locale) pathnameSegments.shift();
  const resolvedPageId = pageId ?? (pathnameSegments.join("/") || "home");

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackAppStoreClick({pageId: resolvedPageId, locale, placement: location})
      }
      className={className}
      aria-label={ariaLabel ?? label}
    >
      {badge ? (
        // The official badge is supplied as a local asset and remains legible
        // when scripts or analytics are unavailable.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/app-store-badge.svg"
          alt={label}
          width="162"
          height="54"
          className="h-[54px] w-auto"
        />
      ) : (
        label
      )}
    </a>
  );
}
