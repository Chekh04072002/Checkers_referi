import React from 'react';
import loader from '../../pictures/loader.gif';
import styles from './State.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const State = ({isLoading, succesMessage, errorMessage, className}) => {
  
  if(isLoading) {
    return (
      <div className={className}>
        <FontAwesomeIcon className={styles.loader} icon={faCircleNotch} spin />
      </div>
    )
  }

  if(succesMessage) {
    return (
      <div className={`${styles.state} ${styles.success} ${className}`}>
          <h3>{succesMessage}</h3>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className={`${styles.state} ${styles.error} ${className}`}>
          <h3>{errorMessage}</h3>
      </div>
    )
  }

  
}

export default State