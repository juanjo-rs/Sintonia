import React, { useState } from "react";
import "./Cookies.css";
import Icono from "./Icono";
import { borrarCookie, guardarCookie, leerCookie } from "../cookies";
import { borrarAccesibilidadGuardada, guardarAccesibilidadConsentida } from "../hooks/useAccesibilidad";

const Cookies = ({ textos, idioma }) => {
  const banner = textos?.cookies?.banner;
  const [visible, setVisible] = useState(() => !leerCookie("consentimiento"));

  if (!visible || !banner?.titulo || !banner?.texto) return null;

  function aceptar() {
    guardarCookie("consentimiento", "aceptado");
    if (idioma === "es" || idioma === "en") guardarCookie("idioma", idioma);
    guardarAccesibilidadConsentida();
    setVisible(false);
  }

  function rechazar() {
    guardarCookie("consentimiento", "rechazado");
    borrarCookie("idioma");
    borrarAccesibilidadGuardada();
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
