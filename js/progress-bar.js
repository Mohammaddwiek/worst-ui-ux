// Lying Progress Bar: races to 99%, drops to 12% ("Estimated time: 3 business years"),
// crawls back to 99%, then autoplays the prank video from config.prankVideoSrc.
// playPrank() is also used by the "I Accept the Terms" button.
WorstUI.modules.progressBar = {
  running: false,
  value: 0,
  crawlTickMs: 400,
  messages: [
    "Reticulating splines…",
    "Deleting your progress…",
    "Consulting the blockchain…",
    "Re-reading your password out loud…",
    "Waiting for manager approval…",
    "Converting to PDF…",
    "Rotating the globe manually…",
  ],

  init() {
    this.section = document.getElementById("progress");
    this.fill = document.getElementById("progress-fill");
    this.status = document.getElementById("progress-status");
    this.overlay = document.getElementById("prank-overlay");
    this.video = document.getElementById("prank");

    this.video.src = WorstUI.config.prankVideoSrc;
    this.video.addEventListener("error", () => (this.videoMissing = true));
    this.video.addEventListener("ended", () => this.finish());
    document.getElementById("prank-close").addEventListener("click", () => this.finish());
  },

  set(value, status) {
    this.value = value;
    this.fill.style.width = `${value}%`;
    if (status) this.status.textContent = status;
  },

  start() {
    if (this.running) return;
    this.running = true;
    this.section.hidden = false;
    this.set(0, "Submitting your synergy…");
    this.animate(0, 99, 1200, () => {
      this.status.textContent = "Almost there…";
      setTimeout(() => {
        this.set(12, "Estimated time: 3 business years");
        setTimeout(() => this.crawl(), 2500);
      }, 2000);
    });
  },

  animate(from, to, ms, done) {
    const t0 = performance.now();
    const frame = (now) => {
      const t = Math.min((now - t0) / ms, 1);
      this.set(from + (to - from) * (1 - (1 - t) ** 3));
      if (t < 1) requestAnimationFrame(frame);
      else done();
    };
    requestAnimationFrame(frame);
  },

  // Slow, jittery climb back to 99% with the occasional step backwards.
  crawl() {
    let ticks = 0;
    const timer = setInterval(() => {
      ticks++;
      let next = this.value + Math.random() * 3 - 0.4;
      if (Math.random() < 0.08) next -= 2 + Math.random() * 3;
      next = Math.max(12, Math.min(99, next));
      const msg = this.messages[Math.floor(ticks / 8) % this.messages.length];
      this.set(next, `${msg} Estimated time: 3 business years`);
      if (next >= 99) {
        clearInterval(timer);
        this.status.textContent = "Done! Preparing your reward…";
        setTimeout(() => this.playPrank(), 800);
      }
    }, this.crawlTickMs);
  },

  playPrank() {
    if (this.videoMissing) {
      const msg = "Prank video not found. Add it at video/prank.mp4.";
      if (!this.running) return WorstUI.modules.toasts.success(msg);
      this.status.textContent = msg;
      setTimeout(() => this.finish(), 3000);
      return;
    }
    this.overlay.hidden = false;
    this.video.currentTime = 0;
    // Autoplay with sound is often blocked this long after the click; fall back to muted.
    this.video.play().catch(() => {
      this.video.muted = true;
      return this.video.play();
    }).catch(() => {});
  },

  finish() {
    this.video.pause();
    this.overlay.hidden = true;
    this.section.hidden = true;
    this.set(0, "");
    this.running = false;
  },
};
