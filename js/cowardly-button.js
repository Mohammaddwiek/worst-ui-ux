// Cowardly Submit Button: flees within config.fleeRadius, speeds up once caught,
// click cycles "Submit" -> "Are you sure?" -> "Are you really sure?" -> "Submit".
// Completing the cycle "submits", which starts the lying progress bar.
WorstUI.modules.cowardlyButton = {
  labels: ["Submit", "Are you sure?", "Are you really sure?"],
  step: 0,
  speed: 1,
  maxSpeed: 5,
  margin: 8,
  offset: { x: 0, y: 0 },

  init() {
    this.btn = document.getElementById("submit");
    document.addEventListener("mousemove", (e) => this.flee(e.clientX, e.clientY));
    this.btn.addEventListener("mouseenter", () => this.caught());
    // Touch has no hover to flee from, so dodge most taps instead.
    this.btn.addEventListener("touchstart", (e) => {
      if (WorstUI.isPanic() || Math.random() < 0.3) return;
      e.preventDefault();
      this.caught();
      this.teleport();
    }, { passive: false });
    this.btn.addEventListener("click", () => this.cycle());
  },

  flee(px, py) {
    if (WorstUI.isPanic()) return;
    const r = this.btn.getBoundingClientRect();
    // Distance from the pointer to the nearest point on the button.
    const nx = Math.max(r.left, Math.min(px, r.right));
    const ny = Math.max(r.top, Math.min(py, r.bottom));
    const dist = Math.hypot(px - nx, py - ny);
    const radius = WorstUI.config.fleeRadius;
    if (dist >= radius) return;

    const vx = r.left + r.width / 2 - px;
    const vy = r.top + r.height / 2 - py;
    const len = Math.hypot(vx, vy) || 1;
    const push = (radius - dist + 8) * this.speed;
    const mx = (vx / len) * push;
    const my = (vy / len) * push;

    const m = this.margin;
    const cornered = r.left + mx < m || r.right + mx > innerWidth - m
      || r.top + my < m || r.bottom + my > innerHeight - m;
    if (cornered) this.teleport(px, py);
    else this.move(mx, my);
  },

  // Jump somewhere random in the viewport, preferably far from the pointer.
  teleport(px = -1e4, py = -1e4) {
    const r = this.btn.getBoundingClientRect();
    const m = this.margin;
    let x = m;
    let y = m;
    for (let i = 0; i < 10; i++) {
      x = m + Math.random() * Math.max(0, innerWidth - r.width - 2 * m);
      y = m + Math.random() * Math.max(0, innerHeight - r.height - 2 * m);
      if (Math.hypot(x + r.width / 2 - px, y + r.height / 2 - py) > WorstUI.config.fleeRadius * 3) break;
    }
    this.move(x - r.left, y - r.top);
  },

  move(mx, my) {
    this.offset.x += mx;
    this.offset.y += my;
    this.btn.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`;
  },

  caught() {
    this.speed = Math.min(this.speed * 1.4, this.maxSpeed);
  },

  cycle() {
    this.step = (this.step + 1) % this.labels.length;
    this.btn.textContent = this.labels[this.step];
    if (this.step === 0) {
      WorstUI.modules.toasts.success("Your submission was received successfully.");
      WorstUI.modules.progressBar.start();
    }
  },
};
