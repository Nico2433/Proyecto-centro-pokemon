import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Context for the form.
export const FormContext = createContext();

// Action type for updating the trainer.
const UPDATE_TRAINER = 'UPDATE_TRAINER';

// Action type for updating the pokemon.
const UPDATE_POKEMON = 'UPDATE_POKEMON';

/**
 * Action creator for updating the trainer.
 * @param {string} name - Name of the trainer field to update.
 * @param {string} value - New value for the trainer field.
 * @returns {Object} - Action to update the trainer.
 */
export const updateTrainer = (name, value) => {
    const action = {
        type: UPDATE_TRAINER,
        payload: {
            name: name,
            value: value,
        },
    };
    return action;
};

updateTrainer.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

/**
 * Action creator for updating the pokemon.
 * @param {string} name - Name of the pokemon field to update.
 * @param {string} value - New value for the pokemon field.
 * @returns {Object} - Action to update the pokemon.
 */
export const updatePokemon = (name, value) => {
    const reducedName = name.replace('pokemon', '');
    const lowerName = reducedName.toLowerCase();
    const action = {
        type: UPDATE_POKEMON,
        payload: {
            name: lowerName,
            value: value,
        },
    };
    return action;
};

updatePokemon.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

// Component providing the form context.
export const FormContextProvider = ({ children }) => {
    // Initial state of the form.
    const emptyState = {
        trainer: {},
        pokemon: {},
    };

    /**
     * Reducer to handle actions and update the state.
     * @param {Object} state - Current state.
     * @param {Object} action - Action to perform.
     * @returns {Object} - New state.
     */
    const reducer = (state, action) => {
        let payload;
        switch (action.type) {
            case UPDATE_TRAINER:
                payload = action.payload;
                // Update the trainer state with the provided values.
                return { ...state, trainer: { ...state.trainer, [payload.name]: payload.value } };
            case UPDATE_POKEMON:
                payload = action.payload;
                // Update the pokemon state with the provided values.
                return { ...state, pokemon: { ...state.pokemon, [payload.name]: payload.value } };
            default:
                return state;
        }
    };

    // Use the reducer and initial state to create the state and dispatch function.
    const [state, dispatch] = useReducer(reducer, emptyState);

    // Context value containing the state and dispatch function.
    const value = {
        state,
        dispatch,
    };

    // Render the children within the context provider.
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

FormContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
