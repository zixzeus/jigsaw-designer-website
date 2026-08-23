import {PRODUCT_FACTS} from "@/config/product";

import {
  commonLabels,
  type ArticleContent,
  type TierOneLocale,
} from "./types";

export const marketingSlugs = [
  "jigsaw-puzzle-generator",
  "jigsaw-dieline-generator",
  "laser-cut-jigsaw-puzzle-svg",
  "custom-jigsaw-puzzle-template",
  "svg-puzzle-editor",
  "how-to-make-a-laser-cut-jigsaw-puzzle",
] as const;

export type MarketingSlug = (typeof marketingSlugs)[number];

type ArticleSeed = Omit<ArticleContent, "labels">;

function article(locale: TierOneLocale, seed: ArticleSeed): ArticleContent {
  return {...seed, labels: commonLabels[locale]};
}

const related = {
  en: {
    generator: {
      href: "/jigsaw-puzzle-generator",
      title: "Jigsaw puzzle generator",
      description: "See the complete boundary-to-SVG generation workflow.",
    },
    dieline: {
      href: "/jigsaw-dieline-generator",
      title: "Jigsaw dieline generator",
      description: "Learn how editable puzzle cutlines are generated and refined.",
    },
    laser: {
      href: "/laser-cut-jigsaw-puzzle-svg",
      title: "Laser-cut jigsaw SVG workflow",
      description: "Prepare exported SVG geometry for a downstream cutting workflow.",
    },
    template: {
      href: "/custom-jigsaw-puzzle-template",
      title: "Custom slot templates",
      description: "Build, import, and reuse the connection shape used by the generator.",
    },
    editor: {
      href: "/svg-puzzle-editor",
      title: "SVG puzzle editor",
      description: "Edit paths, groups, layers, and generated geometry on Apple devices.",
    },
    helpGeneration: {
      href: "/help/jigsaw-generation",
      title: "Jigsaw generation guide",
      description: "Review boundaries, templates, parameters, and output inspection.",
    },
    helpEditing: {
      href: "/help/vector-editing",
      title: "Vector editing guide",
      description: "Use selection, point editing, layers, and transforms to refine the SVG.",
    },
    helpTemplates: {
      href: "/help/templates",
      title: "Slot template guide",
      description: "Create, import, manage, and reuse connection profiles.",
    },
    helpImport: {
      href: "/help/svg-import-export",
      title: "SVG import and export guide",
      description: "Understand the supported SVG handoff workflow.",
    },
  },
  "zh-Hans": {
    generator: {
      href: "/jigsaw-puzzle-generator",
      title: "拼图生成器",
      description: "了解从边界轮廓到 SVG 切割线的完整流程。",
    },
    dieline: {
      href: "/jigsaw-dieline-generator",
      title: "拼图刀模生成器",
      description: "了解如何生成和继续编辑拼图切割线。",
    },
    laser: {
      href: "/laser-cut-jigsaw-puzzle-svg",
      title: "激光切割拼图 SVG 工作流",
      description: "将导出的 SVG 几何交给下游切割软件继续设置。",
    },
    template: {
      href: "/custom-jigsaw-puzzle-template",
      title: "自定义卡槽模板",
      description: "创建、导入并复用生成器使用的连接形状。",
    },
    editor: {
      href: "/svg-puzzle-editor",
      title: "SVG 拼图矢量编辑器",
      description: "在 Apple 设备上编辑路径、分组、图层和生成结果。",
    },
    helpGeneration: {href: "/help/jigsaw-generation", title: "拼图生成指南", description: "查看边界、模板、参数与结果检查方法。"},
    helpEditing: {href: "/help/vector-editing", title: "矢量编辑指南", description: "使用选择、点编辑、图层与变换继续调整 SVG。"},
    helpTemplates: {href: "/help/templates", title: "卡槽模板指南", description: "创建、导入、管理并复用连接轮廓。"},
    helpImport: {href: "/help/svg-import-export", title: "SVG 导入导出指南", description: "了解当前支持的 SVG 交接流程。"},
  },
  "zh-Hant": {
    generator: {
      href: "/jigsaw-puzzle-generator",
      title: "拼圖產生器",
      description: "瞭解從邊界輪廓到 SVG 切割線的完整流程。",
    },
    dieline: {
      href: "/jigsaw-dieline-generator",
      title: "拼圖刀模產生器",
      description: "瞭解如何產生並繼續編輯拼圖切割線。",
    },
    laser: {
      href: "/laser-cut-jigsaw-puzzle-svg",
      title: "雷射切割拼圖 SVG 工作流程",
      description: "將匯出的 SVG 幾何交給下游切割軟體繼續設定。",
    },
    template: {
      href: "/custom-jigsaw-puzzle-template",
      title: "自訂卡槽範本",
      description: "建立、匯入並重複使用產生器採用的連接形狀。",
    },
    editor: {
      href: "/svg-puzzle-editor",
      title: "SVG 拼圖向量編輯器",
      description: "在 Apple 裝置上編輯路徑、群組、圖層與產生結果。",
    },
    helpGeneration: {href: "/help/jigsaw-generation", title: "拼圖產生指南", description: "查看邊界、範本、參數與結果檢查方法。"},
    helpEditing: {href: "/help/vector-editing", title: "向量編輯指南", description: "使用選取、節點編輯、圖層與變形繼續調整 SVG。"},
    helpTemplates: {href: "/help/templates", title: "卡槽範本指南", description: "建立、匯入、管理並重複使用連接輪廓。"},
    helpImport: {href: "/help/svg-import-export", title: "SVG 匯入匯出指南", description: "瞭解目前支援的 SVG 交接流程。"},
  },
} as const;

const pages: Record<MarketingSlug, Record<TierOneLocale, ArticleContent>> = {
  "jigsaw-puzzle-generator": {
    en: article("en", {
      slug: "jigsaw-puzzle-generator",
      eyebrow: "Native Apple puzzle design",
      title: "Jigsaw Puzzle Generator for Mac, iPad, and iPhone",
      seoTitle: "Jigsaw Puzzle Generator for Mac, iPad & iPhone",
      seoDescription:
        "Generate editable jigsaw puzzle cutlines from an SVG boundary, tune piece and slot parameters, refine the result, and export SVG on Apple devices.",
      intro:
        "JigsawDesigner turns a drawn or imported vector boundary into editable puzzle geometry. Choose a slot template, set generation parameters, run the native C++ engine, and keep refining the resulting SVG inside the same project.",
      leadImage: {src: "/generation-ready-v1-6.webp", alt: "A closed puzzle boundary, selected slot template, and generation values ready in JigsawDesigner", caption: "Review the boundary, slot template, and Project Info values before generation."},
      highlights: [
        "Draw a boundary or import an existing SVG",
        "Choose built-in or custom slot templates",
        "Set grid size, target piece count, and slot distance",
        "Edit the generated group before exporting SVG",
      ],
      sections: [
        {
          id: "boundary-to-cutlines",
          title: "From a vector boundary to puzzle cutlines",
          paragraphs: [
            "Start with the outer contour you want the puzzle to occupy. It can be drawn with JigsawDesigner's Pencil, Bezier, Line, Rectangle, Circle, or Polygon tools, or imported from an SVG file.",
            "The generator serializes the project geometry and selected slot template for its native C++ engine. The generated SVG is then imported back into the document as an editable group, so generation is part of the vector workflow rather than a final locked preview.",
          ],
          image: {src: "/generation-ready-v1-6.webp", alt: "A closed puzzle boundary, selected slot template, and generation values ready in JigsawDesigner", caption: "Review the boundary, slot template, and Project Info values before generation."},
        },
        {
          id: "generation-controls",
          title: "Controls that shape the generated pattern",
          paragraphs: [
            "Use grid size and target piece count to describe the density you want. Slot-distance settings affect where the chosen connection profile is placed. Because the result is algorithmic, treat these values as design inputs and inspect the actual generated geometry before using it downstream.",
          ],
          bullets: [
            "Grid size controls the generation grid.",
            "Target piece count guides the requested puzzle density.",
            "Minimum and maximum slot distance constrain connection placement.",
            "The selected slot template supplies the connection path.",
          ],
        },
        {
          id: "edit-and-export",
          title: "Inspect, edit, and export the result",
          paragraphs: [
            "Use the Layers panel, selection tools, point editing, grouping, on-canvas resize and rotation, and Inspector values to refine generated geometry. SVG is the current and only export format.",
            "If the file is destined for printing, craft, or cutting, open the SVG in the relevant downstream software and confirm document units, scale, stroke handling, material settings, and machine-specific requirements there.",
          ],
          note: "JigsawDesigner provides editable SVG geometry. It does not certify a file for a particular machine, material, or manufacturing process.",
          image: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected as an editable group in JigsawDesigner", caption: "Generated cutlines return to Layers as an editable group."},
        },
      ],
      faq: [
        {question: "Which export format does JigsawDesigner support?", answer: "The current and only export format is SVG."},
        {question: "Can I edit the puzzle after generation?", answer: "Yes. The generated SVG returns to the editor as a group that can be selected, organized, transformed, and edited."},
        {question: "Is puzzle generation unlimited for free users?", answer: `The app currently includes ${PRODUCT_FACTS.freeGenerationLimit} free generations. An active Premium subscription unlocks unlimited generation and SVG export.`},
      ],
      related: [related.en.dieline, related.en.template, related.en.helpGeneration],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "jigsaw-puzzle-generator",
      eyebrow: "Apple 原生拼图设计",
      title: "适用于 Mac、iPad 和 iPhone 的拼图生成器",
      seoTitle: "Mac、iPad 与 iPhone 拼图生成器｜JigsawDesigner",
      seoDescription:
        "从 SVG 边界生成可编辑的拼图切割线，设置片数与卡槽参数，在 Apple 设备上继续编辑并导出 SVG。",
      intro:
        "JigsawDesigner 可以把绘制或导入的矢量边界转换为可编辑的拼图几何。选择卡槽模板、设置生成参数、运行原生 C++ 引擎，再在同一个项目里继续编辑生成的 SVG。",
      leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已准备好的闭合拼图边界、所选卡槽模板和生成参数", caption: "生成前检查边界、卡槽模板和项目信息中的参数。"},
      highlights: ["绘制边界或导入 SVG", "选择内置或自定义卡槽模板", "设置网格、目标片数和卡槽距离", "编辑生成结果后导出 SVG"],
      sections: [
        {id: "boundary-to-cutlines", title: "从矢量边界到拼图切割线", paragraphs: ["先准备拼图的外轮廓。你可以使用 Pencil、Bezier、直线、矩形、圆形或多边形工具绘制，也可以导入已有 SVG。", "生成器会把项目几何与所选卡槽模板交给原生 C++ 引擎，并把生成的 SVG 作为可编辑分组重新导入文档。"], image: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已准备好的闭合拼图边界、所选卡槽模板和生成参数", caption: "生成前检查边界、卡槽模板和项目信息中的参数。"}},
        {id: "generation-controls", title: "控制生成图案的参数", paragraphs: ["网格大小与目标片数描述所需密度，卡槽距离控制连接轮廓的放置范围。算法结果可能随输入而变化，因此应检查实际生成的几何。"], bullets: ["网格大小控制生成网格", "目标片数用于引导拼图密度", "最小与最大卡槽距离约束连接位置", "所选模板提供卡槽路径"]},
        {id: "edit-and-export", title: "检查、编辑并导出", paragraphs: ["通过图层、选择、点编辑、分组、画布内缩放旋转和 Inspector 数值继续调整结果。当前唯一导出格式为 SVG。", "若要打印或切割，请在下游软件中确认单位、尺寸、线条处理、材料与设备参数。"], note: "JigsawDesigner 提供可编辑的 SVG 几何，但不对特定设备、材料或制造流程做兼容性认证。", image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中作为可编辑分组选中的拼图切割线", caption: "生成的切割线以可编辑分组返回图层。"}},
      ],
      faq: [
        {question: "当前支持什么导出格式？", answer: "当前唯一导出格式为 SVG。"},
        {question: "生成后还能编辑吗？", answer: "可以。生成的 SVG 会作为分组回到编辑器，可继续组织、变换和编辑。"},
        {question: "免费用户可以无限生成吗？", answer: `当前包含 ${PRODUCT_FACTS.freeGenerationLimit} 次免费生成；Premium 订阅解锁无限生成与 SVG 导出。`},
      ],
      related: [related["zh-Hans"].dieline, related["zh-Hans"].template, related["zh-Hans"].helpGeneration],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "jigsaw-puzzle-generator",
      eyebrow: "Apple 原生拼圖設計",
      title: "適用於 Mac、iPad 與 iPhone 的拼圖產生器",
      seoTitle: "Mac、iPad 與 iPhone 拼圖產生器｜JigsawDesigner",
      seoDescription: "從 SVG 邊界產生可編輯的拼圖切割線，設定片數與卡槽參數，在 Apple 裝置上繼續編輯並匯出 SVG。",
      intro: "JigsawDesigner 能把繪製或匯入的向量邊界轉換成可編輯的拼圖幾何。選擇卡槽範本、設定參數、執行原生 C++ 引擎，再於同一專案中繼續編輯 SVG。",
      leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已準備好的封閉拼圖邊界、所選卡槽範本與產生參數", caption: "產生前檢查邊界、卡槽範本與專案資訊中的參數。"},
      highlights: ["繪製邊界或匯入 SVG", "選擇內建或自訂卡槽範本", "設定網格、目標片數與卡槽距離", "編輯產生結果後匯出 SVG"],
      sections: [
        {id: "boundary-to-cutlines", title: "從向量邊界到拼圖切割線", paragraphs: ["先準備拼圖的外輪廓。可使用 Pencil、Bezier、直線、矩形、圓形或多邊形工具繪製，也可匯入現有 SVG。", "產生器會把專案幾何與所選卡槽範本交給原生 C++ 引擎，並將產生的 SVG 以可編輯群組重新匯入文件。"], image: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已準備好的封閉拼圖邊界、所選卡槽範本與產生參數", caption: "產生前檢查邊界、卡槽範本與專案資訊中的參數。"}},
        {id: "generation-controls", title: "控制產生圖案的參數", paragraphs: ["網格大小與目標片數描述所需密度，卡槽距離控制連接輪廓的放置範圍。演算法結果可能隨輸入改變，因此應檢查實際幾何。"], bullets: ["網格大小控制產生網格", "目標片數引導拼圖密度", "最小與最大卡槽距離限制連接位置", "所選範本提供卡槽路徑"]},
        {id: "edit-and-export", title: "檢查、編輯並匯出", paragraphs: ["透過圖層、選取、節點編輯、群組、畫布縮放旋轉與 Inspector 數值調整結果。目前唯一匯出格式為 SVG。", "若要列印或切割，請在下游軟體確認單位、尺寸、線條處理、材料與設備參數。"], note: "JigsawDesigner 提供可編輯 SVG 幾何，但不對特定設備、材料或製造流程提供相容性認證。", image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中以可編輯群組選取的拼圖切割線", caption: "產生的切割線以可編輯群組回到圖層。"}},
      ],
      faq: [
        {question: "目前支援什麼匯出格式？", answer: "目前唯一匯出格式為 SVG。"},
        {question: "產生後還能編輯嗎？", answer: "可以。產生的 SVG 會以群組回到編輯器，可繼續整理、變形與編輯。"},
        {question: "免費使用者能無限產生嗎？", answer: `目前包含 ${PRODUCT_FACTS.freeGenerationLimit} 次免費產生；Premium 訂閱解鎖無限產生與 SVG 匯出。`},
      ],
      related: [related["zh-Hant"].dieline, related["zh-Hant"].template, related["zh-Hant"].helpGeneration],
    }),
  },

  "jigsaw-dieline-generator": {
    en: article("en", {
      slug: "jigsaw-dieline-generator",
      eyebrow: "Editable vector cutlines",
      title: "Jigsaw Dieline Generator with SVG Editing",
      seoTitle: "Jigsaw Dieline Generator & SVG Cutline Editor",
      seoDescription: "Generate jigsaw dielines from a vector boundary, customize slot profiles, edit paths and layers, and export an SVG for your next workflow.",
      intro: "Create the geometry of a puzzle as editable vector cutlines. JigsawDesigner combines algorithm-driven generation with drawing, point editing, layers, transforms, custom slot templates, and SVG export.",
      leadImage: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected as an editable group in JigsawDesigner", caption: "Generated cutlines remain selectable and editable before SVG export."},
      highlights: ["Algorithm-driven internal cutlines", "Editable vector groups and paths", "Custom connection profiles", "SVG export for downstream use"],
      sections: [
        {id: "what-is-generated", title: "What a jigsaw dieline contains", paragraphs: ["A puzzle cut pattern combines a closed puzzle outline with piece-separation cutlines. Tabs or knobs and their matching blanks or sockets form the interlock along shared piece edges; they are features of those cutlines, not a separate output layer.", "A whimsy is a complete figural piece with a recognizable silhouette—not a generic term for inner paths. JigsawDesigner does not currently generate Whimsy pieces automatically; design or import the geometry deliberately and inspect its integration with surrounding cutlines.", "JigsawDesigner uses the supplied boundary, slot path, grid, target piece count, and distance settings to construct SVG geometry. The generated result remains part of the document tree, so it can be selected, grouped, transformed, and inspected before export."]},
        {id: "refine-vector-geometry", title: "Refine the vector geometry", paragraphs: ["Use Select for whole elements and Point Edit for anchor-level changes. Layers reveal nested groups, while lock and visibility controls help protect or isolate sections of a complex design."], bullets: ["Resize and rotate a selection on the canvas", "Lock proportions while scaling", "Edit Bezier anchors and control handles", "Group or ungroup elements with undo and redo"]},
        {id: "dieline-handoff", title: "Hand the SVG to the next tool", paragraphs: ["Export the document as SVG, then configure production-specific properties in the software responsible for printing or cutting. Stroke colors, kerf compensation, units, material profiles, and machine settings depend on that downstream environment."], note: "Verify the exported SVG in the downstream software used by your equipment before committing material.", image: {src: "/gen_step4-v1-6.webp", alt: "Generated jigsaw dielines ready for inspection in the vector editor"}},
      ],
      faq: [
        {question: "Is a dieline the same as an image?", answer: "No. A dieline is vector geometry that describes boundaries and cutlines."},
        {question: "Does JigsawDesigner guarantee every piece is unique?", answer: "No such guarantee is made. Inspect the generated geometry for your intended design and workflow."},
      ],
      related: [related.en.generator, related.en.laser, related.en.helpEditing],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "jigsaw-dieline-generator", eyebrow: "可编辑矢量切割线", title: "带 SVG 编辑功能的拼图刀模生成器", seoTitle: "拼图刀模生成器与 SVG 切割线编辑器", seoDescription: "根据矢量边界生成拼图刀模，自定义卡槽轮廓，编辑路径与图层，并将 SVG 交给下一步工作流。", intro: "把拼图结构创建为可编辑的矢量切割线。JigsawDesigner 将算法生成与绘图、点编辑、图层、变换、自定义卡槽模板和 SVG 导出结合在一起。", leadImage: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中作为可编辑分组选中的拼图切割线", caption: "生成的切割线在导出 SVG 前仍可选择和编辑。"}, highlights: ["算法驱动的内部切割线", "可编辑的矢量分组与路径", "自定义连接轮廓", "导出 SVG 供下游使用"],
      sections: [
        {id: "what-is-generated", title: "拼图刀模包含什么", paragraphs: ["拼图切割图由闭合的拼图外轮廓与分片切割线组成。凸榫与匹配的凹口沿拼图片共享边界形成互锁；它们是切割线上的几何特征，不是单独的输出层。", "Whimsy 是一整片具有可识别具象轮廓的特殊拼图片，并不是内部路径的统称。JigsawDesigner 当前不会自动生成 Whimsy；请有意识地设计或导入相应几何，并检查它与周围切割线的衔接。", "JigsawDesigner 根据边界、卡槽路径、网格、目标片数和距离设置构建 SVG 几何。结果仍在文档树中，可在导出前选择、分组、变换和检查。"]},
        {id: "refine-vector-geometry", title: "继续调整矢量几何", paragraphs: ["使用选择工具操作整体元素，使用点编辑调整锚点。图层面板展示嵌套分组，锁定和隐藏可帮助隔离复杂设计。"], bullets: ["在画布上缩放和旋转选区", "缩放时锁定比例", "编辑 Bezier 锚点与控制柄", "通过撤销/重做分组或解组"]},
        {id: "dieline-handoff", title: "把 SVG 交给下一步工具", paragraphs: ["导出 SVG 后，在实际负责打印或切割的软件中设置生产属性。描边颜色、切缝补偿、单位、材料配置和设备参数都取决于下游环境。"], note: "投入材料前，请在实际设备使用的下游软件中验证导出的 SVG。", image: {src: "/gen_step4-v1-6.webp", alt: "在矢量编辑器中检查生成的拼图刀模"}},
      ],
      faq: [{question: "刀模和图片一样吗？", answer: "不一样。刀模是描述边界与切割线的矢量几何。"}, {question: "是否保证每一片都完全唯一？", answer: "没有此类保证。请按你的设计目标检查实际生成结果。"}],
      related: [related["zh-Hans"].generator, related["zh-Hans"].laser, related["zh-Hans"].helpEditing],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "jigsaw-dieline-generator", eyebrow: "可編輯向量切割線", title: "具備 SVG 編輯功能的拼圖刀模產生器", seoTitle: "拼圖刀模產生器與 SVG 切割線編輯器", seoDescription: "依向量邊界產生拼圖刀模、自訂卡槽輪廓、編輯路徑與圖層，並將 SVG 交給下一步工作流程。", intro: "把拼圖結構建立為可編輯的向量切割線。JigsawDesigner 結合演算法產生、繪圖、節點編輯、圖層、變形、自訂卡槽範本與 SVG 匯出。", leadImage: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中以可編輯群組選取的拼圖切割線", caption: "產生的切割線在匯出 SVG 前仍可選取與編輯。"}, highlights: ["演算法驅動的內部切割線", "可編輯的向量群組與路徑", "自訂連接輪廓", "匯出 SVG 供下游使用"],
      sections: [
        {id: "what-is-generated", title: "拼圖刀模包含什麼", paragraphs: ["拼圖切割圖由封閉的拼圖外輪廓與分片切割線組成。凸榫與匹配的凹口沿拼圖片共享邊界形成互鎖；它們是切割線上的幾何特徵，不是獨立的輸出層。", "Whimsy 是一整片具有可辨識具象輪廓的特殊拼圖片，並不是內部路徑的統稱。JigsawDesigner 目前不會自動產生 Whimsy；請有意識地設計或匯入相應幾何，並檢查它與周圍切割線的銜接。", "JigsawDesigner 依邊界、凹槽路徑、網格、目標片數與距離設定建立 SVG 幾何。結果仍位於文件樹中，可在匯出前選取、群組、變形與檢查。"]},
        {id: "refine-vector-geometry", title: "繼續調整向量幾何", paragraphs: ["使用選取工具操作整體元素，使用節點編輯調整錨點。圖層面板顯示巢狀群組，鎖定與隱藏有助於隔離複雜設計。"], bullets: ["在畫布上縮放與旋轉選取範圍", "縮放時鎖定比例", "編輯 Bezier 錨點與控制把手", "透過還原/重做群組或解散群組"]},
        {id: "dieline-handoff", title: "把 SVG 交給下一步工具", paragraphs: ["匯出 SVG 後，在真正負責列印或切割的軟體中設定生產屬性。描邊顏色、切縫補償、單位、材料設定與設備參數取決於下游環境。"], note: "投入材料前，請在實際設備使用的下游軟體驗證匯出的 SVG。", image: {src: "/gen_step4-v1-6.webp", alt: "在向量編輯器中檢查產生的拼圖刀模"}},
      ],
      faq: [{question: "刀模和圖片一樣嗎？", answer: "不一樣。刀模是描述邊界與切割線的向量幾何。"}, {question: "是否保證每一片完全獨一無二？", answer: "沒有此類保證。請依設計目標檢查實際產生結果。"}],
      related: [related["zh-Hant"].generator, related["zh-Hant"].laser, related["zh-Hant"].helpEditing],
    }),
  },

  "laser-cut-jigsaw-puzzle-svg": {
    en: article("en", {
      slug: "laser-cut-jigsaw-puzzle-svg", eyebrow: "SVG handoff workflow", title: "Prepare a Jigsaw Puzzle SVG for a Laser-Cutting Workflow", seoTitle: "Laser-Cut Jigsaw Puzzle SVG Workflow", seoDescription: "Generate and inspect a jigsaw puzzle SVG, then validate scale, units, strokes, kerf, material, and machine settings in your downstream cutting software.", intro: "JigsawDesigner creates editable SVG cutline geometry. Use it for the design stage, then move the exported SVG into your cutting software to apply the settings required by your material and equipment.", leadImage: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected as an editable group in JigsawDesigner", caption: "Inspect generated cutlines as editable vector geometry before downstream validation."}, highlights: ["Generate editable SVG paths", "Inspect layers and connections", "Export a standard SVG document", "Validate all production settings downstream"],
      sections: [
        {id: "design-stage", title: "Use JigsawDesigner for the vector design stage", paragraphs: ["Draw or import the boundary, select a slot template, choose generation parameters, and inspect the resulting paths. Correct overlaps, unwanted elements, scale, or orientation before export."], image: {src: "/editor_overview-v1-6.webp", alt: "JigsawDesigner vector editor with puzzle geometry"}},
        {id: "preflight-svg", title: "Preflight the SVG geometry", paragraphs: ["Zoom in on connections and edges, use Layers to isolate groups, and verify the document dimensions. Keep a saved JigsawDesigner project so you can return to editable source geometry if the downstream test reveals a problem."], bullets: ["Confirm the intended boundary and internal paths", "Check scale and document dimensions", "Remove hidden or duplicate cutting geometry", "Save the editable project before exporting SVG"]},
        {id: "downstream-validation", title: "Validate the real cutting setup downstream", paragraphs: ["Import the SVG into the software used by your cutter. Assign operation types, speed, power, passes, kerf compensation, and material-specific settings there. Run the device vendor's recommended safety checks and a small test before committing material."], note: "Use your equipment documentation and downstream software to confirm that the file and settings suit your setup."},
      ],
      faq: [{question: "Can the exported SVG go directly to every laser cutter?", answer: "Do not assume that. It is vector geometry for a downstream workflow; verify format handling and production settings in the software and documentation for your equipment."}, {question: "Does JigsawDesigner set kerf or laser power?", answer: "No. Configure machine and material settings in the downstream cutting software."}],
      related: [related.en.dieline, related.en.generator, related.en.helpImport],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "laser-cut-jigsaw-puzzle-svg", eyebrow: "SVG 下游工作流", title: "为激光切割工作流准备拼图 SVG", seoTitle: "激光切割拼图 SVG 工作流", seoDescription: "生成并检查拼图 SVG，再在下游切割软件中验证尺寸、单位、描边、切缝、材料和设备参数。", intro: "JigsawDesigner 负责创建可编辑的 SVG 切割线几何。完成设计后，把导出的 SVG 放入实际切割软件，并按材料与设备要求设置生产参数。", leadImage: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中作为可编辑分组选中的拼图切割线", caption: "在下游验证前，先把生成的切割线作为可编辑矢量几何检查。"}, highlights: ["生成可编辑 SVG 路径", "检查图层与连接", "导出标准 SVG 文档", "在下游验证全部生产参数"],
      sections: [
        {id: "design-stage", title: "用 JigsawDesigner 完成矢量设计阶段", paragraphs: ["绘制或导入边界，选择卡槽模板与生成参数，并检查结果路径。导出前修正重叠、多余元素、比例或方向。"], image: {src: "/editor_overview-v1-6.webp", alt: "JigsawDesigner 拼图矢量编辑界面"}},
        {id: "preflight-svg", title: "预检 SVG 几何", paragraphs: ["放大检查连接和边缘，用图层隔离分组，并核对文档尺寸。保留可编辑项目，以便下游测试发现问题时返回修改。"], bullets: ["确认外边界与内部路径", "检查比例和文档尺寸", "移除隐藏或重复的切割几何", "导出前保存可编辑项目"]},
        {id: "downstream-validation", title: "在下游验证真实切割设置", paragraphs: ["将 SVG 导入设备使用的软件，在那里设置操作类型、速度、功率、次数、切缝补偿和材料参数。遵循设备安全说明并先做小范围测试。"], note: "请根据设备文档和下游软件，确认文件与参数适合自己的工作环境。"},
      ],
      faq: [{question: "导出的 SVG 能直接交给所有激光设备吗？", answer: "不要这样假设。它是供下游工作流使用的矢量几何；请根据实际设备验证格式处理与生产参数。"}, {question: "JigsawDesigner 会设置切缝或激光功率吗？", answer: "不会。请在下游切割软件中配置设备和材料参数。"}],
      related: [related["zh-Hans"].dieline, related["zh-Hans"].generator, related["zh-Hans"].helpImport],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "laser-cut-jigsaw-puzzle-svg", eyebrow: "SVG 下游工作流程", title: "為雷射切割工作流程準備拼圖 SVG", seoTitle: "雷射切割拼圖 SVG 工作流程", seoDescription: "產生並檢查拼圖 SVG，再於下游切割軟體驗證尺寸、單位、描邊、切縫、材料與設備參數。", intro: "JigsawDesigner 負責建立可編輯的 SVG 切割線幾何。完成設計後，將匯出的 SVG 放入實際切割軟體，並依材料與設備要求設定參數。", leadImage: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中以可編輯群組選取的拼圖切割線", caption: "在下游驗證前，先將產生的切割線作為可編輯向量幾何檢查。"}, highlights: ["產生可編輯 SVG 路徑", "檢查圖層與連接", "匯出標準 SVG 文件", "在下游驗證全部生產參數"],
      sections: [
        {id: "design-stage", title: "用 JigsawDesigner 完成向量設計階段", paragraphs: ["繪製或匯入邊界，選擇卡槽範本與產生參數，並檢查結果路徑。匯出前修正重疊、多餘元素、比例或方向。"], image: {src: "/editor_overview-v1-6.webp", alt: "JigsawDesigner 拼圖向量編輯介面"}},
        {id: "preflight-svg", title: "預檢 SVG 幾何", paragraphs: ["放大檢查連接與邊緣，使用圖層隔離群組，並核對文件尺寸。保留可編輯專案，方便下游測試發現問題時返回修改。"], bullets: ["確認外邊界與內部路徑", "檢查比例與文件尺寸", "移除隱藏或重複的切割幾何", "匯出前儲存可編輯專案"]},
        {id: "downstream-validation", title: "在下游驗證實際切割設定", paragraphs: ["將 SVG 匯入設備使用的軟體，在該處設定操作類型、速度、功率、次數、切縫補償與材料參數。遵循設備安全說明並先做小範圍測試。"], note: "請依設備文件與下游軟體，確認檔案及參數適合自己的工作環境。"},
      ],
      faq: [{question: "匯出的 SVG 能直接交給所有雷射設備嗎？", answer: "請勿如此假設。它是供下游工作流程使用的向量幾何；請依實際設備驗證格式處理與生產參數。"}, {question: "JigsawDesigner 會設定切縫或雷射功率嗎？", answer: "不會。請在下游切割軟體中設定設備與材料參數。"}],
      related: [related["zh-Hant"].dieline, related["zh-Hant"].generator, related["zh-Hant"].helpImport],
    }),
  },

  "custom-jigsaw-puzzle-template": {
    en: article("en", {
      slug: "custom-jigsaw-puzzle-template", eyebrow: "Reusable connection profiles", title: "Create a Custom Jigsaw Puzzle Slot Template", seoTitle: "Custom Jigsaw Puzzle Template SVG", seoDescription: "Create, edit, import, export, and reuse custom open-path slot templates for jigsaw cutline generation in JigsawDesigner.", intro: "A slot template supplies the connection profile used by the puzzle generator. Start with one of three built-in profiles or create an open vector path that fits your own visual language.", leadImage: {src: "/template_editor-v1-6.webp", alt: "An open custom slot path in the JigsawDesigner Template Editor", caption: "Draw and refine the open connection profile before saving it as a template."}, highlights: ["Three built-in starting templates", "Bezier-based custom paths", "Import and export template SVG", "Persistent templates available to new projects"],
      sections: [
        {id: "built-in-templates", title: "Start with a built-in connection profile", paragraphs: ["JigsawDesigner includes Standard Convex, Standard Concave, and Straight Line templates. Select one in the Templates panel before generation to change the connection profile supplied to the engine."], image: {src: "/templates_panel-v1-6.webp", alt: "JigsawDesigner Templates panel"}},
        {id: "draw-custom-template", title: "Draw or import a custom open path", paragraphs: ["Open the Template Editor, name the template, and draw the profile with Bezier anchors and handles. You can edit points, clear the path, or import an existing SVG path as a starting point."], bullets: ["Keep the connection profile as an open path", "Use a simple, deliberate contour", "Inspect anchor placement and curve continuity", "Export the template SVG as a portable backup"], image: {src: "/template_editor-v1-6.webp", alt: "Custom slot path in the Template Editor"}},
        {id: "reuse-and-test", title: "Reuse the template and inspect each result", paragraphs: ["Custom templates are persisted and can be included in newly created projects. Generation combines the template with the current boundary and parameters, so inspect the resulting connections each time rather than assuming one profile fits every boundary or density."]},
      ],
      faq: [{question: "How many templates are built in?", answer: "Three: Standard Convex, Standard Concave, and Straight Line."}, {question: "Can I import a custom template from SVG?", answer: "Yes. The Template Editor supports SVG import and export."}],
      related: [related.en.generator, related.en.dieline, related.en.helpTemplates],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "custom-jigsaw-puzzle-template", eyebrow: "可复用连接轮廓", title: "创建自定义拼图卡槽模板", seoTitle: "自定义拼图模板 SVG｜卡槽轮廓编辑", seoDescription: "在 JigsawDesigner 中创建、编辑、导入、导出并复用开放路径卡槽模板，用于拼图切割线生成。", intro: "卡槽模板向拼图生成器提供连接轮廓。你可以从三个内置轮廓开始，也可以创建符合自己设计语言的开放矢量路径。", leadImage: {src: "/template_editor-v1-6.webp", alt: "JigsawDesigner 模板编辑器中的自定义开放卡槽路径", caption: "保存为模板前，先绘制并调整开放连接轮廓。"}, highlights: ["三个内置起始模板", "基于 Bezier 的自定义路径", "导入与导出模板 SVG", "自定义模板持久保存"],
      sections: [
        {id: "built-in-templates", title: "从内置连接轮廓开始", paragraphs: ["JigsawDesigner 内置标准凸形、标准凹形和直线模板。生成前在模板面板选择其中之一，即可改变交给引擎的连接轮廓。"], image: {src: "/templates_panel-v1-6.webp", alt: "JigsawDesigner 模板面板"}},
        {id: "draw-custom-template", title: "绘制或导入自定义开放路径", paragraphs: ["打开模板编辑器、命名模板，并用 Bezier 锚点和控制柄绘制轮廓。可以编辑节点、清空路径，也可以导入已有 SVG 路径。"], bullets: ["保持连接轮廓为开放路径", "使用清晰、简洁的轮廓", "检查锚点和曲线连续性", "导出模板 SVG 作为便携备份"], image: {src: "/template_editor-v1-6.webp", alt: "模板编辑器中的自定义卡槽路径"}},
        {id: "reuse-and-test", title: "复用模板并检查每次结果", paragraphs: ["自定义模板会持久保存，并可出现在新项目中。生成时还会结合当前边界和参数，因此每次都应检查连接结果。"]},
      ],
      faq: [{question: "内置多少个模板？", answer: "三个：标准凸形、标准凹形和直线。"}, {question: "可以从 SVG 导入模板吗？", answer: "可以。模板编辑器支持 SVG 导入和导出。"}],
      related: [related["zh-Hans"].generator, related["zh-Hans"].dieline, related["zh-Hans"].helpTemplates],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "custom-jigsaw-puzzle-template", eyebrow: "可重複使用的連接輪廓", title: "建立自訂拼圖卡槽範本", seoTitle: "自訂拼圖範本 SVG｜卡槽輪廓編輯", seoDescription: "在 JigsawDesigner 中建立、編輯、匯入、匯出並重複使用開放路徑卡槽範本。", intro: "卡槽範本向拼圖產生器提供連接輪廓。可從三個內建輪廓開始，也可建立符合自己設計語言的開放向量路徑。", leadImage: {src: "/template_editor-v1-6.webp", alt: "JigsawDesigner 範本編輯器中的自訂開放卡槽路徑", caption: "儲存為範本前，先繪製並調整開放連接輪廓。"}, highlights: ["三個內建起始範本", "以 Bezier 建立自訂路徑", "匯入與匯出範本 SVG", "自訂範本持久儲存"],
      sections: [
        {id: "built-in-templates", title: "從內建連接輪廓開始", paragraphs: ["JigsawDesigner 內建標準凸形、標準凹形與直線範本。產生前在範本面板選擇，即可改變交給引擎的連接輪廓。"], image: {src: "/templates_panel-v1-6.webp", alt: "JigsawDesigner 範本面板"}},
        {id: "draw-custom-template", title: "繪製或匯入自訂開放路徑", paragraphs: ["開啟範本編輯器、命名範本，並用 Bezier 錨點與控制把手繪製輪廓。可編輯節點、清除路徑，或匯入現有 SVG 路徑。"], bullets: ["保持連接輪廓為開放路徑", "使用清楚、簡潔的輪廓", "檢查錨點與曲線連續性", "匯出範本 SVG 作為可攜式備份"], image: {src: "/template_editor-v1-6.webp", alt: "範本編輯器中的自訂卡槽路徑"}},
        {id: "reuse-and-test", title: "重複使用範本並檢查每次結果", paragraphs: ["自訂範本會持久儲存，並可出現在新專案。產生時仍會結合目前邊界與參數，因此每次都應檢查連接結果。"]},
      ],
      faq: [{question: "內建多少個範本？", answer: "三個：標準凸形、標準凹形與直線。"}, {question: "可以從 SVG 匯入範本嗎？", answer: "可以。範本編輯器支援 SVG 匯入與匯出。"}],
      related: [related["zh-Hant"].generator, related["zh-Hant"].dieline, related["zh-Hant"].helpTemplates],
    }),
  },

  "svg-puzzle-editor": {
    en: article("en", {
      slug: "svg-puzzle-editor", eyebrow: "Native vector editing", title: "SVG Puzzle Editor for Mac, iPad, and iPhone", seoTitle: "SVG Puzzle Editor for Mac, iPad & iPhone", seoDescription: "Import and edit SVG puzzle geometry with drawing tools, point editing, layers, groups, transforms, accurate zoom, and SVG export on Apple devices.", intro: "Use a native Apple-platform editor for puzzle boundaries, templates, and generated cutlines. Work with paths and common SVG shapes, organize nested groups, and keep the document editable from import through export.", leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner with its Layers hierarchy and Shape Info visible", caption: "Inspect imported artwork on the canvas, in Layers, and in Shape Info."}, highlights: ["Eight drawing and editing tools", "Multi-selection, grouping, and layers", "On-canvas scale and rotation", "Accurate zoom from 1% to 3200%"],
      sections: [
        {id: "svg-import", title: "Bring SVG artwork into an editable document", paragraphs: ["Import paths, rectangles, circles, text, images, and grouped geometry. Version 1.6.0 improves preservation of embedded images, gradients, patterns, and clipping paths when editing, saving, and reopening projects."], note: "Remote HTTP image references are not fetched. Embed required assets in the SVG or project instead.", image: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner with its Layers hierarchy and Shape Info visible", caption: "Inspect imported artwork on the canvas, in Layers, and in Shape Info."}},
        {id: "vector-tools", title: "Draw and edit vector geometry", paragraphs: ["Choose Select, Point Edit, Pencil, Line, Rectangle, Circle, Polygon, or Bezier. Pencil supports smoother freehand paths, while open contours can be continued or joined in the current editor."], bullets: ["Shift-select multiple elements", "Drill into nested groups", "Edit anchors and Bezier handles", "Resize and rotate around the selection center"], image: {src: "/vector-point-edit-v1-6.webp", alt: "Point Edit anchors shown around a puzzle boundary in JigsawDesigner", caption: "Point Edit exposes the source path anchors while the generated group remains organized in Layers."}},
        {id: "document-workflow", title: "Organize, save, and export", paragraphs: ["Use Layers to inspect hierarchy, toggle visibility, and lock elements. Projects are stored as .jigsawproject packages with document metadata, SVG, and embedded assets. Export produces a portable SVG document."], image: {src: "/layers_panel-v1-6.webp", alt: "SVG groups and shapes in the Layers panel"}},
      ],
      faq: [{question: "Which export formats are supported?", answer: "SVG is the current export format."}, {question: "Does the editor work on iPhone as well as Mac and iPad?", answer: "Yes. The Apple app target supports iPhone, iPad, and Mac, with layouts adapted for each form factor."}],
      related: [related.en.generator, related.en.template, related.en.helpEditing],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "svg-puzzle-editor", eyebrow: "原生矢量编辑", title: "适用于 Mac、iPad 和 iPhone 的 SVG 拼图编辑器", seoTitle: "Mac、iPad 与 iPhone SVG 拼图编辑器", seoDescription: "在 Apple 设备上导入并编辑 SVG 拼图几何，使用绘图、点编辑、图层、分组、变换、真实缩放与 SVG 导出。", intro: "使用 Apple 平台原生编辑器处理拼图边界、模板与生成的切割线。从导入到导出，路径、常见 SVG 形状和嵌套分组都可以继续编辑。", leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "在画布、图层和形状信息中检查导入图稿。"}, highlights: ["八种绘图与编辑工具", "多选、分组和图层", "画布内缩放与旋转", "1% 到 3200% 真实缩放"],
      sections: [
        {id: "svg-import", title: "把 SVG 图稿带入可编辑文档", paragraphs: ["可导入路径、矩形、圆形、文本、图片和分组几何。1.6.0 提升了嵌入图片、渐变、图案和裁剪路径在编辑、保存与重新打开时的保留可靠性。"], note: "不会获取远程 HTTP 图片引用；请把必要资源嵌入 SVG 或项目。", image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "在画布、图层和形状信息中检查导入图稿。"}},
        {id: "vector-tools", title: "绘制与编辑矢量几何", paragraphs: ["可使用 Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon 和 Bezier。Pencil 提供更平滑的自由绘制，开放轮廓可以继续或连接。"], bullets: ["Shift 多选元素", "深入嵌套分组", "编辑锚点与 Bezier 控制柄", "围绕选区中心缩放和旋转"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用点编辑显示拼图边界锚点", caption: "点编辑显示源路径锚点，生成结果仍作为分组保留在图层中。"}},
        {id: "document-workflow", title: "组织、保存并导出", paragraphs: ["通过图层检查层级、隐藏或锁定元素。项目保存为包含元数据、SVG 和嵌入资源的 .jigsawproject 包；成品导出为 SVG。"], image: {src: "/layers_panel-v1-6.webp", alt: "图层面板中的 SVG 分组和形状"}},
      ],
      faq: [{question: "支持哪些导出格式？", answer: "当前导出格式为 SVG。"}, {question: "iPhone 也能使用编辑器吗？", answer: "可以。Apple App 支持 iPhone、iPad 和 Mac，并针对不同尺寸提供界面。"}],
      related: [related["zh-Hans"].generator, related["zh-Hans"].template, related["zh-Hans"].helpEditing],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "svg-puzzle-editor", eyebrow: "原生向量編輯", title: "適用於 Mac、iPad 與 iPhone 的 SVG 拼圖編輯器", seoTitle: "Mac、iPad 與 iPhone SVG 拼圖編輯器", seoDescription: "在 Apple 裝置上匯入並編輯 SVG 拼圖幾何，使用繪圖、節點編輯、圖層、群組、變形、真實縮放與 SVG 匯出。", intro: "使用 Apple 平台原生編輯器處理拼圖邊界、範本與產生的切割線。從匯入到匯出，路徑、常見 SVG 形狀與巢狀群組都能繼續編輯。", leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "在畫布、圖層與形狀資訊中檢查匯入圖稿。"}, highlights: ["八種繪圖與編輯工具", "多選、群組與圖層", "畫布內縮放與旋轉", "1% 到 3200% 真實縮放"],
      sections: [
        {id: "svg-import", title: "把 SVG 圖稿帶入可編輯文件", paragraphs: ["可匯入路徑、矩形、圓形、文字、圖片與群組幾何。1.6.0 提升嵌入圖片、漸層、圖樣與裁剪路徑在編輯、儲存與重新開啟時的保留可靠性。"], note: "不會擷取遠端 HTTP 圖片引用；請將必要資源嵌入 SVG 或專案。", image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "在畫布、圖層與形狀資訊中檢查匯入圖稿。"}},
        {id: "vector-tools", title: "繪製與編輯向量幾何", paragraphs: ["可使用 Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon 與 Bezier。Pencil 提供更平滑的自由繪製，開放輪廓可繼續或連接。"], bullets: ["Shift 多選元素", "深入巢狀群組", "編輯錨點與 Bezier 控制把手", "圍繞選取中心縮放與旋轉"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用節點編輯顯示拼圖邊界錨點", caption: "節點編輯顯示來源路徑錨點，產生結果仍以群組保留在圖層中。"}},
        {id: "document-workflow", title: "整理、儲存並匯出", paragraphs: ["透過圖層檢查階層、隱藏或鎖定元素。專案儲存為包含中繼資料、SVG 與嵌入資源的 .jigsawproject 套件；成品匯出為 SVG。"], image: {src: "/layers_panel-v1-6.webp", alt: "圖層面板中的 SVG 群組與形狀"}},
      ],
      faq: [{question: "支援哪些匯出格式？", answer: "目前的匯出格式為 SVG。"}, {question: "iPhone 也能使用編輯器嗎？", answer: "可以。Apple App 支援 iPhone、iPad 與 Mac，並針對不同尺寸提供介面。"}],
      related: [related["zh-Hant"].generator, related["zh-Hant"].template, related["zh-Hant"].helpEditing],
    }),
  },

  "how-to-make-a-laser-cut-jigsaw-puzzle": {
    en: article("en", {
      slug: "how-to-make-a-laser-cut-jigsaw-puzzle", schemaType: "HowTo", eyebrow: "Step-by-step vector workflow", title: "How to Make a Jigsaw Puzzle SVG for a Laser-Cutting Workflow", seoTitle: "How to Make a Laser-Cut Jigsaw Puzzle SVG", seoDescription: "A practical workflow for designing a puzzle boundary, generating cutlines, editing the SVG, and validating it in downstream laser-cutting software.", intro: "This guide covers the vector-design portion of a laser-cut puzzle project. JigsawDesigner creates and exports SVG geometry; your cutting software and equipment documentation remain the authority for production settings and safety.", leadImage: {src: "/generation-ready-v1-6.webp", alt: "A closed puzzle boundary, selected slot template, and generation values ready in JigsawDesigner", caption: "Review the boundary, slot template, and Project Info values before generation."}, highlights: ["Create or import the puzzle boundary", "Choose and test a slot template", "Generate and inspect cutline geometry", "Export SVG and validate downstream"],
      sections: [
        {id: "prepare-boundary", title: "1. Prepare the outer boundary", paragraphs: ["Create a new project and draw a closed outer contour, or import a suitable SVG boundary. Set the canvas size and check that the intended geometry is visible and selectable."], image: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner with its Layers hierarchy and Shape Info visible", caption: "Inspect imported geometry, groups, and scale before choosing the closed generation boundary."}},
        {id: "choose-and-generate", title: "2. Choose a template and generate", paragraphs: ["Select Standard Convex, Standard Concave, Straight Line, or a custom slot template. Set grid size, target piece count, and slot-distance values, then run Generate Jigsaw."], image: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected as an editable group in JigsawDesigner", caption: "Generated cutlines return to Layers as an editable group."}},
        {id: "inspect-edit", title: "3. Inspect and edit the paths", paragraphs: ["Zoom into the boundary and internal connections. Use Layers, selection, point editing, grouping, scaling, and rotation to correct the vector document. Save the editable project before export."], bullets: ["Look for unintended overlaps or duplicate paths", "Confirm the document scale", "Keep only the geometry needed by the next workflow", "Repeat generation with adjusted inputs when necessary"], image: {src: "/vector-point-edit-v1-6.webp", alt: "Point Edit anchors shown around a puzzle boundary in JigsawDesigner", caption: "Point Edit exposes the source path anchors while the generated group remains organized in Layers."}},
        {id: "export-and-test", title: "4. Export SVG and validate in cutting software", paragraphs: ["Export SVG, import it into the software used by your equipment, and assign the correct operations. Confirm units, stroke interpretation, kerf, material settings, speed, power, and safety procedures using the vendor's documentation. Run a small test first."], note: "This guide does not certify the SVG for a particular cutter or material. Production validation remains your responsibility.", image: {src: "/generation-export-settings-v1-6.webp", alt: "JigsawDesigner Advanced Settings with SVG selected as the export format", caption: "SVG is the current export format; production settings remain in the downstream workflow.", layout: "panel"}},
      ],
      faq: [{question: "Can I send the SVG directly to any cutter?", answer: "Do not assume that. Import it into your downstream software and validate format handling, scale, operations, and equipment settings first."}, {question: "Should I keep the JigsawDesigner project after export?", answer: "Yes. The project preserves editable source geometry and assets for revisions."}],
      related: [related.en.laser, related.en.generator, related.en.helpGeneration],
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "how-to-make-a-laser-cut-jigsaw-puzzle", schemaType: "HowTo", eyebrow: "逐步矢量工作流", title: "如何为激光切割工作流制作拼图 SVG", seoTitle: "如何制作激光切割拼图 SVG", seoDescription: "从设计拼图边界、生成切割线、编辑 SVG，到在下游激光切割软件中验证文件的实用流程。", intro: "本指南覆盖激光切割拼图项目的矢量设计阶段。JigsawDesigner 创建并导出 SVG；生产参数与安全要求应以切割软件和设备文档为准。", leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已准备好的闭合拼图边界、所选卡槽模板和生成参数", caption: "生成前检查边界、卡槽模板和项目信息中的参数。"}, highlights: ["创建或导入拼图边界", "选择并测试卡槽模板", "生成并检查切割线几何", "导出 SVG 后在下游验证"],
      sections: [
        {id: "prepare-boundary", title: "1. 准备外边界", paragraphs: ["创建项目并绘制闭合外轮廓，或导入合适的 SVG 边界。设置画布尺寸，确认目标几何可见且可选。"], image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "选择闭合生成边界前，先检查导入几何、分组和比例。"}},
        {id: "choose-and-generate", title: "2. 选择模板并生成", paragraphs: ["选择标准凸形、标准凹形、直线或自定义卡槽模板。设置网格大小、目标片数和卡槽距离，然后运行生成。"], image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中作为可编辑分组选中的拼图切割线", caption: "生成的切割线以可编辑分组返回图层。"}},
        {id: "inspect-edit", title: "3. 检查并编辑路径", paragraphs: ["放大检查边界和内部连接，用图层、选择、点编辑、分组、缩放与旋转调整矢量文档。导出前保存可编辑项目。"], bullets: ["检查意外重叠或重复路径", "确认文档比例", "仅保留下一步需要的几何", "必要时调整输入并重新生成"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用点编辑显示拼图边界锚点", caption: "点编辑显示源路径锚点，生成结果仍作为分组保留在图层中。"}},
        {id: "export-and-test", title: "4. 导出 SVG 并在切割软件中验证", paragraphs: ["导出 SVG 后，将其导入设备所用软件并分配正确操作。根据设备文档确认单位、描边解释、切缝、材料、速度、功率和安全流程，并先做小范围测试。"], note: "本指南不对特定设备或材料做认证；生产验证由使用者完成。", image: {src: "/generation-export-settings-v1-6.webp", alt: "JigsawDesigner 高级设置中选择 SVG 作为导出格式", caption: "SVG 是当前导出格式；生产参数仍由下游流程设置。", layout: "panel"}},
      ],
      faq: [{question: "可以把 SVG 直接发给任何切割机吗？", answer: "不要这样假设。应先在下游软件中验证格式、比例、操作和设备设置。"}, {question: "导出后还要保留项目吗？", answer: "建议保留。.jigsawproject 保存可编辑源几何与资源，便于修改。"}],
      related: [related["zh-Hans"].laser, related["zh-Hans"].generator, related["zh-Hans"].helpGeneration],
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "how-to-make-a-laser-cut-jigsaw-puzzle", schemaType: "HowTo", eyebrow: "逐步向量工作流程", title: "如何為雷射切割工作流程製作拼圖 SVG", seoTitle: "如何製作雷射切割拼圖 SVG", seoDescription: "從設計拼圖邊界、產生切割線、編輯 SVG，到在下游雷射切割軟體驗證檔案的實用流程。", intro: "本指南涵蓋雷射切割拼圖專案的向量設計階段。JigsawDesigner 建立並匯出 SVG；生產參數與安全要求應以切割軟體和設備文件為準。", leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已準備好的封閉拼圖邊界、所選卡槽範本與產生參數", caption: "產生前檢查邊界、卡槽範本與專案資訊中的參數。"}, highlights: ["建立或匯入拼圖邊界", "選擇並測試卡槽範本", "產生並檢查切割線幾何", "匯出 SVG 後在下游驗證"],
      sections: [
        {id: "prepare-boundary", title: "1. 準備外邊界", paragraphs: ["建立專案並繪製封閉外輪廓，或匯入合適的 SVG 邊界。設定畫布尺寸，確認目標幾何可見且可選取。"], image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "選擇封閉產生邊界前，先檢查匯入幾何、群組與比例。"}},
        {id: "choose-and-generate", title: "2. 選擇範本並產生", paragraphs: ["選擇標準凸形、標準凹形、直線或自訂卡槽範本。設定網格大小、目標片數與卡槽距離，然後執行產生。"], image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中以可編輯群組選取的拼圖切割線", caption: "產生的切割線以可編輯群組回到圖層。"}},
        {id: "inspect-edit", title: "3. 檢查並編輯路徑", paragraphs: ["放大檢查邊界與內部連接，使用圖層、選取、節點編輯、群組、縮放與旋轉調整向量文件。匯出前儲存可編輯專案。"], bullets: ["檢查意外重疊或重複路徑", "確認文件比例", "只保留下一步所需幾何", "必要時調整輸入並重新產生"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用節點編輯顯示拼圖邊界錨點", caption: "節點編輯顯示來源路徑錨點，產生結果仍以群組保留在圖層中。"}},
        {id: "export-and-test", title: "4. 匯出 SVG 並在切割軟體驗證", paragraphs: ["匯出 SVG 後，將其匯入設備使用的軟體並指定正確操作。依設備文件確認單位、描邊解讀、切縫、材料、速度、功率與安全流程，並先做小範圍測試。"], note: "本指南不對特定設備或材料提供認證；生產驗證由使用者完成。", image: {src: "/generation-export-settings-v1-6.webp", alt: "JigsawDesigner 進階設定中選擇 SVG 作為匯出格式", caption: "SVG 是目前的匯出格式；生產參數仍由下游流程設定。", layout: "panel"}},
      ],
      faq: [{question: "可以把 SVG 直接交給任何切割機嗎？", answer: "不要如此假設。應先在下游軟體驗證格式、比例、操作與設備設定。"}, {question: "匯出後仍要保留專案嗎？", answer: "建議保留。.jigsawproject 儲存可編輯來源幾何與資源，方便修改。"}],
      related: [related["zh-Hant"].laser, related["zh-Hant"].generator, related["zh-Hant"].helpGeneration],
    }),
  },
};

export function isMarketingSlug(value: string): value is MarketingSlug {
  return marketingSlugs.includes(value as MarketingSlug);
}

export function getMarketingPage(
  slug: string,
  locale: TierOneLocale,
): ArticleContent | null {
  return isMarketingSlug(slug) ? pages[slug][locale] : null;
}
