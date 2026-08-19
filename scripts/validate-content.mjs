import {readFile, readdir} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {loadTsModule} from "./lib/load-ts-module.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seoConfigPath = path.join(root, "src/config/seo.ts");
const messagesDirectory = path.join(root, "src/messages");
const legacyLocales = new Set(["zh", "pt"]);
const tierOneNamespaces = new Set(["Pricing", "Terms", "Refund"]);
const deprecatedMessageKeys = [
  "Consent",
  "Navigation.github",
  "Navigation.getStarted",
  "Hero.download",
  "Footer.github",
  "Pricing.features.title",
  "Help.needHelp.contact",
  "Help.needHelp.download",
  "Help.industryKeywords",
  "Help.troubleshooting.items",
];

const forbiddenPatterns = [
  {label: "deprecated 1.5 version", pattern: /\bv?1\.5(?:\.\d+)?\b/gi},
  {label: "unsupported PDF or PNG export wording", pattern: /\b(?:PDF|PNG)\b/gi},
  {label: "Paddle checkout wording", pattern: /\bPaddle\b/gi},
  {
    label: "lifetime or perpetual licence wording",
    pattern: /\b(?:lifetime|perpetual)\b|终身(?:许可|许可证|授权)?|終身(?:許可|授權)?/gi,
  },
  {
    label: "three-second guarantee",
    pattern: /\b(?:3|three)[ -]?seconds?\b|(?:3|三)\s*秒/gi,
  },
  {
    label: "perfect or manufacturing-ready guarantee",
    pattern: /\bperfect(?:ly)?\b|\bmanufacturing[ -]ready\b|完美|制造就绪|製造就緒/gi,
  },
  {label: "legacy Pen Tool wording", pattern: /\bPen Tool\b/gi},
  {
    label: "editable real-time collaboration claim",
    pattern: /\breal[ -]time (?:co-?editing|collaboration)\b|实时(?:协作|共同编辑)|即時(?:協作|共同編輯)/gi,
  },
  {
    label: "fixed USD price",
    pattern: /(?:\$\s*\d|USD\s*\d|\d\s*USD)/g,
  },
];

function flatten(value, prefix = "", result = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}[${index}]`, result));
    return result;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      flatten(item, prefix ? `${prefix}.${key}` : key, result);
    }
    return result;
  }

  result.set(prefix, value);
  return result;
}

function placeholders(value) {
  if (typeof value !== "string") return [];
  return [...value.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)(?=[,}])/g)]
    .map((match) => match[1])
    .sort();
}

function sameMembers(left, right) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function isTierOneKey(key) {
  return tierOneNamespaces.has(key.split(".", 1)[0]);
}

function addSetDifference(errors, locale, label, expected, actual) {
  const missing = [...expected].filter((key) => !actual.has(key));
  const extra = [...actual].filter((key) => !expected.has(key));

  if (missing.length) {
    errors.push(`${locale}: missing ${label}: ${missing.join(", ")}`);
  }
  if (extra.length) {
    errors.push(`${locale}: extra ${label}: ${extra.join(", ")}`);
  }
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(fullPath)));
    } else if (/\.(?:js|mjs|ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const errors = [];
const {PRIMARY_SEO_LOCALES, SITE_LOCALES} = await loadTsModule(seoConfigPath);
const locales = [...SITE_LOCALES];
const tierOneLocales = new Set(PRIMARY_SEO_LOCALES);
if (new Set(locales).size !== locales.length) {
  errors.push("SITE_LOCALES contains duplicate locales");
}

const expectedMessageFiles = new Set(
  [...locales, ...legacyLocales].map((locale) => `${locale}.json`),
);
const actualMessageFiles = new Set(
  (await readdir(messagesDirectory)).filter((name) => name.endsWith(".json")),
);
addSetDifference(
  errors,
  "messages",
  "locale files",
  expectedMessageFiles,
  actualMessageFiles,
);

const translations = new Map();

for (const locale of [...locales, ...legacyLocales]) {
  const filePath = path.join(messagesDirectory, `${locale}.json`);
  try {
    translations.set(locale, JSON.parse(await readFile(filePath, "utf8")));
  } catch (error) {
    errors.push(`${locale}: missing or invalid message file (${error.message})`);
  }
}

const english = translations.get("en");
if (!english) {
  throw new Error("The English reference messages are unavailable");
}

const reference = flatten(english);
const fullReferenceKeys = new Set(reference.keys());
const baseReferenceKeys = new Set([...reference.keys()].filter((key) => !isTierOneKey(key)));

for (const locale of locales) {
  const messages = translations.get(locale);
  if (!messages) continue;
  const flattened = flatten(messages);
  const keys = new Set(flattened.keys());
  const expected = tierOneLocales.has(locale) ? fullReferenceKeys : baseReferenceKeys;
  const actual = tierOneLocales.has(locale)
    ? keys
    : new Set([...keys].filter((key) => !isTierOneKey(key)));

  addSetDifference(errors, locale, "message keys", expected, actual);

  for (const key of expected) {
    if (!flattened.has(key)) continue;
    if (typeof reference.get(key) !== typeof flattened.get(key)) {
      errors.push(
        `${locale}: value type mismatch at ${key} ` +
          `(expected ${typeof reference.get(key)}; got ${typeof flattened.get(key)})`,
      );
    }
    if (typeof flattened.get(key) !== "string") {
      errors.push(`${locale}: message leaf at ${key} must be a string`);
    }
    const expectedPlaceholders = placeholders(reference.get(key));
    const actualPlaceholders = placeholders(flattened.get(key));
    if (!sameMembers(expectedPlaceholders, actualPlaceholders)) {
      errors.push(
        `${locale}: placeholder mismatch at ${key} ` +
          `(expected ${expectedPlaceholders.join(", ") || "none"}; got ${actualPlaceholders.join(", ") || "none"})`,
      );
    }
  }
}

for (const [locale, messages] of translations) {
  const flattened = flatten(messages);
  for (const [key, value] of flattened) {
    if (
      deprecatedMessageKeys.some(
        (deprecated) => key === deprecated || key.startsWith(`${deprecated}.`),
      )
    ) {
      errors.push(`${locale}:${key}: deprecated message key must be removed`);
    }
    if (key.split(".").at(-1) === "metaKeywords") {
      errors.push(`${locale}:${key}: meta keywords are not allowed`);
    }
    if (typeof value !== "string") continue;
    for (const {label, pattern} of forbiddenPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(value)) {
        errors.push(`${locale}:${key}: ${label}`);
      }
    }
  }
}

const publicSourceDirectories = [
  path.join(root, "src/app"),
  path.join(root, "src/components"),
  path.join(root, "src/config"),
  path.join(root, "src/content"),
  path.join(root, "src/i18n"),
  path.join(root, "src/lib"),
];

for (const directory of publicSourceDirectories) {
  for (const filePath of await sourceFiles(directory)) {
    const source = await readFile(filePath, "utf8");
    const relativePath = path.relative(root, filePath);
    if (/\bkeywords\s*:|metaKeywords/.test(source)) {
      errors.push(`${relativePath}: meta keywords are not allowed`);
    }
    for (const {label, pattern} of forbiddenPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(source)) {
        errors.push(`${relativePath}: ${label}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Content validation passed for ${locales.length} active locales and ${legacyLocales.size} legacy catalogs with aligned keys, placeholders, and product claims.`,
  );
}
