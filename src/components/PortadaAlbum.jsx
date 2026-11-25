import React from "react";
import "./PortadaAlbum.css";

function colorToken(token) {
  if (typeof token !== "string") return undefined;
  if (token.startsWith("#") || token.startsWith("var(")) return token;
  if (token.includes("/")) return `var(--${token.replace("/", "-")})`;
  return undefined;
}

const PortadaAlbum = ({ portada, className = "" }) => {
  const fondo =
    colorToken(portada?.colores?.[0]) ||
    colorToken(portada?.fondo) ||
    "var(--portada-2)";
  const figura =
    colorToken(portada?.colores?.[1]) ||
    colorToken(portada?.figura) ||
    "var(--portada-4)";
  const detalle =
    colorToken(portada?.colores?.[2]) ||
    colorToken(portada?.detalle) ||
    "var(--fijo-blanco)";
  const patron = portada?.nombre || "rayas";

  return (
    <div
      className={`portada-album portada-album--${patron} ${className}`.trim()}
      style={{
        "--portada-fondo": fondo,
        "--portada-figura": figura,
        "--portada-detalle": detalle,
      }}
      aria-hidden="true"
    />
  );
};

export default PortadaAlbum;
