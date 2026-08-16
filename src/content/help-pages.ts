import {PRODUCT_FACTS} from "@/config/product";

import {
  commonLabels,
  type ArticleContent,
  type RelatedLink,
  type TierOneLocale,
} from "./types";

export const helpSlugs = [
  "getting-started",
  "jigsaw-generation",
  "svg-import-export",
  "vector-editing",
  "templates",
  "project-library",
  "keyboard-shortcuts",
  "troubleshooting",
] as const;

export type HelpSlug = (typeof helpSlugs)[number];

type ArticleSeed = Omit<ArticleContent, "labels">;

function article(locale: TierOneLocale, seed: ArticleSeed): ArticleContent {
  return {...seed, schemaType: "TechArticle", labels: commonLabels[locale]};
}

const titles: Record<TierOneLocale, Record<HelpSlug, string>> = {
  en: {
    "getting-started": "Getting started",
    "jigsaw-generation": "Jigsaw generation",
    "svg-import-export": "SVG import and export",
    "vector-editing": "Vector editing",
    templates: "Slot templates",
    "project-library": "Project library",
    "keyboard-shortcuts": "Keyboard shortcuts",
    troubleshooting: "Troubleshooting",
  },
  "zh-Hans": {
    "getting-started": "快速开始",
    "jigsaw-generation": "拼图生成",
    "svg-import-export": "SVG 导入与导出",
    "vector-editing": "矢量编辑",
    templates: "卡槽模板",
    "project-library": "项目库",
    "keyboard-shortcuts": "键盘快捷键",
    troubleshooting: "故障排查",
  },
  "zh-Hant": {
    "getting-started": "快速開始",
    "jigsaw-generation": "拼圖產生",
    "svg-import-export": "SVG 匯入與匯出",
    "vector-editing": "向量編輯",
    templates: "卡槽範本",
    "project-library": "專案庫",
    "keyboard-shortcuts": "鍵盤快速鍵",
    troubleshooting: "疑難排解",
  },
};

function related(locale: TierOneLocale, slugs: HelpSlug[]): RelatedLink[] {
  const description = {
    en: "Open this focused JigsawDesigner guide.",
    "zh-Hans": "打开这篇 JigsawDesigner 专题指南。",
    "zh-Hant": "開啟這篇 JigsawDesigner 專題指南。",
  }[locale];

  return slugs.map((slug) => ({
    href: `/help/${slug}`,
    title: titles[locale][slug],
    description,
  }));
}

const pages: Record<HelpSlug, Record<TierOneLocale, ArticleContent>> = {
  "getting-started": {
    en: article("en", {
      slug: "help/getting-started", eyebrow: "JigsawDesigner Help", title: "Getting Started with JigsawDesigner", seoTitle: "Getting Started with JigsawDesigner", seoDescription: "Create a project, draw or import SVG geometry, generate puzzle cutlines, save your editable project, and export SVG.", intro: "Follow this short path from a blank project to an editable puzzle document. The interface adapts to iPhone, iPad, and Mac, while the same project model keeps SVG geometry, templates, and settings together.", leadImage: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner Project Library with editable local puzzle projects", caption: "Create or reopen a project from the library."}, highlights: ["Create a local project", "Draw with eight editor tools", "Import existing SVG geometry", "Generate and export SVG cutlines"],
      sections: [
        {id: "create-project", title: "1. Create a project", paragraphs: ["Open the Project Library and choose New Project. A new project starts with an 800 × 600 canvas, a target of 100 pieces, and the built-in slot templates. You can change these settings before generation."], image: {src: "/project-library-v1-6.webp", alt: "Creating a project from the JigsawDesigner Project Library"}},
        {id: "add-geometry", title: "2. Draw or import geometry", paragraphs: ["Choose Select, Point Edit, Pencil, Line, Rectangle, Circle, Polygon, or Bezier from the editor. To reuse an existing boundary, import an SVG and inspect it on the canvas and in Layers."], image: {src: "/toolbar-v1-6.webp", alt: "JigsawDesigner drawing toolbar"}},
        {id: "generate-save-export", title: "3. Generate, save, and export", paragraphs: ["Select a suitable boundary and slot template, configure generation parameters, and run Generate Jigsaw. Inspect the returned SVG group, save the .jigsawproject source document, and export SVG when ready."], note: `The current app exports SVG only. Free users receive ${PRODUCT_FACTS.freeGenerationLimit} generations; Premium unlocks unlimited generation and SVG export.`, image: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected as an editable group in JigsawDesigner", caption: "Generated cutlines return to Layers as an editable group."}},
      ],
      related: related("en", ["jigsaw-generation", "vector-editing", "project-library"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/getting-started", eyebrow: "JigsawDesigner 帮助", title: "JigsawDesigner 快速开始", seoTitle: "JigsawDesigner 快速开始", seoDescription: "创建项目、绘制或导入 SVG、生成拼图切割线、保存可编辑项目并导出 SVG。", intro: "按照这条简短路径，从空白项目开始建立可编辑的拼图文档。界面适配 iPhone、iPad 和 Mac，项目会把 SVG 几何、模板与设置保存在一起。", leadImage: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner 项目库中的本地可编辑拼图项目", caption: "从项目库创建或重新打开项目。"}, highlights: ["创建本地项目", "使用八种编辑工具", "导入已有 SVG 几何", "生成并导出 SVG 切割线"],
      sections: [
        {id: "create-project", title: "1. 创建项目", paragraphs: ["在项目库中选择新建项目。新项目默认使用 800 × 600 画布、100 片目标和内置卡槽模板，生成前可调整。"], image: {src: "/project-library-v1-6.webp", alt: "从 JigsawDesigner 项目库创建项目"}},
        {id: "add-geometry", title: "2. 绘制或导入几何", paragraphs: ["从编辑器选择 Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon 或 Bezier。若已有边界，可导入 SVG，并在画布和图层中检查。"], image: {src: "/toolbar-v1-6.webp", alt: "JigsawDesigner 绘图工具栏"}},
        {id: "generate-save-export", title: "3. 生成、保存并导出", paragraphs: ["选择边界和卡槽模板，设置生成参数并运行生成。检查返回的 SVG 分组，保存 .jigsawproject 源文档，需要时导出 SVG。"], note: `当前只导出 SVG。免费用户有 ${PRODUCT_FACTS.freeGenerationLimit} 次生成；Premium 解锁无限生成与 SVG 导出。`, image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中作为可编辑分组选中的拼图切割线", caption: "生成的切割线以可编辑分组返回图层。"}},
      ],
      related: related("zh-Hans", ["jigsaw-generation", "vector-editing", "project-library"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/getting-started", eyebrow: "JigsawDesigner 說明", title: "JigsawDesigner 快速開始", seoTitle: "JigsawDesigner 快速開始", seoDescription: "建立專案、繪製或匯入 SVG、產生拼圖切割線、儲存可編輯專案並匯出 SVG。", intro: "依照這條簡短路徑，從空白專案建立可編輯的拼圖文件。介面支援 iPhone、iPad 與 Mac，專案會將 SVG 幾何、範本與設定儲存在一起。", leadImage: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner 專案庫中的本機可編輯拼圖專案", caption: "從專案庫建立或重新開啟專案。"}, highlights: ["建立本機專案", "使用八種編輯工具", "匯入現有 SVG 幾何", "產生並匯出 SVG 切割線"],
      sections: [
        {id: "create-project", title: "1. 建立專案", paragraphs: ["在專案庫選擇新增專案。新專案預設使用 800 × 600 畫布、100 片目標與內建卡槽範本，產生前可調整。"], image: {src: "/project-library-v1-6.webp", alt: "從 JigsawDesigner 專案庫建立專案"}},
        {id: "add-geometry", title: "2. 繪製或匯入幾何", paragraphs: ["從編輯器選擇 Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon 或 Bezier。若已有邊界，可匯入 SVG，並於畫布與圖層中檢查。"], image: {src: "/toolbar-v1-6.webp", alt: "JigsawDesigner 繪圖工具列"}},
        {id: "generate-save-export", title: "3. 產生、儲存並匯出", paragraphs: ["選擇邊界與卡槽範本，設定產生參數並執行。檢查回傳的 SVG 群組，儲存 .jigsawproject 來源文件，需要時匯出 SVG。"], note: `目前只匯出 SVG。免費使用者有 ${PRODUCT_FACTS.freeGenerationLimit} 次產生；Premium 解鎖無限產生與 SVG 匯出。`, image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中以可編輯群組選取的拼圖切割線", caption: "產生的切割線以可編輯群組回到圖層。"}},
      ],
      related: related("zh-Hant", ["jigsaw-generation", "vector-editing", "project-library"]),
    }),
  },

  "jigsaw-generation": {
    en: article("en", {
      slug: "help/jigsaw-generation", eyebrow: "JigsawDesigner Help", title: "Generate Jigsaw Puzzle Cutlines", seoTitle: "How to Generate Jigsaw Puzzle Cutlines", seoDescription: "Choose a closed boundary and slot template, set grid, target piece count, and distance parameters, then inspect the generated SVG.", intro: "Jigsaw generation combines your vector boundary, a slot-template path, and project parameters in the native C++ engine. The resulting SVG is imported back into the editor as a group.", leadImage: {src: "/generation-ready-v1-6.webp", alt: "A closed puzzle boundary, selected slot template, and generation values ready in JigsawDesigner", caption: "Review the boundary, slot template, and Project Info values before generation."}, highlights: ["Closed vector boundary", "Built-in or custom slot path", "Grid and target piece controls", "Editable generated SVG group"],
      sections: [
        {id: "input-geometry", title: "Prepare the input geometry", paragraphs: ["Use a closed outer boundary for the puzzle area. Keep the intended boundary visible and unlocked, and remove geometry that should not participate in generation."]},
        {id: "template", title: "Choose a slot template", paragraphs: ["Select a built-in or custom slot template in the Templates panel. The highlighted template supplies the connection profile used for generation."], image: {src: "/gen_step2-v1-6.webp", alt: "Selecting a jigsaw slot template"}},
        {id: "parameters", title: "Set generation values and start", paragraphs: ["In Project Info, set grid size, target piece count, minimum slot distance, and maximum slot distance. Review the selected template and values, then choose Generate Jigsaw."], image: {src: "/generation-ready-v1-6.webp", alt: "A closed puzzle boundary, selected slot template, and generation values ready in JigsawDesigner", caption: "Review the boundary, slot template, and Project Info values before generation."}},
        {id: "run-and-inspect", title: "Run generation and inspect the SVG", paragraphs: ["Choose Generate Jigsaw and wait for the progress operation to finish. The generated SVG returns as a named group. Zoom into boundaries and connections, inspect Layers, and repeat with adjusted inputs if needed."], image: {src: "/generated-result-editable-v1-6.webp", alt: "Generated jigsaw cutlines selected as an editable group in JigsawDesigner", caption: "Generated cutlines return to Layers as an editable group."}},
      ],
      faq: [{question: "Why does generation fail?", answer: "Start by confirming that the boundary is a valid closed path, the slot template is valid, and the requested density is reasonable for the contour."}, {question: "Will the output always contain the exact target number of pieces?", answer: "Treat piece count as a target input and inspect the generated result."}],
      related: related("en", ["templates", "troubleshooting", "svg-import-export"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/jigsaw-generation", eyebrow: "JigsawDesigner 帮助", title: "生成拼图切割线", seoTitle: "如何生成拼图切割线", seoDescription: "选择闭合边界和卡槽模板，设置网格、目标片数与距离参数，再检查生成的 SVG。", intro: "拼图生成会把矢量边界、卡槽模板路径和项目参数交给原生 C++ 引擎，结果以 SVG 分组回到编辑器。", leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已准备好的闭合拼图边界、所选卡槽模板和生成参数", caption: "生成前检查边界、卡槽模板和项目信息中的参数。"}, highlights: ["闭合矢量边界", "内置或自定义卡槽路径", "网格与目标片数控制", "可编辑的 SVG 结果分组"],
      sections: [
        {id: "input-geometry", title: "准备输入几何", paragraphs: ["使用闭合外边界定义拼图区域。保持目标边界可见且未锁定，并移除不应参与生成的几何。"]},
        {id: "template", title: "选择卡槽模板", paragraphs: ["在模板面板中选择内置或自定义卡槽模板。当前高亮的模板会作为连接轮廓传给生成器。"], image: {src: "/gen_step2-v1-6.webp", alt: "选择拼图卡槽模板"}},
        {id: "parameters", title: "设置生成参数并开始", paragraphs: ["在项目信息中设置网格大小、目标片数、最小和最大卡槽距离。确认所选模板和参数后，选择生成拼图。"], image: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已准备好的闭合拼图边界、所选卡槽模板和生成参数", caption: "生成前检查边界、卡槽模板和项目信息中的参数。"}},
        {id: "run-and-inspect", title: "运行生成并检查 SVG", paragraphs: ["运行生成并等待进度完成。生成结果会作为命名分组返回。放大检查边界和连接，查看图层，必要时调整输入后重试。"], image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中作为可编辑分组选中的拼图切割线", caption: "生成的切割线以可编辑分组返回图层。"}},
      ],
      faq: [{question: "生成失败怎么办？", answer: "先确认边界是有效闭合路径、卡槽模板有效，且目标密度适合当前轮廓。"}, {question: "是否一定得到精确目标片数？", answer: "应把片数视为目标输入，并检查实际生成结果。"}],
      related: related("zh-Hans", ["templates", "troubleshooting", "svg-import-export"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/jigsaw-generation", eyebrow: "JigsawDesigner 說明", title: "產生拼圖切割線", seoTitle: "如何產生拼圖切割線", seoDescription: "選擇封閉邊界與卡槽範本，設定網格、目標片數與距離參數，再檢查產生的 SVG。", intro: "拼圖產生會把向量邊界、卡槽範本路徑與專案參數交給原生 C++ 引擎，結果以 SVG 群組回到編輯器。", leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已準備好的封閉拼圖邊界、所選卡槽範本與產生參數", caption: "產生前檢查邊界、卡槽範本與專案資訊中的參數。"}, highlights: ["封閉向量邊界", "內建或自訂卡槽路徑", "網格與目標片數控制", "可編輯的 SVG 結果群組"],
      sections: [
        {id: "input-geometry", title: "準備輸入幾何", paragraphs: ["使用封閉外邊界定義拼圖區域。保持目標邊界可見且未鎖定，並移除不應參與產生的幾何。"]},
        {id: "template", title: "選擇卡槽範本", paragraphs: ["在範本面板中選擇內建或自訂卡槽範本。目前反白的範本會作為連接輪廓交給產生器。"], image: {src: "/gen_step2-v1-6.webp", alt: "選擇拼圖卡槽範本"}},
        {id: "parameters", title: "設定產生參數並開始", paragraphs: ["在專案資訊中設定網格大小、目標片數、最小與最大卡槽距離。確認所選範本和參數後，選擇產生拼圖。"], image: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中已準備好的封閉拼圖邊界、所選卡槽範本與產生參數", caption: "產生前檢查邊界、卡槽範本與專案資訊中的參數。"}},
        {id: "run-and-inspect", title: "執行產生並檢查 SVG", paragraphs: ["執行產生並等待進度完成。結果會以命名群組回傳。放大檢查邊界與連接、查看圖層，必要時調整輸入後重試。"], image: {src: "/generated-result-editable-v1-6.webp", alt: "JigsawDesigner 中以可編輯群組選取的拼圖切割線", caption: "產生的切割線以可編輯群組回到圖層。"}},
      ],
      faq: [{question: "產生失敗怎麼辦？", answer: "先確認邊界為有效封閉路徑、卡槽範本有效，且目標密度適合目前輪廓。"}, {question: "是否一定得到精確目標片數？", answer: "應將片數視為目標輸入，並檢查實際產生結果。"}],
      related: related("zh-Hant", ["templates", "troubleshooting", "svg-import-export"]),
    }),
  },

  "svg-import-export": {
    en: article("en", {
      slug: "help/svg-import-export", eyebrow: "JigsawDesigner Help", title: "Import and Export SVG Files", seoTitle: "JigsawDesigner SVG Import and Export Guide", seoDescription: "Import common SVG geometry and embedded resources, keep projects editable, and export a portable SVG document from JigsawDesigner.", intro: "SVG is the interchange format for bringing vector geometry into JigsawDesigner and taking finished geometry into another workflow. The editable .jigsawproject package is a separate source format for preserving project state and assets.", leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner with its Layers hierarchy and Shape Info visible", caption: "Inspect imported artwork on the canvas, in Layers, and in Shape Info."}, highlights: ["Import common SVG shapes and groups", "Preserve embedded images and paint resources", "Save editable .jigsawproject packages", "Export SVG only"],
      sections: [
        {id: "import", title: "Import SVG into the current project", paragraphs: ["Use Import SVG and choose a file. Common paths, shapes, text, images, groups, transforms, clip paths, and use references can be parsed into the document. Inspect the result because complex SVG features can vary."], note: "Remote HTTP images are blocked, as are script and foreignObject content. Embed required images instead of relying on a remote URL.", image: {src: "/svg-import-fidelity-v1-6.webp", alt: "Imported SVG artwork selected in JigsawDesigner with its Layers hierarchy and Shape Info visible", caption: "Inspect imported artwork on the canvas, in Layers, and in Shape Info."}},
        {id: "project-package", title: "Save the editable source project", paragraphs: ["A .jigsawproject package stores project.json, document.svg, and content-addressed assets. Use it when you want to reopen the complete editable project, including settings and embedded image data."]},
        {id: "export", title: "Export a portable SVG", paragraphs: ["Use Export SVG to write the current document as SVG. The export includes document geometry, groups, transforms, and preserved resources supported by the writer."], note: "SVG is the current and only export format.", image: {src: "/generation-export-settings-v1-6.webp", alt: "Advanced Settings showing SVG as the default export format in JigsawDesigner", caption: "Advanced Settings confirms SVG as the current export format; use Export SVG in the editor to write the document."}},
      ],
      faq: [{question: "Can I import an SVG that references an online image?", answer: "The app does not fetch remote HTTP images. Embed the image or use a local supported resource."}, {question: "What should I use for later editing?", answer: "Keep the .jigsawproject package as the editable source and use SVG for interchange."}],
      related: related("en", ["vector-editing", "project-library", "troubleshooting"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/svg-import-export", eyebrow: "JigsawDesigner 帮助", title: "导入与导出 SVG 文件", seoTitle: "JigsawDesigner SVG 导入与导出指南", seoDescription: "导入常见 SVG 几何与嵌入资源，保留可编辑项目，并从 JigsawDesigner 导出 SVG 文档。", intro: "SVG 用于把矢量几何带入 JigsawDesigner，或把完成的几何交给其他工作流。可编辑的 .jigsawproject 是另一种源项目格式，用于保留状态与资源。", leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "在画布、图层和形状信息中检查导入图稿。"}, highlights: ["导入常见 SVG 形状与分组", "保留嵌入图片和绘制资源", "保存可编辑 .jigsawproject", "仅导出 SVG"],
      sections: [
        {id: "import", title: "把 SVG 导入当前项目", paragraphs: ["使用导入 SVG 选择文件。常见路径、形状、文本、图片、分组、变换、裁剪路径和 use 引用可解析进文档；复杂 SVG 仍应检查结果。"], note: "远程 HTTP 图片、script 和 foreignObject 会被阻止。请嵌入必要图片，不要依赖远程 URL。", image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中选中的导入 SVG 图稿及其图层层级和形状信息", caption: "在画布、图层和形状信息中检查导入图稿。"}},
        {id: "project-package", title: "保存可编辑源项目", paragraphs: [".jigsawproject 包含 project.json、document.svg 和内容寻址资源，适合保留完整可编辑项目、设置与嵌入图片。"]},
        {id: "export", title: "导出便携 SVG", paragraphs: ["使用导出 SVG 写出当前文档，包括几何、分组、变换和写入器支持的保留资源。"], note: "当前唯一导出格式为 SVG。", image: {src: "/generation-export-settings-v1-6.webp", alt: "JigsawDesigner 高级设置中显示 SVG 为默认导出格式", caption: "高级设置确认当前导出格式为 SVG；在编辑器中使用导出 SVG 写出文档。"}},
      ],
      faq: [{question: "可以导入引用在线图片的 SVG 吗？", answer: "App 不会获取远程 HTTP 图片。请嵌入图片或使用受支持的本地资源。"}, {question: "以后继续编辑应保存什么？", answer: "保留 .jigsawproject 作为可编辑源文件，使用 SVG 进行交换。"}],
      related: related("zh-Hans", ["vector-editing", "project-library", "troubleshooting"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/svg-import-export", eyebrow: "JigsawDesigner 說明", title: "匯入與匯出 SVG 檔案", seoTitle: "JigsawDesigner SVG 匯入與匯出指南", seoDescription: "匯入常見 SVG 幾何與嵌入資源、保留可編輯專案，並從 JigsawDesigner 匯出 SVG 文件。", intro: "SVG 用於把向量幾何帶入 JigsawDesigner，或將完成的幾何交給其他工作流程。可編輯的 .jigsawproject 是另一種來源專案格式，用於保留狀態與資源。", leadImage: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "在畫布、圖層與形狀資訊中檢查匯入圖稿。"}, highlights: ["匯入常見 SVG 形狀與群組", "保留嵌入圖片與繪製資源", "儲存可編輯 .jigsawproject", "僅匯出 SVG"],
      sections: [
        {id: "import", title: "將 SVG 匯入目前專案", paragraphs: ["使用匯入 SVG 選擇檔案。常見路徑、形狀、文字、圖片、群組、變形、裁剪路徑與 use 引用可解析進文件；複雜 SVG 仍應檢查結果。"], note: "遠端 HTTP 圖片、script 與 foreignObject 會被阻擋。請嵌入必要圖片，不要依賴遠端 URL。", image: {src: "/svg-import-fidelity-v1-6.webp", alt: "JigsawDesigner 中選取的匯入 SVG 圖稿及其圖層階層與形狀資訊", caption: "在畫布、圖層與形狀資訊中檢查匯入圖稿。"}},
        {id: "project-package", title: "儲存可編輯來源專案", paragraphs: [".jigsawproject 包含 project.json、document.svg 與內容定址資源，適合保留完整可編輯專案、設定與嵌入圖片。"]},
        {id: "export", title: "匯出可攜 SVG", paragraphs: ["使用匯出 SVG 寫出目前文件，包括幾何、群組、變形與寫入器支援的保留資源。"], note: "目前唯一匯出格式為 SVG。", image: {src: "/generation-export-settings-v1-6.webp", alt: "JigsawDesigner 進階設定中顯示 SVG 為預設匯出格式", caption: "進階設定確認目前匯出格式為 SVG；在編輯器中使用匯出 SVG 寫出文件。"}},
      ],
      faq: [{question: "可匯入引用線上圖片的 SVG 嗎？", answer: "App 不會擷取遠端 HTTP 圖片。請嵌入圖片或使用支援的本機資源。"}, {question: "日後繼續編輯應儲存什麼？", answer: "保留 .jigsawproject 作為可編輯來源檔，使用 SVG 交換。"}],
      related: related("zh-Hant", ["vector-editing", "project-library", "troubleshooting"]),
    }),
  },

  "vector-editing": {
    en: article("en", {
      slug: "help/vector-editing", eyebrow: "JigsawDesigner Help", title: "Edit Puzzle Geometry with Vector Tools", seoTitle: "JigsawDesigner Vector Editing Guide", seoDescription: "Use Select, Point Edit, Pencil, Line, Rectangle, Circle, Polygon, and Bezier tools with layers, groups, transforms, and undo.", intro: "JigsawDesigner provides eight focused tools for creating and refining SVG geometry. Selection state, element hierarchy, and undoable commands keep edits connected to the real document tree.", leadImage: {src: "/vector-point-edit-v1-6.webp", alt: "Point Edit anchors shown around a puzzle boundary in JigsawDesigner", caption: "Point Edit exposes the source path anchors while the generated group remains organized in Layers."}, highlights: ["Select and multi-select", "Point and Bezier handle editing", "Smoother Pencil paths", "Scale, rotate, group, lock, and hide"],
      sections: [
        {id: "canvas", title: "Navigate the canvas", paragraphs: ["Pan and zoom around the workspace to inspect the full contour or a small connection. Rulers and the optional grid provide scale context while you draw and edit."], image: {src: "/canvas_workspace-v1-6.webp", alt: "Dragon-shaped SVG geometry on the JigsawDesigner canvas with rulers and grid", caption: "Use the full canvas view for composition, then zoom in when a path or connection needs closer inspection."}},
        {id: "tools", title: "Choose the right tool", paragraphs: ["Select moves and transforms elements; Point Edit changes anchors and handles; Pencil draws freehand paths; Line, Rectangle, Circle, and Polygon create common shapes; Bezier creates controlled curves."], image: {src: "/vector-point-edit-v1-6.webp", alt: "Point Edit anchors shown around a puzzle boundary in JigsawDesigner", caption: "Point Edit exposes the source path anchors while the generated group remains organized in Layers."}},
        {id: "tools-panel", title: "Use the Tools panel for quick actions", paragraphs: ["The Tools panel shows the active tool and keeps common selection and canvas commands close by. Use it to copy or delete the current selection, reset or zoom the view, and select or deselect shapes."], image: {src: "/tools_panel-v1-6.webp", alt: "Tools panel with selection, canvas, zoom, and quick-action controls", caption: "Selection and view commands remain available beside the canvas."}},
        {id: "selection", title: "Select and transform document elements", paragraphs: ["Click to select an element, Shift-click to add to the selection, and use group drill-down when editing nested content. On-canvas handles resize and rotate around the selection center; Shape Info provides exact transform and geometry values."], bullets: ["Lock proportions during scaling", "Use Layers for nested hierarchy", "Locked or hidden ancestors affect editing", "Undo and redo command-based changes"], image: {src: "/shape_info-v1-6.webp", alt: "Shape Info showing position, scale, rotation, size, and actions for a selected SVG group", caption: "Shape Info reports values for the current selection and provides element-level actions."}},
        {id: "project-info", title: "Check document-level values", paragraphs: ["Project Info contains the project name, canvas size, jigsaw parameters, document statistics, and generation controls. These values apply to the document rather than an individual selected shape."], image: {src: "/right_inspector-v1-6.webp", alt: "Project Info with canvas size, jigsaw settings, document statistics, and generation controls", caption: "Project Info keeps document and generation values separate from the selected shape’s properties."}},
        {id: "open-paths", title: "Continue and join open paths", paragraphs: ["Version 1.6.0 supports smoother Pencil output and workflows for continuing or joining open contours. Inspect the join and use Point Edit when the transition needs refinement."]},
      ],
      related: related("en", ["svg-import-export", "keyboard-shortcuts", "templates"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/vector-editing", eyebrow: "JigsawDesigner 帮助", title: "使用矢量工具编辑拼图几何", seoTitle: "JigsawDesigner 矢量编辑指南", seoDescription: "使用 Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon 和 Bezier，以及图层、分组、变换与撤销。", intro: "JigsawDesigner 提供八种聚焦工具来创建和调整 SVG 几何。选择状态、元素层级和可撤销命令始终作用于真实文档树。", leadImage: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用点编辑显示拼图边界锚点", caption: "点编辑显示源路径锚点，生成结果仍作为分组保留在图层中。"}, highlights: ["选择与多选", "节点与 Bezier 控制柄编辑", "更平滑的 Pencil 路径", "缩放、旋转、分组、锁定和隐藏"],
      sections: [
        {id: "canvas", title: "在画布中移动和缩放", paragraphs: ["平移和缩放工作区，可查看完整轮廓，也可放大某个连接细节。标尺和可选网格能在绘制与编辑时提供尺寸参照。"], image: {src: "/canvas_workspace-v1-6.webp", alt: "带标尺和网格的 JigsawDesigner 画布中显示龙形 SVG 几何", caption: "先用完整画布检查构图，再放大需要细查的路径或连接。"}},
        {id: "tools", title: "选择合适的工具", paragraphs: ["Select 移动和变换元素；Point Edit 修改节点与控制柄；Pencil 自由绘制；Line、Rectangle、Circle 和 Polygon 创建常见形状；Bezier 创建受控曲线。"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用点编辑显示拼图边界锚点", caption: "点编辑显示源路径锚点，生成结果仍作为分组保留在图层中。"}},
        {id: "tools-panel", title: "使用工具面板的快捷操作", paragraphs: ["工具面板会显示当前工具，并集中提供常用的选区和画布操作。你可以复制或删除当前选区、重置或缩放视图，以及选择全部形状或取消选择。"], image: {src: "/tools_panel-v1-6.webp", alt: "包含选区、画布、缩放和快捷操作的工具面板", caption: "常用的选区和视图操作集中在画布一侧。"}},
        {id: "selection", title: "选择并变换文档元素", paragraphs: ["点击选择，Shift 点击加入多选，并在嵌套内容中深入分组。画布手柄围绕选区中心缩放和旋转，形状信息提供精确的变换与几何数值。"], bullets: ["缩放时锁定比例", "通过图层检查嵌套层级", "锁定或隐藏的祖先会影响编辑", "用撤销和重做恢复命令"], image: {src: "/shape_info-v1-6.webp", alt: "形状信息显示所选 SVG 分组的位置、缩放、旋转、尺寸和操作", caption: "形状信息显示当前选区的数值，并提供元素级操作。"}},
        {id: "project-info", title: "查看文档级参数", paragraphs: ["项目信息包含项目名称、画布尺寸、拼图参数、文档统计和生成操作。这些数值作用于整个文档，而不是单个选中形状。"], image: {src: "/right_inspector-v1-6.webp", alt: "项目信息中的画布尺寸、拼图设置、文档统计和生成操作", caption: "项目信息把文档与生成参数和所选形状的属性分开显示。"}},
        {id: "open-paths", title: "继续和连接开放路径", paragraphs: ["1.6.0 提供更平滑的 Pencil 输出，并支持继续或连接开放轮廓。连接后可使用 Point Edit 细调过渡。"]},
      ],
      related: related("zh-Hans", ["svg-import-export", "keyboard-shortcuts", "templates"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/vector-editing", eyebrow: "JigsawDesigner 說明", title: "使用向量工具編輯拼圖幾何", seoTitle: "JigsawDesigner 向量編輯指南", seoDescription: "使用 Select、Point Edit、Pencil、Line、Rectangle、Circle、Polygon 與 Bezier，以及圖層、群組、變形與還原。", intro: "JigsawDesigner 提供八種專注工具來建立與調整 SVG 幾何。選取狀態、元素階層與可還原命令始終作用於真實文件樹。", leadImage: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用節點編輯顯示拼圖邊界錨點", caption: "節點編輯顯示來源路徑錨點，產生結果仍以群組保留在圖層中。"}, highlights: ["選取與多選", "節點與 Bezier 控制把手編輯", "更平滑的 Pencil 路徑", "縮放、旋轉、群組、鎖定與隱藏"],
      sections: [
        {id: "canvas", title: "在畫布中移動與縮放", paragraphs: ["平移和縮放工作區，可查看完整輪廓，也可放大某個連接細節。尺規與可選網格能在繪製和編輯時提供尺寸參照。"], image: {src: "/canvas_workspace-v1-6.webp", alt: "帶有尺規和網格的 JigsawDesigner 畫布中顯示龍形 SVG 幾何", caption: "先用完整畫布檢查構圖，再放大需要細看的路徑或連接。"}},
        {id: "tools", title: "選擇合適的工具", paragraphs: ["Select 移動與變形元素；Point Edit 修改節點與控制把手；Pencil 自由繪製；Line、Rectangle、Circle 與 Polygon 建立常見形狀；Bezier 建立受控曲線。"], image: {src: "/vector-point-edit-v1-6.webp", alt: "JigsawDesigner 中使用節點編輯顯示拼圖邊界錨點", caption: "節點編輯顯示來源路徑錨點，產生結果仍以群組保留在圖層中。"}},
        {id: "tools-panel", title: "使用工具面板的快速操作", paragraphs: ["工具面板會顯示目前工具，並集中提供常用的選取與畫布操作。你可以複製或刪除目前選取、重設或縮放檢視，以及選取所有形狀或取消選取。"], image: {src: "/tools_panel-v1-6.webp", alt: "包含選取、畫布、縮放與快速操作的工具面板", caption: "常用的選取與檢視操作集中在畫布一側。"}},
        {id: "selection", title: "選取並變形文件元素", paragraphs: ["點按選取，Shift 點按加入多選，並在巢狀內容中深入群組。畫布把手圍繞選取中心縮放與旋轉，形狀資訊提供精確的變形與幾何數值。"], bullets: ["縮放時鎖定比例", "透過圖層檢查巢狀階層", "鎖定或隱藏的上層會影響編輯", "用還原與重做恢復命令"], image: {src: "/shape_info-v1-6.webp", alt: "形狀資訊顯示所選 SVG 群組的位置、縮放、旋轉、尺寸與操作", caption: "形狀資訊顯示目前選取的數值，並提供元素層級操作。"}},
        {id: "project-info", title: "查看文件層級參數", paragraphs: ["專案資訊包含專案名稱、畫布尺寸、拼圖參數、文件統計與產生操作。這些數值套用於整份文件，而不是單一選取形狀。"], image: {src: "/right_inspector-v1-6.webp", alt: "專案資訊中的畫布尺寸、拼圖設定、文件統計與產生操作", caption: "專案資訊將文件與產生參數和所選形狀的屬性分開顯示。"}},
        {id: "open-paths", title: "繼續與連接開放路徑", paragraphs: ["1.6.0 提供更平滑的 Pencil 輸出，並支援繼續或連接開放輪廓。連接後可用 Point Edit 細調過渡。"]},
      ],
      related: related("zh-Hant", ["svg-import-export", "keyboard-shortcuts", "templates"]),
    }),
  },

  templates: {
    en: article("en", {
      slug: "help/templates", eyebrow: "JigsawDesigner Help", title: "Create and Manage Slot Templates", seoTitle: "JigsawDesigner Slot Template Guide", seoDescription: "Choose built-in jigsaw slot templates or draw, import, edit, export, persist, and delete custom open-path templates.", intro: "Slot templates define the connection path supplied to jigsaw generation. Built-in templates are protected; custom templates can be created, updated, exported, persisted, and deleted.", leadImage: {src: "/generation-ready-v1-6.webp", alt: "A selected slot template beside a closed puzzle boundary ready for generation in JigsawDesigner", caption: "Choose a slot profile in Templates before generation."}, highlights: ["Standard Convex", "Standard Concave", "Straight Line", "Custom SVG open paths"],
      sections: [
        {id: "choose", title: "Choose a template", paragraphs: ["Open the Templates panel and select Standard Convex, Standard Concave, Straight Line, or one of your custom templates before generation."], image: {src: "/templates_panel-v1-6.webp", alt: "Built-in and custom slot templates"}},
        {id: "create", title: "Create or import a custom template", paragraphs: ["Open the Template Editor, enter a name, and draw an open Bezier path. Edit anchors as needed, or import an SVG path as a starting point."], image: {src: "/template_editor-v1-6.webp", alt: "Drawing an open slot profile in the Template Editor"}},
        {id: "manage", title: "Persist, export, and delete custom templates", paragraphs: ["Saving a custom template adds it to persistent template storage so it can be available to new projects. Export SVG for a portable copy. Built-in templates cannot be edited or deleted, while custom templates can."]},
      ],
      related: related("en", ["jigsaw-generation", "vector-editing", "troubleshooting"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/templates", eyebrow: "JigsawDesigner 帮助", title: "创建和管理卡槽模板", seoTitle: "JigsawDesigner 卡槽模板指南", seoDescription: "选择内置拼图卡槽模板，或绘制、导入、编辑、导出、持久保存和删除自定义开放路径模板。", intro: "卡槽模板定义拼图生成所用的连接路径。内置模板受保护；自定义模板可创建、更新、导出、持久保存和删除。", leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中生成前位于闭合拼图边界旁的所选卡槽模板", caption: "生成前在模板面板中选择卡槽轮廓。"}, highlights: ["标准凸形", "标准凹形", "直线", "自定义 SVG 开放路径"],
      sections: [
        {id: "choose", title: "选择模板", paragraphs: ["打开模板面板，在生成前选择标准凸形、标准凹形、直线或自定义模板。"], image: {src: "/templates_panel-v1-6.webp", alt: "内置与自定义卡槽模板"}},
        {id: "create", title: "创建或导入自定义模板", paragraphs: ["打开模板编辑器，输入名称并绘制开放 Bezier 路径。可编辑节点，也可导入 SVG 路径作为起点。"], image: {src: "/template_editor-v1-6.webp", alt: "在模板编辑器中绘制开放卡槽轮廓"}},
        {id: "manage", title: "持久保存、导出和删除", paragraphs: ["保存后，自定义模板会进入持久存储，并可用于新项目。可导出 SVG 作为便携副本。内置模板不能编辑或删除，自定义模板可以。"]},
      ],
      related: related("zh-Hans", ["jigsaw-generation", "vector-editing", "troubleshooting"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/templates", eyebrow: "JigsawDesigner 說明", title: "建立與管理卡槽範本", seoTitle: "JigsawDesigner 卡槽範本指南", seoDescription: "選擇內建拼圖卡槽範本，或繪製、匯入、編輯、匯出、持久儲存與刪除自訂開放路徑範本。", intro: "卡槽範本定義拼圖產生使用的連接路徑。內建範本受保護；自訂範本可建立、更新、匯出、持久儲存與刪除。", leadImage: {src: "/generation-ready-v1-6.webp", alt: "JigsawDesigner 中產生前位於封閉拼圖邊界旁的所選卡槽範本", caption: "產生前在範本面板中選擇卡槽輪廓。"}, highlights: ["標準凸形", "標準凹形", "直線", "自訂 SVG 開放路徑"],
      sections: [
        {id: "choose", title: "選擇範本", paragraphs: ["開啟範本面板，在產生前選擇標準凸形、標準凹形、直線或自訂範本。"], image: {src: "/templates_panel-v1-6.webp", alt: "內建與自訂卡槽範本"}},
        {id: "create", title: "建立或匯入自訂範本", paragraphs: ["開啟範本編輯器，輸入名稱並繪製開放 Bezier 路徑。可編輯節點，也可匯入 SVG 路徑作為起點。"], image: {src: "/template_editor-v1-6.webp", alt: "在範本編輯器繪製開放卡槽輪廓"}},
        {id: "manage", title: "持久儲存、匯出與刪除", paragraphs: ["儲存後，自訂範本會進入持久儲存，並可用於新專案。可匯出 SVG 作為可攜副本。內建範本不能編輯或刪除，自訂範本可以。"]},
      ],
      related: related("zh-Hant", ["jigsaw-generation", "vector-editing", "troubleshooting"]),
    }),
  },

  "project-library": {
    en: article("en", {
      slug: "help/project-library", eyebrow: "JigsawDesigner Help", title: "Manage Projects, iCloud Sync, and Sharing", seoTitle: "JigsawDesigner Project Library Guide", seoDescription: "Manage locally saved projects, optional iCloud sync, public project publishing and imports, and read-only CloudKit share links.", intro: "The Project Library brings together your projects, public projects, and projects shared through CloudKit. Local persistence remains part of every normal save; cloud features apply when enabled and available.", leadImage: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner Project Library with editable local puzzle projects", caption: "Create, reopen, and organize local projects from the library."}, highlights: ["Local project packages", "Optional iCloud synchronization", "Public project publishing and import", "Read-only CloudKit share links"],
      sections: [
        {id: "my-projects", title: "My Projects", paragraphs: ["Create, open, rename, and delete projects from My Projects. Normal saves first write a local .jigsawproject package. When the project prefers cloud storage and iCloud is available, the app also schedules CloudKit synchronization."], image: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner Project Library with editable local puzzle projects", caption: "Create, reopen, and organize local projects from the library."}},
        {id: "project-menu", title: "Use the project context menu", paragraphs: ["Open a project’s context menu to open or rename it, publish it to Public Projects, create a share link, or delete it. Publishing makes an importable public copy; the current share-link permission is read-only."], image: {src: "/context_menu-v1-6.webp", alt: "Project context menu with open, rename, publish, share-link, and delete actions", caption: "Project file, publishing, and sharing actions are grouped in the context menu."}},
        {id: "public-projects", title: "Public Projects", paragraphs: ["A project can be published to the public CloudKit database for community discovery. Public projects can be browsed and imported as a copy into My Projects."], image: {src: "/public_projects-v1-6.webp", alt: "Public Projects available for import"}},
        {id: "shared-projects", title: "Shared Projects", paragraphs: ["JigsawDesigner can create and accept CloudKit share links. The current share implementation sets public permission to read-only, so recipients can view a shared project but are not granted editing access."], image: {src: "/shared_projects-v1-6.webp", alt: "CloudKit projects shared with the user"}},
      ],
      faq: [{question: "Are projects stored only in iCloud?", answer: "No. Normal saves keep a local project package. Cloud synchronization can also occur when enabled and available."}, {question: "Can recipients edit a shared project?", answer: "The current share link implementation is read-only."}],
      related: related("en", ["getting-started", "svg-import-export", "troubleshooting"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/project-library", eyebrow: "JigsawDesigner 帮助", title: "管理项目、iCloud 同步与分享", seoTitle: "JigsawDesigner 项目库指南", seoDescription: "管理本地项目、可选 iCloud 同步、公共项目发布与导入，以及只读 CloudKit 分享链接。", intro: "项目库汇集我的项目、公共项目和通过 CloudKit 分享的项目。常规保存始终包含本地持久化；云功能在启用且可用时工作。", leadImage: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner 项目库中的本地可编辑拼图项目", caption: "从项目库创建、重新打开和整理本地项目。"}, highlights: ["本地项目包", "可选 iCloud 同步", "公共项目发布与导入", "只读 CloudKit 分享链接"],
      sections: [
        {id: "my-projects", title: "我的项目", paragraphs: ["在我的项目中创建、打开、重命名和删除。常规保存先写入本地 .jigsawproject；项目选择云端且 iCloud 可用时，还会安排 CloudKit 同步。"], image: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner 项目库中的本地可编辑拼图项目", caption: "从项目库创建、重新打开和整理本地项目。"}},
        {id: "project-menu", title: "使用项目右键菜单", paragraphs: ["打开项目的右键菜单，可以打开或重命名项目、发布到公共项目、创建分享链接或删除项目。发布会生成可供他人导入的公共副本；当前分享链接为只读。"], image: {src: "/context_menu-v1-6.webp", alt: "包含打开、重命名、发布、创建分享链接和删除操作的项目右键菜单", caption: "项目文件、发布与分享操作集中在右键菜单中。"}},
        {id: "public-projects", title: "公共项目", paragraphs: ["项目可发布到公共 CloudKit 数据库供社区发现。你可以浏览公共项目，并把副本导入我的项目。"], image: {src: "/public_projects-v1-6.webp", alt: "可导入的公共项目"}},
        {id: "shared-projects", title: "共享项目", paragraphs: ["JigsawDesigner 可创建和接受 CloudKit 分享链接。当前分享权限固定为只读，接收者可以查看分享项目，但不会获得编辑权限。"], image: {src: "/shared_projects-v1-6.webp", alt: "通过 CloudKit 分享给用户的项目"}},
      ],
      faq: [{question: "项目只保存在 iCloud 吗？", answer: "不是。常规保存会保留本地项目包；启用且可用时也可同步云端。"}, {question: "接收者可以编辑分享项目吗？", answer: "当前分享链接为只读。"}],
      related: related("zh-Hans", ["getting-started", "svg-import-export", "troubleshooting"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/project-library", eyebrow: "JigsawDesigner 說明", title: "管理專案、iCloud 同步與分享", seoTitle: "JigsawDesigner 專案庫指南", seoDescription: "管理本機專案、可選 iCloud 同步、公開專案發佈與匯入，以及唯讀 CloudKit 分享連結。", intro: "專案庫彙整我的專案、公開專案與透過 CloudKit 分享的專案。一般儲存始終包含本機持久化；雲端功能在啟用且可用時運作。", leadImage: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner 專案庫中的本機可編輯拼圖專案", caption: "從專案庫建立、重新開啟與整理本機專案。"}, highlights: ["本機專案套件", "可選 iCloud 同步", "公開專案發佈與匯入", "唯讀 CloudKit 分享連結"],
      sections: [
        {id: "my-projects", title: "我的專案", paragraphs: ["在我的專案建立、開啟、重新命名與刪除。一般儲存先寫入本機 .jigsawproject；專案選擇雲端且 iCloud 可用時，還會安排 CloudKit 同步。"], image: {src: "/project-library-v1-6.webp", alt: "JigsawDesigner 專案庫中的本機可編輯拼圖專案", caption: "從專案庫建立、重新開啟與整理本機專案。"}},
        {id: "project-menu", title: "使用專案快捷選單", paragraphs: ["開啟專案的快捷選單，可以開啟或重新命名專案、發佈到公開專案、建立分享連結或刪除專案。發佈會建立可供他人匯入的公開副本；目前分享連結為唯讀。"], image: {src: "/context_menu-v1-6.webp", alt: "包含開啟、重新命名、發佈、建立分享連結與刪除操作的專案快捷選單", caption: "專案檔案、發佈與分享操作集中在快捷選單中。"}},
        {id: "public-projects", title: "公開專案", paragraphs: ["專案可發佈到公開 CloudKit 資料庫供社群探索。你可以瀏覽公開專案，並將副本匯入我的專案。"], image: {src: "/public_projects-v1-6.webp", alt: "可匯入的公開專案"}},
        {id: "shared-projects", title: "共享專案", paragraphs: ["JigsawDesigner 可建立與接受 CloudKit 分享連結。目前分享權限固定為唯讀，接收者可以查看共享專案，但不會取得編輯權限。"], image: {src: "/shared_projects-v1-6.webp", alt: "透過 CloudKit 分享給使用者的專案"}},
      ],
      faq: [{question: "專案只儲存在 iCloud 嗎？", answer: "不是。一般儲存會保留本機專案套件；啟用且可用時也可同步雲端。"}, {question: "接收者可以編輯分享專案嗎？", answer: "目前分享連結為唯讀。"}],
      related: related("zh-Hant", ["getting-started", "svg-import-export", "troubleshooting"]),
    }),
  },

  "keyboard-shortcuts": {
    en: article("en", {
      slug: "help/keyboard-shortcuts", eyebrow: "JigsawDesigner Help", title: "Keyboard Shortcuts for the Mac Editor", seoTitle: "JigsawDesigner Keyboard Shortcuts", seoDescription: "Reference the current Mac shortcuts for project files, SVG import and export, undo, redo, copy, delete, selection, grouping, and Help.", intro: "These shortcuts reflect the current macOS menu commands. On iPhone and iPad, use the corresponding toolbar, menu, or touch controls when a hardware-keyboard shortcut is unavailable.", highlights: ["Project and SVG file commands", "Undo, redo, copy, and selection", "Backward and forward Delete handling", "Grouping and Help shortcuts"],
      sections: [
        {id: "file", title: "File commands", paragraphs: ["Use the Command key with the following letters."], bullets: ["⌘N — New Project", "⌘S — Save Project", "⌘O — Open Project", "⌘I — Import SVG", "⌘E — Export SVG"]},
        {id: "edit", title: "Edit commands", paragraphs: ["Editing commands operate on the current document selection. Text fields keep their normal editing behavior when they have focus."], bullets: ["⌘Z — Undo", "⇧⌘Z — Redo", "⌘C — Copy selected element(s)", "⌘A — Select all shapes", "Delete or Forward Delete — Delete selected element(s)"]},
        {id: "groups-help", title: "Grouping and Help", paragraphs: ["Group and ungroup use the current app-specific bindings."], bullets: ["G — Group selected shapes", "⌘G — Ungroup the selected group", "⌘/ — Open JigsawDesigner Help"]},
      ],
      related: related("en", ["vector-editing", "getting-started", "troubleshooting"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/keyboard-shortcuts", eyebrow: "JigsawDesigner 帮助", title: "Mac 编辑器键盘快捷键", seoTitle: "JigsawDesigner 键盘快捷键", seoDescription: "查看当前 Mac 项目、SVG 导入导出、撤销、重做、复制、删除、选择、分组和帮助快捷键。", intro: "这些快捷键对应当前 macOS 菜单命令。在 iPhone 和 iPad 上，如果硬件键盘快捷键不可用，请使用工具栏、菜单或触控操作。", highlights: ["项目与 SVG 文件命令", "撤销、重做、复制和选择", "向后与向前 Delete", "分组和帮助快捷键"],
      sections: [
        {id: "file", title: "文件命令", paragraphs: ["使用 Command 键与下列字母。"], bullets: ["⌘N — 新建项目", "⌘S — 保存项目", "⌘O — 打开项目", "⌘I — 导入 SVG", "⌘E — 导出 SVG"]},
        {id: "edit", title: "编辑命令", paragraphs: ["编辑命令作用于当前文档选区。文本框获得焦点时会保留正常文本编辑行为。"], bullets: ["⌘Z — 撤销", "⇧⌘Z — 重做", "⌘C — 复制选中元素", "⌘A — 选择全部形状", "Delete 或 Forward Delete — 删除选中元素"]},
        {id: "groups-help", title: "分组与帮助", paragraphs: ["分组和解组使用当前 App 自定义按键。"], bullets: ["G — 分组选中形状", "⌘G — 解组所选分组", "⌘/ — 打开 JigsawDesigner 帮助"]},
      ],
      related: related("zh-Hans", ["vector-editing", "getting-started", "troubleshooting"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/keyboard-shortcuts", eyebrow: "JigsawDesigner 說明", title: "Mac 編輯器鍵盤快速鍵", seoTitle: "JigsawDesigner 鍵盤快速鍵", seoDescription: "查看目前 Mac 專案、SVG 匯入匯出、還原、重做、複製、刪除、選取、群組與說明快速鍵。", intro: "這些快速鍵對應目前 macOS 選單命令。在 iPhone 與 iPad 上，若硬體鍵盤快速鍵不可用，請使用工具列、選單或觸控操作。", highlights: ["專案與 SVG 檔案命令", "還原、重做、複製與選取", "向後與向前 Delete", "群組與說明快速鍵"],
      sections: [
        {id: "file", title: "檔案命令", paragraphs: ["使用 Command 鍵搭配下列字母。"], bullets: ["⌘N — 新增專案", "⌘S — 儲存專案", "⌘O — 開啟專案", "⌘I — 匯入 SVG", "⌘E — 匯出 SVG"]},
        {id: "edit", title: "編輯命令", paragraphs: ["編輯命令作用於目前文件選取範圍。文字欄位取得焦點時會保留正常文字編輯行為。"], bullets: ["⌘Z — 還原", "⇧⌘Z — 重做", "⌘C — 複製選取元素", "⌘A — 選取全部形狀", "Delete 或 Forward Delete — 刪除選取元素"]},
        {id: "groups-help", title: "群組與說明", paragraphs: ["群組與解散群組使用目前 App 自訂按鍵。"], bullets: ["G — 群組選取形狀", "⌘G — 解散所選群組", "⌘/ — 開啟 JigsawDesigner 說明"]},
      ],
      related: related("zh-Hant", ["vector-editing", "getting-started", "troubleshooting"]),
    }),
  },

  troubleshooting: {
    en: article("en", {
      slug: "help/troubleshooting", eyebrow: "JigsawDesigner Help", title: "Troubleshoot JigsawDesigner", seoTitle: "JigsawDesigner Troubleshooting Guide", seoDescription: "Resolve common issues with selection, SVG import, jigsaw generation, export access, iCloud synchronization, and project files.", intro: "Work from the smallest reproducible project and keep the editable source package. The checks below separate geometry problems, selection state, subscription access, and cloud availability.", highlights: ["Selection and locked layers", "SVG import diagnostics", "Boundary and template validation", "Local save and optional cloud sync"],
      sections: [
        {id: "selection", title: "An element cannot be selected or edited", paragraphs: ["Switch to Select, inspect the Layers hierarchy, and check whether the element or an ancestor is locked or hidden. Drill into a group when you need a nested child rather than the top-level group."], bullets: ["Confirm the active tool", "Reveal and unlock the relevant layer", "Deselect and select again", "Use Point Edit only after selecting compatible geometry"]},
        {id: "generation", title: "Jigsaw generation fails", paragraphs: ["Confirm the outer boundary is a valid closed path and the chosen slot template is a valid open path. Try a simpler contour or lower target density, then inspect any error shown by the generation operation."]},
        {id: "import-export", title: "Import or export does not behave as expected", paragraphs: ["For import, use a local SVG with embedded resources and inspect unsupported or blocked content. For export, confirm Premium access; current export is SVG only. Keep the source .jigsawproject before simplifying a complex document."]},
        {id: "projects-cloud", title: "A project or cloud update is missing", paragraphs: ["First confirm the local project package exists in My Projects. Cloud synchronization additionally requires iCloud availability and a project configured for cloud storage. Public publishing and share acceptance are separate CloudKit operations."], note: "Contact support with the platform, app version shown in the App Store build, a minimal project, and clear reproduction steps. Do not send sensitive credentials."},
      ],
      related: related("en", ["project-library", "svg-import-export", "jigsaw-generation"]),
    }),
    "zh-Hans": article("zh-Hans", {
      slug: "help/troubleshooting", eyebrow: "JigsawDesigner 帮助", title: "JigsawDesigner 故障排查", seoTitle: "JigsawDesigner 故障排查指南", seoDescription: "排查选择、SVG 导入、拼图生成、导出权限、iCloud 同步和项目文件的常见问题。", intro: "从最小可复现项目开始，并保留可编辑源项目。下面的检查把几何、选择状态、订阅权限和云端可用性分开处理。", highlights: ["选择与锁定图层", "SVG 导入诊断", "边界与模板验证", "本地保存与可选云同步"],
      sections: [
        {id: "selection", title: "无法选择或编辑元素", paragraphs: ["切换到 Select，检查图层层级，并确认元素或祖先没有锁定或隐藏。需要子元素时深入分组，而不是只选顶层分组。"], bullets: ["确认当前工具", "显示并解锁相关图层", "取消选择后重选", "先选择兼容几何再用 Point Edit"]},
        {id: "generation", title: "拼图生成失败", paragraphs: ["确认外边界是有效闭合路径，卡槽模板是有效开放路径。尝试简化轮廓或降低目标密度，并检查生成操作显示的错误。"]},
        {id: "import-export", title: "导入或导出异常", paragraphs: ["导入时使用包含嵌入资源的本地 SVG，并检查不受支持或被阻止的内容。导出时确认 Premium 权限；当前只导出 SVG。简化复杂文档前保留源 .jigsawproject。"]},
        {id: "projects-cloud", title: "项目或云更新缺失", paragraphs: ["先确认我的项目中存在本地项目包。云同步还要求 iCloud 可用且项目选择云存储。公共发布和接受分享是独立的 CloudKit 操作。"], note: "联系支持时请提供平台、App 版本、最小项目和清晰复现步骤，不要发送敏感凭据。"},
      ],
      related: related("zh-Hans", ["project-library", "svg-import-export", "jigsaw-generation"]),
    }),
    "zh-Hant": article("zh-Hant", {
      slug: "help/troubleshooting", eyebrow: "JigsawDesigner 說明", title: "JigsawDesigner 疑難排解", seoTitle: "JigsawDesigner 疑難排解指南", seoDescription: "排查選取、SVG 匯入、拼圖產生、匯出權限、iCloud 同步與專案檔案的常見問題。", intro: "從最小可重現專案開始，並保留可編輯來源專案。以下檢查會分開處理幾何、選取狀態、訂閱權限與雲端可用性。", highlights: ["選取與鎖定圖層", "SVG 匯入診斷", "邊界與範本驗證", "本機儲存與可選雲端同步"],
      sections: [
        {id: "selection", title: "無法選取或編輯元素", paragraphs: ["切換到 Select、檢查圖層階層，並確認元素或上層未鎖定或隱藏。需要子元素時深入群組，不要只選頂層群組。"], bullets: ["確認目前工具", "顯示並解鎖相關圖層", "取消選取後重新選取", "先選擇相容幾何再使用 Point Edit"]},
        {id: "generation", title: "拼圖產生失敗", paragraphs: ["確認外邊界是有效封閉路徑，卡槽範本是有效開放路徑。嘗試簡化輪廓或降低目標密度，並檢查產生操作顯示的錯誤。"]},
        {id: "import-export", title: "匯入或匯出異常", paragraphs: ["匯入時使用包含嵌入資源的本機 SVG，並檢查不支援或被阻擋的內容。匯出時確認 Premium 權限；目前只匯出 SVG。簡化複雜文件前保留來源 .jigsawproject。"]},
        {id: "projects-cloud", title: "專案或雲端更新遺失", paragraphs: ["先確認我的專案中存在本機專案套件。雲端同步還要求 iCloud 可用且專案選擇雲端儲存。公開發佈與接受分享是獨立 CloudKit 操作。"], note: "聯絡支援時請提供平台、App 版本、最小專案與清楚重現步驟，不要傳送敏感憑證。"},
      ],
      related: related("zh-Hant", ["project-library", "svg-import-export", "jigsaw-generation"]),
    }),
  },
};

export function isHelpSlug(value: string): value is HelpSlug {
  return helpSlugs.includes(value as HelpSlug);
}

export function getHelpPage(
  slug: string,
  locale: TierOneLocale,
): ArticleContent | null {
  return isHelpSlug(slug) ? pages[slug][locale] : null;
}

export function getHelpTitle(locale: TierOneLocale, slug: HelpSlug): string {
  return titles[locale][slug];
}
