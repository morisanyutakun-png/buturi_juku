import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} ｜ ${siteConfig.nameSub}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfbf5",
    theme_color: "#142341",
    icons: [
      { src: "/icon.png", sizes: "64x64", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/brand/solvora-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
