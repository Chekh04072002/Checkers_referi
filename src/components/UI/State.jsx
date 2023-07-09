import React from 'react';
import loader from '../../pictures/loader.gif';
import styles from './State.module.css';

const State = ({isLoading, succesMessage, errorMessage}) => {

  if(isLoading) {
    return <img className={styles.loader} src={loader} alt='Подождите...'/>;
  }

  if(succesMessage) {
    return (
      <div className={`${styles.state} ${styles.success}`}>
          <h3>{succesMessage}</h3>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className={`${styles.state} ${styles.error}`}>
          <h3>{errorMessage}</h3>
      </div>
    )
  }

  
}

export default State