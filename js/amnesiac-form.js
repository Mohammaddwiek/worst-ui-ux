// Amnesiac Form: fields clear after config.idleClearMs without typing, or on Tab.
// Also populates the 36,500-day birthday dropdown and the phone slider readout.
WorstUI.modules.amnesiacForm = {
  timers: new Map(),

  init() {
    const form = document.getElementById("signup");

    form.querySelectorAll(".amnesiac").forEach((input) => {
      input.addEventListener("input", () => this.armTimer(input));
    });
    form.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !WorstUI.isPanic()) this.clear(e.target);
    });

    const phone = document.getElementById("phone");
    const phoneOut = document.getElementById("phone-output");
    phone.addEventListener("input", () => (phoneOut.textContent = this.formatPhone(phone.value)));

    this.fillBirthdays(document.getElementById("birthday"));
  },

  armTimer(input) {
    clearTimeout(this.timers.get(input));
    if (!input.value) return;
    this.timers.set(input, setTimeout(() => {
      if (!WorstUI.isPanic()) this.clear(input);
    }, WorstUI.config.idleClearMs));
  },

  clear(el) {
    if (el.matches('input[type="range"]')) el.value = el.min;
    else if (el.matches("select")) el.selectedIndex = 0;
    else if (el.matches('input:not([type="hidden"])')) el.value = "";
    else return;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  },

  formatPhone(value) {
    const s = String(value).padStart(10, "0");
    return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`;
  },

  // Today first, then one option per day going backwards.
  fillBirthdays(select) {
    const fmt = new Intl.DateTimeFormat(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const day = new Date();
    day.setHours(12, 0, 0, 0);
    const options = [];
    for (let i = 0; i < WorstUI.config.birthdayDays; i++) {
      options.push(`<option value="${i}">${fmt.format(day)}</option>`);
      day.setDate(day.getDate() - 1);
    }
    select.innerHTML = options.join("");
  },
};
