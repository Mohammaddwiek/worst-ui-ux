// Full-screen confetti with the club logo falling alongside the standard pieces.
WorstUI.modules.confetti = {
  logo: null,

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
    this.loadLogo();
  },

  start() {
    // TODO(build): canvas particle physics; mix this.logo sprites in with the confetti.
  },
};
