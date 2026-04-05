import { SHARED_VARIANT_CONTENT, VARIANT_LABELS } from "./config/weddingData";

const baseTheme = {
  "--hero-photo-position": "center 34%",
  "--hero-photo-width": "42rem",
  "--hero-photo-radius": "0 0 42px 42px",
  "--panel-radius": "30px",
  "--button-radius": "999px",
  "--display-font": '"Cormorant Garamond", serif',
  "--body-font": '"Cormorant Garamond", serif',
};

const bloomTheme = {
  ...baseTheme,
  "--display-font": '"Great Vibes", cursive',
  "--body-font": '"Great Vibes", cursive',
  "--page-background":
    "linear-gradient(140deg, #fffafc, #f8eef4 46%, #f4eefb)",
  "--surface":
    "linear-gradient(140deg, rgba(255, 255, 255, 0.92), rgba(255, 247, 252, 0.84))",
  "--surface-strong": "rgba(255, 255, 255, 0.9)",
  "--border": "rgba(188, 154, 171, 0.22)",
  "--accent": "#c79a63",
  "--accent-strong": "#9a7146",
  "--text-main": "#443124",
  "--text-soft": "rgba(68, 49, 36, 0.76)",
  "--text-muted": "rgba(68, 49, 36, 0.56)",
  "--button-text": "#fffaf4",
  "--shadow": "0 26px 70px rgba(122, 88, 107, 0.16)",
  "--hero-shell-bg":
    "linear-gradient(135deg, rgba(255, 255, 255, 0.76), rgba(247, 233, 241, 0.88))",
  "--hero-overlay":
    "linear-gradient(to bottom, rgba(46, 33, 41, 0.04), rgba(46, 33, 41, 0.18) 60%, rgba(255, 255, 255, 0.08) 100%)",
  "--photo-filter": "saturate(0.96) contrast(1.01)",
  "--sparkle-color": "rgba(255, 248, 236, 0.94)",
  "--dock-bg": "rgba(255, 249, 245, 0.82)",
  "--chip-bg": "rgba(255, 255, 255, 0.72)",
  "--chip-border": "rgba(188, 154, 171, 0.16)",
  "--footer-color": "#7a6448",
};

const velvetTheme = {
  ...baseTheme,
  "--display-font": '"Amatic SC", cursive',
  "--body-font": '"Amatic SC", cursive',
  "--page-background":
    "radial-gradient(circle at 18% 18%, rgba(58, 30, 48, 0.24), transparent 24%), radial-gradient(circle at 82% 20%, rgba(74, 41, 29, 0.18), transparent 20%), radial-gradient(circle at 50% 78%, rgba(44, 18, 34, 0.2), transparent 28%), linear-gradient(145deg, #09070b, #120d14 42%, #1a1017)",
  "--surface":
    "linear-gradient(145deg, rgba(22, 16, 24, 0.82), rgba(13, 10, 15, 0.66))",
  "--surface-strong": "rgba(16, 12, 17, 0.78)",
  "--border": "rgba(244, 212, 149, 0.18)",
  "--accent": "#c79a63",
  "--accent-strong": "#9a7146",
  "--text-main": "#f7efe6",
  "--text-soft": "rgba(247, 239, 230, 0.74)",
  "--text-muted": "rgba(247, 239, 230, 0.56)",
  "--button-text": "#100c11",
  "--shadow": "0 28px 80px rgba(0, 0, 0, 0.46)",
  "--hero-shell-bg":
    "linear-gradient(145deg, rgba(22, 16, 24, 0.88), rgba(13, 10, 15, 0.74))",
  "--hero-overlay":
    "linear-gradient(to bottom, rgba(7, 5, 8, 0.18), rgba(7, 5, 8, 0.42) 64%, rgba(7, 5, 8, 0.22) 100%)",
  "--photo-filter": "saturate(0.88) brightness(0.86)",
  "--sparkle-color": "rgba(255, 244, 224, 0.92)",
  "--dock-bg": "rgba(16, 12, 17, 0.8)",
  "--chip-bg": "rgba(255, 255, 255, 0.04)",
  "--chip-border": "rgba(244, 212, 149, 0.18)",
  "--footer-color": "#e7d5b3",
};

const celestialTheme = {
  ...baseTheme,
  "--display-font": '"Caveat", cursive',
  "--body-font": '"Caveat", cursive',
  "--page-background":
    "linear-gradient(180deg, rgba(250, 246, 239, 0.24), rgba(243, 235, 224, 0.12))",
  "--surface":
    "linear-gradient(155deg, rgba(255, 251, 245, 0.88), rgba(248, 241, 231, 0.82) 54%, rgba(255, 249, 242, 0.9))",
  "--surface-strong": "rgba(255, 249, 242, 0.9)",
  "--border": "rgba(191, 154, 92, 0.24)",
  "--accent": "#c79a63",
  "--accent-strong": "#9a7146",
  "--text-main": "#443124",
  "--text-soft": "rgba(68, 49, 36, 0.76)",
  "--text-muted": "rgba(68, 49, 36, 0.56)",
  "--button-text": "#fffaf2",
  "--shadow": "0 24px 56px rgba(30, 19, 10, 0.16)",
  "--hero-shell-bg":
    "linear-gradient(155deg, rgba(255, 251, 245, 0.9), rgba(244, 236, 225, 0.84) 54%, rgba(255, 248, 239, 0.92))",
  "--hero-overlay":
    "linear-gradient(to bottom, rgba(28, 20, 13, 0.08), rgba(28, 20, 13, 0.18) 64%, rgba(255, 255, 255, 0.06) 100%)",
  "--photo-filter": "saturate(0.94) brightness(0.94)",
  "--sparkle-color": "rgba(255, 245, 228, 0.94)",
  "--dock-bg": "rgba(255, 249, 242, 0.78)",
  "--chip-bg": "rgba(255, 255, 255, 0.64)",
  "--chip-border": "rgba(191, 154, 92, 0.18)",
  "--footer-color": "#7a6448",
};

const softTheme = {
  ...baseTheme,
  "--page-background": "transparent",
  "--surface":
    "linear-gradient(140deg, rgba(255, 255, 255, 0.92), rgba(255, 247, 237, 0.84))",
  "--surface-strong": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(180, 145, 102, 0.26)",
  "--accent": "#c79a63",
  "--accent-strong": "#9a7146",
  "--text-main": "#443124",
  "--text-soft": "rgba(68, 49, 36, 0.76)",
  "--text-muted": "rgba(68, 49, 36, 0.56)",
  "--button-text": "#fff9f1",
  "--shadow": "0 24px 60px rgba(88, 61, 34, 0.16)",
  "--hero-shell-bg": "linear-gradient(135deg, #f4ede4, #e8dbcc)",
  "--hero-overlay":
    "linear-gradient(to bottom, rgba(28, 20, 13, 0.08), rgba(28, 20, 13, 0.24) 60%, rgba(255, 255, 255, 0.1) 100%)",
  "--photo-filter": "saturate(0.96) contrast(1.02)",
  "--sparkle-color": "rgba(255, 250, 242, 0.94)",
  "--dock-bg": "rgba(255, 250, 243, 0.84)",
  "--chip-bg": "rgba(255, 255, 255, 0.72)",
  "--chip-border": "rgba(180, 145, 102, 0.18)",
  "--footer-color": "#7a6448",
};

const scenicTheme = {
  ...softTheme,
  "--display-font": '"Forum", serif',
  "--body-font": '"Forum", serif',
  "--page-background": "#ece1d3",
  "--surface":
    "linear-gradient(140deg, rgba(255, 255, 255, 0.86), rgba(247, 241, 232, 0.8))",
  "--surface-strong": "rgba(255, 255, 255, 0.88)",
  "--border": "rgba(159, 127, 88, 0.24)",
  "--accent": "#c79a63",
  "--accent-strong": "#9a7146",
  "--text-main": "#443124",
  "--text-soft": "rgba(68, 49, 36, 0.76)",
  "--text-muted": "rgba(68, 49, 36, 0.56)",
  "--shadow": "0 24px 60px rgba(55, 33, 13, 0.18)",
  "--hero-shell-bg":
    "linear-gradient(135deg, rgba(255, 248, 240, 0.82), rgba(231, 218, 201, 0.84))",
  "--hero-overlay":
    "linear-gradient(to bottom, rgba(28, 20, 13, 0.14), rgba(28, 20, 13, 0.3) 60%, rgba(255, 255, 255, 0.06) 100%)",
  "--photo-filter": "saturate(0.98) contrast(1.02)",
  "--dock-bg": "rgba(255, 248, 240, 0.78)",
  "--chip-bg": "rgba(255, 255, 255, 0.64)",
  "--chip-border": "rgba(159, 127, 88, 0.18)",
  "--footer-color": "#7a6448",
};

export const DEFAULT_VARIANT_KEY = "classic";

export const WEDDING_VARIANTS = [
  {
    key: "classic",
    scene: "soft",
    label: VARIANT_LABELS.classic,
    ...SHARED_VARIANT_CONTENT,
    theme: softTheme,
  },
  {
    key: "warm",
    scene: "bloom",
    label: VARIANT_LABELS.warm,
    ...SHARED_VARIANT_CONTENT,
    theme: bloomTheme,
  },
  {
    key: "modern",
    scene: "velvet",
    label: VARIANT_LABELS.modern,
    ...SHARED_VARIANT_CONTENT,
    theme: velvetTheme,
  },
  {
    key: "minimal",
    scene: "celestial",
    label: VARIANT_LABELS.minimal,
    ...SHARED_VARIANT_CONTENT,
    theme: celestialTheme,
  },
  {
    key: "scenic",
    scene: "scenic",
    label: VARIANT_LABELS.scenic,
    ...SHARED_VARIANT_CONTENT,
    theme: scenicTheme,
  },
];

const variantsByKey = Object.fromEntries(
  WEDDING_VARIANTS.map((variant) => [variant.key, variant]),
);

export function getWeddingVariant(key) {
  return variantsByKey[key] ?? variantsByKey[DEFAULT_VARIANT_KEY];
}
