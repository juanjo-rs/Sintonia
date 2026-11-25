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
  flecha: {
    viewBox: "0 0 16 16",
    size: 16,
    content: (
      <>
        <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  mas: {
    viewBox: "0 0 18 18",
    size: 18,
    content: (
      <>
        <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 3.75V14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  menos: {
    viewBox: "0 0 18 18",
    size: 18,
    content: (
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  cookie: {
    viewBox: "0 0 24 24",
    size: 24,
    content: (
      <>
        <path d="M6.4443 3.6853C8.08879 2.58649 10.0222 2 12 2C11.786 2.69499 11.7655 3.43517 11.9407 4.14094C12.116 4.8467 12.4803 5.49135 12.9945 6.00555C13.5087 6.51975 14.1533 6.88405 14.8591 7.05927C15.5648 7.23449 16.305 7.214 17 7C16.786 7.69499 16.7655 8.43517 16.9407 9.14094C17.116 9.8467 17.4803 10.4913 17.9945 11.0056C18.5087 11.5198 19.1533 11.8841 19.8591 12.0593C20.5648 12.2345 21.305 12.214 22 12C22 13.9778 21.4135 15.9112 20.3147 17.5557C19.2159 19.2002 17.6541 20.4819 15.8268 21.2388C13.9996 21.9957 11.9889 22.1937 10.0491 21.8079C8.10929 21.422 6.32746 20.4696 4.92894 19.0711C3.53041 17.6725 2.578 15.8907 2.19215 13.9509C1.8063 12.0111 2.00433 10.0004 2.76121 8.17317C3.51809 6.3459 4.79981 4.78412 6.4443 3.6853Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 8.5V8.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 15.5V15.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14V14.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  ojo: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M1.66675 10C1.66675 10 4.16675 4.16669 10.0001 4.16669C15.8334 4.16669 18.3334 10 18.3334 10C18.3334 10 15.8334 15.8334 10.0001 15.8334C4.16675 15.8334 1.66675 10 1.66675 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  "ojo-oculto": {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M8.45 4.28335C8.95338 4.20445 9.46666 4.1652 9.98167 4.16669C15.815 4.16669 18.315 10 18.315 10C17.8784 10.9372 17.2923 11.8075 16.5733 12.5834M11.55 11.55C11.3456 11.7705 11.0982 11.9483 10.8225 12.0727C10.5468 12.1971 10.2484 12.2656 9.94517 12.2742C9.64195 12.2827 9.34005 12.2311 9.05755 12.1225C8.77506 12.0139 8.5176 11.8505 8.30037 11.6419C8.08313 11.4333 7.91069 11.1838 7.79325 10.9074C7.67581 10.6311 7.61568 10.3327 7.61639 10.0294C7.6171 9.72603 7.67863 9.42396 7.79736 9.14138C7.91609 8.8588 8.08964 8.60129 8.30783 8.39285M1.66675 1.66669L18.3334 18.3334M14.0601 14.0667C12.8851 14.8721 11.4716 15.3085 10.0001 15.8334C4.16675 15.8334 1.66675 10 1.66675 10C2.49168 8.45845 3.64572 7.0921 5.06675 5.96669L14.0601 14.0667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  alerta: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M10 18.3334C14.6024 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6024 1.66669 10 1.66669C5.39765 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39765 18.3334 10 18.3334Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 6.66669V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 13.3333H10.0083" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  spinner: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <path d="M10 2.5V5.83333M10 14.1667V17.5M4.6967 4.6967L7.0533 7.0533M12.9467 12.9467L15.3033 15.3033M2.5 10H5.83333M14.1667 10H17.5M4.6967 15.3033L7.0533 12.9467M12.9467 7.0533L15.3033 4.6967" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  salir: {
    viewBox: "0 0 20 20",
    size: 20,
    content: (
      <>
        <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.3333 14.1667L17.5 10L13.3333 5.83337" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
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
