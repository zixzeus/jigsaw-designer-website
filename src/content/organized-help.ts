import type {SiteLocale} from "@/config/seo";
import {getInterfaceGuideCopy} from "./interface-guide";
import {getToolGuideCopy} from "./tool-guide";
import {getIPhoneGuideCopy} from "./iphone-guide";
import type {ArticleContent, ContentSection} from "./types";

// Apply presentation changes after translation. The original catalogs remain
// the source for each locale's task instructions and product limitations.
export function organizeHelpContent(content: ArticleContent, locale: SiteLocale): ArticleContent {
  const copy = getInterfaceGuideCopy(locale);
  const phone = getIPhoneGuideCopy(locale);
  const section = (id: string) => {
    const found = content.sections.find((item) => item.id === id);
    if (!found) throw new Error(`Missing help section: ${content.slug}#${id}`);
    return {...found};
  };
  const link = (href: string, label: string) => ({href, label});
  const chapter = (id: string, title: string, guideChapter: ContentSection["guideChapter"], extra: Partial<ContentSection> = {}): ContentSection => ({id, title, paragraphs: [], guideChapter, ...extra});

  switch (content.slug) {
    case "help/vector-editing": {
      const selection = section("selection");
      return {...content, intro: copy.toolsIntro, sections: [
        chapter("tools", getToolGuideCopy(locale).title, "tools"),
        {...section("canvas"), image: undefined, links: [link("/help/interface-guide#workspace", copy.workspaceTitle)]},
        {...section("tools-panel"), iphoneParagraphs: [phone.selectionText, phone.menuText]},
        chapter("selection", selection.title, "object-inspector", {
          guideIntro: selection.paragraphs.join(" "),
          // Proportions and nested/locked layers are explained in the annotated
          // panels. Retain the additional undo/redo instruction only here.
          bullets: selection.bullets?.slice(3),
        }),
        chapter("layers-nodes", copy.layersTitle, "layers-nodes", {supplements: [section("open-paths")]}),
        chapter("advanced-settings", copy.advancedTitle, "editor-settings", {links: [
          link("/help/project-library#save-settings", copy.saveLabel),
          link("/help/svg-import-export#export", copy.exportLabel),
        ]}),
        {...section("project-info"), image: undefined, links: [link("/help/jigsaw-generation#parameters", copy.parametersTitle)]},
      ]};
    }
    case "help/templates":
      return {...content, sections: [
        chapter("choose", section("choose").title, "template-library", {guideIntro: section("choose").paragraphs.join(" ")}),
        chapter("create", copy.workflowTitle, "template-workflow"),
        {...section("manage"), links: [link("/help/jigsaw-generation#input-geometry", copy.generationTitle)]},
      ]};
    case "help/jigsaw-generation":
      return {...content, intro: content.seoDescription, sections: [
        section("input-geometry"),
        {...section("template"), image: undefined, links: [link("/help/templates#choose", copy.templatesTitle)]},
        chapter("parameters", copy.parametersTitle, "parameters"),
        chapter("run-and-inspect", section("run-and-inspect").title, "generation", {
          guideIntro: [copy.generationIntro, ...section("run-and-inspect").paragraphs].join(" "),
          links: [link("/help/templates#create", copy.workflowTitle), link("/help/vector-editing#layers-nodes", copy.layersTitle)],
        }),
      ]};
    case "help/project-library":
      return {...content, sections: [
        {...section("my-projects"), iphoneGuide: "project-library"},
        chapter("save-settings", copy.saveLabel, "save-settings", {links: [link("/help/svg-import-export#export", copy.exportLabel)]}),
        ...content.sections.filter((item) => item.id !== "my-projects"),
      ]};
    case "help/getting-started":
      return {...content, sections: content.sections.map((item) => ({...item, links: item.id === "create-project"
        ? [link("/help/interface-guide#workspace", copy.title)]
        : item.id === "add-geometry"
          ? [link("/help/vector-editing#tools", copy.toolsTitle)]
          : [link("/help/jigsaw-generation#parameters", copy.parametersTitle), link("/help/project-library#my-projects", copy.saveLabel)],
      }))};
    case "help/svg-import-export":
      return {...content, sections: content.sections.map((item) => item.id === "export"
        ? {...item, note: copy.exportText, iphoneGuide: "svg-export"}
        : item.id === "import" ? {...item, iphoneGuide: "svg-import"} : item)};
    default:
      return content;
  }
}
