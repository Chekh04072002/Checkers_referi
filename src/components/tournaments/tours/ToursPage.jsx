import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import styles from './ToursPage.module.css';
import Tour from './Tour';
import { API_URL } from '../../../config';
import { fetchHandler } from '../../../utils/utils';
import Button from '../../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import State from '../../UI/State';
import { NotificationContext } from '../../../context/NotificationContext';

const ToursPage = () => {
    const {tournament, games, setTournament, fetchTournament, fetchGames} = useContext(AppContext);
    const {isLoading, showLoader, errorMessage, showErrorMessage, resetNotification} = useContext(NotificationContext);
    const {tournamentSlug: tournamentID}= useParams();
    const [tour, setTour] = useState(0);

    const showLastTour = () => {
        setTour(tournament?.currentTour);
    }

    const prevTour = () => {
        setTour((t) => t - 1);
    }

    const nextTour = () => {
        setTour((t) => t + 1);
    }

    const playedAllGamesInTour = () => {
        return !games[tour - 1].find(game => game.player1Score === 0 && game.player2Score === 0)
    }

    function startTournament() {
        fetchHandler(
            `tournaments/start/${tournamentID}`,
            (data) => {
                setTournament(data);
                resetNotification();
            },
            showLoader,
            (error) => {
                console.error(error);
                showErrorMessage(error.message);
            },
            {method: 'PUT'}
        );
    }

    async function finishTour() {
        fetchHandler(
            `tournaments/finish-tour/${tournamentID}`,
            (data) => {
                setTournament(data);
                resetNotification();
            },
            showLoader,
            (error) => {
                console.error(error);
                showErrorMessage(error.message)
            },
            {method: 'PUT'}
        );
    }

    async function finishTournament() {
        fetchHandler(
            `tournaments/finish/${tournamentID}`,
            (data) => {
                setTournament(data);
                resetNotification();
            },
            showLoader,
            (error) => {
                console.error(error);
                showErrorMessage(error.message);
            },
            {method: 'PUT'}
        );
    }

    async function restartTournament() {
        /* try {
            await fetch(`${API_URL}games`, { method: 'DELETE' });
            await fetch(`${API_URL}player-stats`, {
                method: 'DELETE',
            });
            await fetch(`${API_URL}tournaments/${tournamentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                  },
                body: JSON.stringify({
                    isStarted: false,
                    isFinished: false,
                    gamesIDs: [],
                    playersStatsIDs: [],
                    currentTour: 1
                }),
            })

            fetchGames(tournamentID);
            fetchTournament(tournamentID);
        } catch (error) {
            console.log(error);
        } */
    }

    //TODO добавить заврешение турнира и тура

    useEffect(() => {
        resetNotification();
        fetchTournament(tournamentID);
        fetchGames(tournamentID);
    }, [])

    useEffect(() => {
        showLastTour();
        fetchGames(tournamentID);
    }, [tournament]);


    return (
        <div className={styles.gamesContainer}>
            {
                tournament
                ? !tournament.isStarted 
                    ? <Button disabled={isLoading} color="green" className={styles.actionButton} onClick={startTournament}>Старт</Button>
                    : (
                        <div>
                            <Tour tour={tour} games={games[tour - 1] || []}/>
                            <div className={styles.navigationContainer}>
                                {
                                    tour > 1
                                    ?<Button onClick={prevTour} color="blue"><FontAwesomeIcon icon={faChevronLeft} /></Button>
                                    : null
                                }
                                {
                                    tour === tournament.currentTour && 
                                    tour !== tournament.toursCount
                                    ? <Button disabled={isLoading} color="purple" className={styles.actionButton} onClick={finishTour}>Завершить тур</Button>
                                    : null
                                }
                                {
                                    tour < tournament.toursCount && games[tour]
                                    ?<Button onClick={nextTour} color="blue"><FontAwesomeIcon icon={faChevronRight} /></Button>
                                    :null
                                }
                                {
                                    tour === tournament.toursCount && tournament.isStarted && !tournament.isFinished
                                    ? <Button disabled={isLoading} color="red" onClick={finishTournament}>Завершить турнир</Button>
                                    : null
                                }
                                {/* TODO удалить */}
                                {/* <button className={commonStyles.buttonBlack} onClick={resetTournament}>Reset</button> */}
                            </div>
                        </div>
                        
                    )
                : null
            }
            <State className={styles.state} isLoading={isLoading} errorMessage={errorMessage} />
        </div>
    )
}

export default ToursPage