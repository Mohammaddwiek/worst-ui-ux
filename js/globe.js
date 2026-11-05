// Country selector: an unlabelled, CSS-animated spinning 3D globe the user must click.
// The country picked depends on where you click and how far the globe has spun.
WorstUI.modules.globe = {
  countries: [
    "Afghanistan", "Albania", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium",
    "Bhutan", "Brazil", "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland",
    "France", "Germany", "Ghana", "Greece", "Iceland", "India", "Indonesia", "Ireland", "Italy",
    "Japan", "Kazakhstan", "Kenya", "Liechtenstein", "Malaysia", "Mexico", "Mongolia", "Morocco",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru",
    "Philippines", "Poland", "Portugal", "Saudi Arabia", "South Africa", "South Korea", "Spain",
    "Sweden", "Switzerland", "Thailand", "Turkey", "Tuvalu", "United Kingdom", "United States",
    "Vatican City", "Vietnam",
  ],

  init() {
    this.input = document.getElementById("country");
    this.output = document.getElementById("country-output");
    document.getElementById("globe").addEventListener("click", (e) => this.pick(e));
  },

  pick(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const across = (e.clientX - r.left) / r.width;
    const spin = (performance.now() % WorstUI.config.globeSpinMs) / WorstUI.config.globeSpinMs;
    const index = Math.floor(((spin + across) % 1) * this.countries.length);
    const country = this.countries[index];
    this.input.value = country;
    this.output.textContent = `Country: ${country}`;
    WorstUI.modules.toasts.success(`Country set to ${country}.`);
  },
};
