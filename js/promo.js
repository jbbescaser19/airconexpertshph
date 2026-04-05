/* ============================================================
   AIRCON EXPERTS PH – promo.js (PROMO SECTION ANIMATIONS)
   ============================================================ */

/* ── PROMO SECTION ── */
const promoSection = document.getElementById("promoSection");
const promoTempVal = document.getElementById("tempValue");

if (promoSection) {
  const promoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          animateTemperature();
        } else {
          entry.target.classList.remove("active");
          if (promoTempVal) promoTempVal.textContent = "30";
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.3 },
  );
  promoObserver.observe(promoSection);
}

function animateTemperature() {
  let current = 30;
  const target = 16;
  const duration = 2000;
  const step = (current - target) / (duration / 50);
  const timer = setInterval(() => {
    current -= step;
    if (current <= target) {
      current = target;
      clearInterval(timer);
    }
    if (promoTempVal) promoTempVal.textContent = Math.floor(current);
  }, 50);
}
