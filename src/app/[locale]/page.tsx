import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import AppStoreCTA from "@/components/AppStoreCTA";
import ArtworkGallery from "@/components/ArtworkGallery";
import JsonLd from "@/components/JsonLd";
import OutlineComparison from "@/components/OutlineComparison";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VideoFacade from "@/components/VideoFacade";
import {getMediaDimensions} from "@/config/media";
import {PRODUCT_FACTS} from "@/config/product";
import {isRouteAvailable, isSiteLocale, SITE_LOCALES} from "@/config/seo";
import {getHomeDesignCopy, HOME_FEATURE_MEDIA as media} from "@/content/home-design";
import {Link} from "@/i18n/navigation";
import {absoluteUrl, createPageMetadata, localizedAbsoluteUrl} from "@/lib/seo";

type HomeParams = Promise<{locale: string}>;

export async function generateMetadata({params}: {params: HomeParams}): Promise<Metadata> {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/", locale)) notFound();
  const copy = getHomeDesignCopy(locale);
  return createPageMetadata({locale, pathname: "/", title: copy.seoTitle, description: copy.seoDescription});
}

export default async function Home({params}: {params: HomeParams}) {
  const {locale} = await params;
  if (!isSiteLocale(locale) || !isRouteAvailable("/", locale)) notFound();
  setRequestLocale(locale);
  const c = getHomeDesignCopy(locale);
  const canonical = localizedAbsoluteUrl(locale, "/");
  const organizationId = `${PRODUCT_FACTS.websiteOrigin}/#organization`;
  const websiteId = `${PRODUCT_FACTS.websiteOrigin}/#website`;
  const structuredData = [
    {"@context": "https://schema.org", "@type": "Organization", "@id": organizationId, name: PRODUCT_FACTS.name, url: PRODUCT_FACTS.websiteOrigin, logo: absoluteUrl(PRODUCT_FACTS.appIcon), contactPoint: {"@type": "ContactPoint", contactType: "customer support", email: PRODUCT_FACTS.supportEmail}},
    {"@context": "https://schema.org", "@type": "WebSite", "@id": websiteId, name: PRODUCT_FACTS.name, url: PRODUCT_FACTS.websiteOrigin, inLanguage: SITE_LOCALES, publisher: {"@id": organizationId}},
    {"@context": "https://schema.org", "@type": "WebPage", "@id": `${canonical}#webpage`, name: c.seoTitle, description: c.seoDescription, url: canonical, inLanguage: locale, isPartOf: {"@id": websiteId}},
    {"@context": "https://schema.org", "@type": "SoftwareApplication", name: PRODUCT_FACTS.name, applicationCategory: "DesignApplication", operatingSystem: PRODUCT_FACTS.operatingSystems.join(", "), description: c.seoDescription, url: canonical, downloadUrl: PRODUCT_FACTS.appStoreUrl, softwareVersion: PRODUCT_FACTS.currentVersion, isAccessibleForFree: PRODUCT_FACTS.freeGenerationLimit > 0, publisher: {"@id": organizationId}},
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main id="top" className="home-page">
        <section className="home-hero">
          <div className="site-shell hero-layout">
            <div className="home-hero-copy">
              <h1 className="display-title home-title">{c.heroTitle} <span>{c.heroAccent.split("\n").map((phrase) => <span key={phrase} className="home-title-phrase">{phrase}</span>)}</span></h1>
              <p className="prose-copy home-description">{c.heroBody}</p>
              <div className="home-actions">
                <AppStoreCTA location="hero" pageId="home" label={c.download} />
                <a href="#demo" className="button-secondary">{c.watch}</a>
              </div>
            </div>
            <figure className="hero-artwork">
              <figcaption>{c.artworkNote}</figcaption>
              <div className="hero-workspace" dir="ltr">
                <Image src={media.hero.workspace} alt="" {...getMediaDimensions(media.hero.workspace)} sizes="(max-width: 900px) 94vw, 1280px" className="hero-workspace-background" priority />
                <Image src="/product/dragon-default-desktop-v1.svg" alt={`${c.dragon} · ${c.after}`} {...getMediaDimensions("/product/dragon-default-desktop-v1.svg")} sizes="(max-width: 900px) 49vw, 650px" className="hero-dragon" priority />
              </div>
            </figure>
          </div>
        </section>

        <nav className="benefit-strip" aria-label={c.showcaseTitle}>
          <div className="site-shell">
            {[["#product", c.outlineLabel, "SVG"], ["#interlocks", c.slotLabel, c.slotReuse], ["#demo", c.speedLabel, c.watch], ["#devices", c.devicesLabel, "Mac · iPad · iPhone"]].map(([href, title, detail]) => <a key={href} href={href}><strong>{title}</strong><span>{detail}</span></a>)}
          </div>
        </nav>

        <section id="product" className="home-section">
          <div id="features" className="site-shell feature-split">
            <FeatureCopy eyebrow={c.outlineLabel} title={c.outlineTitle} body={c.outlineBody} href={media.outline.href} label={c.outlineLink} />
            <OutlineComparison before={media.outline.before} after={media.outline.after} beforeLabel={c.before} afterLabel={c.after} title={c.outlineTitle} />
          </div>
        </section>

        <section id="interlocks" className="home-section home-tinted-section">
          <div className="site-shell">
            <SplitHeading eyebrow={c.slotLabel} title={c.slotTitle} body={c.slotBody} />
            <div className="interlock-layout">
              <figure className="slot-editor"><figcaption>{c.slotDetail}</figcaption><div className="slot-crop"><Image src={media.interlock.src} alt={c.slotDetail} {...getMediaDimensions(media.interlock.src)} sizes="(max-width: 900px) 100vw, 850px" /></div></figure>
              <div className="slot-story">
                <div className="slot-examples"><Image src="/product/slot-leaf-v1.svg" alt="" {...getMediaDimensions("/product/slot-leaf-v1.svg")} /><Image src="/product/slot-round-v1.svg" alt="" {...getMediaDimensions("/product/slot-round-v1.svg")} /></div>
                <h3>{c.slotReuse}</h3>
                <Link href={media.interlock.href} className="text-link">{c.slotLink}<span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="home-section">
          <div id="workflow" className="site-shell">
            <SplitHeading eyebrow={c.speedLabel} title={c.speedTitle} body={c.speedBody} />
            <figure className="generation-demo">
              <VideoFacade videoId={media.generation.videoId} title={c.videoCaption} playLabel={c.watch} poster={media.generation.poster} />
              <figcaption>
                <span>{c.videoCaption}</span>
                <div className="flex flex-wrap items-center gap-6">
                  <a href={`https://www.youtube.com/watch?v=${media.generation.videoId}`} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${c.watch} · YouTube`}>YouTube<span aria-hidden="true">↗</span></a>
                  <Link href={media.generation.href} className="text-link">{c.speedLabel}<span aria-hidden="true">→</span></Link>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="devices" className="home-section home-tinted-section">
          <div className="site-shell">
            <FeatureCopy eyebrow={c.devicesLabel} title={c.devicesTitle} body={c.devicesBody} />
            <div className="device-family">
              {[
                {platform: "Mac", label: c.mac, src: "/device-mac-svg-workspace-v1-6.webp"},
                {platform: "iPad", label: c.ipad, src: "/device-ipad-vector-editing-v1-6.webp"},
                {platform: "iPhone", label: c.iphone, src: "/product/iphone-editor-v1.webp"},
              ].map((device) => <figure key={device.platform} className={`platform-${device.platform.toLowerCase()}`}><Image src={device.src} alt={`JigsawDesigner · ${device.platform} · ${device.label}`} {...getMediaDimensions(device.src)} sizes="(max-width: 900px) 90vw, 600px" /><figcaption><strong>{device.platform}</strong><span>{device.label}</span></figcaption></figure>)}
            </div>
          </div>
        </section>

        <section className="home-section home-showcase">
          <div className="site-shell"><div className="section-heading-row"><h2 className="display-title section-title">{c.showcaseTitle}</h2><Link href="/showcase" className="text-link">{c.showcaseLink}<span aria-hidden="true">→</span></Link></div><ArtworkGallery titles={[c.dragon, c.fruit, c.sprite]} closeLabel={c.close} detailLabel={c.editLink} /></div>
        </section>

        <section className="home-download"><div className="site-shell"><h2 className="display-title section-title">{c.finalTitle}</h2><p>{c.finalBody}</p><div className="home-actions"><AppStoreCTA location="home-final" pageId="home" label={c.download} /><Link href="/pricing" className="button-secondary">{c.pricing}</Link><Link href="/help" className="text-link">{c.help}<span aria-hidden="true">→</span></Link></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FeatureCopy({eyebrow, title, body, href, label}: {eyebrow: string; title: string; body: string; href?: string; label?: string}) {
  return <div className="feature-copy"><p className="section-eyebrow">{eyebrow}</p><h2 className="display-title section-title">{title}</h2><p className="prose-copy section-description">{body}</p>{href && label ? <Link href={href} className="text-link">{label}<span aria-hidden="true">→</span></Link> : null}</div>;
}

function SplitHeading({eyebrow, title, body}: {eyebrow: string; title: string; body: string}) {
  return <div className="split-heading"><div><p className="section-eyebrow">{eyebrow}</p><h2 className="display-title section-title">{title}</h2></div><p className="prose-copy section-description">{body}</p></div>;
}
