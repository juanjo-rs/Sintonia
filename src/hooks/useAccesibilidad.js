import { useEffect, useState } from "react";

const CLAVE = "sintonia-accesibilidad";
const TAMANO_MIN = 80;
const TAMANO_MAX = 140;
const TAMANO_PASO = 10;

function leerSistema() {
  const movimiento =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return {
    tamanoTexto: 100,
    altoContraste: false,
    reducirMovimiento: Boolean(movimiento),
    subrayarEnlaces: false,
    espaciado: false,
  };
}

function leerGuardado() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const datos = JSON.parse(crudo);
    if (!datos || typeof datos !== "object") return null;
    return datos;
  } catch {
    return null;
  }
}

function valoresIniciales() {
  const base = leerSistema();
  const guardado = leerGuardado();
  if (!guardado) return base;
  return {
    tamanoTexto:
      typeof guardado.tamanoTexto === "number"
        ? Math.min(TAMANO_MAX, Math.max(TAMANO_MIN, guardado.tamanoTexto))
        : base.tamanoTexto,
    altoContraste: Boolean(guardado.altoContraste),
    reducirMovimiento:
      typeof guardado.reducirMovimiento === "boolean"
        ? guardado.reducirMovimiento
        : base.reducirMovimiento,
    subrayarEnlaces: Boolean(guardado.subrayarEnlaces),
    espaciado: Boolean(guardado.espaciado),
  };
}

function aplicar(valores) {
  const raiz = document.documentElement;
  raiz.style.zoom = valores.tamanoTexto === 100 ? "" : `${valores.tamanoTexto}%`;
  raiz.toggleAttribute("data-contraste", valores.altoContraste);
  raiz.toggleAttribute("data-movimiento-reducido", valores.reducirMovimiento);
  raiz.toggleAttribute("data-enlaces-subrayados", valores.subrayarEnlaces);
  raiz.toggleAttribute("data-espaciado-lectura", valores.espaciado);
}

export function useAccesibilidad() {
  const [valores, setValores] = useState(valoresIniciales);

  useEffect(() => {
    aplicar(valores);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(valores));
    } catch {
      /* ignore quota */
    }
  }, [valores]);

  function cambiar(parcial) {
    setValores((prev) => ({ ...prev, ...parcial }));
  }

  function reducirTamano() {
    setValores((prev) => ({
      ...prev,
      tamanoTexto: Math.max(TAMANO_MIN, prev.tamanoTexto - TAMANO_PASO),
    }));
  }

  function aumentarTamano() {
    setValores((prev) => ({
      ...prev,
      tamanoTexto: Math.min(TAMANO_MAX, prev.tamanoTexto + TAMANO_PASO),
    }));
  }

  function restablecer() {
    const base = leerSistema();
    setValores(base);
    try {
      localStorage.removeItem(CLAVE);
    } catch {
      /* ignore */
    }
  }

  return {
    valores,
    cambiar,
    reducirTamano,
    aumentarTamano,
    restablecer,
    puedeReducir: valores.tamanoTexto > TAMANO_MIN,
    puedeAumentar: valores.tamanoTexto < TAMANO_MAX,
  };
}
