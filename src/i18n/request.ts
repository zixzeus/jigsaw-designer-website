import {getRequestConfig} from 'next-intl/server';
import {isSiteLocale} from '@/config/seo';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;

  if (!locale || !isSiteLocale(locale)) {
    throw new Error(`Invalid website locale: ${locale ?? '(missing)'}`);
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
