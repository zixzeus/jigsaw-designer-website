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
import {isTierOneLocale} from "@/content/types";
import {getGeneratedSiteTranslation, hasGeneratedLocaleContent} from "@/content/localized-content";
import {supportPageCopy} from "@/content/page-copy";
import {Link} from "@/i18n/navigation";
import {createBreadcrumbJsonLd, createPageMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/support", locale)) notFound();
  const support = await getTranslations({locale, namespace: "Support"});
  const copy = isTierOneLocale(locale)
    ? supportPageCopy[locale]
    : hasGeneratedLocaleContent(locale)
      ? getGeneratedSiteTranslation(locale).content.support
      : null;
  return createPageMetadata({
    locale,
    pathname: "/support",
    title: copy?.title ?? `${support("hero.titlePart1")} ${support("hero.titlePart2")}`,
    description: copy?.subtitle ?? support("hero.subtitle"),
  });
}

export default async function SupportPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/support", locale)) notFound();
  setRequestLocale(locale);
  return <SupportContent locale={locale} />;
}

function SupportContent({locale}: {locale: SiteLocale}) {
  const support = useTranslations("Support");
  const help = useTranslations("Help");
  const navigation = useTranslations("Navigation");
  const copy = isTierOneLocale(locale)
    ? supportPageCopy[locale]
    : hasGeneratedLocaleContent(locale)
      ? getGeneratedSiteTranslation(locale).content.support
      : null;
  const troubleshootingHref = isRouteAvailable("/help/troubleshooting", locale)
    ? "/help/troubleshooting"
    : "/help";
  const pageTitle = copy?.title ?? `${support("hero.titlePart1")} ${support("hero.titlePart2")}`;
  const pageSubtitle = copy?.subtitle ?? support("hero.subtitle");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={createBreadcrumbJsonLd({
        locale,
        items: [
          {name: navigation("home"), pathname: "/"},
          {name: pageTitle, pathname: "/support"},
        ],
      })} />
      <SiteHeader />
      <main>
        <header className="border-b border-border pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Breadcrumbs
              items={[{label: navigation("home"), href: "/"}, {label: pageTitle}]}
              ariaLabel={pageTitle}
            />
            <div className="max-w-3xl">
              <h1 className="display-title text-4xl font-semibold tracking-[-0.035em] sm:text-5xl md:text-6xl">
                {pageTitle}
              </h1>
              <p className="prose-copy mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                {pageSubtitle}
              </p>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
          <div className="divide-y divide-border border-y border-border">
            <SupportRoute
              number="01"
              title={copy?.documentationTitle ?? support("documentation.title")}
              description={copy?.documentationDescription ?? support("documentation.description")}
            >
              <Link href="/help">{support("documentation.action")} <span aria-hidden="true">→</span></Link>
            </SupportRoute>
            <SupportRoute
              number="02"
              title={copy?.troubleshootingTitle ?? help("troubleshooting.title")}
              description={copy?.troubleshootingDescription ?? support("hero.subtitle")}
            >
              <Link href={troubleshootingHref}>{help("troubleshooting.title")} <span aria-hidden="true">→</span></Link>
            </SupportRoute>
            <SupportRoute
              number="03"
              title={copy?.emailTitle ?? support("email.title")}
              description={copy?.emailDescription ?? support("email.description")}
            >
              <a href={`mailto:${PRODUCT_FACTS.supportEmail}`}>{PRODUCT_FACTS.supportEmail} <span aria-hidden="true">→</span></a>
            </SupportRoute>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SupportRoute({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article data-support-route="true" className="grid gap-5 py-8 md:grid-cols-[4rem_1fr_auto] md:items-center md:gap-8 md:py-10">
      <span className="text-sm font-semibold tabular-nums text-primary-dark dark:text-primary-light">{number}</span>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      <div className="font-semibold text-primary-dark [&_a]:hover:underline dark:text-primary-light">{children}</div>
    </article>
  );
}
