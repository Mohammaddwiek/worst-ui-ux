// Hostile Navigation: nav icons trigger the wrong action; the back button resets the page.
WorstUI.modules.hostileNav = {
  init() {
    const toasts = WorstUI.modules.toasts;
    const actions = {
      // "Home" takes you to the Terms & Conditions.
      terms: () => {
        document.getElementById("terms").scrollIntoView({ behavior: "smooth", block: "center" });
        toasts.success("Welcome home!");
      },
      // "Help" wipes the form.
      reset: () => {
        const form = document.getElementById("signup");
        form.reset();
        form.querySelectorAll("input, select").forEach((el) => {
          el.dispatchEvent(new Event("input", { bubbles: true }));
        });
        toasts.success("Help applied. All fields have been cleared.");
      },
      // "Settings" summons the chatbot.
      chatbot: () => WorstUI.modules.chatbot.show(),
      // "Back" resets the whole page.
      back: () => {
        scrollTo(0, 0);
        location.reload();
      },
    };

    document.getElementById("nav").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (btn) actions[btn.dataset.action]();
    });
  },
};
