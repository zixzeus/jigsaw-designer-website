"use client";

import {getAppStoreDownloadPath} from "@/config/product";
import type {AppStoreCopy} from "@/content/app-store";
import type {AppStoreCTAProps} from "./AppStoreCTA";
import {usePathname} from "@/i18n/navigation";
import {trackAppStoreClick} from "@/lib/analytics";
import {setAppStoreCountry, useAppStoreCountry} from "@/lib/app-store-preference";

type ClientProps = AppStoreCTAProps & {
  locale: string;
  copy: AppStoreCopy;
  countries: {code: string; name: string}[];
};

export default function AppStoreCTAClient({
  locale,
  copy,
  countries,
  location,
  label,
  ariaLabel,
  pageId,
  className = "",
}: ClientProps) {
  const country = useAppStoreCountry();
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/").filter(Boolean);
  if (pathnameSegments[0] === locale) pathnameSegments.shift();
  const resolvedPageId = pageId ?? (pathnameSegments.join("/") || "home");

  return (
    <div className={`app-store-download ${className}`}>
      <a
        href={getAppStoreDownloadPath(locale, country)}
        data-app-store-placement={location}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackAppStoreClick({pageId: resolvedPageId, locale, placement: location})
        }
        className="app-store-badge-link"
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
      <label className="app-store-region">
        <span>{copy.regionLabel}</span>
        <select
          value={country}
          onChange={(event) => setAppStoreCountry(event.target.value)}
          aria-label={copy.regionLabel}
        >
          <option value="">{copy.automaticLabel}</option>
          {countries.map(({code, name}) => <option key={code} value={code}>{name}</option>)}
        </select>
      </label>
    </div>
  );
}
