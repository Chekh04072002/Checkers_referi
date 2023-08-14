import React, { memo } from 'react';
import { formatDate } from '../../../utils/utils';
import { NavLink } from 'react-router-dom';
import { BiIdCard } from 'react-icons/bi';
import styles from './PlayerData.module.css';

const PlayerData = ({
    className,
    id,
    lastName,
    firstName,
    middleName,
    birthday,
    region,
    sportsCategoryAbbr,
    currentAdamovichRank,
    actionButton
}) => {
    console.log("render");
  return (
    <div 
        className={`${className}`}
        data-id={id}
    >
        <NavLink to={`/all-players/${id}`} className={`${styles.left} ${styles.link}`}>
            {lastName} {firstName} {middleName} 
        </NavLink>
        <div>{formatDate(birthday)}</div>
        <div>{region}</div>
        <div>{sportsCategoryAbbr}</div>
        <div>{currentAdamovichRank.toFixed(2)}</div>
        {/* <NavLink to={`/all-players/${id}`}>
            <BiIdCard className={styles.button}/>
        </NavLink> */}
        {actionButton ? actionButton : null}
    </div>
  )
};

export default PlayerData;