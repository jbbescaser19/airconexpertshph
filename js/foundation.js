/* ============================================================
   AIRCON EXPERTS PH – foundation.js (FOUNDATION PARALLAX EFFECTS)
   ============================================================ */

/* ── FOUNDATION PARALLAX ── */
const foundObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("animate-in");
        foundObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".puzzle-container")
  .forEach((c) => foundObserver.observe(c));

if (window.matchMedia("(pointer: fine)").matches) {
  document
    .querySelectorAll(".history-block,.mission-block,.vision-block")
    .forEach((block) => {
      block.addEventListener("mousemove", (e) => {
        const r = block.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / 20,
          y = (e.clientY - r.top - r.height / 2) / 20;
        const img = block.querySelector(".parallax-img, img");
        if (img) img.style.transform = `translate(${x}px,${y}px) scale(1.05)`;
      });
      block.addEventListener("mouseleave", () => {
        const img = block.querySelector(".parallax-img, img");
        if (img) img.style.transform = "translate(0,0) scale(1)";
      });
    });
}
