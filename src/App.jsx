import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useTextos } from "./hooks/useTextos";
import { useGeneros } from "./hooks/useGeneros";
import "./App.css";

const App = () => {
  const [idioma, setIdioma] = useState("es");
  const { textos, cargando, error } = useTextos(idioma);
  const { generos } = useGeneros();

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
      <Hero
        textos={textos}
        idioma={idioma}
        generos={generos}
      />
      <Footer textos={textos} />
    </div>
  );
};

export default App;
