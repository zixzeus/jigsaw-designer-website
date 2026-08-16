import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  PRODUCT_FACTS,
  type PremiumEntitlement,
  type SubscriptionPeriod,
} from "@/config/product";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {
  isTierOneLocale,
  tierOneLocales,
  type TierOneLocale,
} from "@/content/types";
import {createBreadcrumbJsonLd, createPageMetadata} from "@/lib/seo";

const pageCopy: Record<TierOneLocale, {
  freeName: string;
  freeDescription: string;
  freeFeature: (count: number) => string;
  premiumName: string;
  premiumDescription: (provider: string) => string;
  billingTitle: (channel: string) => string;
  storeNote: (provider: string, channel: string) => string;
}> = {
  en: {
    freeName: "Free",
    freeDescription: "Explore puzzle generation before starting a subscription.",
    freeFeature: (count) => `${count} puzzle generations`,
    premiumName: "Premium",
    premiumDescription: (provider) => `Unlock the two current paid capabilities with an ${provider} subscription.`,
    billingTitle: (channel) => `Choose monthly or yearly billing in the ${channel}`,
    storeNote: (provider, channel) => `${provider} shows the current price and availability for your storefront in the ${channel}. This website does not process purchases.`,
  },
  "zh-Hans": {
    freeName: "Free",
    freeDescription: "开始订阅前，先体验拼图生成。",
    freeFeature: (count) => `${count} 次拼图生成`,
    premiumName: "Premium",
    premiumDescription: (provider) => `通过 ${provider} 订阅解锁当前两项付费能力。`,
    billingTitle: (channel) => `在 ${channel} 选择月订阅或年订阅`,
    storeNote: (provider, channel) => `${provider} 会在 ${channel} 显示你所在地区当前的价格与可用性；本网站不处理购买。`,
  },
  "zh-Hant": {
    freeName: "Free",
    freeDescription: "開始訂閱前，先體驗拼圖產生。",
    freeFeature: (count) => `${count} 次拼圖產生`,
    premiumName: "Premium",
    premiumDescription: (provider) => `透過 ${provider} 訂閱解鎖目前兩項付費能力。`,
    billingTitle: (channel) => `在 ${channel} 選擇月訂閱或年訂閱`,
    storeNote: (provider, channel) => `${provider} 會在 ${channel} 顯示所在地區目前的價格與供應狀況；本網站不處理購買。`,
  },
};

const premiumFeatureKeys = {
  unlimitedJigsawGeneration: "features.unlimited",
  svgExport: "features.export",
} as const satisfies Record<PremiumEntitlement, string>;

const subscriptionTranslationKeys = {
  monthly: {name: "monthly.name", period: "monthly.period"},
  yearly: {name: "yearly.name", period: "yearly.period"},
} as const satisfies Record<SubscriptionPeriod, {name: string; period: string}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return tierOneLocales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/pricing", locale)) notFound();
  const pricing = await getTranslations({locale, namespace: "Pricing"});
  return createPageMetadata({
    locale,
    pathname: "/pricing",
    title: pricing("title"),
    description: pricing("subtitle", {count: PRODUCT_FACTS.freeGenerationLimit}),
  });
}

export default async function PricingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isTierOneLocale(locale) || !isRouteAvailable("/pricing", locale)) notFound();
  setRequestLocale(locale);
  return <PricingContent locale={locale} />;
}

function PricingContent({locale}: {locale: TierOneLocale}) {
  const pricing = useTranslations("Pricing");
  const navigation = useTranslations("Navigation");
  const common = useTranslations("Common");
  const copy = pageCopy[locale];
  const breadcrumbItems = [
    {label: navigation("home"), href: "/"},
    {label: pricing("title")},
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={createBreadcrumbJsonLd({
        locale,
        items: [
          {name: navigation("home"), pathname: "/"},
          {name: pricing("title"), pathname: "/pricing"},
        ],
      })} />
      <SiteHeader />
      <main className="container mx-auto px-6 pt-28 pb-24 md:px-12 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={breadcrumbItems} ariaLabel={pricing("title")} />
        </div>
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-6xl">{pricing("title")}</h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
            {pricing("subtitle", {count: PRODUCT_FACTS.freeGenerationLimit})}
          </p>
        </header>

        <section className="mx-auto mt-14 grid max-w-5xl gap-7 md:grid-cols-2" aria-label={pricing("title")}>
          <article className="flex flex-col rounded-3xl border border-border bg-background p-8">
            <h2 className="text-2xl font-bold">{copy.freeName}</h2>
            <p className="mt-4 flex-1 leading-7 text-gray-600 dark:text-gray-300">{copy.freeDescription}</p>
            <ul className="mt-7 space-y-3">
              <PlanFeature>{copy.freeFeature(PRODUCT_FACTS.freeGenerationLimit)}</PlanFeature>
            </ul>
            <AppStoreCTA
              location="pricing"
              pageId="pricing-free"
              label={pricing("cta")}
              ariaLabel={common("appStoreAria")}
              className="mt-8 rounded-full border border-primary/30 px-6 py-3 text-center font-semibold text-primary-dark hover:border-primary dark:text-primary-light"
            />
          </article>

          <article className="flex flex-col rounded-3xl border border-primary bg-primary-ultra-light/30 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-primary-dark dark:text-primary-light">{copy.premiumName}</h2>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">{copy.premiumDescription(PRODUCT_FACTS.purchase.provider)}</p>
            <ul className="mt-7 space-y-3">
              {PRODUCT_FACTS.premiumEntitlements.map((entitlement) => (
                <PlanFeature key={entitlement}>{pricing(premiumFeatureKeys[entitlement])}</PlanFeature>
              ))}
            </ul>
            <h3 className="mt-8 font-bold">{copy.billingTitle(PRODUCT_FACTS.purchase.channel)}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PRODUCT_FACTS.purchase.subscriptionPeriods.map((billing) => (
                <div key={billing} className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-semibold">{pricing(subscriptionTranslationKeys[billing].name)}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{pricing(subscriptionTranslationKeys[billing].period)}</p>
                </div>
              ))}
            </div>
            <AppStoreCTA
              location="pricing"
              pageId="pricing-premium"
              label={pricing("cta")}
              ariaLabel={common("appStoreAria")}
              className="mt-8 rounded-full bg-primary-dark px-6 py-3 text-center font-semibold text-white hover:bg-[#1452a3]"
            />
          </article>
        </section>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-gray-600 dark:text-gray-300">
          {copy.storeNote(PRODUCT_FACTS.purchase.provider, PRODUCT_FACTS.purchase.channel)}
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

function PlanFeature({children}: {children: React.ReactNode}) {
  return (
    <li className="flex gap-3 leading-7">
      <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}
