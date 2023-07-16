import React from 'react'
import styles from './PlayerMenu.module.css';
import CustomNavLink from '../../UI/CustomNavLink';

const PlayerMenu = () => {
    return (
        <nav className={styles.playerMenu}>
            <CustomNavLink></CustomNavLink>
        </nav>
    )
}

export default PlayerMenu