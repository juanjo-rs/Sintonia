export function formatearDuracion(segundos) {
  const total = Number(segundos);
  if (!Number.isFinite(total) || total < 0) return "";
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatearMinutos(segundos) {
  const total = Number(segundos);
  if (!Number.isFinite(total) || total < 0) return "";
  return String(Math.max(1, Math.round(total / 60)));
}

export function formatearReproducciones(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n) || n < 0) return "0";
  return new Intl.NumberFormat("es-CO").format(Math.round(n));
}

export function anioDeFecha(fecha) {
  if (typeof fecha !== "string" || fecha.length < 4) return "";
  return fecha.slice(0, 4);
}

export function etiquetaConPlantilla(plantilla, valores = {}) {
  if (typeof plantilla !== "string") return "";
  return Object.entries(valores).reduce(
    (texto, [clave, valor]) =>
      texto.replaceAll(`{${clave}}`, valor == null ? "" : String(valor)),
    plantilla,
  );
}
