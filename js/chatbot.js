// Fake chatbot: pops up every config.chatbotIntervalMs saying "Looks like you're having trouble!".
WorstUI.modules.chatbot = {
  greeting: "Looks like you're having trouble!",

  init() {
    this.el = document.getElementById("chatbot");
    this.el.innerHTML = `
      <p class="chatbot__title">🤖 SynergyBot</p>
      <p class="chatbot__msg"></p>
      <div class="chatbot__actions">
        <button type="button" data-reply="yes">Yes, help me</button>
        <button type="button" data-reply="no">No</button>
      </div>
      <button type="button" class="chatbot__close" aria-label="Close">x</button>`;
    this.msg = this.el.querySelector(".chatbot__msg");

    this.el.addEventListener("click", (e) => {
      if (e.target.closest(".chatbot__close")) return this.hide();
      const reply = e.target.closest("[data-reply]")?.dataset.reply;
      if (reply === "yes") {
        this.msg.textContent = "Great! I've let your manager know.";
        setTimeout(() => this.hide(), 2000);
      } else if (reply === "no") {
        this.msg.textContent = this.greeting;
      }
    });

    setInterval(() => {
      if (!WorstUI.isPanic() && !WorstUI.won && this.el.hidden) this.show();
    }, WorstUI.config.chatbotIntervalMs);
  },

  show() {
    this.msg.textContent = this.greeting;
    this.el.hidden = false;
  },

  hide() {
    this.el.hidden = true;
  },
};
