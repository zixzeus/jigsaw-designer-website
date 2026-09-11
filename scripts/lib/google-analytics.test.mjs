import assert from "node:assert/strict";
import test from "node:test";
import {verifyGoogleAnalytics} from "./google-analytics.mjs";

const id = "G-3TZD2EK8YR";
const source = `https://www.googletagmanager.com/gtag/js?id=${id}`;
const initialization = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
`;
const loader = {strategy: "afterInteractive", src: source};
const initializer = {id: "google-analytics", dangerouslySetInnerHTML: {__html: initialization}};

function flightHtml(props) {
  const value = '1:I["next/script",[],""]\n2:' + JSON.stringify(
    props.map((value) => ["$", "$L1", null, value]),
  ) + "\n";
  // Match streamed output: arbitrary JSON boundaries can span HTML scripts.
  const split = 71;
  return [value.slice(0, split), value.slice(split)].map((part) =>
    `<script>self.__next_f.push(${JSON.stringify([1, part])})</script>`,
  ).join("");
}

test("validates afterInteractive declarations from streamed Flight JSON", () => {
  assert.deepEqual(verifyGoogleAnalytics(flightHtml([loader, initializer]), id), []);
});

test("still validates native script output", () => {
  const html = `<script src="${source}"></script><script id="google-analytics">${initialization}</script>`;
  assert.deepEqual(verifyGoogleAnalytics(html, id), []);
});

test("rejects duplicate deferred scripts and additional native scripts", () => {
  const duplicate = verifyGoogleAnalytics(flightHtml([loader, loader, initializer, initializer]), id);
  assert.ok(duplicate.some((error) => error.includes("loader declaration, found 2")));
  assert.ok(duplicate.some((error) => error.includes("initializer declaration, found 2")));
  const mixed = verifyGoogleAnalytics(
    flightHtml([loader, initializer]) + `<script src="${source}"></script><script id="extra">${initialization}</script>`,
    id,
  );
  assert.ok(mixed.some((error) => error.includes("loader declaration, found 2")));
  assert.ok(mixed.some((error) => error.includes("initializer declaration, found 2")));
});

test("rejects incorrect measurement IDs and duplicate initialization calls", () => {
  const wrong = verifyGoogleAnalytics(flightHtml([
    {...loader, src: source.replace(id, "G-WRONG")},
    {...initializer, dangerouslySetInnerHTML: {__html: initialization.replace(id, "G-WRONG")}},
  ]), id);
  assert.ok(wrong.some((error) => error.includes("unexpected URL or measurement ID")));
  assert.ok(wrong.some((error) => error.includes("expected measurement ID exactly once")));
  const duplicate = verifyGoogleAnalytics(flightHtml([
    loader,
    {...initializer, dangerouslySetInnerHTML: {__html: initialization + `gtag('config', '${id}');`}},
  ]), id);
  assert.ok(duplicate.some((error) => error.includes("expected measurement ID exactly once")));
});

test("requires queue setup, stable initializer ID and the intended loading strategy", () => {
  const errors = verifyGoogleAnalytics(flightHtml([
    {...loader, strategy: "lazyOnload"},
    {id: "unstable", strategy: "beforeInteractive", dangerouslySetInnerHTML: {__html: `gtag('config', '${id}');`}},
  ]), id);
  assert.ok(errors.some((error) => error.includes("loader must use afterInteractive")));
  assert.ok(errors.some((error) => error.includes("initializer must use afterInteractive")));
  assert.ok(errors.some((error) => error.includes("stable google-analytics ID")));
  assert.ok(errors.some((error) => error.includes("dataLayer initialization is missing")));
  assert.ok(errors.some((error) => error.includes("gtag queue function is missing")));
  assert.ok(errors.some((error) => error.includes("timestamp is missing")));
});

test("does not pass missing or malformed declarations", () => {
  assert.ok(verifyGoogleAnalytics("<main>No scripts</main>", id).some((error) => error.includes("found 0")));
  assert.ok(verifyGoogleAnalytics('<script>self.__next_f.push([1,"broken)</script>', id)
    .some((error) => error.includes("Cannot read Next.js script declarations")));
});
