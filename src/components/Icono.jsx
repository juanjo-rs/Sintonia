/* Iconos oficiales: https://yanethm-sintonia-api.fly.dev/docs/diseno/ */
const ICONOS = {
  menu: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M3 5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  cerrar: {
    viewBox: "0 0 18 18",
    size: 18,
    content: (
      <>
        <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  idioma: {
    viewBox: "0 0 18 18",
    size: 18,
    content: (
      <>
        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 9C6 6.20756 7.07418 3.52212 9 1.5C10.9258 3.52212 12 6.20756 12 9C12 11.7924 10.9258 14.4779 9 16.5C7.07418 14.4779 6 11.7924 6 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.5 9H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  chevron: {
    viewBox: "0 0 16 16",
    size: 16,
    content: (
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  accesibilidad: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M10.0001 4.99992C10.4603 4.99992 10.8334 4.62682 10.8334 4.16659C10.8334 3.70635 10.4603 3.33325 10.0001 3.33325C9.53984 3.33325 9.16675 3.70635 9.16675 4.16659C9.16675 4.62682 9.53984 4.99992 10.0001 4.99992Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 16.6667L10 11.6667L12.5 16.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 6.66675L10 8.33341L15 6.66675" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 8.33325V11.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  buscar: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5001 17.5001L13.9167 13.9167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  favoritos: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <path d="M15.8334 11.6667C17.0751 10.45 18.3334 8.99167 18.3334 7.08333C18.3334 5.86776 17.8505 4.70197 16.991 3.84243C16.1314 2.98289 14.9657 2.5 13.7501 2.5C12.2834 2.5 11.2501 2.91667 10.0001 4.16667C8.75008 2.91667 7.71675 2.5 6.25008 2.5C5.03451 2.5 3.86872 2.98289 3.00918 3.84243C2.14963 4.70197 1.66675 5.86776 1.66675 7.08333C1.66675 9 2.91675 10.4583 4.16675 11.6667L10.0001 17.5L15.8334 11.6667Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  check: {
    viewBox: "0 0 18 18",
    size: 18,
    content: (
      <path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
};

export default function Icono({ nombre, tamano }) {
  const icono = ICONOS[nombre];
  if (!icono) return null;
  const lado = tamano ?? icono.size;

  return (
    <svg
      viewBox={icono.viewBox}
      width={lado}
      height={lado}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {icono.content}
    </svg>
  );
}
