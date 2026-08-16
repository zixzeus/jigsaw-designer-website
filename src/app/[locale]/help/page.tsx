import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {getMediaDimensions} from "@/config/media";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, isSiteLocale, type SiteLocale} from "@/config/seo";
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

const splitGuides = [
  ["getting-started", "sections.gettingStarted"],
  ["jigsaw-generation", "sections.generation"],
  ["svg-import-export", "sections.importExport"],
  ["vector-editing", "sections.tools"],
  ["templates", "interfaceContent.templatesPanel.title"],
  ["project-library", "sections.projectLibrary"],
  ["keyboard-shortcuts", "sections.shortcuts"],
  ["troubleshooting", "troubleshooting.title"],
] as const;

function HelpContent({locale}: {locale: SiteLocale}) {
  const navigation = useTranslations("Navigation");
  const help = useTranslations("Help");
  const common = useTranslations("Common");
  const showSplitGuides =
    isSiteLocale(locale) && isRouteAvailable("/help/getting-started", locale);

  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: help("title"),
    description: help("metaDescription"),
    inLanguage: locale,
    mainEntityOfPage: localizedAbsoluteUrl(locale, "/help"),
    author: {"@type": "Organization", name: PRODUCT_FACTS.name},
    publisher: {"@type": "Organization", name: PRODUCT_FACTS.name},
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
      <JsonLd data={[techArticle, breadcrumbJsonLd]} />
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
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{help("title")}</h1>
          <p className="mt-6 border-s-4 border-primary ps-6 text-xl leading-8 text-gray-600 dark:text-gray-300">{help("subtitle")}</p>
        </header>

        {showSplitGuides ? (
          <section className="mt-14 rounded-3xl border border-border bg-background-secondary p-7 md:p-10">
            <h2 className="text-2xl font-bold">{help("toc")}</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {splitGuides.map(([slug, labelKey]) => (
                <Link key={slug} href={`/help/${slug}`} className="rounded-2xl border border-border bg-background p-6 font-semibold transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary-dark hover:shadow-md dark:hover:text-primary-light">
                  {help(labelKey)} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <nav aria-label={help("toc")} className="mt-14 rounded-3xl border border-border bg-background-secondary p-7 md:p-10">
            <h2 className="text-2xl font-bold">{help("toc")}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["getting-started", "sections.gettingStarted"],
                ["project-library", "sections.projectLibrary"],
                ["interface", "sections.interface"],
                ["jigsaw-cutline-generator", "sections.generation"],
                ["tools", "sections.tools"],
                ["operations", "sections.operations"],
                ["import-export", "sections.importExport"],
                ["shortcuts", "sections.shortcuts"],
              ].map(([id, key]) => <a key={id} href={`#${id}`} className="rounded-xl bg-background px-4 py-3 hover:text-primary-dark dark:hover:text-primary-light">{help(key)}</a>)}
            </div>
          </nav>
        )}

        <div className="mt-20 space-y-20">
          <HelpSection id="getting-started" title={help("sections.gettingStarted")}>
            <p>{help("gettingStartedContent.title")}</p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4, 5].map((step) => <li key={step} className="rounded-2xl border border-border p-5"><strong>{step}. {help(`gettingStartedContent.steps.${step}.title`)}</strong><p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{help(`gettingStartedContent.steps.${step}.desc`)}</p></li>)}
            </ol>
          </HelpSection>

          <HelpSection id="project-library" title={help("sections.projectLibrary")}>
            <p>{help("projectLibraryContent.intro")}</p>
            <HelpImage src="/my_projects-v1-6.webp" alt={help("projectLibraryContent.myProjects.title")} />
          </HelpSection>

          <HelpSection id="interface" title={help("sections.interface")}>
            <p>{help("interfaceContent.intro")}</p>
            <HelpImage src="/editor_overview-v1-6.webp" alt={help("interfaceContent.title")} />
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {["layersPanel", "templatesPanel", "inspector"].map((key) => <div key={key} className="rounded-2xl border border-border p-5"><h3 className="font-bold">{help(`interfaceContent.${key}.title`)}</h3><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{help(`interfaceContent.${key}.desc`)}</p></div>)}
            </div>
          </HelpSection>

          <HelpSection id="jigsaw-cutline-generator" title={help("generationContent.title")}>
            <p>{help("generationContent.desc")}</p>
            <ol className="mt-6 space-y-4">
              {[1, 2, 3, 4].map((step) => <li key={step} className="rounded-2xl bg-background-secondary p-5"><strong>{help(`generationContent.steps.${step}.title`)}</strong><p className="mt-2 text-gray-600 dark:text-gray-300">{help(`generationContent.steps.${step}.desc`)}</p></li>)}
            </ol>
          </HelpSection>

          <HelpSection id="tools" title={help("sections.tools")}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["select", "edit", "pen", "line", "rect", "circle", "polygon", "bezier"].map((tool) => <div key={tool} className="rounded-2xl border border-border p-5"><h3 className="font-bold">{help(`toolsContent.${tool}.title`)}</h3><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{help(`toolsContent.${tool}.desc`)}</p></div>)}
            </div>
          </HelpSection>

          <HelpSection id="operations" title={help("sections.operations")}>
            <div className="grid gap-5 md:grid-cols-3">
              {["selection", "grouping", "editing"].map((operation) => <div key={operation} className="rounded-2xl bg-background-secondary p-6"><h3 className="font-bold">{help(`operationsContent.${operation}.title`)}</h3><ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-gray-600 dark:text-gray-300">{[0, 1, 2, 3].map((index) => {const key = `operationsContent.${operation}.items.${index}`; return help.has(key) ? <li key={index}>{help(key)}</li> : null;})}</ul></div>)}
            </div>
          </HelpSection>

          <HelpSection id="import-export" title={help("sections.importExport")}>
            <div className="grid gap-5 md:grid-cols-2">
              {(["import", "export"] as const).map((action) => <div key={action} className="rounded-2xl border border-border p-6"><h3 className="text-xl font-bold">{help(`importExportContent.${action}.title`)}</h3><p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{help(`importExportContent.${action}.desc`)}</p><ul className="mt-4 list-disc space-y-2 ps-5 text-sm">{[0, 1, 2].map((index) => <li key={index}>{help(`importExportContent.${action}.items.${index}`)}</li>)}</ul></div>)}
            </div>
            <p className="mt-5 rounded-2xl bg-primary-ultra-light/40 p-5">
              {help("importExportContent.premium.desc", {count: PRODUCT_FACTS.freeGenerationLimit})}
            </p>
          </HelpSection>

          <HelpSection id="shortcuts" title={help("sections.shortcuts")}>
            <div className="grid gap-4 md:grid-cols-2">
              <Shortcut keys="⌘N / ⌘I / ⌘E" label={help("shortcutsContent.file.title")} />
              <Shortcut keys="⌘C / Delete / ⌘A" label={help("shortcutsContent.edit.title")} />
              <Shortcut keys="Shift+Click / Ctrl+Click / Esc" label={help("shortcutsContent.selection.title")} />
            </div>
          </HelpSection>
        </div>

        <section className="mt-20 rounded-3xl border border-border bg-background-secondary p-9 text-center">
          <h2 className="text-2xl font-bold">{help("needHelp.title")}</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{help("needHelp.desc")}</p>
          <AppStoreCTA location="article" pageId="help" label={navigation("download")} ariaLabel={common("appStoreAria")} className="mt-6 inline-flex rounded-full bg-primary-dark px-7 py-3 font-semibold text-white hover:bg-[#1452a3]" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function HelpSection({id, title, children}: {id: string; title: string; children: React.ReactNode}) {
  return <section id={id} className="scroll-mt-24"><h2 className="text-3xl font-bold md:text-4xl">{title}</h2><div className="mt-6 text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300">{children}</div></section>;
}

function HelpImage({src, alt}: {src: string; alt: string}) {
  const {width, height} = getMediaDimensions(src);
  return <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 1024px) calc(100vw - 3rem), 1056px" className="mt-7 h-auto w-full rounded-2xl border border-border shadow-lg" />;
}

function Shortcut({keys, label}: {keys: string; label: string}) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-border p-5"><span>{label}</span><kbd className="rounded-lg bg-background-secondary px-3 py-1 font-mono text-sm">{keys}</kbd></div>;
}
