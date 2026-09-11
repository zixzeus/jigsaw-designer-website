import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";

import Breadcrumbs from "@/components/Breadcrumbs";
import GuideChapter from "@/components/GuideChapter";
import GuidePlatform from "@/components/GuidePlatform";
import LegacyGuideRedirect from "@/components/LegacyGuideRedirect";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "@/components/InterfaceGuide.module.css";
import {PRODUCT_FACTS} from "@/config/product";
import {FULL_CONTENT_LOCALES, isRouteAvailable, isSiteLocale} from "@/config/seo";
import {getInterfaceGuideCopy} from "@/content/interface-guide";
import {getIPhoneGuideCopy} from "@/content/iphone-guide";
import {Link} from "@/i18n/navigation";
import {LEGACY_GUIDE_DESTINATIONS} from "@/content/guide-destinations";
import {createBreadcrumbJsonLd, createPageMetadata, localizedAbsoluteUrl} from "@/lib/seo";

const pathname = "/help/interface-guide";
type Params = Promise<{locale: string}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return FULL_CONTENT_LOCALES.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable(pathname, locale)) notFound();
  const copy = getInterfaceGuideCopy(locale);
  return createPageMetadata({locale, pathname, title: copy.title.includes(PRODUCT_FACTS.name) ? copy.title : `${copy.title} · ${PRODUCT_FACTS.name}`, description: copy.metaDescription});
}

export default async function InterfaceGuidePage({params}: {params: Params}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable(pathname, locale)) notFound();
  setRequestLocale(locale);
  const [help, navigation] = await Promise.all([
    getTranslations({locale, namespace: "Help"}),
    getTranslations({locale, namespace: "Navigation"}),
  ]);
  const copy = getInterfaceGuideCopy(locale);
  const chapterLabels = {
    tools: copy.toolsTitle,
    parameters: copy.parametersTitle,
    "object-inspector": copy.inspectorTitle,
    "template-library": copy.templatesTitle,
    "template-workflow": copy.workflowTitle,
    "layers-nodes": copy.layersTitle,
    "advanced-settings": copy.advancedTitle,
    generation: copy.generationTitle,
  };
  const phone = getIPhoneGuideCopy(locale);
  const breadcrumbItems = [
    {name: navigation("home"), pathname: "/"},
    {name: help("title"), pathname: "/help"},
    {name: copy.title, pathname},
  ];

  return (
    <div className={styles.page}>
      <JsonLd data={[
        {
          "@context": "https://schema.org", "@type": "TechArticle",
          headline: copy.title, description: copy.metaDescription, inLanguage: locale,
          mainEntityOfPage: localizedAbsoluteUrl(locale, pathname),
          author: {"@type": "Organization", name: PRODUCT_FACTS.name},
          publisher: {"@type": "Organization", name: PRODUCT_FACTS.name},
        },
        createBreadcrumbJsonLd({locale, items: breadcrumbItems}),
      ]} />
      <SiteHeader />
      <main>
        <header className={styles.pageHeader}>
          <div className={styles.container}>
            <Breadcrumbs ariaLabel={`${navigation("home")} — ${help("title")}`} items={[
              {label: navigation("home"), href: "/"},
              {label: help("title"), href: "/help"},
              {label: copy.title},
            ]} />
            <p className={styles.eyebrow}>{help("title")}</p>
            <h1>{copy.title}</h1>
            <GuidePlatform platform="desktop"><p className={styles.lead}>{copy.intro}</p></GuidePlatform>
            <GuidePlatform platform="iphone"><p className={styles.lead}>{phone.workspaceIntro}</p></GuidePlatform>
            <p className={styles.captureNote}>{copy.captureNote}</p>
          </div>
        </header>

        <LegacyGuideRedirect />
        <nav className={styles.chapterNav} aria-label={help("toc")}>
          <ol className={styles.container}>
            <li><a href="#workspace">{copy.workspaceTitle}</a></li>
            <GuidePlatform platform="iphone" as="li"><a href="#iphone">{phone.landscapeTitle}</a></GuidePlatform>
          </ol>
        </nav>

        <GuideChapter locale={locale} chapter="workspace">
          <div className={styles.inspectorStates}>
            <div>
              <h3>{help("interfaceContent.inspector.title")}</h3>
              <GuidePlatform platform="desktop"><p>{copy.workspaceNote}</p></GuidePlatform>
              <GuidePlatform platform="iphone"><p>{phone.parametersIntro}</p></GuidePlatform>
              <Link className={styles.relatedLink} href="/help/jigsaw-generation#parameters">{copy.parametersTitle}<span aria-hidden="true">→</span></Link>
            </div>
            <div>
              <h3>{help("interfaceContent.shapeInfo.title")}</h3>
              <GuidePlatform platform="desktop"><p>{copy.inspectorIntro}</p></GuidePlatform>
              <GuidePlatform platform="iphone"><p>{phone.inspectorIntro}</p></GuidePlatform>
              <Link className={styles.relatedLink} href="/help/vector-editing#selection">{copy.inspectorTitle}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <nav className={styles.topicLinks} aria-label={help("toc")}>
            {Object.entries(LEGACY_GUIDE_DESTINATIONS).map(([id, href]) => (
              <Link id={id} key={id} href={href} data-legacy-guide-destination={href}>
                <span>{chapterLabels[id as keyof typeof chapterLabels]}</span><span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        </GuideChapter>
        <GuideChapter locale={locale} chapter="iphone" />
      </main>
      <SiteFooter />
    </div>
  );
}
