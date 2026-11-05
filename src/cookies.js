const UN_ANIO = 60 * 60 * 24 * 365;

export function leerCookie(nombre) {
  const partes = document.cookie ? document.cookie.split("; ") : [];
  const fila = partes.find((item) => item.startsWith(`${nombre}=`));
  if (!fila) return null;
  return decodeURIComponent(fila.slice(nombre.length + 1));
}

export function guardarCookie(nombre, valor) {
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; Path=/; Max-Age=${UN_ANIO}; SameSite=Lax`;
}

export function borrarCookie(nombre) {
  document.cookie = `${nombre}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function idiomaInicial() {
  if (leerCookie("consentimiento") !== "aceptado") return "es";
  return leerCookie("idioma") === "en" ? "en" : "es";
}

export function cookiesAceptadas() {
  return leerCookie("consentimiento") === "aceptado";
}
