import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SoloResult from './SoloResult';
import styles from './SoloResult.module.css';
import { API_URL } from '../config';

const TournamentGamesResult = ({ game }) => {
  /* const [playersStats, setPlayersStats] = useState([]);
  const [games, setGames] = useState([]);
  const params = useParams();

  const getPlayersStats = () => {
    fetch(`${API_URL}player-stats?tournamentID=${params.tournamentSlug}`) // получаю
      .then((response) => response.json())
      .then((data) => setPlayersStats(data))
      .catch(error => console.error(error));
  }
  const getGames = () => {
    fetch(`${API_URL}games?tournamentID=${params.tournamentSlug}`) // получаю
      .then((response) => response.json())
      .then((data) => data.reduce((allGames, tour) => [...allGames, ...tour]))
      .then(allGames => setGames(allGames))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getPlayersStats();
    getGames();
  }, []);


  return (
    <div className={styles.divOuterTable}>
      <table className={styles.table}>
        <tr className={styles.trr}>
          <td className={styles.tdNumber}>№ п/п</td>
          <td style={{ justifyContent: 'center' }} className={styles.tdFio}>
            Фамилия, имя, отчество
          </td>
          <td className={styles.tdDr}>Год рожд.</td>
          <td className={styles.tdSr}>Спорт. разряд</td>
          <td className={styles.tdCity}>Город</td>
          <td className={styles.tdOrg}>Спорт. организ.</td>
          <td className={styles.tdCompetitors} colSpan={playersStats.length}>
            <tr><td className={styles.tdCompetitorsTitle} colSpan={playersStats.length}>Номер соперника</td></tr>
            <tr>
              {playersStats.map((player, i) => <td className={styles.tdCompetitorNumber}>{i + 1}</td>)}
            </tr>
          </td>
          <td className={styles.tdO}>Очки</td>
          <td className={styles.tdGr}>КГ</td>
          <td className={styles.tdRa}>РА</td>
          <td className={styles.tdPlace}>Место</td>
        </tr>
        {playersStats.map((playerStats, i) => {
            return <PlayerStats 
                      index={i}
                      playerStats={playerStats}
                      allPlayers={playersStats}
                      playerGames={games.filter(game => {
                        return game.player1StatsID === playerStats._id || 
                                game.player2StatsID === playerStats._id
                      })}
                    />
          })}
      </table>
    </div>
  ); */
};

export default TournamentGamesResult;

