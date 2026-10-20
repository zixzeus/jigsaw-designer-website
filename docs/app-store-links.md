# App Store download links

Every official badge is a normal link directly to the JigsawDesigner product
page. There is no region picker, browser storage preference or IP geolocation.

Apple URL paths use country codes, independently of website language codes.
`APP_STORE_STOREFRONTS` maps the 33 website locales to explicit storefronts:
`zh-Hans` to `cn`, `en` to `us`, `ja` to `jp`, and so on. The same helper supplies
homepage structured data. Unknown locales safely use the US product URL.

## Why the automatic region redirect was removed

On 2026-10-20, the website saw the proxy's country as US while Apple's network
route resolved to China. The automatic redirect overrode the Chinese page's
storefront, and Apple redirected that US product URL to `/cn/iphone/today`, losing
the app ID. Manually selecting China worked but added unwanted UI and left the
default click broken. Chinese badges now link straight to the verified `/cn/app/`
product page, without requiring a choice or an extra website redirect.

The old `/api/app-store?locale=…` endpoint remains for cached pages. It follows the
locale mapping and ignores obsolete `country` parameters and IP headers. It
returns 302 with no-store/noindex and cannot redirect to another host or app.

## Verification boundary

`npm run check` validates all 33 locale mappings, generated badges, schema and
legacy redirects. Browser QA must click the badge without setting a region and
inspect the final Apple page. Check Chinese and English separately: a valid US
product link can still be redirected by Apple on a split Chinese proxy. A static
language mapping is not a guarantee of Apple's behavior on every network.
