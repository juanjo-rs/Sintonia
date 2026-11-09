import { useEffect, useState } from "react";
import { guardarCache, leerCache } from "../cacheApi";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1/generos";

const vacio = {
  genero: null,
  artistas: [],
  albumes: [],
  pistas: [],
};

function claveCache(generoId) {
  return `genero:${generoId}`;
}

function armarDetalle(datos) {
  return {
    genero: datos,
    artistas: Array.isArray(datos?.artistas) ? datos.artistas : [],
    albumes: Array.isArray(datos?.albumes) ? datos.albumes : [],
    pistas: Array.isArray(datos?.pistas) ? datos.pistas : [],
  };
}

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

    const guardado = leerCache(claveCache(generoId));
    if (guardado?.genero || guardado?.id) {
      setDetalle(armarDetalle(guardado));
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
        guardarCache(claveCache(generoId), datos);
        if (!vigente) return;
        setDetalle(armarDetalle(datos));
        setError(null);
      } catch (errorConsulta) {
        if (!vigente) return;
        console.error("Error al cargar el género:", errorConsulta);
        const copia = leerCache(claveCache(generoId));
        if (copia?.genero || copia?.id || Array.isArray(copia?.artistas)) {
          setDetalle(armarDetalle(copia));
          setError(null);
        } else {
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
