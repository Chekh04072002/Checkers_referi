import React from 'react';
import stylesCommon from '../Common.module.css';
import styles from './LabeledField.module.css';

const LabeledField = ({children, label, direction='row', className}) => {
    const classes = `
      ${styles.field}
      ${direction === 'row' ? styles.inlineField : styles.blockField} 
      ${className ? className : ''}
    `

    return (
      <div className={classes}>
          <label className={stylesCommon.label}>{label}:</label>
          <div className={styles.value}>{children || 'Не указано'}</div>
      </div>
    )
}

export default LabeledField