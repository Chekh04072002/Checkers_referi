import React from 'react';
import { useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchHandler } from '../../utils/utils';
import { AppContext } from '../../context/AppContext';
import Button from '../UI/Button';
import PlayersList from './PlayersList';
import styles from './TournamentPlayersPage.module.css';
import Modal from '../UI/Modal';

const TournamentPlayersPage = () => {
    const {tournament, setTournament, fetchTournament} = useContext(AppContext);
    const [tournamentPlayers, setTournamentPlayers] = useState([]);
    const [isShownModal, setIsShownModal] = useState(false);
    const {tournamentSlug: tournamentID} = useParams();

    const fetchPlayers = async() => {
        fetchHandler(
            `players?tournamentID=${tournamentID}`,
            (players) => setTournamentPlayers(players),
            () => {},
            (error) => console.error(error)
        )
    }

    const deletePlayer = (playerID) => {
        setTournamentPlayers(tournamentPlayers.filter(player => player._id !== playerID));
        setTournament({...tournament, playersIDs: tournament.playersIDs.filter(id => id !== playerID)});
    }

    const showModal = () => {
        setIsShownModal(true);
    }

    const hideModal = (e) => {
        if(e.target.dataset.component === "modal") {
            setIsShownModal(false);
        }
    }

    useEffect(() => {
        fetchTournament(tournamentID);
        fetchPlayers();
    }, []);

  return (
    <div className={styles.playersListContainer}>
        <div className={styles.playersListHeader}>
            <Button onClick={showModal} color="green">Добавить участника</Button>
        </div>
        <PlayersList onDeletePlayer={deletePlayer} players={tournamentPlayers}/>
        {
            isShownModal
            ? (
                <Modal onClose={hideModal}>
                    <h2>Модалка</h2>
                </Modal>
            )
            : null
        }
        
    </div>
  )
}

export default TournamentPlayersPage