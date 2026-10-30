import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import {PRODUCT_FACTS} from "@/config/product";
import {WEBSITE_COMMERCE} from "@/config/commerce";
import {getCommerceCopy} from "@/content/commerce";

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
  if (!isSiteLocale(locale) || !isRouteAvailable("/terms", locale)) notFound();
  const terms = await getTranslations({locale, namespace: "Terms"});
  return createPageMetadata({locale, pathname: "/terms", title: terms("title"), description: terms("sections.agreement.content"), noIndex: true});
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable("/terms", locale) ||
    (!isTierOneLocale(locale) && !hasGeneratedLocaleContent(locale))
  ) notFound();
  setRequestLocale(locale);
  return <TermsContent locale={locale} />;
}

function TermsContent({locale}: {locale: SiteLocale}) {
  const terms = useTranslations("Terms");
  const commerce = getCommerceCopy(locale);
  const navigation = useTranslations("Navigation");
  const breadcrumbItems = [
    {label: navigation("home"), href: "/"},
    {label: terms("title")},
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={createBreadcrumbJsonLd({locale, items: [
        {name: navigation("home"), pathname: "/"},
        {name: terms("title"), pathname: "/terms"},
      ]})} />
      <SiteHeader />
      <main className="container mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <Breadcrumbs items={breadcrumbItems} ariaLabel={terms("title")} />
        <h1 className="text-4xl font-bold md:text-5xl">{terms("title")}</h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{commerce.updated}</p>
        <div className="mt-12 space-y-10 leading-8 text-gray-600 dark:text-gray-300">
          <TermSection title={terms("sections.agreement.title")}>
            <p>{terms("sections.agreement.content")}</p>
            <address className="mt-4 not-italic"><bdi>{WEBSITE_COMMERCE.legalEntity}</bdi><br /><a href={`mailto:${PRODUCT_FACTS.supportEmail}`} className="text-primary-dark hover:underline dark:text-primary-light">{PRODUCT_FACTS.supportEmail}</a></address>
          </TermSection>
          <TermSection title={terms("sections.license.title")}><p>{terms("sections.license.content")}</p></TermSection>
          <TermSection title={terms("sections.subscriptions.title")}>
            <ul className="mb-4 list-disc space-y-2 pl-6"><li>{terms("sections.subscriptions.monthly")}</li><li>{terms("sections.subscriptions.yearly")}</li></ul>
            <p>{commerce.appleNote}</p>
            <h3 className="mt-7 text-xl font-semibold text-foreground">{commerce.heading}</h3>
            <p className="mt-3 font-medium">{commerce.pending}</p>
            <p className="mt-3">{commerce.terms}</p>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-dark dark:text-primary-light"><a href={WEBSITE_COMMERCE.customerSupportUrl} className="hover:underline">paddle.net</a><a href={WEBSITE_COMMERCE.buyerTermsUrl} className="break-all hover:underline">paddle.com/legal/checkout-buyer-terms</a></p>
          </TermSection>
          <TermSection title={terms("sections.termination.title")}><p>{terms("sections.termination.content")}</p></TermSection>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function TermSection({title, children}: {title: string; children: React.ReactNode}) {
  return <section><h2 className="mb-4 text-2xl font-bold text-foreground">{title}</h2>{children}</section>;
}
