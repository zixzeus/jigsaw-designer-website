import {getTranslations} from "next-intl/server";
import type {SiteLocale} from "@/config/seo";
import {getToolGuideCopy, TOOL_GUIDE_ITEMS, TOOL_GUIDE_TOOLBAR} from "@/content/tool-guide";
import ToolDemonstrations from "./ToolDemonstrations";

export default async function ToolGuide({locale, title, intro}: {locale: SiteLocale; title?: string; intro?: string}) {
  const help = await getTranslations({locale, namespace: "Help"});
  const copy = getToolGuideCopy(locale);
  return <ToolDemonstrations
    copy={{...copy, title: title ?? copy.title, intro: intro ?? copy.intro}}
    items={TOOL_GUIDE_ITEMS}
    toolbar={TOOL_GUIDE_TOOLBAR}
    importGuide={{title: help("importExportContent.import.title"), description: help("importExportContent.import.desc")}}
  />;
}
