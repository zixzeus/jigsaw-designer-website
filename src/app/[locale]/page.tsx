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
import {isRouteAvailable, isSiteLocale, SITE_LOCALES, type SiteLocale} from "@/config/seo";
import {showcasePages, type HubProjectExample} from "@/content/hub-pages";
import {HOME_PAGES, type HomePageContent} from "@/content/home-pages";
import {
  getGeneratedSiteTranslation,
  hasGeneratedLocaleContent,
} from "@/content/localized-content";
import {isTierOneLocale, type MediaEvidence} from "@/content/types";
import {Link} from "@/i18n/navigation";
import {absoluteUrl, createPageMetadata, localizedAbsoluteUrl} from "@/lib/seo";

type HomeParams = Promise<{locale: string}>;

const premiumFeatureKeys = {
  unlimitedJigsawGeneration: "features.unlimited",
  svgExport: "features.export",
} as const satisfies Record<PremiumEntitlement, string>;

function getFullHomeContent(locale: SiteLocale): {
  content: HomePageContent;
  projects: HubProjectExample[];
} | null {
  if (isTierOneLocale(locale)) {
    return {
      content: HOME_PAGES[locale],
      projects: showcasePages[locale].projects,
    };
  }
  if (!hasGeneratedLocaleContent(locale)) return null;
  const generated = getGeneratedSiteTranslation(locale).content;
  return {
    content: generated.home,
    projects: generated.showcase.projects,
  };
}

export async function generateMetadata({params}: {params: HomeParams}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/", locale)) notFound();

  const fullContent = getFullHomeContent(locale);
  if (fullContent) {
    const content = fullContent.content;
    return createPageMetadata({locale, pathname: "/", title: content.hero.title, description: content.hero.subtitle});
  }

  const hero = await getTranslations({locale, namespace: "Hero"});
  const fullTitle = `${hero("titlePart1").replace(/<br\s*\/?\s*>/gi, " ").trim()} ${hero("titleProfessional")}`;
  const title = fullTitle.length > 58 ? hero("titleProfessional") : fullTitle;
  return createPageMetadata({locale, pathname: "/", title, description: hero("subtitle")});
}

export default async function Home({params}: {params: HomeParams}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/", locale)) notFound();

  setRequestLocale(locale);
  const premiumFeatureList = getFullHomeContent(locale)
    ? await getTranslations({locale, namespace: "Pricing"}).then((pricing) =>
        PRODUCT_FACTS.premiumEntitlements.map((entitlement) => pricing(premiumFeatureKeys[entitlement])),
      )
    : undefined;

  return <HomeContent locale={locale} premiumFeatureList={premiumFeatureList} />;
}

function HomeContent({locale, premiumFeatureList}: {locale: SiteLocale; premiumFeatureList?: string[]}) {
  const heroMessages = useTranslations("Hero");
  const support = useTranslations("Support");
  const fullContent = getFullHomeContent(locale);
  const content = fullContent?.content ?? null;
  const faq = content?.faq.items ?? [1, 2, 3].map((number) => ({
    question: support(`faq.q${number}.question`),
    answer: support(`faq.q${number}.answer`),
  }));
  const pageTitle = content?.hero.title ?? `${heroMessages("titlePart1").replace(/<br\s*\/?\s*>/gi, " ").trim()} ${heroMessages("titleProfessional")}`;
  const pageDescription = content?.hero.subtitle ?? heroMessages("subtitle");
  const canonical = localizedAbsoluteUrl(locale, "/");
  const organizationId = `${PRODUCT_FACTS.websiteOrigin}/#organization`;
  const websiteId = `${PRODUCT_FACTS.websiteOrigin}/#website`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: PRODUCT_FACTS.name,
      url: PRODUCT_FACTS.websiteOrigin,
      logo: absoluteUrl(PRODUCT_FACTS.appIcon),
      contactPoint: {"@type": "ContactPoint", contactType: "customer support", email: PRODUCT_FACTS.supportEmail},
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
      description: pageDescription,
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
      description: pageDescription,
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <SiteHeader />
      {content && fullContent ? (
        <TierOneHome content={content} projects={fullContent.projects.filter((project) => project.status === "published").slice(0, 3)} />
      ) : (
        <BaselineHome />
      )}
      <SiteFooter />
    </div>
  );
}

function TierOneHome({content, projects}: {content: HomePageContent; projects: HubProjectExample[]}) {
  return (
    <main>
      <section className="overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark dark:text-primary-light">{content.hero.eyebrow}</p>
              <h1 className="display-title mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl md:text-6xl md:leading-[1.02]">{content.hero.title}</h1>
              <p className="prose-copy mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">{content.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <AppStoreCTA location="hero" pageId="home" label={content.hero.primaryLabel} className="inline-flex rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1452a3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2" />
                <a href="#workflow" className="inline-flex items-center gap-2 font-semibold underline decoration-border underline-offset-8 transition-colors hover:text-primary-dark hover:decoration-primary dark:hover:text-primary-light">
                  {content.hero.secondaryLabel} <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="relative grid gap-3 sm:grid-cols-2 sm:items-end" aria-label={content.hero.title}>
              <HeroEvidence label={content.hero.inputLabel} evidence={content.hero.input} />
              <HeroEvidence label={content.hero.resultLabel} evidence={content.hero.result} emphasized />
              <div className="pointer-events-none absolute inset-x-[28%] top-1/2 hidden h-px bg-primary/60 sm:block" aria-hidden="true">
                <span className="absolute end-0 -top-1 h-2 w-2 rotate-45 border-e border-t border-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="scroll-mt-24 border-y border-border bg-background-secondary/50 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
          <div>
            <SectionIntro eyebrow={content.primer.eyebrow} title={content.primer.title} intro={content.primer.intro} />
            <p className="mt-6 border-s-2 border-primary ps-5 text-sm leading-6 text-gray-600 dark:text-gray-300">{content.primer.note}</p>
          </div>
          <CutlineDiagram content={content.primer} />
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionIntro eyebrow={content.workflow.eyebrow} title={content.workflow.title} intro={content.workflow.intro} />
          <div className="mt-14 divide-y divide-border border-y border-border">
            {content.workflow.items.map((step, index) => (
              <article key={step.number} className="grid items-center gap-8 py-10 md:py-14 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-sm font-semibold tabular-nums text-primary-dark dark:text-primary-light">{step.number}</span>
                  <h3 className="display-title mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{step.title}</h3>
                  <p className="prose-copy mt-5 max-w-xl leading-8 text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <EvidenceImage evidence={step.evidence} sizes="(max-width: 1024px) calc(100vw - 2.5rem), 560px" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background-secondary/55 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow={content.showcase.eyebrow} title={content.showcase.title} intro={content.showcase.intro} />
            <Link href="/showcase" className="shrink-0 font-semibold text-primary-dark hover:underline dark:text-primary-light">{content.showcase.viewAllLabel} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => <ProjectCard key={project.id} project={project} content={content.showcase} />)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionIntro eyebrow={content.devices.eyebrow} title={content.devices.title} intro={content.devices.intro} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {content.devices.items.map((item) => (
              <article key={item.platform}>
                <DeviceEvidenceImage evidence={item.evidence} />
                <div className="mt-3 flex items-baseline justify-between gap-4 px-1">
                  <h3 className="font-semibold">{item.platform}</h3><p className="text-sm text-gray-500">{item.title}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {content.devices.capabilities.map((capability) => (
              <article key={capability.title} className="bg-background p-6">
                <h3 className="font-semibold">{capability.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background-secondary/50 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <SectionIntro eyebrow={content.downstream.eyebrow} title={content.downstream.title} intro={content.downstream.intro} />
            <ol className="mt-8 border-y border-border">
              {content.downstream.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-border py-4 last:border-b-0">
                  <span className="text-sm font-semibold tabular-nums text-primary-dark dark:text-primary-light">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{step.description}</p></div>
                </li>
              ))}
            </ol>
            <Link href="/how-to-make-a-laser-cut-jigsaw-puzzle" className="mt-7 inline-flex font-semibold text-primary-dark hover:underline dark:text-primary-light">{content.downstream.tutorialLabel} <span className="ms-2" aria-hidden="true">→</span></Link>
            <p className="mt-5 border-s-2 border-primary ps-5 text-sm leading-6 text-gray-600 dark:text-gray-300">{content.downstream.note}</p>
          </div>
          <figure>
            <VideoFacade videoId="MyeE4t5dMaU" title={content.downstream.videoTitle} playLabel={content.downstream.videoPlayLabel} />
            <figcaption className="mt-3 px-1 text-xs leading-5 text-gray-500">{content.downstream.videoCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center">
            <div><h2 className="display-title text-2xl font-semibold tracking-tight md:text-3xl">{content.plans.title}</h2><p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{content.plans.intro}</p></div>
            <div className="grid gap-6 sm:grid-cols-2"><PlanSummary name={content.plans.freeName} summary={content.plans.freeSummary} features={content.plans.freeFeatures} /><PlanSummary name={content.plans.premiumName} summary={content.plans.premiumSummary} features={content.plans.premiumFeatures} /></div>
            <div><Link href="/pricing" className="inline-flex rounded-full border border-border px-5 py-2.5 font-semibold transition-colors hover:border-primary hover:text-primary-dark dark:hover:text-primary-light">{content.plans.pricingLabel}</Link><p className="mt-3 max-w-[15rem] text-xs leading-5 text-gray-500">{content.plans.storeNote}</p></div>
          </div>

          <div className="grid gap-10 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <h2 className="display-title text-3xl font-semibold tracking-tight md:text-4xl">{content.faq.title}</h2>
            <div className="border-y border-border">
              {content.faq.items.map((item) => (
                <details key={item.question} data-faq-item="true" className="group border-b border-border py-5 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden"><span>{item.question}</span><FaqToggleIcon /></summary>
                  <p className="prose-copy mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><SectionIntro eyebrow={content.learn.eyebrow} title={content.learn.title} intro={content.learn.intro} /><Link href="/learn" className="shrink-0 font-semibold text-primary-dark hover:underline dark:text-primary-light">{content.learn.viewAllLabel} <span aria-hidden="true">→</span></Link></div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {content.learn.links.map((link, index) => (
                <Link key={link.href} href={link.href} className="group bg-background p-6 transition-colors hover:bg-background-secondary"><span className="text-xs font-semibold text-primary-dark dark:text-primary-light">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 font-semibold">{link.title}</h3><span className="mt-5 inline-flex transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BaselineHome() {
  const navigation = useTranslations("Navigation");
  const hero = useTranslations("Hero");
  const features = useTranslations("Features");
  const common = useTranslations("Common");
  const help = useTranslations("Help");
  const support = useTranslations("Support");
  const imagePath = "/editor_overview-v1-6.webp" as const;
  const dimensions = getMediaDimensions(imagePath);
  const featureItems = ["customization", "workflow", "anywhere"] as const;

  return (
    <main>
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark dark:text-primary-light">{hero("version", {version: PRODUCT_FACTS.currentVersion})}</p>
            <h1 className="display-title mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">{hero("titlePart1").replace(/<br\s*\/?\s*>/gi, " ")} <span className="text-primary-dark dark:text-primary-light">{hero("titleProfessional")}</span></h1>
            <p className="prose-copy mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{hero("subtitle")}</p>
            <AppStoreCTA location="hero" pageId="home" label={navigation("download")} ariaLabel={common("appStoreAria")} className="mt-8 inline-flex rounded-full bg-primary-dark px-6 py-3 font-semibold text-white hover:bg-[#1452a3]" />
          </div>
          <figure data-media-evidence="true" data-media-source="app-screenshot" data-media-source-label={`JigsawDesigner ${PRODUCT_FACTS.currentVersion}`} className="screenshot-frame overflow-hidden rounded-[1.6rem]"><Image src={imagePath} alt={help("interfaceContent.title")} width={dimensions.width} height={dimensions.height} sizes="(max-width: 1024px) calc(100vw - 2.5rem), 680px" className="h-auto w-full" priority /></figure>
        </div>
      </section>
      <section id="product" className="border-y border-border bg-background-secondary/55 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8"><h2 className="display-title text-3xl font-semibold tracking-tight md:text-4xl">{features("title")}</h2><p className="mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">{features("subtitle")}</p><div className="mt-10 divide-y divide-border border-y border-border">{featureItems.map((key, index) => <article key={key} className="grid gap-4 py-6 md:grid-cols-[3rem_0.55fr_1fr] md:items-start"><span className="text-sm font-semibold text-primary-dark dark:text-primary-light">{String(index + 1).padStart(2, "0")}</span><h3 className="font-semibold">{features(`list.${key}.title`)}</h3><p className="leading-7 text-gray-600 dark:text-gray-300">{features(`list.${key}.description`)}</p></article>)}</div></div>
      </section>
      <section className="py-16 md:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr]"><h2 className="text-3xl font-semibold">{support("faq.title")}</h2><div className="border-y border-border">{[1,2,3].map((number) => <details key={number} data-faq-item="true" className="border-b border-border py-5 last:border-b-0"><summary className="cursor-pointer font-semibold">{support(`faq.q${number}.question`)}</summary><p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">{support(`faq.q${number}.answer`)}</p></details>)}</div></div></section>
    </main>
  );
}

function SectionIntro({eyebrow, title, intro}: {eyebrow: string; title: string; intro: string}) {
  return <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark dark:text-primary-light">{eyebrow}</p><h2 className="display-title mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{title}</h2><p className="prose-copy mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">{intro}</p></div>;
}

function HeroEvidence({label, evidence, emphasized = false}: {label: string; evidence: MediaEvidence; emphasized?: boolean}) {
  const {width, height} = getMediaDimensions(evidence.src);
  return (
    <figure className={`relative overflow-hidden rounded-[1.25rem] border bg-background shadow-xl shadow-black/5 ${emphasized ? "border-primary/40 sm:-translate-y-5" : "border-border"}`} data-media-evidence="true" data-media-source={evidence.source.kind} data-media-source-label={evidence.source.label}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3 text-xs"><span className="font-semibold">{label}</span><span className="text-gray-500">SVG</span></div>
      <Image src={evidence.src} alt={evidence.alt} width={width} height={height} sizes="(max-width: 640px) calc(100vw - 2.5rem), 360px" className="h-auto w-full" priority />
      {evidence.source.kind === "ai-concept" ? <span data-concept-label="true" className="absolute start-3 top-14 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">{evidence.conceptLabel}</span> : null}
    </figure>
  );
}

function EvidenceImage({evidence, sizes}: {evidence: MediaEvidence; sizes: string}) {
  const {width, height} = getMediaDimensions(evidence.src);
  return (
    <figure className="screenshot-frame relative overflow-hidden rounded-[1.25rem]" data-media-evidence="true" data-media-source={evidence.source.kind} data-media-source-label={evidence.source.label}>
      <Image src={evidence.src} alt={evidence.alt} width={width} height={height} sizes={sizes} className="h-auto w-full" />
      {evidence.source.kind === "ai-concept" ? <span data-concept-label="true" className="absolute start-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">{evidence.conceptLabel}</span> : null}
      <figcaption className="flex flex-wrap items-start justify-between gap-2 border-t border-border bg-background/90 px-4 py-3 text-xs leading-5 text-gray-600 dark:text-gray-300"><span>{evidence.caption}</span><span className="text-gray-500">{evidence.source.label}</span></figcaption>
    </figure>
  );
}

function DeviceEvidenceImage({evidence}: {evidence: MediaEvidence}) {
  const {width, height} = getMediaDimensions(evidence.src);
  return (
    <figure className="screenshot-frame overflow-hidden rounded-[1.25rem]" data-media-evidence="true" data-media-source={evidence.source.kind} data-media-source-label={evidence.source.label}>
      <div className="relative flex h-72 items-center justify-center bg-background-secondary p-3 lg:h-80">
        <Image src={evidence.src} alt={evidence.alt} width={width} height={height} sizes="(max-width: 768px) calc(100vw - 2.5rem), 31vw" className="max-h-full w-auto max-w-full object-contain" />
        {evidence.source.kind === "ai-concept" ? <span data-concept-label="true" className="absolute end-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-950">{evidence.conceptLabel}</span> : null}
      </div>
      <figcaption className="flex flex-wrap items-start justify-between gap-2 border-t border-border bg-background/90 px-4 py-3 text-xs leading-5 text-gray-600 dark:text-gray-300"><span>{evidence.caption}</span><span className="text-gray-500">{evidence.source.label}</span></figcaption>
    </figure>
  );
}

function ProjectCard({project, content}: {project: HubProjectExample; content: HomePageContent["showcase"]}) {
  return (
    <article className="overflow-hidden rounded-[1.4rem] border border-border bg-background" data-content-status={project.status}>
      <div className="grid grid-cols-2 gap-px bg-border">
        <ProjectVisual label={project.inputLabel} evidence={project.input} />
        <ProjectVisual label={project.resultLabel} evidence={project.result} />
      </div>
      <div className="p-6">
        <h3 className="display-title text-xl font-semibold tracking-tight">{project.title}</h3>
        <dl className="mt-5 space-y-4 text-sm leading-6">
          <div><dt className="font-semibold text-foreground">{content.objectiveLabel}</dt><dd className="mt-1 text-gray-600 dark:text-gray-300">{project.objective}</dd></div>
          <div><dt className="font-semibold text-foreground">{content.templateLabel}</dt><dd className="mt-1 text-gray-600 dark:text-gray-300">{project.template}</dd></div>
          <div><dt className="font-semibold text-foreground">{content.editLabel}</dt><dd className="mt-1 text-gray-600 dark:text-gray-300">{project.editAction}</dd></div>
        </dl>
      </div>
    </article>
  );
}

function ProjectVisual({label, evidence}: {label: string; evidence: MediaEvidence}) {
  const {width, height} = getMediaDimensions(evidence.src);
  return <figure className="relative bg-background-secondary" data-media-evidence="true" data-media-source={evidence.source.kind} data-media-source-label={evidence.source.label}><Image src={evidence.src} alt={evidence.alt} width={width} height={height} sizes="(max-width: 1024px) calc(50vw - 1.6rem), 210px" className="aspect-[4/3] h-full w-full object-cover object-center" />{evidence.source.kind === "ai-concept" ? <span data-concept-label="true" className="absolute end-2 top-2 rounded-full bg-amber-100 px-2 py-1 text-[0.65rem] font-semibold text-amber-950">{evidence.conceptLabel}</span> : null}<figcaption className="absolute inset-x-2 bottom-2 rounded-md bg-black/72 px-2 py-1 text-[0.65rem] font-semibold text-white backdrop-blur">{label}</figcaption></figure>;
}

function PlanSummary({name, summary, features}: {name: string; summary: string; features: string[]}) {
  return <div><h3 className="font-semibold">{name}</h3><p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{summary}</p><ul className="mt-3 space-y-2 text-sm">{features.map((feature) => <li key={feature} className="flex gap-2"><span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span><span>{feature}</span></li>)}</ul></div>;
}

function FaqToggleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-45" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CutlineDiagram({content}: {content: HomePageContent["primer"]}) {
  return (
    <figure className="technical-grid overflow-hidden rounded-[1.6rem] border border-border p-4 md:p-6">
      <svg role="img" aria-labelledby="cutline-diagram-title" viewBox="0 0 760 440" className="h-auto w-full text-foreground">
        <title id="cutline-diagram-title">{content.title}</title>
        <defs><marker id="diagram-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor" /></marker></defs>
        <path d="M154 82C220 42 310 69 370 53C440 34 548 54 598 111C650 171 631 267 589 331C546 397 445 378 373 389C291 402 177 384 139 311C98 232 89 122 154 82Z" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
        <g fill="none" stroke="var(--primary)" strokeWidth="3">
          <path d="M248 67C249 107 248 130 260 153C278 188 310 171 310 203C310 235 278 217 260 251C248 275 249 327 247 380" />
          <path d="M409 55C411 106 405 140 420 164C440 195 470 174 470 207C470 241 437 217 420 254C408 280 411 331 410 383" />
          <path d="M118 205C177 207 206 199 232 215C264 235 243 267 278 267C311 267 287 236 325 217C355 201 389 208 421 216C455 225 469 253 498 245C527 237 510 207 549 200C576 195 602 205 626 207" />
        </g>
        <g fontSize="16" fontWeight="600" fill="currentColor">
          <text x="24" y="54">{content.boundaryLabel}</text><path d="M119 57L156 87" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagram-arrow)" />
          <text x="535" y="44">{content.cutlineLabel}</text><path d="M584 51L472 159" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagram-arrow)" />
          <text x="24" y="409">{content.slotLabel}</text><path d="M116 398L258 260" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagram-arrow)" />
        </g>
        <g transform="translate(535 354)"><rect width="172" height="48" rx="24" fill="var(--primary-dark)" /><text x="86" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">{content.svgLabel}</text></g>
      </svg>
    </figure>
  );
}
