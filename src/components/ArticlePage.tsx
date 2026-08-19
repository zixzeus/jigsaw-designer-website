import Image from "next/image";
import {notFound} from "next/navigation";

import {getMediaDimensions} from "@/config/media";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, type SiteLocale} from "@/config/seo";
import type {ArticleContent, ContentImage} from "@/content/types";
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
  const isHowTo = content.schemaType === "HowTo";
  const isRelease = pathname.startsWith("/changelog/");
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
      ...(isHowTo
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
      inLanguage: locale,
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
          <header className="border-b border-border pt-28 pb-14 md:pt-36 md:pb-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <Breadcrumbs items={breadcrumbs} ariaLabel={content.labels.breadcrumbs} />
              <div className={leadImage ? "grid items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16" : "max-w-4xl"}>
                <div>
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark dark:text-primary-light">
                    {content.eyebrow}
                  </p>
                  <h1 className="display-title text-4xl font-semibold tracking-[-0.035em] sm:text-5xl md:text-6xl md:leading-[1.04]">
                    {content.title}
                  </h1>
                  <p className="prose-copy mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {content.intro}
                  </p>
                  {!isHelpArticle ? (
                    <AppStoreCTA
                      location={isRelease ? "changelog" : "article"}
                      pageId={content.slug}
                      label={content.labels.ctaLabel}
                      className="mt-8 inline-flex rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1452a3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
                    />
                  ) : null}
                </div>
                {leadImage ? <ArticleImage image={leadImage} hero priority /> : null}
              </div>
            </div>
          </header>

          <div className="border-b border-border">
            <nav
              aria-label={content.labels.contents}
              className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-5 py-4 text-sm md:px-8"
            >
              <span className="shrink-0 font-semibold text-foreground">
                {content.labels.contents}
              </span>
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 text-gray-600 transition-colors hover:text-foreground dark:text-gray-300"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          {content.highlights?.length && !isHelpArticle ? (
            <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
              <h2 className="text-sm font-semibold text-foreground">
                {content.labels.highlights}
              </h2>
              <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                {content.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <span className="mt-[0.65rem] h-px w-4 shrink-0 bg-primary" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div data-article-flow={isRelease ? "release-timeline" : "sections"}>
            {content.sections.map((section, index) => {
              const sectionImage = section.image?.src !== leadImage?.src ? section.image : undefined;
              const reverse = index % 2 === 1;

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className={`scroll-mt-24 border-t border-border py-16 md:py-24 ${index % 2 === 1 ? "bg-background-secondary/55" : "bg-background"}`}
                >
                  <div className={`mx-auto grid max-w-7xl gap-10 px-5 md:px-8 ${sectionImage ? "lg:grid-cols-2 lg:items-center lg:gap-16" : "max-w-4xl"}`}>
                    <div className={sectionImage && reverse ? "lg:order-2" : ""}>
                      <div className="flex items-baseline gap-4">
                        {isHowTo ? (
                          <span className="text-sm font-semibold tabular-nums text-primary-dark dark:text-primary-light">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        ) : isRelease ? (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        ) : null}
                        <h2 className="display-title text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
                          {section.title}
                        </h2>
                      </div>
                      <div className="prose-copy mt-6 space-y-5 text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300">
                        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      {section.bullets?.length ? (
                        <ul className="mt-7 divide-y divide-border border-y border-border text-sm leading-6">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3 py-3.5">
                              <span className="text-primary-dark dark:text-primary-light" aria-hidden="true">✓</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.note ? (
                        <p className="mt-7 border-s-2 border-primary ps-5 text-sm leading-6 text-gray-700 dark:text-gray-200">
                          {section.note}
                        </p>
                      ) : null}
                    </div>
                    {sectionImage ? (
                      <div className={reverse ? "lg:order-1" : ""}>
                        <ArticleImage image={sectionImage} />
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>

          {content.faq?.length ? (
            <section className="border-t border-border py-16 md:py-24">
              <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                <h2 className="display-title text-3xl font-semibold tracking-tight md:text-4xl">
                  {content.labels.faq}
                </h2>
                <div className="border-y border-border">
                  {content.faq.map((item) => (
                    <details key={item.question} data-faq-item="true" className="group border-b border-border py-5 last:border-b-0">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                        <span>{item.question}</span>
                        <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-45" viewBox="0 0 20 20" fill="none">
                          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                        </svg>
                      </summary>
                      <p className="prose-copy mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {content.related?.length ? (
            <section className="border-t border-border bg-background-secondary/55 py-16">
              <div className="mx-auto max-w-7xl px-5 md:px-8">
                <h2 className="text-2xl font-semibold tracking-tight">{content.labels.related}</h2>
                <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
                  {content.related.map((item) => (
                    <Link key={item.href} href={item.href} className="group bg-background p-6 transition-colors hover:bg-background-secondary">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.description}</p>
                      <span className="mt-5 inline-flex text-primary-dark transition-transform group-hover:translate-x-1 dark:text-primary-light" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
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
  const {width, height} = getMediaDimensions(image.src);
  const aspectRatio = width / height;
  const layout = image.layout ?? (aspectRatio < 0.9 ? "panel" : aspectRatio > 6 ? "strip" : "wide");
  const imageClass = layout === "panel"
    ? "mx-auto h-auto w-auto max-w-full"
    : layout === "strip"
      ? "h-auto w-[64rem] max-w-none"
      : "h-auto w-full";

  return (
    <figure
      data-media-evidence="true"
      data-media-source="app-screenshot"
      data-media-source-label={`JigsawDesigner ${PRODUCT_FACTS.currentVersion}`}
      className={`screenshot-frame overflow-hidden rounded-[1.35rem] ${layout === "panel" ? "mx-auto w-fit max-w-full" : layout === "strip" ? "overflow-x-auto" : ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        sizes={layout === "panel" ? "(max-width: 640px) calc(100vw - 2.5rem), 501px" : layout === "strip" ? "1024px" : hero ? "(max-width: 1024px) calc(100vw - 2.5rem), 680px" : "(max-width: 1024px) calc(100vw - 2.5rem), 560px"}
        className={imageClass}
        priority={priority}
      />
      {image.caption ? (
        <figcaption className="border-t border-border bg-background/85 px-5 py-3 text-xs leading-5 text-gray-600 dark:text-gray-300">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
