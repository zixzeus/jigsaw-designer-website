import {getLocale} from "next-intl/server";

import {APP_STORE_COUNTRIES} from "@/config/product";
import {getAppStoreCopy} from "@/content/app-store";
import AppStoreCTAClient from "./AppStoreCTAClient";

export type AppStoreClickLocation =
  | "hero"
  | "article"
  | "pricing"
  | "footer"
  | "support"
  | "changelog"
  | "showcase"
  | "learn"
  | "home-final";

export type AppStoreCTAProps = {
  location: AppStoreClickLocation;
  label: string;
  ariaLabel?: string;
  pageId?: string;
  className?: string;
};

export default async function AppStoreCTA(props: AppStoreCTAProps) {
  const locale = await getLocale();
  // Send identical names/order to the client: browser and server ICU versions
  // can differ, which otherwise causes hydration errors in translated options.
  const names = new Intl.DisplayNames([locale, "en"], {type: "region"});
  const collator = new Intl.Collator(locale);
  const countries = APP_STORE_COUNTRIES
    .map((code) => ({code, name: names.of(code.toUpperCase()) ?? code.toUpperCase()}))
    .sort((a, b) => collator.compare(a.name, b.name));

  return <AppStoreCTAClient {...props} locale={locale} copy={getAppStoreCopy(locale)} countries={countries} />;
}
