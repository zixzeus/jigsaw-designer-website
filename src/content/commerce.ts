import type {SiteLocale} from "@/config/seo";
import locale0 from "./commerce-locales/ar.json";
import locale1 from "./commerce-locales/ca.json";
import locale2 from "./commerce-locales/cs.json";
import locale3 from "./commerce-locales/da.json";
import locale4 from "./commerce-locales/de.json";
import locale5 from "./commerce-locales/el.json";
import locale6 from "./commerce-locales/en.json";
import locale7 from "./commerce-locales/es.json";
import locale8 from "./commerce-locales/fi.json";
import locale9 from "./commerce-locales/fr.json";
import locale10 from "./commerce-locales/he.json";
import locale11 from "./commerce-locales/hi.json";
import locale12 from "./commerce-locales/hr.json";
import locale13 from "./commerce-locales/hu.json";
import locale14 from "./commerce-locales/id.json";
import locale15 from "./commerce-locales/it.json";
import locale16 from "./commerce-locales/ja.json";
import locale17 from "./commerce-locales/ko.json";
import locale18 from "./commerce-locales/ms.json";
import locale19 from "./commerce-locales/nl.json";
import locale20 from "./commerce-locales/no.json";
import locale21 from "./commerce-locales/pl.json";
import locale22 from "./commerce-locales/pt-BR.json";
import locale23 from "./commerce-locales/ro.json";
import locale24 from "./commerce-locales/ru.json";
import locale25 from "./commerce-locales/sk.json";
import locale26 from "./commerce-locales/sv.json";
import locale27 from "./commerce-locales/th.json";
import locale28 from "./commerce-locales/tr.json";
import locale29 from "./commerce-locales/uk.json";
import locale30 from "./commerce-locales/vi.json";
import locale31 from "./commerce-locales/zh-Hans.json";
import locale32 from "./commerce-locales/zh-Hant.json";

export type CommerceCopy = typeof locale6;

const COMMERCE_COPY = {
  "ar": locale0,
  "ca": locale1,
  "cs": locale2,
  "da": locale3,
  "de": locale4,
  "el": locale5,
  "en": locale6,
  "es": locale7,
  "fi": locale8,
  "fr": locale9,
  "he": locale10,
  "hi": locale11,
  "hr": locale12,
  "hu": locale13,
  "id": locale14,
  "it": locale15,
  "ja": locale16,
  "ko": locale17,
  "ms": locale18,
  "nl": locale19,
  "no": locale20,
  "pl": locale21,
  "pt-BR": locale22,
  "ro": locale23,
  "ru": locale24,
  "sk": locale25,
  "sv": locale26,
  "th": locale27,
  "tr": locale28,
  "uk": locale29,
  "vi": locale30,
  "zh-Hans": locale31,
  "zh-Hant": locale32,
} satisfies Record<SiteLocale, CommerceCopy>;

export function getCommerceCopy(locale: SiteLocale): CommerceCopy {
  return COMMERCE_COPY[locale];
}
