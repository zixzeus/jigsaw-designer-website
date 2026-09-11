import {attribute, tags} from "./html.mjs";

function documentMarkup(html) {
  // React's hydration scripts may contain HTML strings. Those are not targets.
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
}

function fragmentTargets(html) {
  const markup = documentMarkup(html);
  const targets = new Set();
  for (const tag of markup.match(/<[a-z][^>]*>/gi) ?? []) {
    const id = attribute(tag, "id");
    if (id) targets.add(id);
  }
  for (const tag of tags(markup, "a")) {
    const name = attribute(tag, "name");
    if (name) targets.add(name);
  }
  return targets;
}

export async function verifyInternalFragments({pages, origin, fetchPage}) {
  const errors = [];
  const targetsByPath = new Map();
  const documents = new Map(pages.map((page) => [page.pathname, page]));
  let checkedCount = 0;

  for (const page of pages) {
    const seen = new Set();
    for (const tag of tags(documentMarkup(page.html), "a")) {
      const href = attribute(tag, "href");
      if (!href) continue;
      let url;
      try {
        url = new URL(href, new URL(page.pathname, origin));
      } catch {
        errors.push(`${page.pathname}: invalid link URL ${href}`);
        continue;
      }
      if (url.origin !== origin || !url.hash) continue;

      // Text fragments are browser directives, not element IDs. A preceding
      // element fragment still needs a real target: #section:~:text=example.
      const fragment = url.hash.slice(1).split(":~:", 1)[0];
      if (!fragment) continue;
      let targetId;
      try {
        targetId = decodeURIComponent(fragment);
      } catch {
        targetId = fragment;
      }
      // HTML defines #top as a document-top fallback without a target element.
      if (targetId.toLowerCase() === "top") continue;
      const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
      const targetKey = `${pathname}#${targetId}`;
      if (seen.has(targetKey)) continue;
      seen.add(targetKey);
      checkedCount += 1;

      if (!targetsByPath.has(pathname)) {
        const target = documents.get(pathname) ?? await fetchPage(pathname);
        targetsByPath.set(pathname, target.response.status === 200
          ? fragmentTargets(target.html)
          : null);
      }
      const targets = targetsByPath.get(pathname);
      if (!targets) {
        errors.push(`${page.pathname}: fragment link ${href} must target a direct 200 page`);
      } else if (!targets.has(targetId)) {
        errors.push(`${page.pathname}: fragment link ${href} has no target "${targetId}" in ${pathname}`);
      }
    }
  }
  return {errors, checkedCount};
}
