import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Icono from "../components/Icono";
import Logo from "../components/Logo";
import { useSesion } from "../context/SesionContext";
import cantoDeGuadua from "../assets/portadas/album-canto-de-guadua.png";
import todoElRuido from "../assets/portadas/album-todo-el-ruido.png";
import cartasSinEnviar from "../assets/portadas/album-cartas-sin-enviar.png";
import neonYNeblina from "../assets/portadas/album-neon-y-neblina.png";
import bajoElGuadual from "../assets/portadas/album-bajo-el-guadual.png";
import generoSalsa from "../assets/portadas/genero-salsa.png";
import generoFolk from "../assets/portadas/genero-folk.png";
import frailejonAcustico from "../assets/portadas/genero-frailejon-acustico.png";
import "./Ingresar.css";

const PORTADAS = [
  cantoDeGuadua,
  todoElRuido,
  cartasSinEnviar,
  neonYNeblina,
  bajoElGuadual,
  generoSalsa,
  generoFolk,
  frailejonAcustico,
];

const PORTADAS_MOVIL = [todoElRuido, cantoDeGuadua, cartasSinEnviar];

function reemplazarSegundos(plantilla, segundos) {
  if (typeof plantilla !== "string") return "";
  return plantilla.replace("{segundos}", String(segundos ?? ""));
}

const Ingresar = ({ textos }) => {
  const navigate = useNavigate();
  const { usuario, cargando: cargandoSesion, ingresar } = useSesion();
  const copia = textos?.paginas?.ingresar;
  const derechos = textos?.footer?.legal?.derechos?.replace(
    "{anio}",
    String(new Date().getFullYear()),
  );
  const form = copia?.formulario;
  const errores = copia?.errores;

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mantenerSesion, setMantenerSesion] = useState(false);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorCampos, setErrorCampos] = useState({});
  const [aviso, setAviso] = useState(null);
  const [bloqueoHasta, setBloqueoHasta] = useState(0);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [movil, setMovil] = useState(
    () => window.matchMedia("(max-width: 899px)").matches,
  );

  useEffect(() => {
    if (!copia?.seo?.titulo) return;
    document.title = copia.seo.titulo;
  }, [copia?.seo?.titulo]);

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 899px)");
    const actualizar = (evento) => setMovil(evento.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    if (!bloqueoHasta) {
      setSegundosRestantes(0);
      return undefined;
    }
    function actualizar() {
      const resto = Math.max(0, Math.ceil((bloqueoHasta - Date.now()) / 1000));
      setSegundosRestantes(resto);
      setAviso((previo) =>
        previo?.tipo === "intentos"
          ? {
              ...previo,
              texto: reemplazarSegundos(errores?.demasiadosIntentos?.texto, resto),
            }
          : previo,
      );
      if (resto <= 0) setBloqueoHasta(0);
    }
    actualizar();
    const id = setInterval(actualizar, 250);
    return () => clearInterval(id);
  }, [bloqueoHasta, errores?.demasiadosIntentos?.texto]);

  if (!cargandoSesion && usuario) {
    return <Navigate to="/" replace />;
  }

  function limpiarAvisos() {
    setErrorCampos({});
    setAviso(null);
  }

  function validarLocal() {
    const campos = {};
    if (!correo.trim() && errores?.correoObligatorio) {
      campos.correo = errores.correoObligatorio;
    }
    if (!clave && errores?.claveObligatoria) {
      campos.clave = errores.claveObligatoria;
    }
    return campos;
  }

  async function enviar(evento) {
    evento.preventDefault();
    if (enviando || segundosRestantes > 0) return;

    limpiarAvisos();
    const locales = validarLocal();
    if (Object.keys(locales).length > 0) {
      setErrorCampos(locales);
      setAviso({
        tipo: "campos",
        titulo: errores?.camposObligatorios?.titulo,
        texto: errores?.camposObligatorios?.texto,
      });
      return;
    }

    setEnviando(true);
    try {
      await ingresar({
        correo: correo.trim(),
        clave,
        mantenerSesion,
      });
      navigate("/", { replace: true });
    } catch (error) {
      if (error?.status === 401 || error?.codigo === "credenciales_invalidas") {
        setCorreo("");
        setClave("");
        setErrorCampos({
          ...(errores?.correoObligatorio
            ? { correo: errores.correoObligatorio }
            : {}),
          ...(errores?.claveObligatoria
            ? { clave: errores.claveObligatoria }
            : {}),
        });
        setAviso({
          tipo: "credenciales",
          titulo: errores?.credenciales?.titulo,
          texto: errores?.credenciales?.texto,
        });
        return;
      }
      if (error?.status === 422 || error?.codigo === "validacion") {
        setErrorCampos(error.campos || {});
        setAviso({
          tipo: "campos",
          titulo: errores?.camposObligatorios?.titulo,
          texto: errores?.camposObligatorios?.texto,
        });
        return;
      }
      if (error?.status === 429 || error?.codigo === "demasiadas_peticiones") {
        const espera = Number(error.retryAfter) || 30;
        setBloqueoHasta(Date.now() + espera * 1000);
        setAviso({
          tipo: "intentos",
          titulo: errores?.demasiadosIntentos?.titulo,
          texto: reemplazarSegundos(errores?.demasiadosIntentos?.texto, espera),
        });
        return;
      }
      setAviso({
        tipo: "conexion",
        titulo: errores?.conexion?.titulo,
        texto: errores?.conexion?.texto,
      });
    } finally {
      setEnviando(false);
    }
  }

  const bloqueado = segundosRestantes > 0;
  const esConexion = aviso?.tipo === "conexion";
  const textoBoton = enviando
    ? form?.mensajes?.ingresando
    : esConexion
      ? errores?.conexion?.botones?.reintentar
      : form?.botones?.ingresar;

  return (
    <main className="ingresar">
      <section className="ingresar-panel ingresar-panel-formulario">
        <div className="ingresar-collage-movil" aria-hidden="true">
          {PORTADAS_MOVIL.map((src, indice) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`ingresar-collage-pieza ingresar-collage-pieza--${indice + 1}`}
              decoding="async"
            />
          ))}
        </div>

        <Link to="/" className="ingresar-logo" aria-label={textos?.navbar?.logo?.aria}>
          <Logo className="ingresar-logo-marca" />
          {textos?.navbar?.logo?.texto && (
            <span className="ingresar-logo-nombre">{textos.navbar.logo.texto}</span>
          )}
        </Link>

        <div className="ingresar-cuerpo">
          <header className="ingresar-encabezado">
            <h1
              className={`ingresar-titulo ${movil ? "titular-h2" : "titular-h1"}`}
            >
              {form?.titulo}
            </h1>
            <p className="cuerpo-m ingresar-subtitulo">{form?.subtitulo}</p>
          </header>

          {aviso && (
            <div
              className={`ingresar-aviso ingresar-aviso--${aviso.tipo}`}
              role="alert"
            >
              <span className="ingresar-aviso-icono" aria-hidden="true">
                <Icono nombre="alerta" />
              </span>
              <div className="ingresar-aviso-texto">
                {aviso.titulo && (
                  <p className="cuerpo-p-fuerte ingresar-aviso-titulo">{aviso.titulo}</p>
                )}
                {aviso.texto && <p className="cuerpo-p">{aviso.texto}</p>}
              </div>
            </div>
          )}

          <form className="ingresar-formulario" onSubmit={enviar} noValidate>
            <div className="ingresar-campo">
              <label className="cuerpo-p-fuerte" htmlFor="ingresar-correo">
                {form?.etiquetas?.correo}
              </label>
              <input
                id="ingresar-correo"
                name="correo"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={form?.placeholders?.correo}
                value={correo}
                onChange={(evento) => {
                  setCorreo(evento.target.value);
                  if (errorCampos.correo || aviso) limpiarAvisos();
                }}
                aria-invalid={Boolean(errorCampos.correo)}
                aria-describedby={
                  typeof errorCampos.correo === "string"
                    ? "ingresar-correo-error"
                    : undefined
                }
                disabled={enviando}
              />
              {typeof errorCampos.correo === "string" && (
                <p id="ingresar-correo-error" className="ingresar-campo-error detalle-nota">
                  {errorCampos.correo}
                </p>
              )}
            </div>

            <div className="ingresar-campo">
              <label className="cuerpo-p-fuerte" htmlFor="ingresar-clave">
                {form?.etiquetas?.clave}
              </label>
              <div className="ingresar-clave-fila">
                <input
                  id="ingresar-clave"
                  name="clave"
                  type={mostrarClave ? "text" : "password"}
                  autoComplete="current-password"
                  value={clave}
                  onChange={(evento) => {
                    setClave(evento.target.value);
                    if (errorCampos.clave || aviso) limpiarAvisos();
                  }}
                  aria-invalid={Boolean(errorCampos.clave)}
                  aria-describedby={
                    typeof errorCampos.clave === "string"
                      ? "ingresar-clave-error"
                      : undefined
                  }
                  disabled={enviando}
                />
                <button
                  type="button"
                  className="ingresar-clave-toggle"
                  aria-label={
                    mostrarClave
                      ? form?.botones?.ocultarClave
                      : form?.botones?.mostrarClave
                  }
                  onClick={() => setMostrarClave((valor) => !valor)}
                >
                  <Icono nombre={mostrarClave ? "ojo-oculto" : "ojo"} />
                </button>
              </div>
              {typeof errorCampos.clave === "string" && (
                <p id="ingresar-clave-error" className="ingresar-campo-error detalle-nota">
                  {errorCampos.clave}
                </p>
              )}
            </div>

            <div className="ingresar-opciones">
              <label className="ingresar-mantener cuerpo-p">
                <input
                  type="checkbox"
                  checked={mantenerSesion}
                  onChange={(evento) => setMantenerSesion(evento.target.checked)}
                  disabled={enviando}
                />
                <span>{form?.etiquetas?.mantenerSesion}</span>
              </label>

              <p className="ingresar-olvido cuerpo-p">
                <span className="ingresar-enlace-inactivo">
                  {form?.enlaces?.olvidasteClave}
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="ingresar-enviar"
              disabled={enviando || bloqueado}
            >
              {enviando && (
                <span className="ingresar-spinner" aria-hidden="true">
                  <Icono nombre="spinner" />
                </span>
              )}
              <span>{textoBoton}</span>
            </button>
          </form>

          <p className="ingresar-cuenta cuerpo-p">
            <span>{form?.mensajes?.sinCuenta}</span>{" "}
            <span className="ingresar-enlace-inactivo">
              {form?.enlaces?.crearCuenta}
            </span>
          </p>
        </div>

        {derechos && (
          <p className="ingresar-pie detalle-nota">{derechos}</p>
        )}
      </section>

      <aside className="ingresar-panel ingresar-panel-visual" aria-hidden="true">
        <div className="ingresar-visual-contenido">
          <div className="ingresar-portadas">
            {PORTADAS.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="ingresar-portada"
                decoding="async"
              />
            ))}
          </div>
          <div className="ingresar-visual-textos">
            <p className="ingresar-visual-titulo">
              {copia?.presentacion?.titulo}
            </p>
            <p className="cuerpo-g ingresar-visual-texto">
              {copia?.presentacion?.texto}
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Ingresar;
