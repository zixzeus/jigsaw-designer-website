# Software interface guide and help topics

The Help Center has one directory with nine topic destinations. `/help/interface-guide` contains the annotated workspace, the distinction between project settings and selected-object properties, and links to the relevant topics. Desktop visitors see the existing Mac guide; phone visitors see the corresponding iPhone captures and instructions, plus the landscape guide. Full tool, template, parameter and generation tutorials remain in their respective topics.

The nine macOS guide boards from Figma file `NqkKDv45BF9Jcyc5Mec4tP` have been redistributed by task. Each full demonstration has one primary location; other pages provide a short explanation and a precise link. Quick Start remains a first-project walkthrough, and SVG import/export, project management, keyboard shortcuts and troubleshooting retain their independent guidance. At the user's request, the homepage SVG editing section and guide preview remain removed; the devices section leads directly into the artwork showcase.

## Content ownership

| Content | Primary destination |
| --- | --- |
| Workspace, panels and selection-dependent inspector | `/help/interface-guide#workspace` |
| iPhone landscape layout (mobile only) | `/help/interface-guide#iphone` |
| Eight drawing tools, before/action and after/result demonstrations | `/help/vector-editing#tools` |
| Selected-object properties | `/help/vector-editing#selection` |
| Layers, anchor points, handles and open-path guidance | `/help/vector-editing#layers-nodes` |
| Editor settings, Pencil distances and applying settings | `/help/vector-editing#advanced-settings` |
| Template library and choosing a connection style | `/help/templates#choose` |
| Four-step custom-template workflow | `/help/templates#create` |
| Canvas and puzzle-generation parameters | `/help/jigsaw-generation#parameters` |
| Generation comparison and result inspection | `/help/jigsaw-generation#run-and-inspect` |
| Save, iCloud and the export/settings screenshot | `/help/project-library#save-settings` |

The old vector-editing `#open-paths` anchor remains inside the layers/nodes section. Template management, input-geometry requirements, project sharing, SVG import and Premium export rules remain in their respective topics. The advanced-settings board is split between editor guidance and save/iCloud guidance without discarding its screenshots or explanations. Export instructions have their primary home at `/help/svg-import-export#export`.

`src/components/GuideChapter.tsx` renders reusable annotated chapters, while `src/content/organized-help.ts` combines each chapter with the existing topic's unique instructions after localization. This preserves the original translated content catalogs and avoids embedding the same full guide on multiple pages. The `data-guide-chapter` attribute identifies a demonstration independently of its public section anchor.

## Responsive iPhone guides

Figma page `64:30` contains seven boards: workspace `66:30`, tools `67:42`, properties `72:52`, template creation `68:48`, generation/layers `73:62`, files/projects `75:70`, and landscape `76:78`. All seven subjects are implemented across the existing topic destinations. Desktop guide demonstrations retain their original screenshots and interactions.

`GuidePlatform` selects the iPhone layout below 768 CSS pixels, and on coarse-pointer/no-hover screens up to 1023px so a landscape phone continues to show phone instructions. CSS selects the server-rendered variant before hydration and without JavaScript; `useSyncExternalStore` then removes the inactive variant and responds to resizing. Guide images are lazy-loaded, with no unconditional desktop-image preload. Public section IDs remain shared and unique, including the retained `#iphone` anchor.

`IPhoneGuideContent` provides 14 topic chapters with selectable, expandable real screenshots and HTML annotations. The workspace explains all six main controls; tools show the eight-tool order, selection actions and Pencil options; properties distinguish project parameters from object settings; templates include all four steps; generation has the matching triangle before/after; Layers explains editable group children; SVG includes the menu, save picker, import picker and reopened result; project management and landscape each have their actual layouts. Mobile topic pages suppress unrelated Mac panel screenshots while retaining technical requirements and limitations in text.

The iPhone-specific copy is maintained in `src/content/iphone-guide-locales/` for all 33 locales (32 strings per locale), alongside shared translated guide terminology. `IPHONE_GUIDE_MEDIA` contains the annotation coordinates. Seventeen additional assets are lossless WebP encodings of the existing captures, with the two landscape images rotated clockwise by 90 degrees as recorded by the capture manifest. Three previously integrated iPhone images are reused. No UI was redrawn or recolored. Source hashes, dimensions and rotation are recorded in `public/guide/source-manifest.json`.

The template example is the open polyline `iPhone Demo Tab`, not the Mac `Website Demo Wave` curve. `104 items` describes children in the generated group and is not claimed as a count of independent puzzle pieces. The images show UI states and do not measure generation speed. Main-canvas SVG export remains a Premium feature.

`scripts/lib/iphone-guide.mjs` checks all 14 chapters in generated HTML across six topics, including platform pairing, chapter ownership, and multiple distinct images for complete workflows. Its regression tests also ensure that shared platform-specific notes cannot substitute for a missing primary demonstration.

Verified this responsive pass on 2026-09-11:

- The integrated content, lint, production build, TypeScript and SEO gate passed for 33 locales, 759 sitemap URLs, 825 direct targets, 3,597 fragment links and 68 media assets. All 14 focused guide/organization tests passed. A final long-word wrapping adjustment was rebuilt successfully.
- At 1440px, the workspace and vector-editing topic contained only desktop guide images. Selecting Pencil continued to switch the original desktop tool demonstration.
- At 390px, the workspace and four-step template guide displayed iPhone captures. Image enlargement, Escape close and focus restoration worked.
- At 320px, tools, generation, SVG import/export and project-library pages contained the expected phone chapters and no Mac screenshots. No horizontal overflow was found. German tool names wrap within their columns; Arabic templates preserve RTL text and LTR screenshots.
- At a 740 × 430 viewport, the landscape guide displayed correctly proportioned 2868 × 1320 images without horizontal overflow. These are browser viewport checks, not an additional physical-device or simulator Safari acceptance run.
- Evidence is saved in `iphone-guide-web-qa/` under the dated visualization workspace. The local preview remains on port 3101; no publishing was performed.

## Existing links

All former `/help/interface-guide` chapter fragments remain available. `#workspace` and `#iphone` still identify full sections. The moved fragments have visible HTML fallback links with the same IDs:

| Former guide fragment | Destination |
| --- | --- |
| `#tools` | `/help/vector-editing#tools` |
| `#parameters` | `/help/jigsaw-generation#parameters` |
| `#object-inspector` | `/help/vector-editing#selection` |
| `#template-library` | `/help/templates#choose` |
| `#template-workflow` | `/help/templates#create` |
| `#layers-nodes` | `/help/vector-editing#layers-nodes` |
| `#advanced-settings` | `/help/vector-editing#advanced-settings` |
| `#generation` | `/help/jigsaw-generation#run-and-inspect` |

`src/content/guide-destinations.ts` defines these destinations. `src/components/LegacyGuideRedirect.tsx` reads the fragment on initial load and on `hashchange`, then uses the localized `router.replace` with scrolling to navigate to the corresponding topic. The current language is preserved, and the fallback links remain usable without JavaScript. Existing language routes, canonical URLs, hreflang and sitemap entries remain in place.

## Content and media

- The interface and tool copy live in separate 33-locale JSON registries. The content gate checks key parity, nonempty translations, placeholders, and product claims.
- All guide screenshots, numbered annotations, explanations and tool demonstrations are retained in their topic destinations. Screenshot annotations and explanations are responsive HTML, with a keyboard-accessible enlarged view. The tool demonstrations switch between real before/action and after/result screenshots; they are not videos or simulated App controls.
- `public/guide/source-manifest.json` records original captures and crops. `src/config/media.ts` reserves intrinsic dimensions for all images.
- Figma frames: workspace `44:56`, tools `41:30`, parameters `45:68`, properties `42:46`, templates `46:80`, template workflow `51:114`, layers/nodes `47:90`, advanced settings `48:103`, generation `54:118`.

## Capture evidence

The macOS captures use the English Xcode Debug application, version 1.6.1 (38). Tool actions were performed in the separate local project `Website — Eight Tools`. The iPhone images come from the iPhone 17 Pro Max simulator running iOS 26.5. No new iPad captures or native code changes were made for this guide.

The tool sequence covers selection/movement, anchor movement, a Pencil stroke and its smoothness options, a line, a rectangle, a circle drawn from its centre, a closed polygon, and an open Bézier curve finished with Enter. Arrows and numbered clicks represent the captured gestures. The template workflow uses `Website Demo Wave` and includes a matching generation example.

These images demonstrate UI behavior, not release acceptance or a speed benchmark. The guide distinguishes generation-grid settings from the visible editor grid, target piece count from actual output, and slot segment-length limits from kerf or physical spacing. SVG export remains a Premium feature.

## Verification

Run `npm run check` for content, lint, production build, TypeScript and generated-route/SEO checks. `scripts/verify-built-site.mjs` now calls `scripts/lib/help-organization.mjs` to check the consolidated directory, demonstration ownership, retained public anchors and localized fallback destinations in generated HTML. The focused regression cases live in `scripts/lib/help-organization.test.mjs` and can be run with `node --test scripts/lib/help-organization.test.mjs`.

Review the orientation page and each revised topic at desktop and small-screen widths, including long translations and RTL. Check old guide fragment navigation, language preservation, tool selection, action/result switching, enlarged-image panning, Escape and focus restoration. Confirm that the full tool demonstration appears only in the vector-editing topic and that every screenshot remains reachable from the help directory.

Verified this consolidation on 2026-09-11:

- `npm run check` passed for all 33 locales, including content validation, lint, TypeScript, production build and generated-route/SEO checks. The generated-site checks covered 759 sitemap URLs, 825 direct internal targets, 3,564 fragment links and 51 media assets.
- All six focused help-organization regression tests passed. They check topic ownership, retained anchors and migration destinations.
- The local production preview showed one nine-topic directory in Chinese and German at 1440px, without horizontal overflow. Chinese mobile and Arabic RTL at 320px also had no horizontal overflow.
- The overview contains only the workspace and iPhone chapters. The template topic retains four illustrated creation steps. The eight drawing-tool controls and action/result switch remained functional.
- Legacy Chinese tool and template-workflow links and the Arabic parameter link navigated to the appropriate topic and fragment while preserving the language.

Browser evidence for this earlier consolidation pass is stored in `help-content-audit/` in the dated local evidence workspace (captures `04` through `10`). That pass did not repeat the complete keyboard, image-panning or focus-restoration audit. Its checks describe local validation before the release.
