export function getVariantKeyFromLocation(resolveVariantKey, fallbackKey) {
  if (typeof window === "undefined") {
    return fallbackKey;
  }

  const key = new URLSearchParams(window.location.search).get("variant");
  return resolveVariantKey(key);
}

export function syncVariantInLocation(variantKey) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("variant", variantKey);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function updateMeta(variant) {
  if (typeof document === "undefined") {
    return;
  }

  document.title = variant.meta.title;
  const descriptionTag = document.querySelector('meta[name="description"]');

  if (descriptionTag) {
    descriptionTag.setAttribute("content", variant.meta.description);
  }
}

export function syncDocumentBackground(variant) {
  if (typeof document === "undefined") {
    return;
  }

  const pageBackground = variant.theme["--page-background"];
  const fallbackBackground =
    pageBackground && pageBackground !== "transparent" ? pageBackground : "#ffffff";

  document.documentElement.style.background = fallbackBackground;
  document.body.style.background = fallbackBackground;
}
