import heartSvg from "../assets/heart.svg";
import dovePng from "../assets/dove.webp";
import ringsPng from "../assets/rings.webp";
import flowersPng from "../assets/flowers.webp";
import { AMBIENT_CONFIG } from "../config/weddingData";

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <span className="ambient-layer ambient-wash" />
      <span className="ambient-layer ambient-veil" />
      <span className="ambient-layer ambient-velvet" />
      <span className="ambient-layer ambient-aurora" />
      <span className="ambient-layer ambient-sweep" />
      <span className="ambient-layer ambient-vignette" />
      <span className="ambient-arc" />
      <span className="ambient-frame" />
      <span className="ambient-starfield" />
      <span className="ambient-orb ambient-orb-a" />
      <span className="ambient-orb ambient-orb-b" />
      <span className="ambient-orb ambient-orb-c" />
      <span className="ambient-orb ambient-orb-d" />
      <span className="ambient-line ambient-line-a" />
      <span className="ambient-line ambient-line-b" />
      <span className="ambient-ring ambient-ring-a" />
      <span className="ambient-ring ambient-ring-b" />
      <span className="ambient-ring ambient-ring-c" />
      <span className="ambient-streak ambient-streak-a" />
      <span className="ambient-streak ambient-streak-b" />
      <span className="ambient-streak ambient-streak-c" />

      <div className="ambient-petals" aria-hidden="true">
        {Array.from({ length: AMBIENT_CONFIG.petalsCount }, (_, petalIndex) => (
          <span className="ambient-petal" key={`petal-${petalIndex}`}>
            <svg viewBox="0 0 100 140" role="presentation" focusable="false">
              <defs>
                <linearGradient
                  id={`petal-gradient-${petalIndex}`}
                  x1="18%"
                  y1="10%"
                  x2="82%"
                  y2="92%"
                >
                  <stop offset="0%" stopColor="#fff7f8" stopOpacity="0.24" />
                  <stop offset="30%" stopColor="#ff5b5f" stopOpacity="0.96" />
                  <stop offset="72%" stopColor="#c21544" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#5c0010" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <path
                d="M50 8C82 2 95 50 50 132C5 50 18 2 50 8Z"
                fill={`url(#petal-gradient-${petalIndex})`}
              />
              <path
                d="M50 24C52 56 50 86 48 114"
                stroke="rgba(255, 235, 235, 0.78)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <ellipse
                cx="40"
                cy="36"
                rx="9"
                ry="13"
                fill="rgba(255, 255, 255, 0.2)"
                transform="rotate(-18 40 36)"
              />
            </svg>
          </span>
        ))}
      </div>

      <div className="ambient-glints" aria-hidden="true">
        {AMBIENT_CONFIG.twinkleStars.map((size, index) => (
          <span
            className={size ? `ambient-twinkle-star ${size}` : "ambient-twinkle-star"}
            key={`twinkle-${index}`}
          >
            <span className="ambient-twinkle-core" />
          </span>
        ))}
      </div>

      <img className="float-shape ambient-heart heart-a" src={heartSvg} alt="" />
      <img className="float-shape ambient-heart heart-b" src={heartSvg} alt="" />
      <img className="float-shape ambient-heart heart-c" src={heartSvg} alt="" />
      <img className="float-shape ambient-heart heart-d" src={heartSvg} alt="" />
      <img className="float-shape ambient-dove" src={dovePng} alt="" />
      <img className="float-shape ambient-rings" src={ringsPng} alt="" />
      <img className="float-shape ambient-flowers" src={flowersPng} alt="" />
    </div>
  );
}
