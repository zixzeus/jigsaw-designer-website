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
    eyebrow: "Choose your plan",
    freeName: "Free",
    freeDescription: "Try your first puzzle designs for free.",
    premiumName: "Premium",
    premiumDescription: "Keep creating, with unlimited puzzle generation and SVG export.",
    comparisonTitle: "Free or Premium: what’s included",
    generationLabel: "Puzzle generation",
    freeGeneration: "{count} generations",
    unlimited: "Unlimited",
    exportLabel: "SVG export",
    notIncluded: "Not included",
    included: "Included",
    billingLabel: "Billing",
    noSubscription: "No subscription",
    appleBilling: "Monthly or yearly through Apple",
    storeNote: "Subscribe through the App Store, where you can see the current price for your region.",
    faqTitle: "Subscription questions",
    faq: [
      {question: "Where can I see the current price?", answer: "Visit the App Store to see the price in your local currency."},
      {question: "How do I manage or cancel a subscription?", answer: "Open Subscriptions in your Apple Account settings to manage or cancel your plan. Apple handles billing."},
      {question: "Can I buy Premium on this website?", answer: "Subscriptions are available through Apple only. Choose a monthly or yearly plan in the app."},
    ],
  },
  "zh-Hans": {
    eyebrow: "选择适合你的方案",
    freeName: "免费版",
    freeDescription: "免费试做，找到喜欢的拼图设计。",
    premiumName: "Premium",
    premiumDescription: "无限次生成拼图，并将设计导出为 SVG。",
    comparisonTitle: "免费版与 Premium，有什么不同？",
    generationLabel: "拼图生成",
    freeGeneration: "{count} 次生成",
    unlimited: "无限",
    exportLabel: "SVG 导出",
    notIncluded: "不包含",
    included: "包含",
    billingLabel: "订阅周期",
    noSubscription: "无需订阅",
    appleBilling: "通过 Apple 按月或按年订阅",
    storeNote: "通过 App Store 订阅，价格以你所在地区的商店显示为准。",
    faqTitle: "订阅常见问题",
    faq: [
      {question: "在哪里查看当前价格？", answer: "前往 App Store，即可查看你所在地区的价格。"},
      {question: "如何管理或取消订阅？", answer: "打开 Apple 账户设置中的“订阅”，即可管理或取消方案。扣费由 Apple 处理。"},
      {question: "可以在这个网站购买 Premium 吗？", answer: "目前仅通过 Apple 提供订阅。你可以在 App 内选择月付或年付方案。"},
    ],
  },
  "zh-Hant": {
    eyebrow: "選擇適合你的方案",
    freeName: "免費版",
    freeDescription: "免費試做，找到喜歡的拼圖設計。",
    premiumName: "Premium",
    premiumDescription: "不限次數製作拼圖，並將設計匯出為 SVG。",
    comparisonTitle: "免費版與 Premium，有什麼不同？",
    generationLabel: "製作拼圖",
    freeGeneration: "{count} 次",
    unlimited: "無限",
    exportLabel: "SVG 匯出",
    notIncluded: "不包含",
    included: "包含",
    billingLabel: "訂閱週期",
    noSubscription: "無需訂閱",
    appleBilling: "透過 Apple 按月或按年訂閱",
    storeNote: "透過 App Store 訂閱，價格以你所在地區的商店顯示為準。",
    faqTitle: "訂閱常見問題",
    faq: [
      {question: "在哪裡查看目前價格？", answer: "前往 App Store，即可查看你所在地區的價格。"},
      {question: "如何管理或取消訂閱？", answer: "開啟 Apple 帳號設定中的「訂閱」，即可管理或取消方案。扣款由 Apple 處理。"},
      {question: "可以在此網站購買 Premium 嗎？", answer: "目前僅透過 Apple 提供訂閱。你可以在 App 內選擇月繳或年繳方案。"},
    ],
  },
};

export const supportPageCopy: Record<TierOneLocale, SupportPageCopy> = {
  en: {
    title: "Support for JigsawDesigner",
    subtitle: "Find a quick answer, follow a guide, or get in touch. We’re here to help.",
    documentationTitle: "Product guides",
    documentationDescription: "Learn to make your first puzzle, edit SVGs, and get more from the app.",
    troubleshootingTitle: "Troubleshooting",
    troubleshootingDescription: "Find step-by-step help with imports, puzzle generation, exports, and subscriptions.",
    emailTitle: "Contact support",
    emailDescription: "Tell us what happened, which device you use, and your app version so we can help.",
  },
  "zh-Hans": {
    title: "JigsawDesigner 帮助与支持",
    subtitle: "查找答案、跟着教程操作，或直接联系我们。我们会帮你解决问题。",
    documentationTitle: "产品指南",
    documentationDescription: "从第一份拼图到 SVG 编辑，一步步熟悉 App 的各项功能。",
    troubleshootingTitle: "故障排查",
    troubleshootingDescription: "遇到导入、生成、导出或订阅问题？跟着步骤逐一排查。",
    emailTitle: "联系我们",
    emailDescription: "请告诉我们遇到了什么问题，并附上设备型号和 App 版本，方便我们帮你查找原因。",
  },
  "zh-Hant": {
    title: "JigsawDesigner 說明與支援",
    subtitle: "尋找答案、跟著教學操作，或直接聯絡我們。我們會協助你解決問題。",
    documentationTitle: "產品指南",
    documentationDescription: "從第一份拼圖到 SVG 編輯，一步步熟悉 App 的各項功能。",
    troubleshootingTitle: "疑難排解",
    troubleshootingDescription: "遇到匯入、製作拼圖、匯出或訂閱問題？跟著步驟逐一排解。",
    emailTitle: "聯絡我們",
    emailDescription: "請告訴我們遇到了什麼問題，並附上裝置型號與 App 版本，方便我們協助找出原因。",
  },
};

export const footerPageCopy: Record<TierOneLocale, FooterPageCopy> = {
  en: {
    tagline: "Your shapes. Your puzzles. Designed on Apple devices.",
    tutorial: "Making guide",
  },
  "zh-Hans": {
    tagline: "在 Apple 设备上，把自己的创意变成拼图。",
    tutorial: "制作教程",
  },
  "zh-Hant": {
    tagline: "在 Apple 裝置上，把自己的創意變成拼圖。",
    tutorial: "製作教學",
  },
};

export function formatCount(pattern: string, count: number): string {
  return pattern.replaceAll("{count}", String(count));
}
