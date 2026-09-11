import type {VersionedMediaPath} from "@/config/media";
import {PRODUCT_FACTS, type PremiumEntitlement} from "@/config/product";

import type {MediaEvidence, TierOneLocale} from "./types";

type HomeLink = {
  href: string;
  title: string;
};

type HomeWorkflowStep = {
  number: string;
  title: string;
  description: string;
  evidence: MediaEvidence;
};

type HomePrimerPart = {
  id: "perimeter" | "piece-boundaries" | "interlock" | "whimsy";
  number: string;
  title: string;
  description: string;
};

export type HomePageContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    inputLabel: string;
    resultLabel: string;
    input: MediaEvidence;
    result: MediaEvidence;
  };
  primer: {
    eyebrow: string;
    title: string;
    intro: string;
    parts: HomePrimerPart[];
    svgLabel: string;
    note: string;
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    items: HomeWorkflowStep[];
  };
  showcase: {
    eyebrow: string;
    title: string;
    intro: string;
    objectiveLabel: string;
    templateLabel: string;
    editLabel: string;
    viewAllLabel: string;
  };
  devices: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      platform: "Mac" | "iPad" | "iPhone";
      title: string;
      evidence: MediaEvidence;
    }>;
    capabilities: Array<{title: string; description: string}>;
  };
  downstream: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{title: string; description: string}>;
    tutorialLabel: string;
    note: string;
    videoTitle: string;
    videoPlayLabel: string;
    videoCaption: string;
  };
  plans: {
    title: string;
    intro: string;
    freeName: string;
    freeSummary: string;
    freeFeatures: string[];
    premiumName: string;
    premiumSummary: string;
    premiumFeatures: string[];
    storeNote: string;
    pricingLabel: string;
  };
  faq: {
    title: string;
    items: Array<{question: string; answer: string}>;
  };
  learn: {
    eyebrow: string;
    title: string;
    intro: string;
    viewAllLabel: string;
    links: HomeLink[];
  };
};

function screenshot(
  src: VersionedMediaPath,
  alt: string,
  caption: string,
  sourceLabel: string,
): MediaEvidence {
  return {
    src,
    alt,
    caption,
    source: {kind: "app-screenshot", label: sourceLabel},
  };
}

const sourceLabels: Record<TierOneLocale, string> = {
  en: "Product screenshot · JigsawDesigner 1.6.0",
  "zh-Hans": "产品截图 · JigsawDesigner 1.6.0",
  "zh-Hant": "產品截圖 · JigsawDesigner 1.6.0",
};

const premiumFeatureLabels: Record<TierOneLocale, Record<PremiumEntitlement, string>> = {
  en: {unlimitedJigsawGeneration: "Unlimited puzzle generation", svgExport: "SVG export"},
  "zh-Hans": {unlimitedJigsawGeneration: "无限次拼图生成", svgExport: "SVG 导出"},
  "zh-Hant": {unlimitedJigsawGeneration: "不限次數製作拼圖", svgExport: "SVG 匯出"},
};

export const HOME_PAGES: Record<TierOneLocale, HomePageContent> = {
  en: {
    hero: {
      eyebrow: `JigsawDesigner ${PRODUCT_FACTS.currentVersion} · iPhone, iPad, and Mac`,
      title: "Turn your outline into a unique jigsaw",
      subtitle: "Draw or import a shape, generate the puzzle cutlines, and refine the details. Export an editable SVG on Mac, iPad, or iPhone.",
      primaryLabel: "View on the App Store",
      secondaryLabel: "See how it works",
      inputLabel: "Boundary",
      resultLabel: "Generated SVG",
      input: screenshot(
        "/generation-ready-v1-6.webp",
        "A closed irregular boundary with a slot template and generation settings ready in JigsawDesigner",
        "The closed boundary before generation.",
        sourceLabels.en,
      ),
      result: screenshot(
        "/generated-result-editable-v1-6.webp",
        "Generated puzzle cutlines inside the irregular boundary, selected as an editable group",
        "Your puzzle, ready for the finishing touches.",
        sourceLabels.en,
      ),
    },
    primer: {
      eyebrow: "Puzzle cut design",
      title: "The anatomy of a jigsaw cut pattern",
      intro: "Every cut pattern begins with a closed puzzle outline. Inside it, shared cut paths divide the design into individual pieces. Tabs and matching blanks form the interlocks along those shared edges. A whimsy is different: it is a complete, recognizable figural piece integrated into the cut pattern.",
      parts: [
        {
          id: "perimeter",
          number: "01",
          title: "Puzzle outline",
          description: "The closed outer contour defines the finished puzzle’s silhouette.",
        },
        {
          id: "piece-boundaries",
          number: "02",
          title: "Piece-separation cutlines",
          description: "Shared internal paths divide the outline into individual puzzle pieces.",
        },
        {
          id: "interlock",
          number: "03",
          title: "Tabs and blanks",
          description: "Tabs or knobs and their matching blanks or sockets are formed along shared piece edges.",
        },
        {
          id: "whimsy",
          number: "04",
          title: "Whimsy (optional figural piece)",
          description: "A complete, recognizable themed piece. JigsawDesigner does not currently generate Whimsy pieces automatically.",
        },
      ],
      svgLabel: "Output: editable SVG cut geometry",
      note: "JigsawDesigner applies the selected slot template to eligible piece-separation edges and keeps the result as editable SVG geometry. Whimsy pieces must be designed or imported and checked manually; the generator does not create them automatically. Material, kerf, power, speed, and safety settings remain downstream.",
    },
    workflow: {
      eyebrow: "How it works",
      title: "From your first outline to the final details",
      intro: "Choose a shape, generate the pieces, and make it your own—all in one app.",
      items: [
        {
          number: "01",
          title: "Start with a shape",
          description: "Import an SVG or draw a closed outline. Use a simple silhouette or a shape of your own.",
          evidence: screenshot(
            "/svg-import-fidelity-v1-6.webp",
            "A detailed imported SVG selected in JigsawDesigner with its Layers hierarchy and Shape Info visible",
            "Import your artwork and keep editing it.",
            sourceLabels.en,
          ),
        },
        {
          number: "02",
          title: "Make it a jigsaw",
          description: "Choose a connector style, adjust the grid and spacing, then generate the puzzle cutlines inside your outline.",
          evidence: screenshot(
            "/generated-result-editable-v1-6.webp",
            "Generated puzzle cutlines selected as a group in JigsawDesigner",
            "Generated cutlines you can still adjust.",
            sourceLabels.en,
          ),
        },
        {
          number: "03",
          title: "Refine and export",
          description: "Adjust curves, move points, and fine-tune the layout. Export the finished design as an SVG with Premium.",
          evidence: screenshot(
            "/vector-point-edit-v1-6.webp",
            "Point Edit anchors shown around a generated puzzle boundary in JigsawDesigner",
            "Fine-tune the curves after generation.",
            sourceLabels.en,
          ),
        },
      ],
    },
    showcase: {
      eyebrow: "Made with JigsawDesigner",
      title: "One tool. So many possibilities.",
      intro: "Explore designs created by the JigsawDesigner team, from playful silhouettes to detailed vector artwork.",
      objectiveLabel: "Objective",
      templateLabel: "Template",
      editLabel: "Next edit",
      viewAllLabel: "Explore the showcase",
    },
    devices: {
      eyebrow: "Mac, iPad, and iPhone",
      title: "A workspace that fits your device",
      intro: "Enjoy the same core design tools on Mac, iPad, and iPhone, with an interface made for each screen.",
      items: [
        {platform: "Mac", title: "Room for every detail", evidence: screenshot("/device-mac-svg-workspace-v1-6.webp", "JigsawDesigner 1.6 SVG workspace on Mac with a dragon project visible", "Mac workspace", sourceLabels.en)},
        {platform: "iPad", title: "Create with a touch", evidence: screenshot("/device-ipad-vector-editing-v1-6.webp", "JigsawDesigner 1.6 vector editing interface on iPad", "iPad editor", sourceLabels.en)},
        {platform: "iPhone", title: "Your ideas, on hand", evidence: screenshot("/device-iphone-vector-selection-v1-6.webp", "JigsawDesigner 1.6 vector selection interface on iPhone", "iPhone editor", sourceLabels.en)},
      ],
      capabilities: [
        {title: "SVG import", description: "Open vector artwork and inspect its visible structure."},
        {title: "Path editing", description: "Edit anchors, groups, transforms, and drawing paths."},
        {title: "Custom slot profiles", description: "Draw or import the connection shape used by the generator."},
        {title: "Project library", description: "Keep editable studies organized for later revisions."},
      ],
    },
    downstream: {
      eyebrow: "After export",
      title: "Treat fabrication as a separate validation stage",
      intro: "JigsawDesigner hands off SVG geometry. Your cutting software and equipment remain responsible for operations, material settings, and safety.",
      steps: [
        {title: "Export SVG", description: "Keep the editable project and export the geometry needed downstream."},
        {title: "Inspect the handoff", description: "Confirm units, scale, duplicate paths, stroke interpretation, and intended operations."},
        {title: "Run a material test", description: "Use a small test and the equipment vendor’s guidance before committing a full sheet."},
        {title: "Make and document", description: "Record the final material and machine settings outside JigsawDesigner for repeatability."},
      ],
      tutorialLabel: "Read the complete making guide",
      note: "JigsawDesigner does not replace cutting software, equipment documentation, or safe operating procedures.",
      videoTitle: "JigsawDesigner product walkthrough",
      videoPlayLabel: "Play the product walkthrough",
      videoCaption: "Earlier product walkthrough. Use the 1.6.0 screenshots above as the reference for the current interface.",
    },
    plans: {
      title: `Start with ${PRODUCT_FACTS.freeGenerationLimit} free generations`,
      intro: "Try it first. Upgrade to Premium for unlimited puzzle generation and SVG export.",
      freeName: "Free",
      freeSummary: "Explore your first puzzle designs.",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} puzzle generations`],
      premiumName: "Premium",
      premiumSummary: "Create as much as you like, and export your designs.",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map((item) => premiumFeatureLabels.en[item]),
      storeNote: "The App Store displays the current price for your region.",
      pricingLabel: "View plans and pricing",
    },
    faq: {
      title: "A few things you might be wondering",
      items: [
        {question: "Can I use my own outline?", answer: "Yes. Draw a closed outline in the app or import one from an SVG file, then use it as the shape of your puzzle."},
        {question: "Can I edit the puzzle after generation?", answer: "Yes. You can move points, adjust curves, and edit the generated SVG cutlines before exporting."},
        {question: "Which format can I export?", answer: "JigsawDesigner exports SVG files, which you can open in other vector editors and cutting software. SVG export requires Premium."},
        {question: "Does the app choose laser settings?", answer: "No. Set the power, speed, and material options in your cutting software. Check the scale and test a small sample before cutting the full design."},
      ],
    },
    learn: {
      eyebrow: "Guides and tutorials",
      title: "A little guidance for your next idea",
      intro: "Learn the basics, follow a project from start to finish, or get more from the SVG editor.",
      viewAllLabel: "Browse all guides",
      links: [
        {href: "/jigsaw-dieline-generator", title: "Puzzle cutlines explained"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "Make a laser-cut jigsaw puzzle"},
        {href: "/help/vector-editing", title: "Edit and export SVG"},
      ],
    },
  },

  "zh-Hans": {
    hero: {
      eyebrow: `JigsawDesigner ${PRODUCT_FACTS.currentVersion} · iPhone、iPad 与 Mac`,
      title: "把喜欢的轮廓，变成独特的拼图",
      subtitle: "画出轮廓或导入图形，生成拼图切割线，再调整曲线与细节。在 Mac、iPad 或 iPhone 上设计，导出可编辑的 SVG。",
      primaryLabel: "前往 App Store",
      secondaryLabel: "看看怎么做",
      inputLabel: "原始边界",
      resultLabel: "生成的 SVG",
      input: screenshot("/generation-ready-v1-6.webp", "JigsawDesigner 中已准备好的不规则闭合边界、卡槽模板和生成设置", "生成前的闭合边界。", sourceLabels["zh-Hans"]),
      result: screenshot("/generated-result-editable-v1-6.webp", "不规则边界内生成的拼图切割线，并作为可编辑分组被选中", "拼图已生成，细节还可以继续调整。", sourceLabels["zh-Hans"]),
    },
    primer: {
      eyebrow: "拼图切割设计",
      title: "拼图切割图的专业构成",
      intro: "每套切割图都始于闭合的拼图外轮廓，内部共享切割线再把图形分成一片片拼图片。凸榫与匹配的凹口沿这些共享边界形成互锁连接。Whimsy 则不同：它是一整片具有可识别具象轮廓的特殊拼图片。",
      parts: [
        {id: "perimeter", number: "01", title: "拼图外轮廓", description: "闭合的外部轮廓线决定成品拼图的整体外形。"},
        {id: "piece-boundaries", number: "02", title: "分片切割线", description: "共享的内部路径把外轮廓分隔成一片片独立拼图片。"},
        {id: "interlock", number: "03", title: "凸榫与凹口", description: "凸榫与匹配的凹口沿相邻拼图片的共享边界形成。"},
        {id: "whimsy", number: "04", title: "Whimsy（可选具象异形片）", description: "一整片具有可识别主题轮廓的特殊拼图片；JigsawDesigner 当前不会自动生成 Whimsy。"},
      ],
      svgLabel: "输出：可编辑 SVG 切割几何",
      note: "JigsawDesigner 会把所选卡槽模板应用到符合距离条件的分片边缘，并将结果保留为可编辑 SVG 几何。Whimsy 需要手工设计或导入并检查衔接，生成器当前不会自动创建；材料、切缝、功率、速度和安全参数仍需在下游流程中处理。",
    },
    workflow: {
      eyebrow: "简单三步",
      title: "从一个轮廓，开始你的拼图设计",
      intro: "选好外形、生成拼图、调整细节，在一个 App 里就能完成。",
      items: [
        {number: "01", title: "选一个喜欢的外形", description: "导入 SVG 图稿，或直接画出闭合轮廓。简单的剪影，也能成为有趣的拼图。", evidence: screenshot("/svg-import-fidelity-v1-6.webp", "JigsawDesigner 中选中的复杂导入 SVG，并显示其图层层级和形状信息", "导入自己的图稿，接着创作。", sourceLabels["zh-Hans"])},
        {number: "02", title: "生成专属拼图", description: "选好拼接样式，调整网格和间距，让切割线填入你的轮廓。", evidence: screenshot("/generated-result-editable-v1-6.webp", "JigsawDesigner 中作为分组被选中的拼图切割线", "生成的切割线，每一条都能继续调整。", sourceLabels["zh-Hans"])},
        {number: "03", title: "打磨细节，导出设计", description: "移动节点、调整曲线，直到满意。订阅 Premium 后，就能将设计导出为 SVG。", evidence: screenshot("/vector-point-edit-v1-6.webp", "JigsawDesigner 中拼图边界周围显示的点编辑锚点", "生成之后，曲线细节依然由你掌控。", sourceLabels["zh-Hans"])},
      ],
    },
    showcase: {eyebrow: "用 JigsawDesigner 创作", title: "让轮廓，多一种可能", intro: "从有趣的剪影到精细的矢量图稿，看看 JigsawDesigner 团队的设计，找找下一份灵感。", objectiveLabel: "目标", templateLabel: "模板", editLabel: "下一步编辑", viewAllLabel: "浏览更多作品"},
    devices: {
      eyebrow: "Mac、iPad 和 iPhone",
      title: "用顺手的设备，做喜欢的设计",
      intro: "Mac、iPad 和 iPhone 都有熟悉的设计工具，界面为不同屏幕做了适配，随手就能开始创作。",
      items: [
        {platform: "Mac", title: "大屏上，细节一览无余", evidence: screenshot("/device-mac-svg-workspace-v1-6.webp", "Mac 上显示龙形项目的 JigsawDesigner 1.6 SVG 工作区", "Mac 工作区", sourceLabels["zh-Hans"])},
        {platform: "iPad", title: "轻触拖动，自在创作", evidence: screenshot("/device-ipad-vector-editing-v1-6.webp", "iPad 上的 JigsawDesigner 1.6 矢量编辑界面", "iPad 编辑器", sourceLabels["zh-Hans"])},
        {platform: "iPhone", title: "随手记下设计灵感", evidence: screenshot("/device-iphone-vector-selection-v1-6.webp", "iPhone 上的 JigsawDesigner 1.6 矢量选择界面", "iPhone 编辑器", sourceLabels["zh-Hans"])},
      ],
      capabilities: [
        {title: "SVG 导入", description: "打开矢量图稿并检查可见结构。"},
        {title: "路径编辑", description: "编辑锚点、分组、变换和绘制路径。"},
        {title: "自定义卡槽", description: "绘制或导入生成器使用的连接轮廓。"},
        {title: "项目库", description: "保留可编辑项目，方便后续修改。"},
      ],
    },
    downstream: {
      eyebrow: "导出之后",
      title: "把实际制作作为单独的验证阶段",
      intro: "JigsawDesigner 负责交接 SVG 几何；操作类型、材料设置与设备安全仍由下游软件和设备流程负责。",
      steps: [
        {title: "导出 SVG", description: "保留可编辑项目，并导出下游需要的几何。"},
        {title: "检查交接文件", description: "确认单位、比例、重复路径、线条解释和目标操作。"},
        {title: "先做材料测试", description: "参考设备文档，先用小范围测试再投入整张材料。"},
        {title: "制作并记录", description: "在 JigsawDesigner 之外记录最终材料和设备设置，便于复现。"},
      ],
      tutorialLabel: "阅读完整制作教程",
      note: "JigsawDesigner 不能替代切割软件、设备文档或安全操作流程。",
      videoTitle: "JigsawDesigner 产品演示",
      videoPlayLabel: "播放产品演示",
      videoCaption: "较早录制的产品演示；当前界面请以上方 1.6.0 截图为准。",
    },
    plans: {
      title: `先免费生成 ${PRODUCT_FACTS.freeGenerationLimit} 次`,
      intro: "先试试，再决定。升级 Premium，即可无限生成拼图，并导出 SVG。",
      freeName: "免费版", freeSummary: "试着做出你的第一份拼图设计。", freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼图生成`],
      premiumName: "Premium", premiumSummary: "尽情创作，把满意的设计导出保存。", premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map((item) => premiumFeatureLabels["zh-Hans"][item]),
      storeNote: "App Store 会显示你所在地区的当前价格。", pricingLabel: "查看订阅方案",
    },
    faq: {
      title: "你可能想了解",
      items: [
        {question: "可以使用自己的轮廓吗？", answer: "可以。在 App 中画出闭合轮廓，或导入 SVG 图形，就能用它来设计拼图。"},
        {question: "生成后还能编辑吗？", answer: "可以。生成后仍能移动节点、调整曲线，继续修改 SVG 切割线。"},
        {question: "可以导出什么格式？", answer: "JigsawDesigner 支持导出 SVG，可在其他矢量编辑器或切割软件中打开。导出功能需要订阅 Premium。"},
        {question: "App 会设置激光参数吗？", answer: "不会。功率、速度和材料参数需要在切割软件中设置。正式切割前，请确认尺寸比例，并先做小样测试。"},
      ],
    },
    learn: {eyebrow: "指南与教程", title: "为你的下一个想法，找点帮助", intro: "了解拼图切割线，跟着教程完成一个作品，或学会更多 SVG 编辑技巧。", viewAllLabel: "浏览全部教程", links: [
      {href: "/jigsaw-dieline-generator", title: "认识拼图切割线"},
      {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "制作激光切割拼图"},
      {href: "/help/vector-editing", title: "编辑并导出 SVG"},
    ]},
  },

  "zh-Hant": {
    hero: {
      eyebrow: `JigsawDesigner ${PRODUCT_FACTS.currentVersion} · iPhone、iPad 與 Mac`,
      title: "把喜歡的輪廓，變成獨特的拼圖",
      subtitle: "畫出輪廓或匯入圖形，產生拼圖切割線，再慢慢調整每個細節。在 Mac、iPad 或 iPhone 上設計，匯出可編輯的 SVG。",
      primaryLabel: "前往 App Store",
      secondaryLabel: "看看怎麼做",
      inputLabel: "原始邊界",
      resultLabel: "產生的 SVG",
      input: screenshot("/generation-ready-v1-6.webp", "JigsawDesigner 中已準備好的不規則封閉邊界、卡槽範本與產生設定", "產生前的封閉邊界。", sourceLabels["zh-Hant"]),
      result: screenshot("/generated-result-editable-v1-6.webp", "不規則邊界內產生的拼圖切割線，並以可編輯群組選取", "拼圖已經成形，細節還能繼續調整。", sourceLabels["zh-Hant"]),
    },
    primer: {
      eyebrow: "拼圖切割設計",
      title: "拼圖切割圖的專業構成",
      intro: "每套切割圖都始於封閉的拼圖外輪廓，內部共享切割線再把圖形分成一片片拼圖片。凸榫與匹配的凹口沿這些共享邊界形成互鎖連接。Whimsy 則不同：它是一整片具有可辨識具象輪廓的特殊拼圖片。",
      parts: [
        {id: "perimeter", number: "01", title: "拼圖外輪廓", description: "封閉的外部輪廓線決定成品拼圖的整體外形。"},
        {id: "piece-boundaries", number: "02", title: "分片切割線", description: "共享的內部路徑把外輪廓分隔成一片片獨立拼圖片。"},
        {id: "interlock", number: "03", title: "凸榫與凹口", description: "凸榫與匹配的凹口沿相鄰拼圖片的共享邊界形成。"},
        {id: "whimsy", number: "04", title: "Whimsy（可選具象異形片）", description: "一整片具有可辨識主題輪廓的特殊拼圖片；JigsawDesigner 目前不會自動產生 Whimsy。"},
      ],
      svgLabel: "輸出：可編輯 SVG 切割幾何",
      note: "JigsawDesigner 會將所選凹槽範本套用到符合距離條件的分片邊緣，並將結果保留為可編輯 SVG 幾何。Whimsy 需要手動設計或匯入並檢查銜接，產生器目前不會自動建立；材料、切縫、功率、速度與安全參數仍需在下游流程中處理。",
    },
    workflow: {
      eyebrow: "簡單三步", title: "從一個輪廓，開始你的拼圖設計", intro: "選好外形、產生拼圖、調整細節，在一個 App 裡就能完成。",
      items: [
        {number: "01", title: "選一個喜歡的外形", description: "匯入 SVG 圖稿，或直接畫出封閉輪廓。簡單的剪影，也能成為有趣的拼圖。", evidence: screenshot("/svg-import-fidelity-v1-6.webp", "JigsawDesigner 中選取的複雜匯入 SVG，並顯示圖層階層與形狀資訊", "匯入自己的圖稿，接著創作。", sourceLabels["zh-Hant"])},
        {number: "02", title: "做出專屬拼圖", description: "選好拼接樣式，調整網格與間距，讓切割線填入你的輪廓。", evidence: screenshot("/generated-result-editable-v1-6.webp", "JigsawDesigner 中以群組選取的拼圖切割線", "產生的切割線，每一條都能繼續調整。", sourceLabels["zh-Hant"])},
        {number: "03", title: "調整細節，匯出設計", description: "移動節點、調整曲線，直到滿意。訂閱 Premium 後，就能將設計匯出為 SVG。", evidence: screenshot("/vector-point-edit-v1-6.webp", "JigsawDesigner 中拼圖邊界周圍顯示的節點編輯錨點", "拼圖成形後，曲線細節依然由你決定。", sourceLabels["zh-Hant"])},
      ],
    },
    showcase: {eyebrow: "用 JigsawDesigner 創作", title: "讓輪廓，多一種可能", intro: "從有趣的剪影到細緻的向量圖稿，看看 JigsawDesigner 團隊的設計，找找下一份靈感。", objectiveLabel: "目標", templateLabel: "範本", editLabel: "下一步編輯", viewAllLabel: "瀏覽更多作品"},
    devices: {
      eyebrow: "Mac、iPad 和 iPhone", title: "用順手的裝置，做喜歡的設計", intro: "Mac、iPad 和 iPhone 都有熟悉的設計工具，介面為不同螢幕做了調整，隨手就能開始創作。",
      items: [
        {platform: "Mac", title: "大螢幕上，看清每個細節", evidence: screenshot("/device-mac-svg-workspace-v1-6.webp", "Mac 上顯示龍形專案的 JigsawDesigner 1.6 SVG 工作區", "Mac 工作區", sourceLabels["zh-Hant"])},
        {platform: "iPad", title: "輕觸拖曳，自在創作", evidence: screenshot("/device-ipad-vector-editing-v1-6.webp", "iPad 上的 JigsawDesigner 1.6 向量編輯介面", "iPad 編輯器", sourceLabels["zh-Hant"])},
        {platform: "iPhone", title: "隨手記下設計靈感", evidence: screenshot("/device-iphone-vector-selection-v1-6.webp", "iPhone 上的 JigsawDesigner 1.6 向量選取介面", "iPhone 編輯器", sourceLabels["zh-Hant"])},
      ],
      capabilities: [
        {title: "SVG 匯入", description: "開啟向量圖稿並檢查可見結構。"},
        {title: "路徑編輯", description: "編輯錨點、群組、變形與繪製路徑。"},
        {title: "自訂卡槽", description: "繪製或匯入產生器使用的連接輪廓。"},
        {title: "專案庫", description: "保留可編輯專案，方便後續修改。"},
      ],
    },
    downstream: {
      eyebrow: "匯出之後", title: "將實際製作視為獨立驗證階段", intro: "JigsawDesigner 負責交接 SVG 幾何；操作類型、材料設定與設備安全仍由下游軟體和設備流程負責。",
      steps: [
        {title: "匯出 SVG", description: "保留可編輯專案，並匯出下游需要的幾何。"},
        {title: "檢查交接檔案", description: "確認單位、比例、重複路徑、線條解讀與目標操作。"},
        {title: "先做材料測試", description: "參考設備文件，以小範圍測試後再投入整張材料。"},
        {title: "製作並記錄", description: "在 JigsawDesigner 之外記錄最終材料與設備設定，以便重現。"},
      ],
      tutorialLabel: "閱讀完整製作教學", note: "JigsawDesigner 無法取代切割軟體、設備文件或安全操作流程。", videoTitle: "JigsawDesigner 產品示範", videoPlayLabel: "播放產品示範", videoCaption: "較早錄製的產品示範；目前介面請以上方 1.6.0 截圖為準。",
    },
    plans: {
      title: `先免費試做 ${PRODUCT_FACTS.freeGenerationLimit} 次拼圖`, intro: "先試試，再決定。升級 Premium，即可不限次數製作拼圖，並匯出 SVG。",
      freeName: "免費版", freeSummary: "試著做出你的第一份拼圖設計。", freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼圖產生`],
      premiumName: "Premium", premiumSummary: "盡情創作，把滿意的設計匯出儲存。", premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map((item) => premiumFeatureLabels["zh-Hant"][item]),
      storeNote: "App Store 會顯示所在地區的目前價格。", pricingLabel: "查看訂閱方案",
    },
    faq: {
      title: "你可能想了解",
      items: [
        {question: "可以使用自己的輪廓嗎？", answer: "可以。在 App 中畫出封閉輪廓，或匯入 SVG 圖形，就能用它來設計拼圖。"},
        {question: "產生後還能編輯嗎？", answer: "可以。產生後仍能移動節點、調整曲線，繼續修改 SVG 切割線。"},
        {question: "可以匯出什麼格式？", answer: "JigsawDesigner 支援匯出 SVG，可在其他向量編輯器或切割軟體中開啟。匯出功能需要訂閱 Premium。"},
        {question: "App 會設定雷射參數嗎？", answer: "不會。功率、速度與材料參數需要在切割軟體中設定。正式切割前，請確認尺寸比例，並先做小樣測試。"},
      ],
    },
    learn: {eyebrow: "指南與教學", title: "為你的下一個想法，找點幫助", intro: "認識拼圖切割線，跟著教學完成一件作品，或學會更多 SVG 編輯技巧。", viewAllLabel: "瀏覽全部教學", links: [
      {href: "/jigsaw-dieline-generator", title: "認識拼圖切割線"},
      {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "製作雷射切割拼圖"},
      {href: "/help/vector-editing", title: "編輯並匯出 SVG"},
    ]},
  },
};
