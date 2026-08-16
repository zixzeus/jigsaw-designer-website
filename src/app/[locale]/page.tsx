import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import JsonLd from "@/components/JsonLd";
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
  const editorOverviewDimensions = getMediaDimensions("/editor_overview-v1-6.webp");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-gradient-to-b from-primary-ultra-light/60 to-background pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-6 text-center md:px-12">
            <p className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-sm font-semibold text-primary-dark dark:text-primary-light">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              {hero("version", {version: PRODUCT_FACTS.currentVersion})}
            </p>
            <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight md:text-7xl md:leading-[1.05]">
              <span>{hero("titlePart1").replace(/<br\s*\/?\s*>/gi, " ")}</span>{" "}
              <span className="text-primary-dark dark:text-primary-light">{hero("titleProfessional")}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-gray-600 dark:text-gray-300">
              {hero("subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <AppStoreCTA
                location="hero"
                pageId="home"
                label={navigation("download")}
                ariaLabel={common("appStoreAria")}
                badge
              />
              <Link
                href="/help"
                className="rounded-full border border-border bg-background px-6 py-3 font-semibold transition-colors hover:border-primary/30 hover:text-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:hover:text-primary-light dark:focus-visible:ring-primary-light"
              >
                {navigation("help")}
              </Link>
            </div>
            <div className="mx-auto mt-16 max-w-5xl rounded-3xl bg-gradient-to-b from-gray-200 to-gray-50 p-2 shadow-2xl dark:from-gray-700 dark:to-gray-900">
              <VideoFacade
                videoId="MyeE4t5dMaU"
                title={`${common("appName")} — ${hero("learnMore")}`}
                playLabel={hero("learnMore")}
              />
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 py-24">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              title={content?.audience.title ?? features("title")}
              description={content?.audience.intro ?? features("subtitle")}
            />
            <div className="grid gap-7 md:grid-cols-3">
              {(content?.audience.items ?? baselineCards).map((item, index) => (
                <FeatureCard key={item.title} index={index + 1} {...item} />
              ))}
            </div>
          </div>
        </section>

        {content ? (
          <TierOneHomeSections content={content} />
        ) : (
          <section className="border-y border-border bg-background-secondary py-20">
            <div className="container mx-auto grid items-center gap-10 px-6 md:grid-cols-2 md:px-12">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-primary-dark dark:text-primary-light">
                  {help("sections.importExport")}
                </p>
                <h2 className="mt-3 text-3xl font-bold">{help("generationContent.title")}</h2>
                <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">
                  {help("generationContent.desc")}
                </p>
                <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    help("sections.tools"),
                    help("sections.generation"),
                    help("interfaceContent.layersPanel.title"),
                    help("projectLibraryContent.title"),
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Image
                src="/editor_overview-v1-6.webp"
                alt={help("interfaceContent.title")}
                width={editorOverviewDimensions.width}
                height={editorOverviewDimensions.height}
                sizes="(max-width: 768px) calc(100vw - 3rem), 50vw"
                className="h-auto w-full rounded-2xl border border-border shadow-lg"
              />
            </div>
          </section>
        )}

        <section className="border-t border-border py-24">
          <div className="container mx-auto max-w-4xl px-6 md:px-12">
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              {content?.faq.title ?? support("faq.title")}
            </h2>
            <div className="mt-10 space-y-4">
              {faq.map((item) => (
                <details key={item.question} className="rounded-2xl border border-border bg-background p-6 open:border-primary/30">
                <summary className="cursor-pointer font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light">
                    {item.question}
                  </summary>
                  <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background-secondary py-20 text-center">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold">{content?.finalCta.title ?? common("appName")}</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
              {content?.finalCta.description ?? hero("subtitle")}
            </p>
            <AppStoreCTA
              location="home-final"
              pageId="home"
              label={navigation("download")}
              ariaLabel={common("appStoreAria")}
              className="mt-7 inline-flex rounded-full bg-primary-dark px-7 py-3 font-semibold text-white hover:bg-[#1452a3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function TierOneHomeSections({content}: {content: HomePageContent}) {
  const editorOverviewDimensions = getMediaDimensions("/editor_overview-v1-6.webp");

  return (
    <>
      <section className="border-y border-border bg-background-secondary py-24">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-primary-dark dark:text-primary-light">
            {content.workflow.eyebrow}
          </p>
          <SectionHeading title={content.workflow.title} description={content.workflow.intro} />
          <ol className="grid gap-7 md:grid-cols-3">
            {content.workflow.items.map((item) => (
              <li key={item.title} className="rounded-3xl border border-border bg-background p-8">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid items-center gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-dark dark:text-primary-light">
              {content.release.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{content.release.title}</h2>
            <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">{content.release.description}</p>
            <ul className="mt-7 space-y-3">
              {content.release.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 leading-7">
                  <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span>
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
            <Link href="/changelog/1-6-0" className="mt-8 inline-flex font-semibold text-primary-dark underline-offset-4 hover:underline dark:text-primary-light">
              {content.release.changelogLabel} <span className="ms-2" aria-hidden="true">→</span>
            </Link>
          </div>
          <Image
            src="/editor_overview-v1-6.webp"
            alt={content.gallery.items[0].alt}
            width={editorOverviewDimensions.width}
            height={editorOverviewDimensions.height}
            sizes="(max-width: 1024px) calc(100vw - 3rem), 50vw"
            className="h-auto w-full rounded-3xl border border-border shadow-xl"
          />
        </div>
      </section>

      <section className="border-y border-border bg-background-secondary py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title={content.gallery.title} description={content.gallery.intro} />
          <div className="grid gap-7 md:grid-cols-2">
            {content.gallery.items.slice(1).map((item) => {
              const dimensions = getMediaDimensions(item.src);
              return (
                <figure key={item.src} className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={dimensions.width}
                    height={dimensions.height}
                    sizes="(max-width: 768px) calc(100vw - 3rem), 50vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-border px-6 py-4 text-sm font-semibold">{item.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title={content.useCases.title} description={content.useCases.intro} />
          <div className="grid gap-7 md:grid-cols-3">
            {content.useCases.items.map((item, index) => (
              <FeatureCard key={item.title} index={index + 1} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background-secondary py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title={content.plans.title} description={content.plans.intro} />
          <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
            <PlanCard name={content.plans.freeName} summary={content.plans.freeSummary} features={content.plans.freeFeatures} />
            <PlanCard name={content.plans.premiumName} summary={content.plans.premiumSummary} features={content.plans.premiumFeatures} featured />
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">{content.plans.storeNote}</p>
            <Link href="/pricing" className="mt-4 inline-flex rounded-full border border-primary/30 bg-background px-6 py-3 font-semibold text-primary-dark hover:border-primary dark:text-primary-light">
              {content.plans.pricingLabel} <span className="ms-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title={content.explore.title} description={content.explore.intro} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.explore.items.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light">
                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light">{item.title}</h3>
                <p className="mt-2 leading-6 text-gray-600 dark:text-gray-300">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({title, description}: {title: string; description: string}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function FeatureCard({index, title, description}: {index: number; title: string; description: string}) {
  return (
    <article className="rounded-3xl border border-border bg-background p-8 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-ultra-light font-bold text-primary-dark dark:text-primary-light">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{description}</p>
    </article>
  );
}

function PlanCard({name, summary, features, featured = false}: {name: string; summary: string; features: string[]; featured?: boolean}) {
  return (
    <article className={`rounded-3xl border p-8 ${featured ? "border-primary bg-primary-ultra-light/30 shadow-lg" : "border-border bg-background"}`}>
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{summary}</p>
      <ul className="mt-7 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 leading-7">
            <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
