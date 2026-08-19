import type {SiteLocale} from "@/config/seo";

import catalogJson from "./translations/catalog.json";
import {GENERATED_TRANSLATION_FILES} from "./translation-registry";
import {
  applyLocaleTranslations,
  type TranslationCatalog,
} from "./translation-catalog";
import {
  getEnglishSiteTranslationSource,
  type SiteTranslationSource,
} from "./translation-source";

const catalog = catalogJson as TranslationCatalog;
const source = getEnglishSiteTranslationSource();
const localizedCache = new Map<SiteLocale, SiteTranslationSource>();

export function hasGeneratedLocaleContent(locale: SiteLocale): boolean {
  return GENERATED_TRANSLATION_FILES[locale] !== undefined;
}

export function getGeneratedSiteTranslation(
  locale: SiteLocale,
): SiteTranslationSource {
  const cached = localizedCache.get(locale);
  if (cached) return cached;

  const translationFile = GENERATED_TRANSLATION_FILES[locale];
  if (!translationFile) {
    throw new Error(`Full translated content is unavailable for locale: ${locale}`);
  }
  const localized = applyLocaleTranslations(source, catalog, translationFile);
  localizedCache.set(locale, localized);
  return localized;
}
