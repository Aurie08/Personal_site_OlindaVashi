const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
// =========================================
// LIGHT MODE / DARK MODE TOGGLE
// =========================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

// Apply the selected theme
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (themeToggle && themeIcon) {
    const isLightMode = theme === "light";

    themeIcon.textContent = isLightMode ? "☾" : "☀";

    themeToggle.setAttribute(
      "aria-label",
      isLightMode
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(isLightMode)
    );
  }
}

// Get the saved theme
const savedTheme = localStorage.getItem("theme");

// Use the saved theme, or default to dark mode
const currentTheme = savedTheme || "dark";

applyTheme(currentTheme);

// Toggle the theme when the button is clicked
themeToggle?.addEventListener("click", () => {
  const activeTheme =
    document.documentElement.getAttribute("data-theme");

  const newTheme = activeTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);

  // Remember the user's choice
  localStorage.setItem("theme", newTheme);
});