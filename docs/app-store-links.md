# App Store download links

Apple storefront paths use country codes (`cn`, `us`, `jp`), independently of
the website language (`zh-Hans`, `en`, `ja`). All badges share `AppStoreCTA`.

## Resolution order

1. An explicit region selected next to the badge, saved in browser local storage.
2. The current request's trusted Cloudflare `cf.country`.
3. The website locale's explicit storefront mapping, with US as the final default.

The saved region applies across pages and languages. Selecting Automatic clears
it. If storage is blocked, the selection still works on the current page.

The badge opens `/api/app-store?locale=…`, adding `country=…` for a manual choice.
This route responds with an uncached 302 to the fixed JigsawDesigner app ID.
Unrecognized countries and locales cannot change the destination host or app.
Homepage structured data uses the stable locale-specific Apple URL.

## Why a manual choice is needed

On 2026-10-20, a regionless Apple link and explicit non-China storefront links
were observed redirecting to `/cn`, then `/cn/iphone/today`, losing the app ID.
The explicit China product link worked. The same browser network was identified
as US by Cloudflare, so automatic IP selection alone cannot handle split proxies
or a visitor whose App Store region differs from their network.

The 175-country allowlist is from Apple's product-page region selector, checked
on 2026-10-20. It describes Apple storefronts, not guaranteed app availability in
every territory. The 32 locale-default storefronts and 10 additional common
storefronts were independently checked using Apple's lookup API for this app ID.

## Verification

`npm run check` runs the URL regression tests and checks all generated badges,
localized download metadata, fallback redirects, explicit-region overrides and
non-cacheable responses. Browser QA must also check selection synchronization,
reload/language persistence, Automatic reset, keyboard access and mobile/RTL
layout, then follow a selected-region badge to the actual Apple product page.
