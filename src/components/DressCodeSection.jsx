import { DRESS_CODE_CONTENT } from "../config/weddingData";

export function DressCodeSection({ variantKey }) {
  if (variantKey !== "minimal") {
    return null;
  }

  return (
    <section className="fade" id="dress-code">
      <div className="glass dress-code-card">
        <h2>{DRESS_CODE_CONTENT.sectionTitle}</h2>
        <div className="gold-line" />
        <p className="dress-code-intro">{DRESS_CODE_CONTENT.intro}</p>

        <div className="dress-code-palette">
          <p className="dress-code-panel-title">{DRESS_CODE_CONTENT.paletteTitle}</p>
          <div className="dress-code-swatches">
            {DRESS_CODE_CONTENT.swatches.map((swatch) => (
              <article className="dress-code-swatch" key={swatch.label}>
                <span
                  className="dress-code-swatch-chip"
                  style={{ "--swatch-color": swatch.color }}
                />
                <span className="dress-code-swatch-name">{swatch.label}</span>
              </article>
            ))}
          </div>
        </div>

        <p className="dress-code-summary">{DRESS_CODE_CONTENT.summary}</p>
        <p className="dress-code-note">{DRESS_CODE_CONTENT.note}</p>
      </div>
    </section>
  );
}
