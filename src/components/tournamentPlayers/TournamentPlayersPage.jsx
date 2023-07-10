import React from 'react';
import { useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchHandler } from '../../utils/utils';
import { AppContext } from '../../context/AppContext';
import Button from '../UI/Button';
import PlayersList from './PlayersList';
import styles from './TournamentPlayersPage.module.css';
import Modal from '../UI/Modal';
import { BiTrash} from 'react-icons/bi';
import SearchPlayersForm from '../players/searchPlayers/SearchPlayersForm';
import State from '../UI/State';

const TournamentPlayersPage = () => {
    const {tournament, players, setTournament, fetchTournament} = useContext(AppContext);
    const [tournamentPlayers, setTournamentPlayers] = useState([]);
    const [isShownModal, setIsShownModal] = useState(false);
    const {tournamentSlug: tournamentID} = useParams();

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [succesMessage, setSuccesMessage] = useState('');

    const succesUpdating = (data) => {
        setTournament(data);
        setIsLoading(false);
        setSuccesMessage("Данные турнира успешно изменены");
        setTimeout(() => setSuccesMessage(""), 2000);
    }

    const errorUpdating = (error) => {
        setIsLoading(false);
        setError(error)
    }


    const save = () => {
        setIsLoading(false);
        setSuccesMessage("");
        setError({});

        fetchHandler(
            `tournaments/${tournamentID}`,
            succesUpdating,
            () => setIsLoading(true),
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

    const hideModal = (e) => {
        if(e.target.dataset.component === "modal") {
            setIsShownModal(false);
        }
    }

    useEffect(() => {
        fetchTournament(tournamentID);
        fetchPlayers();
    }, []);

    console.log(players);

  return (
    <div className={styles.playersListContainer}>
        <div className={styles.playersListHeader}>
            <Button onClick={showModal} color="blue">Добавить участника</Button>
            {
                tournamentPlayers.length > 0
                ? (
                    <div className={styles.saveContainer}>
                        <State isLoading={isLoading} succesMessage={succesMessage} errorMessage={error.message}/>
                        <Button onClick={save} color="blue">Сохранить</Button>
                    </div>
                )
                : null
            }
            
        </div>
        <div>
            {
                tournamentPlayers.length > 0
                ?<PlayersList 
                    players={tournamentPlayers} 
                    actionLabel="Удалить" 
                    actionButton={<BiTrash className={styles.actionButton} onClick={deletePlayer}/>}
                />
                : <h2>Список участников пуст</h2>
            }
            {
                isShownModal
                ? (
                    <Modal onClose={hideModal}>
                        <SearchPlayersForm players={players} onAddPlayer={addPlayer}/>
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