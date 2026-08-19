import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";

import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {Link} from "@/i18n/navigation";

export default function SiteFooter() {
  const footer = useTranslations("Footer");
  const navigation = useTranslations("Navigation");
  const common = useTranslations("Common");
  const locale = useLocale();
  const showTierOneLinks =
    isSiteLocale(locale) && isRouteAvailable("/pricing", locale);

  return (
    <footer className="border-t border-border bg-background-secondary py-12">
      <div className="container mx-auto grid gap-8 px-6 md:grid-cols-[1fr_auto] md:px-12">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label={`${common("appName")} — ${navigation("home")}`}
          >
            <span className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image
                src="/app-icon-v1.webp"
                alt=""
                fill
                sizes="32px"
                className="object-cover"
              />
            </span>
            <span className="font-semibold">{common("appName")}</span>
          </Link>
        </div>

        <nav
          aria-label={`${common("appName")} — ${footer("help")}`}
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-300 md:justify-end"
        >
          <Link href="/help" className="hover:text-primary-dark dark:hover:text-primary-light">
            {footer("help")}
          </Link>
          {showTierOneLinks ? (
            <>
              <Link href="/pricing" className="hover:text-primary-dark dark:hover:text-primary-light">
                {footer("pricing")}
              </Link>
            </>
          ) : null}
          <Link href="/privacy" className="hover:text-primary-dark dark:hover:text-primary-light">
            {footer("privacy")}
          </Link>
          {showTierOneLinks ? (
            <>
              <Link href="/terms" className="hover:text-primary-dark dark:hover:text-primary-light">
                {footer("terms")}
              </Link>
              <Link href="/refund-policy" className="hover:text-primary-dark dark:hover:text-primary-light">
                {footer("refund")}
              </Link>
            </>
          ) : null}
          <Link href="/support" className="hover:text-primary-dark dark:hover:text-primary-light">
            {footer("support")}
          </Link>
        </nav>

        <p className="text-sm text-gray-600 dark:text-gray-300 md:col-span-2">
          {footer("rights", {year: new Date().getFullYear()})}
        </p>
      </div>
    </footer>
  );
}
