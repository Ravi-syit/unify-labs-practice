import { saveFavorites, saveTheme } from "./storage.js";

const container = document.getElementById("coinContainer");
const loader = document.getElementById("loader");
const notification = document.getElementById("notification");

export function showLoader() {
  loader.classList.remove("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}

export function showError(message) {
  notification.textContent = message;
  notification.className = "error";
}

export function renderCoins(state, toggleFavorite) {
  container.innerHTML = "";

  state.filteredCoins.forEach(coin => {
    const isFav = state.favorites.includes(coin.id);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <img src="${coin.image}" width="32"/>
        <h3>${coin.name}</h3>
        <button class="fav-btn">
          ${isFav ? "★" : "☆"}
        </button>
      </div>
      <p class="price">$${coin.current_price.toLocaleString()}</p>
      <p class="cap">Market Cap: $${coin.market_cap.toLocaleString()}</p>
    `;

    card.querySelector(".fav-btn").onclick = () =>
      toggleFavorite(coin.id);

    container.appendChild(card);
  });
}

export function applyTheme(theme) {
  document.body.className = theme;
  saveTheme(theme);
}