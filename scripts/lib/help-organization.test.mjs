import assert from "node:assert/strict";
import test from "node:test";
import {verifyHelpOrganization} from "./help-organization.mjs";

const locale = "zh-Hans";
const check = (pathname, html, language = locale) => verifyHelpOrganization({pathname, html, locale: language});
const anchors = (...ids) => ids.map((id) => `<section id="${id}"></section>`).join("");
const chapters = (...names) => names.map((name) => `<section data-guide-chapter="${name}"></section>`).join("");
const directory = (language = locale) => `<nav data-help-directory="true">${[
  "getting-started", "interface-guide", "vector-editing", "templates", "jigsaw-generation",
  "svg-import-export", "project-library", "keyboard-shortcuts", "troubleshooting",
].map((topic) => `<a data-help-topic="${topic}" href="/${language}/help/${topic}">Topic</a>`).join("")}</nav>`;

test("accepts the single help directory with nine localized topic destinations", () => {
  assert.deepEqual(check("/help", directory()), []);
  assert.deepEqual(check("/help", directory("ar"), "ar"), []);
});

test("rejects missing or repeated directory entries and links to another locale", () => {
  const missing = directory().replace(/<a data-help-topic="templates"[^>]*>Topic<\/a>/, "");
  assert.match(check("/help", missing).join("\n"), /help topic entry "templates", found 0/);
  const repeated = directory() + '<a data-help-topic="templates" href="/zh-Hans/help/templates">Again</a>';
  assert.match(check("/help", repeated).join("\n"), /help topic entry "templates", found 2/);
  assert.match(check("/help", directory("en")).join("\n"), /must link directly to \/zh-Hans\/help/);
  assert.match(check("/help", directory().replace("<nav ", "<div ").replace("</nav>", "</div>")).join("\n"), /help directory nav/);
});

test("retains the reduced overview and routes all former chapters to their topics", () => {
  const targets = {
    tools: "vector-editing#tools",
    parameters: "jigsaw-generation#parameters",
    "object-inspector": "vector-editing#selection",
    "template-library": "templates#choose",
    "template-workflow": "templates#create",
    "layers-nodes": "vector-editing#layers-nodes",
    "advanced-settings": "vector-editing#advanced-settings",
    generation: "jigsaw-generation#run-and-inspect",
  };
  const html = anchors("workspace", "iphone") + chapters("workspace", "iphone") + Object.entries(targets)
    .map(([id, target]) => `<a id="${id}" href="/zh-Hans/help/${target}">Topic</a>`).join("");
  assert.deepEqual(check("/help/interface-guide", html), []);
  assert.match(check("/help/interface-guide", html.replace('id="tools"', 'data-id="tools"')).join("\n"), /retained anchor "tools", found 0/);
  assert.match(check("/help/interface-guide", html.replace("vector-editing#tools", "vector-editing#wrong")).join("\n"), /legacy anchor "tools" needs its topic link/);
  assert.match(check("/help/interface-guide", html + chapters("tools")).join("\n"), /full guide chapter "tools" belongs only on/);
  assert.match(check("/help/interface-guide", html + chapters("object-inspector")).join("\n"), /full guide chapter "object-inspector" belongs only on/);
});

test("accepts consolidated topics and their original public anchors", () => {
  const cases = [
    ["/help/vector-editing", anchors("selection", "canvas", "tools", "tools-panel", "project-info", "open-paths", "layers-nodes", "advanced-settings") + chapters("tools", "object-inspector", "layers-nodes", "editor-settings")],
    ["/help/templates", anchors("choose", "create", "manage") + chapters("template-library", "template-workflow")],
    ["/help/jigsaw-generation", anchors("input-geometry", "template", "parameters", "run-and-inspect") + chapters("parameters", "generation")],
    ["/help/project-library", anchors("my-projects", "project-menu", "public-projects", "shared-projects") + chapters("save-settings")],
    ["/help/svg-import-export", anchors("import", "project-package", "export")],
  ];
  for (const [pathname, html] of cases) assert.deepEqual(check(pathname, html), [], pathname);
});

test("detects repeated demonstrations and loss of independent management guidance", () => {
  const templates = anchors("choose", "create", "manage") + chapters("template-library", "template-workflow");
  assert.match(check("/help/templates", templates + chapters("template-workflow")).join("\n"), /guide chapter "template-workflow", found 2/);
  assert.match(check("/help/templates", templates.replace('id="manage"', 'data-id="manage"')).join("\n"), /retained anchor "manage", found 0/);
  assert.match(check("/help/templates", templates + anchors("manage")).join("\n"), /retained anchor "manage", found 2/);
  assert.match(check("/help/templates", templates + chapters("tools")).join("\n"), /full guide chapter "tools" belongs only on/);
});

test("does not count hydration, comments or inert markup as user-facing guidance", () => {
  const inert = `
    <!-- <section id="import"></section> -->
    <script>self.__next_f.push('<section id="project-package"></section>')</script>
    <template><section id="export"></section></template>
  `;
  const errors = check("/help/svg-import-export", inert);
  assert.equal(errors.length, 3);
  assert.ok(errors.every((error) => error.includes("found 0")));
  assert.deepEqual(check("/", directory() + chapters("tools")), []);
});
