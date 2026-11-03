import { useCallback, useEffect, useState } from "react";

const PARAM = "genero";

function leerGeneroDeUrl() {
  const valor = new URLSearchParams(window.location.search).get(PARAM);
  return typeof valor === "string" && valor.trim() ? valor.trim() : null;
}

function escribirGeneroEnUrl(generoId) {
  const url = new URL(window.location.href);
  if (generoId) url.searchParams.set(PARAM, generoId);
  else url.searchParams.delete(PARAM);
  const siguiente = `${url.pathname}${url.search}${url.hash}`;
  const actual = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (siguiente !== actual) {
    window.history.pushState({ generoId }, "", siguiente);
  }
}

/** Guarda el género elegido en ?genero= para que sobreviva al recargar. */
export function useGeneroEnUrl() {
  const [generoId, setGeneroIdEstado] = useState(() => leerGeneroDeUrl());

  const setGeneroId = useCallback((siguiente) => {
    const id = typeof siguiente === "string" && siguiente.trim() ? siguiente.trim() : null;
    setGeneroIdEstado(id);
    escribirGeneroEnUrl(id);
  }, []);

  useEffect(() => {
    const alNavegar = () => setGeneroIdEstado(leerGeneroDeUrl());
    window.addEventListener("popstate", alNavegar);
    return () => window.removeEventListener("popstate", alNavegar);
  }, []);

  return [generoId, setGeneroId];
}
