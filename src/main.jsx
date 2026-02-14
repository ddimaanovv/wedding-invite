import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const setStableViewportHeight = () => {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty("--stable-vh", `${height * 0.01}px`);
};

setStableViewportHeight();

let lastViewportWidth = window.innerWidth;

window.addEventListener(
  "resize",
  () => {
    const widthChanged = Math.abs(window.innerWidth - lastViewportWidth) > 2;
    if (widthChanged) {
      lastViewportWidth = window.innerWidth;
      setStableViewportHeight();
    }
  },
  { passive: true },
);

window.addEventListener("orientationchange", () => {
  setTimeout(setStableViewportHeight, 250);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
