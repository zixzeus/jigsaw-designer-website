import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import ArticlePage from "@/components/ArticlePage";
import {
  getMarketingPage,
  isMarketingSlug,
  marketingSlugs,
} from "@/content/marketing-pages";
import {
  getGeneratedSiteTranslation,
  hasGeneratedLocaleContent,
} from "@/content/localized-content";
import {isTierOneLocale} from "@/content/types";
import {FULL_CONTENT_LOCALES, isRouteAvailable, isSiteLocale} from "@/config/seo";
import {createPageMetadata} from "@/lib/seo";

type TopicParams = Promise<{locale: string; topic: string}>;

export const dynamicParams = false;

function resolveTopic(locale: string, topic: string) {
  const pathname = `/${topic}`;

  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable(pathname, locale) ||
    !isMarketingSlug(topic)
  ) {
    notFound();
  }

  const content = isTierOneLocale(locale)
    ? getMarketingPage(topic, locale)
    : hasGeneratedLocaleContent(locale)
      ? getGeneratedSiteTranslation(locale).content.marketing[topic]
      : null;
  if (!content) notFound();

  return {content, pathname, locale};
}

export function generateStaticParams() {
  return FULL_CONTENT_LOCALES.flatMap((locale) =>
    marketingSlugs.map((topic) => ({locale, topic})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: TopicParams;
}): Promise<Metadata> {
  const {locale, topic} = await params;
  const {content, pathname, locale: resolvedLocale} = resolveTopic(locale, topic);

  return createPageMetadata({
    locale: resolvedLocale,
    pathname,
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function MarketingTopicPage({
  params,
}: {
  params: TopicParams;
}) {
  const {locale, topic} = await params;
  const {content, pathname, locale: resolvedLocale} = resolveTopic(locale, topic);

  setRequestLocale(resolvedLocale);

  return <ArticlePage content={content} locale={resolvedLocale} pathname={pathname} />;
}
