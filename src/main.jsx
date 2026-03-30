import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const MOBILE_VIEWPORT_BREAKPOINT = 980;
const DESKTOP_WIDTH_RECALC_THRESHOLD = 2;
const MOBILE_WIDTH_RECALC_THRESHOLD = 48;

const getViewportWidth = () => window.innerWidth;

const setInitialViewportHeight = () => {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty(
    "--initial-viewport-height",
    `${height}px`,
  );
};

const setStableViewportSize = () => {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty("--stable-vh", `${height * 0.01}px`);
};
setInitialViewportHeight();
setStableViewportSize();

let lastViewportWidth = getViewportWidth();

window.addEventListener(
  "resize",
  () => {
    const currentWidth = getViewportWidth();
    const widthDelta = Math.abs(currentWidth - lastViewportWidth);
    const isMobileViewport = currentWidth <= MOBILE_VIEWPORT_BREAKPOINT;
    const threshold = isMobileViewport
      ? MOBILE_WIDTH_RECALC_THRESHOLD
      : DESKTOP_WIDTH_RECALC_THRESHOLD;

    if (widthDelta > threshold) {
      lastViewportWidth = currentWidth;
      setStableViewportSize();
    }
  },
  { passive: true },
);

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    lastViewportWidth = getViewportWidth();
    setStableViewportSize();
  }, 250);
});

window.addEventListener("pageshow", () => {
  lastViewportWidth = getViewportWidth();
  setStableViewportSize();
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
