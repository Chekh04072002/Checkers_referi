import React from 'react';
import styles from './Input.module.css';

const Input = ({type = "text", value, onChange, placeholder, className}) => {
  return (
    <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${className ? className : ''}`}
    />
  )
}

export default Input