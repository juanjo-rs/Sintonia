import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import { useTextos } from "./hooks/useTextos";
import { guardarCookie, idiomaInicial, leerCookie } from "./components/Cookies";
import "./App.css";

const App = () => {
  const [idioma, setIdioma] = useState(idiomaInicial);

  function cambiarIdioma(nuevo) {
    setIdioma(nuevo);
    if (leerCookie("consentimiento") === "aceptado") {
      guardarCookie("idioma", nuevo);
    }
  }
  const { textos, cargando, error } = useTextos(idioma);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  return (
    <Routes>
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
      </Route>
    </Routes>
  );
};

export default App;
