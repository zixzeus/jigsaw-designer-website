import {changelogSlugs, getChangelogPage, type ChangelogSlug} from "./changelog-pages";
import {HOME_PAGES, type HomePageContent} from "./home-pages";
import {getHelpPage, helpSlugs, type HelpSlug} from "./help-pages";
import {
  getLearnPage,
  getShowcasePage,
  type LearnPageContent,
  type ShowcasePageContent,
} from "./hub-pages";
import {
  getMarketingPage,
  marketingSlugs,
  type MarketingSlug,
} from "./marketing-pages";
import {
  footerPageCopy,
  pricingPageCopy,
  supportPageCopy,
  type FooterPageCopy,
  type PricingCopy,
  type SupportPageCopy,
} from "./page-copy";
import type {ArticleContent} from "./types";
import enMessages from "@/messages/en.json";

export type LocaleContentBundle = {
  home: HomePageContent;
  showcase: ShowcasePageContent;
  learn: LearnPageContent;
  marketing: Record<MarketingSlug, ArticleContent>;
  help: Record<HelpSlug, ArticleContent>;
  changelog: Record<ChangelogSlug, ArticleContent>;
  pricing: PricingCopy;
  support: SupportPageCopy;
  footer: FooterPageCopy;
};

export type FullMessageNamespaces = Pick<
  typeof enMessages,
  "Pricing" | "Terms" | "Refund"
>;

export type SiteTranslationSource = {
  content: LocaleContentBundle;
  messageNamespaces: FullMessageNamespaces;
};

function required<T>(value: T | null | undefined, label: string): T {
  if (!value) throw new Error(`Missing English translation source: ${label}`);
  return value;
}

export function getEnglishTranslationSource(): LocaleContentBundle {
  return {
    home: HOME_PAGES.en,
    showcase: required(getShowcasePage("en"), "showcase"),
    learn: required(getLearnPage("en"), "learn"),
    marketing: Object.fromEntries(
      marketingSlugs.map((slug) => [
        slug,
        required(getMarketingPage(slug, "en"), `marketing.${slug}`),
      ]),
    ) as Record<MarketingSlug, ArticleContent>,
    help: Object.fromEntries(
      helpSlugs.map((slug) => [
        slug,
        required(getHelpPage(slug, "en"), `help.${slug}`),
      ]),
    ) as Record<HelpSlug, ArticleContent>,
    changelog: Object.fromEntries(
      changelogSlugs.map((slug) => [
        slug,
        required(getChangelogPage(slug, "en"), `changelog.${slug}`),
      ]),
    ) as Record<ChangelogSlug, ArticleContent>,
    pricing: pricingPageCopy.en,
    support: supportPageCopy.en,
    footer: footerPageCopy.en,
  };
}

export function getEnglishSiteTranslationSource(): SiteTranslationSource {
  return {
    content: getEnglishTranslationSource(),
    messageNamespaces: {
      Pricing: enMessages.Pricing,
      Terms: enMessages.Terms,
      Refund: enMessages.Refund,
    },
  };
}
