import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {countryToLocale, locales} from './i18n/config';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // 1. Check if user has a preference cookie
  const hasCookie = request.cookies.has('NEXT_LOCALE');
  if (hasCookie) {
    return intlMiddleware(request);
  }

  // 2. Check if path already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. IP-based redirection for all non-localized paths
  if (!hasLocale) {
    const country = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country');
    
    if (country && countryToLocale[country]) {
      const targetLocale = countryToLocale[country];
      const url = request.nextUrl.clone();
      
      // Redirect to /[locale]/[path]
      // e.g. / -> /zh
      // e.g. /privacy -> /zh/privacy
      url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
