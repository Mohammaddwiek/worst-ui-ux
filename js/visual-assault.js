// Visual Assault: horizontal T&Cs with reversed mouse wheel, spinning fake cursor.
// (The neon background cycle and the tiny fonts live in styles.css.)
WorstUI.modules.visualAssault = {
  clauses: [
    "By reading this sentence you agree to have read all following sentences.",
    "OmniCorp may change these terms at any time, including retroactively and while you are reading them.",
    "Your first-born pet is held as collateral until your account is verified.",
    "Scrolling to the right constitutes consent to scroll further to the right.",
    "All disputes will be settled by a game of rock-paper-scissors, played by OmniCorp alone.",
    "You agree that the Submit button is located exactly where it appears to be.",
    "Synergy, once received, cannot be returned or exchanged.",
    "Clause 4 is void where clause 4 exists.",
    "You consent to receive 14 newsletters per hour, including on public holidays.",
    "Any fields cleared during sign-up were cleared for your own protection.",
    "The phone number you provide will be used to call you about your phone number.",
    "OmniCorp is not liable for anything, ever, retroactively, in perpetuity, throughout the universe.",
  ],
  columns: 40,

  init() {
    this.fillTerms();

    const terms = document.getElementById("terms");
    terms.addEventListener("wheel", (e) => {
      if (WorstUI.isPanic()) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : 1;   // Firefox reports lines
      terms.scrollLeft -= (e.deltaY + e.deltaX) * unit;
    }, { passive: false });

    const cursor = document.createElement("div");
    cursor.className = "fake-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.append(cursor);
    document.addEventListener("mousemove", (e) => {
      cursor.classList.add("is-active");
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  },

  fillTerms() {
    const track = document.getElementById("terms-track");
    for (let i = 0; i < this.columns; i++) {
      const col = document.createElement("p");
      col.className = "terms__col";
      col.textContent = `§${i + 1}. ${this.clauses[i % this.clauses.length]} ${this.clauses[(i * 7 + 3) % this.clauses.length]}`;
      track.append(col);
    }
  },
};
