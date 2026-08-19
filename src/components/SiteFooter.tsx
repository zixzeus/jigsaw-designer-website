import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";

import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {PRODUCT_FACTS} from "@/config/product";
import {isTierOneLocale} from "@/content/types";
import {getGeneratedSiteTranslation, hasGeneratedLocaleContent} from "@/content/localized-content";
import {footerPageCopy} from "@/content/page-copy";
import {Link} from "@/i18n/navigation";

export default function SiteFooter() {
  const footer = useTranslations("Footer");
  const navigation = useTranslations("Navigation");
  const common = useTranslations("Common");
  const locale = useLocale();
  const localizedFooter = isTierOneLocale(locale)
    ? footerPageCopy[locale]
    : isSiteLocale(locale) && hasGeneratedLocaleContent(locale)
      ? getGeneratedSiteTranslation(locale).content.footer
      : null;
  const showTierOneLinks =
    isSiteLocale(locale) && isRouteAvailable("/pricing", locale);
  const productLabel = localizedFooter
    ? navigation("product")
    : navigation("features");
  const learnLabel = localizedFooter
    ? navigation("learn")
    : navigation("help");

  return (
    <footer className="border-t border-border bg-background-secondary/70 py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.35fr_2fr]">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label={`${common("appName")} — ${navigation("home")}`}
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-[0.8rem] ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src="/app-icon-v1.webp"
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="font-semibold tracking-tight">{common("appName")}</span>
          </Link>
          {localizedFooter ? (
            <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {localizedFooter.tagline}
            </p>
          ) : null}
        </div>

        <div className="grid gap-9 sm:grid-cols-3">
          <FooterGroup title={productLabel}>
            <Link href="/#product">{productLabel}</Link>
            {showTierOneLinks ? <Link href="/showcase">{navigation("showcase")}</Link> : null}
            {showTierOneLinks ? <Link href="/pricing">{footer("pricing")}</Link> : null}
            {showTierOneLinks ? <Link href="/changelog/1-6-0">Version {PRODUCT_FACTS.currentVersion}</Link> : null}
          </FooterGroup>

          <FooterGroup title={learnLabel}>
            {showTierOneLinks ? <Link href="/learn">{learnLabel}</Link> : null}
            <Link href="/help">{footer("help")}</Link>
            {localizedFooter ? (
              <Link href="/how-to-make-a-laser-cut-jigsaw-puzzle">
                {localizedFooter.tutorial}
              </Link>
            ) : null}
          </FooterGroup>

          <FooterGroup title={footer("support")}>
            <Link href="/support">{footer("support")}</Link>
            <Link href="/privacy">{footer("privacy")}</Link>
            {showTierOneLinks ? <Link href="/terms">{footer("terms")}</Link> : null}
            {showTierOneLinks ? <Link href="/refund-policy">{footer("refund")}</Link> : null}
          </FooterGroup>
        </div>

        <p className="border-t border-border pt-6 text-xs text-gray-500 lg:col-span-2">
          {footer("rights", {year: new Date().getFullYear()})}
        </p>
      </div>
    </footer>
  );
}

function FooterGroup({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <nav aria-label={title} className="flex flex-col items-start gap-3 text-sm">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
        {title}
      </h2>
      <div className="flex flex-col items-start gap-3 text-gray-600 [&_a]:transition-colors [&_a]:hover:text-foreground dark:text-gray-300">
        {children}
      </div>
    </nav>
  );
}
