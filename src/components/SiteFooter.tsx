import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {PRODUCT_FACTS} from "@/config/product";
import {isSiteLocale} from "@/config/seo";
import {getHomeDesignCopy} from "@/content/home-design";
import {Link} from "@/i18n/navigation";

export default function SiteFooter() {
  const footer = useTranslations("Footer");
  const navigation = useTranslations("Navigation");
  const common = useTranslations("Common");
  const locale = useLocale();
  const c = getHomeDesignCopy(isSiteLocale(locale) ? locale : "en");
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="site-shell">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
          <div><Link href="/" className="inline-flex items-center gap-3" aria-label={`${common("appName")} — ${navigation("home")}`}><Image src="/app-icon-v1.webp" alt="" width={256} height={256} className="h-8 w-8 rounded-xl" /><span className="font-semibold">{common("appName")}</span></Link><p className="mt-3 text-sm text-muted-foreground">Mac · iPad · iPhone</p></div>
          <nav aria-label={navigation("home")} className="flex max-w-2xl flex-wrap gap-x-6 gap-y-3 text-sm"><Link href="/#product">{navigation("features")}</Link><Link href="/showcase">{navigation("showcase")}</Link><Link href="/pricing">{navigation("pricing")}</Link><Link href="/help">{c.help}</Link><Link href="/learn">{navigation("learn")}</Link><Link href="/support">{footer("support")}</Link><Link href="/changelog/1-6-0">v{PRODUCT_FACTS.currentVersion}</Link></nav>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row"><p>{footer("rights", {year: new Date().getFullYear()})}</p><div className="flex flex-wrap gap-x-5 gap-y-3"><Link href="/privacy">{footer("privacy")}</Link><Link href="/terms">{footer("terms")}</Link><Link href="/refund-policy">{footer("refund")}</Link></div></div>
      </div>
    </footer>
  );
}
