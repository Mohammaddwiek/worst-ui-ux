// Shared namespace + tunables. Classic scripts attach to window.WorstUI.
window.WorstUI = {
  config: {
    fleeRadius: 80,               // px — Cowardly Submit Button trigger distance
    idleClearMs: 4000,            // Amnesiac Form: clear after this much idle time
    birthdayDays: 36500,          // Birthday dropdown length
    chatbotIntervalMs: 20000,
    globeSpinMs: 4000,            // must match the globe-spin animation in styles.css
    prankVideoSrc: "video/video.mp4",
    // Escape-hatch confetti tries these in order; the first one that loads wins.
    logoCandidates: ["logo/logo.jpeg", "logo.png", "logo.svg"],
  },
  modules: {},
  won: false,
  // Panic mode (Shift + Esc) switches the chaos off for demos.
  isPanic: () => document.body.classList.contains("panic"),
};
