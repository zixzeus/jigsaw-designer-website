import createMiddleware from "next-intl/middleware";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {DEFAULT_LOCALE, LEGACY_LOCALE_REDIRECTS} from "./config/seo";
import {routing} from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function permanentRedirect(
  request: NextRequest,
  pathname: string,
  status: 301 | 308,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;

  const response = NextResponse.redirect(url, status);
  response.headers.set("Cache-Control", "public, max-age=86400");
  return response;
}

// Next.js 16 Proxy is Node.js-only, while OpenNext Cloudflare currently
// supports Edge Middleware. Keep this deprecated filename until the adapter
// gains Node.js Proxy support, then migrate it back to `proxy.ts`.
export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  // Application fallback for ordinary document routes. Cloudflare must own
  // whole-host canonicalization because this matcher intentionally excludes
  // static files; do not treat this as a replacement for an edge redirect.
  if (hostname.toLowerCase().startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = hostname.slice(4);
    const response = NextResponse.redirect(url, 301);
    response.headers.set("Cache-Control", "public, max-age=86400");
    return response;
  }

  if (pathname === "/") {
    return permanentRedirect(request, `/${DEFAULT_LOCALE}`, 308);
  }

  for (const [legacyLocale, canonicalLocale] of Object.entries(
    LEGACY_LOCALE_REDIRECTS,
  )) {
    const legacyPrefix = `/${legacyLocale}`;
    if (pathname === legacyPrefix || pathname.startsWith(`${legacyPrefix}/`)) {
      return permanentRedirect(
        request,
        `/${canonicalLocale}${pathname.slice(legacyPrefix.length)}`,
        301,
      );
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
