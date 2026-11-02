import React, { useEffect, useState } from "react";
import "./Cta.css"

const Cta = ({ textos }) => {
    const textoCt = textos?.paginas?.inicioPublico?.cta;
    const [movil, setMovil] = useState(
        () => window.matchMedia("(max-width: 899px)").matches
    );

    useEffect(() => {
    const consulta = window.matchMedia("(max-width: 899px)");
    const actualizar = (evento) => setMovil(evento.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
    }, []);

    return(
        <div className="contenedor-cta">
            <div className="contenedor">
                <div className="contenedor-cta-columnas">
                    <div className="cta-informacion">
                        <h1 className={`cta-titulo ${movil ? "titular-h3" : "titular-h1"}`}>{textoCt?.titulo}</h1>
                        <p className={`cta-texto ${movil ? "cuerpo-p" : "cuerpo-m"}`}>{textoCt?.texto}</p>
                    </div>
                    <div className="cta-boton">
                      <p className="cta-botones cuerpo-m-fuerte">{textoCt?.botones?.crearCuentaGratis}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cta