import React from 'react';
import styles from './Button.module.css';

const Button = ({children, onClick, color, className, disabled=false}) => {
  return (
    <button 
        disabled={disabled}
        onClick={onClick} 
        className={`${styles.button} ${styles[color]} ${className ? className : ""}`}
    >
        {children}
    </button>
  )
}

export default Button