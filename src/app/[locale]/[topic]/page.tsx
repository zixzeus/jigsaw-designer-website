import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import ArticlePage from "@/components/ArticlePage";
import {
  getMarketingPage,
  marketingSlugs,
} from "@/content/marketing-pages";
import {isTierOneLocale, tierOneLocales} from "@/content/types";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {createPageMetadata} from "@/lib/seo";

type TopicParams = Promise<{locale: string; topic: string}>;

export const dynamicParams = false;

function resolveTopic(locale: string, topic: string) {
  const pathname = `/${topic}`;

  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable(pathname, locale) ||
    !isTierOneLocale(locale)
  ) {
    notFound();
  }

  const content = getMarketingPage(topic, locale);
  if (!content) notFound();

  return {content, pathname, locale};
}

export function generateStaticParams() {
  return tierOneLocales.flatMap((locale) =>
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
