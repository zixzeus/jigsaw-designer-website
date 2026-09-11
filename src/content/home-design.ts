import type {SiteLocale} from "@/config/seo";
import locale0 from "./home-design-locales/ar.json";
import locale1 from "./home-design-locales/ca.json";
import locale2 from "./home-design-locales/cs.json";
import locale3 from "./home-design-locales/da.json";
import locale4 from "./home-design-locales/de.json";
import locale5 from "./home-design-locales/el.json";
import locale6 from "./home-design-locales/en.json";
import locale7 from "./home-design-locales/es.json";
import locale8 from "./home-design-locales/fi.json";
import locale9 from "./home-design-locales/fr.json";
import locale10 from "./home-design-locales/he.json";
import locale11 from "./home-design-locales/hi.json";
import locale12 from "./home-design-locales/hr.json";
import locale13 from "./home-design-locales/hu.json";
import locale14 from "./home-design-locales/id.json";
import locale15 from "./home-design-locales/it.json";
import locale16 from "./home-design-locales/ja.json";
import locale17 from "./home-design-locales/ko.json";
import locale18 from "./home-design-locales/ms.json";
import locale19 from "./home-design-locales/nl.json";
import locale20 from "./home-design-locales/no.json";
import locale21 from "./home-design-locales/pl.json";
import locale22 from "./home-design-locales/pt-BR.json";
import locale23 from "./home-design-locales/ro.json";
import locale24 from "./home-design-locales/ru.json";
import locale25 from "./home-design-locales/sk.json";
import locale26 from "./home-design-locales/sv.json";
import locale27 from "./home-design-locales/th.json";
import locale28 from "./home-design-locales/tr.json";
import locale29 from "./home-design-locales/uk.json";
import locale30 from "./home-design-locales/vi.json";
import locale31 from "./home-design-locales/zh-Hans.json";
import locale32 from "./home-design-locales/zh-Hant.json";

export type HomeDesignCopy = typeof locale6;
export const HOME_DESIGN_COPY = {
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
  "zh-Hant": locale32
} satisfies Record<SiteLocale, HomeDesignCopy>;

export function getHomeDesignCopy(locale: SiteLocale): HomeDesignCopy {
  return HOME_DESIGN_COPY[locale];
}

// Media and feature destinations are independent of tutorial content and copy.
export const HOME_FEATURE_MEDIA = {
  hero: {workspace: "/product/hero-workspace-v1.webp"},
  outline: {before: "/product/dragon-outline-v1.svg", after: "/product/dragon-default-desktop-v1.svg", href: "/help/vector-editing#tools"},
  interlock: {src: "/template_editor-v1-6.webp", href: "/help/templates"},
  generation: {videoId: "MyeE4t5dMaU", poster: "/video-poster-v1-6.webp", href: "/jigsaw-puzzle-generator"},
} as const;
