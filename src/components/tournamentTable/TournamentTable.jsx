import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import RoundTournamentTable from './Round/RoundTournamentTable';
import SwissTournamentTable from './Swiss/SwissTournamentTable';
import { AppContext } from '../../context/AppContext';

const TournamentTable = () => {
  const {tournament, 
        games, 
        playersStats, 
        fetchTournament, 
        fetchGames, 
        fetchPlayersStats
  } = useContext(AppContext);

  const params = useParams();



  useEffect(() => {
    fetchTournament(params.tournamentSlug);
    fetchPlayersStats(params.tournamentSlug);
    fetchGames(params.tournamentSlug);
  }, []);


  return (
      tournament?.isStarted && games.length > 0
      ? tournament?.tournamentSystem === "Круговая" 
        ? <RoundTournamentTable  playersStats={playersStats} games={games.reduce((allGames, tour) => [...allGames, ...tour])}/>
        : <SwissTournamentTable playersStats={playersStats} tours={games}/>
      : <h1>Турнир еще не стартовал</h1>
      
  );
}

export default TournamentTable;