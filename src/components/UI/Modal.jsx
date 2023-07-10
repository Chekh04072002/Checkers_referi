import React from 'react';
import styles from './Modal.module.css';

const Modal = ({children, setIsShownModal}) => {

  const onClose = (e) => {
    if(e.target.dataset.component === "modal" || e.target.dataset.component === "close-btn") {
      setIsShownModal(false);
    }
  }

  return (
    <div className={styles.modal} onClick={onClose} data-component="modal">
        <span className={styles.closeButton} onClick={onClose} data-component="close-btn">&times;</span>
        <div className={styles.contentContainer}>
            {children}
        </div>
    </div>
  )
}

export default Modal