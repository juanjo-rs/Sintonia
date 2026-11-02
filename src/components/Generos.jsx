import React, { useEffect, useState } from "react";
import "./Generos.css";
import Icono from "./Icono";
import kilometro41 from "../assets/portadas/album-kilometro-41.png";
import cartasSinEnviar from "../assets/portadas/genero-2-cartas-sin-enviar.png";
import cantoDeGuadua from "../assets/portadas/genero-1-canto-de-guadua.png";
import generoTropical from "../assets/portadas/genero-tropical.png";
import generoSalsa from "../assets/portadas/genero-salsa.png";
import neonYNeblina from "../assets/portadas/genero-4-neon-y-neblina.png";
import generoMusicaAndina from "../assets/portadas/genero-musica-andina.png";
import bajoElGuadual from "../assets/portadas/album-bajo-el-guadual.png";

const DESTINOS = {
  verCatalogo: "#catalogo",
};

/* Imágenes alineadas al color de portada de cada género (orden API). */
const IMAGENES = [
  kilometro41,
  cartasSinEnviar,
  cantoDeGuadua,
  generoTropical,
  generoSalsa,
  neonYNeblina,
  generoMusicaAndina,
  bajoElGuadual,
];

function colorDeFondo(token) {
  if (typeof token !== "string" || !token.startsWith("portada/")) return undefined;
  return `var(--${token.replace("/", "-")})`;
}

const Generos = ({ textos, generos }) => {
  const textoG = textos?.paginas?.inicioPublico?.generos;
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches
  );
  const [compacto, setCompacto] = useState(
    () => window.matchMedia("(max-width: 1099px)").matches
  );
  const lista = (Array.isArray(generos) ? generos : []).slice(
    0,
    compacto ? 4 : 8
  );

  useEffect(() => {
    const consultaMovil = window.matchMedia("(max-width: 899px)");
    const consultaCompacto = window.matchMedia("(max-width: 1099px)");
    const actualizarMovil = (evento) => setMovil(evento.matches);
    const actualizarCompacto = (evento) => setCompacto(evento.matches);
    consultaMovil.addEventListener("change", actualizarMovil);
    consultaCompacto.addEventListener("change", actualizarCompacto);
    return () => {
      consultaMovil.removeEventListener("change", actualizarMovil);
      consultaCompacto.removeEventListener("change", actualizarCompacto);
    };
  }, []);

  return (
    <div className="contenedor-generos">
      <div className="contenedor generos-fila">
        <div className="generos-superior">
          <p className={`generos-titulo ${movil ? "titular-h3" : "titular-h2"}`}>
            {textoG?.titulo}
          </p>
          <a href={DESTINOS.verCatalogo} className="generos-enlace cuerpo-p-fuerte">
            {textoG?.enlaces?.verCatalogo}
            <Icono nombre="flecha" />
          </a>
        </div>
        {lista.length > 0 && (
          <div className="generos-lista">
            {lista.map((genero, indice) => (
              <div
                key={genero.id}
                className="genero-caja"
                style={{ backgroundColor: colorDeFondo(genero.color) }}
              >
                {genero.nombre && (
                  <p className="genero-caja-nombre titular-h3">{genero.nombre}</p>
                )}
                {IMAGENES[indice] && (
                  <img
                    className="genero-caja-imagen"
                    src={IMAGENES[indice]}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Generos;
