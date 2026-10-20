import type {SiteLocale} from "./seo";

/**
 * Apple URL paths use storefront country codes, not website language codes.
 * These are deterministic defaults for each language, not visitor geolocation.
 * Keep the storefront explicit: Apple's regionless web link can land on Today.
 */
export const APP_STORE_STOREFRONTS = {
  en: "us",
  "zh-Hans": "cn",
  "zh-Hant": "tw",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  ja: "jp",
  ko: "kr",
  "pt-BR": "br",
  ru: "ru",
  tr: "tr",
  vi: "vn",
  th: "th",
  id: "id",
  ms: "my",
  hi: "in",
  ar: "sa",
  he: "il",
  nl: "nl",
  sv: "se",
  da: "dk",
  fi: "fi",
  no: "no",
  pl: "pl",
  ro: "ro",
  uk: "ua",
  cs: "cz",
  hu: "hu",
  el: "gr",
  hr: "hr",
  sk: "sk",
  ca: "es",
} as const satisfies Record<SiteLocale, string>;

// Apple App Store region selector, verified 2026-10-20:
// https://apps.apple.com/cn/app/jigsawdesigner/id6751882340
export const APP_STORE_COUNTRIES = [
  "ae", "af", "ag", "ai", "al", "am", "ao", "ar", "at", "au", "az", "ba",
  "bb", "be", "bf", "bg", "bh", "bj", "bm", "bn", "bo", "br", "bs", "bt",
  "bw", "by", "bz", "ca", "cd", "cg", "ch", "ci", "cl", "cm", "cn", "co",
  "cr", "cv", "cy", "cz", "de", "dk", "dm", "do", "dz", "ec", "ee", "eg",
  "es", "fi", "fj", "fm", "fr", "ga", "gb", "gd", "ge", "gh", "gm", "gr",
  "gt", "gw", "gy", "hk", "hn", "hr", "hu", "id", "ie", "il", "in", "iq",
  "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "kn", "kr", "kw", "ky",
  "kz", "la", "lb", "lc", "lk", "lr", "lt", "lu", "lv", "ly", "ma", "md",
  "me", "mg", "mk", "ml", "mm", "mn", "mo", "mr", "ms", "mt", "mu", "mv",
  "mw", "mx", "my", "mz", "na", "ne", "ng", "ni", "nl", "no", "np", "nr",
  "nz", "om", "pa", "pe", "pg", "ph", "pk", "pl", "pt", "pw", "py", "qa",
  "ro", "rs", "ru", "rw", "sa", "sb", "sc", "se", "sg", "si", "sk", "sl",
  "sn", "sr", "st", "sv", "sz", "tc", "td", "th", "tj", "tm", "tn", "to",
  "tr", "tt", "tw", "tz", "ua", "ug", "us", "uy", "uz", "vc", "ve", "vg",
  "vn", "vu", "xk", "ye", "za", "zm", "zw",
] as const;

const appStoreCountries = new Set<string>(APP_STORE_COUNTRIES);

export function isAppStoreCountry(value: string): boolean {
  return appStoreCountries.has(value);
}

function appStoreLocale(locale: string): SiteLocale {
  return Object.prototype.hasOwnProperty.call(APP_STORE_STOREFRONTS, locale)
    ? locale as SiteLocale
    : "en";
}

export function getAppStoreUrl(locale: string, country?: string | null): string {
  const normalizedCountry = country?.toLowerCase() ?? "";
  const storefront = isAppStoreCountry(normalizedCountry)
    ? normalizedCountry
    : APP_STORE_STOREFRONTS[appStoreLocale(locale)];
  return `https://apps.apple.com/${storefront}/app/jigsawdesigner/id${PRODUCT_FACTS.appStoreId}`;
}

export function getAppStoreDownloadPath(locale: string, country?: string | null): string {
  const normalizedCountry = country?.toLowerCase() ?? "";
  const path = `/api/app-store?locale=${appStoreLocale(locale)}`;
  return isAppStoreCountry(normalizedCountry) ? `${path}&country=${normalizedCountry}` : path;
}

export interface ProductFacts {
  readonly name: string;
  readonly websiteOrigin: string;
  readonly appStoreUrl: string;
  readonly appStoreId: string;
  readonly supportEmail: string;
  readonly defaultSocialImage: string;
  readonly appIcon: string;
  readonly currentVersion: string;
  readonly currentBuild: string;
  readonly platforms: readonly ["iPhone", "iPad", "Mac"];
  readonly operatingSystems: readonly ["iOS", "iPadOS", "macOS"];
  readonly exportFormats: readonly ["SVG"];
  readonly freeGenerationLimit: number;
  readonly premiumEntitlements: readonly PremiumEntitlement[];
  readonly purchase: {
    readonly provider: "Apple";
    readonly channel: "App Store";
    readonly subscriptionPeriods: readonly SubscriptionPeriod[];
  };
  readonly appUiLanguageCount: number;
}

export type PremiumEntitlement =
  | "unlimitedJigsawGeneration"
  | "svgExport";

export type SubscriptionPeriod = "monthly" | "yearly";

/**
 * Verified product facts shared by metadata and structured data.
 *
 * Keep claims, prices and release-channel state out of this object unless they
 * have an authoritative source. In particular, App Store storefront pricing is
 * intentionally not hard-coded here.
 */
export const PRODUCT_FACTS = {
  name: "JigsawDesigner",
  websiteOrigin: "https://jigsawdesigner.com",
  appStoreUrl: "https://apps.apple.com/us/app/jigsawdesigner/id6751882340",
  appStoreId: "6751882340",
  supportEmail: "zixzeus@jigsawdesigner.com",
  defaultSocialImage: "/og-jigsawdesigner-v1.jpg",
  appIcon: "/app-icon-v1.webp",
  currentVersion: "1.6.0",
  currentBuild: "36",
  platforms: ["iPhone", "iPad", "Mac"],
  operatingSystems: ["iOS", "iPadOS", "macOS"],
  exportFormats: ["SVG"],
  freeGenerationLimit: 5,
  premiumEntitlements: ["unlimitedJigsawGeneration", "svgExport"],
  purchase: {
    provider: "Apple",
    channel: "App Store",
    subscriptionPeriods: ["monthly", "yearly"],
  },
  appUiLanguageCount: 40,
} as const satisfies ProductFacts;
