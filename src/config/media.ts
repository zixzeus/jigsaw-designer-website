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
