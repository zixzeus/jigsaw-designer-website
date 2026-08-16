import type {Metadata} from "next";
import {PRODUCT_FACTS} from "@/config/product";
import {
  DEFAULT_LOCALE,
  getSeoRoute,
  LOCALE_SPECS,
  normalizeSeoPathname,
  type SiteLocale,
} from "@/config/seo";

export interface CreatePageMetadataInput {
  readonly locale: SiteLocale;
  readonly pathname: string;
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly noIndex?: boolean;
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly pathname: string;
}

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, `${PRODUCT_FACTS.websiteOrigin}/`).toString();
}

export function localizedPathname(
  locale: SiteLocale,
  pathname: string,
): string {
  const normalizedPathname = normalizeSeoPathname(pathname);
  return normalizedPathname === "/"
    ? `/${locale}`
    : `/${locale}${normalizedPathname}`;
}

export function localizedAbsoluteUrl(
  locale: SiteLocale,
  pathname: string,
): string {
  return absoluteUrl(localizedPathname(locale, pathname));
}

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  image = PRODUCT_FACTS.defaultSocialImage,
  noIndex = false,
}: CreatePageMetadataInput): Metadata {
  const normalizedPathname = normalizeSeoPathname(pathname);
  const route = getSeoRoute(normalizedPathname);
  const localeIsAvailable = route?.locales.includes(locale) ?? false;
  const shouldNoIndex = noIndex || !route?.indexable || !localeIsAvailable;
  const canonicalLocale = localeIsAvailable
    ? locale
    : (route?.locales[0] ?? DEFAULT_LOCALE);
  const canonical = localizedAbsoluteUrl(canonicalLocale, normalizedPathname);
  const localeSpec = LOCALE_SPECS[locale];
  const imageUrl = absoluteUrl(image);

  const languageAlternates = !shouldNoIndex && route
    ? Object.fromEntries([
        ...route.locales.map((alternateLocale) => [
          LOCALE_SPECS[alternateLocale].hreflang,
          localizedAbsoluteUrl(alternateLocale, normalizedPathname),
        ]),
        [
          "x-default",
          localizedAbsoluteUrl(DEFAULT_LOCALE, normalizedPathname),
        ],
      ])
    : undefined;

  const openGraphImages = [{url: imageUrl, width: 1200, height: 630, alt: title}];

  return {
    title: title.includes(PRODUCT_FACTS.name) ? {absolute: title} : title,
    description,
    alternates: {
      canonical,
      ...(languageAlternates ? {languages: languageAlternates} : {}),
    },
    robots: {
      index: !shouldNoIndex,
      follow: true,
      googleBot: {
        index: !shouldNoIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: PRODUCT_FACTS.name,
      locale: localeSpec.openGraphLocale,
      alternateLocale: route?.locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => LOCALE_SPECS[alternateLocale].openGraphLocale),
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function createBreadcrumbJsonLd({
  locale,
  items,
}: {
  readonly locale: SiteLocale;
  readonly items: readonly BreadcrumbItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedAbsoluteUrl(locale, item.pathname),
    })),
  } as const;
}
