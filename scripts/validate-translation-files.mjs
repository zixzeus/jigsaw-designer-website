import {readdir, readFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {build} from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const translationsDirectory = path.join(root, "src/content/translations");
const catalog = JSON.parse(
  await readFile(path.join(translationsDirectory, "catalog.json"), "utf8"),
);
const requireAll = process.argv.includes("--all");
const requestedLocales = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
const availableFiles = (await readdir(translationsDirectory))
  .filter((name) => name.endsWith(".json") && name !== "catalog.json")
  .sort();
const result = await build({
  absWorkingDir: root,
  bundle: true,
  format: "esm",
  logLevel: "silent",
  platform: "node",
  stdin: {
    contents: `
      export {applyLocaleTranslations, validateLocaleTranslationFile} from "./src/content/translation-catalog.ts";
      export {getEnglishSiteTranslationSource} from "./src/content/translation-source.ts";
      export {GENERATED_CONTENT_LOCALES} from "./src/config/seo.ts";
    `,
    loader: "ts",
    resolveDir: root,
    sourcefile: "translation-validator-entry.ts",
  },
  tsconfig: path.join(root, "tsconfig.json"),
  write: false,
});
const bundled = result.outputFiles[0]?.text;
if (!bundled) throw new Error("Translation validator bundle is empty");
const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundled).toString("base64")}`;
const {
  GENERATED_CONTENT_LOCALES,
  applyLocaleTranslations,
  getEnglishSiteTranslationSource,
  validateLocaleTranslationFile,
} = await import(moduleUrl);
const source = getEnglishSiteTranslationSource();
const localeFiles = requestedLocales.length
  ? requestedLocales.map((locale) => `${locale}.json`)
  : requireAll
    ? GENERATED_CONTENT_LOCALES.map((locale) => `${locale}.json`)
    : availableFiles;

const errors = [];
const scriptMatchers = {
  ar: /\p{Script=Arabic}/u,
  el: /\p{Script=Greek}/u,
  he: /\p{Script=Hebrew}/u,
  hi: /\p{Script=Devanagari}/u,
  ja: /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u,
  ko: /\p{Script=Hangul}/u,
  ru: /\p{Script=Cyrillic}/u,
  th: /\p{Script=Thai}/u,
  uk: /\p{Script=Cyrillic}/u,
};
for (const fileName of localeFiles) {
  const filePath = path.join(translationsDirectory, fileName);
  try {
    const file = JSON.parse(await readFile(filePath, "utf8"));
    const expectedLocale = fileName.replace(/\.json$/, "");
    if (file.locale !== expectedLocale) {
      throw new Error(`locale field is ${file.locale}; expected ${expectedLocale}`);
    }
    validateLocaleTranslationFile(catalog, file);
    applyLocaleTranslations(source, catalog, file);
    const scriptMatcher = scriptMatchers[file.locale];
    if (scriptMatcher) {
      const values = Object.values(file.translations);
      const matching = values.filter((value) => scriptMatcher.test(value)).length;
      if (matching / values.length < 0.55) {
        throw new Error(
          `${file.locale}: only ${matching}/${values.length} translations use the expected writing system`,
        );
      }
    }
    console.log(`${file.locale}: ${Object.keys(file.translations).length} translations OK`);
  } catch (error) {
    errors.push(`${fileName}: ${error.message}`);
  }
}

if (errors.length) {
  console.error(`Translation validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Validated ${localeFiles.length} locale translation file(s).`);
}
