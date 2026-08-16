import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, isSiteLocale, type SiteLocale} from "@/config/seo";
import {createBreadcrumbJsonLd, createPageMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/privacy", locale)) notFound();
  const privacy = await getTranslations({locale, namespace: "Privacy"});
  return createPageMetadata({locale, pathname: "/privacy", title: privacy("title"), description: privacy("metaDescription")});
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/privacy", locale)) notFound();
  setRequestLocale(locale);
  return <PrivacyContent locale={locale} />;
}

function PrivacyContent({locale}: {locale: SiteLocale}) {
  const privacy = useTranslations("Privacy");
  const navigation = useTranslations("Navigation");
  const breadcrumbItems = [
    {label: navigation("home"), href: "/"},
    {label: privacy("title")},
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={createBreadcrumbJsonLd({
        locale,
        items: [
          {name: navigation("home"), pathname: "/"},
          {name: privacy("title"), pathname: "/privacy"},
        ],
      })} />
      <SiteHeader />
      <main className="container mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <Breadcrumbs items={breadcrumbItems} ariaLabel={privacy("title")} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{privacy("title")}</h1>
        <div className="mt-12 space-y-10 text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300">
          <PolicySection title={privacy("introduction.title")}><p>{privacy("introduction.content")}</p></PolicySection>
          <PolicySection title={privacy("dataCollection.title")}>
            <p><strong className="text-foreground">{privacy("dataCollection.content")}</strong> {privacy("dataCollection.content2")}</p>
            <ul className="mt-5 list-disc space-y-3 ps-6">
              <li>{privacy("dataCollection.list.behavior")}</li>
              <li>{privacy("dataCollection.list.upload")}</li>
              <li>{privacy("dataCollection.list.sell")}</li>
            </ul>
          </PolicySection>
          <PolicySection title={privacy("analytics.title")}><p>{privacy("analytics.content")}</p></PolicySection>
          <PolicySection title={privacy("contact.title")}>
            <p>{privacy("contact.content")}</p>
            <a href={`mailto:${PRODUCT_FACTS.supportEmail}`} className="mt-2 inline-flex text-primary-dark hover:underline dark:text-primary-light">{PRODUCT_FACTS.supportEmail}</a>
          </PolicySection>
          <p className="border-t border-border pt-8 text-sm text-gray-600 dark:text-gray-300">{privacy("lastUpdated")}</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function PolicySection({title, children}: {title: string; children: React.ReactNode}) {
  return <section><h2 className="mb-4 text-2xl font-bold text-foreground">{title}</h2>{children}</section>;
}
