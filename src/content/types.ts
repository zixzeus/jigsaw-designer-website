import type {VersionedMediaPath} from "@/config/media";
import {PRIMARY_SEO_LOCALES, type SiteLocale} from "@/config/seo";

export const tierOneLocales = PRIMARY_SEO_LOCALES;

export type TierOneLocale = (typeof tierOneLocales)[number];

export function isTierOneLocale(locale: string): locale is TierOneLocale {
  return tierOneLocales.includes(locale as SiteLocale & TierOneLocale);
}

export type ContentImage = {
  src: VersionedMediaPath;
  alt: string;
  caption?: string;
  layout?: "wide" | "panel" | "strip";
};

export type MediaSourceKind =
  | "app-screenshot"
  | "exported-svg"
  | "real-photo"
  | "ai-concept";

/**
 * A visible asset with enough provenance to distinguish product evidence from
 * editorial illustration. Intrinsic dimensions live in config/media.ts so
 * there is one authoritative size registry for Next/Image and validation.
 */
export type MediaEvidence = {
  src: VersionedMediaPath;
  alt: string;
  caption?: string;
  source: {
    kind: MediaSourceKind;
    label: string;
    original?: string;
  };
  /** Required whenever source.kind is "ai-concept". */
  conceptLabel?: string;
};

export type ProjectExample = {
  status: "published" | "draft";
  title: string;
  objective: string;
  inputLabel: string;
  resultLabel: string;
  input: MediaEvidence;
  result: MediaEvidence;
  template: string;
  editAction: string;
  steps: string[];
  device: string;
  finishedAsset?: MediaEvidence;
};

export type LearningEntry = {
  stage: "understand" | "make" | "edit-export";
  title: string;
  description: string;
  href: string;
  difficulty: "beginner" | "intermediate";
  duration: string;
};

export type ContentSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
  image?: ContentImage;
};

export type ContentFaq = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

export type ArticleContent = {
  slug: string;
  schemaType?: "Article" | "TechArticle" | "HowTo";
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  intro: string;
  leadImage?: ContentImage;
  highlights?: string[];
  sections: ContentSection[];
  faq?: ContentFaq[];
  related?: RelatedLink[];
  labels: {
    home: string;
    help?: string;
    contents: string;
    breadcrumbs: string;
    highlights: string;
    faq: string;
    related: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaLabel: string;
  };
};

export const commonLabels: Record<TierOneLocale, ArticleContent["labels"]> = {
  en: {
    home: "Home",
    help: "Help Center",
    contents: "On this page",
    breadcrumbs: "Breadcrumbs",
    highlights: "What you can do",
    faq: "Frequently asked questions",
    related: "Continue exploring",
    ctaTitle: "Create and edit puzzle cutlines on Apple devices",
    ctaDescription:
      "Download JigsawDesigner from the App Store. Current pricing and availability are shown for your storefront.",
    ctaLabel: "View on the App Store",
  },
  "zh-Hans": {
    home: "首页",
    help: "帮助中心",
    contents: "本页内容",
    breadcrumbs: "面包屑导航",
    highlights: "你可以完成什么",
    faq: "常见问题",
    related: "继续了解",
    ctaTitle: "在 Apple 设备上生成并编辑拼图切割线",
    ctaDescription:
      "前往 App Store 下载 JigsawDesigner。价格和可用性以你所在地区的商店页面为准。",
    ctaLabel: "前往 App Store",
  },
  "zh-Hant": {
    home: "首頁",
    help: "說明中心",
    contents: "本頁內容",
    breadcrumbs: "麵包屑導覽",
    highlights: "你可以完成什麼",
    faq: "常見問題",
    related: "繼續瞭解",
    ctaTitle: "在 Apple 裝置上產生並編輯拼圖切割線",
    ctaDescription:
      "前往 App Store 下載 JigsawDesigner。價格與供應狀況以你所在地區的商店頁面為準。",
    ctaLabel: "前往 App Store",
  },
};
