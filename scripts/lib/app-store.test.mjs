import assert from "node:assert/strict";
import test from "node:test";
import {fileURLToPath} from "node:url";
import {loadTsModule} from "./load-ts-module.mjs";

const [{
  APP_STORE_COUNTRIES,
  APP_STORE_STOREFRONTS,
  PRODUCT_FACTS,
  getAppStoreUrl,
  getAppStoreDownloadPath,
  isAppStoreCountry,
}, {SITE_LOCALES}] = await Promise.all([
  loadTsModule(fileURLToPath(new URL("../../src/config/product.ts", import.meta.url))),
  loadTsModule(fileURLToPath(new URL("../../src/config/seo.ts", import.meta.url))),
]);

test("supports 175 unique Apple storefront countries with lowercase two-letter codes", () => {
  assert.ok(Array.isArray(APP_STORE_COUNTRIES));
  assert.equal(APP_STORE_COUNTRIES.length, 175);
  assert.equal(new Set(APP_STORE_COUNTRIES).size, 175);
  for (const country of APP_STORE_COUNTRIES) {
    assert.match(country, /^[a-z]{2}$/);
    assert.equal(isAppStoreCountry(country), true, country);
    assert.equal(isAppStoreCountry(country.toUpperCase()), false, country);
    assert.equal(
      getAppStoreUrl("en", country),
      `https://apps.apple.com/${country}/app/jigsawdesigner/id6751882340`,
      country,
    );
  }
  for (const country of ["mx", "ae", "za", "xk"]) {
    assert.ok(APP_STORE_COUNTRIES.includes(country), country);
  }
  for (const country of ["kp", "ir", "zz", "", "__proto__", "constructor"]) {
    assert.equal(isAppStoreCountry(country), false, country);
  }
});

test("defines an App Store storefront for every supported site locale", () => {
  assert.deepEqual(Object.keys(APP_STORE_STOREFRONTS).sort(), [...SITE_LOCALES].sort());
  for (const locale of SITE_LOCALES) {
    assert.match(APP_STORE_STOREFRONTS[locale], /^[a-z]{2}$/, locale);
    assert.equal(isAppStoreCountry(APP_STORE_STOREFRONTS[locale]), true, locale);
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

test("visitor country takes precedence over website language and accepts either letter case", () => {
  for (const [locale, country, expected] of [
    ["en", "CN", "cn"],
    ["en", "cn", "cn"],
    ["zh-Hans", "US", "us"],
    ["zh-Hans", "us", "us"],
    ["ja", "GB", "gb"],
    ["en", "HK", "hk"],
    ["en", "CA", "ca"],
    ["en", "AU", "au"],
    ["en", "SG", "sg"],
    ["en", "MX", "mx"],
    ["en", "AE", "ae"],
    ["en", "ZA", "za"],
    ["en", "XK", "xk"],
    ["unknown", "CN", "cn"],
  ]) {
    assert.equal(
      getAppStoreUrl(locale, country),
      `https://apps.apple.com/${expected}/app/jigsawdesigner/id6751882340`,
      `${locale}: ${country}`,
    );
  }
});

test("unsupported or malicious country values fall back to the language storefront", () => {
  for (const country of [
    undefined,
    null,
    "",
    "XX",
    "T1",
    "ZZ",
    "KP",
    "IR",
    "en",
    "__proto__",
    "constructor",
    "../../",
    "//example.com",
    "https://example.com",
    "us?redirect=https://example.com",
    "cn/app/another-app",
    "us\r\nLocation: https://example.com",
  ]) {
    assert.equal(
      getAppStoreUrl("zh-Hans", country),
      "https://apps.apple.com/cn/app/jigsawdesigner/id6751882340",
      String(country),
    );
    assert.equal(
      getAppStoreUrl("unknown", country),
      "https://apps.apple.com/us/app/jigsawdesigner/id6751882340",
      String(country),
    );
    assert.equal(
      getAppStoreDownloadPath("zh-Hans", country),
      "/api/app-store?locale=zh-Hans",
      String(country),
    );
    assert.equal(
      getAppStoreDownloadPath("unknown", country),
      "/api/app-store?locale=en",
      String(country),
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

test("download routes preserve valid country selections as normalized query parameters", () => {
  for (const country of APP_STORE_COUNTRIES) {
    for (const input of [country, country.toUpperCase()]) {
      const path = getAppStoreDownloadPath("en", input);
      assert.equal(path, `/api/app-store?locale=en&country=${country}`, input);
      const url = new URL(path, PRODUCT_FACTS.websiteOrigin);
      assert.equal(url.origin, PRODUCT_FACTS.websiteOrigin, input);
      assert.equal(url.pathname, "/api/app-store", input);
      assert.deepEqual([...url.searchParams], [["locale", "en"], ["country", country]], input);
      assert.equal(url.hash, "", input);
    }
  }
  assert.equal(
    getAppStoreDownloadPath("zh-Hans", "US"),
    "/api/app-store?locale=zh-Hans&country=us",
  );
  assert.equal(
    getAppStoreDownloadPath("unknown", "CN"),
    "/api/app-store?locale=en&country=cn",
  );
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
    assert.equal(
      getAppStoreDownloadPath(locale, "CN"),
      "/api/app-store?locale=en&country=cn",
      locale,
    );
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
