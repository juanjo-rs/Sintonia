import React, { useState } from "react";
import "./Cookies.css";
import Icono from "./Icono";

const UN_ANIO = 60 * 60 * 24 * 365;

export function leerCookie(nombre) {
  const partes = document.cookie ? document.cookie.split("; ") : [];
  const fila = partes.find((item) => item.startsWith(`${nombre}=`));
  if (!fila) return null;
  return decodeURIComponent(fila.slice(nombre.length + 1));
}

export function guardarCookie(nombre, valor) {
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; Path=/; Max-Age=${UN_ANIO}; SameSite=Lax`;
}

export function borrarCookie(nombre) {
  document.cookie = `${nombre}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function idiomaInicial() {
  if (leerCookie("consentimiento") !== "aceptado") return "es";
  return leerCookie("idioma") === "en" ? "en" : "es";
}

const Cookies = ({ textos, idioma }) => {
  const banner = textos?.cookies?.banner;
  const [visible, setVisible] = useState(() => !leerCookie("consentimiento"));

  if (!visible || !banner?.titulo || !banner?.texto) return null;

  function aceptar() {
    guardarCookie("consentimiento", "aceptado");
    if (idioma === "es" || idioma === "en") guardarCookie("idioma", idioma);
    setVisible(false);
  }

  function rechazar() {
    guardarCookie("consentimiento", "rechazado");
    borrarCookie("idioma");
    setVisible(false);
  }

  return (
    <div className="cookies" role="dialog" aria-labelledby="cookies-titulo">
      <span className="cookies-icono">
        <Icono nombre="cookie" />
      </span>
      <div className="cookies-textos">
        <p id="cookies-titulo" className="cookies-titulo titular-h4">
          {banner.titulo}
        </p>
        <p className="cookies-texto cuerpo-p">{banner.texto}</p>
      </div>
      <div className="cookies-botones">
        {banner.botones?.rechazar && (
          <button
            type="button"
            className="cookies-rechazar cuerpo-p-fuerte"
            onClick={rechazar}
          >
            {banner.botones.rechazar}
          </button>
        )}
        {banner.botones?.aceptar && (
          <button
            type="button"
            className="cookies-aceptar cuerpo-p-fuerte"
            onClick={aceptar}
          >
            {banner.botones.aceptar}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cookies;
