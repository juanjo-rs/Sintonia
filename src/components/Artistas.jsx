import React, { useEffect, useState } from "react";
import "./Artistas.css";

function colorDeFondo(token) {
  if (typeof token !== "string" || !token.includes("/")) return undefined;
  return `var(--${token.replace("/", "-")})`;
}

const Artistas = ({ textos, artistas }) => {
  const textoA = textos?.paginas?.catalogo?.genero?.artistas;
  const lista = Array.isArray(artistas) ? artistas : [];
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
    <div className="contenedor-artistas">
      <div className="contenedor-2 artistas-fila">
        {textoA?.titulo && (
          <p className={`artistas-titulo ${movil ? "titular-h3" : "titular-h2"}`}>
            {textoA.titulo}
          </p>
        )}
        <div className="artistas-lista">
          {lista.map((artista) => (
            <div key={artista.id} className="artista-caja">
              <div
                className="artista-avatar"
                style={{
                  backgroundColor: colorDeFondo(artista.portada?.colores?.[0]),
                }}
                aria-hidden="true"
              />
              <div className="artista-textos">
                {artista.nombre && (
                  <p className="artista-nombre cuerpo-m-fuerte">{artista.nombre}</p>
                )}
                {textoA?.etiqueta && (
                  <p className="artista-etiqueta cuerpo-p">{textoA.etiqueta}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistas;
