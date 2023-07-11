import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './CustomNavLink.module.css';

const CustomNavLink = ({children, to, end}) => {
  return (
    <NavLink 
        className={({ isActive, isPending }) =>
            isActive ? styles.navLinkActive : ''
        }
        to={to} end={end}
    >
        {children}
    </NavLink>
  )
}

export default CustomNavLink