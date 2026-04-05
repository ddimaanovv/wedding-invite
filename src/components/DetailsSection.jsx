import { SECTIONS_TEXT } from "../config/weddingData";

export function DetailsSection({ details }) {
  return (
    <section className="fade">
      <div className="glass details-card">
        <h2>{SECTIONS_TEXT.detailsTitle}</h2>
        <div className="gold-line" />
        {details.map((paragraph) => (
          <p className="details-text" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
