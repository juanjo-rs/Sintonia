import React from "react";
import "./Footer.css";
import Logo from "./Logo.jsx";

const DESTINOS = {
  inicio: "#inicio",
  catalogo: "#catalogo",
  ingresar: "#ingresar",
  crearCuenta: "#crear-cuenta",
  terminos: "#terminos",
};

const Footer = ({ textos }) => {
  const footerT = textos?.footer;

  return (
    <footer className="pie-pagina">
      <div className="contenedor pie-pagina-fila">
        <div className="contenedor-footer">
          <Logo className="logo-footer" />
          <p className="lema-footer">{footerT?.lema}</p>
        </div>
        <div className="contenedor-columnas">
        {Object.entries(footerT?.columnas ?? {}).map(([clave, columna]) => (
          <div key={clave} className="columna-footer">
            {columna?.titulo && (
              <p className="columna-footer-titulo cuerpo-p-fuerte">{columna.titulo}</p>
            )}
            {Object.entries(columna?.enlaces ?? {}).map(([claveEnlace, etiqueta]) => (
              DESTINOS[claveEnlace] && typeof etiqueta === "string" && etiqueta.trim() ? (
                <a
                  key={claveEnlace}
                  className="columna-footer-enlace cuerpo-p"
                  href={DESTINOS[claveEnlace]}
                >
                  {etiqueta}
                </a>
              ) : null
            ))}
          </div>
        ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
