import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Icono from "../components/Icono";
import { useAlbumDetalle } from "../hooks/useAlbumDetalle";
import {
  anioDeFecha,
  etiquetaConPlantilla,
  formatearDuracion,
  formatearMinutos,
  formatearReproducciones,
} from "../utils/formato";
import { imagenPortadaAlbum } from "../utils/portadasAlbumes";
import "./Album.css";

const Album = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { textos } = useOutletContext();
  const { album, pistas, masDelArtista, cargando, error } =
    useAlbumDetalle(albumId);
  const copia = textos?.paginas?.album;
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches,
  );

  useEffect(() => {
    if (!album?.titulo || !copia?.seo?.titulo) return;
    document.title = etiquetaConPlantilla(copia.seo.titulo, {
      titulo: album.titulo,
    });
  }, [album?.titulo, copia?.seo?.titulo]);

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 899px)");
    const actualizar = (evento) => setMovil(evento.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  if (cargando && !album) {
    return (
      <div className="contenedor album-estado">
        <p className="cuerpo-m" role="status">
          Cargando álbum…
        </p>
      </div>
    );
  }

  if (error === "no_encontrado" || (!cargando && !album)) {
    return (
      <div className="contenedor album-estado">
        <p className="titular-h2">{copia?.noEncontrado?.titulo}</p>
        <p className="cuerpo-m">{copia?.noEncontrado?.texto}</p>
        <Link to="/catalogo" className="album-volver cuerpo-p-fuerte">
          {copia?.noEncontrado?.botones?.volver || "Volver al catálogo"}
        </Link>
      </div>
    );
  }

  if (!album) return null;

  const tipo =
    copia?.encabezado?.etiquetas?.tipo?.[album.tipo] || album.tipo || "Álbum";
  const anio = anioDeFecha(album.fechaPublicacion);
  const cantidad = album.totalPistas ?? pistas.length;
  const cancionesEtiqueta = etiquetaConPlantilla(
    cantidad === 1
      ? copia?.encabezado?.canciones?.uno
      : copia?.encabezado?.canciones?.otro,
    { cantidad },
  );
  const duracionEtiqueta = etiquetaConPlantilla(copia?.encabezado?.duracion, {
    minutos: formatearMinutos(album.duracionSeg),
  });
  const artistaNombre = album.artista?.nombre || "";
  const metaDetalle = [anio, cancionesEtiqueta, duracionEtiqueta]
    .filter(Boolean)
    .join(" · ");
  const tituloMas = etiquetaConPlantilla(copia?.masDelArtista?.titulo, {
    artista: artistaNombre,
  });
  const verDiscografia = copia?.masDelArtista?.enlaces?.verDiscografia;
  const avisoLegal =
    album.copyright ||
    album.avisoLegal ||
    etiquetaConPlantilla(copia?.avisoLegal || copia?.copyright, {
      anio,
    }) ||
    (anio
      ? `© ${anio} Discos del Ruiz · Audio de ejemplo de uso libre`
      : null);

  const pistasOrdenadas = [...pistas].sort(
    (a, b) => (a?.numero ?? 0) - (b?.numero ?? 0),
  );

  function volver() {
    if (typeof window.history.state?.idx === "number" && window.history.state.idx > 0) {
      navigate(-1);
      return;
    }
    navigate("/catalogo");
  }

  const imagenPortada = imagenPortadaAlbum(album.id);

  return (
    <div className="pagina-album">
      <section className="album-hero">
        <div className="contenedor album-hero-fila">
          <button
            type="button"
            className="album-atras"
            onClick={volver}
            aria-label={copia?.noEncontrado?.botones?.volver || "Volver"}
          >
            <Icono nombre="flecha" />
          </button>

          <img
            className="album-hero-portada"
            src={imagenPortada}
            alt=""
            decoding="async"
          />

          <div className="album-hero-textos">
            <span className="album-tipo">{tipo}</span>
            <h1
              className={`album-titulo ${movil ? "titular-h1" : "titular-display"}`}
            >
              {album.titulo}
            </h1>
            {(artistaNombre || metaDetalle) && (
              <p className="album-meta">
                <img
                  className="album-meta-mini"
                  src={imagenPortada}
                  alt=""
                  decoding="async"
                />
                {artistaNombre && (
                  <span className="album-meta-artista cuerpo-p-fuerte">
                    {artistaNombre}
                  </span>
                )}
                {artistaNombre && metaDetalle && (
                  <span className="album-meta-sep cuerpo-p"> · </span>
                )}
                {metaDetalle && (
                  <span className="album-meta-detalle cuerpo-p">{metaDetalle}</span>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="album-tabla-bloque">
        <div className="contenedor">
          {/* Desktop: tabla */}
          <div
            className="album-tabla album-tabla--escritorio"
            role="table"
            aria-label={album.titulo}
          >
            <div className="album-tabla-cabecera" role="row">
              <span role="columnheader">
                {copia?.tabla?.etiquetas?.numero || "#"}
              </span>
              <span role="columnheader">
                {copia?.tabla?.etiquetas?.titulo || "Título"}
              </span>
              <span role="columnheader" className="album-col-repros">
                {copia?.tabla?.etiquetas?.reproducciones || "Reproducciones"}
              </span>
              <span role="columnheader" className="album-col-duracion">
                {copia?.tabla?.etiquetas?.duracion || "Duración"}
              </span>
            </div>
            {pistasOrdenadas.map((pista) => (
              <div key={pista.id} className="album-tabla-fila" role="row">
                <span className="cuerpo-m" role="cell">
                  {pista.numero}
                </span>
                <div className="album-pista-celda" role="cell">
                  <img
                    className="album-pista-mini"
                    src={imagenPortada}
                    alt=""
                    decoding="async"
                  />
                  <div className="album-pista-textos">
                    <p className="cuerpo-m-fuerte">{pista.titulo}</p>
                    {pista.artista?.nombre && (
                      <p className="cuerpo-p album-pista-artista">
                        {pista.artista.nombre}
                      </p>
                    )}
                  </div>
                </div>
                <span className="cuerpo-p album-col-repros" role="cell">
                  {formatearReproducciones(pista.reproducciones)}
                </span>
                <span className="cuerpo-p album-col-duracion" role="cell">
                  {formatearDuracion(pista.duracionSeg)}
                </span>
              </div>
            ))}
          </div>

          {/* Móvil: lista con miniatura */}
          <ul className="album-lista-movil">
            {pistasOrdenadas.map((pista) => (
              <li key={pista.id} className="album-pista-movil">
                <img
                  className="album-pista-mini"
                  src={imagenPortada}
                  alt=""
                  decoding="async"
                />
                <div className="album-pista-textos">
                  <p className="cuerpo-m-fuerte">{pista.titulo}</p>
                  {pista.artista?.nombre && (
                    <p className="cuerpo-p album-pista-artista">
                      {pista.artista.nombre}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {album.fechaPublicacion && (
            <p className="album-fecha cuerpo-p">
              {new Date(album.fechaPublicacion).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          {avisoLegal && (
            <p className="album-aviso detalle-nota">{avisoLegal}</p>
          )}
        </div>
      </section>

      {masDelArtista.length > 0 && (
        <section className="album-mas">
          <div className="contenedor album-mas-fila">
            <div className="album-mas-cabecera">
              {tituloMas && (
                <p
                  className={`album-mas-titulo ${movil ? "titular-h3" : "titular-h2"}`}
                >
                  {tituloMas}
                </p>
              )}
              {verDiscografia && (
                <Link
                  to="/catalogo"
                  className="album-mas-enlace cuerpo-p-fuerte"
                >
                  {verDiscografia}
                </Link>
              )}
            </div>
            <div className="album-mas-lista">
              {masDelArtista.map((item) => {
                const tipoItem =
                  copia?.encabezado?.etiquetas?.tipo?.[item.tipo] || item.tipo;
                const meta = etiquetaConPlantilla(
                  copia?.masDelArtista?.etiquetas?.anioYTipo,
                  {
                    anio: anioDeFecha(item.fechaPublicacion),
                    tipo: tipoItem,
                  },
                );
                return (
                  <Link
                    key={item.id}
                    to={`/album/${item.id}`}
                    className="album-mas-caja"
                  >
                    <img
                      className="album-mas-portada"
                      src={imagenPortadaAlbum(item.id)}
                      alt=""
                      decoding="async"
                    />
                    <div className="album-mas-textos">
                      <p className="cuerpo-p-fuerte">{item.titulo}</p>
                      {meta && <p className="cuerpo-p">{meta}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Album;
