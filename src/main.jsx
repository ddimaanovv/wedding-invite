import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

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

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    setStableViewportSize();
  }, 250);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
