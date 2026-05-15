import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "clsx", "tailwind-merge"],
    // Inline critical CSS, defer the rest. Saves the ~450ms render-blocking
    // CSS request flagged by Lighthouse.
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // srcset 候補を絞り、HTML 内の srcset 文字列肥大と Lighthouse の DOM 解析負荷を抑える。
    // 既定値: deviceSizes 8件 + imageSizes 8件 = 16候補/画像。これを 4+4=8候補に半減。
    // 画像最終表示は ≤1200px が大半（本サイトでは Hero/Book cover/Print thumb のいずれも該当）。
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  async headers() {
    const longCache = "public, max-age=31536000, immutable";
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff2)",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
