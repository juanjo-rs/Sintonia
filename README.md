# Sintonia

Proyecto React y Vite de una plataforma musical. Incluye inicio público, catálogo por géneros, textos e idioma desde API, cookies, panel de accesibilidad y despliegue listo para Vercel. No depende de las otras carpetas del material.

## Ejecutar

Requiere Node.js 20.19 o posterior en la rama 20, o Node.js 22.12 o posterior.

```sh
npm ci
npm run dev
```

Abre la dirección que muestre Vite. El inicio queda en `/` y el catálogo en `/catalogo`.

```sh
npm run build
npm run preview
```

## Organización

- `src/pages/Inicio.jsx`: composición del home (Hero, Destacados, Géneros, CTA).
- `src/pages/Catalogo.jsx`: géneros, detalle por URL, artistas, álbumes y canciones.
- `src/components/`: cada componente incluye su `.jsx` y, cuando aplica, su `.css`.
- `src/styles/tokens.css`: colores de marca, fuentes, espaciado y radio.
- `src/styles/global.css`: reset, layout del sitio y elementos comunes.
- `src/cookies.js`: lectura, guardado y eliminación de cookies.
- `src/hooks/useTextos.js`: textos de interfaz según idioma.
- `src/hooks/useGeneros.js`: listado de géneros.
- `src/hooks/useAlbumes.js`: álbumes destacados/populares.
- `src/hooks/useGeneroDetalle.js`: detalle de un género (artistas, álbumes, pistas).
- `src/hooks/useGeneroEnUrl.js`: persiste el género elegido en `?genero=`.
- `src/hooks/useAccesibilidad.js`: tamaño de texto y preferencias del panel.
- `vercel.json`: rewrite SPA hacia `index.html`.

## Rutas

- `/`: home público.
- `/catalogo`: catálogo; al elegir un género se añade `?genero=<id>`.

`App.jsx` monta el idioma, carga textos y envuelve las páginas en `Layout` (Navbar, contenido, Footer y cookies).

## Componentes incluidos

- `Accesibilidad.jsx` y `Accesibilidad.css`.
- `Albumes.jsx` y `Albumes.css`.
- `Artistas.jsx` y `Artistas.css`.
- `Canciones.jsx` y `Canciones.css`.
- `Cookies.jsx` y `Cookies.css`.
- `Cta.jsx` y `Cta.css`.
- `Destacados.jsx` y `Destacados.css`.
- `Footer.jsx` y `Footer.css`.
- `Generos.jsx` y `Generos.css`.
- `Hero.jsx` y `Hero.css`.
- `Icono.jsx`.
- `Layout.jsx`.
- `Logo.jsx`.
- `Navbar.jsx` y `Navbar.css`.
- `Portada.jsx` y `Portada.css`.

## Reutilizar

Importa el componente y entrega sus datos por props. El componente importa su CSS. El archivo `main.jsx` carga tokens y estilos globales una vez; otra página que use estos componentes debe mantener esas dos importaciones.

`Layout` compone Navbar, Outlet, Footer y el banner de cookies. Los textos e idioma llegan por props desde `App` y se comparten con las páginas mediante el contexto del `Outlet`.

Las portadas locales en `src/assets/portadas/` complementan la presentación cuando la API no trae imagen o se necesita un respaldo visual. Los estilos usan las clases y los tokens del proyecto; para copiar una sección a otra aplicación incluye sus componentes hijos, su CSS y los tokens que utiliza.

## Datos y API

La interfaz carga textos, géneros y álbumes desde la API remota. Sin red o si la API falla, los hooks dejan listas vacías o estado de error; el navbar valida la forma de los textos antes de usarlos.

API configurada: `https://yanethm-sintonia-api.fly.dev/api/v1`.

Endpoints usados:

- `GET /textos?idioma=es` o `idioma=en`
- `GET /generos`
- `GET /generos/:id`
- `GET /albumes?orden=populares&limite=6`

Las listas llegan en `datos` y los textos en `textos`. Consulta el [diseño y contrato](https://yanethm-sintonia-api.fly.dev/docs/diseno/) antes de adaptar campos. Los tokens de referencia están en [tokens.css](https://yanethm-sintonia-api.fly.dev/docs/diseno/tokens.css).

Los hooks hacen el `fetch` cancelable (AbortController y timeout), manejan carga y error, y pasan el resultado a los componentes de presentación. Esos componentes no necesitan conocer la URL de la API.

## Cookies e idioma

El banner permite aceptar o rechazar. Solo se persiste el idioma si el consentimiento está aceptado; al rechazar no se guarda la preferencia de idioma.

Se usan los nombres `consentimiento` e `idioma`, con `Path=/`, `Max-Age` de un año y `SameSite=Lax`. Si no hay consentimiento aceptado, el idioma inicial es `es`.

No se instalan servicios de analítica ni publicidad y no se crea una sesión de usuario.

## Accesibilidad

Panel de accesibilidad con tamaño de texto incremental, preferencias aplicadas al documento y CSS para movimiento reducido. Menú e idioma con etiquetas ARIA desde los textos de la API. Comprueba teclado y zoom al modificar los componentes.

## Alcance

Inicio público y catálogo por género. Los botones de cuenta son parte de la interfaz; no hay registro, reproducción real ni compra. Las portadas e iconos locales están en `src/assets/`. El despliegue en Vercel usa el rewrite de `vercel.json` para rutas del cliente.
