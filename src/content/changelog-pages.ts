import {
  commonLabels,
  type ArticleContent,
  type TierOneLocale,
} from "./types";

export const changelogSlugs = ["1-6-0"] as const;
export type ChangelogSlug = (typeof changelogSlugs)[number];

type ArticleSeed = Omit<ArticleContent, "labels" | "schemaType">;

function article(locale: TierOneLocale, seed: ArticleSeed): ArticleContent {
  return {...seed, schemaType: "TechArticle", labels: commonLabels[locale]};
}

const pages: Record<ChangelogSlug, Record<TierOneLocale, ArticleContent>> = {
  "1-6-0": {
    en: article("en", {
      slug: "changelog/1-6-0",
      eyebrow: "Version 1.6.0 overview",
      title: "JigsawDesigner 1.6.0: SVG Fidelity and Faster Vector Editing",
      seoTitle: "JigsawDesigner 1.6.0 Changelog",
      seoDescription:
        "See the JigsawDesigner 1.6.0 improvements to SVG resources, selection transforms, Pencil paths, open contours, accurate zoom, and project migration.",
      intro:
        "Version 1.6.0 focuses on keeping richer SVG projects intact and making common vector-editing actions feel more direct. The source project identifies the build as 1.6.0 (36); check the App Store listing for the version currently available in your storefront.",
      leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner 1.6.0 with its Layers hierarchy and Shape Info visible", caption: "Inspect imported artwork on the canvas, in Layers, and in Shape Info."},
      highlights: [
        "More reliable embedded SVG resources",
        "On-canvas selection resize and rotation",
        "Smoother Pencil paths and open-path workflows",
        "Accurate zoom, Fit to Window, and project migration",
      ],
      sections: [
        {
          id: "svg-fidelity",
          title: "Richer SVG documents survive the edit-save-reopen cycle",
          paragraphs: [
            "Version 1.6.0 more reliably preserves embedded images, gradients, patterns, and clipping paths while importing, editing, saving, and reopening a project. Project packages keep document.svg beside content-addressed assets so editable source files can remain portable.",
          ],
          image: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner 1.6.0 with its Layers hierarchy and Shape Info visible", caption: "Inspect imported artwork on the canvas, in Layers, and in Shape Info."},
        },
        {
          id: "transforms",
          title: "Resize and rotate selections on the canvas",
          paragraphs: [
            "Selection handles now support direct resize and rotation around the selection center. Proportion locking and Inspector values remain available when a precise numeric adjustment is more appropriate.",
          ],
          image: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected with resize and rotation handles in JigsawDesigner 1.6.0", caption: "Selection handles resize and rotate an editable generated group on the canvas."},
        },
        {
          id: "drawing",
          title: "Smoother Pencil curves and better open contours",
          paragraphs: [
            "Pencil processing produces smoother paths, and open contours can be continued or joined. Point Edit remains available for refining anchors and Bezier handles after drawing.",
          ],
          image: {src: "/vector-point-edit-v1-6.webp", alt: "Point Edit anchors shown around a puzzle boundary in JigsawDesigner 1.6.0", caption: "Point Edit exposes path anchors for detailed refinement after drawing."},
        },
        {
          id: "zoom-migration",
          title: "Accurate zoom and migration from earlier projects",
          paragraphs: [
            "The editor reports a real zoom percentage, supports Fit to Window, and keeps screen-sized anchors and handles useful across a wide zoom range. Version 1.6.0 also includes migration for local and iCloud projects created by earlier releases, plus stability fixes.",
          ],
          note: "SVG remains the current and only export format.",
        },
      ],
      related: [
        {href: "/svg-puzzle-editor", title: "SVG puzzle editor", description: "Explore the complete SVG editing workflow."},
        {href: "/help/vector-editing", title: "Vector editing guide", description: "Learn the current selection, Pencil, and point-editing tools."},
      ],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "changelog/1-6-0",
      eyebrow: "1.6.0 版本概览",
      title: "JigsawDesigner 1.6.0：更可靠的 SVG 与更直接的矢量编辑",
      seoTitle: "JigsawDesigner 1.6.0 更新日志",
      seoDescription: "了解 1.6.0 对 SVG 资源、选区变换、Pencil 路径、开放轮廓、真实缩放和项目迁移的改进。",
      intro: "1.6.0 重点改善复杂 SVG 项目的保留能力，并让常用矢量编辑操作更直接。源码项目标识为 1.6.0（36）；你所在地区当前可下载的版本请以 App Store 页面为准。",
      leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 1.6.0 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "在画布、图层和形状信息中检查导入图稿。"},
      highlights: ["更可靠地保留嵌入 SVG 资源", "在画布上缩放和旋转选区", "更平滑的 Pencil 与开放路径工作流", "真实缩放、适合窗口与项目迁移"],
      sections: [
        {id: "svg-fidelity", title: "复杂 SVG 在编辑、保存和重新打开后更完整", paragraphs: ["1.6.0 更可靠地保留嵌入图片、渐变、图案和裁剪路径。.jigsawproject 会把 document.svg 与内容寻址资源保存在一起。"], image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 1.6.0 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "在画布、图层和形状信息中检查导入图稿。"}},
        {id: "transforms", title: "在画布上缩放和旋转选区", paragraphs: ["选区手柄支持围绕中心直接缩放和旋转；需要精确调整时仍可锁定比例并使用 Inspector 数值。"], image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 1.6.0 中带有缩放和旋转手柄的所选拼图切割线", caption: "使用选区手柄在画布上缩放和旋转可编辑的生成分组。"}},
        {id: "drawing", title: "更平滑的 Pencil 曲线与开放轮廓", paragraphs: ["Pencil 处理生成更平滑的路径，开放轮廓可以继续或连接；绘制后可使用 Point Edit 调整锚点和 Bezier 控制柄。"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 1.6.0 中使用点编辑显示拼图边界锚点", caption: "绘制后使用点编辑显示路径锚点并进行细调。"}},
        {id: "zoom-migration", title: "真实缩放与旧项目迁移", paragraphs: ["编辑器显示真实缩放比例、支持适合窗口，并在宽广缩放范围内保持控制点可操作。1.6.0 还包括更早版本创建的本地与 iCloud 项目迁移，以及稳定性修复。"], note: "当前唯一导出格式仍为 SVG。"},
      ],
      related: [{href: "/svg-puzzle-editor", title: "SVG 拼图编辑器", description: "了解完整 SVG 编辑工作流。"}, {href: "/help/vector-editing", title: "矢量编辑指南", description: "了解当前选择、Pencil 和点编辑工具。"}],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "changelog/1-6-0",
      eyebrow: "1.6.0 版本概覽",
      title: "JigsawDesigner 1.6.0：更可靠的 SVG 與更直接的向量編輯",
      seoTitle: "JigsawDesigner 1.6.0 更新日誌",
      seoDescription: "瞭解 1.6.0 對 SVG 資源、選取變形、Pencil 路徑、開放輪廓、真實縮放與專案移轉的改進。",
      intro: "1.6.0 著重改善複雜 SVG 專案的保留能力，並讓常用向量編輯操作更直接。來源專案標示為 1.6.0（36）；所在地區目前可下載的版本請以 App Store 頁面為準。",
      leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 1.6.0 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "在畫布、圖層與形狀資訊中檢查匯入圖稿。"},
      highlights: ["更可靠地保留嵌入 SVG 資源", "在畫布上縮放與旋轉選取範圍", "更平滑的 Pencil 與開放路徑工作流程", "真實縮放、符合視窗與專案移轉"],
      sections: [
        {id: "svg-fidelity", title: "複雜 SVG 在編輯、儲存與重新開啟後更完整", paragraphs: ["1.6.0 更可靠地保留嵌入圖片、漸層、圖樣與裁剪路徑。.jigsawproject 會將 document.svg 與內容定址資源儲存在一起。"], image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 1.6.0 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "在畫布、圖層與形狀資訊中檢查匯入圖稿。"}},
        {id: "transforms", title: "在畫布上縮放與旋轉選取範圍", paragraphs: ["選取把手支援圍繞中心直接縮放與旋轉；需要精確調整時仍可鎖定比例並使用 Inspector 數值。"], image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 1.6.0 中帶有縮放與旋轉把手的所選拼圖切割線", caption: "使用選取把手在畫布上縮放與旋轉可編輯的產生群組。"}},
        {id: "drawing", title: "更平滑的 Pencil 曲線與開放輪廓", paragraphs: ["Pencil 處理產生更平滑的路徑，開放輪廓可繼續或連接；繪製後可使用 Point Edit 調整錨點與 Bezier 控制把手。"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 1.6.0 中使用節點編輯顯示拼圖邊界錨點", caption: "繪製後使用節點編輯顯示路徑錨點並進行細調。"}},
        {id: "zoom-migration", title: "真實縮放與舊專案移轉", paragraphs: ["編輯器顯示真實縮放比例、支援符合視窗，並在寬廣縮放範圍維持控制點可操作。1.6.0 也包含較早版本建立的本機與 iCloud 專案移轉，以及穩定性修正。"], note: "目前唯一匯出格式仍為 SVG。"},
      ],
      related: [{href: "/svg-puzzle-editor", title: "SVG 拼圖編輯器", description: "瞭解完整 SVG 編輯工作流程。"}, {href: "/help/vector-editing", title: "向量編輯指南", description: "瞭解目前選取、Pencil 與節點編輯工具。"}],
    }),
  },
};

export function isChangelogSlug(value: string): value is ChangelogSlug {
  return changelogSlugs.includes(value as ChangelogSlug);
}

export function getChangelogPage(
  slug: string,
  locale: TierOneLocale,
): ArticleContent | null {
  return isChangelogSlug(slug) ? pages[slug][locale] : null;
}
