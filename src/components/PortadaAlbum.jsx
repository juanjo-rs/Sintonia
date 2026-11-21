import React from "react";
import "./PortadaAlbum.css";

function colorToken(token) {
  if (typeof token !== "string" || !token.includes("/")) return undefined;
  return `var(--${token.replace("/", "-")})`;
}

const PortadaAlbum = ({ portada, className = "" }) => {
  const fondo =
    colorToken(portada?.colores?.[0]) || portada?.fondo || "var(--portada-2)";
  const figura =
    colorToken(portada?.colores?.[1]) || portada?.figura || "var(--portada-4)";
  const patron = portada?.nombre || "rayas";

  return (
    <div
      className={`portada-album portada-album--${patron} ${className}`.trim()}
      style={{ "--portada-fondo": fondo, "--portada-figura": figura }}
      aria-hidden="true"
    />
  );
};

export default PortadaAlbum;
