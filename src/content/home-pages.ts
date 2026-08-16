import {PRODUCT_FACTS, type PremiumEntitlement} from "@/config/product";

import type {TierOneLocale} from "./types";

type HomeCard = {
  title: string;
  description: string;
};

type HomeLinkCard = HomeCard & {
  href: string;
};

type HomeGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export type HomePageContent = {
  audience: {
    title: string;
    intro: string;
    items: HomeCard[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    items: HomeCard[];
  };
  release: {
    eyebrow: string;
    title: string;
    description: string;
    capabilities: string[];
    changelogLabel: string;
  };
  gallery: {
    title: string;
    intro: string;
    items: HomeGalleryItem[];
  };
  useCases: {
    title: string;
    intro: string;
    items: HomeCard[];
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
  explore: {
    title: string;
    intro: string;
    items: HomeLinkCard[];
  };
  faq: {
    title: string;
    items: Array<{question: string; answer: string}>;
  };
  finalCta: {
    title: string;
    description: string;
  };
};

const premiumFeatureLabels: Record<
  TierOneLocale,
  Record<PremiumEntitlement, string>
> = {
  en: {
    unlimitedJigsawGeneration: "Unlimited puzzle generation",
    svgExport: "SVG export",
  },
  "zh-Hans": {
    unlimitedJigsawGeneration: "无限拼图生成",
    svgExport: "SVG 导出",
  },
  "zh-Hant": {
    unlimitedJigsawGeneration: "無限拼圖產生",
    svgExport: "SVG 匯出",
  },
};

export const HOME_PAGES: Record<TierOneLocale, HomePageContent> = {
  en: {
    audience: {
      title: "Built for people who need editable puzzle geometry",
      intro:
        "JigsawDesigner combines puzzle generation with a native SVG editor, so the cutlines remain part of an editable project instead of becoming a locked preview.",
      items: [
        {
          title: "Independent designers",
          description:
            "Turn a custom vector boundary into puzzle cutlines, then refine paths, groups, and transforms in one project.",
        },
        {
          title: "Makers and craft studios",
          description:
            "Prepare SVG geometry for a downstream print or cutting workflow, with final settings checked in the software used by your equipment.",
        },
        {
          title: "Educators and creative teams",
          description:
            "Explore how boundaries, connection profiles, and generation parameters change a puzzle pattern while keeping the source document editable.",
        },
      ],
    },
    workflow: {
      eyebrow: "A focused three-step workflow",
      title: "From boundary to editable SVG cutlines",
      intro:
        "Generation is one stage of the vector workflow. You stay in control of the source geometry before and after the algorithm runs.",
      items: [
        {
          title: "1. Prepare the boundary",
          description:
            "Draw a closed contour with the vector tools or import an existing SVG, then inspect it on the canvas and in Layers.",
        },
        {
          title: "2. Generate the pattern",
          description:
            "Choose a built-in or custom slot template and set the grid, target piece count, and slot-distance inputs.",
        },
        {
          title: "3. Refine and hand off",
          description:
            "Edit the generated group, save the source project, export SVG with Premium, and validate the file in the next tool in your workflow.",
        },
      ],
    },
    release: {
      eyebrow: "Current App Store release",
      title: `Version ${PRODUCT_FACTS.currentVersion} strengthens the complete editing loop`,
      description:
        "The current release focuses on preserving richer SVG documents and making common canvas edits more direct.",
      capabilities: [
        "More reliable embedded images, gradients, patterns, and clipping paths",
        "On-canvas resize and rotation for the current selection",
        "Smoother Pencil paths",
        "Continue and join open contours",
        "Accurate zoom from 1% to 3200% with Fit to Window",
        "Migration support for projects created by earlier releases",
      ],
      changelogLabel: `Read the ${PRODUCT_FACTS.currentVersion} changelog`,
    },
    gallery: {
      title: "See the real JigsawDesigner workflow",
      intro:
        "These screens come from the current Apple app and show the editor, generation settings, template tools, and project library.",
      items: [
        {
          src: "/editor_overview-v1-6.webp",
          alt: "JigsawDesigner vector editor with a puzzle project open",
          caption: "Vector editor and canvas",
        },
        {
          src: "/advanced_settings-v1-6.webp",
          alt: "JigsawDesigner jigsaw generation settings",
          caption: "Generation controls",
        },
        {
          src: "/template_editor-v1-6.webp",
          alt: "Custom open slot path in the JigsawDesigner Template Editor",
          caption: "Custom slot templates",
        },
        {
          src: "/my_projects-v1-6.webp",
          alt: "My Projects in the JigsawDesigner Project Library",
          caption: "Editable project library",
        },
      ],
    },
    useCases: {
      title: "One SVG workflow, several starting points",
      intro:
        "Use the same editor whether you begin with a blank canvas, an imported boundary, or an existing project that needs another generation pass.",
      items: [
        {
          title: "Custom puzzle cutlines",
          description:
            "Generate internal puzzle geometry inside a drawn or imported outer contour.",
        },
        {
          title: "Reusable connection profiles",
          description:
            "Start with three built-in slot templates or draw and import your own open SVG path.",
        },
        {
          title: "Vector cleanup and handoff",
          description:
            "Inspect groups and points, transform the selection, and export SVG for the next stage of your workflow.",
        },
      ],
    },
    plans: {
      title: `Start with ${PRODUCT_FACTS.freeGenerationLimit} generations, upgrade when you need more`,
      intro:
        `Purchases are handled only through ${PRODUCT_FACTS.purchase.provider}. The ${PRODUCT_FACTS.purchase.channel} shows the current monthly and yearly subscription prices for your storefront.`,
      freeName: "Free",
      freeSummary: "Explore puzzle generation before subscribing.",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} puzzle generations`],
      premiumName: "Premium",
      premiumSummary: "Choose an Apple monthly or yearly subscription.",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map(
        (entitlement) => premiumFeatureLabels.en[entitlement],
      ),
      storeNote: "No website checkout is offered.",
      pricingLabel: "Compare Free and Premium",
    },
    explore: {
      title: "Explore the puzzle SVG workflow in depth",
      intro:
        "Focused pages answer a specific design question, document the verified workflow, and link to the relevant help guide.",
      items: [
        {href: "/jigsaw-puzzle-generator", title: "Jigsaw puzzle generator", description: "Generate editable cutlines from a vector boundary."},
        {href: "/jigsaw-dieline-generator", title: "Jigsaw dieline generator", description: "Understand the generated vector geometry and editing handoff."},
        {href: "/laser-cut-jigsaw-puzzle-svg", title: "Laser-cut SVG workflow", description: "Prepare an SVG and validate production settings downstream."},
        {href: "/custom-jigsaw-puzzle-template", title: "Custom slot templates", description: "Build and reuse an open connection profile."},
        {href: "/svg-puzzle-editor", title: "SVG puzzle editor", description: "Edit paths, groups, layers, and transforms on Apple devices."},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "Step-by-step SVG guide", description: "Follow the complete design and downstream validation sequence."},
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {question: "Which platforms does JigsawDesigner support?", answer: "The current App Store app supports iPhone, iPad, and Mac."},
        {question: "Which file format can I export?", answer: "SVG is the current export format. SVG export is included with an active Premium subscription."},
        {question: "Does the free experience include puzzle generation?", answer: `Yes. Free users currently receive ${PRODUCT_FACTS.freeGenerationLimit} puzzle generations. Premium unlocks unlimited generation and SVG export.`},
        {question: "Can an exported SVG go directly to any cutting device?", answer: "Treat it as editable vector geometry. Import it into your downstream software and verify scale, operations, material settings, and safety requirements for your own setup."},
      ],
    },
    finalCta: {
      title: "Create puzzle cutlines on iPhone, iPad, and Mac",
      description:
        "Download JigsawDesigner from the App Store and check the current availability and subscription options for your storefront.",
    },
  },
  "zh-Hans": {
    audience: {
      title: "为需要可编辑拼图几何的人而设计",
      intro: "JigsawDesigner 把拼图生成与原生 SVG 编辑器结合起来，让切割线继续留在可编辑项目中。",
      items: [
        {title: "独立设计师", description: "把自定义矢量边界转换为拼图切割线，再在同一项目中调整路径、分组与变换。"},
        {title: "创客与手工工作室", description: "为后续打印或切割流程准备 SVG 几何，并在实际设备所用软件中核对最终参数。"},
        {title: "教育者与创意团队", description: "探索边界、连接轮廓和生成参数如何改变拼图图案，同时保留可编辑源文档。"},
      ],
    },
    workflow: {
      eyebrow: "聚焦的三步工作流",
      title: "从边界到可编辑 SVG 切割线",
      intro: "生成只是矢量工作流中的一个阶段；算法运行前后，你都能继续控制源几何。",
      items: [
        {title: "1. 准备边界", description: "用矢量工具绘制闭合轮廓，或导入已有 SVG，并在画布和图层中检查。"},
        {title: "2. 生成图案", description: "选择内置或自定义卡槽模板，设置网格、目标片数与卡槽距离。"},
        {title: "3. 调整并交接", description: "编辑生成分组、保存源项目、通过 Premium 导出 SVG，再在下一步工具中验证文件。"},
      ],
    },
    release: {
      eyebrow: "当前 App Store 版本",
      title: `${PRODUCT_FACTS.currentVersion} 强化了完整编辑闭环`,
      description: "当前版本重点提升复杂 SVG 文档的保留能力，并让常用画布编辑更直接。",
      capabilities: [
        "更可靠地保留嵌入图片、渐变、图案与裁剪路径",
        "直接在画布缩放和旋转选区",
        "更平滑的 Pencil 路径",
        "继续并连接开放轮廓",
        "1% 至 3200% 真实缩放与适合窗口",
        "支持迁移由更早版本创建的项目",
      ],
      changelogLabel: `查看 ${PRODUCT_FACTS.currentVersion} 更新日志`,
    },
    gallery: {
      title: "查看真实的 JigsawDesigner 工作流",
      intro: "以下画面来自当前 Apple App，展示编辑器、生成设置、模板工具与项目库。",
      items: [
        {src: "/editor_overview-v1-6.webp", alt: "打开拼图项目的 JigsawDesigner 矢量编辑器", caption: "矢量编辑器与画布"},
        {src: "/advanced_settings-v1-6.webp", alt: "JigsawDesigner 拼图生成设置", caption: "生成控制"},
        {src: "/template_editor-v1-6.webp", alt: "JigsawDesigner 模板编辑器中的自定义开放卡槽路径", caption: "自定义卡槽模板"},
        {src: "/my_projects-v1-6.webp", alt: "JigsawDesigner 项目库中的我的项目", caption: "可编辑项目库"},
      ],
    },
    useCases: {
      title: "同一套 SVG 工作流，多种起点",
      intro: "无论从空白画布、导入边界还是已有项目开始，都可使用同一编辑器继续生成和修改。",
      items: [
        {title: "自定义拼图切割线", description: "在绘制或导入的外轮廓中生成内部拼图几何。"},
        {title: "可复用连接轮廓", description: "从三个内置卡槽模板开始，或绘制、导入自己的开放 SVG 路径。"},
        {title: "矢量整理与交接", description: "检查分组与节点、变换选区，并导出 SVG 进入下一步流程。"},
      ],
    },
    plans: {
      title: `先使用 ${PRODUCT_FACTS.freeGenerationLimit} 次生成，需要更多时再升级`,
      intro: `购买仅通过 ${PRODUCT_FACTS.purchase.provider} 完成；${PRODUCT_FACTS.purchase.channel} 会显示你所在地区的月订阅和年订阅实时价格。`,
      freeName: "Free",
      freeSummary: "订阅前先体验拼图生成。",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼图生成`],
      premiumName: "Premium",
      premiumSummary: "可选择 Apple 月订阅或年订阅。",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map(
        (entitlement) => premiumFeatureLabels["zh-Hans"][entitlement],
      ),
      storeNote: "网站不提供结账。",
      pricingLabel: "比较 Free 与 Premium",
    },
    explore: {
      title: "深入了解拼图 SVG 工作流",
      intro: "每个专题页聚焦一个设计问题，说明已验证流程，并链接相关帮助文档。",
      items: [
        {href: "/jigsaw-puzzle-generator", title: "拼图生成器", description: "从矢量边界生成可编辑切割线。"},
        {href: "/jigsaw-dieline-generator", title: "拼图刀模生成器", description: "了解生成的矢量几何和编辑交接。"},
        {href: "/laser-cut-jigsaw-puzzle-svg", title: "激光切割 SVG 工作流", description: "准备 SVG，并在下游验证生产参数。"},
        {href: "/custom-jigsaw-puzzle-template", title: "自定义卡槽模板", description: "创建并复用开放连接轮廓。"},
        {href: "/svg-puzzle-editor", title: "SVG 拼图编辑器", description: "在 Apple 设备上编辑路径、分组、图层和变换。"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "逐步 SVG 指南", description: "完成设计与下游验证的完整顺序。"},
      ],
    },
    faq: {
      title: "常见问题",
      items: [
        {question: "JigsawDesigner 支持哪些平台？", answer: "当前 App Store App 支持 iPhone、iPad 和 Mac。"},
        {question: "可以导出什么文件格式？", answer: "当前导出格式为 SVG；有效 Premium 订阅包含 SVG 导出。"},
        {question: "免费体验包含拼图生成吗？", answer: `包含。免费用户当前有 ${PRODUCT_FACTS.freeGenerationLimit} 次拼图生成；Premium 解锁无限生成与 SVG 导出。`},
        {question: "导出的 SVG 能直接交给任意切割设备吗？", answer: "请把它作为可编辑矢量几何导入下游软件，并根据自己的设备核对比例、操作、材料参数和安全要求。"},
      ],
    },
    finalCta: {
      title: "在 iPhone、iPad 和 Mac 上创建拼图切割线",
      description: "前往 App Store 下载 JigsawDesigner，并查看你所在地区当前的可用性与订阅选项。",
    },
  },
  "zh-Hant": {
    audience: {
      title: "為需要可編輯拼圖幾何的人而設計",
      intro: "JigsawDesigner 將拼圖產生與原生 SVG 編輯器結合，讓切割線繼續保留在可編輯專案中。",
      items: [
        {title: "獨立設計師", description: "將自訂向量邊界轉換成拼圖切割線，再於同一專案調整路徑、群組與變形。"},
        {title: "創客與手作工作室", description: "為後續列印或切割流程準備 SVG 幾何，並於實際設備使用的軟體核對最終參數。"},
        {title: "教育者與創意團隊", description: "探索邊界、連接輪廓與產生參數如何改變拼圖圖樣，同時保留可編輯來源文件。"},
      ],
    },
    workflow: {
      eyebrow: "聚焦的三步工作流程",
      title: "從邊界到可編輯 SVG 切割線",
      intro: "產生只是向量工作流程的一個階段；演算法執行前後，你都能繼續控制來源幾何。",
      items: [
        {title: "1. 準備邊界", description: "使用向量工具繪製封閉輪廓，或匯入現有 SVG，並於畫布與圖層檢查。"},
        {title: "2. 產生圖樣", description: "選擇內建或自訂卡槽範本，設定網格、目標片數與卡槽距離。"},
        {title: "3. 調整並交接", description: "編輯產生的群組、儲存來源專案、透過 Premium 匯出 SVG，再於下一個工具驗證檔案。"},
      ],
    },
    release: {
      eyebrow: "目前 App Store 版本",
      title: `${PRODUCT_FACTS.currentVersion} 強化完整編輯循環`,
      description: "目前版本著重提升複雜 SVG 文件的保留能力，並讓常用畫布編輯更直接。",
      capabilities: [
        "更可靠地保留嵌入圖片、漸層、圖樣與裁剪路徑",
        "直接在畫布縮放與旋轉選取範圍",
        "更平滑的 Pencil 路徑",
        "繼續並連接開放輪廓",
        "1% 至 3200% 真實縮放與符合視窗",
        "支援移轉由更早版本建立的專案",
      ],
      changelogLabel: `查看 ${PRODUCT_FACTS.currentVersion} 更新日誌`,
    },
    gallery: {
      title: "查看真實的 JigsawDesigner 工作流程",
      intro: "以下畫面來自目前 Apple App，展示編輯器、產生設定、範本工具與專案庫。",
      items: [
        {src: "/editor_overview-v1-6.webp", alt: "開啟拼圖專案的 JigsawDesigner 向量編輯器", caption: "向量編輯器與畫布"},
        {src: "/advanced_settings-v1-6.webp", alt: "JigsawDesigner 拼圖產生設定", caption: "產生控制"},
        {src: "/template_editor-v1-6.webp", alt: "JigsawDesigner 範本編輯器中的自訂開放卡槽路徑", caption: "自訂卡槽範本"},
        {src: "/my_projects-v1-6.webp", alt: "JigsawDesigner 專案庫中的我的專案", caption: "可編輯專案庫"},
      ],
    },
    useCases: {
      title: "同一套 SVG 工作流程，多種起點",
      intro: "無論從空白畫布、匯入邊界或現有專案開始，都可使用同一編輯器繼續產生與修改。",
      items: [
        {title: "自訂拼圖切割線", description: "在繪製或匯入的外輪廓中產生內部拼圖幾何。"},
        {title: "可重複使用的連接輪廓", description: "從三個內建卡槽範本開始，或繪製、匯入自己的開放 SVG 路徑。"},
        {title: "向量整理與交接", description: "檢查群組與節點、變形選取範圍，並匯出 SVG 進入下一步流程。"},
      ],
    },
    plans: {
      title: `先使用 ${PRODUCT_FACTS.freeGenerationLimit} 次產生，需要更多時再升級`,
      intro: `購買僅透過 ${PRODUCT_FACTS.purchase.provider} 完成；${PRODUCT_FACTS.purchase.channel} 會顯示所在地區的月訂閱與年訂閱即時價格。`,
      freeName: "Free",
      freeSummary: "訂閱前先體驗拼圖產生。",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼圖產生`],
      premiumName: "Premium",
      premiumSummary: "可選擇 Apple 月訂閱或年訂閱。",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map(
        (entitlement) => premiumFeatureLabels["zh-Hant"][entitlement],
      ),
      storeNote: "網站不提供結帳。",
      pricingLabel: "比較 Free 與 Premium",
    },
    explore: {
      title: "深入瞭解拼圖 SVG 工作流程",
      intro: "每個專題頁聚焦一個設計問題，說明已驗證流程，並連結相關說明文件。",
      items: [
        {href: "/jigsaw-puzzle-generator", title: "拼圖產生器", description: "從向量邊界產生可編輯切割線。"},
        {href: "/jigsaw-dieline-generator", title: "拼圖刀模產生器", description: "瞭解產生的向量幾何與編輯交接。"},
        {href: "/laser-cut-jigsaw-puzzle-svg", title: "雷射切割 SVG 工作流程", description: "準備 SVG，並於下游驗證生產參數。"},
        {href: "/custom-jigsaw-puzzle-template", title: "自訂卡槽範本", description: "建立並重複使用開放連接輪廓。"},
        {href: "/svg-puzzle-editor", title: "SVG 拼圖編輯器", description: "在 Apple 裝置上編輯路徑、群組、圖層與變形。"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "逐步 SVG 指南", description: "完成設計與下游驗證的完整順序。"},
      ],
    },
    faq: {
      title: "常見問題",
      items: [
        {question: "JigsawDesigner 支援哪些平台？", answer: "目前 App Store App 支援 iPhone、iPad 與 Mac。"},
        {question: "可以匯出什麼檔案格式？", answer: "目前匯出格式為 SVG；有效 Premium 訂閱包含 SVG 匯出。"},
        {question: "免費體驗包含拼圖產生嗎？", answer: `包含。免費使用者目前有 ${PRODUCT_FACTS.freeGenerationLimit} 次拼圖產生；Premium 解鎖無限產生與 SVG 匯出。`},
        {question: "匯出的 SVG 能直接交給任意切割設備嗎？", answer: "請將它視為可編輯向量幾何，匯入下游軟體，並依自己的設備核對比例、操作、材料參數與安全要求。"},
      ],
    },
    finalCta: {
      title: "在 iPhone、iPad 與 Mac 上建立拼圖切割線",
      description: "前往 App Store 下載 JigsawDesigner，並查看所在地區目前的供應狀況與訂閱選項。",
    },
  },
};
