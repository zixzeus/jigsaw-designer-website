import {spawn} from "node:child_process";
import {readdir, stat} from "node:fs/promises";
import {createServer} from "node:net";
import path from "node:path";
import {setTimeout as delay} from "node:timers/promises";
import {fileURLToPath} from "node:url";

import {loadTsModule} from "./lib/load-ts-module.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seoConfigPath = path.join(root, "src/config/seo.ts");
const productConfigPath = path.join(root, "src/config/product.ts");
const [seoConfig, productConfig] = await Promise.all([
  loadTsModule(seoConfigPath),
  loadTsModule(productConfigPath),
]);
const {
  DEFAULT_LOCALE,
  LOCALE_SPECS,
  SEO_ROUTES,
  SITE_LOCALES,
} = seoConfig;
const {PRODUCT_FACTS} = productConfig;

const productionOrigin = PRODUCT_FACTS.websiteOrigin.replace(/\/+$/, "");
const suppliedBaseUrl = process.env.SITE_URL?.replace(/\/+$/, "");
let localBaseUrl = suppliedBaseUrl;
const errors = [];
const pageCache = new Map();
let server;
let serverExitPromise;
let serverExited = false;
let serverExitDescription = "";
let serverOutput = "";
let verifiedSitemapCount = 0;
let verifiedInternalLinkCount = 0;
let verifiedMediaCount = 0;
let verificationAborted = false;

function record(condition, message) {
  if (!condition) errors.push(message);
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number.parseInt(value, 10)))
    .replaceAll("&amp;", "&");
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(['\"])(.*?)\\1`, "i"));
  return match ? decodeHtml(match[2]) : undefined;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function metadataTags(html, attributeName, attributeValue) {
  return tags(html, "meta").filter(
    (candidate) =>
      attribute(candidate, attributeName)?.toLowerCase() ===
      attributeValue.toLowerCase(),
  );
}

function metadataContent(html, attributeName, attributeValue) {
  const tag = metadataTags(html, attributeName, attributeValue)[0];
  return tag ? attribute(tag, "content") : undefined;
}

function linkMetadata(html, rel) {
  return tags(html, "link").filter((tag) =>
    (attribute(tag, "rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .includes(rel.toLowerCase()),
  );
}

function normalizePathname(value) {
  const pathname = new URL(value, productionOrigin).pathname;
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function localizedPathname(locale, pathname) {
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function localizedAbsoluteUrl(locale, pathname) {
  return `${productionOrigin}${localizedPathname(locale, pathname)}`;
}

function parseJsonLd(html, label) {
  const values = [];
  const expression = /<script\b[^>]*type=(['"])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(expression)) {
    try {
      values.push(JSON.parse(match[2]));
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD (${error.message})`);
    }
  }
  return values;
}

function walkJson(value, callback) {
  if (Array.isArray(value)) {
    value.forEach((item) => walkJson(item, callback));
    return;
  }
  if (!value || typeof value !== "object") return;
  callback(value);
  Object.values(value).forEach((item) => walkJson(item, callback));
}

function jsonLdNodesByType(values, type) {
  const matches = [];
  walkJson(values, (value) => {
    const candidate = value["@type"];
    if (candidate === type || (Array.isArray(candidate) && candidate.includes(type))) {
      matches.push(value);
    }
  });
  return matches;
}

function hasJsonLdType(values, type) {
  return jsonLdNodesByType(values, type).length > 0;
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

function visibleFaqEntries(html) {
  const entries = [];
  for (const match of html.matchAll(/<details\b[^>]*\bdata-faq-item=["']true["'][^>]*>([\s\S]*?)<\/details>/gi)) {
    const block = match[1];
    const summary = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!summary) continue;
    entries.push({
      question: visibleText(summary[1]),
      answer: visibleText(block.replace(summary[0], " ")),
    });
  }
  return entries;
}

function imageDimensions(buffer) {
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 8 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      if (length < 2) break;
      offset += length + 2;
    }
  }

  if (
    buffer.length >= 24 &&
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return {width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20)};
  }

  if (
    buffer.length >= 30 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return {
        width: buffer.readUIntLE(24, 3) + 1,
        height: buffer.readUIntLE(27, 3) + 1,
      };
    }
    if (chunk === "VP8 " && buffer.length >= 30) {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
      const bits = buffer.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }
  }

  return undefined;
}

function cacheDirectives(value = "") {
  const directives = new Map();
  for (const item of value.split(",")) {
    const [rawName, ...rawValue] = item.trim().split("=");
    if (!rawName) continue;
    directives.set(
      rawName.toLowerCase(),
      rawValue.length ? rawValue.join("=").replace(/^['"]|['"]$/g, "") : true,
    );
  }
  return directives;
}

function positiveCacheLifetime(directives, name) {
  const value = directives.get(name);
  return typeof value === "string" && Number(value) > 0;
}

function assertCacheableHtml(response, label) {
  const value = response.headers.get("cache-control") ?? "";
  const directives = cacheDirectives(value);
  const prohibited = ["private", "no-store", "no-cache"].filter((item) =>
    directives.has(item),
  );
  const sharedLifetime = positiveCacheLifetime(directives, "s-maxage");
  const publicBrowserLifetime =
    directives.has("public") && positiveCacheLifetime(directives, "max-age");
  record(
    prohibited.length === 0,
    `${label}: uncacheable HTML directive(s) ${prohibited.join(", ")} (${value || "missing"})`,
  );
  record(
    sharedLifetime || publicBrowserLifetime,
    `${label}: expected a positive s-maxage or public positive max-age (${value || "missing"})`,
  );
}

function assertSecurityHeaders(response, label) {
  const hsts = response.headers.get("strict-transport-security") ?? "";
  const hstsMaxAge = Number(hsts.match(/(?:^|;)\s*max-age=(\d+)/i)?.[1] ?? 0);
  record(hstsMaxAge >= 31_536_000, `${label}: HSTS max-age must be at least one year (${hsts || "missing"})`);
  record(
    response.headers.get("x-content-type-options")?.toLowerCase() === "nosniff",
    `${label}: X-Content-Type-Options must be nosniff`,
  );
  record(
    response.headers.get("x-frame-options")?.toUpperCase() === "DENY",
    `${label}: X-Frame-Options must be DENY`,
  );
  record(
    response.headers.get("referrer-policy")?.toLowerCase() === "strict-origin-when-cross-origin",
    `${label}: Referrer-Policy must be strict-origin-when-cross-origin`,
  );

  const permissions = response.headers.get("permissions-policy") ?? "";
  for (const directive of ["camera=()", "microphone=()", "geolocation=()", "browsing-topics=()"] ) {
    record(permissions.includes(directive), `${label}: Permissions-Policy is missing ${directive}`);
  }

  const reportOnly = response.headers.get("content-security-policy-report-only") ?? "";
  for (const directive of ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "base-uri 'self'"]) {
    record(reportOnly.includes(directive), `${label}: CSP Report-Only is missing ${directive}`);
  }
  record(
    !response.headers.has("content-security-policy"),
    `${label}: CSP must remain Report-Only until production reports are reviewed`,
  );
  record(!response.headers.has("x-powered-by"), `${label}: X-Powered-By must be disabled`);
}

function mapFromAlternateTags(alternateTags, label) {
  const result = new Map();
  for (const tag of alternateTags) {
    const language = attribute(tag, "hreflang");
    const href = attribute(tag, "href");
    record(Boolean(language), `${label}: alternate link is missing hreflang`);
    record(Boolean(href), `${label}: alternate link is missing href`);
    if (!language || !href) continue;
    record(!result.has(language), `${label}: duplicate hreflang ${language}`);
    if (!result.has(language)) result.set(language, href);
  }
  return result;
}

function assertExactMap(actual, expected, label) {
  for (const [key, expectedValue] of expected) {
    record(actual.has(key), `${label}: missing ${key}`);
    if (actual.has(key)) {
      record(actual.get(key) === expectedValue, `${label}: ${key} expected ${expectedValue}, got ${actual.get(key)}`);
    }
  }
  for (const key of actual.keys()) {
    record(expected.has(key), `${label}: unexpected ${key}`);
  }
}

function expectedAlternates(route) {
  return new Map([
    ...route.locales.map((locale) => [
      LOCALE_SPECS[locale].hreflang,
      localizedAbsoluteUrl(locale, route.pathname),
    ]),
    ["x-default", localizedAbsoluteUrl(DEFAULT_LOCALE, route.pathname)],
  ]);
}

function expectedSitemapEntries() {
  const entries = new Map();
  const seenRoutes = new Set();
  for (const route of SEO_ROUTES) {
    record(route.pathname === normalizePathname(route.pathname), `SEO_ROUTES: non-normalized pathname ${route.pathname}`);
    record(!seenRoutes.has(route.pathname), `SEO_ROUTES: duplicate pathname ${route.pathname}`);
    seenRoutes.add(route.pathname);
    record(!route.includeInSitemap || route.indexable, `SEO_ROUTES: non-indexable route is in sitemap: ${route.pathname}`);
    record(new Set(route.locales).size === route.locales.length, `SEO_ROUTES: duplicate locale on ${route.pathname}`);
    for (const locale of route.locales) {
      record(SITE_LOCALES.includes(locale), `SEO_ROUTES: unknown locale ${locale} on ${route.pathname}`);
      record(Boolean(LOCALE_SPECS[locale]), `SEO_ROUTES: missing LocaleSpec for ${locale}`);
    }
    if (!route.indexable || !route.includeInSitemap) continue;
    const alternates = expectedAlternates(route);
    for (const locale of route.locales) {
      const url = localizedAbsoluteUrl(locale, route.pathname);
      record(!entries.has(url), `SEO_ROUTES: duplicate sitemap URL ${url}`);
      entries.set(url, {url, locale, route, alternates});
    }
  }
  return entries;
}

function parseSitemap(sitemap) {
  const parsed = new Map();
  const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => match[1]);
  for (const [index, block] of blocks.entries()) {
    const label = `/sitemap.xml url[${index}]`;
    const locs = [...block.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
    record(locs.length === 1, `${label}: expected exactly one loc, found ${locs.length}`);
    if (locs.length !== 1) continue;
    const url = locs[0];
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      record(false, `${label}: invalid URL ${url}`);
      continue;
    }
    record(parsedUrl.origin === productionOrigin, `${label}: URL must use ${productionOrigin}, got ${url}`);
    record(!parsedUrl.search && !parsedUrl.hash, `${label}: loc must not contain query or fragment: ${url}`);
    record(!parsed.has(url), `${label}: duplicate loc ${url}`);
    const alternateTags = tags(block, "xhtml:link").filter(
      (tag) => attribute(tag, "rel")?.toLowerCase() === "alternate",
    );
    const alternates = mapFromAlternateTags(alternateTags, `${label} alternates`);
    const changeFrequency = block.match(/<changefreq>([\s\S]*?)<\/changefreq>/i)?.[1]?.trim();
    const priorityText = block.match(/<priority>([\s\S]*?)<\/priority>/i)?.[1]?.trim();
    const priority = priorityText === undefined ? undefined : Number(priorityText);
    if (!parsed.has(url)) parsed.set(url, {url, alternates, changeFrequency, priority});
  }
  return parsed;
}

function robotsTokens(value) {
  return new Set(
    value
      .toLowerCase()
      .split(/[;,]/)
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function assertIndexableRobots(html, label) {
  const robotsTags = metadataTags(html, "name", "robots");
  const googlebotTags = metadataTags(html, "name", "googlebot");
  record(robotsTags.length === 1, `${label}: expected exactly one robots meta, found ${robotsTags.length}`);
  record(googlebotTags.length === 1, `${label}: expected exactly one googlebot meta, found ${googlebotTags.length}`);
  for (const [name, candidates] of [["robots", robotsTags], ["googlebot", googlebotTags]]) {
    const tokens = robotsTokens(candidates[0] ? attribute(candidates[0], "content") ?? "" : "");
    record(!tokens.has("noindex") && !tokens.has("none"), `${label}: ${name} unexpectedly blocks indexing`);
    record(!tokens.has("nofollow") && !tokens.has("none"), `${label}: ${name} unexpectedly blocks following`);
  }
}

function assertNoIndexFollow(html, label) {
  for (const name of ["robots", "googlebot"]) {
    const candidates = metadataTags(html, "name", name);
    record(candidates.length === 1, `${label}: expected exactly one ${name} meta, found ${candidates.length}`);
    const tokens = robotsTokens(candidates[0] ? attribute(candidates[0], "content") ?? "" : "");
    record(tokens.has("noindex"), `${label}: ${name} must include noindex`);
    record(tokens.has("follow"), `${label}: ${name} must include follow`);
    record(!tokens.has("index") && !tokens.has("nofollow") && !tokens.has("none"), `${label}: ${name} has a conflicting directive`);
  }
}

function assertGoogleAnalytics(html, label) {
  const scriptBlocks = [...html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)];
  const loaders = scriptBlocks.filter(
    ([, openingTag]) =>
      attribute(openingTag, "src") ===
      "https://www.googletagmanager.com/gtag/js?id=G-3TZD2EK8YR",
  );
  const configs = scriptBlocks.filter(
    ([, openingTag, body]) =>
      attribute(openingTag, "id") === "google-analytics" &&
      /gtag\('config',\s*'G-3TZD2EK8YR'\)/.test(body),
  );
  record(loaders.length === 1, `${label}: expected one GA4 loader, found ${loaders.length}`);
  record(configs.length === 1, `${label}: expected one GA4 config, found ${configs.length}`);
  record(!html.includes("gtag('consent'"), `${label}: obsolete GA4 consent mode is still present`);
  record(!html.includes("analytics-consent-settings"), `${label}: obsolete analytics consent UI is still present`);
}

function assertFaqParity(page, jsonLd) {
  const faqPages = jsonLdNodesByType(jsonLd, "FAQPage");
  const visibleEntries = visibleFaqEntries(page.html);
  if (!faqPages.length && !visibleEntries.length) return;
  record(faqPages.length === 1, `${page.pathname}: expected one FAQPage, found ${faqPages.length}`);
  const schemaEntries = [];
  for (const faqPage of faqPages) {
    const entities = Array.isArray(faqPage.mainEntity)
      ? faqPage.mainEntity
      : faqPage.mainEntity
        ? [faqPage.mainEntity]
        : [];
    record(entities.length > 0, `${page.pathname}: FAQPage mainEntity must not be empty`);
    for (const entity of entities) {
      record(entity?.["@type"] === "Question", `${page.pathname}: FAQ entity must be a Question`);
      const question = visibleText(String(entity?.name ?? ""));
      const answerNode = entity?.acceptedAnswer;
      record(answerNode?.["@type"] === "Answer", `${page.pathname}: FAQ question must have an Answer`);
      const answer = visibleText(String(answerNode?.text ?? ""));
      record(Boolean(question), `${page.pathname}: FAQ question text is empty`);
      record(Boolean(answer), `${page.pathname}: FAQ answer text is empty`);
      schemaEntries.push({question, answer});
    }
  }

  const toCounts = (entries) => {
    const counts = new Map();
    for (const entry of entries) {
      const key = `${entry.question}\u0000${entry.answer}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  };
  const schemaCounts = toCounts(schemaEntries);
  const visibleCounts = toCounts(visibleEntries);
  record(schemaEntries.length === visibleEntries.length, `${page.pathname}: FAQ schema has ${schemaEntries.length} entries but ${visibleEntries.length} are visible`);
  assertExactMap(schemaCounts, visibleCounts, `${page.pathname} FAQ schema/visible parity`);
}

function assertStructuredData(page, entry) {
  const {jsonLd, pathname} = page;
  record(jsonLd.length > 0, `${pathname}: JSON-LD is missing`);
  record(!hasJsonLdType(jsonLd, "Offer"), `${pathname}: fixed Offer schema is forbidden`);
  record(!hasJsonLdType(jsonLd, "AggregateRating"), `${pathname}: unverified AggregateRating schema is forbidden`);

  if (entry.route.pathname === "/") {
    for (const type of ["Organization", "WebSite", "SoftwareApplication", "FAQPage"]) {
      record(hasJsonLdType(jsonLd, type), `${pathname}: missing ${type} JSON-LD`);
    }
    for (const application of jsonLdNodesByType(jsonLd, "SoftwareApplication")) {
      record(application.softwareVersion === PRODUCT_FACTS.currentVersion, `${pathname}: SoftwareApplication version is not ${PRODUCT_FACTS.currentVersion}`);
      record(application.downloadUrl === PRODUCT_FACTS.appStoreUrl, `${pathname}: SoftwareApplication downloadUrl is wrong`);
    }
  } else {
    const breadcrumbs = jsonLdNodesByType(jsonLd, "BreadcrumbList");
    record(breadcrumbs.length === 1, `${pathname}: expected one BreadcrumbList, found ${breadcrumbs.length}`);
    for (const breadcrumb of breadcrumbs) {
      const items = Array.isArray(breadcrumb.itemListElement) ? breadcrumb.itemListElement : [];
      record(items.length >= 2, `${pathname}: BreadcrumbList must contain at least two items`);
      items.forEach((item, index) => {
        record(item?.["@type"] === "ListItem", `${pathname}: breadcrumb ${index + 1} is not a ListItem`);
        record(item?.position === index + 1, `${pathname}: breadcrumb positions are not sequential`);
        record(typeof item?.name === "string" && item.name.trim().length > 0, `${pathname}: breadcrumb ${index + 1} has no name`);
        record(typeof item?.item === "string" && item.item.startsWith(`${productionOrigin}/`), `${pathname}: breadcrumb ${index + 1} has a non-canonical item URL`);
      });
      record(items.at(-1)?.item === page.canonical, `${pathname}: final breadcrumb does not match canonical`);
    }
  }

  if (entry.route.kind === "marketing" && entry.route.pathname !== "/pricing") {
    record(hasJsonLdType(jsonLd, "Article"), `${pathname}: marketing page is missing Article JSON-LD`);
  }
  if (entry.route.pathname.startsWith("/help/") || entry.route.kind === "release") {
    record(hasJsonLdType(jsonLd, "TechArticle"), `${pathname}: documentation page is missing TechArticle JSON-LD`);
  }
  if (entry.route.kind === "guide" && !entry.route.pathname.startsWith("/help/")) {
    const howTos = jsonLdNodesByType(jsonLd, "HowTo");
    record(howTos.length === 1, `${pathname}: expected one HowTo, found ${howTos.length}`);
    for (const howTo of howTos) {
      const steps = Array.isArray(howTo.step) ? howTo.step : [];
      record(steps.length > 0, `${pathname}: HowTo steps must not be empty`);
      steps.forEach((step, index) => {
        record(step?.["@type"] === "HowToStep", `${pathname}: HowTo step ${index + 1} has the wrong type`);
        record(Boolean(step?.name) && Boolean(step?.text), `${pathname}: HowTo step ${index + 1} is incomplete`);
      });
    }
  }
  if (entry.route.pathname === "/support") {
    record(hasJsonLdType(jsonLd, "FAQPage"), `${pathname}: Support is missing FAQPage JSON-LD`);
  }
  assertFaqParity(page, jsonLd);
}

function addMediaUrl(resources, rawUrl, kind, sourceLabel, declaredDimensions) {
  if (!rawUrl || rawUrl.startsWith("data:") || rawUrl.startsWith("blob:")) return;
  let url;
  try {
    url = new URL(rawUrl, productionOrigin);
  } catch {
    record(false, `${sourceLabel}: invalid media URL ${rawUrl}`);
    return;
  }
  if (url.origin !== productionOrigin) return;
  const localPath = `${url.pathname}${url.search}`;
  const existing = resources.get(localPath);
  if (existing && existing.kind !== kind) {
    record(false, `${sourceLabel}: media ${localPath} is used as both ${existing.kind} and ${kind}`);
  }
  if (existing) {
    existing.usages.push({sourceLabel, declaredDimensions});
  } else {
    resources.set(localPath, {
      kind,
      usages: [{sourceLabel, declaredDimensions}],
    });
  }
}

function addSrcSet(resources, value, kind, sourceLabel) {
  for (const candidate of (value ?? "").split(",")) {
    const url = candidate.trim().split(/\s+/, 1)[0];
    if (url) addMediaUrl(resources, url, kind, sourceLabel);
  }
}

function collectMediaResources(pages) {
  const resources = new Map();
  for (const page of pages) {
    for (const tag of tags(page.html, "img")) {
      const width = Number(attribute(tag, "width"));
      const height = Number(attribute(tag, "height"));
      const declaredDimensions = width > 0 && height > 0 ? {width, height} : undefined;
      addMediaUrl(resources, attribute(tag, "src"), "image", page.pathname, declaredDimensions);
      addSrcSet(resources, attribute(tag, "srcset"), "image", page.pathname);
    }
    for (const tag of tags(page.html, "source")) {
      addMediaUrl(resources, attribute(tag, "src"), "media", page.pathname);
      addSrcSet(resources, attribute(tag, "srcset"), "media", page.pathname);
    }
    for (const tag of tags(page.html, "video")) {
      addMediaUrl(resources, attribute(tag, "poster"), "image", page.pathname);
      addMediaUrl(resources, attribute(tag, "src"), "media", page.pathname);
    }
    addMediaUrl(resources, page.ogImage, "image", `${page.pathname} Open Graph`);
    addMediaUrl(resources, page.twitterImage, "image", `${page.pathname} Twitter`);
  }
  return resources;
}

async function fetchLocal(pathname, options = {}) {
  const response = await fetch(new URL(pathname, localBaseUrl), {
    signal: AbortSignal.timeout(20_000),
    ...options,
  });
  return response;
}

async function fetchPage(pathname) {
  const normalized = normalizePathname(pathname);
  if (!pageCache.has(normalized)) {
    pageCache.set(
      normalized,
      (async () => {
        const response = await fetchLocal(normalized, {redirect: "manual"});
        return {
          response,
          html: await response.text(),
          pathname: normalized,
        };
      })(),
    );
  }
  return pageCache.get(normalized);
}

async function runInBatches(items, size, callback) {
  for (let index = 0; index < items.length; index += size) {
    await Promise.all(items.slice(index, index + size).map(callback));
  }
}

async function findAvailablePort() {
  const socket = createServer();
  await new Promise((resolve, reject) => {
    socket.once("error", reject);
    socket.listen(0, "127.0.0.1", resolve);
  });
  const address = socket.address();
  const port = typeof address === "object" && address ? address.port : undefined;
  await new Promise((resolve, reject) => socket.close((error) => (error ? reject(error) : resolve())));
  if (!port) throw new Error("Could not allocate a local port for Next.js");
  return port;
}

async function newestMtime(pathname) {
  const info = await stat(pathname);
  if (!info.isDirectory()) return info.mtimeMs;
  const entries = await readdir(pathname, {withFileTypes: true});
  const mtimes = await Promise.all(
    entries.map((entry) => newestMtime(path.join(pathname, entry.name))),
  );
  return Math.max(info.mtimeMs, ...mtimes);
}

async function assertFreshLocalBuild() {
  const buildMarker = path.join(root, ".next/BUILD_ID");
  let buildMtime;
  try {
    buildMtime = (await stat(buildMarker)).mtimeMs;
  } catch {
    throw new Error("The local production build is missing. Run `npm run build` before `npm run check:site`.");
  }

  const buildInputs = [
    "src",
    "public",
    "next.config.ts",
    "package.json",
    "package-lock.json",
    "postcss.config.mjs",
    "tsconfig.json",
  ].map((pathname) => path.join(root, pathname));
  const latestInputMtime = Math.max(...(await Promise.all(buildInputs.map(newestMtime))));
  if (latestInputMtime > buildMtime) {
    throw new Error("The local production build is older than its source inputs. Run `npm run build` before `npm run check:site`.");
  }
}

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (serverExited) {
      throw new Error(`Next.js exited before becoming ready (${serverExitDescription}).\n${serverOutput}`);
    }
    try {
      const response = await fetchLocal("/en", {redirect: "manual"});
      if (response.status === 200) return;
    } catch {
      // The process is still starting.
    }
    await delay(300);
  }
  throw new Error(`Timed out waiting for Next.js.\n${serverOutput}`);
}

async function startServer() {
  const port = await findAvailablePort();
  localBaseUrl = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"],
    {cwd: root, env: {...process.env, NODE_ENV: "production"}},
  );
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  serverExitPromise = new Promise((resolve) => {
    server.once("error", (error) => {
      serverExited = true;
      serverExitDescription = error.message;
      resolve();
    });
    server.once("exit", (code, signal) => {
      serverExited = true;
      serverExitDescription = signal ? `signal ${signal}` : `exit code ${code}`;
      resolve();
    });
  });
  await waitForServer();
}

async function stopServer() {
  if (!server || !serverExitPromise || serverExited) {
    if (serverExitPromise) await serverExitPromise;
    return;
  }
  server.kill("SIGTERM");
  await Promise.race([serverExitPromise, delay(5_000)]);
  if (!serverExited) {
    server.kill("SIGKILL");
    await Promise.race([serverExitPromise, delay(5_000)]);
  }
}

const expectedEntries = expectedSitemapEntries();

try {
  if (!suppliedBaseUrl) {
    await assertFreshLocalBuild();
    await startServer();
  }

  for (const [pathname, expectedStatus, expectedLocation] of [
    ["/", 308, "/en"],
    ["/zh/help?source=test", 301, "/zh-Hans/help?source=test"],
    ["/pt/support?source=test", 301, "/pt-BR/support?source=test"],
  ]) {
    const response = await fetchLocal(pathname, {redirect: "manual"});
    record(response.status === expectedStatus, `${pathname}: expected ${expectedStatus}, got ${response.status}`);
    const location = response.headers.get("location");
    const resolved = location ? new URL(location, localBaseUrl) : undefined;
    record(
      resolved && `${resolved.pathname}${resolved.search}` === expectedLocation,
      `${pathname}: expected redirect to ${expectedLocation}, got ${location}`,
    );
  }

  const robotsResponse = await fetchLocal("/robots.txt", {redirect: "manual"});
  const robots = await robotsResponse.text();
  record(robotsResponse.status === 200, `/robots.txt: expected 200, got ${robotsResponse.status}`);
  record(robotsResponse.headers.get("content-type")?.includes("text/plain"), "/robots.txt: wrong MIME type");
  record(robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`), "/robots.txt: missing canonical sitemap URL");
  record(robots.includes(`Host: ${productionOrigin}`), "/robots.txt: missing canonical host");
  const robotsCache = cacheDirectives(robotsResponse.headers.get("cache-control") ?? "");
  record(robotsCache.has("public") && positiveCacheLifetime(robotsCache, "max-age"), "/robots.txt: public cache lifetime is missing");

  const sitemapResponse = await fetchLocal("/sitemap.xml", {redirect: "manual"});
  const sitemap = await sitemapResponse.text();
  record(sitemapResponse.status === 200, `/sitemap.xml: expected 200, got ${sitemapResponse.status}`);
  record(sitemapResponse.headers.get("content-type")?.includes("xml"), "/sitemap.xml: wrong MIME type");
  const sitemapCache = cacheDirectives(sitemapResponse.headers.get("cache-control") ?? "");
  record(sitemapCache.has("public") && positiveCacheLifetime(sitemapCache, "max-age"), "/sitemap.xml: public cache lifetime is missing");

  const actualEntries = parseSitemap(sitemap);
  verifiedSitemapCount = actualEntries.size;
  record(actualEntries.size === expectedEntries.size, `/sitemap.xml: expected ${expectedEntries.size} URLs, found ${actualEntries.size}`);
  for (const [url, expected] of expectedEntries) {
    const actual = actualEntries.get(url);
    record(Boolean(actual), `/sitemap.xml: missing ${url}`);
    if (actual) {
      assertExactMap(actual.alternates, expected.alternates, `${url} sitemap hreflang`);
      record(actual.changeFrequency === expected.route.changeFrequency, `${url}: sitemap changefreq expected ${expected.route.changeFrequency}, got ${actual.changeFrequency}`);
      record(actual.priority === expected.route.priority, `${url}: sitemap priority expected ${expected.route.priority}, got ${actual.priority}`);
    }
  }
  for (const url of actualEntries.keys()) {
    record(expectedEntries.has(url), `/sitemap.xml: unexpected URL ${url}`);
  }

  await runInBatches([...expectedEntries.values()], 12, async (entry) => {
    const expectedPath = new URL(entry.url).pathname;
    const page = await fetchPage(expectedPath);
    const {response, html} = page;
    record(response.status === 200, `${expectedPath}: sitemap URL returned ${response.status}`);
    record(!response.headers.has("location"), `${expectedPath}: sitemap URL unexpectedly redirects`);
    assertCacheableHtml(response, expectedPath);
    assertSecurityHeaders(response, expectedPath);

    const htmlTags = tags(html, "html");
    record(htmlTags.length === 1, `${expectedPath}: expected one html element, found ${htmlTags.length}`);
    record(attribute(htmlTags[0] ?? "", "lang") === LOCALE_SPECS[entry.locale].htmlLang, `${expectedPath}: wrong html lang`);
    record(attribute(htmlTags[0] ?? "", "dir") === LOCALE_SPECS[entry.locale].direction, `${expectedPath}: wrong text direction`);

    const titleMatches = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
    const title = decodeHtml(titleMatches[0]?.[1] ?? "").trim();
    const descriptionTags = metadataTags(html, "name", "description");
    const description = descriptionTags[0] ? attribute(descriptionTags[0], "content")?.trim() : undefined;
    const canonicalTags = linkMetadata(html, "canonical");
    const canonical = canonicalTags[0] ? attribute(canonicalTags[0], "href") : undefined;
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    const ogUrl = metadataContent(html, "property", "og:url");
    const ogTitle = metadataContent(html, "property", "og:title");
    const ogImage = metadataContent(html, "property", "og:image");
    const twitterImage = metadataContent(html, "name", "twitter:image");

    record(titleMatches.length === 1 && Boolean(title), `${expectedPath}: expected exactly one non-empty title`);
    record([...title].length <= 75, `${expectedPath}: title is too long (${[...title].length} characters)`);
    const brandOccurrences = title.toLowerCase().split(PRODUCT_FACTS.name.toLowerCase()).length - 1;
    record(brandOccurrences <= 1, `${expectedPath}: title repeats the product name (${title})`);
    record(descriptionTags.length === 1 && Boolean(description), `${expectedPath}: expected exactly one non-empty description`);
    record([...description ?? ""].length <= 180, `${expectedPath}: description is too long (${[...description ?? ""].length} characters)`);
    record(h1Count === 1, `${expectedPath}: expected one H1, found ${h1Count}`);
    record(canonicalTags.length === 1, `${expectedPath}: expected one canonical, found ${canonicalTags.length}`);
    record(canonical === entry.url, `${expectedPath}: canonical ${canonical} does not equal ${entry.url}`);
    assertIndexableRobots(html, expectedPath);
    record(metadataTags(html, "name", "keywords").length === 0, `${expectedPath}: meta keywords must be absent`);

    record(ogUrl === entry.url, `${expectedPath}: og:url does not match canonical`);
    record(
      title === ogTitle || title === `${ogTitle} | ${PRODUCT_FACTS.name}`,
      `${expectedPath}: OG title is not consistent with the document title`,
    );
    record(metadataContent(html, "property", "og:description") === description, `${expectedPath}: OG description does not match description`);
    record(ogImage === `${productionOrigin}${PRODUCT_FACTS.defaultSocialImage}`, `${expectedPath}: wrong OG image ${ogImage}`);
    record(metadataContent(html, "property", "og:image:width") === "1200", `${expectedPath}: OG image width is missing`);
    record(metadataContent(html, "property", "og:image:height") === "630", `${expectedPath}: OG image height is missing`);
    record(metadataContent(html, "property", "og:image:alt") === ogTitle, `${expectedPath}: OG image alt does not match OG title`);
    record(metadataContent(html, "name", "twitter:card") === "summary_large_image", `${expectedPath}: Twitter card is missing`);
    record(metadataContent(html, "name", "twitter:title") === ogTitle, `${expectedPath}: Twitter title does not match OG title`);
    record(metadataContent(html, "name", "twitter:description") === description, `${expectedPath}: Twitter description does not match description`);
    record(twitterImage === ogImage, `${expectedPath}: Twitter and OG images differ`);
    assertGoogleAnalytics(html, expectedPath);

    const alternateTags = linkMetadata(html, "alternate").filter((tag) => attribute(tag, "hreflang"));
    const alternates = mapFromAlternateTags(alternateTags, `${expectedPath} HTML hreflang`);
    assertExactMap(alternates, entry.alternates, `${expectedPath} HTML hreflang`);

    const jsonLd = parseJsonLd(html, expectedPath);
    Object.assign(page, {
      title,
      description,
      canonical,
      alternateMap: alternates,
      jsonLd,
      ogImage,
      twitterImage,
    });
    assertStructuredData(page, entry);
  });

  const pages = await Promise.all([...pageCache.values()]);
  for (const field of ["title", "description"]) {
    const byLocale = new Map();
    for (const page of pages) {
      const locale = page.pathname.split("/")[1];
      const localeValues = byLocale.get(locale) ?? new Map();
      const duplicates = localeValues.get(page[field]) ?? [];
      duplicates.push(page.pathname);
      localeValues.set(page[field], duplicates);
      byLocale.set(locale, localeValues);
    }
    for (const [locale, values] of byLocale) {
      for (const [value, paths] of values) {
        record(Boolean(value) && paths.length === 1, `${locale}: duplicate or empty ${field}: ${paths.join(", ")}`);
      }
    }
  }

  const localLinks = new Set();
  const graph = new Map();
  for (const page of pages) {
    const links = new Set();
    for (const tag of tags(page.html, "a")) {
      const href = attribute(tag, "href");
      if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
      const url = new URL(href, productionOrigin);
      if (url.origin !== productionOrigin) continue;
      const pathname = normalizePathname(url.pathname);
      localLinks.add(pathname);
      if (pathname.split("/")[1] === page.pathname.split("/")[1]) links.add(pathname);
    }
    graph.set(page.pathname, links);
  }

  await runInBatches([...localLinks], 12, async (pathname) => {
    const response = await fetchLocal(pathname, {redirect: "manual"});
    record(response.status === 200, `Internal link ${pathname} must return direct 200, got ${response.status}`);
  });
  verifiedInternalLinkCount = localLinks.size;

  for (const locale of new Set(pages.map((page) => page.pathname.split("/")[1]))) {
    const home = `/${locale}`;
    const distance = new Map([[home, 0]]);
    const queue = [home];
    while (queue.length) {
      const current = queue.shift();
      const nextDistance = distance.get(current) + 1;
      for (const next of graph.get(current) ?? []) {
        if (!distance.has(next)) {
          distance.set(next, nextDistance);
          queue.push(next);
        }
      }
    }
    for (const page of pages.filter((candidate) => candidate.pathname.split("/")[1] === locale)) {
      record(
        distance.has(page.pathname) && distance.get(page.pathname) <= 3,
        `${page.pathname}: not reachable from ${home} within three clicks`,
      );
    }
  }

  const legalRoutes = SEO_ROUTES.filter((route) => route.kind === "legal");
  for (const route of legalRoutes) {
    for (const locale of route.locales) {
      const pathname = localizedPathname(locale, route.pathname);
      const {response, html} = await fetchPage(pathname);
      const expectedCanonical = localizedAbsoluteUrl(locale, route.pathname);
      const canonicalTags = linkMetadata(html, "canonical");
      const canonical = canonicalTags[0] ? attribute(canonicalTags[0], "href") : undefined;
      record(response.status === 200, `${pathname}: legal page returned ${response.status}`);
      record(canonicalTags.length === 1, `${pathname}: expected exactly one canonical`);
      record(canonical === expectedCanonical, `${pathname}: legal canonical is not self-referencing`);
      assertNoIndexFollow(html, pathname);
      assertGoogleAnalytics(html, pathname);
      record(linkMetadata(html, "alternate").filter((tag) => attribute(tag, "hreflang")).length === 0, `${pathname}: noindex legal page must not emit hreflang`);
      record((html.match(/<h1\b/gi) ?? []).length === 1, `${pathname}: expected one H1`);
      const jsonLd = parseJsonLd(html, pathname);
      record(hasJsonLdType(jsonLd, "BreadcrumbList"), `${pathname}: legal page is missing BreadcrumbList`);
      record(!hasJsonLdType(jsonLd, "Offer") && !hasJsonLdType(jsonLd, "AggregateRating"), `${pathname}: legal page has forbidden commercial schema`);
    }
  }

  const unavailablePaths = [];
  for (const route of SEO_ROUTES) {
    for (const locale of SITE_LOCALES) {
      if (!route.locales.includes(locale)) {
        unavailablePaths.push(localizedPathname(locale, route.pathname));
      }
    }
  }
  await runInBatches(unavailablePaths, 20, async (pathname) => {
    const response = await fetchLocal(pathname, {redirect: "manual"});
    record(response.status === 404, `${pathname}: unavailable translation must return 404, got ${response.status}`);
  });

  const mediaResources = collectMediaResources(pages);
  await runInBatches([...mediaResources], 12, async ([resource, usage]) => {
    const response = await fetchLocal(resource, {redirect: "manual"});
    const contentType = response.headers.get("content-type") ?? "";
    const sourceLabels = [...new Set(usage.usages.map((item) => item.sourceLabel))].join(", ");
    record(response.status === 200, `${sourceLabels}: media ${resource} returned ${response.status}`);
    if (usage.kind === "image") {
      record(contentType.toLowerCase().startsWith("image/"), `${sourceLabels}: ${resource} has wrong MIME ${contentType || "missing"}`);
    } else {
      record(/^(?:image|video|audio)\//i.test(contentType), `${sourceLabels}: ${resource} has wrong media MIME ${contentType || "missing"}`);
    }
    if (usage.kind === "image" && response.status === 200) {
      const buffer = Buffer.from(await response.arrayBuffer());
      const intrinsic = imageDimensions(buffer);
      if (intrinsic) {
        for (const declared of usage.usages) {
          if (!declared.declaredDimensions) continue;
          record(
            declared.declaredDimensions.width === intrinsic.width &&
              declared.declaredDimensions.height === intrinsic.height,
            `${declared.sourceLabel}: ${resource} declares ${declared.declaredDimensions.width}x${declared.declaredDimensions.height} but the asset is ${intrinsic.width}x${intrinsic.height}`,
          );
        }
      }
    }
    if (/-v\d|v1-6/i.test(new URL(resource, productionOrigin).pathname)) {
      const directives = cacheDirectives(response.headers.get("cache-control") ?? "");
      record(
        positiveCacheLifetime(directives, "max-age") && Number(directives.get("max-age")) >= 31_536_000 && directives.has("immutable"),
        `${resource}: versioned media must have a one-year immutable cache policy`,
      );
    }
  });
  verifiedMediaCount = mediaResources.size;

  const socialPath = PRODUCT_FACTS.defaultSocialImage;
  const socialResponse = await fetchLocal(socialPath, {redirect: "manual"});
  const socialBuffer = Buffer.from(await socialResponse.arrayBuffer());
  const dimensions = imageDimensions(socialBuffer);
  record(socialResponse.status === 200, `${socialPath}: expected 200, got ${socialResponse.status}`);
  record(socialResponse.headers.get("content-type")?.startsWith("image/"), `${socialPath}: wrong MIME type`);
  record(dimensions?.width === 1200 && dimensions?.height === 630, `${socialPath}: expected 1200x630, got ${dimensions?.width ?? "?"}x${dimensions?.height ?? "?"}`);
} catch (error) {
  verificationAborted = true;
  errors.push(`Verification aborted: ${error.stack ?? error.message}`);
} finally {
  await stopServer();
}

if (errors.length) {
  console.error(`Built-site verification failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  if (verificationAborted && serverOutput) console.error(`\nNext.js output:\n${serverOutput}`);
  process.exitCode = 1;
} else {
  console.log(
    `Built-site verification passed for ${verifiedSitemapCount} exact sitemap URLs, ${verifiedInternalLinkCount} direct internal targets, ${verifiedMediaCount} media assets, metadata, redirects, cache/security headers, structured data, and unavailable-locale 404s.`,
  );
}
