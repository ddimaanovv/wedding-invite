import { WARM_INTRO_CONTENT } from "../config/weddingData";

export function WarmIntroGate({
  isVisible,
  isOpening,
  onOpen,
  onAnimationEnd,
}) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`warm-invite-gate${isOpening ? " is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="warm-intro-title"
      onAnimationEnd={onAnimationEnd}
    >
      <div className="warm-arch-screen" aria-hidden="true">
        <div className="warm-arch-panel warm-arch-panel-left" />
        <div className="warm-arch-panel warm-arch-panel-right" />
      </div>

      <div className="warm-envelope-ui">
        <p className="warm-intro-heading" id="warm-intro-title">
          {WARM_INTRO_CONTENT.overline}
        </p>
        <button
          type="button"
          className="warm-envelope-seal warm-envelope-open"
          onClick={onOpen}
          disabled={isOpening}
        >
          <span>{WARM_INTRO_CONTENT.openLabel}</span>
          <small>{WARM_INTRO_CONTENT.openSublabel}</small>
        </button>
      </div>
    </div>
  );
}
