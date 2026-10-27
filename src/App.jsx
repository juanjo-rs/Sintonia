import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useTextos } from "./hooks/useTextos";
import "./App.css";

const App = () => {
  const [idioma, setIdioma] = useState("es");
  const { textos, cargando, error } = useTextos(idioma);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  return (
    <div className="sitio">
      <Navbar
        textos={textos}
        cargando={cargando}
        error={error}
        idioma={idioma}
        onCambiarIdioma={setIdioma}
      />
      <Hero textos={textos} />
    </div>
  );
};

export default App;
