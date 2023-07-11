import React from 'react'
import styles from './Select.module.css';

const Select = ({children, onChange, defaultValue, className, id, required=false}) => {
  return (
    <select
        required={required}
        id={id ? id : ''}
        className={`${styles.select} ${className ? className : ''}`}
        onChange={onChange}
        defaultValue={defaultValue}
    >
        {children}
    </select>
  )
}

export default Select