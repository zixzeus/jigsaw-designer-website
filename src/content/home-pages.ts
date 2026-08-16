import {PRODUCT_FACTS, type PremiumEntitlement} from "@/config/product";

import type {TierOneLocale} from "./types";

type HomeCard = {
  title: string;
  description: string;
};

type HomeLink = {
  href: string;
  title: string;
};

type HomeGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export type HomePageContent = {
  workflow: {
    eyebrow: string;
    title: string;
    intro: string;
    items: HomeCard[];
  };
  release: {
    changelogLabel: string;
  };
  gallery: {
    title: string;
    intro: string;
    items: HomeGalleryItem[];
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
    items: HomeLink[];
  };
  faq: {
    title: string;
    items: Array<{question: string; answer: string}>;
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
    workflow: {
      eyebrow: "How it works",
      title: "Your shape, turned into an editable puzzle",
      intro:
        "Start with a closed outline. JigsawDesigner generates the cutlines inside it and keeps the result editable in the same SVG project.",
      items: [
        {
          title: "Bring your outline",
          description:
            "Draw a closed shape or import an existing SVG, then check it on the canvas.",
        },
        {
          title: "Generate the cutlines",
          description:
            "Choose a built-in or custom slot shape, then adjust the grid, piece count, and spacing.",
        },
        {
          title: "Edit and export",
          description:
            "Refine paths and groups, save the project, and export SVG with Premium.",
        },
      ],
    },
    release: {
      changelogLabel: `Read the ${PRODUCT_FACTS.currentVersion} changelog`,
    },
    gallery: {
      title: "Inside JigsawDesigner",
      intro:
        "The canvas, editor settings, template editor, and project library as they appear in the app.",
      items: [
        {
          src: "/editor_overview-v1-6.webp",
          alt: "JigsawDesigner vector editor with a puzzle project open",
          caption: "Vector editor and canvas",
        },
        {
          src: "/canvas_workspace-v1-6.webp",
          alt: "A custom dragon outline on the JigsawDesigner canvas",
          caption: "Focused canvas workspace",
        },
        {
          src: "/advanced_settings-v1-6.webp",
          alt: "JigsawDesigner language, subscription, grid, ruler, snapping, and stroke settings",
          caption: "Editor settings",
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
    plans: {
      title: `Try ${PRODUCT_FACTS.freeGenerationLimit} generations free`,
      intro:
        "Premium adds unlimited puzzle generation and SVG export. Monthly and yearly plans are purchased through Apple.",
      freeName: "Free",
      freeSummary: "Explore puzzle generation before subscribing.",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} puzzle generations`],
      premiumName: "Premium",
      premiumSummary: "Choose an Apple monthly or yearly subscription.",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map(
        (entitlement) => premiumFeatureLabels.en[entitlement],
      ),
      storeNote: "The App Store shows the current price for your region.",
      pricingLabel: "View plan details",
    },
    explore: {
      title: "Guides",
      items: [
        {href: "/jigsaw-puzzle-generator", title: "Jigsaw puzzle generator"},
        {href: "/jigsaw-dieline-generator", title: "Jigsaw dieline generator"},
        {href: "/laser-cut-jigsaw-puzzle-svg", title: "Laser-cut SVG workflow"},
        {href: "/custom-jigsaw-puzzle-template", title: "Custom slot templates"},
        {href: "/svg-puzzle-editor", title: "SVG puzzle editor"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "Step-by-step SVG guide"},
      ],
    },
    faq: {
      title: "Common questions",
      items: [
        {question: "Can I start with my own shape?", answer: "Yes. Draw a closed boundary in the editor or import one from an SVG file, then generate the cutlines inside it."},
        {question: "Which file format can I export?", answer: "JigsawDesigner currently exports SVG. Export is included with an active Premium subscription."},
        {question: "What is included for free?", answer: `You can generate ${PRODUCT_FACTS.freeGenerationLimit} puzzles before subscribing. Premium adds unlimited generation and SVG export.`},
      ],
    },
  },
  "zh-Hans": {
    workflow: {
      eyebrow: "使用方式",
      title: "把你的轮廓变成可编辑拼图",
      intro: "从闭合轮廓开始。JigsawDesigner 会在轮廓内生成拼图切线，并让结果保留在同一个可编辑 SVG 项目中。",
      items: [
        {title: "导入或绘制轮廓", description: "绘制闭合形状或导入已有 SVG，然后在画布上检查。"},
        {title: "生成拼图切线", description: "选择内置或自定义卡槽形状，再调整网格、片数与间距。"},
        {title: "编辑并导出", description: "调整路径和分组、保存项目，并通过 Premium 导出 SVG。"},
      ],
    },
    release: {
      changelogLabel: `查看 ${PRODUCT_FACTS.currentVersion} 更新日志`,
    },
    gallery: {
      title: "JigsawDesigner 实际界面",
      intro: "查看应用中的画布、编辑器设置、模板编辑器和项目库。",
      items: [
        {src: "/editor_overview-v1-6.webp", alt: "打开拼图项目的 JigsawDesigner 矢量编辑器", caption: "矢量编辑器与画布"},
        {src: "/canvas_workspace-v1-6.webp", alt: "JigsawDesigner 画布上的自定义龙形轮廓", caption: "画布工作区"},
        {src: "/advanced_settings-v1-6.webp", alt: "JigsawDesigner 的语言、订阅、网格、标尺、吸附与描边设置", caption: "编辑器设置"},
        {src: "/template_editor-v1-6.webp", alt: "JigsawDesigner 模板编辑器中的自定义开放卡槽路径", caption: "自定义卡槽模板"},
        {src: "/my_projects-v1-6.webp", alt: "JigsawDesigner 项目库中的我的项目", caption: "可编辑项目库"},
      ],
    },
    plans: {
      title: `免费试用 ${PRODUCT_FACTS.freeGenerationLimit} 次生成`,
      intro: "Premium 提供无限拼图生成和 SVG 导出。月度和年度订阅均通过 Apple 购买。",
      freeName: "Free",
      freeSummary: "订阅前先体验拼图生成。",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼图生成`],
      premiumName: "Premium",
      premiumSummary: "可选择 Apple 月订阅或年订阅。",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map(
        (entitlement) => premiumFeatureLabels["zh-Hans"][entitlement],
      ),
      storeNote: "App Store 会显示你所在地区的当前价格。",
      pricingLabel: "查看方案详情",
    },
    explore: {
      title: "使用指南",
      items: [
        {href: "/jigsaw-puzzle-generator", title: "拼图生成器"},
        {href: "/jigsaw-dieline-generator", title: "拼图刀模生成器"},
        {href: "/laser-cut-jigsaw-puzzle-svg", title: "激光切割 SVG 工作流"},
        {href: "/custom-jigsaw-puzzle-template", title: "自定义卡槽模板"},
        {href: "/svg-puzzle-editor", title: "SVG 拼图编辑器"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "逐步 SVG 指南"},
      ],
    },
    faq: {
      title: "常见问题",
      items: [
        {question: "可以从自己的形状开始吗？", answer: "可以。你可以在编辑器中绘制闭合边界，或从 SVG 文件导入边界，再在其中生成拼图切线。"},
        {question: "可以导出什么文件格式？", answer: "JigsawDesigner 当前导出 SVG；有效 Premium 订阅包含 SVG 导出。"},
        {question: "免费版包含什么？", answer: `订阅前可生成 ${PRODUCT_FACTS.freeGenerationLimit} 次拼图。Premium 提供无限生成和 SVG 导出。`},
      ],
    },
  },
  "zh-Hant": {
    workflow: {
      eyebrow: "使用方式",
      title: "將你的輪廓變成可編輯拼圖",
      intro: "從封閉輪廓開始。JigsawDesigner 會在輪廓內產生拼圖切割線，並讓結果保留在同一個可編輯 SVG 專案中。",
      items: [
        {title: "匯入或繪製輪廓", description: "繪製封閉形狀或匯入現有 SVG，再於畫布上檢查。"},
        {title: "產生拼圖切割線", description: "選擇內建或自訂卡槽形狀，再調整網格、片數與間距。"},
        {title: "編輯並匯出", description: "調整路徑與群組、儲存專案，並透過 Premium 匯出 SVG。"},
      ],
    },
    release: {
      changelogLabel: `查看 ${PRODUCT_FACTS.currentVersion} 更新日誌`,
    },
    gallery: {
      title: "JigsawDesigner 實際介面",
      intro: "查看 App 中的畫布、編輯器設定、範本編輯器和專案庫。",
      items: [
        {src: "/editor_overview-v1-6.webp", alt: "開啟拼圖專案的 JigsawDesigner 向量編輯器", caption: "向量編輯器與畫布"},
        {src: "/canvas_workspace-v1-6.webp", alt: "JigsawDesigner 畫布上的自訂龍形輪廓", caption: "畫布工作區"},
        {src: "/advanced_settings-v1-6.webp", alt: "JigsawDesigner 的語言、訂閱、網格、尺規、貼齊與筆畫設定", caption: "編輯器設定"},
        {src: "/template_editor-v1-6.webp", alt: "JigsawDesigner 範本編輯器中的自訂開放卡槽路徑", caption: "自訂卡槽範本"},
        {src: "/my_projects-v1-6.webp", alt: "JigsawDesigner 專案庫中的我的專案", caption: "可編輯專案庫"},
      ],
    },
    plans: {
      title: `免費試用 ${PRODUCT_FACTS.freeGenerationLimit} 次產生`,
      intro: "Premium 提供無限拼圖產生和 SVG 匯出。月訂閱與年訂閱均透過 Apple 購買。",
      freeName: "Free",
      freeSummary: "訂閱前先體驗拼圖產生。",
      freeFeatures: [`${PRODUCT_FACTS.freeGenerationLimit} 次拼圖產生`],
      premiumName: "Premium",
      premiumSummary: "可選擇 Apple 月訂閱或年訂閱。",
      premiumFeatures: PRODUCT_FACTS.premiumEntitlements.map(
        (entitlement) => premiumFeatureLabels["zh-Hant"][entitlement],
      ),
      storeNote: "App Store 會顯示所在地區的目前價格。",
      pricingLabel: "查看方案詳情",
    },
    explore: {
      title: "使用指南",
      items: [
        {href: "/jigsaw-puzzle-generator", title: "拼圖產生器"},
        {href: "/jigsaw-dieline-generator", title: "拼圖刀模產生器"},
        {href: "/laser-cut-jigsaw-puzzle-svg", title: "雷射切割 SVG 工作流程"},
        {href: "/custom-jigsaw-puzzle-template", title: "自訂卡槽範本"},
        {href: "/svg-puzzle-editor", title: "SVG 拼圖編輯器"},
        {href: "/how-to-make-a-laser-cut-jigsaw-puzzle", title: "逐步 SVG 指南"},
      ],
    },
    faq: {
      title: "常見問題",
      items: [
        {question: "可以從自己的形狀開始嗎？", answer: "可以。你可以在編輯器中繪製封閉邊界，或從 SVG 檔案匯入邊界，再於其中產生拼圖切割線。"},
        {question: "可以匯出什麼檔案格式？", answer: "JigsawDesigner 目前匯出 SVG；有效 Premium 訂閱包含 SVG 匯出。"},
        {question: "免費版包含什麼？", answer: `訂閱前可產生 ${PRODUCT_FACTS.freeGenerationLimit} 次拼圖。Premium 提供無限產生和 SVG 匯出。`},
      ],
    },
  },
};
