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
import {isRouteAvailable, isSiteLocale, type SiteLocale} from "@/config/seo";
import {Link} from "@/i18n/navigation";
import {createBreadcrumbJsonLd, createPageMetadata} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/support", locale)) notFound();
  const support = await getTranslations({locale, namespace: "Support"});
  return createPageMetadata({locale, pathname: "/support", title: `${support("hero.titlePart1")} ${support("hero.titlePart2")}`, description: support("hero.subtitle")});
}

export default async function SupportPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/support", locale)) notFound();
  setRequestLocale(locale);
  return <SupportContent locale={locale} />;
}

function SupportContent({locale}: {locale: SiteLocale}) {
  const support = useTranslations("Support");
  const common = useTranslations("Common");
  const navigation = useTranslations("Navigation");
  const faq = [1, 2, 3].map((number) => ({
    question: support(`faq.q${number}.question`),
    answer: support(`faq.q${number}.answer`),
  }));
  const breadcrumbItems = [
    {label: navigation("home"), href: "/"},
    {label: support("hero.titlePart2")},
  ];
  const faqJsonLd = {"@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale, mainEntity: faq.map((item) => ({"@type": "Question", name: item.question, acceptedAnswer: {"@type": "Answer", text: item.answer}}))};
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    locale,
    items: [
      {name: navigation("home"), pathname: "/"},
      {name: support("hero.titlePart2"), pathname: "/support"},
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd]} />
      <SiteHeader />
      <main>
        <header className="bg-gradient-to-b from-primary-ultra-light/60 to-background pt-28 pb-14 md:pt-36">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl">
              <Breadcrumbs items={breadcrumbItems} ariaLabel={support("hero.titlePart2")} />
            </div>
            <h1 className="text-center text-4xl font-bold md:text-6xl">
              {support("hero.titlePart1")} <span className="text-primary-dark dark:text-primary-light">{support("hero.titlePart2")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xl leading-8 text-gray-600 dark:text-gray-300">{support("hero.subtitle")}</p>
          </div>
        </header>

        <section className="container mx-auto max-w-5xl px-6 py-16 md:px-12">
          <div className="grid gap-7 md:grid-cols-2">
            <SupportCard title={support("documentation.title")} description={support("documentation.description")}>
              <Link href="/help" className="font-semibold text-primary-dark hover:underline dark:text-primary-light">{support("documentation.action")} →</Link>
            </SupportCard>
            <SupportCard title={support("email.title")} description={support("email.description")}>
              <a href={`mailto:${PRODUCT_FACTS.supportEmail}`} className="font-semibold text-primary-dark hover:underline dark:text-primary-light">{PRODUCT_FACTS.supportEmail} →</a>
            </SupportCard>
          </div>
        </section>

        <section className="border-y border-border bg-background-secondary py-16">
          <div className="container mx-auto max-w-4xl px-6 md:px-12">
            <h2 className="text-center text-3xl font-bold">{support("faq.title")}</h2>
            <div className="mt-9 space-y-4">
              {faq.map((item) => (
                <details key={item.question} className="rounded-2xl border border-border bg-background p-6">
                  <summary className="cursor-pointer font-semibold">{item.question}</summary>
                  <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <AppStoreCTA location="support" pageId="support" label={navigation("download")} ariaLabel={common("appStoreAria")} className="inline-flex rounded-full bg-primary-dark px-7 py-3 font-semibold text-white hover:bg-[#1452a3]" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SupportCard({title, description, children}: {title: string; description: string; children: React.ReactNode}) {
  return <article className="rounded-3xl border border-border p-8 shadow-sm"><h2 className="text-2xl font-bold">{title}</h2><p className="my-5 leading-7 text-gray-600 dark:text-gray-300">{description}</p>{children}</article>;
}
