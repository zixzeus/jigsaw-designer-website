import type {SiteLocale} from "@/config/seo";
import type {ToolDemonstrationCopy, ToolDemonstrationItem} from "@/components/ToolDemonstrations";

import locale0 from "./tool-guide-locales/ar.json";
import locale1 from "./tool-guide-locales/ca.json";
import locale2 from "./tool-guide-locales/cs.json";
import locale3 from "./tool-guide-locales/da.json";
import locale4 from "./tool-guide-locales/de.json";
import locale5 from "./tool-guide-locales/el.json";
import locale6 from "./tool-guide-locales/en.json";
import locale7 from "./tool-guide-locales/es.json";
import locale8 from "./tool-guide-locales/fi.json";
import locale9 from "./tool-guide-locales/fr.json";
import locale10 from "./tool-guide-locales/he.json";
import locale11 from "./tool-guide-locales/hi.json";
import locale12 from "./tool-guide-locales/hr.json";
import locale13 from "./tool-guide-locales/hu.json";
import locale14 from "./tool-guide-locales/id.json";
import locale15 from "./tool-guide-locales/it.json";
import locale16 from "./tool-guide-locales/ja.json";
import locale17 from "./tool-guide-locales/ko.json";
import locale18 from "./tool-guide-locales/ms.json";
import locale19 from "./tool-guide-locales/nl.json";
import locale20 from "./tool-guide-locales/no.json";
import locale21 from "./tool-guide-locales/pl.json";
import locale22 from "./tool-guide-locales/pt-BR.json";
import locale23 from "./tool-guide-locales/ro.json";
import locale24 from "./tool-guide-locales/ru.json";
import locale25 from "./tool-guide-locales/sk.json";
import locale26 from "./tool-guide-locales/sv.json";
import locale27 from "./tool-guide-locales/th.json";
import locale28 from "./tool-guide-locales/tr.json";
import locale29 from "./tool-guide-locales/uk.json";
import locale30 from "./tool-guide-locales/vi.json";
import locale31 from "./tool-guide-locales/zh-Hans.json";
import locale32 from "./tool-guide-locales/zh-Hant.json";

const TOOL_GUIDE_COPY = {
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
} satisfies Record<SiteLocale, ToolDemonstrationCopy>;

export function getToolGuideCopy(locale: SiteLocale): ToolDemonstrationCopy {
  return TOOL_GUIDE_COPY[locale];
}

const size = {width: 1576, height: 768};
const point = (x: number, y: number): [number, number] => [x / size.width, y / size.height];

export const TOOL_GUIDE_ITEMS: ToolDemonstrationItem[] = [
  {id: "select", number: 1, uiLabel: "Select", before: "/guide/tools/select-before-v1.webp", after: "/guide/tools/select-after-v1.webp", ...size, gesture: {from: point(730, 260), to: point(810, 330)}},
  {id: "point-edit", number: 2, uiLabel: "Edit", before: "/guide/tools/point-edit-before-v1.webp", after: "/guide/tools/point-edit-after-v1.webp", ...size, gesture: {from: point(810, 350), to: point(870, 280)}},
  {id: "pencil", number: 3, uiLabel: "Pencil", before: "/guide/tools/pencil-before-v1.webp", after: "/guide/tools/pencil-options-v1.webp", ...size, gesture: {from: point(640, 510), to: point(980, 310)}},
  {id: "line", number: 4, uiLabel: "Line", before: "/guide/tools/line-before-v1.webp", after: "/guide/tools/line-after-v1.webp", ...size, gesture: {from: point(640, 300), to: point(980, 490)}},
  {id: "rectangle", number: 5, uiLabel: "Rectangle", before: "/guide/tools/rectangle-before-v1.webp", after: "/guide/tools/rectangle-after-v1.webp", ...size, gesture: {from: point(650, 260), to: point(970, 520)}},
  {id: "circle", number: 6, uiLabel: "Circle", before: "/guide/tools/circle-before-v1.webp", after: "/guide/tools/circle-after-v1.webp", ...size, gesture: {from: point(790, 390), to: point(960, 390)}},
  {id: "polygon", number: 7, uiLabel: "Polygon", before: "/guide/tools/polygon-before-v1.webp", after: "/guide/tools/polygon-after-v1.webp", ...size, clickPoints: [point(660, 320), point(860, 250), point(990, 450), point(720, 550)]},
  {id: "bezier", number: 8, uiLabel: "Bezier", before: "/guide/tools/bezier-before-v1.webp", after: "/guide/tools/bezier-after-v1.webp", ...size, gesture: {from: point(810, 350), to: point(900, 350)}, clickPoints: [point(630, 500), point(810, 350), point(1000, 500)]},
];

export const TOOL_GUIDE_TOOLBAR = {
  src: "/toolbar-v1-6.webp", width: 1024, height: 52,
  positions: [198, 248, 296, 344, 393, 441, 489, 538].map((x) => x / 1024),
};
