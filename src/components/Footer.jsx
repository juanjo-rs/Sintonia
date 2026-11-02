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
  const añoActual = new Date().getFullYear()

  return (
    <footer className="pie-pagina">
      <div className="contenedor pie-pagina-fila">
        <div className="contenedor-footer">
          <Logo className="logo-footer" />
          <p className="lema-footer cuerpo-p">{footerT?.lema}</p>
        </div>
        <div className="contenedor-columnas">
        {Object.entries(footerT?.columnas ?? {}).map(([clave, columna]) => (
          <div key={clave} className="columna-footer">
            {columna?.titulo && (
              <p className="columna-footer-titulo detalle-etiqueta">{columna.titulo}</p>
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
        <div className="contenedor-footer-inferior">
          <p className="footer-informacion detalle-nota">{footerT?.legal?.derechos.replace("{anio}",añoActual)}</p>
          <p className="footer-terminos-uso detalle-nota">{footerT?.legal?.nota}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
