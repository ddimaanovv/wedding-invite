import scrollArrowSvg from "../assets/scroll-arrow.svg";
import { HERO_CONTENT } from "../config/weddingData";

export function HeroSection({
  subtitle,
  activeHeroPhoto,
  heroPhotoReady,
  shouldHideHeroPhoto,
  onHeroPhotoLoad,
}) {
  return (
    <section className="hero-stage">
      <div
        className={`hero-photo-shell ${shouldHideHeroPhoto ? "is-placeholder" : ""}`}
        aria-hidden="true"
      >
        {!shouldHideHeroPhoto ? (
          <img
            className={`hero-photo ${heroPhotoReady ? "is-ready" : ""}`}
            src={activeHeroPhoto}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={onHeroPhotoLoad}
          />
        ) : null}
      </div>

      <div className="hero-intro">
        <section className="hero fade show">
          <div className="sparkles" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-card">
            <h1>{HERO_CONTENT.title}</h1>
            <div className="gold-line" />
            <p className="subtitle">{subtitle}</p>
            <p className="date-line">{HERO_CONTENT.dateLine}</p>
          </div>
        </section>

        <a className="scroll-hint" href={HERO_CONTENT.scrollHintTarget}>
          <img src={scrollArrowSvg} alt="" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function HeroMessageSection({ appeal, note }) {
  return (
    <section className="fade" id="hero-message">
      <div className="glass hero-message-card">
        <h3 className="hero-appeal">{appeal}</h3>
        <p className="hero-note">{note}</p>
      </div>
    </section>
  );
}
