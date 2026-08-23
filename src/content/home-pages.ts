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
  "zh-Hans": {unlimitedJigsawGeneration: "无限拼图生成", svgExport: "SVG 导出"},
  "zh-Hant": {unlimitedJigsawGeneration: "無限拼圖產生", svgExport: "SVG 匯出"},
};

export const HOME_PAGES: Record<TierOneLocale, HomePageContent> = {
  en: {
    hero: {
      eyebrow: `JigsawDesigner ${PRODUCT_FACTS.currentVersion} · iPhone, iPad, and Mac`,
      title: "Turn a closed outline into editable puzzle cutlines",
      subtitle: "Draw or import a vector boundary, choose a slot profile, generate the internal pattern, then refine the SVG before it leaves your project.",
      primaryLabel: "View on the App Store",
      secondaryLabel: "See the workflow",
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
        "The generated SVG remains selectable and editable.",
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
      eyebrow: "The real workflow",
      title: "From source geometry to an SVG you can keep editing",
      intro: "Generation is one step inside the project—not the end of the design process.",
      items: [
        {
          number: "01",
          title: "Import or draw the source geometry",
          description: "Bring in an SVG or draw a closed contour with vector tools. Check its scale, groups, and visible geometry on the canvas before generation.",
          evidence: screenshot(
            "/svg-import-fidelity-v1-6.webp",
            "A detailed imported SVG selected in JigsawDesigner with its Layers hierarchy and Shape Info visible",
            "Imported SVG shown with its actual document structure.",
            sourceLabels.en,
          ),
        },
        {
          number: "02",
          title: "Generate inside the chosen boundary",
          description: "Choose a built-in or custom slot profile, set grid and distance values, and generate. Review the result instead of treating the first output as final.",
          evidence: screenshot(
            "/generated-result-editable-v1-6.webp",
            "Generated puzzle cutlines selected as a group in JigsawDesigner",
            "The generator returns editable vector geometry.",
            sourceLabels.en,
          ),
        },
        {
          number: "03",
          title: "Refine the paths, then export SVG",
          description: "Use selection handles, Layers, Point Edit, grouping, and Inspector values to make the document ready for the next tool in your workflow.",
          evidence: screenshot(
            "/vector-point-edit-v1-6.webp",
            "Point Edit anchors shown around a generated puzzle boundary in JigsawDesigner",
            "Anchor-level edits remain available after generation.",
            sourceLabels.en,
          ),
        },
      ],
    },
    showcase: {
      eyebrow: "Product-owned examples",
      title: "Inputs, in-app results, and the next edit",
      intro: "Each JigsawDesigner team example records the objective, source geometry, in-app result, and the next vector edit.",
      objectiveLabel: "Objective",
      templateLabel: "Template",
      editLabel: "Next edit",
      viewAllLabel: "Open the full showcase",
    },
    devices: {
      eyebrow: "One workflow, three Apple devices",
      title: "Use the screen that fits the stage of the project",
      intro: "The same core editor is available on Mac, iPad, and iPhone. The screenshots below come from the current 1.6 product build.",
      items: [
        {platform: "Mac", title: "Full SVG workspace", evidence: screenshot("/device-mac-svg-workspace-v1-6.webp", "JigsawDesigner 1.6 SVG workspace on Mac with a dragon project visible", "Mac workspace", sourceLabels.en)},
        {platform: "iPad", title: "Touch-based vector editing", evidence: screenshot("/device-ipad-vector-editing-v1-6.webp", "JigsawDesigner 1.6 vector editing interface on iPad", "iPad editor", sourceLabels.en)},
        {platform: "iPhone", title: "Compact selection workflow", evidence: screenshot("/device-iphone-vector-selection-v1-6.webp", "JigsawDesigner 1.6 vector selection interface on iPhone", "iPhone editor", sourceLabels.en)},
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
      intro: "Premium adds unlimited generation and SVG export. Apple handles monthly and yearly subscriptions.",
      freeName: "Free",
      freeSummary: "Try the core generation workflow.",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} puzzle generations`],
      premiumName: "Premium",
      premiumSummary: "Continue generating and export SVG.",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map((item) => premiumFeatureLabels.en[item]),
      storeNote: "The App Store displays the current price for your region.",
      pricingLabel: "Compare Free and Premium",
    },
    faq: {
      title: "Questions before you start",
      items: [
        {question: "Can I use my own outline?", answer: "Yes. Draw a closed vector boundary or import suitable SVG geometry, then choose the boundary used for generation."},
        {question: "Can I edit the puzzle after generation?", answer: "Yes. The generated cutlines return to the document as editable SVG geometry."},
        {question: "Which format can I export?", answer: "JigsawDesigner currently exports SVG. SVG export is included with Premium."},
        {question: "Does the app choose laser settings?", answer: "No. Validate units, scale, material, kerf, operations, power, speed, and safety in the downstream workflow for your equipment."},
      ],
    },
    learn: {
      eyebrow: "Learn by stage",
      title: "Understand the geometry, finish one project, then go deeper",
      intro: "Choose one of three paths: understand cutlines, complete a project, or refine and export SVG.",
      viewAllLabel: "Open Learn",
      links: [
        {href: "/jigsaw-dieline-generator", title: "Understand puzzle cutlines"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "Complete a making workflow"},
        {href: "/help/vector-editing", title: "Edit and export SVG"},
      ],
    },
  },

  "zh-Hans": {
    hero: {
      eyebrow: `JigsawDesigner ${PRODUCT_FACTS.currentVersion} · iPhone、iPad 与 Mac`,
      title: "把闭合轮廓变成可编辑拼图切割线",
      subtitle: "绘制或导入矢量边界，选择卡槽轮廓，生成内部图案，再在项目中继续调整 SVG。",
      primaryLabel: "前往 App Store",
      secondaryLabel: "查看工作流程",
      inputLabel: "原始边界",
      resultLabel: "生成的 SVG",
      input: screenshot("/generation-ready-v1-6.webp", "JigsawDesigner 中已准备好的不规则闭合边界、卡槽模板和生成设置", "生成前的闭合边界。", sourceLabels["zh-Hans"]),
      result: screenshot("/generated-result-editable-v1-6.webp", "不规则边界内生成的拼图切割线，并作为可编辑分组被选中", "生成的 SVG 仍可选择和编辑。", sourceLabels["zh-Hans"]),
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
      eyebrow: "真实工作流",
      title: "从源几何到可以继续编辑的 SVG",
      intro: "生成只是项目中的一个步骤，不是设计流程的终点。",
      items: [
        {number: "01", title: "导入或绘制源几何", description: "导入 SVG，或用矢量工具绘制闭合轮廓。生成前先检查画布尺寸、分组和可见几何。", evidence: screenshot("/svg-import-fidelity-v1-6.webp", "JigsawDesigner 中选中的复杂导入 SVG，并显示其图层层级和形状信息", "真实导入 SVG 及其文档结构。", sourceLabels["zh-Hans"])},
        {number: "02", title: "在所选边界中生成", description: "选择内置或自定义卡槽轮廓，设置网格与距离，再运行生成。应检查结果，而不是默认第一次输出就是最终版本。", evidence: screenshot("/generated-result-editable-v1-6.webp", "JigsawDesigner 中作为分组被选中的拼图切割线", "生成器返回可编辑的矢量几何。", sourceLabels["zh-Hans"])},
        {number: "03", title: "调整路径，再导出 SVG", description: "用选区手柄、图层、点编辑、分组和 Inspector 数值继续整理文档，然后交给下一步工具。", evidence: screenshot("/vector-point-edit-v1-6.webp", "JigsawDesigner 中拼图边界周围显示的点编辑锚点", "生成后仍可进行锚点级编辑。", sourceLabels["zh-Hans"])},
      ],
    },
    showcase: {eyebrow: "产品方自制示例", title: "看清输入、产品内结果和下一步编辑", intro: "每个 JigsawDesigner 团队示例都会记录目标、源几何、产品内结果和下一步矢量编辑。", objectiveLabel: "目标", templateLabel: "模板", editLabel: "下一步编辑", viewAllLabel: "查看完整作品展示"},
    devices: {
      eyebrow: "一套工作流，三种 Apple 设备",
      title: "根据项目阶段选择合适的屏幕",
      intro: "Mac、iPad 和 iPhone 提供同一套核心编辑流程。以下截图来自当前 1.6 产品版本。",
      items: [
        {platform: "Mac", title: "完整 SVG 工作区", evidence: screenshot("/device-mac-svg-workspace-v1-6.webp", "Mac 上显示龙形项目的 JigsawDesigner 1.6 SVG 工作区", "Mac 工作区", sourceLabels["zh-Hans"])},
        {platform: "iPad", title: "触控矢量编辑", evidence: screenshot("/device-ipad-vector-editing-v1-6.webp", "iPad 上的 JigsawDesigner 1.6 矢量编辑界面", "iPad 编辑器", sourceLabels["zh-Hans"])},
        {platform: "iPhone", title: "紧凑选区工作流", evidence: screenshot("/device-iphone-vector-selection-v1-6.webp", "iPhone 上的 JigsawDesigner 1.6 矢量选择界面", "iPhone 编辑器", sourceLabels["zh-Hans"])},
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
      intro: "Premium 提供无限生成和 SVG 导出。月订阅与年订阅均由 Apple 处理。",
      freeName: "Free", freeSummary: "先体验核心生成流程。", freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼图生成`],
      premiumName: "Premium", premiumSummary: "持续生成并导出 SVG。", premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map((item) => premiumFeatureLabels["zh-Hans"][item]),
      storeNote: "App Store 会显示你所在地区的当前价格。", pricingLabel: "比较 Free 与 Premium",
    },
    faq: {
      title: "开始前常见问题",
      items: [
        {question: "可以使用自己的轮廓吗？", answer: "可以。绘制闭合矢量边界或导入合适的 SVG 几何，再选择用于生成的边界。"},
        {question: "生成后还能编辑吗？", answer: "可以。生成的切割线会作为可编辑 SVG 几何返回文档。"},
        {question: "可以导出什么格式？", answer: "JigsawDesigner 当前导出 SVG，SVG 导出包含在 Premium 中。"},
        {question: "App 会设置激光参数吗？", answer: "不会。请在设备对应的下游流程中验证单位、比例、材料、切缝、操作、功率、速度和安全要求。"},
      ],
    },
    learn: {eyebrow: "按阶段学习", title: "先理解几何，再完成一个项目，然后深入编辑", intro: "从三条路径中选择：理解切割线、完成一个项目，或继续编辑并导出 SVG。", viewAllLabel: "打开学习中心", links: [
      {href: "/jigsaw-dieline-generator", title: "理解拼图切割线"},
      {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "完成一次制作工作流"},
      {href: "/help/vector-editing", title: "编辑并导出 SVG"},
    ]},
  },

  "zh-Hant": {
    hero: {
      eyebrow: `JigsawDesigner ${PRODUCT_FACTS.currentVersion} · iPhone、iPad 與 Mac`,
      title: "把封閉輪廓變成可編輯拼圖切割線",
      subtitle: "繪製或匯入向量邊界、選擇卡槽輪廓、產生內部圖樣，再於專案中繼續調整 SVG。",
      primaryLabel: "前往 App Store",
      secondaryLabel: "查看工作流程",
      inputLabel: "原始邊界",
      resultLabel: "產生的 SVG",
      input: screenshot("/generation-ready-v1-6.webp", "JigsawDesigner 中已準備好的不規則封閉邊界、卡槽範本與產生設定", "產生前的封閉邊界。", sourceLabels["zh-Hant"]),
      result: screenshot("/generated-result-editable-v1-6.webp", "不規則邊界內產生的拼圖切割線，並以可編輯群組選取", "產生的 SVG 仍可選取與編輯。", sourceLabels["zh-Hant"]),
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
      eyebrow: "真實工作流程", title: "從來源幾何到可繼續編輯的 SVG", intro: "產生只是專案中的一個步驟，不是設計流程的終點。",
      items: [
        {number: "01", title: "匯入或繪製來源幾何", description: "匯入 SVG，或以向量工具繪製封閉輪廓。產生前先檢查畫布尺寸、群組與可見幾何。", evidence: screenshot("/svg-import-fidelity-v1-6.webp", "JigsawDesigner 中選取的複雜匯入 SVG，並顯示圖層階層與形狀資訊", "真實匯入 SVG 及其文件結構。", sourceLabels["zh-Hant"])},
        {number: "02", title: "在所選邊界中產生", description: "選擇內建或自訂卡槽輪廓、設定網格與距離，再執行產生。應檢查結果，而不是預設第一次輸出就是最終版本。", evidence: screenshot("/generated-result-editable-v1-6.webp", "JigsawDesigner 中以群組選取的拼圖切割線", "產生器回傳可編輯的向量幾何。", sourceLabels["zh-Hant"])},
        {number: "03", title: "調整路徑，再匯出 SVG", description: "使用選取把手、圖層、節點編輯、群組與 Inspector 數值整理文件，再交給下一步工具。", evidence: screenshot("/vector-point-edit-v1-6.webp", "JigsawDesigner 中拼圖邊界周圍顯示的節點編輯錨點", "產生後仍可進行錨點層級編輯。", sourceLabels["zh-Hant"])},
      ],
    },
    showcase: {eyebrow: "產品方自製範例", title: "看清輸入、產品內結果與下一步編輯", intro: "每個 JigsawDesigner 團隊範例都會記錄目標、來源幾何、產品內結果與下一步向量編輯。", objectiveLabel: "目標", templateLabel: "範本", editLabel: "下一步編輯", viewAllLabel: "查看完整作品展示"},
    devices: {
      eyebrow: "一套工作流程，三種 Apple 裝置", title: "依專案階段選擇合適的螢幕", intro: "Mac、iPad 與 iPhone 提供同一套核心編輯流程。以下截圖來自目前 1.6 產品版本。",
      items: [
        {platform: "Mac", title: "完整 SVG 工作區", evidence: screenshot("/device-mac-svg-workspace-v1-6.webp", "Mac 上顯示龍形專案的 JigsawDesigner 1.6 SVG 工作區", "Mac 工作區", sourceLabels["zh-Hant"])},
        {platform: "iPad", title: "觸控向量編輯", evidence: screenshot("/device-ipad-vector-editing-v1-6.webp", "iPad 上的 JigsawDesigner 1.6 向量編輯介面", "iPad 編輯器", sourceLabels["zh-Hant"])},
        {platform: "iPhone", title: "精簡選取工作流程", evidence: screenshot("/device-iphone-vector-selection-v1-6.webp", "iPhone 上的 JigsawDesigner 1.6 向量選取介面", "iPhone 編輯器", sourceLabels["zh-Hant"])},
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
      title: `先免費產生 ${PRODUCT_FACTS.freeGenerationLimit} 次`, intro: "Premium 提供無限產生與 SVG 匯出。月訂閱與年訂閱均由 Apple 處理。",
      freeName: "Free", freeSummary: "先體驗核心產生流程。", freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼圖產生`],
      premiumName: "Premium", premiumSummary: "持續產生並匯出 SVG。", premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map((item) => premiumFeatureLabels["zh-Hant"][item]),
      storeNote: "App Store 會顯示所在地區的目前價格。", pricingLabel: "比較 Free 與 Premium",
    },
    faq: {
      title: "開始前常見問題",
      items: [
        {question: "可以使用自己的輪廓嗎？", answer: "可以。繪製封閉向量邊界或匯入合適的 SVG 幾何，再選擇用於產生的邊界。"},
        {question: "產生後還能編輯嗎？", answer: "可以。產生的切割線會以可編輯 SVG 幾何回到文件。"},
        {question: "可以匯出什麼格式？", answer: "JigsawDesigner 目前匯出 SVG，SVG 匯出包含在 Premium 中。"},
        {question: "App 會設定雷射參數嗎？", answer: "不會。請在設備對應的下游流程中驗證單位、比例、材料、切縫、操作、功率、速度與安全要求。"},
      ],
    },
    learn: {eyebrow: "依階段學習", title: "先理解幾何，再完成一個專案，然後深入編輯", intro: "從三條路徑中選擇：理解切割線、完成一個專案，或繼續編輯並匯出 SVG。", viewAllLabel: "開啟學習中心", links: [
      {href: "/jigsaw-dieline-generator", title: "理解拼圖切割線"},
      {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "完成一次製作工作流程"},
      {href: "/help/vector-editing", title: "編輯並匯出 SVG"},
    ]},
  },
};
