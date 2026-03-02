export function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function loadFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  return localStorage.getItem("theme") || "light";
}