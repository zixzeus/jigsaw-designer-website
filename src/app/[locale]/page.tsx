import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import JsonLd from "@/components/JsonLd";
import ProductGallery from "@/components/ProductGallery";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VideoFacade from "@/components/VideoFacade";
import {getMediaDimensions} from "@/config/media";
import {PRODUCT_FACTS, type PremiumEntitlement} from "@/config/product";
import {
  isRouteAvailable,
  isSiteLocale,
  SITE_LOCALES,
  type SiteLocale,
} from "@/config/seo";
import {HOME_PAGES, type HomePageContent} from "@/content/home-pages";
import {isTierOneLocale} from "@/content/types";
import {Link} from "@/i18n/navigation";
import {absoluteUrl, createPageMetadata, localizedAbsoluteUrl} from "@/lib/seo";

type HomeParams = Promise<{locale: string}>;

const premiumFeatureKeys = {
  unlimitedJigsawGeneration: "features.unlimited",
  svgExport: "features.export",
} as const satisfies Record<PremiumEntitlement, string>;

export async function generateMetadata({params}: {params: HomeParams}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/", locale)) notFound();

  const hero = await getTranslations({locale, namespace: "Hero"});
  const title = `${hero("titlePart1").replace(/<br\s*\/?\s*>/gi, " ").trim()} ${hero("titleProfessional")}`;
  return createPageMetadata({
    locale,
    pathname: "/",
    title,
    description: hero("subtitle"),
  });
}

export default async function Home({params}: {params: HomeParams}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/", locale)) notFound();

  setRequestLocale(locale);
  const premiumFeatureList = isTierOneLocale(locale)
    ? await getTranslations({locale, namespace: "Pricing"}).then((pricing) =>
        PRODUCT_FACTS.premiumEntitlements.map((entitlement) =>
          pricing(premiumFeatureKeys[entitlement]),
        ),
      )
    : undefined;
  return <HomeContent locale={locale} premiumFeatureList={premiumFeatureList} />;
}

function HomeContent({
  locale,
  premiumFeatureList,
}: {
  locale: SiteLocale;
  premiumFeatureList?: string[];
}) {
  const navigation = useTranslations("Navigation");
  const hero = useTranslations("Hero");
  const features = useTranslations("Features");
  const common = useTranslations("Common");
  const help = useTranslations("Help");
  const support = useTranslations("Support");
  const content = isTierOneLocale(locale) ? HOME_PAGES[locale] : null;
  const faq = content?.faq.items ?? [1, 2, 3].map((number) => ({
    question: support(`faq.q${number}.question`),
    answer: support(`faq.q${number}.answer`),
  }));
  const canonical = localizedAbsoluteUrl(locale, "/");
  const organizationId = `${PRODUCT_FACTS.websiteOrigin}/#organization`;
  const websiteId = `${PRODUCT_FACTS.websiteOrigin}/#website`;
  const pageTitle = `${hero("titlePart1").replace(/<br\s*\/?\s*>/gi, " ").trim()} ${hero("titleProfessional")}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: PRODUCT_FACTS.name,
      url: PRODUCT_FACTS.websiteOrigin,
      logo: absoluteUrl(PRODUCT_FACTS.appIcon),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: PRODUCT_FACTS.supportEmail,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: PRODUCT_FACTS.name,
      url: PRODUCT_FACTS.websiteOrigin,
      inLanguage: SITE_LOCALES,
      publisher: {"@id": organizationId},
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: pageTitle,
      description: hero("subtitle"),
      url: canonical,
      inLanguage: locale,
      isPartOf: {"@id": websiteId},
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: PRODUCT_FACTS.name,
      applicationCategory: "DesignApplication",
      operatingSystem: PRODUCT_FACTS.operatingSystems.join(", "),
      description: hero("subtitle"),
      url: canonical,
      downloadUrl: PRODUCT_FACTS.appStoreUrl,
      softwareVersion: PRODUCT_FACTS.currentVersion,
      ...(premiumFeatureList ? {featureList: premiumFeatureList} : {}),
      isAccessibleForFree: PRODUCT_FACTS.freeGenerationLimit > 0,
      publisher: {"@id": organizationId},
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {"@type": "Answer", text: item.answer},
      })),
    },
  ];
  const baselineCards = [
    {title: features("list.customization.title"), description: features("list.customization.description")},
    {title: features("list.workflow.title"), description: features("list.workflow.description")},
    {title: features("list.anywhere.title"), description: features("list.anywhere.description")},
  ];
  const story = content?.workflow ?? {
    eyebrow: "",
    title: features("title"),
    intro: features("subtitle"),
    items: baselineCards,
  };
  const editorOverviewDimensions = getMediaDimensions("/editor_overview-v1-6.webp");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-gradient-to-b from-primary-ultra-light/55 via-background to-background pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
            <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/75 px-4 py-2 text-sm font-medium text-primary-dark dark:text-primary-light">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              {hero("version", {version: PRODUCT_FACTS.currentVersion})}
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl md:leading-[1.06]">
              <span>{hero("titlePart1").replace(/<br\s*\/?\s*>/gi, " ")}</span>{" "}
              <span className="text-primary-dark dark:text-primary-light">{hero("titleProfessional")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 md:text-xl">
              {hero("subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <AppStoreCTA
                location="hero"
                pageId="home"
                label={navigation("download")}
                ariaLabel={common("appStoreAria")}
                badge
              />
              <Link
                href="/#features"
                className="inline-flex items-center gap-2 font-semibold text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-primary-dark hover:decoration-primary dark:hover:text-primary-light"
              >
                {hero("learnMore")} <span aria-hidden="true">↓</span>
              </Link>
            </div>
            <div className="mx-auto mt-12 max-w-5xl rounded-[1.75rem] bg-gradient-to-b from-gray-200 to-gray-50 p-2 shadow-2xl shadow-black/10 dark:from-gray-700 dark:to-gray-900 md:mt-14">
              <VideoFacade
                videoId="MyeE4t5dMaU"
                title={`${common("appName")} — ${hero("learnMore")}`}
                playLabel={hero("learnMore")}
              />
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              {story.eyebrow ? (
                <p className="text-sm font-semibold text-primary-dark dark:text-primary-light">
                  {story.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
                {story.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                {story.intro}
              </p>
              {content ? (
                <ol className="mt-9 border-y border-border">
                  {story.items.map((item, index) => (
                    <li key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-border py-5 last:border-b-0">
                      <span className="pt-0.5 text-sm font-semibold tabular-nums text-primary-dark dark:text-primary-light">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="mt-9 border-y border-border">
                  {story.items.map((item) => (
                    <li key={item.title} className="border-b border-border py-5 last:border-b-0">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">{item.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <figure>
              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-background-secondary shadow-xl shadow-black/5">
                <Image
                  src="/editor_overview-v1-6.webp"
                  alt={content?.gallery.items[0].alt ?? help("interfaceContent.title")}
                  width={editorOverviewDimensions.width}
                  height={editorOverviewDimensions.height}
                  sizes="(max-width: 1024px) calc(100vw - 2.5rem), 55vw"
                  className="h-auto w-full"
                />
              </div>
              {content ? (
                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-gray-600 dark:text-gray-300">
                  <span>{content.gallery.items[0].caption}</span>
                  <Link href="/changelog/1-6-0" className="font-semibold text-primary-dark hover:underline dark:text-primary-light">
                    {content.release.changelogLabel} <span aria-hidden="true">→</span>
                  </Link>
                </figcaption>
              ) : null}
            </figure>
          </div>
        </section>

        {content ? <TierOneHomeSections content={content} navigationDownload={navigation("download")} appStoreAria={common("appStoreAria")} /> : null}

        <section className="border-t border-border py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
            <h2 className="max-w-sm text-3xl font-bold tracking-tight md:text-4xl">
              {content?.faq.title ?? support("faq.title")}
            </h2>
            <div className="border-y border-border">
              {faq.map((item) => (
                <details key={item.question} className="group border-b border-border py-6 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light">
                    <span>{item.question}</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-45"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="max-w-2xl pt-4 leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {content ? (
          <nav aria-label={content.explore.title} className="pb-16 md:pb-20">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-border px-5 pt-7 text-sm md:flex-row md:items-start md:px-8">
              <span className="shrink-0 font-semibold">{content.explore.title}</span>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-600 dark:text-gray-300">
                {content.explore.items.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-primary-dark hover:underline dark:hover:text-primary-light">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

function TierOneHomeSections({
  content,
  navigationDownload,
  appStoreAria,
}: {
  content: HomePageContent;
  navigationDownload: string;
  appStoreAria: string;
}) {
  return (
    <>
      <section className="border-y border-border bg-background-secondary py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{content.gallery.title}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">{content.gallery.intro}</p>
          </div>
          <ProductGallery items={content.gallery.items.slice(1)} />
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-10 rounded-[2rem] border border-border bg-background-secondary px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{content.plans.title}</h2>
              <p className="mt-4 max-w-lg leading-7 text-gray-600 dark:text-gray-300">{content.plans.intro}</p>
              <p className="mt-3 text-sm text-gray-500">{content.plans.storeNote}</p>
            </div>
            <div>
              <div className="grid gap-6 sm:grid-cols-2">
                <PlanSummary name={content.plans.freeName} summary={content.plans.freeSummary} features={content.plans.freeFeatures} />
                <PlanSummary name={content.plans.premiumName} summary={content.plans.premiumSummary} features={content.plans.premiumFeatures} />
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <AppStoreCTA
                  location="home-final"
                  pageId="home"
                  label={navigationDownload}
                  ariaLabel={appStoreAria}
                  className="inline-flex rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1452a3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
                />
                <Link href="/pricing" className="font-semibold text-primary-dark hover:underline dark:text-primary-light">
                  {content.plans.pricingLabel} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PlanSummary({name, summary, features}: {name: string; summary: string; features: string[]}) {
  return (
    <div>
      <h3 className="font-semibold">{name}</h3>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{summary}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
