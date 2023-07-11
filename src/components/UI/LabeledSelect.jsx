import React from 'react';
import Select from './Select';
import styles from './LabeledSelect.module.css';

const LabeledSelect = ({children, id, onChange, defaultValue, className}) => {
    return (
        <div>
            <label className={styles.label} htmlFor={id ? id : ''}></label>
            <Select 
                id={id}
                onChange={onChange}
                defaultValue={defaultValue}
                className={`${styles.labeledSelect} ${className}`}
            >
                {children}
            </Select>
        </div>
        
    )
}

export default LabeledSelect;