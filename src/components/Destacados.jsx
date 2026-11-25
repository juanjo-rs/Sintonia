import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Destacados.css";
import Icono from "./Icono";
import { useAlbumes } from "../hooks/useAlbumes";
import { imagenPortadaAlbum } from "../utils/portadasAlbumes";

const DESTINOS = {
  descubrirMas: "#descubrir-mas",
  catalogo: "/catalogo",
};

const Destacados = ({ textos, variante = "inicio" }) => {
  const esCatalogo = variante === "catalogo";
  const textoD = esCatalogo
    ? textos?.paginas?.catalogo?.destacados
    : textos?.paginas?.inicioPublico?.destacados;
  const verCatalogo = textos?.paginas?.inicioPublico?.generos?.enlaces?.verCatalogo;
  const { albumes } = useAlbumes();
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches
  );

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 899px)");
    const actualizar = (evento) => setMovil(evento.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  const enlaceInicioMovil = !esCatalogo && movil && verCatalogo;
  const etiquetaEnlace = enlaceInicioMovil
    ? verCatalogo
    : textoD?.enlaces?.descubrirMas;

  return (
    <div
      className={`contenedor-destacados${esCatalogo ? " contenedor-destacados-catalogo" : ""}`}
    >
      <div className={`${esCatalogo ? "contenedor-2" : "contenedor"} destacados-fila`}>
        <div className="destacados-superior">
          <p className={`destacados-titulo ${movil ? "titular-h3" : "titular-h2"}`}>
            {textoD?.titulo}
          </p>
          {etiquetaEnlace &&
            (enlaceInicioMovil ? (
              <Link to={DESTINOS.catalogo} className="destacados-enlace cuerpo-p-fuerte">
                {etiquetaEnlace}
                <Icono nombre="flecha" />
              </Link>
            ) : (
              <a href={DESTINOS.descubrirMas} className={`${esCatalogo && movil ? "destacado-no-enlace" : "destacados-enlace cuerpo-p-fuerte"}`}>
                {etiquetaEnlace}
                <Icono nombre="flecha" />
              </a>
            ))}
        </div>
        {albumes.length > 0 && (
          <div className="destacados-lista">
            {albumes.map((album, indice) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className="destacados-caja"
              >
                <img
                  className="destacados-caja-imagen"
                  src={imagenPortadaAlbum(album.id, indice)}
                  alt=""
                />
                <div className="destacados-caja-textos">
                  <p className="destacados-caja-nombre cuerpo-p-fuerte">{album.titulo}</p>
                  {album.artista?.nombre && (
                    <p className="destacados-caja-autor cuerpo-p">{album.artista.nombre}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destacados;
