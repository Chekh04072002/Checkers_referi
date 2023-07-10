import React from 'react';
import { useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchHandler } from '../../utils/utils';
import { AppContext } from '../../context/AppContext';
import Button from '../UI/Button';
import PlayersList from './PlayersList';
import Modal from '../UI/Modal';
import { BiTrash} from 'react-icons/bi';
import SearchPlayersForm from '../players/searchPlayers/SearchPlayersForm';
import State from '../UI/State';
import { NotificationContext } from '../../context/NotificationContext';
import styles from './TournamentPlayersPage.module.css';
import stylesCommon from '../styles/Common.module.css';

const TournamentPlayersPage = () => {
    const {tournament, players, setTournament, fetchTournament} = useContext(AppContext);
    const {isLoading, showLoader, 
            errorMessage, showErrorMessage, 
            succesMessage, showSuccessMessage,
            resetNotification
        } = useContext(NotificationContext);

    const [tournamentPlayers, setTournamentPlayers] = useState([]);
    const [isShownModal, setIsShownModal] = useState(false);
    const {tournamentSlug: tournamentID} = useParams();

    const succesUpdating = (data) => {
        setTournament(data);
        showSuccessMessage("Данные турнира успешно изменены");
    }

    const errorUpdating = (error) => {
        showErrorMessage(error.message)
    }


    const save = () => {
        fetchHandler(
            `tournaments/${tournamentID}`,
            succesUpdating,
            showLoader,
            errorUpdating,
            {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(tournament),
            }
        );
    }

    const fetchPlayers = async() => {
        fetchHandler(
            `players?tournamentID=${tournamentID}`,
            (players) => setTournamentPlayers(players),
            () => {},
            (error) => console.error(error)
        )
    }

    const deletePlayer = (e) => {
        let playerID;

        if(e.target.tagName === "path") {
            playerID = e.target.parentElement.parentElement.dataset.id;
        } else {
            playerID = e.target.parentElement.dataset.id;
        }

        setTournamentPlayers(tournamentPlayers.filter(player => player._id !== playerID));
        setTournament({...tournament, playersIDs: tournament.playersIDs.filter(id => id !== playerID)});
    }

    const addPlayer = (e) => {
        let playerID;
        
        if(e.target.tagName === "path") {
            playerID = e.target.parentElement.parentElement.dataset.id;
        } else {
            playerID = e.target.parentElement.dataset.id;
        }

        const player = players.find(p => p._id === playerID);

        setTournamentPlayers([...tournamentPlayers, player]);
        setTournament({...tournament, playersIDs: [...tournament.playersIDs, playerID]});
    }

    const showModal = () => {
        setIsShownModal(true);
    }

    /* const hideModal = (e) => {
        if(e.target.dataset.component === "modal") {
            setIsShownModal(false);
        }
    } */

    useEffect(() => {
        resetNotification();
        fetchTournament(tournamentID);
        fetchPlayers();
    }, []);

    console.log(players);

  return (
    <div className={styles.playersListContainer}>
        <div className={styles.playersListHeader}>
            <Button onClick={showModal} color="blue">Добавить участника</Button>
            <div className={styles.saveContainer}>
                <State isLoading={isLoading} succesMessage={succesMessage} errorMessage={errorMessage}/>
                <Button disabled={isLoading} onClick={save} color="blue">Сохранить</Button>
            </div>
        </div>
        <div>
            {
                tournamentPlayers.length > 0
                ?<PlayersList 
                    players={tournamentPlayers} 
                    actionLabel="Удалить" 
                    actionButton={<BiTrash className={stylesCommon.clickable} onClick={deletePlayer}/>}
                />
                : <h2>Список участников пуст</h2>
            }
            {
                isShownModal
                ? (
                    <Modal setIsShownModal={setIsShownModal}>
                        <SearchPlayersForm 
                            className={styles.searchPlayersForm} 
                            players={players} 
                            onAddPlayer={addPlayer}
                        />
                    </Modal>
                )
                : null
            }
        </div>
        
        {/* <div className={styles.playersListFooter}>
            <State isLoading={isLoading} succesMessage={succesMessage} errorMessage={error.message}/>
            <Button onClick={save} color="blue">Сохранить</Button>
        </div> */}
        
    </div>
  )
}

export default TournamentPlayersPage