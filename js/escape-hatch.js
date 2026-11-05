// Escape Hatch: the tiny hidden button at the very bottom corner. The only way to win.
WorstUI.modules.escapeHatch = {
  init() {
    document.getElementById("escape-hatch").addEventListener("click", () => this.win());
  },
  win() {
    WorstUI.won = true;
    WorstUI.modules.chatbot.hide();
    document.getElementById("win").hidden = false;
    WorstUI.modules.confetti.start();
  },
};
