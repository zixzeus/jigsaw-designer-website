import type {MetadataRoute} from "next";
import {PRODUCT_FACTS} from "@/config/product";
import {absoluteUrl} from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: PRODUCT_FACTS.websiteOrigin,
  };
}
