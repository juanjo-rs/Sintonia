import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Icono from "./Icono.jsx";
import Logo from "./Logo.jsx";
import Accesibilidad from "./Accesibilidad.jsx";
import { useSesion } from "../context/SesionContext";

const DESTINOS = {
  inicio: "/",
  catalogo: "/catalogo",
};

const Navbar = ({ textos, cargando, idioma, onCambiarIdioma }) => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useSesion();
  const [abierto, setAbierto] = useState(false);
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const [accesibilidadAbierta, setAccesibilidadAbierta] = useState(false);
  const botonMenu = useRef(null);
  const botonUsuario = useRef(null);
  const menuUsuario = useRef(null);
  const botonAccesibilidad = useRef(null);

  function abrirAccesibilidad(evento) {
    botonAccesibilidad.current = evento.currentTarget;
    setAccesibilidadAbierta(true);
  }
  const nav = textos?.navbar;
  const abrir = textos?.menuMovil?.abrir;
  const cerrar = textos?.menuMovil?.cerrar;
  const botones = nav?.botones?.invitado;
  const usuarioT = nav?.usuario;
  const cerrarSesionMovil = textos?.menuMovil?.botones?.conSesion?.cerrarSesion;
  const codigos = textos?.idioma?.codigos;
  const etiquetaIdioma = textos?.idioma?.tituloCorto;
  const ariaAccesibilidad = nav?.aria?.accesibilidad;
  const tituloAccesibilidad = textos?.accesibilidad?.titulo;
  const enlaces = Object.entries(nav?.enlaces ?? {}).filter(
    ([clave, etiqueta]) => DESTINOS[clave] && typeof etiqueta === "string" && etiqueta.trim()
  );

  useEffect(() => {
    function cerrarConEscape(evento) {
      if (evento.key !== "Escape") return;
      if (menuUsuarioAbierto) {
        setMenuUsuarioAbierto(false);
        botonUsuario.current?.focus();
        return;
      }
      if (!abierto) return;
      setAbierto(false);
      botonMenu.current?.focus();
    }
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [abierto, menuUsuarioAbierto]);

  useEffect(() => {
    if (!menuUsuarioAbierto) return undefined;
    function alClicFuera(evento) {
      if (
        menuUsuario.current?.contains(evento.target) ||
        botonUsuario.current?.contains(evento.target)
      ) {
        return;
      }
      setMenuUsuarioAbierto(false);
    }
    document.addEventListener("mousedown", alClicFuera);
    return () => document.removeEventListener("mousedown", alClicFuera);
  }, [menuUsuarioAbierto]);

  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 900px)");
    function alCambiar(evento) {
      if (evento.matches) setAbierto(false);
    }
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  async function alCerrarSesion() {
    setMenuUsuarioAbierto(false);
    setAbierto(false);
    await cerrarSesion();
    navigate("/");
  }

  const iniciales = usuario?.iniciales || "?";
  const nombreCorto = usuario?.nombre?.split(/\s+/)[0] || usuario?.nombre;
  const colorAvatarMovil = usuario?.colorHex || "var(--portada-1)";
  const sesionIniciada = textos?.menuMovil?.secciones?.cuenta;

  return (
    <header className={`navbar${abierto ? " is-abierto" : ""}`}>
      <nav
        className="navbar-contenedor contenedor"
        aria-label={nav?.aria?.navegacion}
      >
        <Link
          to="/"
          className="navbar-contenedor-logo-nombre"
          aria-label={nav?.logo?.aria}
          onClick={() => setAbierto(false)}
        >
          <Logo className="navbar-logo" />
          {nav?.logo?.texto && (
            <span className="navbar-nombre">{nav.logo.texto}</span>
          )}
        </Link>

        <div className="navbar-movil-acciones">
          {!usuario && botones?.ingresar && (
            <Link
              to="/ingresar"
              className="navbar-ingresar navbar-ingresar-movil"
              onClick={() => setAbierto(false)}
            >
              <span className="navbar-ingresar-texto">{botones.ingresar}</span>
            </Link>
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
                  <Link
                    className={`navbar-${clave}`}
                    to={DESTINOS[clave]}
                    onClick={() => setAbierto(false)}
                  >
                    {etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="navbar-espacio" aria-hidden="true" />

          <div className="navbar-acciones">
            {ariaAccesibilidad && (
              <button
                type="button"
                className="navbar-icono navbar-accesibilidad-boton navbar-accesibilidad-escritorio"
                aria-label={ariaAccesibilidad}
                aria-expanded={accesibilidadAbierta}
                onClick={abrirAccesibilidad}
              >
                <Icono nombre="accesibilidad" />
              </button>
            )}

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

            {ariaAccesibilidad && (
              <div className="navbar-accesibilidad-movil">
                {tituloAccesibilidad && (
                  <p className="navbar-accesibilidad-titulo cuerpo-m-fuerte">
                    {tituloAccesibilidad}
                  </p>
                )}
                <button
                  type="button"
                  className="navbar-icono navbar-accesibilidad-boton"
                  aria-label={ariaAccesibilidad}
                  aria-expanded={accesibilidadAbierta}
                  onClick={abrirAccesibilidad}
                >
                  <Icono nombre="accesibilidad" />
                </button>
              </div>
            )}

            <div className="navbar-accesos">
              {usuario ? (
                <>
                  <div className="navbar-usuario">
                    <button
                      type="button"
                      ref={botonUsuario}
                      className="navbar-avatar"
                      aria-label={usuarioT?.menu}
                      aria-expanded={menuUsuarioAbierto}
                      aria-haspopup="menu"
                      onClick={() => setMenuUsuarioAbierto((valor) => !valor)}
                    >
                      <span>{iniciales}</span>
                    </button>
                    {menuUsuarioAbierto && (
                      <div
                        className="navbar-usuario-menu"
                        role="menu"
                        ref={menuUsuario}
                      >
                        <div className="navbar-usuario-cabecera">
                          <span className="navbar-avatar navbar-avatar-menu" aria-hidden="true">
                            <span>{iniciales}</span>
                          </span>
                          <div className="navbar-usuario-datos">
                            <p className="navbar-usuario-nombre cuerpo-p-fuerte">
                              {usuario.nombre}
                            </p>
                            {usuario.correo && (
                              <p className="navbar-usuario-correo detalle-nota">
                                {usuario.correo}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="navbar-usuario-separador" aria-hidden="true" />
                        <button
                          type="button"
                          role="menuitem"
                          className="navbar-usuario-item"
                          onClick={alCerrarSesion}
                        >
                          <Icono nombre="salir" />
                          <span>{usuarioT?.cerrarSesion || cerrarSesionMovil}</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="navbar-sesion-movil">
                    <div className="navbar-sesion-movil-persona">
                      <span
                        className="navbar-avatar navbar-avatar-sesion"
                        style={{ background: colorAvatarMovil }}
                        aria-hidden="true"
                      >
                        <span>{iniciales}</span>
                      </span>
                      <div className="navbar-sesion-movil-datos">
                        <p className="cuerpo-p-fuerte">{nombreCorto}</p>
                        {sesionIniciada && (
                          <p className="detalle-nota">{sesionIniciada}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="navbar-cerrar-movil"
                      onClick={alCerrarSesion}
                    >
                      <span>{cerrarSesionMovil || usuarioT?.cerrarSesion}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {botones?.ingresar && (
                    <Link
                      to="/ingresar"
                      className="navbar-ingresar"
                      onClick={() => setAbierto(false)}
                    >
                      <span className="navbar-ingresar-texto">{botones.ingresar}</span>
                    </Link>
                  )}
                  {botones?.crearCuenta && (
                    <span className="navbar-crearcuenta navbar-crearcuenta-inactivo">
                      <span className="navbar-crearcuenta-texto">{botones.crearCuenta}</span>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Accesibilidad
        textos={textos}
        abierta={accesibilidadAbierta}
        anclaRef={botonAccesibilidad}
        onCerrar={() => setAccesibilidadAbierta(false)}
      />
    </header>
  );
};

export default Navbar;
