import { useContext, useEffect, useState } from 'react';
import styles from './CreatePlayerPage.module.css';
import { API_URL } from '../../../config';
import CreatePlayerForm from './CreatePlayerForm';
import { fetchHandler } from '../../../utils/utils';
import { NotificationContext } from '../../../context/NotificationContext';

const CreatePlayerPage = () => {
  
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Регистрация игрока</h1>
      <CreatePlayerForm />
    </div>
  );
};


export default CreatePlayerPage;
