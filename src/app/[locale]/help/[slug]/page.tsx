import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import ArticlePage from "@/components/ArticlePage";
import {getHelpPage, helpSlugs} from "@/content/help-pages";
import {isTierOneLocale, tierOneLocales} from "@/content/types";
import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {createPageMetadata} from "@/lib/seo";

type HelpParams = Promise<{locale: string; slug: string}>;

export const dynamicParams = false;

function resolveHelp(locale: string, slug: string) {
  const pathname = `/help/${slug}`;

  if (
    !isSiteLocale(locale) ||
    !isRouteAvailable(pathname, locale) ||
    !isTierOneLocale(locale)
  ) {
    notFound();
  }

  const content = getHelpPage(slug, locale);
  if (!content) notFound();

  return {content, pathname, locale};
}

export function generateStaticParams() {
  return tierOneLocales.flatMap((locale) =>
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
