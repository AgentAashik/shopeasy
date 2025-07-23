// src/services/auth.js
export function isLoggedIn() {
  return Boolean(localStorage.getItem('token'));
}

export function logout() {
  localStorage.removeItem('token');
}
