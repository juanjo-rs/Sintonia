import React from "react";
import "./Hero.css";

const Hero = ({ textos }) => {
  const textosH = textos?.paginas?.inicioPublico?.hero;

  return (
    <section id="inicio" className="hero">
      <div className="contenedor">
        <p className="hero-etiqueta">{textosH?.etiquetas?.temporada}</p>
        <h1 className="hero-titulo">{textosH?.titulo}</h1>
        <p className="hero-subtitulo">{textosH?.subtitulo}</p>
        <div className="hero-botones">
          <a
            href="#crear-cuenta"
            className="hero-botonCuenta cuerpo-m-fuerte"
          >
            {textosH?.botones?.crearCuentaGratis}
          </a>
          <a href="#catalogo" className="hero-botonCatalogo">
            {textosH?.botones?.explorarCatalogo}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;


