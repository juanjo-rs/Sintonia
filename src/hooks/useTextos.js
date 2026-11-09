import { useEffect, useState } from "react";
import { guardarCache, leerCache } from "../cacheApi";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1/textos";

const CLAVES_ENLACES = ["inicio", "catalogo"];

function claveCache(idioma) {
  return `textos:${idioma}`;
}

function validarTextos(datos) {
  const textos = datos?.textos ?? datos;
  const nav = textos?.navbar;
  const botones = nav?.botones?.invitado;
  const etiquetas = [
    nav?.logo?.texto,
    nav?.logo?.aria,
    ...CLAVES_ENLACES.map((clave) => nav?.enlaces?.[clave]),
    botones?.ingresar,
    botones?.crearCuenta,
    nav?.aria?.navegacion,
    nav?.aria?.idioma,
    textos?.menuMovil?.abrir,
    textos?.menuMovil?.cerrar,
    textos?.idioma?.codigos?.es,
    textos?.idioma?.codigos?.en,
  ];

  if (!etiquetas.every((valor) => typeof valor === "string" && valor.trim())) {
    throw new Error("La respuesta no contiene los textos del navbar.");
  }
  return textos;
}

export function useTextos(idioma) {
  const [textos, setTextos] = useState(() => {
    try {
      return validarTextos(leerCache(claveCache(idioma)));
    } catch {
      return null;
    }
  });
  const [cargando, setCargando] = useState(!textos);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(false);

    async function cargarTextosNavbar() {
      try {
        const respuesta = await fetch(`${API}?idioma=${idioma}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        const nuevosTextos = validarTextos(datos);
        guardarCache(claveCache(idioma), nuevosTextos);
        if (vigente) setTextos(nuevosTextos);
      } catch (errorConsulta) {
        if (!vigente) return;
        console.error("Error al cargar los textos:", errorConsulta);
        try {
          const guardado = validarTextos(leerCache(claveCache(idioma)));
          setTextos(guardado);
          setError(false);
        } catch {
          setError(true);
        }
      } finally {
        clearTimeout(limite);
        if (vigente) setCargando(false);
      }
    }

    cargarTextosNavbar();
    return () => {
      vigente = false;
      clearTimeout(limite);
      controlador.abort();
    };
  }, [idioma, intento]);

  return {
    textos,
    cargando,
    error,
    recargar: () => setIntento((valor) => valor + 1),
  };
}
