import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import mareaViva from "../assets/portadas/genero-marea-viva.png";
import pleamar from "../assets/portadas/genero-pleamar.png";
import generoInstrumental from "../assets/portadas/genero-instrumental.png";
import todoElRuido from "../assets/portadas/genero-3-todo-el-ruido.png";
import frailejonAcustico from "../assets/portadas/genero-frailejon-acustico.png";

const LIMITE_CATALOGO = 12;

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

/* En inicio se muestran 8 (4 en compacto); las 2 últimas del bloque de 8 usan portadas previas. */
const IMAGENES_INICIO = [
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
  if (typeof token !== "string") return undefined;
  // Lo-fi (y similares) a veces vienen como fondo/sutil; usamos un color de portada.
  const valor = token.startsWith("portada/") ? token : "portada/3";
  return `var(--${valor.replace("/", "-")})`;
}

const Generos = ({
  textos,
  generos,
  seleccionable = false,
  generoId = null,
  onSeleccionarGenero,
}) => {
  const textoInicio = textos?.paginas?.inicioPublico?.generos;
  const textoCatalogo = textos?.paginas?.catalogo?.encabezado;
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches
  );
  const [compacto, setCompacto] = useState(
    () => window.matchMedia("(max-width: 1099px)").matches
  );

  const lista = (Array.isArray(generos) ? generos : []).slice(
    0,
    seleccionable ? LIMITE_CATALOGO : compacto ? 4 : 8
  );
  const portadas = seleccionable ? IMAGENES : IMAGENES_INICIO;

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

  if (seleccionable) {
    return (
      <div className="contenedor-generos contenedor-generos-catalogo">
        <div className="contenedor-2 generos-fila">
          <div className="generos-superior generos-superior-catalogo">
            <p className={`generos-titulo ${movil ? "titular-h3" : "titular-h1"}`}>
              {textoCatalogo?.titulo}
            </p>
            <p className="generos-descripcion cuerpo-m">{textoCatalogo?.subtitulo}</p>
          </div>
          {lista.length > 0 && (
            <div className="generos-lista">
              {lista.map((genero, indice) => {
                const seleccionado = generoId === genero.id;
                return (
                  <button
                    key={genero.id}
                    type="button"
                    className={`genero-caja${seleccionado ? " seleccionado" : ""}`}
                    style={{ backgroundColor: colorDeFondo(genero.color) }}
                    aria-pressed={seleccionado}
                    onClick={() =>
                      onSeleccionarGenero?.(seleccionado ? null : genero.id)
                    }
                  >
                    {genero.nombre && (
                      <p className="genero-caja-nombre titular-h3">{genero.nombre}</p>
                    )}
                    {portadas[indice] && (
                      <img
                        className="genero-caja-imagen"
                        src={portadas[indice]}
                        alt=""
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor-generos">
      <div className="contenedor generos-fila">
        <div className="generos-superior">
          <p className={`generos-titulo ${movil ? "titular-h3" : "titular-h2"}`}>
            {textoInicio?.titulo}
          </p>
          <Link to="/catalogo" className="generos-enlace cuerpo-p-fuerte">
            {textoInicio?.enlaces?.verCatalogo}
            <Icono nombre="flecha" />
          </Link>
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
                {portadas[indice] && (
                  <img
                    className="genero-caja-imagen"
                    src={portadas[indice]}
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
