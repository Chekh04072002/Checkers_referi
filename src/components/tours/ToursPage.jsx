import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Game from './Game';
import styles from './ToursPage.module.css';
import commonStyles from '../styles/Common.module.css';
import Tour from './Tour';
import { API_URL } from '../../config';
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi';
import { fetchHandler } from '../../utils/utils';
import useFetch from '../../hooks/fetchHook';

const ToursPage = () => {
    const {fetchFunction, error, isLoading} = useFetch();
    const {tournament, games, setTournament, fetchTournament, fetchGames} = useContext(AppContext);
    const {tournamentSlug: tournamentID}= useParams();
    const [tour, setTour] = useState(0);

    const showLastTour = () => {
        setTour(tournament.currentTour);
    }

    const prevTour = () => {
        setTour((t) => t - 1);
    }

    const nextTour = () => {
        setTour((t) => t + 1);
    }

    function startTournament() {
        fetchHandler(
            `tournaments/start/${tournamentID}`,
            (data) => {
                setTournament(data);
                fetchGames(tournamentID);
            },
            () => console.log("Подождите..."),
            (error) => console.error(error),
            {method: 'PUT'}
        );
    }

    async function finishTour() {
        fetchHandler(
            `tournaments/finish-tour/${tournamentID}`,
            (data) => {
                setTournament(data);
                fetchGames(tournamentID);
            },
            () => console.log("Подождите..."),
            (error) => console.error(error),
            {method: 'PUT'}
        );
    }

    async function finishTournament() {
        fetchHandler(
            `tournaments/finish/${tournamentID}`,
            (data) => {
                setTournament(data);
            },
            () => console.log("Подождите..."),
            (error) => console.error(error),
            {method: 'PUT'}
        );
    }

    async function resetTournament() {
        try {
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
        }
    }

    //TODO добавить заврешение турнира и тура

    useEffect(() => {
        fetchTournament(tournamentID);
        fetchGames(tournamentID);
    }, [])

    useEffect(() => {
        showLastTour();
    }, [tournament]);


    console.log(tournamentID);
    console.log(games);

    return (
        <div className={styles.gamesContainer}>
            {
                tournament
                ? !tournament.isStarted 
                    ? <button className={commonStyles.buttonCute} onClick={startTournament}>Старт</button>
                    : (
                        <div>
                            <Tour tour={tour} games={games[tour - 1] || []}/>
                            {
                                tournament.tournamentSystem === "Швейцарская" && 
                                tour === tournament.currentTour && 
                                tour !== tournament.toursCount
                                ? <button onClick={finishTour} className={commonStyles.buttonCute}>Завершить тур</button>
                                : null
                            }
                            <div className={styles.navigationContainer}>
                                {
                                    tour > 1
                                    ? <BiLeftArrowAlt className={commonStyles.button} onClick={prevTour}>Предыдущий</BiLeftArrowAlt> 
                                    : null
                                }
                                {
                                    tour < tournament.toursCount && games[tour]
                                    ? <BiRightArrowAlt className={commonStyles.button} onClick={nextTour}>Следующий</BiRightArrowAlt> 
                                    :null
                                }
                                {
                                    tour === tournament.toursCount && tournament.isStarted && !tournament.isFinished
                                    ? <button onClick={finishTournament} className={commonStyles.buttonBlack}>Завершить турнир</button>
                                    : null
                                }
                                {/* TODO удалить */}
                                <button className={commonStyles.buttonBlack} onClick={resetTournament}>Reset</button>
                            </div>
                        </div>
                        
                    )
                : null
            }
            
        </div>
    )
}

export default ToursPage