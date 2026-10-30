# JigsawDesigner website

The multilingual product and support website for [JigsawDesigner](https://jigsawdesigner.com),
built with Next.js and deployed on Cloudflare Workers through the OpenNext adapter.
The native app and its App Store purchase channel are maintained separately.

## Paddle review preparation — October 30, 2026

The website materials are prepared for Paddle review under
**Guangzhou Axing E - Commerce Co., Ltd.** The company's product portfolio includes
JigsawDesigner and NestCoda, listed together at [nestcoda.com/products](https://nestcoda.com/products).
Prepared website content and an active Paddle catalog do **not** mean that Paddle has
approved the company or domains, or that production charging is enabled.

JigsawDesigner website checkout is **not yet available**. This repository contains
pricing and conditional purchase, refund and privacy information in all 33 site
languages; it does not load Paddle checkout, accept website payments, or activate
Paddle entitlements in the app. App Store subscriptions remain available. Apple
handles their billing and refunds, and the final App Store price depends on the
customer's storefront.

The following records are configured in the Paddle **Live catalog**, for future
website purchasing after approval and completion of delivery/entitlement work:

| Record | Value |
| :--- | :--- |
| Product | `pro_01m66c42rcpvbre6tmeneph4jf` |
| Monthly price | **USD 12.99/month** — `pri_01m66c9phqsfcc8xk1m0v3b2k5` |
| Yearly price | **USD 99.99/year** — `pri_01m66ckj4dhexajpfab9zvr4tq` |
| Tax treatment | Excludes applicable tax; the final total and currency appear at checkout |
| Trial / quantity | No trial; quantity 1 |

These catalog identifiers are documentation only and are not connected to a
purchase flow in this website. Public support remains
[zixzeus@jigsawdesigner.com](mailto:zixzeus@jigsawdesigner.com).
Future Paddle website orders may request a refund within 14 days through
[paddle.net](https://paddle.net), subject to Paddle's current refund policy and
applicable law. App Store refunds follow Apple's separate process.

Website pricing and company details are centralized in `src/config/commerce.ts`.
Localized conditional commerce copy lives in `src/content/commerce-locales`;
`src/content/commerce.ts` enforces the complete locale mapping. The content check
keeps website purchasing in the pending state until an intentional launch change.

## Getting Started

First, run:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server (using the package manager of your choice):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Full-content localization

The public site ships the complete product, Showcase, Learn, marketing, Help,
Pricing, changelog, Terms, and Refund content in all 33 active locales.

```bash
# Rebuild the stable English catalog after source-copy changes
npm run translation:catalog

# Have ChatGPT update only the new or changed IDs in the target locale file
npm run translation:validate -- es

# Regenerate the typed locale registry after locale files change
npm run translation:registry

# Validate all locale files, metadata, routes, and generated pages
npm run check
```

Locale files live in `src/content/translations`. Translation files are accepted
only when their source hash, 681-entry key set, placeholders, protected product
terms, and expected writing system pass validation. Missing translations fail
the build; the site does not silently fall back to English. External machine
translation APIs are not part of this workflow.

## Production release

GitHub `main` deploys through **Cloudflare Workers Builds: jigsaw-designer-website**.
The release gates are:

```bash
npm run check
npx --no-install opennextjs-cloudflare build
```

Review desktop, 390px mobile, long German text and Arabic RTL before completing
release acceptance. Stage only the intended website files, verify the staged diff,
then push the authorized release to `main`. Wait for the Cloudflare provider check
and verify current production HTML with a fresh query parameter or a no-cache
request. A local build or successful push alone does not confirm a live deployment.

`npm run dev` starts local development; `npm run preview` builds and previews the
Worker locally. Existing untracked project materials must not be included in a
release unless explicitly intended.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
