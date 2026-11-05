// Full-screen confetti with the club logo falling alongside the standard pieces.
WorstUI.modules.confetti = {
  logo: null,
  running: false,
  colors: ["#00ff00", "#ff00ff", "#00ffff", "#ffff00", "#ff3300", "#3366ff"],
  spawnMs: 5000,          // keep raining new pieces for this long
  perFrame: 4,
  logoChance: 0.15,

  // Try each candidate path in order; resolves with the first image that loads, or null.
  loadLogo(candidates = WorstUI.config.logoCandidates) {
    return candidates.reduce(
      (prev, src) => prev.then((img) => img || new Promise((resolve) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => resolve(null);
        el.src = src;
      })),
      Promise.resolve(null),
    ).then((img) => (this.logo = img));
  },

  init() {
    this.ready = this.loadLogo();
    this.canvas = document.getElementById("confetti");
    this.ctx = this.canvas.getContext("2d");
  },

  start() {
    if (this.running) return;
    this.running = true;
    this.ready.then(() => this.run());
  },

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.w = innerWidth;
    this.h = innerHeight;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  },

  makePiece(initial) {
    const isLogo = this.logo && Math.random() < this.logoChance;
    return {
      x: Math.random() * this.w,
      y: initial ? -Math.random() * this.h : -40,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      wobble: Math.random() * Math.PI * 2,
      size: isLogo ? 36 + Math.random() * 24 : 6 + Math.random() * 8,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      isLogo,
    };
  },

  run() {
    this.canvas.hidden = false;
    this.resize();
    const onResize = () => this.resize();
    addEventListener("resize", onResize);

    const pieces = Array.from({ length: 200 }, () => this.makePiece(true));
    const t0 = performance.now();

    const frame = (now) => {
      if (now - t0 < this.spawnMs) {
        for (let i = 0; i < this.perFrame; i++) pieces.push(this.makePiece(false));
      }

      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.vy = Math.min(p.vy + 0.05, p.isLogo ? 5 : 7);
        p.wobble += 0.05;
        p.x += p.vx + Math.sin(p.wobble);
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > this.h + 60) {
          pieces.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.isLogo) {
          const ratio = this.logo.naturalHeight / this.logo.naturalWidth || 1;
          ctx.drawImage(this.logo, -p.size / 2, (-p.size * ratio) / 2, p.size, p.size * ratio);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }

      if (pieces.length) {
        requestAnimationFrame(frame);
      } else {
        removeEventListener("resize", onResize);
        this.canvas.hidden = true;
        this.running = false;
      }
    };
    requestAnimationFrame(frame);
  },
};
