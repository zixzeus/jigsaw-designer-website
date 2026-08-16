"use client";

import {useLocale, useTranslations} from "next-intl";
import {type ChangeEvent, useId, useTransition} from "react";

import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {locales, localeNames} from "@/i18n/config";
import {usePathname, useRouter} from "@/i18n/navigation";

const LANGUAGE_COOKIE = "jigsawdesigner.locale.v1";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const navigation = useTranslations('Navigation');
  const router = useRouter();
  const pathname = usePathname();
  const selectId = useId();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    if (!isSiteLocale(nextLocale)) return;

    // The preference is essential site state, written only after an explicit
    // selection. Root routing remains deterministic at /en; this cookie is for
    // later user-facing language choices, not automatic IP/browser detection.
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(nextLocale)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;

    const destination = isRouteAvailable(pathname, nextLocale) ? pathname : "/";
    startTransition(() => {
      router.replace(destination, {locale: nextLocale});
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <svg
        aria-hidden="true"
        className="me-1 h-4 w-4 text-gray-600 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <label htmlFor={selectId} className="sr-only">
        {navigation("language")}
      </label>
      <select
        id={selectId}
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="cursor-pointer appearance-none rounded-md bg-transparent py-1 pe-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:cursor-wait disabled:opacity-60 dark:text-gray-200 dark:focus:ring-primary-light"
      >
        {locales.map((l) => (
          <option key={l} value={l} className="bg-white text-black">
            {localeNames[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
