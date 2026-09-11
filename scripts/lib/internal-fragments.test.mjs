import assert from "node:assert/strict";
import test from "node:test";
import {verifyInternalFragments} from "./internal-fragments.mjs";

const origin = "https://jigsawdesigner.com";
const page = (pathname, html, status = 200) => ({pathname, html, response: {status}});

test("checks same-page, cross-page and relative fragment links", async () => {
  const pages = [
    page("/en", '<a href="#workflow">Start</a><section id="workflow"></section><section id="product"></section>'),
    page("/en/help/article", '<a href="/en#product">Product</a><a href="./#contents">Contents</a>'),
  ];
  const requested = [];
  const result = await verifyInternalFragments({
    pages,
    origin,
    fetchPage: async (pathname) => {
      requested.push(pathname);
      return page(pathname, '<nav id="contents"></nav>');
    },
  });
  assert.deepEqual(result, {errors: [], checkedCount: 3});
  assert.deepEqual(requested, ["/en/help"]);
});

test("reports removed targets without accepting data attributes or hydration strings", async () => {
  const pages = [page("/en", `
    <a href="#workflow">Start</a><a href="/en/learn#lessons">Learn</a>
    <section data-id="workflow"></section>
    <!-- <section id="workflow"></section> -->
    <script>self.__next_f.push('<section id="workflow"></section><a href="#next-data">')</script>
  `)];
  const result = await verifyInternalFragments({
    pages,
    origin,
    fetchPage: async (pathname) => page(pathname, '<main id="introduction"></main>'),
  });
  assert.equal(result.checkedCount, 2);
  assert.equal(result.errors.length, 2);
  assert.match(result.errors[0], /#workflow has no target "workflow" in \/en$/);
  assert.match(result.errors[1], /\/en\/learn#lessons has no target "lessons"/);
});

test("matches encoded, entity-decoded and legacy named targets", async () => {
  const pages = [page("/zh-Hans", `
    <a href="#%E7%94%9F%E6%88%90">Generate</a><section id="生成"></section>
    <a href="#cut&amp;line">Cutlines</a><section id="cut&amp;line"></section>
    <a href="#legacy">Legacy</a><a name="legacy"></a>
    <a href="#100%">Percent</a><section id="100%"></section>
  `)];
  const result = await verifyInternalFragments({pages, origin});
  assert.deepEqual(result, {errors: [], checkedCount: 4});
});

test("ignores external and document-top links while checking IDs before text directives", async () => {
  const pages = [page("/en", `
    <a href="https://example.com/#missing">External</a>
    <a href="mailto:test@example.com#missing">Email</a>
    <a href="#">Top</a><a href="#top">Top</a><a href="#TOP">Top</a>
    <a href="#:~:text=example">Text</a>
    <a href="#product:~:text=example">Product text</a>
    <section id="product"></section>
  `)];
  const result = await verifyInternalFragments({pages, origin});
  assert.deepEqual(result, {errors: [], checkedCount: 1});
});

test("fails cross-page fragments that redirect or return an error", async () => {
  const pages = [page("/en", '<a href="/en/missing#product">Missing</a><a href="/en/old#product">Old</a>')];
  const result = await verifyInternalFragments({
    pages,
    origin,
    fetchPage: async (pathname) => page(pathname, '<section id="product"></section>', pathname.endsWith("old") ? 301 : 404),
  });
  assert.equal(result.checkedCount, 2);
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.every((error) => error.includes("must target a direct 200 page")));
});
