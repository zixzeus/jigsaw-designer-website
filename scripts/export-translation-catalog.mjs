import {mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {build} from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "src/content/translations/catalog.json");
const checkOnly = process.argv.includes("--check");

const result = await build({
  absWorkingDir: root,
  bundle: true,
  format: "esm",
  logLevel: "silent",
  platform: "node",
  stdin: {
    contents: `
      import {getEnglishSiteTranslationSource} from "./src/content/translation-source.ts";
      import {createTranslationEntries, sourceHashForEntries} from "./src/content/translation-catalog.ts";
      const source = getEnglishSiteTranslationSource();
      const entries = createTranslationEntries(source);
      export const payload = {
        source,
        catalog: {
          sourceLocale: "en",
          sourceHash: sourceHashForEntries(entries),
          entries,
        },
      };
    `,
    loader: "ts",
    resolveDir: root,
    sourcefile: "translation-catalog-entry.ts",
  },
  tsconfig: path.join(root, "tsconfig.json"),
  write: false,
});

const bundled = result.outputFiles[0]?.text;
if (!bundled) throw new Error("Translation catalog bundle is empty");
const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundled).toString("base64")}`;
const {payload} = await import(moduleUrl);
const serialized = `${JSON.stringify(payload.catalog, null, 2)}\n`;

if (checkOnly) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== serialized) {
    console.error("Translation catalog is stale. Run npm run translation:catalog.");
    process.exitCode = 1;
  }
} else {
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, serialized, "utf8");
}

const totalCharacters = payload.catalog.entries.reduce(
  (sum, entry) => sum + entry.text.length,
  0,
);
console.log(
  `Translation catalog ${checkOnly ? "checked" : "written"}: ` +
    `${payload.catalog.entries.length} unique entries, ${totalCharacters} source characters, ` +
    `hash ${payload.catalog.sourceHash}.`,
);
