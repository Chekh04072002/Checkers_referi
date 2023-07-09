import React from 'react';
import styles from './ListItem.module.css';

const ListItem = ({item, onDelete}) => {
    return (
        <div className={styles.item}>
            <span>{item}</span>
            <span className={styles.deleteButton} onClick={() => onDelete(item)}>&times;</span>
        </div>
    )
}

export default ListItem