import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Album from "./pages/Album";
import Ingresar from "./pages/Ingresar";
import { SesionProvider } from "./context/SesionContext";
import { useTextos } from "./hooks/useTextos";
import { cookiesAceptadas, guardarCookie, idiomaInicial } from "./cookies";
import "./App.css";

const App = () => {
  const [idioma, setIdioma] = useState(idiomaInicial);

  function cambiarIdioma(nuevo) {
    setIdioma(nuevo);
    if (cookiesAceptadas()) {
      guardarCookie("idioma", nuevo);
    }
  }
  const { textos, cargando, error } = useTextos(idioma);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  return (
    <SesionProvider>
      <Routes>
        <Route path="ingresar" element={<Ingresar textos={textos} />} />
        <Route
          element={
            <Layout
              textos={textos}
              cargando={cargando}
              error={error}
              idioma={idioma}
              onCambiarIdioma={cambiarIdioma}
            />
          }
        >
          <Route index element={<Inicio />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="album/:albumId" element={<Album />} />
        </Route>
      </Routes>
    </SesionProvider>
  );
};

export default App;
