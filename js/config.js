// Shared namespace + tunables. Classic scripts attach to window.WorstUI.
window.WorstUI = {
  config: {
    fleeRadius: 80,               // px — Cowardly Submit Button trigger distance
    idleClearMs: 4000,            // Amnesiac Form: clear after this much idle time
    birthdayDays: 36500,          // Birthday dropdown length
    phoneMax: 9999999999,
    chatbotIntervalMs: 20000,
    prankVideoSrc: "video/prank.mp4",
    // Escape-hatch confetti tries these in order; the first one that loads wins.
    logoCandidates: ["logo.png", "logo.svg"],
  },
  modules: {},
};
