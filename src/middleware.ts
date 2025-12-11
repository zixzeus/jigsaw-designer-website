import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {countryToLocale} from './i18n/config';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has('NEXT_LOCALE');
  if (hasCookie) {
    return intlMiddleware(request);
  }

  const country = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country');
  
  if (country && countryToLocale[country] && request.nextUrl.pathname === '/') {
    const targetLocale = countryToLocale[country];
    const url = request.nextUrl.clone();
    // Redirect to /[locale]
    url.pathname = `/${targetLocale}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|zh|es|fr|de|it|ja|ko|pt|ru|tr|vi|th|id|ms|hi|ar|he|nl|sv|da|fi|no|pl|ro|uk|cs|hu|el|hr|sk|ca)/:path*']
};
