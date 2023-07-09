import React from 'react';
import styles from './Button.module.css';

const Button = ({children, onClick, color, className}) => {
  return (
    <button 
        onClick={onClick} 
        className={`${styles.button} ${styles[color]} ${className ? className : ""}`}
    >
        {children}
    </button>
  )
}

export default Button