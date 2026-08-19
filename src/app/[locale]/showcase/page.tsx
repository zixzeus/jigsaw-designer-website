import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import EvidenceFigure from "@/components/hubs/EvidenceFigure";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {getShowcasePage} from "@/content/hub-pages";
import {isTierOneLocale, tierOneLocales} from "@/content/types";
import {Link} from "@/i18n/navigation";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  localizedAbsoluteUrl,
} from "@/lib/seo";

const pathname = "/showcase";

export const dynamicParams = false;

export function generateStaticParams() {
  return tierOneLocales.map((locale) => ({locale}));
}

function resolvePage(locale: string) {
  if (
    !isSiteLocale(locale) ||
    !isTierOneLocale(locale) ||
    !isRouteAvailable(pathname, locale)
  ) {
    notFound();
  }

  const content = getShowcasePage(locale);
  if (!content) notFound();

  return {content, locale};
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const resolved = resolvePage(locale);

  return createPageMetadata({
    locale: resolved.locale,
    pathname,
    title: resolved.content.seoTitle,
    description: resolved.content.seoDescription,
  });
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const resolved = resolvePage(locale);
  const {content} = resolved;
  const projects = content.projects.filter((project) => project.status === "published");

  setRequestLocale(resolved.locale);

  const itemList = {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.objective,
        image: [absoluteUrl(project.input.src), absoluteUrl(project.result.src)],
      },
    })),
  };
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: localizedAbsoluteUrl(resolved.locale, pathname),
    name: content.seoTitle,
    description: content.seoDescription,
    inLanguage: resolved.locale,
    mainEntity: itemList,
  };
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    locale: resolved.locale,
    items: [
      {name: content.labels.home, pathname: "/"},
      {name: content.labels.pageName, pathname},
    ],
  });

  return (
    <div
      data-content-hub="showcase"
      className="min-h-screen bg-background text-foreground"
    >
      <JsonLd data={[collectionPage, breadcrumbJsonLd]} />
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-12 md:pt-36">
        <Breadcrumbs
          ariaLabel={content.labels.breadcrumbs}
          items={[
            {label: content.labels.home, href: "/"},
            {label: content.labels.pageName},
          ]}
        />

        <header className="grid gap-10 border-b border-border pb-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-dark dark:text-primary-light">
              {content.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.04]">
              {content.title}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {content.intro}
          </p>
        </header>

        <section
          aria-labelledby="evidence-title"
          className="grid gap-7 border-b border-border py-10 lg:grid-cols-[0.7fr_1.3fr]"
        >
          <h2 id="evidence-title" className="text-xl font-semibold">
            {content.evidenceTitle}
          </h2>
          <ul className="grid gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-3 dark:text-gray-300">
            {content.evidencePoints.map((point) => (
              <li key={point} className="border-s-2 border-primary ps-4">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="projects-title" className="pt-20">
          <div className="max-w-3xl">
            <h2 id="projects-title" className="text-3xl font-bold tracking-tight md:text-5xl">
              {content.projectsTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {content.projectsIntro}
            </p>
          </div>

          <div className="mt-14 space-y-20">
            {projects.map((project, projectIndex) => (
              <article
                key={project.id}
                id={project.id}
                data-content-status={project.status}
                className="scroll-mt-24 border-t border-border pt-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                  <div>
                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                      {String(projectIndex + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                      {project.title}
                    </h3>
                    <dl className="mt-7 space-y-5 text-sm leading-6">
                      <ProjectDetail term={content.labels.objective} description={project.objective} />
                      <ProjectDetail term={content.labels.device} description={project.device} />
                      <ProjectDetail term={content.labels.template} description={project.template} />
                      <ProjectDetail term={content.labels.editAction} description={project.editAction} />
                    </dl>
                    <Link
                      href={project.guideHref}
                      className="mt-7 inline-flex items-center gap-2 font-semibold text-primary-dark transition-colors hover:text-primary dark:text-primary-light"
                    >
                      {content.labels.openGuide}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>

                  <div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <EvidenceFigure
                        evidence={project.input}
                        label={project.inputLabel}
                        sourcePrefix={content.labels.source}
                        priority={projectIndex === 0}
                      />
                      <EvidenceFigure
                        evidence={project.result}
                        label={project.resultLabel}
                        sourcePrefix={content.labels.source}
                        priority={projectIndex === 0}
                      />
                    </div>
                    <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-[0.35fr_1.65fr]">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {content.labels.process}
                      </h4>
                      <ol className="grid gap-4 sm:grid-cols-3">
                        {project.steps.map((step, index) => (
                          <li key={step} className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                            <span className="mb-2 block font-mono text-xs text-primary-dark dark:text-primary-light">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-24 grid gap-6 rounded-3xl border border-border bg-background-secondary p-7 md:grid-cols-[0.55fr_1.45fr] md:p-10">
          <h2 className="text-2xl font-bold">{content.labels.limitationTitle}</h2>
          <p className="leading-7 text-gray-600 dark:text-gray-300">
            {content.labels.limitationBody}
          </p>
        </aside>

        <section className="mt-20 flex flex-col gap-7 border-y border-border py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">{content.labels.ctaTitle}</h2>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              {content.labels.ctaDescription}
            </p>
          </div>
          <AppStoreCTA
            location="showcase"
            pageId="showcase"
            label={content.labels.appStoreLabel}
            ariaLabel={content.labels.appStoreAria}
            className="inline-flex shrink-0 justify-center rounded-full bg-primary-dark px-7 py-3 font-semibold text-white transition-colors hover:bg-[#1452a3]"
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ProjectDetail({
  term,
  description,
}: {
  term: string;
  description: string;
}) {
  return (
    <div className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <dt className="font-semibold text-foreground">{term}</dt>
      <dd className="mt-1 text-gray-600 dark:text-gray-300">{description}</dd>
    </div>
  );
}
