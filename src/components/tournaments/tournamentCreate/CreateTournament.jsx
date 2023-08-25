import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTournamentForm from './CreateTournamentForm';
import { fetchHandler } from '../../../utils/utils';
import { NotificationContext } from '../../../context/NotificationContext';
import styles from './CreateTournament.module.css';

const CreateTournament = () => {
  const {isLoading, showLoader, errorMessage, showErrorMessage, resetNotification} = useContext(NotificationContext);
  const navigate = useNavigate();


  function createTournamentHandler(event, tournamentData) {
    event.preventDefault();

    const tData = {...tournamentData};

    if(tData.toursCount) {
      tData.toursCount = Number(tData.toursCount);
    }
    console.log(tData);
    fetchHandler(
      'tournaments',
      (data) => navigate(`../Tournament/${data._id}`),
      showLoader,
      (error) => {
        console.error(error);
        showErrorMessage(error.message);
      },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(tData),
      }
    )
  }

  useEffect(() => resetNotification(), [])

  return (
    <div className={styles.createTournamentPage}>
      <h1 className={styles.title}>Создать турнир</h1>
      <CreateTournamentForm 
        className={styles.createTournamentForm} 
        onSubmit={createTournamentHandler}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default CreateTournament;
