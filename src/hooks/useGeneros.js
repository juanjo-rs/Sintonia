import { useEffect, useState } from "react";
import { guardarCache, leerCache } from "../cacheApi";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1/generos";
const CLAVE = "generos";

export function useGeneros() {
  const [generos, setGeneros] = useState(() => {
    const guardado = leerCache(CLAVE);
    return Array.isArray(guardado) ? guardado : [];
  });
  const [cargando, setCargando] = useState(() => {
    const guardado = leerCache(CLAVE);
    return !(Array.isArray(guardado) && guardado.length > 0);
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(false);

    async function cargar() {
      try {
        const respuesta = await fetch(API, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        const lista = Array.isArray(datos?.datos) ? datos.datos : [];
        guardarCache(CLAVE, lista);
        if (vigente) setGeneros(lista);
      } catch (errorConsulta) {
        if (!vigente) return;
        console.error("Error al cargar los géneros:", errorConsulta);
        const guardado = leerCache(CLAVE);
        if (Array.isArray(guardado) && guardado.length > 0) {
          setGeneros(guardado);
          setError(false);
        } else {
          setError(true);
          setGeneros([]);
        }
      } finally {
        clearTimeout(limite);
        if (vigente) setCargando(false);
      }
    }

    cargar();
    return () => {
      vigente = false;
      clearTimeout(limite);
      controlador.abort();
    };
  }, []);

  return { generos, cargando, error };
}
