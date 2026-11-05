// Password rules, revealed one at a time once the previous rule is met:
// 1) contains a prime number  2) contains a month of the year
// 3) contains no letter used in the email input
(() => {
  const MONTHS = ["january", "february", "march", "april", "may", "june", "july",
    "august", "september", "october", "november", "december"];

  const isPrime = (n) => {
    if (n < 2) return false;
    if (n % 2 === 0) return n === 2;
    for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
    return true;
  };

  const letters = (s) => s.toLowerCase().match(/[a-z]/g) || [];

  WorstUI.modules.passwordRules = {
    rules: [
      {
        text: "Must contain a prime number.",
        // Each run of digits counts as one number; over 12 digits is "too big to verify".
        test: (pw) => (pw.match(/\d+/g) || []).some((d) => d.length <= 12 && isPrime(Number(d))),
      },
      {
        text: "Must contain a month of the year.",
        test: (pw) => MONTHS.some((m) => pw.toLowerCase().includes(m)),
      },
      {
        text: "Cannot contain any letter used in your email.",
        test: (pw, email) => {
          const used = new Set(letters(email));
          return !letters(pw).some((c) => used.has(c));
        },
      },
    ],
    allMet: false,

    init() {
      this.password = document.getElementById("password");
      this.email = document.getElementById("email");
      this.list = document.getElementById("password-rules");
      this.password.addEventListener("input", () => this.render());
      this.email.addEventListener("input", () => this.render());
    },

    render() {
      const pw = this.password.value;
      const email = this.email.value;
      this.list.replaceChildren();
      if (!pw) {
        this.allMet = false;
        return;
      }

      let met = 0;
      for (const rule of this.rules) {
        const ok = rule.test(pw, email);
        const li = document.createElement("li");
        li.className = ok ? "ok" : "bad";
        li.textContent = `${ok ? "✓" : "✗"} ${rule.text}`;
        this.list.append(li);
        if (!ok) break;
        met++;
      }

      const allMet = met === this.rules.length;
      if (allMet && !this.allMet) WorstUI.modules.toasts.success("Password accepted.");
      this.allMet = allMet;
    },
  };
})();
