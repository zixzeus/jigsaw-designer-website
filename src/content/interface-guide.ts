import type {SiteLocale} from "@/config/seo";

import locale0 from "./interface-guide-locales/ar.json";
import locale1 from "./interface-guide-locales/ca.json";
import locale2 from "./interface-guide-locales/cs.json";
import locale3 from "./interface-guide-locales/da.json";
import locale4 from "./interface-guide-locales/de.json";
import locale5 from "./interface-guide-locales/el.json";
import locale6 from "./interface-guide-locales/en.json";
import locale7 from "./interface-guide-locales/es.json";
import locale8 from "./interface-guide-locales/fi.json";
import locale9 from "./interface-guide-locales/fr.json";
import locale10 from "./interface-guide-locales/he.json";
import locale11 from "./interface-guide-locales/hi.json";
import locale12 from "./interface-guide-locales/hr.json";
import locale13 from "./interface-guide-locales/hu.json";
import locale14 from "./interface-guide-locales/id.json";
import locale15 from "./interface-guide-locales/it.json";
import locale16 from "./interface-guide-locales/ja.json";
import locale17 from "./interface-guide-locales/ko.json";
import locale18 from "./interface-guide-locales/ms.json";
import locale19 from "./interface-guide-locales/nl.json";
import locale20 from "./interface-guide-locales/no.json";
import locale21 from "./interface-guide-locales/pl.json";
import locale22 from "./interface-guide-locales/pt-BR.json";
import locale23 from "./interface-guide-locales/ro.json";
import locale24 from "./interface-guide-locales/ru.json";
import locale25 from "./interface-guide-locales/sk.json";
import locale26 from "./interface-guide-locales/sv.json";
import locale27 from "./interface-guide-locales/th.json";
import locale28 from "./interface-guide-locales/tr.json";
import locale29 from "./interface-guide-locales/uk.json";
import locale30 from "./interface-guide-locales/vi.json";
import locale31 from "./interface-guide-locales/zh-Hans.json";
import locale32 from "./interface-guide-locales/zh-Hant.json";

export const interfaceGuideEnglishCopy = locale6;
export type InterfaceGuideCopy = {[Key in keyof typeof interfaceGuideEnglishCopy]: string};

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
} satisfies Record<SiteLocale, InterfaceGuideCopy>;

export function getInterfaceGuideCopy(locale: SiteLocale): InterfaceGuideCopy {
  return translations[locale];
}

export type GuideMarker = {
  number: number;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
};

export type GuideMedia = {
  src: string;
  width: number;
  height: number;
  gutter?: number;
  markers?: GuideMarker[];
};

const panelMarkers = (width: number, points: [number, number][]): GuideMarker[] =>
  points.map(([x, y], index) => ({number: index + 1, x, y, labelX: width + 42, labelY: y}));

export const INTERFACE_GUIDE_MEDIA = {
  workspace: {
    src: "/guide/workspace-v1.webp", width: 1365, height: 768,
    markers: [
      {number: 1, x: 570, y: 38, labelX: 580, labelY: 102},
      {number: 2, x: 151, y: 25, labelX: 226, labelY: 83},
      {number: 3, x: 690, y: 430, labelX: 974, labelY: 470},
      {number: 4, x: 150, y: 314, labelX: 252, labelY: 273},
      {number: 5, x: 1270, y: 165, labelX: 1190, labelY: 220},
      {number: 6, x: 1140, y: 580, labelX: 1256, labelY: 623},
    ],
  },
  parameters: {
    src: "/guide/project-parameters-v1.webp", width: 299, height: 640, gutter: 84,
    markers: panelMarkers(299, [[246, 50], [246, 175], [246, 299], [246, 329], [246, 371], [125, 566]]),
  },
  inspector: {
    src: "/guide/object-properties-v1.webp", width: 344, height: 700, gutter: 84,
    markers: panelMarkers(344, [[269, 82], [260, 257], [275, 322], [290, 500], [113, 615]]),
  },
  selectedObject: {src: "/guide/selected-object-v1.webp", width: 881, height: 675},
  templates: {
    src: "/guide/template-library-v1.webp", width: 345, height: 650, gutter: 84,
    markers: [
      {number: 1, x: 310, y: 46, labelX: 387, labelY: 46},
      {number: 2, x: 180, y: 91, labelX: 387, labelY: 91},
      {number: 3, x: 245, y: 245, labelX: 387, labelY: 245},
      {number: 4, x: 250, y: 383, labelX: 387, labelY: 383},
      {number: 5, x: 164, y: 132, labelX: 387, labelY: 169},
    ],
  },
  templateNew: {src: "/guide/template-new-v1.webp", width: 692, height: 572, markers: [{number: 1, x: 382, y: 45, labelX: 563, labelY: 115}]},
  templateNodes: {src: "/guide/template-nodes-v1.webp", width: 692, height: 572, markers: [{number: 2, x: 310, y: 220, labelX: 434, labelY: 170}]},
  templateReady: {src: "/guide/template-ready-v1.webp", width: 692, height: 572, markers: [{number: 3, x: 635, y: 538, labelX: 495, labelY: 518}]},
  templateSaved: {src: "/guide/template-saved-v1.webp", width: 345, height: 360},
  layers: {
    src: "/guide/layers-v1.webp", width: 345, height: 650, gutter: 84,
    markers: [
      {number: 1, x: 16, y: 77, labelX: 387, labelY: 52},
      {number: 2, x: 145, y: 108, labelX: 387, labelY: 109},
      {number: 3, x: 286, y: 140, labelX: 387, labelY: 164},
      {number: 4, x: 312, y: 202, labelX: 387, labelY: 221},
    ],
  },
  nodes: {
    src: "/guide/node-handles-v1.webp", width: 240, height: 185, gutter: 50,
    markers: [
      {number: 5, x: 60, y: 131, labelX: 24, labelY: 165},
      {number: 6, x: 150, y: 56, labelX: 245, labelY: 32},
    ],
  },
  editorSettings: {src: "/guide/settings-editor-v1.webp", width: 501, height: 700, markers: [
    {number: 1, x: 399, y: 147, labelX: 444, labelY: 95},
    {number: 2, x: 429, y: 449, labelX: 350, labelY: 401},
  ]},
  pencilSettings: {src: "/guide/settings-pencil-v1.webp", width: 501, height: 700, markers: [
    {number: 3, x: 141, y: 275, labelX: 245, labelY: 238},
    {number: 4, x: 429, y: 506, labelX: 361, labelY: 468},
  ]},
  exportSettings: {src: "/guide/settings-export-v1.webp", width: 501, height: 700, markers: [
    {number: 5, x: 248, y: 123, labelX: 382, labelY: 123},
    {number: 6, x: 266, y: 455, labelX: 382, labelY: 452},
  ]},
  generationBefore: {src: "/guide/generation-before-v1.webp", width: 1576, height: 768},
  generationAfter: {src: "/guide/generation-after-v1.webp", width: 1576, height: 768},
  iphoneWorkspace: {src: "/guide/iphone-workspace-v1.webp", width: 1320, height: 2868},
  iphoneLayers: {src: "/guide/iphone-layers-v1.webp", width: 1320, height: 2868},
  iphoneTools: {src: "/guide/iphone-tools-v1.webp", width: 1320, height: 2868},
} satisfies Record<string, GuideMedia>;

export const INTERFACE_GUIDE_CHAPTERS = [
  {id: "workspace", title: "workspaceTitle"},
  {id: "tools", title: "toolsTitle"},
  {id: "parameters", title: "parametersTitle"},
  {id: "object-inspector", title: "inspectorTitle"},
  {id: "template-library", title: "templatesTitle"},
  {id: "template-workflow", title: "workflowTitle"},
  {id: "layers-nodes", title: "layersTitle"},
  {id: "advanced-settings", title: "advancedTitle"},
  {id: "generation", title: "generationTitle"},
] as const;
