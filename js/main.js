// Boot every module, plus a panic key (Shift + Esc) that disables the chaos for demos.
document.addEventListener("DOMContentLoaded", () => {
  Object.values(WorstUI.modules).forEach((mod) => mod.init());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && e.shiftKey) {
      document.body.classList.toggle("panic");
    }
  });
});
