import {attribute, tags} from "./html.mjs";

const helpTopics = [
  "getting-started", "interface-guide", "vector-editing", "templates",
  "jigsaw-generation", "svg-import-export", "project-library",
  "keyboard-shortcuts", "troubleshooting",
];

// These are public URLs: existing bookmarks must survive content consolidation.
const legacyGuideTargets = {
  tools: "/help/vector-editing#tools",
  parameters: "/help/jigsaw-generation#parameters",
  "object-inspector": "/help/vector-editing#selection",
  "template-library": "/help/templates#choose",
  "template-workflow": "/help/templates#create",
  "layers-nodes": "/help/vector-editing#layers-nodes",
  "advanced-settings": "/help/vector-editing#advanced-settings",
  generation: "/help/jigsaw-generation#run-and-inspect",
};

const retainedAnchors = {
  "/help/interface-guide": ["workspace", "iphone", ...Object.keys(legacyGuideTargets)],
  "/help/vector-editing": ["selection", "canvas", "tools", "tools-panel", "project-info", "open-paths", "layers-nodes", "advanced-settings"],
  "/help/templates": ["choose", "create", "manage"],
  "/help/jigsaw-generation": ["input-geometry", "template", "parameters", "run-and-inspect"],
  "/help/project-library": ["my-projects", "project-menu", "public-projects", "shared-projects"],
  "/help/svg-import-export": ["import", "project-package", "export"],
};

// A full demonstration belongs to one topic, rather than being repeated in
// the overview, the directory, and the topic itself.
const chapterOwners = {
  workspace: "/help/interface-guide",
  iphone: "/help/interface-guide",
  tools: "/help/vector-editing",
  "object-inspector": "/help/vector-editing",
  "layers-nodes": "/help/vector-editing",
  "editor-settings": "/help/vector-editing",
  "template-library": "/help/templates",
  "template-workflow": "/help/templates",
  parameters: "/help/jigsaw-generation",
  generation: "/help/jigsaw-generation",
  "save-settings": "/help/project-library",
};

function documentMarkup(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|textarea|template)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
}

function counts(values) {
  const result = new Map();
  for (const value of values) result.set(value, (result.get(value) ?? 0) + 1);
  return result;
}

export function verifyHelpOrganization({html, pathname, locale}) {
  if (pathname !== "/help" && !pathname.startsWith("/help/")) return [];

  const errors = [];
  const label = `/${locale}${pathname}`;
  const markup = documentMarkup(html);
  const allTags = markup.match(/<[a-z][^>]*>/gi) ?? [];
  const links = tags(markup, "a");
  const ids = counts(allTags.map((tag) => attribute(tag, "id")).filter(Boolean));
  const chapterTags = allTags.filter((tag) => attribute(tag, "data-guide-chapter") !== undefined);
  const chapters = counts(chapterTags.map((tag) => attribute(tag, "data-guide-chapter")));
  const requireOne = (collection, key, type) => {
    const count = collection.get(key) ?? 0;
    if (count !== 1) errors.push(`${label}: expected one ${type} "${key}", found ${count}`);
  };

  for (const id of retainedAnchors[pathname] ?? []) requireOne(ids, id, "retained anchor");

  for (const [chapter, owner] of Object.entries(chapterOwners)) {
    if (pathname === owner) requireOne(chapters, chapter, "guide chapter");
    else if (chapters.has(chapter)) errors.push(`${label}: full guide chapter "${chapter}" belongs only on ${owner}`);
  }
  for (const [chapter, count] of chapters) {
    if (count > 1 && chapterOwners[chapter] !== pathname) {
      errors.push(`${label}: guide chapter "${chapter}" is duplicated ${count} times`);
    }
  }

  if (pathname === "/help") {
    const directories = allTags.filter((tag) => attribute(tag, "data-help-directory") === "true");
    if (directories.length !== 1 || !/^<nav\b/i.test(directories[0] ?? "")) {
      errors.push(`${label}: expected one help directory nav`);
    }
    const topicTags = allTags.filter((tag) => attribute(tag, "data-help-topic") !== undefined);
    const topics = counts(topicTags.map((tag) => attribute(tag, "data-help-topic")));
    for (const topic of helpTopics) requireOne(topics, topic, "help topic entry");
    for (const tag of topicTags) {
      const topic = attribute(tag, "data-help-topic");
      if (!helpTopics.includes(topic)) {
        errors.push(`${label}: unexpected help topic "${topic}"`);
        continue;
      }
      const target = `/${locale}/help/${topic}`;
      if (!/^<a\b/i.test(tag) || attribute(tag, "href") !== target) {
        errors.push(`${label}: help topic "${topic}" must link directly to ${target}`);
      }
    }
  }

  if (pathname === "/help/interface-guide") {
    for (const chapter of chapters.keys()) {
      if (chapter !== "workspace" && chapter !== "iphone" && !chapterOwners[chapter]) {
        errors.push(`${label}: interface overview must not repeat full guide chapter "${chapter}"`);
      }
    }
    const hrefs = new Set(links.map((tag) => attribute(tag, "href")));
    for (const [anchor, destination] of Object.entries(legacyGuideTargets)) {
      const target = `/${locale}${destination}`;
      if (!hrefs.has(target)) errors.push(`${label}: legacy anchor "${anchor}" needs its topic link ${target}`);
    }
  }

  return errors;
}
