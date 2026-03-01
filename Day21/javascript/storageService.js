const KEY = "enterprise_settings_v2";

export function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function load() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clear() {
  localStorage.removeItem(KEY);
}