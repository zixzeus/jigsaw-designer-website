import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import ArticlePage from "@/components/ArticlePage";
import {getHelpPage, helpSlugs, isHelpSlug} from "@/content/help-pages";
import {
  getGeneratedSiteTranslation,
  hasGeneratedLocaleContent,
} from "@/content/localized-content";
import {isTierOneLocale} from "@/content/types";
import {FULL_CONTENT_LOCALES, isRouteAvailable, isSiteLocale} from "@/config/seo";
import {createPageMetadata} from "@/lib/seo";

type HelpParams = Promise<{locale: string; slug: string}>;

export const dynamicParams = false;

function resolveHelp(locale: string, slug: string) {
  const pathname = `/help/${slug}`;

  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable(pathname, locale) ||
    !isHelpSlug(slug)
  ) {
    notFound();
  }

  const content = isTierOneLocale(locale)
    ? getHelpPage(slug, locale)
    : hasGeneratedLocaleContent(locale)
      ? getGeneratedSiteTranslation(locale).content.help[slug]
      : null;
  if (!content) notFound();

  return {content, pathname, locale};
}

export function generateStaticParams() {
  return FULL_CONTENT_LOCALES.flatMap((locale) =>
    helpSlugs.map((slug) => ({locale, slug})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: HelpParams;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const {content, pathname, locale: resolvedLocale} = resolveHelp(locale, slug);

  return createPageMetadata({
    locale: resolvedLocale,
    pathname,
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function HelpArticlePage({params}: {params: HelpParams}) {
  const {locale, slug} = await params;
  const {content, pathname, locale: resolvedLocale} = resolveHelp(locale, slug);

  setRequestLocale(resolvedLocale);

  return (
    <ArticlePage
      content={content}
      locale={resolvedLocale}
      pathname={pathname}
      sectionLabel={content.labels.help}
      sectionHref="/help"
    />
  );
}
