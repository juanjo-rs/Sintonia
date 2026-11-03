import React, { useEffect, useState } from "react";
import "./Canciones.css";

const LIMITE = 5;

function formatearDuracion(segundos) {
  const total = Number(segundos);
  if (!Number.isFinite(total) || total < 0) return undefined;
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const Canciones = ({ textos, pistas }) => {
  const textoC = textos?.paginas?.catalogo?.genero?.canciones;
  const lista = (Array.isArray(pistas) ? pistas : [])
    .slice()
    .sort((a, b) => (b?.reproducciones ?? 0) - (a?.reproducciones ?? 0))
    .slice(0, LIMITE);
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches
  );

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 899px)");
    const actualizar = (evento) => setMovil(evento.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  if (lista.length === 0) return null;

  return (
    <div className="contenedor-canciones">
      <div className="contenedor-2 canciones-fila">
        {textoC?.titulo && (
          <p
            className={`canciones-titulo ${movil ? "titular-h3" : "titular-h2"}`}
          >
            {textoC.titulo}
          </p>
        )}
        <ol className="canciones-lista">
          {lista.map((pista, indice) => {
            const duracion = formatearDuracion(pista.duracionSeg);
            return (
              <li key={pista.id} className="cancion-fila">
                <span className="cancion-numero cuerpo-m">{indice + 1}</span>
                <div className="cancion-textos">
                  {pista.titulo && (
                    <p className="cancion-nombre cuerpo-m-fuerte">{pista.titulo}</p>
                  )}
                  {pista.artista?.nombre && (
                    <p className="cancion-artista cuerpo-p">{pista.artista.nombre}</p>
                  )}
                </div>
                {duracion && (
                  <span className="cancion-duracion cuerpo-p">{duracion}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Canciones;
