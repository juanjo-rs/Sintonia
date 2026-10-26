import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Icono from "./Icono.jsx";
import Logo from "./Logo.jsx";

const DESTINOS = {
  descubrir: "#descubrir",
  planes: "#planes",
  paraArtistas: "#para-artistas",
  ayuda: "#ayuda",
};

const Navbar = ({ textos, cargando, error, idioma, onCambiarIdioma }) => {
  const [abierto, setAbierto] = useState(false);
  const [idiomaAbierto, setIdiomaAbierto] = useState(false);
  const botonMenu = useRef(null);
  const panelIdioma = useRef(null);
  const nav = textos?.navbar;
  const ingles = idioma === "en";
  const abrir = textos?.menuMovil?.abrir ?? (ingles ? "Open menu" : "Abrir menú");
  const cerrar = textos?.menuMovil?.cerrar ?? (ingles ? "Close menu" : "Cerrar menú");
  const enlaces = Object.entries(nav?.enlaces?.invitado ?? {}).filter(
    ([clave]) => DESTINOS[clave]
  );
  const botones = nav?.botones?.invitado;
  const codigos = textos?.idioma?.codigos;
  const opcionesIdioma = textos?.idioma?.opciones;
  const titId = textos?.idioma?.titulo;
  const notaIdi = textos?.idioma?.nota;
  useEffect(() => {
    function cerrarConEscape(evento) {
      if (evento.key !== "Escape") return;
      if (idiomaAbierto) {
        setIdiomaAbierto(false);
        return;
      }
      if (abierto) {
        setAbierto(false);
        botonMenu.current?.focus();
      }
    }

    function cerrarIdiomaFuera(evento) {
      if (!idiomaAbierto) return;
      if (panelIdioma.current && !panelIdioma.current.contains(evento.target)) {
        setIdiomaAbierto(false);
      }
    }

    document.addEventListener("keydown", cerrarConEscape);
    document.addEventListener("mousedown", cerrarIdiomaFuera);
    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.removeEventListener("mousedown", cerrarIdiomaFuera);
    };
  }, [abierto, idiomaAbierto]);

  function elegirIdioma(codigo) {
    onCambiarIdioma?.(codigo);
    setIdiomaAbierto(false);
    setAbierto(false);
  }

  return (
    <header className="navbar">
      <nav
        className="navbar-interior contenedor"
        aria-label={nav?.aria?.navegacion ?? "Navegación principal"}
      >
        <a
          href="#inicio"
          className="navbar-marca"
          aria-label={nav?.logo?.aria ?? "Inicio"}
          onClick={() => setAbierto(false)}
        >
          <Logo className="navbar-logo" />
        </a>

        <div className="navbar-movil-acciones">
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
          <ul className="navbar-enlaces">
            {enlaces.map(([clave, etiqueta]) => (
              <li key={clave}>
                <a
                  className="cuerpo-m"
                  href={DESTINOS[clave]}
                  onClick={() => setAbierto(false)}
                >
                  {etiqueta}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-acciones">
            <div className="navbar-idioma" ref={panelIdioma}>
              <button
                type="button"
                className="navbar-idioma-boton cuerpo-p-fuerte"
                aria-label={nav?.aria?.idioma}
                aria-expanded={idiomaAbierto}
                aria-haspopup="listbox"
                onClick={() => setIdiomaAbierto((valor) => !valor)}
              >
                <Icono nombre="idioma" />
                <span>{codigos?.[idioma] ?? idioma.toUpperCase()}</span>
                <Icono nombre="chevron" />
              </button>
              {idiomaAbierto && (
                <div className="navbar-idioma-lista">
                  <p className="detalle-etiqueta">{titId}</p>

                  <ul role="listbox">
                    {Object.entries(opcionesIdioma ?? { es: "Español", en: "English" }).map(
                      ([codigo, etiqueta]) => (
                        <li key={codigo} role="option" aria-selected={idioma === codigo}>
                          <button
                            type="button"
                            className={idioma === codigo ? "is-activo" : undefined}
                            onClick={() => elegirIdioma(codigo)}
                          >
                            <span className="navbar-idioma-opcion">
                              <span className="cuerpo-p-fuerte">{etiqueta}</span>
                              <span className="detalle-nota">{`lang="${codigo}"`}</span>
                            </span>
                            {idioma === codigo && (
                              <span className="navbar-idioma-check">
                                <Icono nombre="check" />
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    )}
                  </ul>

                  <p className="detalle-nota">{notaIdi}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              className="navbar-icono navbar-accesibilidad"
              aria-label={nav?.aria?.accesibilidad}
            >
              <Icono nombre="accesibilidad" />
            </button>

            {botones && (
              <>
                <a
                  href="#ingresar"
                  className="navbar-enlace-texto cuerpo-m"
                  onClick={() => setAbierto(false)}
                >
                  {botones.ingresar}
                </a>
                <a
                  href="#crear-cuenta"
                  className="navbar-accion cuerpo-m-fuerte"
                  onClick={() => setAbierto(false)}
                >
                  {botones.crearCuenta}
                </a>
              </>
            )}
          </div>

          {error && (
            <p className="navbar-aviso" role="alert">
              {ingles
                ? "Could not load navigation texts."
                : "No se pudieron cargar los textos de navegación."}
            </p>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
