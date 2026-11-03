import { useEffect, useState } from "react";

const API =
  "https://yanethm-sintonia-api.fly.dev/api/v1/albumes?orden=populares&limite=6";

export function useAlbumes() {
  const [albumes, setAlbumes] = useState([]);

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
        if (vigente) setAlbumes(lista);
      } catch (errorConsulta) {
        if (vigente) {
          console.error("Error al cargar los álbumes:", errorConsulta);
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
