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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
          aria-label={`${common("appName")} — ${navigation("home")}`}
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-sm">
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
          className="hidden items-center gap-5 text-sm font-medium md:flex"
        >
          <Link href="/" className="transition-colors hover:text-primary-dark dark:hover:text-primary-light">
            {navigation("home")}
          </Link>
          <Link
            href="/#features"
            className="transition-colors hover:text-primary-dark dark:hover:text-primary-light"
          >
            {navigation("features")}
          </Link>
          <Link
            href="/help"
            className="transition-colors hover:text-primary-dark dark:hover:text-primary-light"
          >
            {navigation("help")}
          </Link>
          {showTierOneLinks ? (
            <Link
              href="/pricing"
              className="transition-colors hover:text-primary-dark dark:hover:text-primary-light"
            >
              {navigation("pricing")}
            </Link>
          ) : null}
          <Link
            href="/support"
            className="transition-colors hover:text-primary-dark dark:hover:text-primary-light"
          >
            {navigation("support")}
          </Link>
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark dark:focus-visible:ring-primary-light md:hidden"
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
          className="border-t border-border bg-background px-5 py-5 shadow-xl md:hidden"
        >
          <div className="mx-auto flex max-w-xl flex-col gap-4 text-sm font-medium">
            <Link
              ref={firstMobileLinkRef}
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:text-primary-dark dark:focus-visible:ring-primary-light dark:hover:text-primary-light"
            >
              {navigation("home")}
            </Link>
            <Link
              href="/#features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:text-primary-dark dark:focus-visible:ring-primary-light dark:hover:text-primary-light"
            >
              {navigation("features")}
            </Link>
            <Link
              href="/help"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:text-primary-dark dark:focus-visible:ring-primary-light dark:hover:text-primary-light"
            >
              {navigation("help")}
            </Link>
            {showTierOneLinks ? (
              <Link
                href="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:text-primary-dark dark:focus-visible:ring-primary-light dark:hover:text-primary-light"
              >
                {navigation("pricing")}
              </Link>
            ) : null}
            <Link
              href="/support"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark hover:text-primary-dark dark:focus-visible:ring-primary-light dark:hover:text-primary-light"
            >
              {navigation("support")}
            </Link>
            {showLanguageSwitcher ? (
              <div className="border-y border-border py-3">
                <LanguageSwitcher />
              </div>
            ) : null}
            <AppStoreCTA
              location="header"
              label={navigation("download")}
              ariaLabel={common("appStoreAria")}
              className="rounded-full bg-primary-dark px-4 py-2 text-center text-white shadow-sm transition-colors hover:bg-[#1452a3]"
            />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
