import cantoDeGuadua from "../assets/portadas/album-canto-de-guadua.png";
import todoElRuido from "../assets/portadas/album-todo-el-ruido.png";
import bajoElGuadual from "../assets/portadas/album-bajo-el-guadual.png";
import neonYNeblina from "../assets/portadas/album-neon-y-neblina.png";
import cartasSinEnviar from "../assets/portadas/album-cartas-sin-enviar.png";
import kilometro41 from "../assets/portadas/album-kilometro-41.png";
import generoTropical from "../assets/portadas/genero-tropical.png";
import generoSalsa from "../assets/portadas/genero-salsa.png";
import generoMusicaAndina from "../assets/portadas/genero-musica-andina.png";
import generoInstrumental from "../assets/portadas/genero-instrumental.png";
import mareaViva from "../assets/portadas/genero-marea-viva.png";
import pleamar from "../assets/portadas/genero-pleamar.png";
import frailejonAcustico from "../assets/portadas/genero-frailejon-acustico.png";
import generoFolk from "../assets/portadas/genero-folk.png";

/** Mismas 6 portadas que Destacados, en el orden de álbumes populares. */
export const PORTADAS_DESTACADOS = [
  cantoDeGuadua,
  todoElRuido,
  bajoElGuadual,
  neonYNeblina,
  cartasSinEnviar,
  kilometro41,
];

const PORTADAS_POR_ID = {
  "alb_luz-de-paramo": cantoDeGuadua,
  "alb_todo-el-ruido": todoElRuido,
  "alb_sabado-en-la-plaza": bajoElGuadual,
  "alb_neon-y-neblina": neonYNeblina,
  "alb_domingo-lento": cartasSinEnviar,
  "alb_ventana-empanada": kilometro41,
  "alb_canto-de-guadua": cantoDeGuadua,
  "alb_tejados-mojados": bajoElGuadual,
  "alb_flor-de-escarcha": cartasSinEnviar,
  "alb_domingo-de-feria": todoElRuido,
  "alb_cuerdas-y-voltios": todoElRuido,
  "alb_onda-corta": generoFolk,
  "alb_barrio-arriba": generoTropical,
  "alb_fiesta-en-la-vereda": kilometro41,
  "alb_ascensor-danado": neonYNeblina,
  "alb_sobremesa": generoSalsa,
  "alb_subestacion": neonYNeblina,
  "alb_mapa-de-curvas": cartasSinEnviar,
};

const PORTADAS_FALLBACK = [
  ...PORTADAS_DESTACADOS,
  generoTropical,
  generoSalsa,
  generoMusicaAndina,
  generoInstrumental,
  mareaViva,
  pleamar,
  frailejonAcustico,
  generoFolk,
];

function hashTexto(texto) {
  let h = 0;
  for (let i = 0; i < String(texto).length; i++) {
    h = (h * 31 + String(texto).charCodeAt(i)) >>> 0;
  }
  return h;
}

export function imagenPortadaAlbum(albumId, indice = 0) {
  if (albumId && PORTADAS_POR_ID[albumId]) return PORTADAS_POR_ID[albumId];
  if (typeof indice === "number" && indice >= 0 && indice < PORTADAS_DESTACADOS.length) {
    return PORTADAS_DESTACADOS[indice];
  }
  const base = hashTexto(albumId || "");
  return PORTADAS_FALLBACK[(base + (indice || 0)) % PORTADAS_FALLBACK.length];
}
