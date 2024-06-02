import React from "react";
import styles from './inputField.module.css';

function InputField(props) {
    return (
        <div className={styles['input-field-container']}>
            <label className={styles['input-field-label']} htmlFor={props.name}>{props.label}</label>
            <input
                className={styles['input-field']}
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default InputField;
