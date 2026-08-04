import localFont from "next/font/local";

// Decorative display face used for the hero's live online-member count —
// see fonts/belagak-font/info.txt for license (freeware).
export const belagak = localFont({
  src: "../../fonts/belagak-font/BelagakRegular-PVjgx.ttf",
  variable: "--font-belagak",
  display: "swap",
});

// Site-wide Korean UI face (에스코어 드림 / S-Core Dream), used everywhere
// except the hero's live counter above. Numbered weights 1–9 map to the
// standard 100–900 scale so existing font-weight utility classes (font-bold,
// font-extrabold, ...) pick the right file automatically.
export const scdream = localFont({
  src: [
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream1.otf", weight: "100", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream2.otf", weight: "200", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream3.otf", weight: "300", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream4.otf", weight: "400", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream5.otf", weight: "500", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream6.otf", weight: "600", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream7.otf", weight: "700", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream8.otf", weight: "800", style: "normal" },
    { path: "../../fonts/belagak-font/S-Core_Dream_OTF/SCDream9.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-scdream",
  display: "swap",
});
