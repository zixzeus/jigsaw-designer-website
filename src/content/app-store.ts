import type {SiteLocale} from "@/config/seo";

export interface AppStoreCopy {
  readonly regionLabel: string;
  readonly automaticLabel: string;
}

const translations = {
  en: {
    regionLabel: "App Store region",
    automaticLabel: "Automatic",
  },
  "zh-Hans": {
    regionLabel: "App Store 地区",
    automaticLabel: "自动",
  },
  "zh-Hant": {
    regionLabel: "App Store 地區",
    automaticLabel: "自動",
  },
  es: {
    regionLabel: "Región del App Store",
    automaticLabel: "Automático",
  },
  fr: {
    regionLabel: "Région de l’App Store",
    automaticLabel: "Automatique",
  },
  de: {
    regionLabel: "App Store-Region",
    automaticLabel: "Automatisch",
  },
  it: {
    regionLabel: "Regione dell’App Store",
    automaticLabel: "Automatico",
  },
  ja: {
    regionLabel: "App Storeの国・地域",
    automaticLabel: "自動",
  },
  ko: {
    regionLabel: "App Store 국가 또는 지역",
    automaticLabel: "자동",
  },
  "pt-BR": {
    regionLabel: "Região da App Store",
    automaticLabel: "Automático",
  },
  ru: {
    regionLabel: "Регион App Store",
    automaticLabel: "Автоматически",
  },
  tr: {
    regionLabel: "App Store bölgesi",
    automaticLabel: "Otomatik",
  },
  vi: {
    regionLabel: "Khu vực App Store",
    automaticLabel: "Tự động",
  },
  th: {
    regionLabel: "ภูมิภาค App Store",
    automaticLabel: "อัตโนมัติ",
  },
  id: {
    regionLabel: "Wilayah App Store",
    automaticLabel: "Otomatis",
  },
  ms: {
    regionLabel: "Wilayah App Store",
    automaticLabel: "Automatik",
  },
  hi: {
    regionLabel: "App Store का क्षेत्र",
    automaticLabel: "स्वचालित",
  },
  ar: {
    regionLabel: "منطقة App Store",
    automaticLabel: "تلقائي",
  },
  he: {
    regionLabel: "אזור ה-App Store",
    automaticLabel: "אוטומטי",
  },
  nl: {
    regionLabel: "App Store-regio",
    automaticLabel: "Automatisch",
  },
  sv: {
    regionLabel: "App Store-region",
    automaticLabel: "Automatiskt",
  },
  da: {
    regionLabel: "App Store-område",
    automaticLabel: "Automatisk",
  },
  fi: {
    regionLabel: "App Storen alue",
    automaticLabel: "Automaattinen",
  },
  no: {
    regionLabel: "App Store-region",
    automaticLabel: "Automatisk",
  },
  pl: {
    regionLabel: "Region App Store",
    automaticLabel: "Automatycznie",
  },
  ro: {
    regionLabel: "Regiunea App Store",
    automaticLabel: "Automat",
  },
  uk: {
    regionLabel: "Регіон App Store",
    automaticLabel: "Автоматично",
  },
  cs: {
    regionLabel: "Oblast App Storu",
    automaticLabel: "Automaticky",
  },
  hu: {
    regionLabel: "App Store-régió",
    automaticLabel: "Automatikus",
  },
  el: {
    regionLabel: "Περιοχή App Store",
    automaticLabel: "Αυτόματα",
  },
  hr: {
    regionLabel: "Regija trgovine App Store",
    automaticLabel: "Automatski",
  },
  sk: {
    regionLabel: "Oblasť App Storu",
    automaticLabel: "Automaticky",
  },
  ca: {
    regionLabel: "Regió de l’App Store",
    automaticLabel: "Automàtic",
  },
} satisfies Record<SiteLocale, AppStoreCopy>;

export function getAppStoreCopy(locale: string): AppStoreCopy {
  return Object.prototype.hasOwnProperty.call(translations, locale)
    ? translations[locale as SiteLocale]
    : translations.en;
}
