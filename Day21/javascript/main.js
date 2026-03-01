import { getSettings, updateSettings, resetSettings } from "./settingsService.js";
import * as UI from "./uiController.js";

const controls = {
  theme: document.getElementById("theme"),
  language: document.getElementById("language"),
  fontSize: document.getElementById("fontSize"),
  accentColor: document.getElementById("accentColor"),
  density: document.getElementById("density"),
  sidebarCollapse: document.getElementById("sidebarCollapse"),
  autoSave: document.getElementById("autoSave"),
  saveBtn: document.getElementById("saveBtn"),
  resetBtn: document.getElementById("resetBtn")
};

function applyAll(settings) {
  UI.applyTheme(settings.theme);
  UI.applyLanguage(settings.language);
  UI.applyFontSize(settings.fontSize);
  UI.applyAccent(settings.accentColor);
  UI.applyDensity(settings.density);
  UI.applySidebarCollapse(settings.sidebarCollapse);
}

function init() {
  const settings = getSettings();

  Object.keys(settings).forEach(key => {
    if (controls[key]) {
      if (controls[key].type === "checkbox")
        controls[key].checked = settings[key];
      else
        controls[key].value = settings[key];
    }
  });

  applyAll(settings);
}

function collectData() {
  return {
    theme: controls.theme.value,
    language: controls.language.value,
    fontSize: +controls.fontSize.value,
    accentColor: controls.accentColor.value,
    density: controls.density.value,
    sidebarCollapse: controls.sidebarCollapse.checked,
    autoSave: controls.autoSave.checked
  };
}

controls.saveBtn.onclick = () => {
  const updated = updateSettings(collectData());
  applyAll(updated);
};

controls.resetBtn.onclick = () => {
  const defaults = resetSettings();
  init();
};

Object.values(controls).forEach(control => {
  if (control && control.addEventListener) {
    control.addEventListener("change", () => {
      if (controls.autoSave.checked) {
        const updated = updateSettings(collectData());
        applyAll(updated);
      }
    });
  }
});

window.addEventListener("storage", () => {
  init(); // cross-tab sync
});

init();