import React, { useEffect, useState } from "react";
import "./Hero.css";

const TEXTO ={
  es: ["Sube la niebla","por la montaña","y el camino canta"],
  en: ["The fog rises","up the mountain","and the path sings."]
}
const Hero = ({ textos, idioma, generos }) => {
  const textosH = textos?.paginas?.inicioPublico?.hero;
  const TextosCifras = textos?.paginas?.inicioPublico?.cifras;
  const CambioT = TEXTO[idioma] ?? TEXTO.es;
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches
  );

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 899px)");
    const actualizar = (evento) => setMovil(evento.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="contenedor">
        <div className="contenedor-hero">
          <div className="hero-etiqueta">
            <p className="hero-etiqueta-texto detalle-nota-fuerte">{textosH?.etiquetas?.temporada}</p></div>
          <h1 className= {movil ? "titular-h1" : "titular-gigante"}>{textosH?.titulo}</h1>
          <p className={movil ? "hero-subtitulo cuerpo-m" : "hero-subtitulo cuerpo-g"}>{textosH?.subtitulo}</p>
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
          <div className="contenedor-cifras">
            <div className="contenedor-cifras-canciones">
              <p className="canciones-cifra dato-cifra">{TextosCifras?.canciones?.valor}</p>
              <p className="canciones-etiqueta detalle-nota">{TextosCifras?.canciones?.etiqueta}</p>
            </div>
            <div className="contenedor-cifras-genero">
              {generos?.length > 0 && (
                <p className="genero-cifra dato-cifra">{generos.length}</p>
              )}
              <p className="genero-etiqueta detalle-nota">{TextosCifras?.generos?.etiqueta}</p>
            </div>
            <div className="contenedor-cifras-corte">
              <p className="corte-cifra dato-cifra">{TextosCifras?.cortes?.valor}</p>
              <p className="corte-etiqueta detalle-nota">{TextosCifras?.cortes?.etiqueta}</p>
            </div>
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
              <p className="titular-h4">{CambioT[0]}</p>
              <p className="titular-h4">{CambioT[1]}</p>
              <p className="cuerpo-p">{CambioT[2]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


