import React from 'react';
import styles from './LabeledComponent.module.css';

const LabeledComponent = ({children, label, direction="column"}) => {
  return (
    <div className={`${styles.labeledComponent} ${styles[direction]}`}>
        <label className={styles.label}>{label}</label>
        {children}
    </div>
  )
}

export default LabeledComponent