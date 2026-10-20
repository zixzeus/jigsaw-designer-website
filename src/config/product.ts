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

function appStoreLocale(locale: string): SiteLocale {
  return Object.prototype.hasOwnProperty.call(APP_STORE_STOREFRONTS, locale)
    ? locale as SiteLocale
    : "en";
}

export function getAppStoreUrl(locale: string): string {
  const storefront = APP_STORE_STOREFRONTS[appStoreLocale(locale)];
  return `https://apps.apple.com/${storefront}/app/jigsawdesigner/id${PRODUCT_FACTS.appStoreId}`;
}

/** Legacy download endpoint retained for previously cached pages. */
export function getAppStoreDownloadPath(locale: string): string {
  return `/api/app-store?locale=${appStoreLocale(locale)}`;
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
