import { translations } from "./translations.js";

export function applyTheme(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark);
  } else {
    document.body.classList.toggle("dark", theme === "dark");
  }
}

export function applyFontSize(size) {
  document.documentElement.style.fontSize = size + "px";
}

export function applyAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
}

export function applyDensity(density) {
  document.body.classList.toggle("compact", density === "compact");
}

export function applySidebarCollapse(state) {
  document.getElementById("sidebar").classList.toggle("collapsed", state);
}

export function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key];
  });
}