import { useEffect, useState } from "react";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1/generos";

const vacio = {
  genero: null,
  artistas: [],
  albumes: [],
  pistas: [],
};

export function useGeneroDetalle(generoId) {
  const [detalle, setDetalle] = useState(vacio);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!generoId) {
      setDetalle(vacio);
      setCargando(false);
      setError(null);
      return;
    }

    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(null);

    async function cargar() {
      try {
        const respuesta = await fetch(`${API}/${generoId}`, {
          signal: controlador.signal,
        });
        if (respuesta.status === 404) {
          if (vigente) {
            setDetalle(vacio);
            setError("no_encontrado");
          }
          return;
        }
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos = await respuesta.json();
        if (!vigente) return;
        setDetalle({
          genero: datos,
          artistas: Array.isArray(datos?.artistas) ? datos.artistas : [],
          albumes: Array.isArray(datos?.albumes) ? datos.albumes : [],
          pistas: Array.isArray(datos?.pistas) ? datos.pistas : [],
        });
        setError(null);
      } catch (errorConsulta) {
        if (vigente) {
          console.error("Error al cargar el género:", errorConsulta);
          setDetalle(vacio);
          setError("error");
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
  }, [generoId]);

  return { ...detalle, cargando, error };
}
