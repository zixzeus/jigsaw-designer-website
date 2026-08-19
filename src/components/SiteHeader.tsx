"use client";

import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";

import {isRouteAvailable, isSiteLocale} from "@/config/seo";
import {Link} from "@/i18n/navigation";

import AppStoreCTA from "./AppStoreCTA";
import LanguageSwitcher from "./LanguageSwitcher";

type SiteHeaderProps = {
  showLanguageSwitcher?: boolean;
};

export default function SiteHeader({
  showLanguageSwitcher = true,
}: SiteHeaderProps) {
  const navigation = useTranslations("Navigation");
  const common = useTranslations("Common");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const navigationLabel = `${common("appName")} — ${navigation("home")}`;
  const showTierOneLinks =
    isSiteLocale(locale) && isRouteAvailable("/pricing", locale);

  const productLabel = showTierOneLinks
    ? navigation("product")
    : navigation("features");
  const learnLabel = showTierOneLinks
    ? navigation("learn")
    : navigation("help");

  useEffect(() => {
    if (!isMenuOpen) return;

    firstMobileLinkRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
          aria-label={`${common("appName")} — ${navigation("home")}`}
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[0.8rem] shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src="/app-icon-v1.webp"
              alt=""
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </span>
          <span className="truncate text-lg font-bold tracking-tight">
            {common("appName")}
          </span>
        </Link>

        <nav
          aria-label={navigationLabel}
          className="hidden items-center gap-1 text-sm font-medium lg:flex"
        >
          <Link
            href="/#product"
            className="rounded-full px-3.5 py-2 transition-colors hover:bg-background-secondary hover:text-foreground"
          >
            {productLabel}
          </Link>
          {showTierOneLinks ? (
            <>
              <Link
                href="/showcase"
                className="rounded-full px-3.5 py-2 transition-colors hover:bg-background-secondary hover:text-foreground"
              >
                {navigation("showcase")}
              </Link>
              <Link
                href="/learn"
                className="rounded-full px-3.5 py-2 transition-colors hover:bg-background-secondary hover:text-foreground"
              >
                {learnLabel}
              </Link>
              <Link
                href="/pricing"
                className="rounded-full px-3.5 py-2 transition-colors hover:bg-background-secondary hover:text-foreground"
              >
                {navigation("pricing")}
              </Link>
            </>
          ) : (
            <Link
              href="/help"
              className="rounded-full px-3.5 py-2 transition-colors hover:bg-background-secondary hover:text-foreground"
            >
              {learnLabel}
            </Link>
          )}
          {showLanguageSwitcher ? <LanguageSwitcher /> : null}
          <AppStoreCTA
            location="header"
            label={navigation("download")}
            ariaLabel={common("appStoreAria")}
            className="rounded-full bg-primary-dark px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#1452a3]"
          />
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light lg:hidden"
          aria-label={
            isMenuOpen ? navigation("closeMenu") : navigation("openMenu")
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {isMenuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-site-navigation"
          aria-label={navigationLabel}
          className="border-t border-border bg-background px-5 py-5 shadow-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-xl flex-col text-sm font-medium">
            <Link
              ref={firstMobileLinkRef}
              href="/#product"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:bg-background-secondary dark:focus-visible:ring-primary-light"
            >
              {productLabel}
            </Link>
            {showTierOneLinks ? (
              <>
                <Link
                  href="/showcase"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:bg-background-secondary dark:focus-visible:ring-primary-light"
                >
                  {navigation("showcase")}
                </Link>
                <Link
                  href="/learn"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:bg-background-secondary dark:focus-visible:ring-primary-light"
                >
                  {learnLabel}
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:bg-background-secondary dark:focus-visible:ring-primary-light"
                >
                  {navigation("pricing")}
                </Link>
              </>
            ) : (
              <Link
                href="/help"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:bg-background-secondary dark:focus-visible:ring-primary-light"
              >
                {learnLabel}
              </Link>
            )}
            {showLanguageSwitcher ? (
              <div className="my-2 border-y border-border px-3 py-3">
                <LanguageSwitcher />
              </div>
            ) : null}
            <AppStoreCTA
              location="header"
              label={navigation("download")}
              ariaLabel={common("appStoreAria")}
              className="mt-2 rounded-full bg-primary-dark px-4 py-3 text-center text-white shadow-sm transition-colors hover:bg-[#1452a3]"
            />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
