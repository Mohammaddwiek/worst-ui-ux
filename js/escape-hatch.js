// Escape Hatch: the tiny hidden button at the very bottom corner. The only way to win.
WorstUI.modules.escapeHatch = {
  init() {
    document.getElementById("escape-hatch").addEventListener("click", () => this.win());
  },
  win() {
    document.getElementById("win").hidden = false;
    document.getElementById("confetti").hidden = false;
    WorstUI.modules.confetti.start();
  },
};
