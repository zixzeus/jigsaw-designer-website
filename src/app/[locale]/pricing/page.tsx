import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {isTierOneLocale, tierOneLocales, type TierOneLocale} from "@/content/types";
import {createBreadcrumbJsonLd, createPageMetadata} from "@/lib/seo";

type PricingCopy = {
  eyebrow: string;
  freeName: string;
  freeDescription: string;
  premiumName: string;
  premiumDescription: string;
  comparisonTitle: string;
  generationLabel: string;
  freeGeneration: (count: number) => string;
  unlimited: string;
  exportLabel: string;
  notIncluded: string;
  included: string;
  billingLabel: string;
  noSubscription: string;
  appleBilling: string;
  storeNote: string;
  faqTitle: string;
  faq: Array<{question: string; answer: string}>;
};

const pageCopy: Record<TierOneLocale, PricingCopy> = {
  en: {
    eyebrow: "Simple Apple subscription",
    freeName: "Free",
    freeDescription: "Try the generation workflow before you subscribe.",
    premiumName: "Premium",
    premiumDescription: "Unlimited generation and SVG export in one plan.",
    comparisonTitle: "What changes with Premium",
    generationLabel: "Puzzle generation",
    freeGeneration: (count) => `${count} generations`,
    unlimited: "Unlimited",
    exportLabel: "SVG export",
    notIncluded: "Not included",
    included: "Included",
    billingLabel: "Billing",
    noSubscription: "No subscription",
    appleBilling: "Monthly or yearly through Apple",
    storeNote: "The App Store displays the current price and availability for your region. This website does not process purchases.",
    faqTitle: "Subscription questions",
    faq: [
      {question: "Where can I see the current price?", answer: "Open the App Store listing. Apple shows the current localized price for your storefront."},
      {question: "How do I manage or cancel a subscription?", answer: "Use the Subscriptions settings for your Apple Account. Billing and cancellation are handled by Apple."},
      {question: "Can I buy Premium on this website?", answer: "No. JigsawDesigner currently offers monthly and yearly subscriptions only through Apple."},
    ],
  },
  "zh-Hans": {
    eyebrow: "简单的 Apple 订阅",
    freeName: "Free",
    freeDescription: "订阅前先体验生成工作流。",
    premiumName: "Premium",
    premiumDescription: "一个方案包含无限生成和 SVG 导出。",
    comparisonTitle: "升级 Premium 后的变化",
    generationLabel: "拼图生成",
    freeGeneration: (count) => `${count} 次生成`,
    unlimited: "无限",
    exportLabel: "SVG 导出",
    notIncluded: "不包含",
    included: "包含",
    billingLabel: "订阅周期",
    noSubscription: "无需订阅",
    appleBilling: "通过 Apple 按月或按年订阅",
    storeNote: "App Store 会显示你所在地区当前的价格与可用性；本网站不处理购买。",
    faqTitle: "订阅常见问题",
    faq: [
      {question: "在哪里查看当前价格？", answer: "打开 App Store 页面，Apple 会根据你的商店地区显示当前本地价格。"},
      {question: "如何管理或取消订阅？", answer: "请前往 Apple 账户的“订阅”设置。扣费、管理与取消均由 Apple 处理。"},
      {question: "可以在这个网站购买 Premium 吗？", answer: "不可以。JigsawDesigner 当前仅通过 Apple 提供月订阅和年订阅。"},
    ],
  },
  "zh-Hant": {
    eyebrow: "簡單的 Apple 訂閱",
    freeName: "Free",
    freeDescription: "訂閱前先體驗產生工作流程。",
    premiumName: "Premium",
    premiumDescription: "一個方案包含無限產生與 SVG 匯出。",
    comparisonTitle: "升級 Premium 後的變化",
    generationLabel: "拼圖產生",
    freeGeneration: (count) => `${count} 次產生`,
    unlimited: "無限",
    exportLabel: "SVG 匯出",
    notIncluded: "不包含",
    included: "包含",
    billingLabel: "訂閱週期",
    noSubscription: "無需訂閱",
    appleBilling: "透過 Apple 按月或按年訂閱",
    storeNote: "App Store 會顯示所在地區目前的價格與供應狀況；本網站不處理購買。",
    faqTitle: "訂閱常見問題",
    faq: [
      {question: "在哪裡查看目前價格？", answer: "開啟 App Store 頁面，Apple 會依商店地區顯示目前的本地價格。"},
      {question: "如何管理或取消訂閱？", answer: "請前往 Apple 帳號的「訂閱」設定。扣款、管理與取消均由 Apple 處理。"},
      {question: "可以在此網站購買 Premium 嗎？", answer: "不可以。JigsawDesigner 目前僅透過 Apple 提供月訂閱與年訂閱。"},
    ],
  },
};

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
  const breadcrumb = createBreadcrumbJsonLd({
    locale,
    items: [
      {name: navigation("home"), pathname: "/"},
      {name: pricing("title"), pathname: "/pricing"},
    ],
  });
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {"@type": "Answer", text: item.answer},
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[breadcrumb, faqJsonLd]} />
      <SiteHeader />
      <main>
        <header className="border-b border-border pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Breadcrumbs items={[{label: navigation("home"), href: "/"}, {label: pricing("title")}]} ariaLabel={pricing("title")} />
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark dark:text-primary-light">{copy.eyebrow}</p>
              <h1 className="display-title mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl md:text-6xl">{pricing("title")}</h1>
              <p className="prose-copy mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{pricing("subtitle", {count: PRODUCT_FACTS.freeGenerationLimit})}</p>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20" aria-labelledby="comparison-title">
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border md:grid-cols-2">
            <article className="bg-background p-7 md:p-9">
              <p className="text-sm font-semibold text-gray-500">01</p>
              <h2 className="mt-4 text-3xl font-semibold">{copy.freeName}</h2>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{copy.freeDescription}</p>
            </article>
            <article className="bg-primary-ultra-light/45 p-7 md:p-9">
              <p className="text-sm font-semibold text-primary-dark dark:text-primary-light">02</p>
              <h2 className="mt-4 text-3xl font-semibold">{copy.premiumName}</h2>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{copy.premiumDescription}</p>
            </article>
          </div>

          <h2 id="comparison-title" className="mt-14 text-2xl font-semibold">{copy.comparisonTitle}</h2>
          <div className="mt-6 overflow-x-auto border-y border-border">
            <table className="w-full min-w-[38rem] border-collapse text-start">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th scope="col" className="py-4 pe-6 text-start font-medium" />
                  <th scope="col" className="px-6 py-4 text-start font-medium">{copy.freeName}</th>
                  <th scope="col" className="px-6 py-4 text-start font-medium text-primary-dark dark:text-primary-light">{copy.premiumName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <ComparisonRow label={copy.generationLabel} free={copy.freeGeneration(PRODUCT_FACTS.freeGenerationLimit)} premium={copy.unlimited} />
                <ComparisonRow label={copy.exportLabel} free={copy.notIncluded} premium={copy.included} />
                <ComparisonRow label={copy.billingLabel} free={copy.noSubscription} premium={copy.appleBilling} />
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">{copy.storeNote}</p>
            <AppStoreCTA location="pricing" pageId="pricing" label={pricing("cta")} ariaLabel={common("appStoreAria")} className="shrink-0 rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1452a3]" />
          </div>
        </section>

        <section className="border-t border-border bg-background-secondary/55 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <h2 className="display-title text-3xl font-semibold tracking-tight md:text-4xl">{copy.faqTitle}</h2>
            <div className="border-y border-border">
              {copy.faq.map((item) => (
                <details key={item.question} data-faq-item="true" className="group border-b border-border py-5 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                    <span>{item.question}</span>
                    <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-45" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ComparisonRow({label, free, premium}: {label: string; free: string; premium: string}) {
  return (
    <tr>
      <th scope="row" className="py-5 pe-6 text-start text-sm font-semibold">{label}</th>
      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">{free}</td>
      <td className="px-6 py-5 text-sm font-semibold">{premium}</td>
    </tr>
  );
}
