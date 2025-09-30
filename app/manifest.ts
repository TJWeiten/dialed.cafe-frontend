import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dialed",
    short_name: "Dialed",
    description: "Your AI-Powered Barista Copilot",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ffffff",
    icons: [
      {
        src: "../public/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
