import {defineRouting} from 'next-intl/routing';
import {locales, defaultLocale} from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Every public URL is explicitly localized. The middleware below owns the
  // stable root/legacy redirects, so detection must not change destinations.
  localeDetection: false,
  localeCookie: false,
  // Metadata and sitemap are the sole hreflang sources. This prevents an HTTP
  // Link header from drifting from per-route locale availability.
  alternateLinks: false,
});
