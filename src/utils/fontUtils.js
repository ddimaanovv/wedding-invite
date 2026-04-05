const FONT_LOAD_DEFINITIONS_BY_VARIANT = {
  classic: [
    '500 1em "Cormorant Garamond"',
    '600 1em "Cormorant Garamond"',
    '700 1em "Cormorant Garamond"',
  ],
  warm: [
    '400 1em "Great Vibes"',
    '400 1em "Inter"',
    '500 1em "Inter"',
    '700 1em "Inter"',
  ],
  modern: ['400 1em "Amatic SC"', '700 1em "Amatic SC"'],
  minimal: [
    '400 1em "Caveat"',
    '500 1em "Caveat"',
    '600 1em "Caveat"',
    '700 1em "Caveat"',
  ],
  scenic: ['400 1em "Forum"'],
};

const FALLBACK_SAMPLE_TEXT = "Абв123 Wedding";
const loadedDefinitions = new Set();

async function loadFontDefinition(definition) {
  if (loadedDefinitions.has(definition)) {
    return;
  }

  await document.fonts.load(definition, FALLBACK_SAMPLE_TEXT);
  loadedDefinitions.add(definition);
}

export async function ensureVariantFontsLoaded(variantKey) {
  if (typeof document === "undefined" || !document.fonts?.load) {
    return;
  }

  const definitions = FONT_LOAD_DEFINITIONS_BY_VARIANT[variantKey] ?? [];
  await Promise.all(definitions.map((definition) => loadFontDefinition(definition)));
}

export function preloadAllVariantFonts() {
  if (typeof document === "undefined" || !document.fonts?.load) {
    return;
  }

  const allDefinitions = Object.values(FONT_LOAD_DEFINITIONS_BY_VARIANT).flat();
  allDefinitions.forEach((definition) => {
    loadFontDefinition(definition).catch(() => {});
  });
}
