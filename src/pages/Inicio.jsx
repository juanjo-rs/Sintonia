import React from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import Destacados from "../components/Destacados";
import Generos from "../components/Generos";
import Cta from "../components/Cta";
import { useGeneros } from "../hooks/useGeneros";

const Inicio = () => {
  const { textos, idioma } = useOutletContext();
  const { generos } = useGeneros();

  return (
    <>
      <Hero textos={textos} idioma={idioma} generos={generos} />
      <Destacados textos={textos} variante="inicio" />
      <Generos textos={textos} generos={generos} />
      <Cta textos={textos} />
    </>
  );
};

export default Inicio;
