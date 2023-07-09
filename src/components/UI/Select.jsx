import React from 'react'
import styles from './Select.module.css';

const Select = ({children, onChange, defaultValue, className}) => {
  return (
    <select
        className={`${styles.select} ${className ? className : ''}`}
        onChange={onChange}
        defaultValue={defaultValue}
    >
        {children}
    </select>
  )
}

export default Select