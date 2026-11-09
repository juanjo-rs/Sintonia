import { useEffect, useState } from "react";
import { guardarCache, leerCache } from "../cacheApi";

const API =
  "https://yanethm-sintonia-api.fly.dev/api/v1/albumes?orden=populares&limite=6";
const CLAVE = "albumes-populares";

export function useAlbumes() {
  const [albumes, setAlbumes] = useState(() => {
    const guardado = leerCache(CLAVE);
    return Array.isArray(guardado) ? guardado : [];
  });

  useEffect(() => {
    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;

    async function cargar() {
      try {
        const respuesta = await fetch(API, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        const lista = Array.isArray(datos?.datos) ? datos.datos : [];
        guardarCache(CLAVE, lista);
        if (vigente) setAlbumes(lista);
      } catch (errorConsulta) {
        if (!vigente) return;
        console.error("Error al cargar los álbumes:", errorConsulta);
        const guardado = leerCache(CLAVE);
        if (Array.isArray(guardado) && guardado.length > 0) {
          setAlbumes(guardado);
        } else {
          setAlbumes([]);
        }
      } finally {
        clearTimeout(limite);
      }
    }

    cargar();
    return () => {
      vigente = false;
      clearTimeout(limite);
      controlador.abort();
    };
  }, []);

  return { albumes };
}
