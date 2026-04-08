import { useEffect } from "react";

export function useFadeReveal(activeVariantKey, isEnabled) {
  useEffect(() => {
    if (
      !isEnabled ||
      typeof window === "undefined" ||
      typeof document === "undefined"
    ) {
      return undefined;
    }

    const fadeNodes = Array.from(document.querySelectorAll(".page-content .fade"));
    fadeNodes.forEach((node) => {
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
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            revealNode(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    fadeNodes.forEach((node) => {
      observer.observe(node);
    });

    return () => {
      fadeNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [activeVariantKey, isEnabled]);
}
