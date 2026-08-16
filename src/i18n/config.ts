import {
  DEFAULT_LOCALE,
  LOCALE_SPECS,
  SITE_LOCALES,
  type SiteLocale,
} from "@/config/seo";

export const locales = SITE_LOCALES;
export type Locale = SiteLocale;
export const defaultLocale: Locale = DEFAULT_LOCALE;

export const localeNames = Object.fromEntries(
  locales.map((locale) => [locale, LOCALE_SPECS[locale].label]),
) as Record<Locale, string>;
