import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AML/KYC Wiki — Financial Crime Operations",
    short_name: "AML/KYC Wiki",
    description:
      "Courses, frameworks and field guides for AML, KYC and financial-crime operations analysts.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0e",
    theme_color: "#10b981",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
