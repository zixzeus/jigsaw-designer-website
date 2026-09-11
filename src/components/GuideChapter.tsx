import {getTranslations} from "next-intl/server";
import type {ReactNode} from "react";

import type {SiteLocale} from "@/config/seo";
import {getInterfaceGuideCopy, INTERFACE_GUIDE_MEDIA as media} from "@/content/interface-guide";
import GuideScreenshot from "./GuideScreenshot";
import ToolGuide from "./ToolGuide";
import GuidePlatform from "./GuidePlatform";
import IPhoneGuideContent from "./IPhoneGuideContent";
import styles from "./InterfaceGuide.module.css";

export type GuideChapterId =
  | "workspace"
  | "tools"
  | "parameters"
  | "object-inspector"
  | "template-library"
  | "template-workflow"
  | "layers-nodes"
  | "editor-settings"
  | "save-settings"
  | "generation"
  | "iphone";

type Props = {
  locale: SiteLocale;
  chapter: GuideChapterId;
  id?: string;
  number?: number;
  title?: string;
  intro?: string;
  children?: ReactNode;
};

export default async function GuideChapter({locale, chapter, id = chapter, number, title, intro, children}: Props) {
  const help = await getTranslations({locale, namespace: "Help"});
  const copy = getInterfaceGuideCopy(locale);
  const sharedImageProps = {enlargeLabel: copy.enlarge, closeLabel: copy.close};
  const point = (prefix: string) => ({title: help(`${prefix}.title`), text: help(`${prefix}.desc`)});
  const inspectorPoint = (name: string) => point(`interfaceContent.inspector.sections.${name}`);
  const shapePoint = (name: string) => point(`interfaceContent.shapeInfo.sections.${name}`);
  let defaultTitle: string;
  let defaultIntro: string;
  let content: ReactNode;

  if (chapter === "tools") {
    return <section id={id} className={styles.section} data-interface-guide-section={id} data-guide-chapter={chapter}>
      <div className={`${styles.container} ${styles.toolsBlock}`}>
        {number !== undefined && <p className={styles.chapterNumber}>{String(number).padStart(2, "0")}</p>}
        <GuidePlatform platform="desktop"><ToolGuide locale={locale} title={title} intro={intro} /></GuidePlatform>
        <GuidePlatform platform="iphone"><IPhoneGuideContent locale={locale} chapter={chapter} /></GuidePlatform>
        {children && <div className={styles.notes}>{children}</div>}
      </div>
    </section>;
  }

  if (chapter === "iphone") {
    return <div id={id} className={styles.anchor} data-interface-guide-section={id} data-guide-chapter={chapter}><GuidePlatform platform="iphone"><section className={styles.section}>
      <div className={styles.container}><IPhoneGuideContent locale={locale} chapter={chapter} /></div>
    </section></GuidePlatform></div>;
  }

  switch (chapter) {
    case "workspace": {
      const canvasFeatures = help.raw("interfaceContent.canvas.features") as string[];
      defaultTitle = copy.workspaceTitle;
      defaultIntro = copy.workspaceIntro;
      content = <>
        <GuideScreenshot media={media.workspace} alt={copy.workspaceTitle} {...sharedImageProps} />
        <Points columns points={[
          point("interfaceContent.toolbar"),
          {title: [help("interfaceContent.toolsPanel.title"), help("interfaceContent.layersPanel.title"), help("interfaceContent.templatesPanel.title")].join(" · "), text: copy.workspaceSidebar},
          {title: help("interfaceContent.canvas.title"), text: [help("interfaceContent.canvas.desc"), canvasFeatures[1], canvasFeatures[2]].join(" · ")},
          point("interfaceContent.toolsPanel.sections.canvasOps"),
          point("interfaceContent.inspector"),
          {title: help("generationContent.title"), text: help("generationContent.steps.4.desc")},
        ]} />
      </>;
      break;
    }
    case "parameters":
      defaultTitle = copy.parametersTitle;
      defaultIntro = copy.parametersIntro;
      content = <>
        <div className={styles.panelLayout}>
          <GuideScreenshot media={media.parameters} alt={help("interfaceContent.inspector.title")} {...sharedImageProps} />
          <Points points={[
            inspectorPoint("projectInfo"), inspectorPoint("canvasSettings"),
            {title: copy.gridLabel, text: copy.gridText},
            {title: copy.piecesLabel, text: copy.piecesText},
            {title: copy.slotLabel, text: copy.slotText},
            inspectorPoint("operations"),
          ]} />
        </div>
        <Note>{copy.parametersNote}</Note>
      </>;
      break;
    case "object-inspector":
      defaultTitle = copy.inspectorTitle;
      defaultIntro = copy.inspectorIntro;
      content = <>
        <div className={styles.objectLayout}>
          <GuideScreenshot media={media.selectedObject} alt={help("toolsContent.select.title")} {...sharedImageProps} />
          <GuideScreenshot media={media.inspector} alt={help("interfaceContent.shapeInfo.title")} {...sharedImageProps} />
        </div>
        <Points columns points={[
          shapePoint("shapeInfo"), shapePoint("transform"), shapePoint("geometry"),
          {title: copy.styleLabel, text: copy.styleText}, shapePoint("operations"),
        ]} />
        <Note>{copy.inspectorNote}</Note>
      </>;
      break;
    case "template-library": {
      const templateFeatures = help.raw("interfaceContent.templatesPanel.features") as string[];
      defaultTitle = copy.templatesTitle;
      defaultIntro = copy.templatesIntro;
      content = <>
        <div className={styles.panelLayout}>
          <GuideScreenshot media={media.templates} alt={help("interfaceContent.templatesPanel.title")} {...sharedImageProps} />
          <Points points={[
            {title: copy.newTemplateLabel, text: templateFeatures[1]},
            {title: copy.searchLabel, text: templateFeatures[2]},
            point("interfaceContent.templatesPanel.templateTypes.builtin"),
            point("interfaceContent.templatesPanel.templateTypes.custom"),
            {title: copy.chooseTemplateLabel, text: templateFeatures[3]},
          ]} />
        </div>
        <Note>{copy.templatesNote}</Note>
      </>;
      break;
    }
    case "template-workflow":
      defaultTitle = copy.workflowTitle;
      defaultIntro = copy.workflowIntro;
      content = <>
        <ol className={styles.workflow}>
          {[
            {title: copy.step1Title, text: copy.step1Text, image: media.templateNew},
            {title: copy.step2Title, text: copy.step2Text, image: media.templateNodes},
            {title: copy.step3Title, text: copy.step3Text, image: media.templateReady},
            {title: copy.step4Title, text: copy.step4Text, image: media.templateSaved},
          ].map((step, index) => <li key={step.title}>
            <div className={styles.stepHeading}><span className={styles.number}>{index + 1}</span><h3>{step.title}</h3></div>
            <GuideScreenshot media={step.image} alt={step.title} {...sharedImageProps} />
            <p>{step.text}</p>
          </li>)}
        </ol>
        <Note>{copy.workflowNote}</Note>
      </>;
      break;
    case "layers-nodes": {
      const layerFeatures = help.raw("interfaceContent.layersPanel.features") as string[];
      defaultTitle = copy.layersTitle;
      defaultIntro = copy.layersIntro;
      content = <>
        <div className={styles.layersLayout}>
          <GuideScreenshot media={media.layers} alt={help("interfaceContent.layersPanel.title")} {...sharedImageProps} />
          <div className={styles.nodeDetails}>
            <GuideScreenshot media={media.nodes} alt={`${copy.anchorsLabel} · ${copy.handlesLabel}`} {...sharedImageProps} />
            <Points start={5} points={[
              {title: copy.anchorsLabel, text: copy.anchorsText},
              {title: copy.handlesLabel, text: copy.handlesText},
            ]} />
          </div>
        </div>
        <Points columns points={[
          {title: layerFeatures[1]},
          {title: copy.selectLayerLabel, text: copy.selectLayerText},
          {title: layerFeatures[2]},
          {title: layerFeatures[3]},
        ]} />
        <Note>{copy.layersNote}</Note>
      </>;
      break;
    }
    case "editor-settings":
      defaultTitle = help("interfaceContent.advancedSettings.sections.editor.title");
      defaultIntro = help("interfaceContent.advancedSettings.sections.editor.desc");
      content = <>
        <div className={styles.comparison}>
          {[
            {title: help("interfaceContent.advancedSettings.sections.editor.title"), image: media.editorSettings},
            {title: copy.pencilDistanceLabel, image: media.pencilSettings},
          ].map((item) => <div key={item.title}><h3>{item.title}</h3><GuideScreenshot media={item.image} alt={item.title} {...sharedImageProps} /></div>)}
        </div>
        <Points columns points={[
          {title: help("interfaceContent.advancedSettings.sections.language.title"), text: `${help("interfaceContent.advancedSettings.sections.language.desc")} ${help("interfaceContent.advancedSettings.sections.subscription.desc")}`},
          {title: help("interfaceContent.advancedSettings.sections.editor.title")},
          {title: copy.pencilDistanceLabel, text: copy.pencilDistanceText},
          {title: help("interfaceContent.inspector.sections.jigsawSettings.title"), text: copy.advancedNote},
        ]} />
      </>;
      break;
    case "save-settings":
      defaultTitle = copy.saveLabel;
      defaultIntro = copy.saveText;
      content = <div className={styles.panelLayout}>
        <GuideScreenshot media={media.exportSettings} alt={`${copy.exportLabel} · ${copy.saveLabel}`} {...sharedImageProps} />
        <Points start={5} points={[
          {title: copy.exportLabel, text: copy.exportText},
          {title: copy.saveLabel},
        ]} />
      </div>;
      break;
    case "generation":
      defaultTitle = copy.generationTitle;
      defaultIntro = copy.generationIntro;
      content = <>
        <div className={styles.comparison}>
          <div><h3><span className={styles.number}>1</span>{copy.before}</h3><GuideScreenshot media={media.generationBefore} alt={`${copy.before} · Website Demo Wave`} {...sharedImageProps} /></div>
          <div><h3><span className={styles.number}>2</span>{copy.after}</h3><GuideScreenshot media={media.generationAfter} alt={`${copy.after} · Website Demo Wave`} {...sharedImageProps} /></div>
        </div>
        <Points columns points={[
          {title: copy.before, text: help("generationContent.steps.1.desc")},
          {title: copy.parametersTitle, text: help("generationContent.steps.3.desc")},
          {title: copy.after, text: help("generationContent.steps.4.desc")},
        ]} />
        <Note>{copy.generationNote}</Note>
      </>;
      break;
  }

  const heading = title ?? defaultTitle;
  const description = intro ?? defaultIntro;
  return <section id={id} className={styles.section} data-interface-guide-section={id} data-guide-chapter={chapter}>
    <div className={styles.container}>
      <GuidePlatform platform="desktop">
      <header className={styles.sectionHeading}>
        {number !== undefined && <span className={styles.chapterNumber}>{String(number).padStart(2, "0")}</span>}
        <div><h2>{heading}</h2>{description && <p className={styles.sectionIntro}>{description}</p>}</div>
      </header>
      {content}
      </GuidePlatform>
      <GuidePlatform platform="iphone"><IPhoneGuideContent locale={locale} chapter={chapter} /></GuidePlatform>
      {children && <div className={styles.notes}>{children}</div>}
    </div>
  </section>;
}

function Points({points, columns, start = 1}: {points: {title: string; text?: string}[]; columns?: boolean; start?: number}) {
  return <ol start={start} className={`${styles.points} ${columns ? styles.pointsColumns : ""}`}>
    {points.map((item, index) => <li key={`${index}-${item.title}`}><span className={styles.number} aria-hidden="true">{index + start}</span><div><h3>{item.title}</h3>{item.text ? <p>{item.text}</p> : null}</div></li>)}
  </ol>;
}

function Note({children}: {children: ReactNode}) {
  return <p className={styles.note}>{children}</p>;
}
