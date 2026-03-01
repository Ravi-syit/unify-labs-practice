import { save, load, clear } from "./storageService.js";

const defaults = {
  theme: "light",
  language: "en",
  fontSize: 16,
  accentColor: "#3b82f6",
  density: "comfortable",
  sidebarCollapse: false,
  autoSave: false,
  version: 2
};

export function getSettings() {
  return load() || defaults;
}

export function updateSettings(newData) {
  const updated = { ...getSettings(), ...newData };
  save(updated);
  return updated;
}

export function resetSettings() {
  clear();
  return defaults;
}