import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import fetchGet from '../../../functions/fetchs';
import { extractPokemonId } from '../../../functions/extractPokemonId';
import { useQuery } from 'react-query';
import styles from './selectPokemon.module.css';
import { FormContext, updatePokemon } from '../../../context/ContextoFormulario';
import { capitalizeFirstChar } from '../../../functions/capitalizeFirstChar';

/**
 * Component representing the select Pokemon section in the form.
 * It allows the user to choose a Pokemon from a list.
 * @returns {JSX.Element} The rendered component.
 */
const SelectPokemon = () => {
    const { dispatch } = useContext(FormContext);

    const [page, setPage] = useState(1);
    const [subPage, setSubPage] = useState(page);

    /**
     * Fetches the Pokemon list for the specified page.
     * @param {number} page - The page number.
     * @returns {Promise} The promise containing the Pokemon list data.
     */
    const handlePages = (page) => {
        const pokemonsPerPage = 9;
        const finalPokemon = (page * pokemonsPerPage) - pokemonsPerPage;
        return fetchGet(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${finalPokemon}`);
    };

    const { data: pokemonList } = useQuery({
        queryKey: ['pokemonList', page],
        queryFn: () => handlePages(page),
    });

    const { data: pokemonData } = useQuery({
        queryKey: ['pokemons', page],
        queryFn: async () => {
            if (pokemonList && pokemonList.results) {
                const results = await Promise.all(
                    pokemonList.results.map((pokemon) =>
                        fetchGet(`https://pokeapi.co/api/v2/pokemon/${extractPokemonId(pokemon.url)}/`),
                    ),
                );
                return results;
            }
        },
    });

    /**
     * Handles the selection of a Pokemon.
     * @param {Event} e - The event object.
     * @param {Object} pokemon - The selected Pokemon object.
     */
    const handleSelectPokemon = (e, pokemon) => {
        const newPokemon = {
            pokemonName: capitalizeFirstChar(pokemon.name),
            pokemonImg: pokemon.sprites.front_default,
        };
        dispatch(updatePokemon(e.target.name, newPokemon));
    };

    /**
     * Handles the next page navigation.
     * @param {Event} e - The event object.
     */
    const handleNextPage = (e) => {
        e.preventDefault();
        setPage((old) => old + 1);
        setSubPage((old) => old + 1);
    };

    /**
     * Handles the previous page navigation.
     * @param {Event} e - The event object.
     */
    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (page > 1) {
            setPage((old) => old - 1);
            setSubPage((old) => old - 1);
        }
    };

    return (
        <div className={styles.pokemonListContainer}>
            <div className={styles.pokemonListHeader}>
                <h4 className={styles.pokemonListTitle}>Página</h4>
                <input className={styles.pageInput} value={subPage} onChange={(e) => setSubPage(e.target.value)} onBlur={() => setPage(subPage)} type="text" />
            </div>
            <div className={styles.pokemonList}>
                {pokemonData &&
                    pokemonData.map(pokemon => (
                        <input className={styles.pokemonImage} key={pokemon.id}
                            type="image"
                            id={pokemon.id}
                            name="pokemonSpecie"
                            value={pokemon.name}
                            onClick={(e) => handleSelectPokemon(e, pokemon)}
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name} />
                    ))}
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={handlePreviousPage}>Anterior</button>
                <button className={styles.btn} onClick={handleNextPage}>Siguiente</button>
            </div>
        </div>
    )
}

export default SelectPokemon

