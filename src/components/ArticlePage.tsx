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
  const leadImage = content.leadImage;
  const isHelpArticle = pathname.startsWith("/help/");
  const showHeroCta = !isHelpArticle;
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
          <header className="border-b border-border pt-28 pb-14 md:pt-32 md:pb-16">
            <div className="container mx-auto max-w-6xl px-6 md:px-12">
              <Breadcrumbs
                items={breadcrumbs}
                ariaLabel={content.labels.breadcrumbs}
              />
              <div className="max-w-4xl">
                <p className="mb-4 text-sm font-semibold text-primary-dark dark:text-primary-light">
                  {content.eyebrow}
                </p>
                <h1 className="text-4xl font-bold tracking-[-0.025em] md:text-5xl md:leading-[1.08]">
                  {content.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {content.intro}
                </p>
                {showHeroCta ? (
                  <AppStoreCTA
                    location="article"
                    pageId={content.slug}
                    label={content.labels.ctaLabel}
                    className="mt-8 inline-flex rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1452a3]"
                  />
                ) : null}
              </div>
              {leadImage ? <ArticleImage image={leadImage} hero priority /> : null}
            </div>
          </header>

          <div className="container mx-auto grid max-w-6xl gap-14 px-6 py-14 md:px-12 md:py-16 lg:grid-cols-[200px_minmax(0,1fr)]">
            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
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
              <details className="mb-10 border-y border-border py-4 lg:hidden">
                <summary className="cursor-pointer font-semibold">
                  {content.labels.contents}
                </summary>
                <nav aria-label={content.labels.contents} className="mt-4">
                  <ol className="space-y-3 border-s border-border ps-4 text-sm">
                    {content.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="leading-5 text-gray-600 hover:text-primary-dark dark:text-gray-300 dark:hover:text-primary-light"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>

              {!isHelpArticle && content.highlights?.length ? (
                <section className="mb-14 border-y border-border py-7">
                  <h2 className="text-lg font-semibold">
                    {content.labels.highlights}
                  </h2>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {content.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 leading-7">
                        <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">
                          —
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="space-y-14">
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
                      <ul className="mt-6 space-y-3 border-s-2 border-border ps-5 leading-7">
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
                      <p className="mt-6 border-s-2 border-primary px-5 py-3 text-sm leading-6 text-gray-700 dark:text-gray-200">
                        {section.note}
                      </p>
                    ) : null}
                    {section.image && section.image.src !== leadImage?.src ? (
                      <ArticleImage image={section.image} />
                    ) : null}
                  </section>
                ))}
              </div>

              {content.faq?.length ? (
                <section className="mt-20 border-t border-border pt-14">
                  <h2 className="text-3xl font-bold">{content.labels.faq}</h2>
                  <div className="mt-7 border-y border-border">
                    {content.faq.map((item) => (
                      <details
                        key={item.question}
                        data-faq-item="true"
                        className="group border-b border-border py-5 last:border-b-0"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
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
                  <div className="mt-6 divide-y divide-border border-y border-border">
                    {content.related.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-5 transition-colors hover:text-primary-dark dark:hover:text-primary-light"
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

          <section className="border-t border-border py-14">
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

function ArticleImage({
  image,
  hero = false,
  priority = false,
}: {
  image: ContentImage;
  hero?: boolean;
  priority?: boolean;
}) {
  const dimensions = getMediaDimensions(image.src);
  const {width, height} = dimensions;
  const aspectRatio = width / height;
  const layout =
    image.layout ??
    (aspectRatio < 0.9 ? "panel" : aspectRatio > 6 ? "strip" : "wide");
  const figureClass = hero
    ? layout === "panel"
      ? "mx-auto mt-10 w-fit max-w-full overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-sm"
      : layout === "strip"
        ? "mt-10 overflow-x-auto rounded-2xl border border-border bg-background-secondary shadow-sm"
      : "mt-10 overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-sm"
    : layout === "panel"
      ? "mx-auto mt-8 w-fit max-w-full overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-sm"
      : layout === "strip"
        ? "mt-8 overflow-x-auto rounded-2xl border border-border bg-background-secondary shadow-sm"
        : "mt-8 overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-sm";
  const imageClass =
    layout === "panel"
      ? "mx-auto h-auto w-auto max-w-full"
      : layout === "strip"
        ? "h-auto w-[64rem] max-w-none"
        : "h-auto w-full";

  return (
    <figure className={figureClass}>
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        sizes={
          layout === "panel"
            ? "(max-width: 640px) calc(100vw - 3rem), 501px"
            : layout === "strip"
              ? "1024px"
              : hero
                ? "(max-width: 1024px) calc(100vw - 3rem), 1056px"
                : "(max-width: 1024px) calc(100vw - 3rem), 824px"
        }
        className={imageClass}
        priority={priority}
      />
      {image.caption ? (
        <figcaption className="border-t border-border px-5 py-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
