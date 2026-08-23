import type {
  LearningEntry,
  MediaEvidence,
  ProjectExample,
  TierOneLocale,
} from "./types";

export type LearningStage = LearningEntry["stage"];

export type HubProjectExample = ProjectExample & {
  id: string;
  guideHref: string;
};

export type HubLearningEntry = LearningEntry & {
  id: string;
  media?: MediaEvidence;
};

type SharedHubLabels = {
  home: string;
  pageName: string;
  breadcrumbs: string;
  appStoreLabel: string;
  appStoreAria: string;
  source: string;
  openGuide: string;
};

export type ShowcasePageContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  evidenceTitle: string;
  evidencePoints: string[];
  projectsTitle: string;
  projectsIntro: string;
  labels: SharedHubLabels & {
    objective: string;
    device: string;
    template: string;
    editAction: string;
    process: string;
    limitationTitle: string;
    limitationBody: string;
    ctaTitle: string;
    ctaDescription: string;
  };
  projects: HubProjectExample[];
};

export type LearningPath = {
  id: LearningStage;
  number: string;
  title: string;
  description: string;
  outcome: string;
  entries: HubLearningEntry[];
};

export type LearnPageContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  startLabel: string;
  paths: LearningPath[];
  labels: SharedHubLabels & {
    outcome: string;
    difficulty: string;
    beginner: string;
    intermediate: string;
    duration: string;
    referenceTitle: string;
    referenceDescription: string;
    referenceLink: string;
    ctaTitle: string;
    ctaDescription: string;
  };
};

function appScreenshot({
  src,
  alt,
  caption,
  sourceLabel,
}: {
  src: MediaEvidence["src"];
  alt: string;
  caption: string;
  sourceLabel: string;
}): MediaEvidence {
  return {
    src,
    alt,
    caption,
    source: {
      kind: "app-screenshot",
      label: sourceLabel,
    },
  };
}

const sourceLabels: Record<TierOneLocale, string> = {
  en: "Product screenshot · JigsawDesigner 1.6.0 for Mac",
  "zh-Hans": "产品截图 · JigsawDesigner 1.6.0 Mac 版",
  "zh-Hant": "產品截圖 · JigsawDesigner 1.6.0 Mac 版",
};

export const showcasePages: Record<TierOneLocale, ShowcasePageContent> = {
  en: {
    seoTitle: "JigsawDesigner Project Showcase | Real In-App Examples",
    seoDescription:
      "Explore real JigsawDesigner 1.6.0 project screenshots showing custom boundaries, generated puzzle cutlines, SVG import, and editable vector results.",
    eyebrow: "Product-owned examples",
    title: "Three projects, from source geometry to editable result",
    intro:
      "These JigsawDesigner team examples were captured in JigsawDesigner 1.6.0 on Mac. Each one records the input, the in-app result, and the next vector edit.",
    evidenceTitle: "About these examples",
    evidencePoints: [
      "The screenshots are from JigsawDesigner 1.6.0 on Mac.",
      "Each example documents an actual editor state or project-library state.",
      "Physical production settings remain part of the downstream workflow.",
    ],
    projectsTitle: "Three working examples",
    projectsIntro:
      "The projects are deliberately different: a freeform boundary, a detailed silhouette with internal openings, and an imported SVG handoff. Together they show where generation ends and vector work continues.",
    labels: {
      home: "Home",
      pageName: "Showcase",
      breadcrumbs: "Breadcrumbs",
      appStoreLabel: "View on the App Store",
      appStoreAria: "View JigsawDesigner on the App Store",
      source: "Source",
      openGuide: "Open the related guide",
      objective: "Objective",
      device: "Captured on",
      template: "Template",
      editAction: "Next edit",
      process: "What happened",
      limitationTitle: "Continue validation downstream",
      limitationBody:
        "JigsawDesigner produces and edits SVG geometry. Material choice, kerf, power, speed, scale, and device safety remain part of the downstream cutting workflow. Physical samples will be added here only when source photos and process details can be verified.",
      ctaTitle: "Start with your own boundary",
      ctaDescription:
        "Create a project on iPhone, iPad, or Mac, then inspect the generated geometry before exporting SVG.",
    },
    projects: [
      {
        id: "irregular-boundary",
        guideHref: "/jigsaw-puzzle-generator",
        status: "published",
        title: "Irregular boundary to editable cutlines",
        objective:
          "Fill a closed, hand-shaped outline with a puzzle pattern while preserving its outer contour.",
        device: "Mac",
        template: "A custom concave slot profile selected from the Templates panel",
        editAction:
          "Select the generated group, inspect its bounds, and switch to point editing for local boundary adjustments.",
        steps: [
          "Prepare one closed outer boundary and choose the slot profile.",
          "Set the target density and generate the pattern.",
          "Keep the returned SVG group editable in Layers.",
        ],
        inputLabel: "Input",
        resultLabel: "Generated result",
        input: appScreenshot({
          src: "/generation-ready-v1-6.webp",
          alt: "An irregular closed boundary with a custom slot template selected and generation settings visible in JigsawDesigner",
          caption: "The boundary, selected profile, and generation controls before running the generator.",
          sourceLabel: sourceLabels.en,
        }),
        result: appScreenshot({
          src: "/generated-result-editable-v1-6.webp",
          alt: "Generated puzzle cutlines inside the irregular boundary, selected as an editable group in JigsawDesigner",
          caption: "The generated cutlines return to the document as a selectable SVG group.",
          sourceLabel: sourceLabels.en,
        }),
      },
      {
        id: "dragon-silhouette",
        guideHref: "/custom-jigsaw-puzzle-template",
        status: "published",
        title: "Detailed silhouette with internal openings",
        objective:
          "Generate a pattern across a complex dragon outline while retaining the smaller shapes inside it.",
        device: "Mac",
        template: "A custom slot profile shown as selected in the Templates panel",
        editAction:
          "Inspect narrow areas and internal openings, then adjust individual paths where the downstream workflow requires more clearance.",
        steps: [
          "Review the outer silhouette and its internal vector shapes.",
          "Choose the profile and tune the distance range.",
          "Generate, zoom in, and inspect intersections rather than assuming the first result is final.",
        ],
        inputLabel: "Input",
        resultLabel: "Generated result",
        input: appScreenshot({
          src: "/gen_step2-v1-6.webp",
          alt: "A detailed dragon-shaped vector boundary with multiple internal animal outlines before puzzle generation",
          caption: "The source geometry includes a complex outer silhouette and several internal openings.",
          sourceLabel: sourceLabels.en,
        }),
        result: appScreenshot({
          src: "/gen_step4-v1-6.webp",
          alt: "Puzzle cutlines generated across a detailed dragon silhouette in JigsawDesigner",
          caption: "The in-app result is ready for close inspection and vector refinement.",
          sourceLabel: sourceLabels.en,
        }),
      },
      {
        id: "svg-handoff",
        guideHref: "/help/svg-import-export",
        status: "published",
        title: "Imported SVG to an organized project",
        objective:
          "Open a layered SVG, verify that its visible composition arrived, and retain it alongside other editable projects.",
        device: "Mac",
        template: "Not used—this example documents SVG import and project organization",
        editAction:
          "Inspect the imported groups and scale before choosing or drawing a closed boundary for generation.",
        steps: [
          "Import the SVG into a project.",
          "Compare the visible artwork and inspect its groups in Layers.",
          "Save the project so the source artwork and generated studies remain easy to reopen.",
        ],
        inputLabel: "Opened SVG",
        resultLabel: "Project library",
        input: appScreenshot({
          src: "/svg-import-fidelity-v1-6.webp",
          alt: "A complex imported SVG selected in JigsawDesigner with its layer groups and dimensions visible",
          caption: "A real import check inside the editor; the artwork is evidence of app rendering, not a physical product.",
          sourceLabel: sourceLabels.en,
        }),
        result: appScreenshot({
          src: "/project-library-v1-6.webp",
          alt: "The JigsawDesigner project library containing several product-owned SVG and puzzle examples",
          caption: "The current project library keeps imported artwork and generated studies together.",
          sourceLabel: sourceLabels.en,
        }),
      },
    ],
  },
  "zh-Hans": {
    seoTitle: "JigsawDesigner 项目展示｜真实产品内示例",
    seoDescription:
      "查看 JigsawDesigner 1.6.0 的真实项目截图，了解自定义轮廓、拼图切割线生成、SVG 导入与矢量编辑结果。",
    eyebrow: "产品方自制示例",
    title: "三个项目，从源几何到可编辑结果",
    intro:
      "以下 JigsawDesigner 团队示例截取自 Mac 上的 JigsawDesigner 1.6.0。每组都记录输入、产品内结果与下一步矢量编辑。",
    evidenceTitle: "关于这些示例",
    evidencePoints: [
      "截图来自 Mac 上的 JigsawDesigner 1.6.0。",
      "每张图都对应真实的编辑器或项目库状态。",
      "下方图片不代表实体切割成品，也不构成设备适配保证。",
    ],
    projectsTitle: "三个工作示例",
    projectsIntro:
      "三个示例分别关注自由轮廓、带内部镂空的复杂图形，以及 SVG 导入衔接。它们共同说明：生成完成之后，矢量工作仍会继续。",
    labels: {
      home: "首页",
      pageName: "项目展示",
      breadcrumbs: "面包屑导航",
      appStoreLabel: "前往 App Store",
      appStoreAria: "在 App Store 查看 JigsawDesigner",
      source: "素材来源",
      openGuide: "打开相关指南",
      objective: "目标",
      device: "截图设备",
      template: "模板",
      editAction: "下一步编辑",
      process: "过程",
      limitationTitle: "继续完成下游验证",
      limitationBody:
        "JigsawDesigner 负责生成和编辑 SVG 几何。材料、切缝、功率、速度、实际尺寸与设备安全设置仍属于下游切割流程。只有在照片来源和制作过程可以验证后，实体样品才会加入这里。",
      ctaTitle: "从你自己的轮廓开始",
      ctaDescription:
        "在 iPhone、iPad 或 Mac 上创建项目，检查生成几何，再导出 SVG。",
    },
    projects: [
      {
        id: "irregular-boundary",
        guideHref: "/jigsaw-puzzle-generator",
        status: "published",
        title: "不规则轮廓到可编辑切割线",
        objective: "在保留外部轮廓的同时，为一个闭合的手绘形状生成拼图图案。",
        device: "Mac",
        template: "在模板面板中选中的自定义内凹卡槽轮廓",
        editAction: "选中生成分组，检查边界尺寸，并用点编辑对局部外轮廓继续调整。",
        steps: [
          "准备一个闭合外边界并选择卡槽轮廓。",
          "设置目标密度并生成拼图图案。",
          "让返回的 SVG 分组继续保留在图层中编辑。",
        ],
        inputLabel: "输入",
        resultLabel: "生成结果",
        input: appScreenshot({
          src: "/generation-ready-v1-6.webp",
          alt: "JigsawDesigner 中准备生成的不规则闭合边界，并显示所选自定义卡槽模板和生成设置",
          caption: "运行生成器前的边界、卡槽轮廓与生成参数。",
          sourceLabel: sourceLabels["zh-Hans"],
        }),
        result: appScreenshot({
          src: "/generated-result-editable-v1-6.webp",
          alt: "JigsawDesigner 中不规则边界内生成的拼图切割线，并作为可编辑分组选中",
          caption: "生成的切割线以可选择的 SVG 分组返回文档。",
          sourceLabel: sourceLabels["zh-Hans"],
        }),
      },
      {
        id: "dragon-silhouette",
        guideHref: "/custom-jigsaw-puzzle-template",
        status: "published",
        title: "带内部镂空的复杂龙形轮廓",
        objective: "在复杂龙形外轮廓中生成图案，同时保留内部的小型图形。",
        device: "Mac",
        template: "模板面板中已选中的自定义卡槽轮廓",
        editAction: "检查狭窄区域与内部镂空，并按下游流程需要调整单条路径的间距。",
        steps: [
          "检查外部轮廓与内部矢量图形。",
          "选择卡槽轮廓并调整距离范围。",
          "生成后放大检查交点，不把第一次结果直接当作最终文件。",
        ],
        inputLabel: "输入",
        resultLabel: "生成结果",
        input: appScreenshot({
          src: "/gen_step2-v1-6.webp",
          alt: "生成拼图前的复杂龙形矢量边界，其中包含多个内部动物轮廓",
          caption: "源几何同时包含复杂外轮廓与多个内部镂空。",
          sourceLabel: sourceLabels["zh-Hans"],
        }),
        result: appScreenshot({
          src: "/gen_step4-v1-6.webp",
          alt: "JigsawDesigner 中覆盖复杂龙形轮廓生成的拼图切割线",
          caption: "产品内结果还需要放大检查和矢量调整。",
          sourceLabel: sourceLabels["zh-Hans"],
        }),
      },
      {
        id: "svg-handoff",
        guideHref: "/help/svg-import-export",
        status: "published",
        title: "从导入 SVG 到项目整理",
        objective: "打开分层 SVG，确认可见构图已导入，并与其他可编辑项目一起保存。",
        device: "Mac",
        template: "未使用——本示例记录 SVG 导入和项目整理",
        editAction: "检查导入分组和尺寸，再选择或绘制一个闭合边界用于生成。",
        steps: [
          "把 SVG 导入项目。",
          "对照可见图稿，并在图层中检查分组。",
          "保存项目，方便重新打开源图稿和生成试验。",
        ],
        inputLabel: "已打开的 SVG",
        resultLabel: "项目库",
        input: appScreenshot({
          src: "/svg-import-fidelity-v1-6.webp",
          alt: "JigsawDesigner 中选中的复杂导入 SVG，并显示其图层分组与尺寸",
          caption: "在编辑器中检查导入图稿、图层结构与尺寸。",
          sourceLabel: sourceLabels["zh-Hans"],
        }),
        result: appScreenshot({
          src: "/project-library-v1-6.webp",
          alt: "包含多个产品方 SVG 与拼图示例的 JigsawDesigner 项目库",
          caption: "当前项目库把导入图稿和生成试验集中保存。",
          sourceLabel: sourceLabels["zh-Hans"],
        }),
      },
    ],
  },
  "zh-Hant": {
    seoTitle: "JigsawDesigner 專案展示｜真實產品內範例",
    seoDescription:
      "查看 JigsawDesigner 1.6.0 的真實專案截圖，瞭解自訂輪廓、拼圖切割線產生、SVG 匯入與向量編輯結果。",
    eyebrow: "產品方自製範例",
    title: "三個專案，從來源幾何到可編輯結果",
    intro:
      "以下 JigsawDesigner 團隊範例截取自 Mac 上的 JigsawDesigner 1.6.0。每組都記錄輸入、產品內結果與下一步向量編輯。",
    evidenceTitle: "關於這些範例",
    evidencePoints: [
      "截圖來自 Mac 上的 JigsawDesigner 1.6.0。",
      "每張圖都對應真實的編輯器或專案庫狀態。",
      "下方圖片不代表實體切割成品，也不構成裝置適配保證。",
    ],
    projectsTitle: "三個工作範例",
    projectsIntro:
      "三個範例分別關注自由輪廓、含內部鏤空的複雜圖形，以及 SVG 匯入銜接。它們共同說明：產生完成之後，向量工作仍會繼續。",
    labels: {
      home: "首頁",
      pageName: "專案展示",
      breadcrumbs: "麵包屑導覽",
      appStoreLabel: "前往 App Store",
      appStoreAria: "在 App Store 查看 JigsawDesigner",
      source: "素材來源",
      openGuide: "開啟相關指南",
      objective: "目標",
      device: "截圖裝置",
      template: "範本",
      editAction: "下一步編輯",
      process: "過程",
      limitationTitle: "繼續完成下游驗證",
      limitationBody:
        "JigsawDesigner 負責產生和編輯 SVG 幾何。材料、切縫、功率、速度、實際尺寸與裝置安全設定仍屬於下游切割流程。只有在照片來源與製作過程可以驗證後，實體樣品才會加入這裡。",
      ctaTitle: "從你自己的輪廓開始",
      ctaDescription:
        "在 iPhone、iPad 或 Mac 上建立專案，檢查產生幾何，再匯出 SVG。",
    },
    projects: [
      {
        id: "irregular-boundary",
        guideHref: "/jigsaw-puzzle-generator",
        status: "published",
        title: "不規則輪廓到可編輯切割線",
        objective: "在保留外部輪廓的同時，為一個封閉的手繪形狀產生拼圖圖案。",
        device: "Mac",
        template: "在範本面板中選取的自訂內凹卡槽輪廓",
        editAction: "選取產生群組，檢查邊界尺寸，並用節點編輯繼續調整局部外輪廓。",
        steps: [
          "準備一個封閉外邊界並選擇卡槽輪廓。",
          "設定目標密度並產生拼圖圖案。",
          "讓傳回的 SVG 群組繼續保留在圖層中編輯。",
        ],
        inputLabel: "輸入",
        resultLabel: "產生結果",
        input: appScreenshot({
          src: "/generation-ready-v1-6.webp",
          alt: "JigsawDesigner 中準備產生的不規則封閉邊界，並顯示所選自訂卡槽範本和產生設定",
          caption: "執行產生器前的邊界、卡槽輪廓與產生參數。",
          sourceLabel: sourceLabels["zh-Hant"],
        }),
        result: appScreenshot({
          src: "/generated-result-editable-v1-6.webp",
          alt: "JigsawDesigner 中不規則邊界內產生的拼圖切割線，並以可編輯群組選取",
          caption: "產生的切割線以可選取的 SVG 群組傳回文件。",
          sourceLabel: sourceLabels["zh-Hant"],
        }),
      },
      {
        id: "dragon-silhouette",
        guideHref: "/custom-jigsaw-puzzle-template",
        status: "published",
        title: "含內部鏤空的複雜龍形輪廓",
        objective: "在複雜龍形外輪廓中產生圖案，同時保留內部的小型圖形。",
        device: "Mac",
        template: "範本面板中已選取的自訂卡槽輪廓",
        editAction: "檢查狹窄區域與內部鏤空，並按下游流程需要調整單一路徑的間距。",
        steps: [
          "檢查外部輪廓與內部向量圖形。",
          "選擇卡槽輪廓並調整距離範圍。",
          "產生後放大檢查交點，不把第一次結果直接當作最終檔案。",
        ],
        inputLabel: "輸入",
        resultLabel: "產生結果",
        input: appScreenshot({
          src: "/gen_step2-v1-6.webp",
          alt: "產生拼圖前的複雜龍形向量邊界，其中包含多個內部動物輪廓",
          caption: "來源幾何同時包含複雜外輪廓與多個內部鏤空。",
          sourceLabel: sourceLabels["zh-Hant"],
        }),
        result: appScreenshot({
          src: "/gen_step4-v1-6.webp",
          alt: "JigsawDesigner 中覆蓋複雜龍形輪廓產生的拼圖切割線",
          caption: "產品內結果仍需要放大檢查和向量調整。",
          sourceLabel: sourceLabels["zh-Hant"],
        }),
      },
      {
        id: "svg-handoff",
        guideHref: "/help/svg-import-export",
        status: "published",
        title: "從匯入 SVG 到專案整理",
        objective: "開啟分層 SVG，確認可見構圖已匯入，並與其他可編輯專案一起儲存。",
        device: "Mac",
        template: "未使用——本範例記錄 SVG 匯入和專案整理",
        editAction: "檢查匯入群組和尺寸，再選擇或繪製一個封閉邊界用於產生。",
        steps: [
          "把 SVG 匯入專案。",
          "對照可見圖稿，並在圖層中檢查群組。",
          "儲存專案，方便重新開啟來源圖稿和產生試驗。",
        ],
        inputLabel: "已開啟的 SVG",
        resultLabel: "專案庫",
        input: appScreenshot({
          src: "/svg-import-fidelity-v1-6.webp",
          alt: "JigsawDesigner 中選取的複雜匯入 SVG，並顯示其圖層群組與尺寸",
          caption: "在編輯器中檢查匯入圖稿、圖層結構與尺寸。",
          sourceLabel: sourceLabels["zh-Hant"],
        }),
        result: appScreenshot({
          src: "/project-library-v1-6.webp",
          alt: "包含多個產品方 SVG 與拼圖範例的 JigsawDesigner 專案庫",
          caption: "目前專案庫把匯入圖稿和產生試驗集中儲存。",
          sourceLabel: sourceLabels["zh-Hant"],
        }),
      },
    ],
  },
};

export const learnPages: Record<TierOneLocale, LearnPageContent> = {
  en: {
    seoTitle: "Learn Jigsaw Cutlines, SVG Editing & Export | JigsawDesigner",
    seoDescription:
      "Follow three concise learning paths: understand puzzle cutlines, complete a boundary-to-SVG project, then edit and export the vector result.",
    eyebrow: "Learn by workflow",
    title: "From first boundary to a checked SVG",
    intro:
      "Choose the path that matches where you are now. The short product guides explain the geometry; the Help Center handles interface details; the making tutorial covers the downstream checks JigsawDesigner does not perform for you.",
    startLabel: "Choose a path",
    labels: {
      home: "Home",
      pageName: "Learn",
      breadcrumbs: "Breadcrumbs",
      appStoreLabel: "View on the App Store",
      appStoreAria: "View JigsawDesigner on the App Store",
      source: "Source",
      openGuide: "Open guide",
      outcome: "You will be ready to",
      difficulty: "Level",
      beginner: "Beginner",
      intermediate: "Intermediate",
      duration: "Reading time",
      referenceTitle: "Need a button-by-button reference?",
      referenceDescription:
        "The Help Center is organized by getting started, generation, SVG handoff, vector editing, templates, projects, shortcuts, and troubleshooting.",
      referenceLink: "Browse the Help Center",
      ctaTitle: "Learn with a project open",
      ctaDescription:
        "JigsawDesigner includes five free generations. Premium unlocks unlimited generation and SVG export through an Apple subscription.",
    },
    paths: [
      {
        id: "understand",
        number: "01",
        title: "Understand puzzle cutlines",
        description:
          "Start with the cut pattern: puzzle outline, piece-separation cutlines, interlock profile, and optional whimsy pieces. Then distinguish the design geometry from the SVG handoff.",
        outcome: "Recognize what the generator creates, what must be designed manually, and what remains a machine-specific decision.",
        entries: [
          {
            id: "cutline-primer",
            stage: "understand",
            title: "What a jigsaw dieline contains",
            description: "Distinguish the puzzle outline, piece-separation cutlines, interlock profile, optional whimsy pieces, and editable SVG output.",
            href: "/jigsaw-dieline-generator",
            difficulty: "beginner",
            duration: "6 min",
            media: appScreenshot({
              src: "/generated-result-editable-v1-6.webp",
              alt: "Generated puzzle cutlines selected as editable vector geometry in JigsawDesigner",
              caption: "Generated cutlines remain editable in the document.",
              sourceLabel: sourceLabels.en,
            }),
          },
          {
            id: "generator-overview",
            stage: "understand",
            title: "How boundary-to-cutline generation works",
            description: "See how a closed boundary, slot template, and generation settings become an SVG group.",
            href: "/jigsaw-puzzle-generator",
            difficulty: "beginner",
            duration: "7 min",
          },
        ],
      },
      {
        id: "make",
        number: "02",
        title: "Complete one project",
        description:
          "Prepare a boundary, choose a connection profile, generate, inspect, and move the SVG into a downstream making workflow.",
        outcome: "Finish a repeatable boundary-to-SVG workflow with an explicit inspection checklist.",
        entries: [
          {
            id: "making-tutorial",
            stage: "make",
            title: "Make a laser-cut jigsaw puzzle",
            description: "Follow the full handoff, including scale, line handling, material tests, and machine safety checks.",
            href: "/how-to-make-a-laser-cut-jigsaw-puzzle",
            difficulty: "beginner",
            duration: "12 min",
            media: appScreenshot({
              src: "/generation-ready-v1-6.webp",
              alt: "A closed boundary and puzzle generation controls ready for a complete JigsawDesigner workflow",
              caption: "A project ready for generation after its boundary, template, and values are reviewed.",
              sourceLabel: sourceLabels.en,
            }),
          },
          {
            id: "generation-reference",
            stage: "make",
            title: "Jigsaw generation reference",
            description: "Review supported inputs, parameters, result inspection, and common generation problems.",
            href: "/help/jigsaw-generation",
            difficulty: "intermediate",
            duration: "8 min",
          },
        ],
      },
      {
        id: "edit-export",
        number: "03",
        title: "Edit and export",
        description:
          "Treat the generated result as vector geometry: inspect groups, adjust points and transforms, then export SVG at the intended scale.",
        outcome: "Refine the result without mistaking the export for a finished machine setup.",
        entries: [
          {
            id: "vector-editor",
            stage: "edit-export",
            title: "Edit generated SVG geometry",
            description: "Use selection, point editing, layers, grouping, resize, and rotation to refine a result.",
            href: "/svg-puzzle-editor",
            difficulty: "intermediate",
            duration: "8 min",
            media: appScreenshot({
              src: "/vector-point-edit-v1-6.webp",
              alt: "Boundary points selected for vector editing around generated puzzle cutlines in JigsawDesigner",
              caption: "The outer path can be inspected and adjusted point by point.",
              sourceLabel: sourceLabels.en,
            }),
          },
          {
            id: "svg-handoff-reference",
            stage: "edit-export",
            title: "SVG import and export reference",
            description: "Check the current SVG-only handoff and what to verify in downstream software.",
            href: "/help/svg-import-export",
            difficulty: "intermediate",
            duration: "6 min",
          },
        ],
      },
    ],
  },
  "zh-Hans": {
    seoTitle: "学习拼图切割线、SVG 编辑与导出｜JigsawDesigner",
    seoDescription: "沿着三条简洁路径学习：理解拼图切割线，完成轮廓到 SVG 的项目，再编辑并导出矢量结果。",
    eyebrow: "按工作流学习",
    title: "从第一个轮廓，到经过检查的 SVG",
    intro:
      "从与你当前进度相符的路径开始。简短产品指南解释几何原理，帮助中心回答界面细节，制作教程则覆盖 JigsawDesigner 不会替你完成的下游检查。",
    startLabel: "选择学习路径",
    labels: {
      home: "首页",
      pageName: "学习",
      breadcrumbs: "面包屑导航",
      appStoreLabel: "前往 App Store",
      appStoreAria: "在 App Store 查看 JigsawDesigner",
      source: "素材来源",
      openGuide: "打开指南",
      outcome: "完成后你可以",
      difficulty: "难度",
      beginner: "入门",
      intermediate: "进阶",
      duration: "阅读时间",
      referenceTitle: "需要逐项查看界面操作？",
      referenceDescription: "帮助中心按开始、生成、SVG 衔接、矢量编辑、模板、项目、快捷键与故障排查分类。",
      referenceLink: "浏览帮助中心",
      ctaTitle: "打开项目，边做边学",
      ctaDescription: "JigsawDesigner 提供 5 次免费生成；Premium 通过 Apple 订阅解锁无限生成和 SVG 导出。",
    },
    paths: [
      {
        id: "understand",
        number: "01",
        title: "理解拼图切割线",
        description: "从切割图入手：拼图外轮廓、分片切割线、互锁轮廓和可选的 Whimsy 具象异形片，再区分设计几何与 SVG 衔接文件。",
        outcome: "分清生成器自动创建的内容、需要手工设计的内容，以及仍需按设备决定的设置。",
        entries: [
          {
            id: "cutline-primer",
            stage: "understand",
            title: "拼图刀模包含什么",
            description: "区分拼图外轮廓、分片切割线、互锁轮廓、可选的 Whimsy 具象异形片与可编辑 SVG 输出。",
            href: "/jigsaw-dieline-generator",
            difficulty: "beginner",
            duration: "6 分钟",
            media: appScreenshot({
              src: "/generated-result-editable-v1-6.webp",
              alt: "JigsawDesigner 中作为可编辑矢量几何选中的拼图切割线",
              caption: "生成的切割线仍可在文档中继续编辑。",
              sourceLabel: sourceLabels["zh-Hans"],
            }),
          },
          {id: "generator-overview", stage: "understand", title: "轮廓如何变成切割线", description: "了解闭合边界、卡槽模板与生成设置如何成为 SVG 分组。", href: "/jigsaw-puzzle-generator", difficulty: "beginner", duration: "7 分钟"},
        ],
      },
      {
        id: "make",
        number: "02",
        title: "完成一个项目",
        description: "准备边界、选择连接轮廓、生成并检查，再把 SVG 交给下游制作流程。",
        outcome: "完成一套可重复的轮廓到 SVG 流程，并使用明确的检查清单。",
        entries: [
          {
            id: "making-tutorial",
            stage: "make",
            title: "制作激光切割拼图",
            description: "完成完整衔接，包括尺寸、线条处理、材料测试与设备安全检查。",
            href: "/how-to-make-a-laser-cut-jigsaw-puzzle",
            difficulty: "beginner",
            duration: "12 分钟",
            media: appScreenshot({
              src: "/generation-ready-v1-6.webp",
              alt: "准备完成 JigsawDesigner 工作流的闭合边界与拼图生成设置",
              caption: "检查边界、模板和参数后，项目已可开始生成。",
              sourceLabel: sourceLabels["zh-Hans"],
            }),
          },
          {id: "generation-reference", stage: "make", title: "拼图生成参考", description: "查看支持的输入、参数、结果检查与常见生成问题。", href: "/help/jigsaw-generation", difficulty: "intermediate", duration: "8 分钟"},
        ],
      },
      {
        id: "edit-export",
        number: "03",
        title: "编辑并导出",
        description: "把生成结果当作矢量几何：检查分组、调整节点和变换，再按所需尺寸导出 SVG。",
        outcome: "继续调整结果，同时不把导出文件误认为已完成的设备设置。",
        entries: [
          {
            id: "vector-editor",
            stage: "edit-export",
            title: "编辑生成的 SVG 几何",
            description: "使用选择、点编辑、图层、分组、缩放和旋转调整结果。",
            href: "/svg-puzzle-editor",
            difficulty: "intermediate",
            duration: "8 分钟",
            media: appScreenshot({
              src: "/vector-point-edit-v1-6.webp",
              alt: "JigsawDesigner 中围绕拼图切割线选中并进行矢量编辑的边界节点",
              caption: "外部路径可以逐点检查和调整。",
              sourceLabel: sourceLabels["zh-Hans"],
            }),
          },
          {id: "svg-handoff-reference", stage: "edit-export", title: "SVG 导入导出参考", description: "确认当前仅支持 SVG 的衔接方式，以及下游软件中需要检查的内容。", href: "/help/svg-import-export", difficulty: "intermediate", duration: "6 分钟"},
        ],
      },
    ],
  },
  "zh-Hant": {
    seoTitle: "學習拼圖切割線、SVG 編輯與匯出｜JigsawDesigner",
    seoDescription: "沿著三條簡潔路徑學習：理解拼圖切割線，完成輪廓到 SVG 的專案，再編輯並匯出向量結果。",
    eyebrow: "按工作流程學習",
    title: "從第一個輪廓，到經過檢查的 SVG",
    intro:
      "從與目前進度相符的路徑開始。簡短產品指南解釋幾何原理，說明中心回答介面細節，製作教學則涵蓋 JigsawDesigner 不會替你完成的下游檢查。",
    startLabel: "選擇學習路徑",
    labels: {
      home: "首頁",
      pageName: "學習",
      breadcrumbs: "麵包屑導覽",
      appStoreLabel: "前往 App Store",
      appStoreAria: "在 App Store 查看 JigsawDesigner",
      source: "素材來源",
      openGuide: "開啟指南",
      outcome: "完成後你可以",
      difficulty: "難度",
      beginner: "入門",
      intermediate: "進階",
      duration: "閱讀時間",
      referenceTitle: "需要逐項查看介面操作？",
      referenceDescription: "說明中心按開始、產生、SVG 銜接、向量編輯、範本、專案、快速鍵與疑難排解分類。",
      referenceLink: "瀏覽說明中心",
      ctaTitle: "開啟專案，邊做邊學",
      ctaDescription: "JigsawDesigner 提供 5 次免費產生；Premium 透過 Apple 訂閱解鎖無限產生和 SVG 匯出。",
    },
    paths: [
      {
        id: "understand",
        number: "01",
        title: "理解拼圖切割線",
        description: "從切割圖入手：拼圖外輪廓、分片切割線、互鎖輪廓和可選的 Whimsy 具象異形片，再區分設計幾何與 SVG 銜接檔案。",
        outcome: "分清產生器自動建立的內容、需要手動設計的內容，以及仍需按裝置決定的設定。",
        entries: [
          {
            id: "cutline-primer",
            stage: "understand",
            title: "拼圖刀模包含什麼",
            description: "區分拼圖外輪廓、分片切割線、互鎖輪廓、可選的 Whimsy 具象異形片與可編輯 SVG 輸出。",
            href: "/jigsaw-dieline-generator",
            difficulty: "beginner",
            duration: "6 分鐘",
            media: appScreenshot({
              src: "/generated-result-editable-v1-6.webp",
              alt: "JigsawDesigner 中以可編輯向量幾何選取的拼圖切割線",
              caption: "產生的切割線仍可在文件中繼續編輯。",
              sourceLabel: sourceLabels["zh-Hant"],
            }),
          },
          {id: "generator-overview", stage: "understand", title: "輪廓如何變成切割線", description: "瞭解封閉邊界、卡槽範本與產生設定如何成為 SVG 群組。", href: "/jigsaw-puzzle-generator", difficulty: "beginner", duration: "7 分鐘"},
        ],
      },
      {
        id: "make",
        number: "02",
        title: "完成一個專案",
        description: "準備邊界、選擇連接輪廓、產生並檢查，再把 SVG 交給下游製作流程。",
        outcome: "完成一套可重複的輪廓到 SVG 流程，並使用明確的檢查清單。",
        entries: [
          {
            id: "making-tutorial",
            stage: "make",
            title: "製作雷射切割拼圖",
            description: "完成完整銜接，包括尺寸、線條處理、材料測試與裝置安全檢查。",
            href: "/how-to-make-a-laser-cut-jigsaw-puzzle",
            difficulty: "beginner",
            duration: "12 分鐘",
            media: appScreenshot({
              src: "/generation-ready-v1-6.webp",
              alt: "準備完成 JigsawDesigner 工作流程的封閉邊界與拼圖產生設定",
              caption: "檢查邊界、範本和參數後，專案已可開始產生。",
              sourceLabel: sourceLabels["zh-Hant"],
            }),
          },
          {id: "generation-reference", stage: "make", title: "拼圖產生參考", description: "查看支援的輸入、參數、結果檢查與常見產生問題。", href: "/help/jigsaw-generation", difficulty: "intermediate", duration: "8 分鐘"},
        ],
      },
      {
        id: "edit-export",
        number: "03",
        title: "編輯並匯出",
        description: "把產生結果當作向量幾何：檢查群組、調整節點和變形，再按所需尺寸匯出 SVG。",
        outcome: "繼續調整結果，同時不把匯出檔案誤認為已完成的裝置設定。",
        entries: [
          {
            id: "vector-editor",
            stage: "edit-export",
            title: "編輯產生的 SVG 幾何",
            description: "使用選取、節點編輯、圖層、群組、縮放和旋轉調整結果。",
            href: "/svg-puzzle-editor",
            difficulty: "intermediate",
            duration: "8 分鐘",
            media: appScreenshot({
              src: "/vector-point-edit-v1-6.webp",
              alt: "JigsawDesigner 中圍繞拼圖切割線選取並進行向量編輯的邊界節點",
              caption: "外部路徑可以逐點檢查和調整。",
              sourceLabel: sourceLabels["zh-Hant"],
            }),
          },
          {id: "svg-handoff-reference", stage: "edit-export", title: "SVG 匯入匯出參考", description: "確認目前僅支援 SVG 的銜接方式，以及下游軟體中需要檢查的內容。", href: "/help/svg-import-export", difficulty: "intermediate", duration: "6 分鐘"},
        ],
      },
    ],
  },
};

export function getShowcasePage(locale: string): ShowcasePageContent | undefined {
  return showcasePages[locale as TierOneLocale];
}

export function getLearnPage(locale: string): LearnPageContent | undefined {
  return learnPages[locale as TierOneLocale];
}
