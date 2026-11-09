const PREFIJO = "sintonia-api:";

export function leerCache(clave) {
  try {
    const crudo = localStorage.getItem(`${PREFIJO}${clave}`);
    if (!crudo) return null;
    return JSON.parse(crudo);
  } catch {
    return null;
  }
}

export function guardarCache(clave, valor) {
  try {
    localStorage.setItem(`${PREFIJO}${clave}`, JSON.stringify(valor));
  } catch {
    /* cuota llena o modo privado */
  }
}
