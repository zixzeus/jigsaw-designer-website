# Dieline anatomy illustration

The `what-is-generated` section of `/[locale]/jigsaw-dieline-generator` reuses the former homepage's numbered `CutlineDiagram` illustration. The section title appears first, followed by the diagram on the left and the existing explanation on the right at desktop widths. Small screens stack the diagram and its legend before the detailed explanation.

`src/components/CutlineDiagram.tsx` preserves the original outer contour, internal cutline paths, interlock detail, central figural piece and marker coordinates. The SVG viewBox removes unused surrounding space while keeping the full drawing visible; larger marker text improves small-screen legibility. This is an explanatory diagram, not a screenshot or an exported app result.

The component accepts the existing `HomePageContent["primer"]` copy. English, Simplified Chinese and Traditional Chinese come from `HOME_PAGES`; the other 30 locales reuse the existing translated `content.home.primer`. This retains all four labels, descriptions and the editable-SVG output note. The article's existing paragraphs and public fragment remain intact, including the explanation that Whimsy pieces need deliberate design/import and are not generated automatically.

`ArticlePage` accepts server-rendered `sectionVisuals` keyed by section ID. The marketing route supplies the diagram only for this topic. The component uses unique SVG title/description IDs, fixes drawing coordinates to LTR and lets the HTML legend inherit the page language direction. It does not add client JavaScript or return this content to the homepage.

Verification: run `npm run check`, then review the section at desktop and 320px widths, including an RTL language. Each of the 33 topic pages should contain exactly one `data-cutline-diagram` figure, four `data-cutline-part` legend entries, valid SVG accessibility references and the original `#what-is-generated` anchor.

Verified on 2026-09-11: the integrated check passed. Generated HTML was checked across all 33 topic pages for a single diagram, all four legend entries and valid SVG label references. Browser review covered Chinese at 1440px and 320px and Arabic RTL at 320px, without horizontal overflow. Captures are stored in the task's `dieline-diagram` visualization folder.
