import { VARIANT_SWITCHER_CONTENT } from "../config/weddingData";

export function VariantSwitcher({
  variants,
  activeVariantKey,
  onVariantChange,
}) {
  return (
    <section className="variant-dock-shell">
      <div className="variant-dock">
        <div
          className="variant-switcher"
          role="group"
          aria-label={VARIANT_SWITCHER_CONTENT.ariaLabel}
        >
          {variants.map((variant, index) => (
            <button
              key={variant.key}
              type="button"
              className={`variant-pill ${variant.key === activeVariantKey ? "is-active" : ""}`}
              onClick={() => onVariantChange(variant.key)}
              aria-pressed={variant.key === activeVariantKey}
            >
              <span className="variant-pill-title">
                {`${VARIANT_SWITCHER_CONTENT.pillPrefix} ${index + 1}`}
              </span>
            </button>
          ))}
        </div>

        <div className="variant-dots" aria-hidden="true">
          {variants.map((variant) => (
            <span
              key={`${variant.key}-dot`}
              className={`variant-dot ${variant.key === activeVariantKey ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
