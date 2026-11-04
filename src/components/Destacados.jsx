import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Destacados.css";
import Icono from "./Icono";
import { useAlbumes } from "../hooks/useAlbumes";
import cantoDeGuadua from "../assets/portadas/album-canto-de-guadua.png";
import todoElRuido from "../assets/portadas/album-todo-el-ruido.png";
import bajoElGuadual from "../assets/portadas/album-bajo-el-guadual.png";
import neonYNeblina from "../assets/portadas/album-neon-y-neblina.png";
import cartasSinEnviar from "../assets/portadas/album-cartas-sin-enviar.png";
import kilometro41 from "../assets/portadas/album-kilometro-41.png";

const DESTINOS = {
  descubrirMas: "#descubrir-mas",
  catalogo: "/catalogo",
};

const IMAGENES = [
  cantoDeGuadua,
  todoElRuido,
  bajoElGuadual,
  neonYNeblina,
  cartasSinEnviar,
  kilometro41,
];

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
              <div key={album.id} className="destacados-caja">
                {IMAGENES[indice] && (
                  <img className="destacados-caja-imagen" src={IMAGENES[indice]} alt="" />
                )}
                <div className="destacados-caja-textos">
                  <p className="destacados-caja-nombre cuerpo-p-fuerte">{album.titulo}</p>
                  {album.artista?.nombre && (
                    <p className="destacados-caja-autor cuerpo-p">{album.artista.nombre}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destacados;
