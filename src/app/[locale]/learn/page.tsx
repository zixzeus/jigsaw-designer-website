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
import {getLearnPage} from "@/content/hub-pages";
import {isTierOneLocale, tierOneLocales} from "@/content/types";
import {Link} from "@/i18n/navigation";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  localizedAbsoluteUrl,
} from "@/lib/seo";

const pathname = "/learn";

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

  const content = getLearnPage(locale);
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

export default async function LearnPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const resolved = resolvePage(locale);
  const {content} = resolved;
  const entries = content.paths.flatMap((path) => path.entries);

  setRequestLocale(resolved.locale);

  const itemList = {
    "@type": "ItemList",
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.title,
      item: {
        "@type": "WebPage",
        name: entry.title,
        description: entry.description,
        url: localizedAbsoluteUrl(resolved.locale, entry.href),
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
      data-content-hub="learn"
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

        <header className="max-w-5xl border-b border-border pb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-dark dark:text-primary-light">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.04]">
            {content.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {content.intro}
          </p>
        </header>

        <nav aria-label={content.startLabel} className="border-b border-border py-10">
          <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {content.startLabel}
          </p>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {content.paths.map((path) => (
              <li key={path.id} className="bg-background">
                <a
                  href={`#${path.id}`}
                  className="group flex h-full items-start gap-5 p-6 transition-colors hover:bg-background-secondary md:p-8"
                >
                  <span className="font-mono text-sm text-primary-dark dark:text-primary-light">
                    {path.number}
                  </span>
                  <span>
                    <span className="block text-xl font-bold">{path.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {path.description}
                    </span>
                    <span className="mt-4 block transition-transform group-hover:translate-x-1" aria-hidden="true">
                      ↓
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="divide-y divide-border">
          {content.paths.map((path) => (
            <section
              key={path.id}
              id={path.id}
              data-learning-stage={path.id}
              className="scroll-mt-24 py-20"
            >
              <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                  <p className="font-mono text-sm text-primary-dark dark:text-primary-light">
                    {path.number}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                    {path.title}
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {path.description}
                  </p>
                  <div className="mt-7 border-s-2 border-primary ps-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {content.labels.outcome}
                    </p>
                    <p className="mt-2 leading-7">{path.outcome}</p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {path.entries.map((entry, entryIndex) => (
                    <article
                      key={entry.id}
                      className="group flex min-h-full flex-col overflow-hidden rounded-3xl border border-border bg-background"
                    >
                      {entry.media ? (
                        <EvidenceFigure
                          evidence={entry.media}
                          sourcePrefix={content.labels.source}
                          sizes="(max-width: 768px) calc(100vw - 3rem), 34vw"
                          className="rounded-none border-0 border-b border-border shadow-none"
                          priority={path.id === "understand" && entryIndex === 0}
                        />
                      ) : (
                        <div className="flex aspect-[16/9] items-end bg-background-secondary p-6" aria-hidden="true">
                          <span className="font-mono text-5xl text-gray-300 dark:text-gray-700">
                            {path.number}.{entryIndex + 1}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            {content.labels.difficulty}: {entry.difficulty === "beginner" ? content.labels.beginner : content.labels.intermediate}
                          </span>
                          <span>
                            {content.labels.duration}: {entry.duration}
                          </span>
                        </div>
                        <h3 className="mt-5 text-2xl font-bold tracking-tight">{entry.title}</h3>
                        <p className="mt-3 flex-1 leading-7 text-gray-600 dark:text-gray-300">
                          {entry.description}
                        </p>
                        <Link
                          href={entry.href}
                          className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-dark transition-colors hover:text-primary dark:text-primary-light"
                        >
                          {content.labels.openGuide}
                          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="grid gap-6 rounded-3xl border border-border bg-background-secondary p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold">{content.labels.referenceTitle}</h2>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              {content.labels.referenceDescription}
            </p>
          </div>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 font-semibold text-primary-dark dark:text-primary-light"
          >
            {content.labels.referenceLink}
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="mt-16 flex flex-col gap-7 border-y border-border py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">{content.labels.ctaTitle}</h2>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              {content.labels.ctaDescription}
            </p>
          </div>
          <AppStoreCTA
            location="learn"
            pageId="learn"
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
