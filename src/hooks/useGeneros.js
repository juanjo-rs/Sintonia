import { useEffect, useState } from "react";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1/generos";

export function useGeneros() {
  const [generos, setGeneros] = useState([]);
  const [cargando, setCargando] = useState(true);
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
        if (vigente) setGeneros(lista);
      } catch (errorConsulta) {
        if (vigente) {
          console.error("Error al cargar los géneros:", errorConsulta);
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
