import assert from "node:assert/strict";
import test from "node:test";
import {fileURLToPath} from "node:url";
import {loadTsModule} from "./load-ts-module.mjs";

const [{
  APP_STORE_STOREFRONTS,
  PRODUCT_FACTS,
  getAppStoreUrl,
  getAppStoreDownloadPath,
}, {SITE_LOCALES}] = await Promise.all([
  loadTsModule(fileURLToPath(new URL("../../src/config/product.ts", import.meta.url))),
  loadTsModule(fileURLToPath(new URL("../../src/config/seo.ts", import.meta.url))),
]);

test("defines an App Store storefront for every supported site locale", () => {
  assert.deepEqual(Object.keys(APP_STORE_STOREFRONTS).sort(), [...SITE_LOCALES].sort());
  for (const locale of SITE_LOCALES) {
    assert.match(APP_STORE_STOREFRONTS[locale], /^[a-z]{2}$/, locale);
  }
});

test("maps language codes to country storefronts instead of using the language as a country", () => {
  const expectedStorefronts = {
    en: "us",
    "zh-Hans": "cn",
    "zh-Hant": "tw",
    ja: "jp",
    ko: "kr",
    "pt-BR": "br",
    vi: "vn",
    ms: "my",
    hi: "in",
    ar: "sa",
    he: "il",
    sv: "se",
    da: "dk",
    uk: "ua",
    cs: "cz",
    el: "gr",
    ca: "es",
  };

  for (const [locale, country] of Object.entries(expectedStorefronts)) {
    assert.equal(
      getAppStoreUrl(locale),
      `https://apps.apple.com/${country}/app/jigsawdesigner/id6751882340`,
      locale,
    );
  }
});

test("every localized download URL points to the app in an explicit Apple storefront", () => {
  for (const locale of SITE_LOCALES) {
    const url = new URL(getAppStoreUrl(locale));
    assert.equal(url.protocol, "https:", locale);
    assert.equal(url.host, "apps.apple.com", locale);
    assert.equal(
      url.pathname,
      `/${APP_STORE_STOREFRONTS[locale]}/app/jigsawdesigner/id6751882340`,
      locale,
    );
    assert.equal(url.search, "", locale);
    assert.equal(url.hash, "", locale);
    assert.equal(url.username, "", locale);
    assert.equal(url.password, "", locale);
  }
});

test("unknown locales and inherited property names safely fall back to the US storefront", () => {
  for (const locale of [
    "",
    "unknown",
    "en-US",
    "cn",
    "us",
    "__proto__",
    "constructor",
    "prototype",
    "toString",
    "hasOwnProperty",
    "valueOf",
  ]) {
    assert.equal(
      getAppStoreUrl(locale),
      "https://apps.apple.com/us/app/jigsawdesigner/id6751882340",
      locale,
    );
  }
});

test("download routes keep all canonical locales in a same-origin redirect endpoint", () => {
  for (const locale of SITE_LOCALES) {
    const path = getAppStoreDownloadPath(locale);
    assert.equal(path, `/api/app-store?locale=${encodeURIComponent(locale)}`, locale);
    const url = new URL(path, PRODUCT_FACTS.websiteOrigin);
    assert.equal(url.origin, PRODUCT_FACTS.websiteOrigin, locale);
    assert.equal(url.pathname, "/api/app-store", locale);
    assert.deepEqual([...url.searchParams], [["locale", locale]], locale);
    assert.equal(url.hash, "", locale);
  }
});

test("download routes reject unknown locale and redirect injection values", () => {
  for (const locale of [
    "",
    "unknown",
    "en-US",
    "__proto__",
    "constructor",
    "toString",
    "../../",
    "//example.com",
    "https://example.com",
    "en&url=https://example.com",
    "en#https://example.com",
    "en\r\nLocation: https://example.com",
  ]) {
    assert.equal(getAppStoreDownloadPath(locale), "/api/app-store?locale=en", locale);
  }
});

test("the default product link uses the same app and US storefront as English", () => {
  assert.equal(PRODUCT_FACTS.appStoreId, "6751882340");
  assert.equal(PRODUCT_FACTS.appStoreUrl, getAppStoreUrl("en"));
  assert.equal(
    PRODUCT_FACTS.appStoreUrl,
    "https://apps.apple.com/us/app/jigsawdesigner/id6751882340",
  );
});
