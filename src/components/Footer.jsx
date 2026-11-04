import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "./Logo.jsx";

const DESTINOS = {
  inicio: "/",
  catalogo: "/catalogo",
  ingresar: "#ingresar",
  crearCuenta: "#crear-cuenta",
  terminos: "#terminos",
  accesibilidad: "#accesibilidad"
};

const RUTAS_APP = new Set(["/", "/catalogo"]);

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
            {Object.entries(columna?.enlaces ?? {}).map(([claveEnlace, etiqueta]) => {
              const destino = DESTINOS[claveEnlace];
              if (!destino || typeof etiqueta !== "string" || !etiqueta.trim()) {
                return null;
              }
              if (RUTAS_APP.has(destino)) {
                return (
                  <Link
                    key={claveEnlace}
                    className="columna-footer-enlace cuerpo-p"
                    to={destino}
                  >
                    {etiqueta}
                  </Link>
                );
              }
              return (
                <a
                  key={claveEnlace}
                  className="columna-footer-enlace cuerpo-p"
                  href={destino}
                >
                  {etiqueta}
                </a>
              );
            })}
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
