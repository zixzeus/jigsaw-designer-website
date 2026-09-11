export interface MediaDimensions {
  readonly width: number;
  readonly height: number;
}

/**
 * Intrinsic dimensions for the versioned, locally served product visuals.
 *
 * Next/Image uses these values to reserve the correct aspect ratio before an
 * image downloads. Keep this registry aligned with the actual files whenever
 * a screenshot is replaced under a new versioned filename.
 */
export const VERSIONED_MEDIA_DIMENSIONS = {
  "/guide/iphone/02-project-parameters-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/04-selection-actions-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/05-object-properties-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/06-slot-template-library-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/07-custom-template-drawn-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/08-template-node-editing-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/09-template-saved-reselected-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/10-outline-before-generation-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/11-outline-after-generation-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/13-main-menu-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/14-advanced-settings-top-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/15-svg-export-save-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/16-svg-import-picker-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/17-svg-reimport-result-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/18-project-library-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone/19-landscape-editor-v1.webp": {width: 2868, height: 1320},
  "/guide/iphone/20-landscape-sidebar-v1.webp": {width: 2868, height: 1320},
  "/product/hero-workspace-v1.webp": {width: 1920, height: 1080},
  "/guide/workspace-v1.webp": {width: 1365, height: 768},
  "/guide/project-parameters-v1.webp": {width: 299, height: 640},
  "/guide/object-properties-v1.webp": {width: 344, height: 700},
  "/guide/selected-object-v1.webp": {width: 881, height: 675},
  "/guide/template-library-v1.webp": {width: 345, height: 650},
  "/guide/template-new-v1.webp": {width: 692, height: 572},
  "/guide/template-nodes-v1.webp": {width: 692, height: 572},
  "/guide/template-ready-v1.webp": {width: 692, height: 572},
  "/guide/template-saved-v1.webp": {width: 345, height: 360},
  "/guide/layers-v1.webp": {width: 345, height: 650},
  "/guide/node-handles-v1.webp": {width: 240, height: 185},
  "/guide/settings-editor-v1.webp": {width: 501, height: 700},
  "/guide/settings-pencil-v1.webp": {width: 501, height: 700},
  "/guide/settings-export-v1.webp": {width: 501, height: 700},
  "/guide/generation-before-v1.webp": {width: 1576, height: 768},
  "/guide/generation-after-v1.webp": {width: 1576, height: 768},
  "/guide/iphone-workspace-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone-layers-v1.webp": {width: 1320, height: 2868},
  "/guide/iphone-tools-v1.webp": {width: 1320, height: 2868},
  "/guide/tools/bezier-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/bezier-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/circle-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/circle-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/line-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/line-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/pencil-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/pencil-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/pencil-options-v1.webp": {width: 1576, height: 768},
  "/guide/tools/point-edit-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/point-edit-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/polygon-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/polygon-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/rectangle-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/rectangle-before-v1.webp": {width: 1576, height: 768},
  "/guide/tools/select-after-v1.webp": {width: 1576, height: 768},
  "/guide/tools/select-before-v1.webp": {width: 1576, height: 768},
  "/product/dragon-outline-v1.svg": {width: 478, height: 513},
  "/product/dragon-default-mobile-v1.svg": {width: 257, height: 276},
  "/product/dragon-default-desktop-v1.svg": {width: 478, height: 513},
  "/product/dragon-desktop-v1.svg": {width: 478, height: 513},
  "/product/dragon-v1.svg": {width: 257, height: 276},
  "/product/rabbit-v1.svg": {width: 425, height: 425},
  "/product/wildlife-v1.svg": {width: 425, height: 425},
  "/product/fruit-v1.svg": {width: 425, height: 425},
  "/product/sprite-v1.svg": {width: 425, height: 425},
  "/product/slot-leaf-v1.svg": {width: 159, height: 224},
  "/product/slot-round-v1.svg": {width: 159, height: 224},
  "/product/iphone-editor-v1.webp": {width: 1320, height: 2868},
  "/advanced-settings-editor-v1-6.webp": {width: 501, height: 700},
  "/advanced_settings-v1-6.webp": {width: 509, height: 702},
  "/app-icon-v1.webp": {width: 256, height: 256},
  "/canvas_workspace-v1-6.webp": {width: 1024, height: 839},
  "/context_menu-v1-6.webp": {width: 1024, height: 731},
  "/device-ipad-vector-editing-v1-6.webp": {width: 1600, height: 1200},
  "/device-iphone-vector-selection-v1-6.webp": {width: 720, height: 1560},
  "/device-mac-svg-workspace-v1-6.webp": {width: 1600, height: 900},
  "/editor_overview-v1-6.webp": {width: 1024, height: 576},
  "/gen_step2-v1-6.webp": {width: 1024, height: 576},
  "/gen_step3-v1-6.webp": {width: 1024, height: 576},
  "/gen_step4-v1-6.webp": {width: 1024, height: 576},
  "/generated-result-editable-v1-6.webp": {width: 1569, height: 768},
  "/generation-export-settings-v1-6.webp": {width: 501, height: 700},
  "/generation-ready-v1-6.webp": {width: 1569, height: 768},
  "/layers_panel-v1-6.webp": {width: 308, height: 1024},
  "/my_projects-v1-6.webp": {width: 1024, height: 798},
  "/og-jigsawdesigner-v1.jpg": {width: 1200, height: 630},
  "/public_projects-v1-6.webp": {width: 1024, height: 798},
  "/project-library-v1-6.webp": {width: 1568, height: 768},
  "/right_inspector-v1-6.webp": {width: 334, height: 1024},
  "/shape_info-v1-6.webp": {width: 334, height: 1024},
  "/shared_projects-v1-6.webp": {width: 1024, height: 731},
  "/svg-import-fidelity-v1-6.webp": {width: 1569, height: 768},
  "/template_editor-v1-6.webp": {width: 698, height: 677},
  "/templates_panel-v1-6.webp": {width: 308, height: 1024},
  "/toolbar-v1-6.webp": {width: 1024, height: 52},
  "/tools_panel-v1-6.webp": {width: 308, height: 1024},
  "/vector-point-edit-v1-6.webp": {width: 1569, height: 768},
  "/video-poster-v1-6.webp": {width: 1920, height: 1080},
} as const satisfies Record<string, MediaDimensions>;

export type VersionedMediaPath = keyof typeof VERSIONED_MEDIA_DIMENSIONS;

export function getMediaDimensions(pathname: string): MediaDimensions {
  const dimensions = VERSIONED_MEDIA_DIMENSIONS[pathname as VersionedMediaPath];
  if (!dimensions) {
    throw new Error(`Missing intrinsic dimensions for versioned media: ${pathname}`);
  }
  return dimensions;
}
