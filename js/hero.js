/* ============================================================
   AIRCON EXPERTS PH – hero.js (INTERACTIVE AC UNIT)
   ============================================================ */

(function () {
  "use strict";

  let isOn = false,
    isMuted = false,
    temp = 22;
  let audioCtx = null,
    noiseNode = null,
    gainNode = null,
    filterNode = null;
  let particleInterval = null;

  const heroSection = document.getElementById("hero");
  const heroBg = document.getElementById("heroBg");
  const particlesEl = document.getElementById("particles");
  const acUnit = document.getElementById("airconUnit");
  const acRemote = document.getElementById("acRemote");
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

  function buildSound() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioCtx.createGain();
      filterNode = audioCtx.createBiquadFilter();
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

  function togglePower() {
    isOn = !isOn;
    acUnit.classList.toggle("is-on", isOn);
    acRemote.classList.toggle("is-on", isOn);
    heroSection.classList.toggle("is-on", isOn);
    powerBtn.classList.toggle("is-on", isOn);
    ledPower.classList.toggle("active", isOn);
    ledMode.classList.toggle("active", isOn);
    setTimeout(() => ledTimer.classList.toggle("active", isOn), 400);
    if (isOn) {
      buildSound();
      startParticles();
      buildAirflowWaves();
      syncTempDisplay();
      airconHint.style.opacity = "0";
      comfortText.textContent = coolWord(temp);
    } else {
      stopSound();
      stopParticles();
      if (acAirflow) acAirflow.innerHTML = "";
      airconHint.style.opacity = "1";
      comfortText.textContent = "Perfect";
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    applyMute();
    soundOnIcon.style.display = isMuted ? "none" : "inline";
    soundOffIcon.style.display = isMuted ? "inline" : "none";
    muteLbl.textContent = isMuted ? "Muted" : "Sound On";
  }

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
    const f = (30 - temp) / 14;
    heroBg.style.background = `radial-gradient(ellipse 110% 90% at 50% 40%,rgba(34,211,238,${0.07 + f * 0.18}) 0%,rgba(37,99,235,${0.04 + f * 0.1}) 40%,transparent 70%)`;
    if (filterNode && audioCtx)
      filterNode.frequency.linearRampToValueAtTime(
        350 + f * 1100,
        audioCtx.currentTime + 0.5,
      );
  }

  function syncTempDisplay() {
    displayTemp.textContent = temp + "°";
    tempValueEl.textContent = temp;
    tempSlider.value = temp;
    updateIntensity();
  }

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
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;bottom:${5 + Math.random() * 25}%;background:radial-gradient(circle,rgba(186,230,253,${alpha}),rgba(34,211,238,${alpha * 0.6}));box-shadow:0 0 ${size * 2}px rgba(34,211,238,${alpha * 0.5});animation-duration:${dur}s;animation-delay:${delay}s;--drift:${drift};`;
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

  function buildAirflowWaves() {
    if (!acAirflow) return;
    acAirflow.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const w = document.createElement("div");
      w.className = "airflow-wave";
      acAirflow.appendChild(w);
    }
  }

  // Event listeners
  if (powerBtn) powerBtn.addEventListener("click", togglePower);
  if (muteBtn) muteBtn.addEventListener("click", toggleMute);
  if (tempUpBtn) tempUpBtn.addEventListener("click", () => setTemp(temp + 1));
  if (tempDownBtn)
    tempDownBtn.addEventListener("click", () => setTemp(temp - 1));
  if (tempSlider)
    tempSlider.addEventListener("input", () => setTemp(+tempSlider.value));

  let tempHold;
  function holdTemp(dir) {
    tempHold = setInterval(() => setTemp(temp + dir), 150);
  }
  function releaseHold() {
    clearInterval(tempHold);
  }

  if (tempUpBtn) {
    tempUpBtn.addEventListener("mousedown", () => holdTemp(1));
    tempUpBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        holdTemp(1);
      },
      { passive: false },
    );
  }
  if (tempDownBtn) {
    tempDownBtn.addEventListener("mousedown", () => holdTemp(-1));
    tempDownBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        holdTemp(-1);
      },
      { passive: false },
    );
  }
  document.addEventListener("mouseup", releaseHold);
  document.addEventListener("touchend", releaseHold);
})();
