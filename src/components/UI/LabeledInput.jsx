import React from 'react'
import Input from './Input'
import styles from './LabeledInput.module.css';

const LabeledInput = ({
    label, 
    placeholder, 
    value, onChange, 
    className, 
    type="text", 
    id
}) => {
  return (
    <div className={styles.labeledInput}>
        <label htmlFor={id ? id : ''} className={styles.label}>{label}</label>
        <Input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.input} ${className}`}
            id={id ? id : ''}
        />
    </div>
  )
}

export default LabeledInput