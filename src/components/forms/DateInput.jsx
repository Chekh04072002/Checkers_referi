import React from 'react'
import styles from './Form.module.css';


const DateInput = ({
    label,
    onChange
}) => {
  return (
    <div className={styles.formInputItem}>
        <label className={styles.labelText}>{label}</label>
        <br></br>
        <input
            type="date"
            onChange={onChange}
            className={styles.inputText}
        />
    </div>
  )
}

export default DateInput