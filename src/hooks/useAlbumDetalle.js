import { useEffect, useState } from "react";
import { guardarCache, leerCache } from "../cacheApi";
import { API_BASE } from "../env";

const vacio = {
  album: null,
  pistas: [],
  masDelArtista: [],
};

function claveCache(albumId) {
  return `album:${albumId}`;
}

function armarDetalle(datos) {
  return {
    album: datos,
    pistas: Array.isArray(datos?.pistas) ? datos.pistas : [],
    masDelArtista: Array.isArray(datos?.masDelArtista) ? datos.masDelArtista : [],
  };
}

export function useAlbumDetalle(albumId) {
  const [detalle, setDetalle] = useState(vacio);
  const [cargando, setCargando] = useState(Boolean(albumId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!albumId) {
      setDetalle(vacio);
      setCargando(false);
      setError(null);
      return;
    }

    const guardado = leerCache(claveCache(albumId));
    if (guardado?.id) {
      setDetalle(armarDetalle(guardado));
    }

    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(null);

    async function cargar() {
      try {
        const respuesta = await fetch(`${API_BASE}/albumes/${albumId}`, {
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
        guardarCache(claveCache(albumId), datos);
        if (!vigente) return;
        setDetalle(armarDetalle(datos));
        setError(null);
      } catch (errorConsulta) {
        if (!vigente) return;
        console.error("Error al cargar el álbum:", errorConsulta);
        const copia = leerCache(claveCache(albumId));
        if (copia?.id) {
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
  }, [albumId]);

  return { ...detalle, cargando, error };
}
