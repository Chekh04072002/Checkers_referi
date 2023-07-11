import React from 'react'
import styles from './Form.module.css';

const TextInput = ({
    label,
    placeholder,
    value,
    onChange
}) => {
  return (
    <div className={styles.formInputItem}>
        <label className={styles.labelText}>{label}</label>
        <br></br>
        <input
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
            className={styles.inputText}
        />
    </div>
  )
}

export default TextInput