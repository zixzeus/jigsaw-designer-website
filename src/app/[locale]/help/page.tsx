import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/components/HelpDirectory.module.css";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, isSiteLocale, type SiteLocale} from "@/config/seo";
import {getHelpPage, type HelpSlug} from "@/content/help-pages";
import {getInterfaceGuideCopy} from "@/content/interface-guide";
import {
  getGeneratedSiteTranslation,
  hasGeneratedLocaleContent,
} from "@/content/localized-content";
import {isTierOneLocale} from "@/content/types";
import {Link} from "@/i18n/navigation";
import {createBreadcrumbJsonLd, createPageMetadata, localizedAbsoluteUrl} from "@/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/help", locale)) notFound();
  const help = await getTranslations({locale, namespace: "Help"});
  return createPageMetadata({locale, pathname: "/help", title: help("metaTitle"), description: help("metaDescription")});
}

export default async function HelpPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/help", locale)) notFound();
  setRequestLocale(locale);
  return <HelpContent locale={locale} />;
}

const directoryTopics: {slug: HelpSlug | "interface-guide"; legacyIds: string[]}[] = [
  {slug: "getting-started", legacyIds: ["getting-started"]},
  {slug: "interface-guide", legacyIds: ["interface"]},
  {slug: "vector-editing", legacyIds: ["tools", "operations"]},
  {slug: "templates", legacyIds: ["templates"]},
  {slug: "jigsaw-generation", legacyIds: ["jigsaw-cutline-generator"]},
  {slug: "svg-import-export", legacyIds: ["import-export"]},
  {slug: "project-library", legacyIds: ["project-library"]},
  {slug: "keyboard-shortcuts", legacyIds: ["shortcuts"]},
  {slug: "troubleshooting", legacyIds: ["troubleshooting"]},
];

function HelpContent({locale}: {locale: SiteLocale}) {
  const navigation = useTranslations("Navigation");
  const help = useTranslations("Help");
  const generatedContent = !isTierOneLocale(locale) && hasGeneratedLocaleContent(locale)
    ? getGeneratedSiteTranslation(locale).content
    : null;
  const guide = getInterfaceGuideCopy(locale);
  const shortTitles: Partial<Record<HelpSlug, string>> = {
    "getting-started": help("sections.gettingStarted"),
    "vector-editing": help("sections.tools"),
    "jigsaw-generation": help("sections.generation"),
    "svg-import-export": help("sections.importExport"),
    "keyboard-shortcuts": help("sections.shortcuts"),
    troubleshooting: help("troubleshooting.title"),
  };
  const topics = directoryTopics.flatMap(({slug, legacyIds}) => {
    const href = `/help/${slug}`;
    if (!isRouteAvailable(href, locale)) return [];
    if (slug === "interface-guide") {
      return [{href, legacyIds, title: guide.title, description: guide.intro}];
    }
    const content = isTierOneLocale(locale)
      ? getHelpPage(slug, locale)
      : generatedContent?.help[slug];
    return content
      ? [{href, legacyIds, title: shortTitles[slug] ?? content.title, description: slug === "vector-editing" ? guide.toolsIntro : slug === "templates" ? guide.templatesIntro : content.seoDescription}]
      : [];
  });

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: help("title"),
    description: help("metaDescription"),
    inLanguage: locale,
    url: localizedAbsoluteUrl(locale, "/help"),
    publisher: {"@type": "Organization", name: PRODUCT_FACTS.name},
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: topics.length,
      itemListElement: topics.map((topic, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: topic.title,
          description: topic.description,
          url: localizedAbsoluteUrl(locale, topic.href),
        },
      })),
    },
  };
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    locale,
    items: [
      {name: navigation("home"), pathname: "/"},
      {name: help("title"), pathname: "/help"},
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[collectionPage, breadcrumbJsonLd]} />
      <SiteHeader />
      <main className="container mx-auto max-w-6xl px-6 pt-28 pb-20 md:px-12 md:pt-36">
        <Breadcrumbs
          ariaLabel={`${navigation("home")} — ${help("title")}`}
          items={[
            {label: navigation("home"), href: "/"},
            {label: help("title")},
          ]}
        />
        <header className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{help("title")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">{help("subtitle")}</p>
        </header>

        <nav aria-label={help("toc")} className={styles.directory} data-help-directory="true">
          <ul className={styles.grid}>
            {topics.map((topic) => (
              <li key={topic.href} id={topic.legacyIds[0]} className={styles.topic}>
                {topic.legacyIds.slice(1).map((id) => <span key={id} id={id} className={styles.legacyAnchor} aria-hidden="true" />)}
                <Link href={topic.href} className={styles.link} data-help-topic={topic.href.split("/").at(-1)}>
                  <h2 className={styles.title}>
                    <span>{topic.title}</span>
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </h2>
                  <p className={styles.description}>{topic.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mt-16 border-t border-border pt-10 text-center">
          <h2 className="text-2xl font-bold">{help("needHelp.title")}</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{help("needHelp.desc")}</p>
          <Link href="/support" className="mt-6 inline-flex rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:border-primary hover:text-primary-dark dark:hover:text-primary-light">
            {navigation("support")} <span className="ms-2" aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
