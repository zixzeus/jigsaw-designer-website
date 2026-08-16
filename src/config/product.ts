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
  appStoreUrl: "https://apps.apple.com/app/jigsawdesigner/id6751882340",
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
