import React from 'react'
import styles from './Form.module.css';

const Select = ({
    label,
    onChange,
    options    
}) => {
  return (
    <div className={styles.formInputItem}>
        <label className={styles.labelText}>{label}</label>
        <br></br>
        <select
            defaultValue={""}
            name="sportsDescipline"
            id="sportsDescipline"
            className={styles.inputText}
            onChange={onChange}
        >
            <option disabled value="">{label}</option>
            {options.map(optionData => {
                return <option key={optionData.value} value={optionData.value}>{optionData.text}</option>
            })}
        </select>
    </div>
  )
}

export default Select