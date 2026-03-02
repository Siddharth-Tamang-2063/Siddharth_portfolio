import { useEffect } from "react";

/**
 * useReveal
 * Attaches an IntersectionObserver to all .sr, .srl, .srr, .srs elements
 * and adds the ".in" class when they enter the viewport.
 * Supports a data-d attribute (seconds) for staggered delays.
 */
const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.d || 0) * 1000;
            setTimeout(() => entry.target.classList.add("in"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".sr, .srl, .srr, .srs")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
};

export default useReveal;