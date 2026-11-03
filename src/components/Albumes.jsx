import React, { useEffect, useState } from "react";
import "./Albumes.css";
import kilometro41 from "../assets/portadas/album-kilometro-41.png";
import cartasSinEnviar from "../assets/portadas/genero-2-cartas-sin-enviar.png";
import cantoDeGuadua from "../assets/portadas/genero-1-canto-de-guadua.png";
import generoTropical from "../assets/portadas/genero-tropical.png";
import generoSalsa from "../assets/portadas/genero-salsa.png";
import neonYNeblina from "../assets/portadas/genero-4-neon-y-neblina.png";
import generoMusicaAndina from "../assets/portadas/genero-musica-andina.png";
import generoInstrumental from "../assets/portadas/genero-instrumental.png";
import mareaViva from "../assets/portadas/genero-marea-viva.png";
import pleamar from "../assets/portadas/genero-pleamar.png";
import todoElRuido from "../assets/portadas/genero-3-todo-el-ruido.png";
import frailejonAcustico from "../assets/portadas/genero-frailejon-acustico.png";

/* Las 12 portadas distintas; se rotan por índice. */
const IMAGENES = [
  kilometro41,
  cartasSinEnviar,
  cantoDeGuadua,
  generoTropical,
  generoSalsa,
  neonYNeblina,
  generoMusicaAndina,
  generoInstrumental,
  mareaViva,
  pleamar,
  todoElRuido,
  frailejonAcustico,
];

function tituloConGenero(plantilla, nombre) {
  if (typeof plantilla !== "string") return undefined;
  if (typeof nombre !== "string" || !nombre) return plantilla;
  return plantilla.replace("{genero}", nombre);
}

function hashTexto(texto) {
  let h = 0;
  for (let i = 0; i < String(texto).length; i++) {
    h = (h * 31 + String(texto).charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Parte desde un offset del género para no repetir siempre las mismas 2. */
function imagenDeAlbum(generoId, albumId, indice) {
  const base = hashTexto(generoId || albumId || "");
  return IMAGENES[(base + indice) % IMAGENES.length];
}

const Albumes = ({ textos, generoId, generoNombre, albumes }) => {
  const textoA = textos?.paginas?.catalogo?.genero?.albumes;
  const lista = Array.isArray(albumes) ? albumes : [];
  const titulo = tituloConGenero(textoA?.titulo, generoNombre);
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
    <div className="contenedor-albumes-genero">
      <div className="contenedor-2 albumes-genero-fila">
        {titulo && (
          <p
            className={`albumes-genero-titulo ${movil ? "titular-h3" : "titular-h2"}`}
          >
            {titulo}
          </p>
        )}
        <div
          className={`albumes-genero-lista${lista.length === 2 ? " es-dos" : ""}`}
        >
          {lista.map((album, indice) => (
            <div key={album.id} className="album-genero-caja">
              <img
                className="album-genero-imagen"
                src={imagenDeAlbum(generoId, album.id, indice)}
                alt=""
              />
              <div className="album-genero-textos">
                {album.titulo && (
                  <p className="album-genero-nombre cuerpo-m-fuerte">
                    {album.titulo}
                  </p>
                )}
                {album.artista?.nombre && (
                  <p className="album-genero-autor cuerpo-p">
                    {album.artista.nombre}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Albumes;
