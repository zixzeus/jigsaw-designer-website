import type {MetadataRoute} from "next";
import {
  DEFAULT_LOCALE,
  LOCALE_SPECS,
  SEO_ROUTES,
} from "@/config/seo";
import {localizedAbsoluteUrl} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_ROUTES
    .filter((route) => route.indexable && route.includeInSitemap)
    .flatMap((route) => {
      const languages = Object.fromEntries([
        ...route.locales.map((locale) => [
          LOCALE_SPECS[locale].hreflang,
          localizedAbsoluteUrl(locale, route.pathname),
        ]),
        [
          "x-default",
          localizedAbsoluteUrl(DEFAULT_LOCALE, route.pathname),
        ],
      ]);

      return route.locales.map((locale) => ({
        url: localizedAbsoluteUrl(locale, route.pathname),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {languages},
      }));
    });
}
