export interface LocaleSpec {
  readonly locale: string;
  readonly label: string;
  readonly htmlLang: string;
  readonly hreflang: string;
  readonly openGraphLocale: string;
  readonly direction: "ltr" | "rtl";
}

export const SITE_LOCALES = [
  "en",
  "zh-Hans",
  "zh-Hant",
  "es",
  "fr",
  "de",
  "it",
  "ja",
  "ko",
  "pt-BR",
  "ru",
  "tr",
  "vi",
  "th",
  "id",
  "ms",
  "hi",
  "ar",
  "he",
  "nl",
  "sv",
  "da",
  "fi",
  "no",
  "pl",
  "ro",
  "uk",
  "cs",
  "hu",
  "el",
  "hr",
  "sk",
  "ca",
] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = "en";

export const PRIMARY_SEO_LOCALES = [
  "en",
  "zh-Hans",
  "zh-Hant",
] as const satisfies readonly SiteLocale[];

export const LOCALE_SPECS = {
  en: {locale: "en", label: "English", htmlLang: "en", hreflang: "en", openGraphLocale: "en_US", direction: "ltr"},
  "zh-Hans": {locale: "zh-Hans", label: "简体中文", htmlLang: "zh-Hans", hreflang: "zh-Hans", openGraphLocale: "zh_CN", direction: "ltr"},
  "zh-Hant": {locale: "zh-Hant", label: "繁體中文", htmlLang: "zh-Hant", hreflang: "zh-Hant", openGraphLocale: "zh_TW", direction: "ltr"},
  es: {locale: "es", label: "Español", htmlLang: "es", hreflang: "es", openGraphLocale: "es_ES", direction: "ltr"},
  fr: {locale: "fr", label: "Français", htmlLang: "fr", hreflang: "fr", openGraphLocale: "fr_FR", direction: "ltr"},
  de: {locale: "de", label: "Deutsch", htmlLang: "de", hreflang: "de", openGraphLocale: "de_DE", direction: "ltr"},
  it: {locale: "it", label: "Italiano", htmlLang: "it", hreflang: "it", openGraphLocale: "it_IT", direction: "ltr"},
  ja: {locale: "ja", label: "日本語", htmlLang: "ja", hreflang: "ja", openGraphLocale: "ja_JP", direction: "ltr"},
  ko: {locale: "ko", label: "한국어", htmlLang: "ko", hreflang: "ko", openGraphLocale: "ko_KR", direction: "ltr"},
  "pt-BR": {locale: "pt-BR", label: "Português (Brasil)", htmlLang: "pt-BR", hreflang: "pt-BR", openGraphLocale: "pt_BR", direction: "ltr"},
  ru: {locale: "ru", label: "Русский", htmlLang: "ru", hreflang: "ru", openGraphLocale: "ru_RU", direction: "ltr"},
  tr: {locale: "tr", label: "Türkçe", htmlLang: "tr", hreflang: "tr", openGraphLocale: "tr_TR", direction: "ltr"},
  vi: {locale: "vi", label: "Tiếng Việt", htmlLang: "vi", hreflang: "vi", openGraphLocale: "vi_VN", direction: "ltr"},
  th: {locale: "th", label: "ไทย", htmlLang: "th", hreflang: "th", openGraphLocale: "th_TH", direction: "ltr"},
  id: {locale: "id", label: "Bahasa Indonesia", htmlLang: "id", hreflang: "id", openGraphLocale: "id_ID", direction: "ltr"},
  ms: {locale: "ms", label: "Bahasa Melayu", htmlLang: "ms", hreflang: "ms", openGraphLocale: "ms_MY", direction: "ltr"},
  hi: {locale: "hi", label: "हिन्दी", htmlLang: "hi", hreflang: "hi", openGraphLocale: "hi_IN", direction: "ltr"},
  ar: {locale: "ar", label: "العربية", htmlLang: "ar", hreflang: "ar", openGraphLocale: "ar_SA", direction: "rtl"},
  he: {locale: "he", label: "עברית", htmlLang: "he", hreflang: "he", openGraphLocale: "he_IL", direction: "rtl"},
  nl: {locale: "nl", label: "Nederlands", htmlLang: "nl", hreflang: "nl", openGraphLocale: "nl_NL", direction: "ltr"},
  sv: {locale: "sv", label: "Svenska", htmlLang: "sv", hreflang: "sv", openGraphLocale: "sv_SE", direction: "ltr"},
  da: {locale: "da", label: "Dansk", htmlLang: "da", hreflang: "da", openGraphLocale: "da_DK", direction: "ltr"},
  fi: {locale: "fi", label: "Suomi", htmlLang: "fi", hreflang: "fi", openGraphLocale: "fi_FI", direction: "ltr"},
  no: {locale: "no", label: "Norsk", htmlLang: "no", hreflang: "no", openGraphLocale: "no_NO", direction: "ltr"},
  pl: {locale: "pl", label: "Polski", htmlLang: "pl", hreflang: "pl", openGraphLocale: "pl_PL", direction: "ltr"},
  ro: {locale: "ro", label: "Română", htmlLang: "ro", hreflang: "ro", openGraphLocale: "ro_RO", direction: "ltr"},
  uk: {locale: "uk", label: "Українська", htmlLang: "uk", hreflang: "uk", openGraphLocale: "uk_UA", direction: "ltr"},
  cs: {locale: "cs", label: "Čeština", htmlLang: "cs", hreflang: "cs", openGraphLocale: "cs_CZ", direction: "ltr"},
  hu: {locale: "hu", label: "Magyar", htmlLang: "hu", hreflang: "hu", openGraphLocale: "hu_HU", direction: "ltr"},
  el: {locale: "el", label: "Ελληνικά", htmlLang: "el", hreflang: "el", openGraphLocale: "el_GR", direction: "ltr"},
  hr: {locale: "hr", label: "Hrvatski", htmlLang: "hr", hreflang: "hr", openGraphLocale: "hr_HR", direction: "ltr"},
  sk: {locale: "sk", label: "Slovenčina", htmlLang: "sk", hreflang: "sk", openGraphLocale: "sk_SK", direction: "ltr"},
  ca: {locale: "ca", label: "Català", htmlLang: "ca", hreflang: "ca", openGraphLocale: "ca_ES", direction: "ltr"},
} as const satisfies Record<SiteLocale, LocaleSpec>;

export const LEGACY_LOCALE_REDIRECTS = {
  zh: "zh-Hans",
  pt: "pt-BR",
} as const satisfies Record<string, SiteLocale>;

export function isSiteLocale(locale: string): locale is SiteLocale {
  return Object.prototype.hasOwnProperty.call(LOCALE_SPECS, locale);
}

export type SeoRouteKind = "base" | "hub" | "marketing" | "guide" | "release" | "legal";

export interface SeoRoute {
  readonly pathname: string;
  readonly kind: SeoRouteKind;
  readonly locales: readonly SiteLocale[];
  readonly indexable: boolean;
  readonly includeInSitemap: boolean;
  readonly changeFrequency: "weekly" | "monthly" | "yearly";
  readonly priority: number;
}

export const SEO_ROUTES = [
  {pathname: "/", kind: "base", locales: SITE_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "weekly", priority: 1},
  {pathname: "/help", kind: "base", locales: SITE_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/support", kind: "base", locales: SITE_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.6},
  {pathname: "/privacy", kind: "base", locales: SITE_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "yearly", priority: 0.3},
  {pathname: "/showcase", kind: "hub", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/learn", kind: "hub", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/pricing", kind: "marketing", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/jigsaw-puzzle-generator", kind: "marketing", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/jigsaw-dieline-generator", kind: "marketing", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/laser-cut-jigsaw-puzzle-svg", kind: "marketing", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/custom-jigsaw-puzzle-template", kind: "marketing", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/svg-puzzle-editor", kind: "marketing", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/how-to-make-a-laser-cut-jigsaw-puzzle", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8},
  {pathname: "/changelog/1-6-0", kind: "release", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "yearly", priority: 0.6},
  {pathname: "/help/getting-started", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/jigsaw-generation", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/svg-import-export", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/vector-editing", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/templates", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/project-library", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/keyboard-shortcuts", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/help/troubleshooting", kind: "guide", locales: PRIMARY_SEO_LOCALES, indexable: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.7},
  {pathname: "/terms", kind: "legal", locales: PRIMARY_SEO_LOCALES, indexable: false, includeInSitemap: false, changeFrequency: "yearly", priority: 0.1},
  {pathname: "/refund-policy", kind: "legal", locales: PRIMARY_SEO_LOCALES, indexable: false, includeInSitemap: false, changeFrequency: "yearly", priority: 0.1},
] as const satisfies readonly SeoRoute[];

export function normalizeSeoPathname(pathname: string): string {
  const withoutQueryOrHash = pathname.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = withoutQueryOrHash.startsWith("/")
    ? withoutQueryOrHash
    : `/${withoutQueryOrHash}`;

  return withLeadingSlash === "/"
    ? "/"
    : withLeadingSlash.replace(/\/+$/, "");
}

export function getSeoRoute(pathname: string): SeoRoute | undefined {
  const normalizedPathname = normalizeSeoPathname(pathname);
  return SEO_ROUTES.find((route) => route.pathname === normalizedPathname);
}

export function isRouteAvailable(
  pathname: string,
  locale: SiteLocale,
): boolean {
  return getSeoRoute(pathname)?.locales.includes(locale) ?? false;
}
