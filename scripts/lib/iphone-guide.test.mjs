import assert from "node:assert/strict";
import test from "node:test";
import {verifyIPhoneGuides} from "./iphone-guide.mjs";

const check = (pathname, html, locale = "zh-Hans") => verifyIPhoneGuides({pathname, html, locale});
const screenshot = (name) => `<img src="/guide/iphone/${name}.webp" width="1320" height="2868" alt="示例" />`;
const chapter = (name, imageCount = 1, desktop = true) => `<section data-guide-chapter="${name}">
  ${desktop ? '<div data-guide-platform="desktop"><p>桌面操作说明</p><img src="/guide/mac.webp" /></div>' : ""}
  <div data-guide-platform="iphone"><div data-iphone-guide="${name}"><h2>手机操作说明</h2>
    ${Array.from({length: imageCount}, (_, index) => screenshot(`${name}-${index}`)).join("")}
  </div></div>
</section>`;
const templates = () => chapter("template-library") + chapter("template-workflow", 4);

test("accepts all topic chapters with both server-rendered platform variants", () => {
  const pages = [
    ["/help/interface-guide", chapter("workspace") + chapter("iphone", 2, false)],
    ["/help/vector-editing", chapter("tools", 2) + chapter("object-inspector") + chapter("layers-nodes") + chapter("editor-settings")],
    ["/help/templates", templates()],
    ["/help/jigsaw-generation", chapter("parameters") + chapter("generation", 2)],
    ["/help/project-library", chapter("project-library") + chapter("save-settings")],
    ["/help/svg-import-export", chapter("svg-import", 2) + chapter("svg-export", 2)],
  ];
  for (const [pathname, html] of pages) {
    assert.deepEqual(check(pathname, html), [], pathname);
    assert.deepEqual(check(pathname, html, "ar"), [], pathname);
  }
});

test("requires exactly one phone chapter on its topic and rejects misplaced chapters", () => {
  assert.match(check("/help/templates", chapter("template-library")).join("\n"), /iPhone guide "template-workflow", found 0/);
  assert.match(check("/help/templates", templates() + chapter("template-workflow", 4)).join("\n"), /iPhone guide "template-workflow", found 2/);
  assert.match(check("/help/templates", templates() + chapter("tools", 2)).join("\n"), /iPhone guide "tools" does not belong/);
});

test("requires phone containment and a desktop counterpart within each chapter", () => {
  const missingPhone = templates().replace('data-guide-platform="iphone"', 'data-platform="iphone"');
  assert.match(check("/help/templates", missingPhone).join("\n"), /template-library.*inside its iPhone platform wrapper/);
  const missingDesktop = chapter("template-library", 1, false) + chapter("template-workflow", 4);
  assert.match(check("/help/templates", missingDesktop).join("\n"), /template-library.*local desktop platform wrapper, found 0/);
  const outsideDesktop = '<div data-guide-platform="desktop"><p>Elsewhere</p></div>' + missingDesktop;
  assert.match(check("/help/templates", outsideDesktop).join("\n"), /template-library.*local desktop platform wrapper, found 0/);
  const emptyDesktop = templates().replace('<p>桌面操作说明</p><img src="/guide/mac.webp" />', "");
  assert.match(check("/help/templates", emptyDesktop).join("\n"), /template-library.*independent desktop content/);
  const wrappedInDesktop = `<div data-guide-platform="desktop">${templates()}</div>`;
  assert.match(check("/help/templates", wrappedInDesktop).join("\n"), /inside its iPhone platform wrapper/);
});

test("accepts article sections without shared chapter markers and existing phone asset paths", () => {
  const html = (chapter("svg-import", 2) + chapter("svg-export", 2))
    .replace(/ data-guide-chapter="[^"]+"/g, "")
    .replace('/guide/iphone/svg-import-0.webp', '/guide/iphone-workspace-v1.webp')
    .replace('/guide/iphone/svg-export-0.webp', '/_next/image?url=%2Fguide%2Fiphone%2Fexport.webp&amp;w=1320&amp;q=75');
  assert.deepEqual(check("/help/svg-import-export", html), []);
});

test("pairs demonstration siblings independently of platform-specific shared notes", () => {
  const notes = `<aside><div>
    <div data-guide-platform="desktop"><p>Desktop inspector note</p></div>
    <div data-guide-platform="iphone"><p>Phone inspector note</p></div>
  </div><div>
    <div data-guide-platform="desktop"><p>Desktop selection note</p></div>
    <div data-guide-platform="iphone"><p>Phone selection note</p></div>
  </div></aside>`;
  const workspace = chapter("workspace").replace('</section>', `${notes}</section>`);
  const appendix = chapter("iphone", 2, false);
  assert.deepEqual(check("/help/interface-guide", workspace + appendix), []);
  const missingDesktop = chapter("workspace", 1, false).replace('</section>', `${notes}</section>`);
  assert.match(check("/help/interface-guide", missingDesktop + appendix).join("\n"), /workspace.*local desktop platform wrapper, found 0/);
});

test("requires distinct phone screenshots for complete illustrated sequences", () => {
  const desktopImage = templates().replace('/guide/iphone/template-library-0.webp', '/guide/desktop-template.webp');
  assert.match(check("/help/templates", desktopImage).join("\n"), /template-library.*at least 1 distinct phone screenshots.*found 0/);
  const tooShort = chapter("template-library") + chapter("template-workflow", 3);
  assert.match(check("/help/templates", tooShort).join("\n"), /template-workflow.*at least 4 distinct phone screenshots.*found 3/);
  const duplicate = templates().replace('/guide/iphone/template-workflow-3.webp', '/guide/iphone/template-workflow-2.webp');
  assert.match(check("/help/templates", duplicate).join("\n"), /template-workflow.*found 3/);
  const generation = chapter("parameters") + chapter("generation");
  assert.match(check("/help/jigsaw-generation", generation).join("\n"), /generation.*at least 2 distinct phone screenshots.*found 1/);
});

test("ignores inert and hydration markup rather than counting it as phone guidance", () => {
  const html = `<!-- ${templates()} --><script>self.__next_f.push('${templates()}')</script><template>${templates()}</template><textarea>${templates()}</textarea>`;
  const errors = check("/help/templates", html);
  assert.equal(errors.length, 2);
  assert.ok(errors.every((error) => /expected one iPhone guide.*found 0/.test(error)));
  const fakeScreenshot = chapter("template-library", 0).replace('</h2>', `</h2><script>'${screenshot("hidden")}'</script>`) + chapter("template-workflow", 4);
  assert.match(check("/help/templates", fakeScreenshot).join("\n"), /template-library.*found 0/);
});

test("does not impose phone chapters on unrelated pages", () => {
  for (const pathname of ["/", "/help", "/help/getting-started", "/help/keyboard-shortcuts", "/learn/svg"])
    assert.deepEqual(check(pathname, '<div data-iphone-guide="unexpected"></div>'), []);
});
