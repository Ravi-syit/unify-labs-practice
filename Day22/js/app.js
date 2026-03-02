import State from "./state.js";
import { fetchCoins } from "./api.js";
import {
  renderCoins,
  showLoader,
  hideLoader,
  showError,
  applyTheme
} from "./ui.js";
import {
  loadFavorites,
  saveFavorites,
  loadTheme
} from "./storage.js";

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const themeToggle = document.getElementById("themeToggle");

const isFavoritesPage = window.location.pathname.includes("favorites");

function filterCoins(query) {
  State.filteredCoins = State.coins.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
}

function sortCoins(type) {
  switch (type) {
    case "price_desc":
      State.filteredCoins.sort((a, b) => b.current_price - a.current_price);
      break;
    case "name_asc":
      State.filteredCoins.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    default:
      State.filteredCoins.sort((a, b) => b.market_cap - a.market_cap);
  }
}

function toggleFavorite(id) {
  const exists = State.favorites.includes(id);

  State.favorites = exists
    ? State.favorites.filter(f => f !== id)
    : [...State.favorites, id];

  saveFavorites(State.favorites);

  if (isFavoritesPage) {
    loadFavoritesPage();
  } else {
    renderCoins(State, toggleFavorite);
  }
}

async function loadDashboard() {
  const coins = await fetchCoins();
  State.coins = coins;
  State.filteredCoins = coins;

  renderCoins(State, toggleFavorite);
}

async function loadFavoritesPage() {
  const coins = await fetchCoins();
  State.coins = coins;

  State.filteredCoins = coins.filter(c =>
    State.favorites.includes(c.id)
  );

  renderCoins(State, toggleFavorite);
}

async function init() {
  try {
    showLoader();

    State.favorites = loadFavorites();
    State.theme = loadTheme();
    applyTheme(State.theme);

    if (isFavoritesPage) {
      await loadFavoritesPage();
    } else {
      await loadDashboard();
    }

  } catch (err) {
    showError("⚠ Unable to fetch data.");
  } finally {
    hideLoader();
  }
}

/* ---- Only attach listeners on Dashboard ---- */

if (!isFavoritesPage) {

  searchInput?.addEventListener("input", e => {
    filterCoins(e.target.value);
    sortCoins(sortSelect.value);
    renderCoins(State, toggleFavorite);
  });

  sortSelect?.addEventListener("change", e => {
    sortCoins(e.target.value);
    renderCoins(State, toggleFavorite);
  });

  themeToggle?.addEventListener("click", () => {
    State.theme = State.theme === "light" ? "dark" : "light";
    applyTheme(State.theme);
  });

}

init();