// Toasts: successful actions show red, error-styled notifications.
WorstUI.modules.toasts = {
  durationMs: 3500,

  init() {
    this.container = document.getElementById("toasts");
  },

  success(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    const title = document.createElement("strong");
    title.textContent = "⚠ CRITICAL ERROR";
    toast.append(title, message);
    this.container.append(toast);
    setTimeout(() => toast.remove(), this.durationMs);
  },
};
