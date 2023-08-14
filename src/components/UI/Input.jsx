import React from 'react';
import styles from './Input.module.css';

const Input = ({
  type = "text", 
  required=false,
  value, 
  min,
  max,
  onChange, 
  placeholder, 
  className, 
  id
}) => {
  return (
    <input 
        id={id ? id : ''}
        required={required}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${className ? className : ''}`}
    />
  )
}

export default Input