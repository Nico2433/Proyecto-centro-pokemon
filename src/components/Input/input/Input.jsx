import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FormContext, updateTrainer, updatePokemon } from "../../../context/ContextoFormulario";
import styles from './input.module.css';

/**
 * Component representing an input field in the form.
 * @param {Object} props - The component props.
 * @param {string} props.name - The name attribute of the input field.
 * @param {string} props.label - The label text for the input field.
 * @param {string} [props.type="text"] - The type attribute of the input field.
 * @returns {JSX.Element} - The rendered component.
 */
const Input = ({ name, label, type = "text" }) => {
    // Get the dispatch function from the form context
    const { dispatch } = useContext(FormContext);

    // Local state to store the input value
    const [value, setValue] = useState("");

    /**
     * Handles the input change event.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
     */
    const onChange = (e) => {
        setValue(e.target.value);
    };

    /**
     * Handles the input blur event.
     * @param {React.FocusEvent<HTMLInputElement>} e - The event object.
     */
    const onBlur = (e) => {
        e.preventDefault();
        if (e.target.name.includes("pokemon")) {
            // If the input name includes "pokemon", dispatch the action to update the pokemon
            dispatch(updatePokemon(e.target.name, e.target.value));
        } else {
            // Otherwise, dispatch the action to update the trainer
            dispatch(updateTrainer(e.target.name, e.target.value));
        }
    };

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={name}>{label}</label>
            <input className={styles.input}
                type={type}
                value={value}
                name={name}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

// PropTypes
Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default Input;
