import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Icono from "./Icono.jsx";
import Logo from "./Logo.jsx";

const DESTINOS = {
  inicio: "#inicio",
  catalogo: "#catalogo",
};

const Navbar = ({ textos, cargando, idioma, onCambiarIdioma }) => {
  const [abierto, setAbierto] = useState(false);
  const botonMenu = useRef(null);
  const nav = textos?.navbar;
  const abrir = textos?.menuMovil?.abrir;
  const cerrar = textos?.menuMovil?.cerrar;
  const botones = nav?.botones?.invitado;
  const codigos = textos?.idioma?.codigos;
  const etiquetaIdioma = textos?.idioma?.tituloCorto;
  const enlaces = Object.entries(nav?.enlaces ?? {}).filter(
    ([clave, etiqueta]) => DESTINOS[clave] && typeof etiqueta === "string" && etiqueta.trim()
  );

  useEffect(() => {
    function cerrarConEscape(evento) {
      if (evento.key !== "Escape") return;
      if (!abierto) return;
      setAbierto(false);
      botonMenu.current?.focus();
    }
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [abierto]);

  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 900px)");
    function alCambiar(evento) {
      if (evento.matches) setAbierto(false);
    }
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  return (
    <header className={`navbar${abierto ? " is-abierto" : ""}`}>
      <nav
        className="navbar-contenedor contenedor"
        aria-label={nav?.aria?.navegacion}
      >
        <a
          href="#inicio"
          className="navbar-contenedor-logo-nombre"
          aria-label={nav?.logo?.aria}
          onClick={() => setAbierto(false)}
        >
          <Logo className="navbar-logo" />
          {nav?.logo?.texto && (
            <span className="navbar-nombre">{nav.logo.texto}</span>
          )}
        </a>

        <div className="navbar-movil-acciones">
          {botones?.ingresar && (
            <a
              href="#ingresar"
              className="navbar-ingresar navbar-ingresar-movil"
              onClick={() => setAbierto(false)}
            >
              <span className="navbar-ingresar-texto">{botones.ingresar}</span>
            </a>
          )}
          <button
            type="button"
            ref={botonMenu}
            className="navbar-icono"
            aria-label={abierto ? cerrar : abrir}
            aria-expanded={abierto}
            aria-controls="navbar-panel"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <Icono nombre={abierto ? "cerrar" : "menu"} />
          </button>
        </div>

        <div
          className={`navbar-panel${abierto ? " is-abierto" : ""}`}
          aria-busy={cargando}
          id="navbar-panel"
        >
          {enlaces.length > 0 && (
            <ul className="navbar-enlaces">
              {enlaces.map(([clave, etiqueta]) => (
                <li key={clave}>
                  <a
                    className={`navbar-${clave}`}
                    href={DESTINOS[clave]}
                    onClick={() => setAbierto(false)}
                  >
                    {etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="navbar-espacio" aria-hidden="true" />

          <div className="navbar-acciones">
            {codigos && (
              <div className="navbar-idioma">
                {etiquetaIdioma && (
                  <p className="navbar-idioma-etiqueta">{etiquetaIdioma}</p>
                )}
                <div
                  className="navbar-idioma-switch"
                  role="group"
                  aria-label={nav?.aria?.idioma ?? etiquetaIdioma}
                >
                  {Object.entries(codigos).map(([codigo, etiqueta]) => (
                    <button
                      key={codigo}
                      type="button"
                      className={`cuerpo-p-fuerte${idioma === codigo ? " is-activo" : ""}`}
                      aria-pressed={idioma === codigo}
                      onClick={() => onCambiarIdioma?.(codigo)}
                    >
                      {etiqueta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="navbar-accesos">
              {botones?.ingresar && (
                <a
                  href="#ingresar"
                  className="navbar-ingresar"
                  onClick={() => setAbierto(false)}
                >
                  <span className="navbar-ingresar-texto">{botones.ingresar}</span>
                </a>
              )}
              {botones?.crearCuenta && (
                <a
                  href="#crear-cuenta"
                  className="navbar-crearcuenta"
                  onClick={() => setAbierto(false)}
                >
                  <span className="navbar-crearcuenta-texto">{botones.crearCuenta}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
