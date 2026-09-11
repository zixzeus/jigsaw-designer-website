import type {ReactNode} from "react";
import {getTranslations} from "next-intl/server";
import type {SiteLocale} from "@/config/seo";
import {getInterfaceGuideCopy, type GuideMedia} from "@/content/interface-guide";
import {getIPhoneGuideCopy} from "@/content/iphone-guide";
import {IPHONE_GUIDE_MEDIA as media} from "@/content/iphone-guide-media";
import {getToolGuideCopy} from "@/content/tool-guide";
import GuideScreenshot from "./GuideScreenshot";
import type {GuideChapterId} from "./GuideChapter";
import styles from "./InterfaceGuide.module.css";

export type IPhoneExtraChapter = "project-library" | "svg-import" | "svg-export";

export default async function IPhoneGuideContent({locale, chapter, showHeading = true}: {
  locale: SiteLocale; chapter: GuideChapterId | IPhoneExtraChapter; showHeading?: boolean;
}) {
  const copy = getInterfaceGuideCopy(locale);
  const phone = getIPhoneGuideCopy(locale);
  const tools = getToolGuideCopy(locale);
  const help = await getTranslations({locale, namespace: "Help"});
  const screenshot = (image: GuideMedia, title: string) => <GuideScreenshot media={image} alt={`iPhone · ${title}`} enlargeLabel={copy.enlarge} closeLabel={copy.close} className={image.width > image.height ? styles.phoneLandscape : styles.phonePortrait} />;
  const point = (title: string, text?: string) => ({title, text});
  const note = (text: string) => <p className={styles.note}>{text}</p>;
  const card = (title: string, image: GuideMedia, text?: string, number?: number) => <div className={styles.phoneCard} key={image.src}>
    <h3 className={styles.stepHeading}>{number !== undefined && <span className={styles.number}>{number}</span>}{title}</h3>
    {screenshot(image, title)}
    {text && <p className={styles.phoneCaption}>{text}</p>}
  </div>;
  let title: string;
  let intro: string | undefined;
  let content: ReactNode;

  switch (chapter) {
    case "workspace":
      title = copy.workspaceTitle;
      intro = phone.workspaceIntro;
      content = <>{screenshot(media.workspace, title)}<PhonePoints points={[
        point(phone.menuLabel, phone.menuText), point(phone.libraryLabel, phone.libraryText),
        point(phone.historyLabel, phone.historyText), point(help("sections.generation"), phone.generateText),
        point(help("sections.tools"), phone.toolsText),
        point([help("interfaceContent.layersPanel.title"), help("interfaceContent.templatesPanel.title"), help("interfaceContent.inspector.title")].join(" · "), phone.panelsText),
      ]} /></>;
      break;
    case "tools":
      title = phone.toolsTitle;
      intro = phone.toolsIntro;
      content = <>
        <ol className={styles.phoneToolList}>{Object.values(tools.tools).map((tool) => <li key={tool.name}>{tool.name}</li>)}</ol>
        <div className={styles.phoneSequence}>
          {card(phone.selectionLabel, media.selection, phone.selectionText, 1)}
          {card(phone.pencilLabel, media.pencil, phone.pencilText, 2)}
        </div>
      </>;
      break;
    case "parameters":
      title = copy.parametersTitle;
      intro = phone.parametersIntro;
      content = <>{screenshot(media.parameters, title)}<PhonePoints points={[
        point(help("interfaceContent.inspector.sections.canvasSettings.title"), copy.parametersNote),
        point(`${copy.gridLabel} · ${copy.piecesLabel}`, `${copy.gridText} ${copy.piecesText}`),
        point(copy.slotLabel, copy.slotText),
      ]} /></>;
      break;
    case "object-inspector":
      title = copy.inspectorTitle;
      intro = phone.inspectorIntro;
      content = <>{screenshot(media.properties, title)}<PhonePoints points={[
        point(help("interfaceContent.shapeInfo.sections.transform.title"), `${help("interfaceContent.shapeInfo.sections.transform.desc")} ${copy.inspectorNote}`),
        point(copy.styleLabel, copy.styleText),
      ]} /></>;
      break;
    case "template-library":
      title = copy.templatesTitle;
      intro = copy.templatesIntro;
      content = <>{screenshot(media.templates, title)}<PhonePoints points={[
        point(copy.newTemplateLabel, copy.step1Text), point(copy.searchLabel, (help.raw("interfaceContent.templatesPanel.features") as string[])[2]),
        point(copy.chooseTemplateLabel, copy.templatesNote),
      ]} /></>;
      break;
    case "template-workflow":
      title = copy.workflowTitle;
      intro = phone.templateIntro;
      content = <><div className={styles.phoneSequence}>
        {card(copy.newTemplateLabel, {...media.templates, markers: media.templates.markers?.slice(0, 1)}, copy.step1Text, 1)}
        {card(phone.templateDrawTitle, media.templateDraw, phone.templateDrawText, 2)}
        {card(copy.step3Title, media.templateEdit, phone.templateEditText, 3)}
        {card(copy.step4Title, media.templateSaved, phone.templateSavedText, 4)}
      </div>{note(copy.workflowNote)}</>;
      break;
    case "generation":
      title = copy.generationTitle;
      intro = phone.generationIntro;
      content = <><div className={styles.phoneSequence}>
        {card(copy.before, media.before, help("generationContent.steps.1.desc"), 1)}
        {card(copy.after, media.after, phone.generateText, 2)}
      </div>{note(copy.generationNote)}</>;
      break;
    case "layers-nodes":
      title = copy.layersTitle;
      intro = copy.layersIntro;
      content = <>{screenshot(media.layers, help("interfaceContent.layersPanel.title"))}<PhonePoints points={[
        point(help("interfaceContent.layersPanel.title"), phone.layersText),
        point((help.raw("interfaceContent.layersPanel.features") as string[])[3]),
      ]} />{note(`${copy.anchorsText} ${copy.handlesText}`)}</>;
      break;
    case "editor-settings":
    case "save-settings":
      title = chapter === "save-settings" ? copy.saveLabel : copy.advancedTitle;
      intro = phone.settingsText;
      content = <>{screenshot(media.settings, title)}{note(chapter === "save-settings" ? copy.saveText : copy.advancedNote)}</>;
      break;
    case "project-library":
      title = phone.libraryLabel;
      content = <>{screenshot(media.library, title)}<PhonePoints points={[
        point(phone.libraryLabel, phone.libraryText), point(help("sections.projectLibrary"), help("projectLibraryContent.myProjects.desc")),
      ]} /></>;
      break;
    case "svg-export":
      title = copy.exportLabel;
      content = <div className={styles.phoneSequence}>
        {card(phone.menuLabel, media.menu, phone.menuText, 1)}
        {card(copy.exportLabel, media.exportSave, phone.exportText, 2)}
      </div>;
      break;
    case "svg-import":
      title = help("importExportContent.import.title");
      intro = help("importExportContent.import.desc");
      content = <div className={styles.phoneSequence}>
        {card(title, media.importPicker)}
        {card(tools.afterLabel, media.imported, phone.importText)}
      </div>;
      break;
    case "iphone":
      title = phone.landscapeTitle;
      intro = phone.landscapeIntro;
      content = <><div className={styles.phoneSequence}>
        {card(copy.workspaceTitle, media.landscape, phone.landscapeTools, 1)}
        {card(help("interfaceContent.layersPanel.title"), media.landscapeSidebar, phone.landscapeSidebar, 2)}
      </div></>;
      break;
  }

  return <div className={styles.phoneGuide} data-iphone-guide={chapter}>
    {showHeading ? <header className={styles.sectionHeading}><div><p className={styles.eyebrow}>iPhone</p><h2>{title}</h2>{intro && <p className={styles.sectionIntro}>{intro}</p>}</div></header> : intro && <p className={styles.phoneCaption}>{intro}</p>}
    {content}
  </div>;
}

function PhonePoints({points}: {points: {title: string; text?: string}[]}) {
  return <ol className={styles.points}>{points.map((item, index) => <li key={item.title}>
    <span className={styles.number} aria-hidden="true">{index + 1}</span>
    <div><h3>{item.title}</h3>{item.text && <p>{item.text}</p>}</div>
  </li>)}</ol>;
}
