import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import ArticlePage from "@/components/ArticlePage";
import {
  changelogSlugs,
  getChangelogPage,
} from "@/content/changelog-pages";
import {isTierOneLocale, tierOneLocales} from "@/content/types";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {createPageMetadata} from "@/lib/seo";

type ChangelogParams = Promise<{locale: string; slug: string}>;

export const dynamicParams = false;

function resolveChangelog(locale: string, slug: string) {
  const pathname = `/changelog/${slug}`;

  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable(pathname, locale) ||
    !isTierOneLocale(locale)
  ) {
    notFound();
  }

  const content = getChangelogPage(slug, locale);
  if (!content) notFound();

  return {content, pathname, locale};
}

export function generateStaticParams() {
  return tierOneLocales.flatMap((locale) =>
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
