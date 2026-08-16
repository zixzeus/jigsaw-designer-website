import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {initOpenNextCloudflareForDev} from "@opennextjs/cloudflare";
import {VERSIONED_MEDIA_DIMENSIONS} from "./src/config/media";

// Added by create-cloudflare to expose getCloudflareContext() in next dev.
initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'report-sample' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' 'report-sample'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

const securityHeaders = [
  {key: "Strict-Transport-Security", value: "max-age=31536000"},
  {key: "X-Content-Type-Options", value: "nosniff"},
  {key: "X-Frame-Options", value: "DENY"},
  {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups"},
  {
    key: "Content-Security-Policy-Report-Only",
    value: contentSecurityPolicyReportOnly,
  },
];

const immutableAssetHeaders = [
  {key: "Cache-Control", value: "public, max-age=31536000, immutable"},
];

const versionedMediaPaths = Object.keys(VERSIONED_MEDIA_DIMENSIONS);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Keep this until the OpenNext/Cloudflare image optimizer is configured.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/robots.txt",
        headers: [
          {key: "Cache-Control", value: "public, max-age=3600"},
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {key: "Cache-Control", value: "public, max-age=3600"},
        ],
      },
      ...versionedMediaPaths.map((source) => ({
        source,
        headers: immutableAssetHeaders,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
