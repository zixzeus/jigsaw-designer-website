import type {SiteLocale} from "@/config/seo";

import locale0 from "./iphone-guide-locales/ar.json";
import locale1 from "./iphone-guide-locales/ca.json";
import locale2 from "./iphone-guide-locales/cs.json";
import locale3 from "./iphone-guide-locales/da.json";
import locale4 from "./iphone-guide-locales/de.json";
import locale5 from "./iphone-guide-locales/el.json";
import locale6 from "./iphone-guide-locales/en.json";
import locale7 from "./iphone-guide-locales/es.json";
import locale8 from "./iphone-guide-locales/fi.json";
import locale9 from "./iphone-guide-locales/fr.json";
import locale10 from "./iphone-guide-locales/he.json";
import locale11 from "./iphone-guide-locales/hi.json";
import locale12 from "./iphone-guide-locales/hr.json";
import locale13 from "./iphone-guide-locales/hu.json";
import locale14 from "./iphone-guide-locales/id.json";
import locale15 from "./iphone-guide-locales/it.json";
import locale16 from "./iphone-guide-locales/ja.json";
import locale17 from "./iphone-guide-locales/ko.json";
import locale18 from "./iphone-guide-locales/ms.json";
import locale19 from "./iphone-guide-locales/nl.json";
import locale20 from "./iphone-guide-locales/no.json";
import locale21 from "./iphone-guide-locales/pl.json";
import locale22 from "./iphone-guide-locales/pt-BR.json";
import locale23 from "./iphone-guide-locales/ro.json";
import locale24 from "./iphone-guide-locales/ru.json";
import locale25 from "./iphone-guide-locales/sk.json";
import locale26 from "./iphone-guide-locales/sv.json";
import locale27 from "./iphone-guide-locales/th.json";
import locale28 from "./iphone-guide-locales/tr.json";
import locale29 from "./iphone-guide-locales/uk.json";
import locale30 from "./iphone-guide-locales/vi.json";
import locale31 from "./iphone-guide-locales/zh-Hans.json";
import locale32 from "./iphone-guide-locales/zh-Hant.json";

export const iphoneGuideEnglishCopy = locale6;
export type IPhoneGuideCopy = {[Key in keyof typeof iphoneGuideEnglishCopy]: string};

const translations = {
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
} satisfies Record<SiteLocale, IPhoneGuideCopy>;

export function getIPhoneGuideCopy(locale: SiteLocale): IPhoneGuideCopy {
  return translations[locale];
}
