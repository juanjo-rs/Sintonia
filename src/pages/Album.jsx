import React, { useEffect } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Icono from "../components/Icono";
import PortadaAlbum from "../components/PortadaAlbum";
import { useAlbumDetalle } from "../hooks/useAlbumDetalle";
import {
  anioDeFecha,
  etiquetaConPlantilla,
  formatearDuracion,
  formatearMinutos,
  formatearReproducciones,
} from "../utils/formato";
import "./Album.css";

const Album = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { textos } = useOutletContext();
  const { album, pistas, masDelArtista, cargando, error } =
    useAlbumDetalle(albumId);
  const copia = textos?.paginas?.album;

  useEffect(() => {
    if (!album?.titulo || !copia?.seo?.titulo) return;
    document.title = etiquetaConPlantilla(copia.seo.titulo, {
      titulo: album.titulo,
    });
  }, [album?.titulo, copia?.seo?.titulo]);

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
  const resumen = etiquetaConPlantilla(copia?.encabezado?.etiquetas?.resumen, {
    artista: album.artista?.nombre || "",
    anio,
    canciones: cancionesEtiqueta,
    duracion: duracionEtiqueta,
  });
  const tituloMas = etiquetaConPlantilla(copia?.masDelArtista?.titulo, {
    artista: album.artista?.nombre || "",
  });

  const pistasOrdenadas = [...pistas].sort(
    (a, b) => (a?.numero ?? 0) - (b?.numero ?? 0),
  );

  return (
    <div className="pagina-album">
      <section className="album-hero">
        <div className="contenedor album-hero-fila">
          <button
            type="button"
            className="album-atras"
            onClick={() => navigate(-1)}
            aria-label="Volver"
          >
            <Icono nombre="flecha" />
          </button>

          <PortadaAlbum portada={album.portada} className="album-hero-portada" />

          <div className="album-hero-textos">
            <span className="album-tipo">{tipo}</span>
            <h1 className="album-titulo titular-display">{album.titulo}</h1>
            {resumen && <p className="album-meta cuerpo-m">{resumen}</p>}
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
                <div className="album-pista-textos" role="cell">
                  <p className="cuerpo-m-fuerte">{pista.titulo}</p>
                  {pista.artista?.nombre && (
                    <p className="cuerpo-p album-pista-artista">
                      {pista.artista.nombre}
                    </p>
                  )}
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
                <PortadaAlbum
                  portada={pista.portada || album.portada}
                  className="album-pista-mini"
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
            <p className="album-fecha detalle-nota">
              {new Date(album.fechaPublicacion).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </section>

      {masDelArtista.length > 0 && (
        <section className="album-mas">
          <div className="contenedor album-mas-fila">
            {tituloMas && (
              <p className="album-mas-titulo titular-h2">{tituloMas}</p>
            )}
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
                    <PortadaAlbum portada={item.portada} />
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
