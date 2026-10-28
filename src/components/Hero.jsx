import React from "react";
import "./Hero.css";

const Hero = ({ textos }) => {
  const textosH = textos?.paginas?.inicioPublico?.hero;

  return (
    <section id="inicio" className="hero">
      <div className="contenedor">
        <div className="contenedor-hero">
          <div className="hero-etiqueta">
            <p className="hero-etiqueta-texto detalle-nota-fuerte">{textosH?.etiquetas?.temporada}</p></div>
          <h1 className="titular-gigante">{textosH?.titulo}</h1>
          <p className="cuerpo-g">{textosH?.subtitulo}</p>
          <div className="hero-botones">
            <a
              href="#crear-cuenta"
              className="hero-boton-cuenta cuerpo-m-fuerte"
            >
              {textosH?.botones?.crearCuentaGratis}
            </a>
            <a href="#catalogo" className="hero-boton-catalogo cuerpo-m-fuerte">
              {textosH?.botones?.explorarCatalogo}
            </a>
          </div>
        </div>
        <div className="contenedor-visual" aria-hidden="true">
          <div className="collage">
            <div className="collage-principal">
              <span className="collage-disco" />
              <span className="collage-punto" />
            </div>
            <div className="collage-rayas" />
            <div className="collage-ondas" />
            <div className="collage-nota">
              <p className="titular-h4">Sube la niebla</p>
              <p className="titular-h4">por la montaña</p>
              <p className="cuerpo-p">y el camino canta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


