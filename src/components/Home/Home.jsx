import React from "react";
import { Link } from "react-router-dom";
import pokebola from "../../assets/pokebola.png";

/**
 * Component that represents the home page.
 */
const Home = () => {
  return (
    <header className="App-header">
      {/* Render the pokeball image */}
      <img className="App-logo" alt="logo" src={pokebola} />
      {/* Render the Pokemon Center title */}
      <h1>Centro Pokemon de Ash</h1>
      {/* Render the link to the login form */}
      <Link to="/formularioIngreso" className="boton-ingreso">
        Ingresar pokemon
      </Link>
    </header>
  );
};

export default Home;
