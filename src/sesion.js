import { borrarCookie, guardarCookie, leerCookie } from "./cookies";

const CLAVE_TOKEN = "sintonia_token";
const DOCE_HORAS = 60 * 60 * 12;

export function leerToken() {
  return leerCookie(CLAVE_TOKEN) || sessionStorage.getItem(CLAVE_TOKEN);
}

export function guardarToken(token, persistir) {
  borrarCookie(CLAVE_TOKEN);
  try {
    sessionStorage.removeItem(CLAVE_TOKEN);
  } catch {
    /* ignore */
  }
  if (!token) return;
  if (persistir) {
    document.cookie = `${CLAVE_TOKEN}=${encodeURIComponent(token)}; Path=/; Max-Age=${DOCE_HORAS}; SameSite=Lax`;
  } else {
    try {
      sessionStorage.setItem(CLAVE_TOKEN, token);
    } catch {
      guardarCookie(CLAVE_TOKEN, token);
    }
  }
}

export function borrarToken() {
  borrarCookie(CLAVE_TOKEN);
  try {
    sessionStorage.removeItem(CLAVE_TOKEN);
  } catch {
    /* ignore */
  }
}

export function encabezadoAuth() {
  const token = leerToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
