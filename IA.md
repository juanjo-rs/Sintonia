# Registro de uso de inteligencia artificial

Este archivo resume algunas consultas realizadas a una IA durante el desarrollo de Sintonía y cómo se aplicaron o ajustaron sus respuestas. Las decisiones finales se revisaron en el código del proyecto.

## Entrada 1: textos e idioma desde la API

**Consulta:** Cargar los textos de la interfaz según el idioma seleccionado, validar que la respuesta traiga las claves necesarias del navbar y manejar carga, error y reintento.

**Aporte de la IA:** Sugirió un hook con `AbortController`, timeout y validación de la forma de `textos` antes de guardarlos en estado. También recomendó no renderizar etiquetas críticas si faltan campos.

**Aplicación:** Se implementó `useTextos.js` con consulta a `/textos?idioma=`, validación de enlaces y aria del navbar, y recarga mediante un contador de intento. El idioma solo se persiste en cookie cuando el consentimiento está aceptado.

## Entrada 2: catálogo por género en la URL

**Consulta:** Hacer que al elegir un género en el catálogo la selección sobreviva al recargar la página.

**Aporte de la IA:** Propuso sincronizar el id del género con un query param (`?genero=`), actualizar la URL con `history.pushState` y escuchar `popstate` para el botón atrás del navegador.

**Aplicación:** Se creó `useGeneroEnUrl.js` y se conectó con `useGeneroDetalle.js` en `Catalogo.jsx`. Si el género no existe (404), se limpia el param y se muestra el estado vacío del catálogo.

## Entrada 3: panel de accesibilidad

**Consulta:** Completar el panel de accesibilidad con tamaño de texto por pasos, alto contraste, movimiento reducido y espaciado de lectura, sin romper el layout en móvil.

**Aporte de la IA:** Recomendó aplicar preferencias con atributos en `document.documentElement` y escalar el sitio (no todo el `html`) para que el zoom funcione mejor en Safari/móvil. También sugirió límites mínimo/máximo en el tamaño tipográfico.

**Aplicación:** Se ajustaron `useAccesibilidad.js`, `Accesibilidad.jsx` y reglas en `global.css`. El guardado en `localStorage` solo ocurre si las cookies de preferencias están aceptadas.

## Entrada 4: tema claro y contraste

**Consulta:** Activar el modo claro definido en los tokens y revisar que el alto contraste no lo anulara, además de mejorar la lectura de las tarjetas de álbum sobre fondo claro.

**Respuesta inicial incompleta:** La IA se centró solo en el atributo `data-tema` y no contempló que `data-contraste` redefinía fondos oscuros siempre.

**Corrección y aplicación:** Se separó el alto contraste por tema en `global.css` (`html[data-tema="claro"][data-contraste]`). Se afinaron tokens de superficie/elevación en claro y se reforzó el borde y fondo de las cajas en `Destacados.css` y `Albumes.css` para que se distingan del fondo de página.

## Entrada 5: documentación del repositorio

**Consulta:** Redactar un README con la misma estructura orientativa que el material de referencia del curso (ejecución, organización, API, cookies y alcance).

**Aporte de la IA:** Propuso un esquema por secciones y listar hooks, rutas y endpoints realmente usados en el código.

**Aplicación:** Se escribió `README.md` alineado al proyecto (inicio, catálogo, API de Sintonía y `vercel.json`). Se omitieron promesas de funciones que la app todavía no implementa (cuenta, reproducción o compra).
