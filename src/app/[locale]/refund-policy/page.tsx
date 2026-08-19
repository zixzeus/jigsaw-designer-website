import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {isRouteAvailable, isSiteLocale, SITE_LOCALES, type SiteLocale} from "@/config/seo";
import {hasGeneratedLocaleContent} from "@/content/localized-content";
import {isTierOneLocale} from "@/content/types";
import {createBreadcrumbJsonLd, createPageMetadata} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_LOCALES.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/refund-policy", locale)) notFound();
  const refund = await getTranslations({locale, namespace: "Refund"});
  return createPageMetadata({locale, pathname: "/refund-policy", title: refund("title"), description: refund("content.intro"), noIndex: true});
}

export default async function RefundPolicyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable("/refund-policy", locale) ||
    (!isTierOneLocale(locale) && !hasGeneratedLocaleContent(locale))
  ) notFound();
  setRequestLocale(locale);
  return <RefundContent locale={locale} />;
}

function RefundContent({locale}: {locale: SiteLocale}) {
  const refund = useTranslations("Refund");
  const navigation = useTranslations("Navigation");
  const breadcrumbItems = [
    {label: navigation("home"), href: "/"},
    {label: refund("title")},
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={createBreadcrumbJsonLd({locale, items: [
        {name: navigation("home"), pathname: "/"},
        {name: refund("title"), pathname: "/refund-policy"},
      ]})} />
      <SiteHeader />
      <main className="container mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <Breadcrumbs items={breadcrumbItems} ariaLabel={refund("title")} />
        <h1 className="text-4xl font-bold md:text-5xl">{refund("title")}</h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{refund("lastUpdated")}</p>
        <div className="mt-12 space-y-8 text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300">
          <p>{refund("content.intro")}</p>
          <section className="rounded-3xl border border-border bg-background-secondary p-8">
            <p>{refund("content.appStore")}</p>
            <p className="mt-4">{refund("content.process")}</p>
          </section>
          <section className="rounded-3xl border border-primary/15 bg-primary-ultra-light/30 p-8">
            <p>{refund("content.direct")}</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
