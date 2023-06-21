import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../../context/ContextoFormulario";
import styles from "./details.module.css";

/**
 * Component that displays the details of the form.
 */
const Details = () => {
    // Get the state from the form context
    const { state } = useContext(FormContext);

    return (
        <div className={styles.formDetails}>
            <div className={styles.detailsHeader}>
                <div className="container">
                    <div className="row">
                        <div className={styles.detailsTrainer}>
                            <p>Nombre: {state.trainer.firstName} {state.trainer.lastName}</p>
                            <p>Email: {state.trainer.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className={styles.detailsSections}>
                        <section className={styles.detailsSection}>
                            <h4 className={styles.sectionTitle}>Pokémon Details</h4>
                            <div className={styles.pokemonSpecieContainer}>
                                <img
                                    className={styles.pokemonImg}
                                    src={state.pokemon.specie?.pokemonImg}
                                    alt={state.pokemon.specie?.pokemonName}
                                />
                                <p className={styles.pokemonSpecie}>
                                    {state.pokemon.specie?.pokemonName}
                                </p>
                            </div>
                            <div className={styles.detailsFields}>
                                <p>Nombre: {state.pokemon.name}</p>
                                <p>Edad: {state.pokemon.age}</p>
                                <p>Peso: {state.pokemon.weight && `${state.pokemon.weight} kg`}</p>
                                <p>Altura: {state.pokemon.height && `${state.pokemon.height} cm`}</p>
                            </div>
                        </section>
                        <button
                            className={styles.btn}
                            onClick={() => alert("Request sent :)")}
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes
Details.propTypes = {
    state: PropTypes.shape({
        trainer: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
        }),
        pokemon: PropTypes.shape({
            specie: PropTypes.shape({
                pokemonImg: PropTypes.string,
                pokemonName: PropTypes.string,
            }),
            name: PropTypes.string,
            age: PropTypes.number,
            weight: PropTypes.number,
            height: PropTypes.number,
        }),
    }),
};

export default Details;
