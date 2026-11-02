import { useEffect, useState } from "react";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1/generos";
const LIMITE = 6;

function porFechaNueva(a, b) {
  return String(b?.fechaPublicacion ?? "").localeCompare(
    String(a?.fechaPublicacion ?? "")
  );
}

export function useAlbumes(generos) {
  const [albumes, setAlbumes] = useState([]);

  useEffect(() => {
    const lista = Array.isArray(generos) ? generos : [];
    if (lista.length === 0) {
      setAlbumes([]);
      return;
    }

    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;

    async function cargar() {
      try {
        const grupos = await Promise.all(
          lista.map(async (genero) => {
            if (!genero?.id) return [];
            const respuesta = await fetch(`${API}/${genero.id}`, {
              signal: controlador.signal,
            });
            if (!respuesta.ok) return [];
            const datos = await respuesta.json();
            return Array.isArray(datos?.albumes) ? datos.albumes : [];
          })
        );

        const vistos = new Set();
        const unidos = [];
        for (const grupo of grupos) {
          for (const album of grupo) {
            if (!album?.id || vistos.has(album.id)) continue;
            if (typeof album.titulo !== "string" || !album.titulo.trim()) continue;
            vistos.add(album.id);
            unidos.push(album);
          }
        }

        unidos.sort(porFechaNueva);
        if (vigente) setAlbumes(unidos.slice(0, LIMITE));
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
  }, [generos]);

  return { albumes };
}
