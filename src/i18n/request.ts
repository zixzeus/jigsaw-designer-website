import {getRequestConfig} from 'next-intl/server';
import {isSiteLocale} from '@/config/seo';
import {
  getGeneratedSiteTranslation,
  hasGeneratedLocaleContent,
} from '@/content/localized-content';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;

  if (!locale || !isSiteLocale(locale)) {
    throw new Error(`Invalid website locale: ${locale ?? '(missing)'}`);
  }

  const baseMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = hasGeneratedLocaleContent(locale)
    ? {
        ...baseMessages,
        ...getGeneratedSiteTranslation(locale).messageNamespaces,
      }
    : baseMessages;

  return {
    locale,
    messages,
  };
});
