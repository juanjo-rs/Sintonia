import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Accesibilidad.css";
import Icono from "./Icono";
import { useAccesibilidad } from "../hooks/useAccesibilidad";

const DESTINOS = {
  declaracion: "#declaracion-accesibilidad",
};

const Accesibilidad = ({ textos, abierta, onCerrar, anclaRef }) => {
  const panel = textos?.accesibilidad;
  const dialogo = useRef(null);
  const [coords, setCoords] = useState(null);
  const {
    valores,
    cambiar,
    reducirTamano,
    aumentarTamano,
    restablecer,
    puedeReducir,
    puedeAumentar,
  } = useAccesibilidad();

  useLayoutEffect(() => {
    if (!abierta) {
      setCoords(null);
      return;
    }

    function colocar() {
      const caja = dialogo.current;
      if (!caja) return;

      const movil = window.matchMedia("(max-width: 899px)").matches;
      const margen = 16;

      if (movil) {
        setCoords({ centrado: true });
        return;
      }

      const ancla = anclaRef?.current;
      if (!ancla) return;

      const rect = ancla.getBoundingClientRect();
      const ancho = caja.offsetWidth || 320;
      const alto = caja.offsetHeight || 420;
      const espacioAbajo = window.innerHeight - rect.bottom - margen * 2;
      const maxAlto = Math.max(240, Math.min(espacioAbajo, window.innerHeight - margen * 2));

      let left = rect.right - ancho;
      left = Math.max(margen, Math.min(left, window.innerWidth - ancho - margen));

      let top = rect.bottom + 8;
      if (top + Math.min(alto, maxAlto) > window.innerHeight - margen) {
        top = Math.max(margen, rect.top - 8 - Math.min(alto, maxAlto));
      }

      setCoords({
        top,
        left,
        width: undefined,
        maxHeight: maxAlto,
        centrado: false,
      });
    }

    colocar();
    window.addEventListener("resize", colocar);
    window.addEventListener("scroll", colocar, true);
    return () => {
      window.removeEventListener("resize", colocar);
      window.removeEventListener("scroll", colocar, true);
    };
  }, [abierta, anclaRef, panel]);

  useEffect(() => {
    if (!abierta) return;
    function alTecla(evento) {
      if (evento.key === "Escape") onCerrar?.();
    }
    document.addEventListener("keydown", alTecla);
    return () => document.removeEventListener("keydown", alTecla);
  }, [abierta, onCerrar]);

  useEffect(() => {
    if (!abierta) return;
    const antes = document.activeElement;
    dialogo.current?.querySelector("button")?.focus();
    return () => {
      if (antes instanceof HTMLElement) antes.focus();
    };
  }, [abierta]);

  if (!abierta || !panel) return null;

  const valorTexto =
    typeof panel.tamanoTexto?.valor === "string"
      ? panel.tamanoTexto.valor.replace("{valor}", String(valores.tamanoTexto))
      : `${valores.tamanoTexto} %`;

  return (
    <div className="accesibilidad-capa" onClick={onCerrar}>
      <div
        ref={dialogo}
        className={`accesibilidad-panel${coords?.centrado ? " is-centrado" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={panel.titulo}
        style={
          coords && !coords.centrado
            ? {
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                maxHeight: `${coords.maxHeight}px`,
              }
            : undefined
        }
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="accesibilidad-cabecera">
          {panel.titulo && (
            <p className="accesibilidad-titulo titular-h3">{panel.titulo}</p>
          )}
          <button
            type="button"
            className="accesibilidad-cerrar"
            aria-label={panel.aria?.cerrar}
            onClick={onCerrar}
          >
            <Icono nombre="cerrar" />
          </button>
        </div>

        <div className="accesibilidad-opciones">
          {panel.tamanoTexto?.etiqueta && (
            <div className="accesibilidad-fila accesibilidad-fila-tamano">
              <p className="accesibilidad-etiqueta cuerpo-m-fuerte">
                {panel.tamanoTexto.etiqueta}
              </p>
              <div className="accesibilidad-tamano">
                <button
                  type="button"
                  className="accesibilidad-tamano-boton"
                  aria-label={panel.tamanoTexto.reducir}
                  disabled={!puedeReducir}
                  onClick={reducirTamano}
                >
                  <Icono nombre="menos" />
                </button>
                <span className="accesibilidad-tamano-valor cuerpo-m-fuerte">
                  {valorTexto}
                </span>
                <button
                  type="button"
                  className="accesibilidad-tamano-boton"
                  aria-label={panel.tamanoTexto.aumentar}
                  disabled={!puedeAumentar}
                  onClick={aumentarTamano}
                >
                  <Icono nombre="mas" />
                </button>
              </div>
            </div>
          )}

          {panel.altoContraste?.etiqueta && (
            <label className="accesibilidad-fila">
              <span className="accesibilidad-textos">
                <span className="accesibilidad-etiqueta cuerpo-m-fuerte">
                  {panel.altoContraste.etiqueta}
                </span>
                {panel.altoContraste.ayuda && (
                  <span className="accesibilidad-ayuda cuerpo-p">
                    {panel.altoContraste.ayuda}
                  </span>
                )}
              </span>
              <input
                type="checkbox"
                className="accesibilidad-switch"
                checked={valores.altoContraste}
                onChange={(evento) =>
                  cambiar({ altoContraste: evento.target.checked })
                }
              />
            </label>
          )}

          {panel.reducirMovimiento?.etiqueta && (
            <label className="accesibilidad-fila">
              <span className="accesibilidad-textos">
                <span className="accesibilidad-etiqueta cuerpo-m-fuerte">
                  {panel.reducirMovimiento.etiqueta}
                </span>
                {panel.reducirMovimiento.ayuda && (
                  <span className="accesibilidad-ayuda cuerpo-p">
                    {panel.reducirMovimiento.ayuda}
                  </span>
                )}
              </span>
              <input
                type="checkbox"
                className="accesibilidad-switch"
                checked={valores.reducirMovimiento}
                onChange={(evento) =>
                  cambiar({ reducirMovimiento: evento.target.checked })
                }
              />
            </label>
          )}

          {panel.subrayarEnlaces?.etiqueta && (
            <label className="accesibilidad-fila">
              <span className="accesibilidad-textos">
                <span className="accesibilidad-etiqueta cuerpo-m-fuerte">
                  {panel.subrayarEnlaces.etiqueta}
                </span>
                {panel.subrayarEnlaces.ayuda && (
                  <span className="accesibilidad-ayuda cuerpo-p">
                    {panel.subrayarEnlaces.ayuda}
                  </span>
                )}
              </span>
              <input
                type="checkbox"
                className="accesibilidad-switch"
                checked={valores.subrayarEnlaces}
                onChange={(evento) =>
                  cambiar({ subrayarEnlaces: evento.target.checked })
                }
              />
            </label>
          )}

          {panel.espaciado?.etiqueta && (
            <label className="accesibilidad-fila">
              <span className="accesibilidad-textos">
                <span className="accesibilidad-etiqueta cuerpo-m-fuerte">
                  {panel.espaciado.etiqueta}
                </span>
                {panel.espaciado.ayuda && (
                  <span className="accesibilidad-ayuda cuerpo-p">
                    {panel.espaciado.ayuda}
                  </span>
                )}
              </span>
              <input
                type="checkbox"
                className="accesibilidad-switch"
                checked={valores.espaciado}
                onChange={(evento) =>
                  cambiar({ espaciado: evento.target.checked })
                }
              />
            </label>
          )}
        </div>

        {panel.mensajes?.nota && (
          <p className="accesibilidad-nota cuerpo-p">{panel.mensajes.nota}</p>
        )}

        <div className="accesibilidad-pie">
          {panel.enlaces?.declaracion && (
            <a
              href={DESTINOS.declaracion}
              className="accesibilidad-declaracion cuerpo-p-fuerte"
            >
              {panel.enlaces.declaracion}
            </a>
          )}
          {panel.botones?.restablecer && (
            <button
              type="button"
              className="accesibilidad-restablecer cuerpo-p-fuerte"
              onClick={restablecer}
            >
              {panel.botones.restablecer}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accesibilidad;
