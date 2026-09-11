import {attribute} from "./html.mjs";

// Public help topics must ship their phone instructions in the HTML too, so
// narrow screens and no-JavaScript visits never depend on a client-only fetch.
const topicChapters = {
  "/help/interface-guide": ["workspace", "iphone"],
  "/help/vector-editing": ["tools", "object-inspector", "layers-nodes", "editor-settings"],
  "/help/templates": ["template-library", "template-workflow"],
  "/help/jigsaw-generation": ["parameters", "generation"],
  "/help/project-library": ["project-library", "save-settings"],
  "/help/svg-import-export": ["svg-import", "svg-export"],
};

// Preserve the illustrated sequences, not their wording or numbered filenames.
const minimumImages = {tools: 2, "template-workflow": 4, generation: 2, iphone: 2, "svg-import": 2, "svg-export": 2};
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

function parseMarkup(html) {
  const markup = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|textarea|template)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  const root = {children: [], text: ""};
  const stack = [root];
  const nodes = [];
  // Only the rendered element hierarchy is needed here. Quoted attributes may
  // contain >, which must not end a tag or distort platform ancestry.
  const tokens = markup.match(/<\/?[a-z][^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>|[^<]+/gi) ?? [];
  for (const token of tokens) {
    const name = token.match(/^<\/?([a-z][\w:-]*)/i)?.[1]?.toLowerCase();
    if (!name) {
      stack.at(-1).text += token;
      continue;
    }
    if (token.startsWith("</")) {
      const index = stack.findLastIndex((node) => node.name === name);
      if (index > 0) stack.length = index;
      continue;
    }
    const parent = stack.at(-1);
    const node = {name, tag: token, parent, children: [], text: ""};
    parent.children.push(node);
    nodes.push(node);
    if (!voidTags.has(name) && !/\/\s*>$/.test(token)) stack.push(node);
  }
  return nodes;
}

function ancestor(node, predicate) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (predicate(parent)) return parent;
  }
}

function descendants(node) {
  return node.children.flatMap((child) => [child, ...descendants(child)]);
}

const platform = (node) => attribute(node.tag ?? "", "data-guide-platform");

function imagePath(node) {
  const src = attribute(node.tag, "src");
  if (!src) return;
  try {
    const url = new URL(src, "https://jigsawdesigner.com");
    return url.pathname === "/_next/image"
      ? new URL(url.searchParams.get("url") ?? "", url.origin).pathname
      : url.pathname;
  } catch {
    return;
  }
}

export function verifyIPhoneGuides({html, pathname, locale}) {
  const expected = topicChapters[pathname];
  if (!expected) return [];

  const label = `/${locale}${pathname}`;
  const errors = [];
  const nodes = parseMarkup(html);
  const chapterNodes = nodes.filter((node) => attribute(node.tag, "data-iphone-guide") !== undefined);
  for (const chapter of expected) {
    const matches = chapterNodes.filter((node) => attribute(node.tag, "data-iphone-guide") === chapter);
    if (matches.length !== 1) errors.push(`${label}: expected one iPhone guide "${chapter}", found ${matches.length}`);
  }

  for (const node of chapterNodes) {
    const chapter = attribute(node.tag, "data-iphone-guide");
    if (!expected.includes(chapter)) {
      errors.push(`${label}: iPhone guide "${chapter}" does not belong on this topic`);
      continue;
    }
    const wrapper = ancestor(node, (parent) => platform(parent) !== undefined);
    if (platform(wrapper ?? {}) !== "iphone" || ancestor(node, (parent) => platform(parent) === "desktop")) {
      errors.push(`${label}: iPhone guide "${chapter}" must be inside its iPhone platform wrapper`);
    }

    // Shared GuideChapter sections carry a marker; article-only import/export
    // and library demonstrations use a plain section as their local boundary.
    const scope = ancestor(node, (parent) => attribute(parent.tag ?? "", "data-guide-chapter") !== undefined)
      ?? ancestor(node, (parent) => parent.name === "section");
    if (!scope) {
      errors.push(`${label}: iPhone guide "${chapter}" needs its own chapter section`);
      continue;
    }
    // Pair the actual demonstration with its sibling variant. Shared notes can
    // contain their own small platform alternatives deeper in this section;
    // those neither duplicate nor replace the main demonstration pair.
    const siblings = wrapper && ancestor(wrapper, (parent) => parent === scope)
      ? wrapper.parent.children
      : [];
    const phoneWrappers = siblings.filter((item) => platform(item) === "iphone");
    if (phoneWrappers.length !== 1) errors.push(`${label}: guide "${chapter}" needs one local iPhone platform wrapper, found ${phoneWrappers.length}`);

    // The landscape appendix is intentionally iPhone-only. Every replacement
    // chapter must retain desktop content in the same section's server HTML.
    if (chapter !== "iphone") {
      const desktopWrappers = siblings.filter((item) => platform(item) === "desktop");
      if (desktopWrappers.length !== 1) {
        errors.push(`${label}: guide "${chapter}" needs one local desktop platform wrapper, found ${desktopWrappers.length}`);
      } else {
        const desktop = desktopWrappers[0];
        const contents = [desktop, ...descendants(desktop)];
        if (ancestor(desktop, (parent) => platform(parent) === "iphone") || !contents.some((item) => item.text.trim() || ["img", "svg", "video", "iframe"].includes(item.name))) {
          errors.push(`${label}: guide "${chapter}" must retain independent desktop content in server HTML`);
        }
      }
    }

    const images = new Set(descendants(node)
      .filter((item) => item.name === "img")
      .map(imagePath)
      .filter((src) => /^\/guide\/iphone(?:\/|-)/.test(src ?? "")));
    const required = minimumImages[chapter] ?? 1;
    if (images.size < required) {
      errors.push(`${label}: iPhone guide "${chapter}" needs at least ${required} distinct phone screenshots in server HTML, found ${images.size}`);
    }
  }
  return errors;
}
