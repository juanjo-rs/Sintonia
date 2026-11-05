import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "./Cookies";

const Layout = ({ textos, cargando, error, idioma, onCambiarIdioma }) => {
  return (
    <div className="sitio">
      <Navbar
        textos={textos}
        cargando={cargando}
        error={error}
        idioma={idioma}
        onCambiarIdioma={onCambiarIdioma}
      />
      <div className="sitio-cuerpo">
        <Outlet context={{ textos, idioma }} />
      </div>
      <Footer textos={textos} />
      <Cookies textos={textos} idioma={idioma} />
    </div>
  );
};

export default Layout;
