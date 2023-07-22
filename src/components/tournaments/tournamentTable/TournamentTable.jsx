import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RoundTournamentTable from './Round/RoundTournamentTable';
import SwissTournamentTable from './Swiss/SwissTournamentTable';
import {AppContext} from '../../../context/AppContext';
import {compareByPlace, compareByScore} from '../../../utils/playerStatsComparator';
import { formatDate } from '../../../utils/utils';
import styles from './TournamentTable.module.css';

const TournamentTable = () => {
  const {tournament, 
        games, 
        playersStats, 
        fetchTournament, 
        fetchGames, 
        fetchPlayersStats
  } = useContext(AppContext);

  const params = useParams();

  const sortingPlayersStats = (playersStats) => {
    return playersStats.sort(compareByPlace)
  }

  useEffect(() => {
    fetchTournament(params.tournamentSlug);
    fetchPlayersStats(params.tournamentSlug);
    fetchGames(params.tournamentSlug);
  }, []);

  return (
      tournament?.isStarted && games.length > 0 && playersStats.length > 0
      ? (
        <div>
          <div>
            <h2>{tournament.title}</h2>
            <h3>
              {
                tournament.isFinished
                ? "Турнир завершен"
                : `Тур: №${tournament.currentTour}`
              }
            </h3>
            <div className={styles.subHeader}>
              {
                tournament.startDate || tournament.endDate
                ? <span>{`C ${formatDate(tournament.startDate)} - По ${formatDate(tournament.endDate)}`}</span>
                : null
              }
              <span>{`${tournament.country}, ${tournament.region}, ${tournament.city}`}</span>
            </div>
          </div>
          {
            tournament?.tournamentSystem === "Круговая" 
            ? <RoundTournamentTable  playersStats={sortingPlayersStats(playersStats)} games={games.reduce((allGames, tour) => [...allGames, ...tour])}/>
            : <SwissTournamentTable playersStats={sortingPlayersStats(playersStats)} tours={games}/>
          }
        </div>
        
      )
      : <h1>Турнир еще не стартовал</h1>
  );
}

export default TournamentTable;