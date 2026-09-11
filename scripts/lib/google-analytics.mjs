import {attribute} from "./html.mjs";

function jsonValueAt(source, start) {
  const stack = [];
  let quoted = false;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') quoted = false;
    } else if (character === '"') {
      quoted = true;
    } else if (character === "{" || character === "[") {
      stack.push(character);
    } else if (character === "}" || character === "]") {
      stack.pop();
      if (!stack.length) return JSON.parse(source.slice(start, index + 1));
    }
  }
  throw new Error("Incomplete JSON in Next.js script declaration");
}

function deferredScriptProps(scriptBlocks) {
  // afterInteractive scripts are client component declarations in the Flight
  // stream, not native script tags in server HTML. Parse JSON only; never eval.
  let flight = "";
  for (const [, , body] of scriptBlocks) {
    for (const match of body.matchAll(/self\.__next_f\.push\(\s*(?=\[)/g)) {
      const value = jsonValueAt(body, match.index + match[0].length);
      if (value[0] === 1 && typeof value[1] === "string") flight += value[1];
    }
  }
  const props = [];
  const component = /\["\$",\s*"\$L[0-9a-f]+",\s*(?:null|"(?:[^"\\]|\\.)*"),\s*(?=\{)/g;
  for (const match of flight.matchAll(component)) {
    const value = jsonValueAt(flight, match.index + match[0].length);
    if (typeof value.src === "string" || value.id === "google-analytics" || value.dangerouslySetInnerHTML) {
      props.push({...value, deferred: true});
    }
  }
  return props;
}

export function verifyGoogleAnalytics(html, measurementId) {
  const errors = [];
  const record = (condition, message) => { if (!condition) errors.push(message); };
  const scriptBlocks = [...html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)];
  let deferred;
  try {
    deferred = deferredScriptProps(scriptBlocks);
  } catch (error) {
    errors.push(`Cannot read Next.js script declarations: ${error.message}`);
    deferred = [];
  }
  const scripts = [
    ...scriptBlocks.map(([, openingTag, body]) => ({
      src: attribute(openingTag, "src"),
      id: attribute(openingTag, "id"),
      dangerouslySetInnerHTML: {__html: body},
      deferred: false,
    })),
    ...deferred,
  ];
  const loaders = scripts.filter((script) => {
    if (!script.src) return false;
    try {
      const url = new URL(script.src);
      return url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js";
    } catch {
      return false;
    }
  });
  const configCall = /\bgtag\(\s*['"]config['"]\s*,\s*['"]([^'"]+)['"]/g;
  const configs = scripts.filter((script) => script.id === "google-analytics" || (
    // Flight payloads merely describe deferred code; don't count their strings
    // again as native initializers alongside the parsed client declarations.
    !script.dangerouslySetInnerHTML?.__html?.includes("self.__next_f.push") &&
    /\bgtag\(\s*['"]config['"]/.test(script.dangerouslySetInnerHTML?.__html ?? "")
  ));
  record(loaders.length === 1, `expected one GA4 loader declaration, found ${loaders.length}`);
  record(configs.length === 1, `expected one GA4 initializer declaration, found ${configs.length}`);
  for (const loader of loaders) {
    record(loader.src === `https://www.googletagmanager.com/gtag/js?id=${measurementId}`, "GA4 loader has an unexpected URL or measurement ID");
    record(!loader.deferred || (loader.strategy ?? "afterInteractive") === "afterInteractive", "GA4 loader must use afterInteractive");
  }
  for (const config of configs) {
    const body = config.dangerouslySetInnerHTML?.__html ?? "";
    const calls = [...body.matchAll(configCall)];
    record(config.id === "google-analytics", "GA4 initializer must have the stable google-analytics ID");
    record(!config.deferred || (config.strategy ?? "afterInteractive") === "afterInteractive", "GA4 initializer must use afterInteractive");
    record(calls.length === 1 && calls[0][1] === measurementId, "GA4 initializer must configure the expected measurement ID exactly once");
    record(/window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\s*\]/.test(body), "GA4 dataLayer initialization is missing");
    record(/function\s+gtag\(\)\s*\{\s*dataLayer\.push\(arguments\);?\s*\}/.test(body), "GA4 gtag queue function is missing");
    record(/gtag\(\s*['"]js['"]\s*,\s*new Date\(\)\s*\)/.test(body), "GA4 initialization timestamp is missing");
  }
  record(!html.includes("gtag('consent'"), "obsolete GA4 consent mode is still present");
  record(!html.includes("analytics-consent-settings"), "obsolete analytics consent UI is still present");
  return errors;
}
