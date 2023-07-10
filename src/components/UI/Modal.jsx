import React from 'react';
import styles from './Modal.module.css';

const Modal = ({children, onClose}) => {
  return (
    <div className={styles.modal} onClick={onClose} data-component="modal">
        <div className={styles.contentContainer}>
            {/* <span className={styles.closeButton}>&times;</span> */}
            {children}
        </div>
    </div>
  )
}

export default Modal