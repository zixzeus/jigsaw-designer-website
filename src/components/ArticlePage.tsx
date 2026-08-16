import Image from "next/image";
import {notFound} from "next/navigation";

import type {ArticleContent, ContentImage} from "@/content/types";
import {getMediaDimensions} from "@/config/media";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, type SiteLocale} from "@/config/seo";
import {Link} from "@/i18n/navigation";
import {createBreadcrumbJsonLd, localizedAbsoluteUrl} from "@/lib/seo";

import AppStoreCTA from "./AppStoreCTA";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type ArticlePageProps = {
  content: ArticleContent;
  locale: SiteLocale;
  pathname: string;
  sectionLabel?: string;
  sectionHref?: string;
};

export default function ArticlePage({
  content,
  locale,
  pathname,
  sectionLabel,
  sectionHref,
}: ArticlePageProps) {
  if (!isRouteAvailable(pathname, locale)) notFound();

  const canonical = localizedAbsoluteUrl(locale, pathname);
  const breadcrumbs = [
    {label: content.labels.home, href: "/"},
    ...(sectionLabel && sectionHref
      ? [{label: sectionLabel, href: sectionHref}]
      : []),
    {label: content.title},
  ];

  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": content.schemaType ?? "Article",
      headline: content.title,
      description: content.seoDescription,
      inLanguage: locale,
      mainEntityOfPage: canonical,
      author: {"@type": "Organization", name: PRODUCT_FACTS.name},
      publisher: {"@type": "Organization", name: PRODUCT_FACTS.name},
      ...(content.schemaType === "HowTo"
        ? {
            name: content.title,
            step: content.sections.map((section, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: section.title,
              text: section.paragraphs.join(" "),
              url: `${canonical}#${section.id}`,
            })),
          }
        : {}),
    },
    createBreadcrumbJsonLd({
      locale,
      items: breadcrumbs.map((item) => ({
        name: item.label,
        pathname: item.href ?? pathname,
      })),
    }),
  ];

  if (content.faq?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {"@type": "Answer", text: item.answer},
      })),
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <SiteHeader />

      <main>
        <article>
          <header className="border-b border-border bg-gradient-to-b from-primary-ultra-light/70 to-background pt-28 pb-16 md:pt-36 md:pb-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-12">
              <Breadcrumbs
                items={breadcrumbs}
                ariaLabel={content.labels.breadcrumbs}
              />
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-dark dark:text-primary-light">
                {content.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.08]">
                {content.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300 md:text-xl">
                {content.intro}
              </p>
              <AppStoreCTA
                location="article"
                pageId={content.slug}
                label={content.labels.ctaLabel}
                className="mt-8 inline-flex rounded-full bg-primary-dark px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#1452a3]"
              />
            </div>
          </header>

          <div className="container mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-12 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                {content.labels.contents}
              </h2>
              <nav aria-label={content.labels.contents} className="mt-4">
                <ol className="space-y-3 border-s border-border ps-4 text-sm">
                  {content.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="leading-5 text-gray-600 transition-colors hover:text-primary-dark dark:text-gray-300 dark:hover:text-primary-light"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              {content.highlights?.length ? (
                <section className="mb-14 rounded-3xl border border-primary/15 bg-primary-ultra-light/40 p-7 md:p-9">
                  <h2 className="text-xl font-bold">
                    {content.labels.highlights}
                  </h2>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {content.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 leading-7">
                        <span className="mt-1 text-primary-dark dark:text-primary-light" aria-hidden="true">
                          ✓
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="space-y-16">
                {content.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                      {section.title}
                    </h2>
                    <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets?.length ? (
                      <ul className="mt-6 space-y-3 rounded-2xl bg-background-secondary p-6 leading-7">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">
                              •
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.note ? (
                      <p className="mt-6 border-s-4 border-primary bg-primary-ultra-light/40 px-5 py-4 text-sm leading-6 text-gray-700 dark:text-gray-200">
                        {section.note}
                      </p>
                    ) : null}
                    {section.image ? <ArticleImage image={section.image} /> : null}
                  </section>
                ))}
              </div>

              {content.faq?.length ? (
                <section className="mt-20 border-t border-border pt-14">
                  <h2 className="text-3xl font-bold">{content.labels.faq}</h2>
                  <div className="mt-7 space-y-4">
                    {content.faq.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-2xl border border-border bg-background p-6"
                      >
                        <summary className="cursor-pointer list-none pe-8 font-semibold marker:hidden">
                          {item.question}
                        </summary>
                        <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {content.related?.length ? (
                <section className="mt-20">
                  <h2 className="text-2xl font-bold">{content.labels.related}</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {content.related.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-2xl border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                      >
                        <h3 className="font-bold text-primary-dark dark:text-primary-light">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>

          <section className="border-t border-border bg-background-secondary py-16">
            <div className="container mx-auto max-w-4xl px-6 text-center md:px-12">
              <h2 className="text-3xl font-bold">{content.labels.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
                {content.labels.ctaDescription}
              </p>
              <AppStoreCTA
                location="article"
                pageId={content.slug}
                label={content.labels.ctaLabel}
                className="mt-7 inline-flex rounded-full bg-primary-dark px-7 py-3 font-semibold text-white hover:bg-[#1452a3]"
              />
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

function ArticleImage({image}: {image: ContentImage}) {
  const dimensions = getMediaDimensions(image.src);

  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-sm">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? dimensions.width}
        height={image.height ?? dimensions.height}
        sizes="(max-width: 1024px) calc(100vw - 3rem), 824px"
        className="h-auto w-full"
      />
    </figure>
  );
}
