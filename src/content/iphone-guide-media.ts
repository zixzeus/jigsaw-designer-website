import type {GuideMarker, GuideMedia} from "./interface-guide";
import {INTERFACE_GUIDE_MEDIA} from "./interface-guide";

const marker = (number: number, x: number, y: number, labelX: number, labelY: number): GuideMarker => ({number, x, y, labelX, labelY});
const portrait = (name: string, markers?: GuideMarker[]): GuideMedia => ({src: `/guide/iphone/${name}-v1.webp`, width: 1320, height: 2868, markers});

// Coordinates refer to the full, unaltered captures. Only the two landscape
// images are losslessly rotated to match their placement in Figma board 07.
export const IPHONE_GUIDE_MEDIA = {
  workspace: {...INTERFACE_GUIDE_MEDIA.iphoneWorkspace, markers: [
    marker(1, 110, 248, 110, 425), marker(2, 260, 248, 390, 390),
    marker(3, 1000, 248, 970, 425), marker(4, 1210, 248, 1210, 425),
    marker(5, 142, 920, 340, 785), marker(6, 660, 2660, 660, 2780),
  ]},
  parameters: portrait("02-project-parameters", [marker(1, 650, 1050, 1190, 1050), marker(2, 690, 1810, 1190, 1710), marker(3, 690, 2200, 1190, 2350)]),
  pencil: {...INTERFACE_GUIDE_MEDIA.iphoneTools, markers: [marker(2, 318, 1500, 650, 1660)]},
  selection: portrait("04-selection-actions", [marker(1, 355, 1290, 650, 820)]),
  properties: portrait("05-object-properties", [marker(1, 530, 1110, 1170, 1110), marker(2, 650, 2200, 1170, 2120)]),
  templates: portrait("06-slot-template-library", [marker(1, 1205, 522, 1190, 365), marker(2, 460, 688, 850, 570), marker(3, 645, 1320, 990, 1280)]),
  templateDraw: portrait("07-custom-template-drawn", [marker(2, 880, 730, 1190, 870)]),
  templateEdit: portrait("08-template-node-editing", [marker(3, 580, 1300, 1190, 1100)]),
  templateSaved: portrait("09-template-saved-reselected", [marker(4, 630, 1120, 1020, 1300)]),
  before: portrait("10-outline-before-generation", [marker(1, 520, 1300, 660, 1120)]),
  after: portrait("11-outline-after-generation", [marker(2, 1210, 248, 1190, 440)]),
  layers: {...INTERFACE_GUIDE_MEDIA.iphoneLayers, markers: [marker(1, 100, 700, 75, 870), marker(2, 1220, 810, 1130, 620)]},
  menu: portrait("13-main-menu", [marker(1, 640, 670, 1010, 670)]),
  settings: portrait("14-advanced-settings-top"),
  exportSave: portrait("15-svg-export-save", [marker(2, 1160, 340, 1150, 520)]),
  importPicker: portrait("16-svg-import-picker"),
  imported: portrait("17-svg-reimport-result"),
  library: portrait("18-project-library", [marker(1, 360, 650, 350, 950), marker(2, 660, 2680, 660, 2490)]),
  landscape: {src: "/guide/iphone/19-landscape-editor-v1.webp", width: 2868, height: 1320, markers: [marker(1, 1400, 115, 1400, 330)]},
  landscapeSidebar: {src: "/guide/iphone/20-landscape-sidebar-v1.webp", width: 2868, height: 1320, markers: [marker(2, 850, 1220, 1110, 1220)]},
} satisfies Record<string, GuideMedia>;
