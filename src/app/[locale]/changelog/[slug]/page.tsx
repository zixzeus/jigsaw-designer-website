import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import ArticlePage from "@/components/ArticlePage";
import {
  changelogSlugs,
  getChangelogPage,
  isChangelogSlug,
} from "@/content/changelog-pages";
import {
  getGeneratedSiteTranslation,
  hasGeneratedLocaleContent,
} from "@/content/localized-content";
import {isTierOneLocale} from "@/content/types";
import {FULL_CONTENT_LOCALES, isRouteAvailable, isSiteLocale} from "@/config/seo";
import {createPageMetadata} from "@/lib/seo";

type ChangelogParams = Promise<{locale: string; slug: string}>;

export const dynamicParams = false;

function resolveChangelog(locale: string, slug: string) {
  const pathname = `/changelog/${slug}`;

  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable(pathname, locale) ||
    !isChangelogSlug(slug)
  ) {
    notFound();
  }

  const content = isTierOneLocale(locale)
    ? getChangelogPage(slug, locale)
    : hasGeneratedLocaleContent(locale)
      ? getGeneratedSiteTranslation(locale).content.changelog[slug]
      : null;
  if (!content) notFound();

  return {content, pathname, locale};
}

export function generateStaticParams() {
  return FULL_CONTENT_LOCALES.flatMap((locale) =>
    changelogSlugs.map((slug) => ({locale, slug})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: ChangelogParams;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const {content, pathname, locale: resolvedLocale} = resolveChangelog(locale, slug);

  return createPageMetadata({
    locale: resolvedLocale,
    pathname,
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function ChangelogPage({
  params,
}: {
  params: ChangelogParams;
}) {
  const {locale, slug} = await params;
  const {content, pathname, locale: resolvedLocale} = resolveChangelog(locale, slug);

  setRequestLocale(resolvedLocale);

  return <ArticlePage content={content} locale={resolvedLocale} pathname={pathname} />;
}
