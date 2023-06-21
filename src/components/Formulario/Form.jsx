import React, { useState } from "react";
import { Link } from "react-router-dom";
import pokebola from "../../assets/pokebola.png";
import entrenador from "../../assets/entrenador.png";
import pikachu from "../../assets/pikachu.png";
import Input from "../Input/input/Input";
import SelectPokemon from "../Input/selectPokemon/SelectPokemon";
import styles from './form.module.css'
import Details from "./details/Details";

/**
 * Component representing a form for Pokemon submission.
 */
const Form = () => {
  const [showPokemonList, setShowPokemonList] = useState(false);

  /**
   * Toggles the display of the Pokemon list.
   */
  const togglePokemonList = () => {
    setShowPokemonList(!showPokemonList);
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={pokebola} alt="pokebola" />
          <h2>Centro Pokemon de Ash</h2>
        </div>
        <Link className="volver" to="/">
          Home
        </Link>
      </header>
      <div className={styles.form}>
        <div className={styles.formHeader}>
          <h3>Solicitud de atención</h3>
          <p>
            Por favor, completa el formulario para que podamos atender a tu
            pokémon
          </p>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formInputs}>
            <div>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionName}>
                  <img
                    className={styles.sectionImg}
                    src={entrenador}
                    alt="entrenador"
                  />
                  <span>ENTRENADOR</span>
                </div>
              </div>
              <div className={styles.inputsContainer}>
                <Input name="firstName" label="Nombre" />
                <Input name="lastName" label="Apellido" />
                <Input name="email" label="Email" type="email" />
              </div>
            </div>
            <div>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionName}>
                  <img
                    className={styles.sectionImg}
                    src={pikachu}
                    alt="pikachu"
                  />
                  <span>POKEMON</span>
                </div>
                <button className={styles.btn} onClick={togglePokemonList}>
                  Mostrar pokemons
                </button>
              </div>
              {showPokemonList && <SelectPokemon />}
              <div className={styles.inputsContainer}>
                <Input name="pokemonName" label="Nombre" />
                <Input name="pokemonAge" label="Edad" />
                <Input name="pokemonWeight" label="Peso(kg)" />
                <Input name="pokemonHeight" label="Altura(cm)" />
              </div>
            </div>
          </div>
          <Details />
        </div>
      </div>
    </>
  );
};

export default Form;
