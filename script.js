/* ============================================================
   AIRCON EXPERTS PH – script.js
   Sound starts/stops with the POWER button.
   Mute button only silences/un-silences volume.
   ============================================================ */
(function () {
  "use strict";

  /* ── STATE ── */
  let isOn = false;
  let isMuted = false;
  let temp = 22;

  /* Audio nodes */
  let audioCtx = null;
  let noiseNode = null;
  let gainNode = null;
  let filterNode = null;

  /* Animation intervals */
  let particleInterval = null;
  let airflowInterval = null;

  /* ── DOM ── */
  const heroSection = document.getElementById("hero");
  const heroBg = document.getElementById("heroBg");
  const particlesEl = document.getElementById("particles");
  const acUnit = document.getElementById("airconUnit"); // .ac
  const acRemote = document.getElementById("acRemote"); // .ac-remote
  const powerBtn = document.getElementById("powerBtn");
  const tempSlider = document.getElementById("tempSlider");
  const tempValueEl = document.getElementById("tempValue");
  const displayTemp = document.getElementById("displayTemp");
  const tempUpBtn = document.getElementById("tempUp");
  const tempDownBtn = document.getElementById("tempDown");
  const muteBtn = document.getElementById("muteBtn");
  const soundOnIcon = document.getElementById("soundOnIcon");
  const soundOffIcon = document.getElementById("soundOffIcon");
  const muteLbl = document.getElementById("muteBtnLabel");
  const airconHint = document.getElementById("airconHint");
  const acAirflow = document.getElementById("acAirflow");
  const comfortText = document.getElementById("comfortText");
  const ledPower = document.getElementById("ledPower");
  const ledMode = document.getElementById("ledMode");
  const ledTimer = document.getElementById("ledTimer");
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const floatBtnMain = document.getElementById("floatBtnMain");
  const floatMenu = document.getElementById("floatMenu");

  /* ============================================================
     AUDIO  –  Web Audio API pink-noise aircon hum
     Only created when power ON, destroyed when power OFF.
  ============================================================ */
  function buildSound() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioCtx.createGain();
      filterNode = audioCtx.createBiquadFilter();

      /* Build pink-ish noise buffer (3-second loop) */
      const sr = audioCtx.sampleRate;
      const buf = audioCtx.createBuffer(1, sr * 3, sr);
      const d = buf.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < d.length; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856;
        b4 = 0.55 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buf;
      noiseNode.loop = true;

      filterNode.type = "lowpass";
      filterNode.frequency.value = 700;
      filterNode.Q.value = 0.4;

      gainNode.gain.value = 0;

      noiseNode.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      noiseNode.start(0);

      /* Fade in */
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        isMuted ? 0 : 0.2,
        audioCtx.currentTime + 1.4,
      );
    } catch (e) {
      console.warn("Web Audio unavailable:", e);
    }
  }

  function stopSound() {
    if (!audioCtx) return;
    try {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.7);
      setTimeout(() => {
        try {
          noiseNode.stop();
        } catch (e) {}
        try {
          audioCtx.close();
        } catch (e) {}
        audioCtx = noiseNode = gainNode = filterNode = null;
      }, 800);
    } catch (e) {
      audioCtx = noiseNode = gainNode = filterNode = null;
    }
  }

  function applyMute() {
    if (!gainNode || !audioCtx) return;
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      isMuted ? 0 : 0.2,
      audioCtx.currentTime + 0.3,
    );
  }

  /* ============================================================
     POWER TOGGLE
  ============================================================ */
  function togglePower() {
    isOn = !isOn;

    /* Unit + hero state */
    acUnit.classList.toggle("is-on", isOn);
    acRemote.classList.toggle("is-on", isOn);
    heroSection.classList.toggle("is-on", isOn);
    powerBtn.classList.toggle("is-on", isOn);

    /* LEDs */
    ledPower.classList.toggle("active", isOn);
    ledMode.classList.toggle("active", isOn);
    setTimeout(() => ledTimer.classList.toggle("active", isOn), 400);

    if (isOn) {
      buildSound();
      startParticles();
      startAirflow();
      syncTempDisplay();
      airconHint.style.opacity = "0";
      comfortText.textContent = coolWord(temp);
    } else {
      stopSound();
      stopParticles();
      stopAirflow();
      airconHint.style.opacity = "1";
      comfortText.textContent = "Perfect";
    }
  }

  /* ============================================================
     MUTE  –  only volume, NOT power
  ============================================================ */
  function toggleMute() {
    isMuted = !isMuted;
    applyMute();
    soundOnIcon.style.display = isMuted ? "none" : "inline";
    soundOffIcon.style.display = isMuted ? "inline" : "none";
    muteLbl.textContent = isMuted ? "Muted" : "Sound On";
  }

  /* ============================================================
     TEMPERATURE
  ============================================================ */
  function setTemp(v) {
    temp = Math.min(30, Math.max(16, v));
    tempSlider.value = temp;
    tempValueEl.textContent = temp;
    displayTemp.textContent = temp + "°";
    if (isOn) {
      comfortText.textContent = coolWord(temp);
      updateIntensity();
    }
  }

  function coolWord(t) {
    if (t <= 17) return "Freezing!";
    if (t <= 19) return "Ice Cold";
    if (t <= 22) return "Cool";
    if (t <= 24) return "Perfect";
    if (t <= 27) return "Mild";
    return "Warm";
  }

  function updateIntensity() {
    if (!isOn) return;
    const f = (30 - temp) / 14; // 0 (warm) → 1 (cold)
    heroBg.style.background = `radial-gradient(ellipse 110% 90% at 50% 40%,
        rgba(34,211,238,${0.07 + f * 0.18}) 0%,
        rgba(37,99,235,${0.04 + f * 0.1}) 40%,
        transparent 70%)`;
    if (filterNode && audioCtx) {
      filterNode.frequency.linearRampToValueAtTime(
        350 + f * 1100,
        audioCtx.currentTime + 0.5,
      );
    }
  }

  function syncTempDisplay() {
    displayTemp.textContent = temp + "°";
    tempValueEl.textContent = temp;
    tempSlider.value = temp;
    updateIntensity();
  }

  /* ============================================================
     PARTICLES  –  floating cool-air bubbles
  ============================================================ */
  function spawnParticle() {
    if (!isOn) return;
    const f = (30 - temp) / 14;
    const count = Math.ceil(f * 3) + 1;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 4 + Math.random() * (5 + f * 7);
      const left = 20 + Math.random() * 60;
      const dur = 5 + Math.random() * 6;
      const delay = Math.random() * 2;
      const drift = (Math.random() - 0.5) * 100 + "px";
      const alpha = 0.25 + f * 0.4;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${left}%;bottom:${5 + Math.random() * 25}%;
        background:radial-gradient(circle,rgba(186,230,253,${alpha}),rgba(34,211,238,${alpha * 0.6}));
        box-shadow:0 0 ${size * 2}px rgba(34,211,238,${alpha * 0.5});
        animation-duration:${dur}s;animation-delay:${delay}s;
        --drift:${drift};
      `;
      particlesEl.appendChild(p);
      setTimeout(() => p.remove(), (dur + delay) * 1000);
    }
  }

  function startParticles() {
    spawnParticle();
    particleInterval = setInterval(spawnParticle, 500);
  }

  function stopParticles() {
    clearInterval(particleInterval);
    particleInterval = null;
    particlesEl.innerHTML = "";
  }

  /* ============================================================
     AIRFLOW WAVES  –  below AC louver
  ============================================================ */
  function buildAirflowWaves() {
    if (!acAirflow) return;
    acAirflow.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const w = document.createElement("div");
      w.className = "airflow-wave";
      acAirflow.appendChild(w);
    }
  }

  function startAirflow() {
    buildAirflowWaves();
  }

  function stopAirflow() {
    if (acAirflow) acAirflow.innerHTML = "";
  }

  /* ============================================================
     EVENT LISTENERS
  ============================================================ */
  powerBtn.addEventListener("click", togglePower);
  muteBtn.addEventListener("click", toggleMute);

  tempUpBtn.addEventListener("click", () => setTemp(temp + 1));
  tempDownBtn.addEventListener("click", () => setTemp(temp - 1));
  tempSlider.addEventListener("input", () => setTemp(+tempSlider.value));

  /* Mobile touch-hold for temp buttons */
  let tempHold;
  function holdTemp(dir) {
    tempHold = setInterval(() => setTemp(temp + dir), 150);
  }
  function releaseHold() {
    clearInterval(tempHold);
  }
  tempUpBtn.addEventListener("mousedown", () => holdTemp(1));
  tempDownBtn.addEventListener("mousedown", () => holdTemp(-1));
  tempUpBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      holdTemp(1);
    },
    { passive: false },
  );
  tempDownBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      holdTemp(-1);
    },
    { passive: false },
  );
  document.addEventListener("mouseup", releaseHold);
  document.addEventListener("touchend", releaseHold);

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  const revealEls = document.querySelectorAll("[data-scroll-reveal]");
  function checkReveal() {
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60)
        el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", checkReveal, { passive: true });
  checkReveal();

  /* ============================================================
     NAV SCROLL STYLE
  ============================================================ */
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
      checkReveal();
      startCounters();
    },
    { passive: true },
  );

  /* ============================================================
     ANIMATED COUNTERS
  ============================================================ */
  const counters = document.querySelectorAll("[data-count]");
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;
    const band = document.querySelector(".stats-band");
    if (!band) return;
    if (band.getBoundingClientRect().top > window.innerHeight) return;
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

  /* ============================================================
     HAMBURGER
  ============================================================ */
  hamburger.addEventListener("click", () =>
    mobileMenu.classList.toggle("open"),
  );
  document
    .querySelectorAll(".nav__mobile a")
    .forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("open")),
    );

  /* ============================================================
     FLOATING CHAT BUTTON
  ============================================================ */
  floatBtnMain.addEventListener("click", () =>
    floatMenu.classList.toggle("open"),
  );
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".float-btn-wrap"))
      floatMenu.classList.remove("open");
  });

  /* ============================================================
     SMOOTH SCROLL
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

/*
!poster script
*/
// Generate floating particles
const particlesContainer = document.getElementById("particles");
const particleCount = 25;

function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 10 + 4;
  const left = Math.random() * 100;
  const duration = Math.random() * 8 + 12;
  const delay = Math.random() * 5;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${left}%`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;

  particlesContainer.appendChild(particle);
}

for (let i = 0; i < particleCount; i++) {
  createParticle();
}

// Intersection Observer for scroll-triggered animations
const promoSection = document.getElementById("promoSection");
const tempValue = document.getElementById("tempValue");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // Animate temperature dropping from 30 to 16
      animateTemperature();
    } else {
      entry.target.classList.remove("active");
      // Reset temperature
      tempValue.textContent = "30";
    }
  });
}, observerOptions);

observer.observe(promoSection);

// Temperature animation function
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
    tempValue.textContent = Math.floor(current);
  }, 50);
}
/**
 *!foundations
 */
// Intersection Observer for scroll animations
const observerOptions1 = {
  threshold: 0.2,
  rootMargin: "0px",
};

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions1);

document.querySelectorAll(".puzzle-container").forEach((container) => {
  observer.observe(container);
});

// Parallax effect on mouse move for desktop
if (window.matchMedia("(pointer: fine)").matches) {
  document
    .querySelectorAll(".history-block, .mission-block, .vision-block")
    .forEach((block) => {
      block.addEventListener("mousemove", (e) => {
        const rect = block.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;

        const img = block.querySelector(".parallax-img, img");
        if (img) {
          img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        }
      });

      block.addEventListener("mouseleave", () => {
        const img = block.querySelector(".parallax-img, img");
        if (img) {
          img.style.transform = "translate(0, 0) scale(1)";
        }
      });
    });
}

/**
 *!products
 */
// ── PRODUCT DATA WITH VARIANTS ────────────────────────────────
// Each product has variants[] array. Each variant = one HP option.
// Shared fields: brand, name, icon, badges, features
// Per-variant fields: label, spec, srp, price, discount, image (optional)

const products = [
  // ── DAIKIN ────────────────────────────────────────────────
  {
    id: "daikin-amihan",
    brand: "Daikin",
    name: "Amihan Series",
    icon: "🌬",
    section: "daikin",
    badges: [
      '<span class="badge badge--bestseller">⭐ Best Seller</span>',
      '<span class="badge badge--energy">🌿 Energy Saving</span>',
    ],
    features: [
      "Professional Installation Included",
      "R32 Eco-Friendly Refrigerant",
      "Anti-Bacterial Filter",
      "1-Year Unit Warranty",
      "60-Day Installation Warranty",
      "Free Check-up (1st Year)",
    ],
    variants: [
      {
        label: "0.8HP",
        spec: "FTKE20AVA · 0.8HP Inverter Split Type · R32 · 2.0kW Cooling",
        srp: "₱30,600",
        price: "₱22,800",
        discount: "-20% OFF",
        image: "images/daikin/amihan0.8.png",
      },
      {
        label: "1.0HP",
        spec: "FTKE25AVA · 1.0HP Inverter Split Type · R32 · 2.5kW Cooling",
        srp: "₱33,600",
        price: "₱26,880",
        discount: "-20% OFF",
        image: "images/daikin/amihan0.8.png",
      },
      {
        label: "1.5HP",
        spec: "FTKE35AVA · 1.5HP Inverter Split Type · R32 · 3.5kW Cooling",
        srp: "₱38,900",
        price: "₱31,120",
        discount: "-20% OFF",
        image: "images/daikin/amihan0.8.png",
      },
      {
        label: "2.0HP",
        spec: "FTKE50AVA · 2.0HP Inverter Split Type · R32 · 5.0kW Cooling",
        srp: "₱48,500",
        price: "₱38,800",
        discount: "-20% OFF",
        image: "images/daikin/amihan0.8.png",
      },
    ],
  },
  {
    id: "daikin-dsmart",
    brand: "Daikin",
    name: "D-Smart Series",
    icon: "d",
    section: "daikin",
    badges: [
      '<span class="badge badge--inverter">⚡ Inverter</span>',
      '<span class="badge badge--popular">🔥 Popular</span>',
    ],
    features: [
      "Professional Installation Included",
      "Self-Cleaning Indoor Unit",
      "Wi-Fi Smart App Control",
      "Inverter Technology (60% Energy Savings)",
      "2-Year Unit Warranty",
      "Flash Steamer Technology",
    ],
    variants: [
      {
        label: "1.0HP",
        spec: "FTKF25CVM · 1.0HP Inverter · Self-Cleaning · Wi-Fi Ready · R32",
        srp: "₱36,000",
        price: "₱27,000",
        discount: "-25% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "1.5HP",
        spec: "FTKF35CVM · 1.5HP Inverter · Self-Cleaning · Wi-Fi Ready · R32",
        srp: "₱42,000",
        price: "₱31,500",
        discount: "-25% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "2.0HP",
        spec: "FTKF50CVM · 2.0HP Inverter · Self-Cleaning · Wi-Fi Ready · R32",
        srp: "₱52,000",
        price: "₱39,000",
        discount: "-25% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "2.5HP",
        spec: "FTKF60CVM · 2.5HP Inverter · Self-Cleaning · Wi-Fi Ready · R32",
        srp: "₱62,000",
        price: "₱46,500",
        discount: "-25% OFF",
        image: "images/daikin/dSmart.png",
      },
    ],
  },
  {
    id: "daikin-dsmart-queen",
    brand: "Daikin",
    name: "D-Smart Queen",
    icon: "👑",
    section: "daikin",
    badges: [
      '<span class="badge badge--inverter">⚡ Inverter</span>',
      '<span class="badge badge--new">✨ Premium</span>',
    ],
    features: [
      "Professional Installation Included",
      "Coanda Airflow Technology",
      "Titanium Apatite Air Purifier",
      "PM 2.5 Filter Built-In",
      "3-Year Unit Warranty",
      "Daikin Smart App Compatible",
    ],
    variants: [
      {
        label: "1.5HP",
        spec: "FTKQ35AVL · 1.5HP Inverter · Coanda Airflow · Air Purification · R32",
        srp: "₱48,000",
        price: "₱37,440",
        discount: "-22% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
      {
        label: "2.0HP",
        spec: "FTKQ50AVL · 2.0HP Inverter · Coanda Airflow · Air Purification · R32",
        srp: "₱58,000",
        price: "₱45,240",
        discount: "-22% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
      {
        label: "2.5HP",
        spec: "FTKQ60AVL · 2.5HP Inverter · Coanda Airflow · Air Purification · R32",
        srp: "₱70,000",
        price: "₱54,600",
        discount: "-22% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
    ],
  },
  {
    id: "daikin-dsmart-king",
    brand: "Daikin",
    name: "D-Smart King",
    icon: "🏆",
    section: "daikin",
    badges: [
      '<span class="badge badge--inverter">⚡ Inverter</span>',
      '<span class="badge badge--limited">💎 Limited</span>',
    ],
    features: [
      "Professional Installation Included",
      "Multi-Fan Speed Control",
      "Inverter Compressor Tech",
      "Energy Star 5-Star Rated",
      "3-Year Unit Warranty",
      "Smart Diagnosis System",
    ],
    variants: [
      {
        label: "2.0HP",
        spec: "FTKP50AVL · 2.0HP Inverter · 5-Star Energy · Multi-Fan Speeds · R32",
        srp: "₱62,000",
        price: "₱50,840",
        discount: "-18% OFF",
        image: "images/daikin/dsmartKing.png",
      },
      {
        label: "2.5HP",
        spec: "FTKP60AVL · 2.5HP Inverter · 5-Star Energy · Multi-Fan Speeds · R32",
        srp: "₱72,000",
        price: "₱59,040",
        discount: "-18% OFF",
        image: "images/daikin/dsmartKing.png",
      },
      {
        label: "3.0HP",
        spec: "FTKP71AVL · 3.0HP Inverter · 5-Star Energy · Multi-Fan Speeds · R32",
        srp: "₱88,000",
        price: "₱72,160",
        discount: "-18% OFF",
        image: "images/daikin/dsmartKing.png",
      },
    ],
  },

  // ── MIDEA SPLIT TYPE ──────────────────────────────────────
  {
    id: "midea-msbc",
    brand: "Midea",
    name: "Midea Split Type",
    icon: "❄",
    section: "midea",
    badges: [
      '<span class="badge badge--popular">🔥 Popular</span>',
      '<span class="badge badge--energy">🌿 Efficient</span>',
    ],
    features: [
      "Professional Installation Included",
      "Turbo Cool Mode",
      "Anti-Bacterial Silver Ion Filter",
      "Self-Cleaning Mode",
      "Auto-Restart After Power Cut",
      "2-Year Unit Warranty",
    ],
    variants: [
      {
        label: "1.0HP",
        spec: "MSBC-09CRN8 · 1.0HP Non-Inverter · R410A · Turbo Cool Mode",
        srp: "₱18,500",
        price: "₱15,725",
        discount: "-15% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "1.5HP",
        spec: "MSBC-12CRN8 · 1.5HP Non-Inverter · Self-Cleaning · Anti-Bacterial Filter",
        srp: "₱22,000",
        price: "₱17,600",
        discount: "-20% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "2.0HP",
        spec: "MSBC-18CRN8 · 2.0HP Inverter · Smart App Control · Night Mode",
        srp: "₱30,000",
        price: "₱24,600",
        discount: "-18% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "2.5HP",
        spec: "MSBC-24CRN8 · 2.5HP Inverter · Dual Fan Speed · R32 Eco Refrigerant",
        srp: "₱39,000",
        price: "₱30,420",
        discount: "-22% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "3.0HP",
        spec: "MSBC-30CRN8 · 3.0HP Inverter · Powerful Cooling · Large Room Coverage",
        srp: "₱52,000",
        price: "₱39,000",
        discount: "-25% OFF",
        image: "images/midea/midea.png",
      },
    ],
  },

  // ── CARRIER SPLIT TYPE ────────────────────────────────────
  {
    id: "carrier-nexus",
    brand: "Carrier",
    name: "Nexus",
    icon: "🌬",
    section: "carrier",
    badges: ['<span class="badge badge--popular">🔥 Popular</span>'],
    features: [
      "Professional Installation Included",
      "4-Way Auto Swing",
      "Ultra-Quiet 32dB Operation",
      "Auto Restart & Self-Diagnosis",
      "1-Year Unit Warranty",
      "High-Density Filter",
    ],
    variants: [
      {
        label: "1.0HP",
        spec: "53KHCT010-703 · 1.0HP Non-Inverter · Quiet Operation · 4-Way Airflow · R410A",
        srp: "₱23,000",
        price: "₱18,400",
        discount: "-20% OFF",
        image: "images/carrier/nexus.png",
      },
      {
        label: "1.5HP",
        spec: "53KHCT015-703 · 1.5HP Non-Inverter · Quiet Operation · 4-Way Airflow · R410A",
        srp: "₱28,500",
        price: "₱22,800",
        discount: "-20% OFF",
        image: "images/carrier/nexus.png",
      },
      {
        label: "2.0HP",
        spec: "53KHCT020-703 · 2.0HP Non-Inverter · Quiet Operation · 4-Way Airflow · R410A",
        srp: "₱36,000",
        price: "₱28,800",
        discount: "-20% OFF",
        image: "images/carrier/nexus.png",
      },
    ],
  },
  {
    id: "carrier-optima",
    brand: "Carrier",
    name: "Optima",
    icon: "❄",
    section: "carrier",
    badges: [
      '<span class="badge badge--bestseller">⭐ Best Seller</span>',
      '<span class="badge badge--energy">🌿 Eco</span>',
    ],
    features: [
      "Professional Installation Included",
      "Smart Sleep Comfort Mode",
      "Auto Restart Technology",
      "I-Comfort System",
      "1-Year Unit Warranty",
      "Golden Fin Coil Protection",
    ],
    variants: [
      {
        label: "1.0HP",
        spec: "53KHCT010S · 1.0HP Non-Inverter · Sleep Mode · Auto Restart · R410A",
        srp: "₱22,000",
        price: "₱16,500",
        discount: "-25% OFF",
        image: "images/carrier/optima.png",
      },
      {
        label: "1.5HP",
        spec: "53KHCT015S · 1.5HP Non-Inverter · Sleep Mode · Auto Restart · R410A",
        srp: "₱28,000",
        price: "₱21,000",
        discount: "-25% OFF",
        image: "images/carrier/optima.png",
      },
      {
        label: "2.0HP",
        spec: "53KHCT020S · 2.0HP Non-Inverter · Sleep Mode · Auto Restart · R410A",
        srp: "₱36,500",
        price: "₱27,375",
        discount: "-25% OFF",
        image: "images/carrier/optima.png",
      },
    ],
  },
  {
    id: "carrier-aura",
    brand: "Carrier",
    name: "Aura Inverter",
    icon: "🏠",
    section: "carrier",
    badges: [
      '<span class="badge badge--new">✨ New</span>',
      '<span class="badge badge--inverter">⚡ Inverter</span>',
    ],
    features: [
      "Professional Installation Included",
      "Built-In Air Purifier",
      "19dB Ultra-Silent Mode",
      "Inverter Compressor",
      "3-Year Unit Warranty",
      "PM 2.5 Sensor Display",
    ],
    variants: [
      {
        label: "1.5HP",
        spec: "FCARN015EE · 1.5HP Inverter · Air Purifier Built-In · Silent at 19dB · R32",
        srp: "₱38,000",
        price: "₱29,640",
        discount: "-22% OFF",
        image: "images/carrier/aura.png",
      },
      {
        label: "2.0HP",
        spec: "FCARN020EE · 2.0HP Inverter · Air Purifier Built-In · Silent at 19dB · R32",
        srp: "₱46,000",
        price: "₱35,880",
        discount: "-22% OFF",
        image: "images/carrier/aura.png",
      },
      {
        label: "2.5HP",
        spec: "FCARN025EE · 2.5HP Inverter · Air Purifier Built-In · Silent at 19dB · R32",
        srp: "₱56,000",
        price: "₱43,680",
        discount: "-22% OFF",
        image: "images/carrier/aura.png",
      },
    ],
  },

  // ── FLOOR MOUNTED (CARRIER) ───────────────────────────────
  {
    id: "carrier-floor",
    brand: "Carrier",
    name: "Floor Mounted",
    icon: "🔷",
    section: "floormount",
    badges: [
      '<span class="badge badge--bestseller">⭐ Best Seller</span>',
      '<span class="badge badge--inverter">⚡ Inverter</span>',
    ],
    features: [
      "Professional Installation Included",
      "360° Floor-Level Airflow",
      "5-Speed Fan Control",
      "Auto Horizontal Swing",
      "Commercial-Grade Build",
      "3-Year Unit Warranty",
    ],
    variants: [
      {
        label: "2.0HP",
        spec: "FCFLH020EE · 2.0HP Floor-Standing · 360° Airflow · R410A",
        srp: "₱55,000",
        price: "₱45,100",
        discount: "-18% OFF",
        image: "images/carrier/mounted.png",
      },
      {
        label: "3.0HP",
        spec: "FCFLH030EE · 3.0HP Inverter · Heavy Duty · Auto Swing · 5-Speed Fan",
        srp: "₱75,000",
        price: "₱58,500",
        discount: "-22% OFF",
        image: "images/carrier/mounted.png",
      },
      {
        label: "5.0HP",
        spec: "FCFLH050EE · 5.0HP Inverter · Commercial Grade · Smart Diagnostics",
        srp: "₱120,000",
        price: "₱96,000",
        discount: "-20% OFF",
        image: "images/carrier/mounted.png",
      },
    ],
  },
];

// ── SECTIONS CONFIG ───────────────────────────────────────────
const sections = [
  {
    id: "daikin",
    label: "Premium Inverter Technology",
    title: '<span class="brand-logo">DAIKIN</span> Series',
    sub: "Japan's #1 air conditioning brand — unmatched efficiency & comfort",
    info: ["🏆 Best Seller", "⚡ Inverter Tech"],
  },
  {
    id: "midea",
    label: "Value for Money · Smart Cooling",
    title: '<span class="brand-logo">MIDEA</span> Split Type',
    sub: "Reliable performance, proven technology — perfect for every budget",
    info: ["💰 Best Value", "🛡 2-Year Warranty"],
  },
  {
    id: "carrier",
    label: "American Legacy · Global Trust",
    title: '<span class="brand-logo">CARRIER</span> Split Type',
    sub: "115 years of innovation — where cooling meets quiet luxury",
    info: ["🏅 Trusted Brand", "🔇 Ultra-Quiet"],
  },
  {
    id: "floormount",
    label: "Heavy-Duty · Commercial Grade",
    title: '<span class="brand-logo">CARRIER</span> Floor Mounted',
    sub: "Powerful floor-standing units for large spaces — offices, showrooms, and more",
    info: ["🏢 Commercial", "💪 High Power"],
  },
];

// ── ACTIVE VARIANT STATE per card ────────────────────────────
const activeVariant = {}; // productId -> variantIndex

// ── BUILD CATALOG ─────────────────────────────────────────────
function buildCatalog() {
  const main = document.getElementById("catalog-main");
  let html = "";

  sections.forEach((sec, si) => {
    const secProducts = products.filter((p) => p.section === sec.id);
    if (!secProducts.length) return;

    // init active variant
    secProducts.forEach((p) => {
      activeVariant[p.id] = 0;
    });

    const divider = si > 0 ? '<div class="section-divider"></div>' : "";
    html += `
          ${divider}
          <section id="${sec.id}" class="cat-section">
            <div class="cat-section__header observe-me">
              <div class="cat-section__left">
                <div class="cat-section__label">${sec.label}</div>
                <h2 class="cat-section__title">${sec.title}</h2>
                <p class="cat-section__sub">${sec.sub}</p>
              </div>
              <div class="cat-section__info">
                ${sec.info.map((i) => `<span>${i}</span>`).join("")}
              </div>
            </div>
            <div class="product-grid">
              ${secProducts.map((p) => buildCard(p)).join("")}
            </div>
          </section>
        `;
  });

  main.innerHTML = html;
}

function buildCard(p) {
  const v = p.variants[0];
  const variantBtns = p.variants
    .map(
      (vr, i) =>
        `<button class="variant-btn${i === 0 ? " active" : ""}"
          onclick="event.stopPropagation(); selectVariant('${p.id}', ${i}, this)">${vr.label}</button>`,
    )
    .join("");

  const imgHtml = v.image
    ? `<img src="${v.image}" alt="${p.name}" />`
    : `<div class="card__img-placeholder">${p.icon}</div>`;

  return `
        <div class="product-card" id="card-${p.id}" onclick="openModal('${p.id}')">
          <div class="card__img-wrap">
            <div class="card__badges">${p.badges.join("")}</div>
            <div class="card__discount-badge" id="card-disc-${p.id}">${v.discount}</div>
            <div id="card-img-${p.id}">${imgHtml}</div>
          </div>
          <div class="card__body">
            <div class="card__brand">${p.brand}</div>
            <div class="card__name">${p.name}</div>
            <div class="card__spec" id="card-spec-${p.id}">${v.spec}</div>
            <div class="card__variants">${variantBtns}</div>
            <div class="card__pricing">
              <div class="card__srp" id="card-srp-${p.id}">${v.srp}</div>
              <div class="card__price-row">
                <div class="card__price" id="card-price-${p.id}">${v.price}</div>
                <div class="card__savings" id="card-save-${p.id}">Save ${calcSave(v.srp, v.price)}</div>
              </div>
            </div>
          </div>
          <div class="card__cta">👁 View Details →</div>
        </div>
      `;
}

function calcSave(srp, price) {
  const s = parseInt(srp.replace(/[^0-9]/g, ""));
  const p = parseInt(price.replace(/[^0-9]/g, ""));
  return "₱" + (s - p).toLocaleString();
}

function selectVariant(productId, variantIndex, btn) {
  const p = products.find((x) => x.id === productId);
  if (!p) return;
  activeVariant[productId] = variantIndex;
  const v = p.variants[variantIndex];

  // update card
  document.getElementById(`card-spec-${productId}`).textContent = v.spec;
  document.getElementById(`card-srp-${productId}`).textContent = v.srp;
  document.getElementById(`card-price-${productId}`).textContent = v.price;
  document.getElementById(`card-save-${productId}`).textContent =
    "Save " + calcSave(v.srp, v.price);
  document.getElementById(`card-disc-${productId}`).textContent = v.discount;

  // update card image
  const imgWrap = document.getElementById(`card-img-${productId}`);
  if (v.image) {
    imgWrap.innerHTML = `<img src="${v.image}" alt="${p.name}" />`;
  } else {
    imgWrap.innerHTML = `<div class="card__img-placeholder">${p.icon}</div>`;
  }

  // update active button state
  const card = document.getElementById(`card-${productId}`);
  card.querySelectorAll(".variant-btn").forEach((b, i) => {
    b.classList.toggle("active", i === variantIndex);
  });
}

// ── MODAL ─────────────────────────────────────────────────────
let currentModalProduct = null;

function openModal(productId) {
  const p = products.find((x) => x.id === productId);
  if (!p) return;
  currentModalProduct = p;
  const vi = activeVariant[productId] || 0;
  renderModal(p, vi);
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderModal(p, vi) {
  const v = p.variants[vi];
  document.getElementById("modal-brand").textContent = p.brand;
  document.getElementById("modal-img-brand").textContent = p.brand;
  document.getElementById("modal-name").textContent = p.name;
  document.getElementById("modal-spec").textContent = v.spec;
  document.getElementById("modal-price").textContent = v.price;
  document.getElementById("modal-srp").textContent = v.srp;
  document.getElementById("modal-discount").textContent = v.discount;
  document.getElementById("modal-img-discount").textContent = v.discount;

  // modal image
  const modalImg = document.getElementById("modal-img");
  if (v.image) {
    modalImg.innerHTML = `<img src="${v.image}" alt="${p.name}" />`;
  } else {
    modalImg.textContent = p.icon;
  }

  // modal variant buttons
  const row = document.getElementById("modal-variants-row");
  row.innerHTML = p.variants
    .map(
      (vr, i) =>
        `<button class="modal__variant-btn${i === vi ? " active" : ""}"
          onclick="switchModalVariant(${i})">${vr.label}</button>`,
    )
    .join("");

  // hide variant selector if only 1 variant
  document.getElementById("modal-variants-block").style.display =
    p.variants.length > 1 ? "block" : "none";

  // features
  const grid = document.getElementById("modal-features");
  grid.innerHTML = p.features
    .map(
      (f) =>
        `<div class="modal__feature-item"><span class="modal__feature-check">✓</span>${f}</div>`,
    )
    .join("");
}

function switchModalVariant(vi) {
  if (!currentModalProduct) return;
  const p = currentModalProduct;
  activeVariant[p.id] = vi;
  const v = p.variants[vi];

  // update modal display
  document.getElementById("modal-spec").textContent = v.spec;
  document.getElementById("modal-price").textContent = v.price;
  document.getElementById("modal-srp").textContent = v.srp;
  document.getElementById("modal-discount").textContent = v.discount;
  document.getElementById("modal-img-discount").textContent = v.discount;

  const modalImg = document.getElementById("modal-img");
  if (v.image) {
    modalImg.innerHTML = `<img src="${v.image}" alt="${p.name}" />`;
  } else {
    modalImg.textContent = p.icon;
  }

  document.querySelectorAll(".modal__variant-btn").forEach((b, i) => {
    b.classList.toggle("active", i === vi);
  });

  // also sync the card if visible
  selectVariant(p.id, vi, null);
  const card = document.getElementById(`card-${p.id}`);
  if (card) {
    card.querySelectorAll(".variant-btn").forEach((b, i) => {
      b.classList.toggle("active", i === vi);
    });
  }
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}
function closeModalOutside(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ── SCROLL SPY ─────────────────────────────────────────────────
const sectionIds = ["daikin", "midea", "carrier", "floormount"];
window.addEventListener("scroll", () => {
  const navH =
    document.getElementById("cat-nav").offsetHeight +
    document.querySelector(".catalog-topbar").offsetHeight +
    30;
  let current = sectionIds[0];
  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - navH) current = id;
  });
  document.querySelectorAll(".cat-nav__item").forEach((btn, i) => {
    btn.classList.toggle("active", sectionIds[i] === current);
  });
});

// ── INTERSECTION OBSERVER ─────────────────────────────────────
const observer2 = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    }),
  { threshold: 0.12 },
);

// ── INIT ──────────────────────────────────────────────────────
buildCatalog();
document.querySelectorAll(".observe-me").forEach((el) => observer2.observe(el));
// observe after build
setTimeout(() => {
  document
    .querySelectorAll(".observe-me")
    .forEach((el) => observer2.observe(el));
}, 100);

/*
!logos
 */
const brands = [
  {
    name: "Daikin",
    logo: "daikin.png",
  },
  {
    name: "Midea",
    logo: "midea.png",
  },
  {
    name: "Carrier",
    logo: "carrier.png",
  },
];

function initMarquee() {
  const track = document.getElementById("marqueeTrack");

  let content = "";

  // Repeat logos for better spacing
  for (let i = 0; i < 4; i++) {
    content += brands
      .map(
        (brand) => `
          <div class="brand-card">
            <img src="${brand.logo}" alt="${brand.name}" class="brand-logo" loading="lazy">
          </div>
        `,
      )
      .join("");
  }

  // Duplicate for seamless loop
  track.innerHTML = content + content;
}

initMarquee();
