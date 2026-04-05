import { useCallback, useEffect } from "react";

export function useFadeReveal(activeVariantKey) {
  const revealVisibleFadeNodes = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const viewportHeight = window.innerHeight || 0;
    const fadeNodes = Array.from(document.querySelectorAll(".page-content .fade"));

    fadeNodes.forEach((node) => {
      if (node.classList.contains("show")) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;

      if (visibleRatio >= 0.16 || rect.top < viewportHeight * 0.88) {
        node.classList.add("show");
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const fadeNodes = Array.from(document.querySelectorAll(".page-content .fade"));
    fadeNodes.forEach((node) => {
      node.style.removeProperty("transition-delay");
      node.classList.remove("show");
    });

    let observer;

    const revealNode = (node) => {
      if (node.classList.contains("show")) {
        return;
      }

      node.classList.add("show");
      observer?.unobserve(node);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNode(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    fadeNodes.forEach((node, index) => {
      node.style.setProperty("transition-delay", `${Math.min(index * 30, 180)}ms`);
      observer.observe(node);
    });

    const rafId = window.requestAnimationFrame(revealVisibleFadeNodes);
    const timeoutIds = [120, 320, 700].map((delay) =>
      window.setTimeout(revealVisibleFadeNodes, delay),
    );

    const handleScrollOrResize = () => revealVisibleFadeNodes();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    window.addEventListener("pageshow", handleScrollOrResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("pageshow", handleScrollOrResize);
      fadeNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [activeVariantKey, revealVisibleFadeNodes]);
}
