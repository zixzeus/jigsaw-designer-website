import type {TierOneLocale} from "./types";

export type PricingCopy = {
  eyebrow: string;
  freeName: string;
  freeDescription: string;
  premiumName: string;
  premiumDescription: string;
  comparisonTitle: string;
  generationLabel: string;
  freeGeneration: string;
  unlimited: string;
  exportLabel: string;
  notIncluded: string;
  included: string;
  billingLabel: string;
  noSubscription: string;
  appleBilling: string;
  storeNote: string;
  faqTitle: string;
  faq: Array<{question: string; answer: string}>;
};

export type SupportPageCopy = {
  title: string;
  subtitle: string;
  documentationTitle: string;
  documentationDescription: string;
  troubleshootingTitle: string;
  troubleshootingDescription: string;
  emailTitle: string;
  emailDescription: string;
};

export type FooterPageCopy = {
  tagline: string;
  tutorial: string;
};

export const pricingPageCopy: Record<TierOneLocale, PricingCopy> = {
  en: {
    eyebrow: "Simple Apple subscription",
    freeName: "Free",
    freeDescription: "Try the generation workflow before you subscribe.",
    premiumName: "Premium",
    premiumDescription: "Unlimited generation and SVG export in one plan.",
    comparisonTitle: "What changes with Premium",
    generationLabel: "Puzzle generation",
    freeGeneration: "{count} generations",
    unlimited: "Unlimited",
    exportLabel: "SVG export",
    notIncluded: "Not included",
    included: "Included",
    billingLabel: "Billing",
    noSubscription: "No subscription",
    appleBilling: "Monthly or yearly through Apple",
    storeNote: "The App Store displays the current price and availability for your region. This website does not process purchases.",
    faqTitle: "Subscription questions",
    faq: [
      {question: "Where can I see the current price?", answer: "Open the App Store listing. Apple shows the current localized price for your storefront."},
      {question: "How do I manage or cancel a subscription?", answer: "Use the Subscriptions settings for your Apple Account. Billing and cancellation are handled by Apple."},
      {question: "Can I buy Premium on this website?", answer: "No. JigsawDesigner currently offers monthly and yearly subscriptions only through Apple."},
    ],
  },
  "zh-Hans": {
    eyebrow: "简单的 Apple 订阅",
    freeName: "Free",
    freeDescription: "订阅前先体验生成工作流。",
    premiumName: "Premium",
    premiumDescription: "一个方案包含无限生成和 SVG 导出。",
    comparisonTitle: "升级 Premium 后的变化",
    generationLabel: "拼图生成",
    freeGeneration: "{count} 次生成",
    unlimited: "无限",
    exportLabel: "SVG 导出",
    notIncluded: "不包含",
    included: "包含",
    billingLabel: "订阅周期",
    noSubscription: "无需订阅",
    appleBilling: "通过 Apple 按月或按年订阅",
    storeNote: "App Store 会显示你所在地区当前的价格与可用性；本网站不处理购买。",
    faqTitle: "订阅常见问题",
    faq: [
      {question: "在哪里查看当前价格？", answer: "打开 App Store 页面，Apple 会根据你的商店地区显示当前本地价格。"},
      {question: "如何管理或取消订阅？", answer: "请前往 Apple 账户的“订阅”设置。扣费、管理与取消均由 Apple 处理。"},
      {question: "可以在这个网站购买 Premium 吗？", answer: "不可以。JigsawDesigner 当前仅通过 Apple 提供月订阅和年订阅。"},
    ],
  },
  "zh-Hant": {
    eyebrow: "簡單的 Apple 訂閱",
    freeName: "Free",
    freeDescription: "訂閱前先體驗產生工作流程。",
    premiumName: "Premium",
    premiumDescription: "一個方案包含無限產生與 SVG 匯出。",
    comparisonTitle: "升級 Premium 後的變化",
    generationLabel: "拼圖產生",
    freeGeneration: "{count} 次產生",
    unlimited: "無限",
    exportLabel: "SVG 匯出",
    notIncluded: "不包含",
    included: "包含",
    billingLabel: "訂閱週期",
    noSubscription: "無需訂閱",
    appleBilling: "透過 Apple 按月或按年訂閱",
    storeNote: "App Store 會顯示所在地區目前的價格與供應狀況；本網站不處理購買。",
    faqTitle: "訂閱常見問題",
    faq: [
      {question: "在哪裡查看目前價格？", answer: "開啟 App Store 頁面，Apple 會依商店地區顯示目前的本地價格。"},
      {question: "如何管理或取消訂閱？", answer: "請前往 Apple 帳號的「訂閱」設定。扣款、管理與取消均由 Apple 處理。"},
      {question: "可以在此網站購買 Premium 嗎？", answer: "不可以。JigsawDesigner 目前僅透過 Apple 提供月訂閱與年訂閱。"},
    ],
  },
};

export const supportPageCopy: Record<TierOneLocale, SupportPageCopy> = {
  en: {
    title: "Support for JigsawDesigner",
    subtitle: "Start with the product guides, work through common issues, or email support with the project and device details that matter.",
    documentationTitle: "Product guides",
    documentationDescription: "Find setup, generation, vector editing, template, project, and keyboard references.",
    troubleshootingTitle: "Troubleshooting",
    troubleshootingDescription: "Check import, generation, export, project, and subscription issues step by step.",
    emailTitle: "Contact support",
    emailDescription: "For a specific problem, include your device, app version, expected result, and what happened instead.",
  },
  "zh-Hans": {
    title: "JigsawDesigner 支持",
    subtitle: "先查阅产品指南或常见问题；如需邮件支持，请一并说明项目、设备与问题细节。",
    documentationTitle: "产品指南",
    documentationDescription: "查找开始使用、拼图生成、矢量编辑、模板、项目和快捷键文档。",
    troubleshootingTitle: "故障排查",
    troubleshootingDescription: "逐步检查导入、生成、导出、项目与订阅问题。",
    emailTitle: "联系支持",
    emailDescription: "遇到具体问题时，请提供设备、App 版本、预期结果和实际情况。",
  },
  "zh-Hant": {
    title: "JigsawDesigner 支援",
    subtitle: "先查閱產品指南或常見問題；如需電子郵件支援，請一併說明專案、裝置與問題細節。",
    documentationTitle: "產品指南",
    documentationDescription: "查找開始使用、拼圖產生、向量編輯、範本、專案與快速鍵文件。",
    troubleshootingTitle: "疑難排解",
    troubleshootingDescription: "逐步檢查匯入、產生、匯出、專案與訂閱問題。",
    emailTitle: "聯絡支援",
    emailDescription: "遇到具體問題時，請提供裝置、App 版本、預期結果與實際情況。",
  },
};

export const footerPageCopy: Record<TierOneLocale, FooterPageCopy> = {
  en: {
    tagline: "Editable puzzle cutlines and SVG workflows for Apple devices.",
    tutorial: "Making guide",
  },
  "zh-Hans": {
    tagline: "面向 Apple 设备的可编辑拼图切割线与 SVG 工作流。",
    tutorial: "制作教程",
  },
  "zh-Hant": {
    tagline: "適用於 Apple 裝置的可編輯拼圖切割線與 SVG 工作流程。",
    tutorial: "製作教學",
  },
};

export function formatCount(pattern: string, count: number): string {
  return pattern.replaceAll("{count}", String(count));
}
