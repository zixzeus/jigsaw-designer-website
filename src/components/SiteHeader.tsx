"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import {Link, usePathname} from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({showLanguageSwitcher = true}: {showLanguageSwitcher?: boolean}) {
  const navigation = useTranslations("Navigation");
  const common = useTranslations("Common");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const links = [{href: "/#product", label: navigation("features")}, {href: "/showcase", label: navigation("showcase")}, {href: "/pricing", label: navigation("pricing")}, {href: "/help", label: navigation("help")}];

  useEffect(() => {
    if (!isMenuOpen) return;
    firstLink.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {setIsMenuOpen(false); menuButton.current?.focus();}
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-xl">
      <div className="site-shell flex h-[4.875rem] items-center gap-2 xl:h-[5.25rem] xl:gap-6">
        <Link href="/" className="me-auto flex min-w-0 items-center gap-2" aria-label={`${common("appName")} — ${navigation("home")}`}>
          <Image src="/app-icon-v1.webp" alt="" width={256} height={256} sizes="32px" className="h-8 w-8 shrink-0 rounded-[.7rem]" priority />
          <span className="site-brand-name truncate text-base font-semibold tracking-tight">{common("appName")}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium xl:flex" aria-label={`${common("appName")} — ${navigation("home")}`}>
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="rounded-full py-2 transition-colors hover:text-primary-dark aria-[current=page]:text-primary-dark">{link.label}</Link>)}
        </nav>
        {showLanguageSwitcher ? <div className="hidden xl:block"><LanguageSwitcher /></div> : null}
        <button ref={menuButton} type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border xl:hidden" aria-label={isMenuOpen ? navigation("closeMenu") : navigation("openMenu")} aria-expanded={isMenuOpen} aria-controls="mobile-site-navigation" onClick={() => setIsMenuOpen((open) => !open)}><span aria-hidden="true" className="text-xl">{isMenuOpen ? "×" : "☰"}</span></button>
      </div>
      {isMenuOpen ? <nav id="mobile-site-navigation" aria-label={`${common("appName")} — ${navigation("home")}`} className="max-h-[calc(100dvh-4.875rem)] overflow-y-auto border-t border-border bg-background py-5 shadow-lg xl:hidden"><div className="site-shell flex flex-col gap-1">{links.map((link, index) => <Link ref={index === 0 ? firstLink : undefined} key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setIsMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-background-secondary">{link.label}</Link>)}{showLanguageSwitcher ? <div className="mt-3 border-t border-border px-3 pt-4"><LanguageSwitcher /></div> : null}</div></nav> : null}
    </header>
  );
}
