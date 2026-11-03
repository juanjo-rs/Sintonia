import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Generos from "../components/Generos";
import Destacados from "../components/Destacados";
import Artistas from "../components/Artistas";
import Albumes from "../components/Albumes";
import Canciones from "../components/Canciones";
import { useGeneros } from "../hooks/useGeneros";
import { useGeneroDetalle } from "../hooks/useGeneroDetalle";
import { useGeneroEnUrl } from "../hooks/useGeneroEnUrl";

const Catalogo = () => {
  const { textos } = useOutletContext();
  const { generos } = useGeneros();
  const [generoId, setGeneroId] = useGeneroEnUrl();
  const {
    genero,
    artistas,
    albumes,
    pistas,
    error: errorGenero,
  } = useGeneroDetalle(generoId);

  useEffect(() => {
    if (errorGenero === "no_encontrado") setGeneroId(null);
  }, [errorGenero, setGeneroId]);

  const textoVacio = textos?.paginas?.catalogo?.vacio;
  const detalleVisible = Boolean(generoId) && errorGenero !== "no_encontrado";

  return (
    <div className="catalogo-cuerpo">
      <Generos
        textos={textos}
        generos={generos}
        seleccionable
        generoId={generoId}
        onSeleccionarGenero={setGeneroId}
      />
      {detalleVisible ? (
        <>
          <Artistas textos={textos} artistas={artistas} />
          <Albumes
            textos={textos}
            generoId={generoId}
            generoNombre={genero?.nombre}
            albumes={albumes}
          />
          <Canciones textos={textos} pistas={pistas} />
          {errorGenero === "error" && textoVacio && (
            <div className="contenedor-2">
              <p className="titular-h3">{textoVacio.titulo}</p>
              <p className="cuerpo-m">{textoVacio.texto}</p>
            </div>
          )}
        </>
      ) : (
        <Destacados textos={textos} variante="catalogo" />
      )}
    </div>
  );
};

export default Catalogo;
