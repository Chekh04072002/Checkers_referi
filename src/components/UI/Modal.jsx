import React, { useContext, useEffect } from 'react';
import styles from './Modal.module.css';
import { AppContext } from '../../context/AppContext';

const Modal = ({children, setIsShownModal}) => {
  const {setCanScroll} = useContext(AppContext);

  const onClose = (e) => {
    if(e.target.dataset.component === "modal" || e.target.dataset.component === "close-btn") {
      setIsShownModal(false);
    }
  }

  useEffect(() => {
    setCanScroll(false);

    return () => setCanScroll(true);
  }, [])

  return (
    <div className={styles.modal} onClick={onClose} data-component="modal">
        <div className={styles.contentContainer}>
          <span className={styles.closeButton} onClick={onClose} data-component="close-btn">&times;</span>
          {children}
        </div>
    </div>
  )
}

export default Modal