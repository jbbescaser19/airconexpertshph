/* ============================================================
   AIRCON EXPERTS PH – main.js (CORE FUNCTIONALITY)
   ============================================================ */

/* ── NAV SCROLL EFFECT ── */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const floatBtnMain = document.getElementById("floatBtnMain");
  const floatMenu = document.getElementById("floatMenu");

  // Nav scroll effect
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () =>
      mobileMenu.classList.toggle("open"),
    );
    document
      .querySelectorAll(".nav__mobile a")
      .forEach((a) =>
        a.addEventListener("click", () => mobileMenu.classList.remove("open")),
      );
  }

  // Floating button menu
  if (floatBtnMain && floatMenu) {
    floatBtnMain.addEventListener("click", () =>
      floatMenu.classList.toggle("open"),
    );
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".float-btn-wrap"))
        floatMenu.classList.remove("open");
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Scroll reveal for elements with data-scroll-reveal
  const revealEls = document.querySelectorAll("[data-scroll-reveal]");
  function checkReveal() {
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60)
        el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", checkReveal, { passive: true });
  checkReveal();

  // Stats counter animation
  const counters = document.querySelectorAll("[data-count]");
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;
    const band = document.querySelector(".stats-band");
    if (!band || band.getBoundingClientRect().top > window.innerHeight) return;
    countersStarted = true;
    counters.forEach((el) => {
      const target = +el.dataset.count;
      const start = performance.now();
      const dur = 1800;
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + "+";
      })(start);
    });
  }
  window.addEventListener("scroll", startCounters, { passive: true });
})();
