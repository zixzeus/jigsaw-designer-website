import {getAppStoreUrl} from "@/config/product";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const locale = params.get("locale") ?? "en";

  // Compatibility for previously cached pages. New badges link straight to
  // Apple. Network geolocation and obsolete region choices must not override
  // the page's storefront: split proxies can send Chinese readers to US/Today.
  return new Response(null, {
    status: 302,
    headers: {
      Location: getAppStoreUrl(locale),
      "Cache-Control": "private, no-store, max-age=0",
      "CDN-Cache-Control": "no-store",
      "Cloudflare-CDN-Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
