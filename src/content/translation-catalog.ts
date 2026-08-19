export type TranslationCatalogEntry = {
  id: string;
  text: string;
  paths: string[];
};

export type TranslationCatalog = {
  sourceLocale: "en";
  sourceHash: string;
  entries: TranslationCatalogEntry[];
};

export type LocaleTranslationFile = {
  locale: string;
  sourceHash: string;
  translations: Record<string, string>;
};

const NON_TRANSLATABLE_KEYS = new Set([
  "device",
  "difficulty",
  "href",
  "id",
  "kind",
  "layout",
  "original",
  "platform",
  "schemaType",
  "slug",
  "src",
  "stage",
  "status",
]);

const PROTECTED_TERMS = [
  "Google Analytics 4",
  "JigsawDesigner",
  "Standard Concave",
  "Standard Convex",
  "Generate Jigsaw",
  "Fit to Window",
  "Project Info",
  "Point Edit",
  "Straight Line",
  "App Store",
  "CloudKit",
  "Cloudflare",
  "document.svg",
  ".jigsawproject",
  "Premium",
  "iPhone",
  "iPadOS",
  "iCloud",
  "Pencil",
  "Bezier",
  "Layers",
  "Inspector",
  "Templates",
  "Apple",
  "iPad",
  "macOS",
  "iOS",
  "Mac",
  "SVG",
  "GA4",
  "C++",
] as const;

function stableHash(input: string): string {
  let first = 0x811c9dc5;
  let second = 0x9e3779b9;
  for (let index = 0; index < input.length; index += 1) {
    const code = input.charCodeAt(index);
    first = Math.imul(first ^ code, 0x01000193);
    second = Math.imul(second ^ code, 0x85ebca6b);
  }
  return `${(first >>> 0).toString(16).padStart(8, "0")}${(second >>> 0).toString(16).padStart(8, "0")}`;
}

export function translationId(text: string): string {
  return `t_${stableHash(text)}`;
}

function shouldTranslate(path: readonly string[], value: string): boolean {
  const finalKey = path.at(-1) ?? "";
  if (NON_TRANSLATABLE_KEYS.has(finalKey)) return false;
  if (!value.trim()) return false;
  if (!/[\p{L}]/u.test(value)) return false;
  return true;
}

function visitStrings(
  value: unknown,
  callback: (path: string[], text: string) => void,
  path: string[] = [],
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visitStrings(item, callback, [...path, String(index)]));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => visitStrings(item, callback, [...path, key]));
    return;
  }
  if (typeof value === "string" && shouldTranslate(path, value)) {
    callback(path, value);
  }
}

export function createTranslationEntries(source: unknown): TranslationCatalogEntry[] {
  const byId = new Map<string, TranslationCatalogEntry>();
  visitStrings(source, (path, text) => {
    const id = translationId(text);
    const existing = byId.get(id);
    if (existing && existing.text !== text) {
      throw new Error(`Translation ID collision between ${JSON.stringify(existing.text)} and ${JSON.stringify(text)}`);
    }
    if (existing) {
      existing.paths.push(path.join("."));
    } else {
      byId.set(id, {id, text, paths: [path.join(".")]});
    }
  });
  return [...byId.values()]
    .map((entry) => ({...entry, paths: entry.paths.sort()}))
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function sourceHashForEntries(entries: readonly TranslationCatalogEntry[]): string {
  return stableHash(JSON.stringify(entries.map(({id, text}) => [id, text])));
}

function placeholders(text: string): string[] {
  return [
    ...text.matchAll(/\{[A-Za-z][A-Za-z0-9_]*(?:,[^{}]+)?\}|%\d*\$?[@a-z]|⌘[^\s,.;]*/g),
  ].map((match) => match[0]).sort();
}

function protectedTerms(text: string): string[] {
  return PROTECTED_TERMS.filter((term) => text.includes(term));
}

function validateTranslation(source: string, translated: string, locale: string, id: string): void {
  if (!translated.trim()) throw new Error(`${locale}:${id}: translation is empty`);
  const expectedPlaceholders = placeholders(source);
  const actualPlaceholders = placeholders(translated);
  if (JSON.stringify(expectedPlaceholders) !== JSON.stringify(actualPlaceholders)) {
    throw new Error(`${locale}:${id}: placeholder mismatch`);
  }
  for (const term of protectedTerms(source)) {
    if (!translated.includes(term)) {
      throw new Error(`${locale}:${id}: protected term changed or removed: ${term}`);
    }
  }
  const sourceWithoutTerms = PROTECTED_TERMS.reduce(
    (value, term) => value.replaceAll(term, ""),
    source,
  ).trim();
  if (
    translated === source &&
    sourceWithoutTerms.length >= 16 &&
    /\s/.test(sourceWithoutTerms)
  ) {
    throw new Error(`${locale}:${id}: untranslated English sentence`);
  }
}

function cloneAndTranslate(
  value: unknown,
  translations: Readonly<Record<string, string>>,
  locale: string,
  path: string[] = [],
): unknown {
  if (Array.isArray(value)) {
    return value.map((item, index) => cloneAndTranslate(item, translations, locale, [...path, String(index)]));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        cloneAndTranslate(item, translations, locale, [...path, key]),
      ]),
    );
  }
  if (typeof value === "string" && shouldTranslate(path, value)) {
    const id = translationId(value);
    const translated = translations[id];
    if (translated === undefined) throw new Error(`${locale}:${id}: missing translation for ${path.join(".")}`);
    validateTranslation(value, translated, locale, id);
    return translated;
  }
  return value;
}

export function validateLocaleTranslationFile(
  catalog: TranslationCatalog,
  file: LocaleTranslationFile,
): void {
  if (file.sourceHash !== catalog.sourceHash) {
    throw new Error(`${file.locale}: source hash is stale`);
  }
  const expected = new Set(catalog.entries.map((entry) => entry.id));
  const actual = new Set(Object.keys(file.translations));
  const missing = [...expected].filter((id) => !actual.has(id));
  const extra = [...actual].filter((id) => !expected.has(id));
  if (missing.length || extra.length) {
    throw new Error(`${file.locale}: translation keys mismatch; missing=${missing.length}, extra=${extra.length}`);
  }
  for (const entry of catalog.entries) {
    validateTranslation(entry.text, file.translations[entry.id], file.locale, entry.id);
  }
}

export function applyLocaleTranslations<T>(
  source: T,
  catalog: TranslationCatalog,
  file: LocaleTranslationFile,
): T {
  validateLocaleTranslationFile(catalog, file);
  return cloneAndTranslate(source, file.translations, file.locale) as T;
}
