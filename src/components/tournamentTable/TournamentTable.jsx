import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import RoundTournamentTable from './Round/RoundTournamentTable';
import SwissTournamentTable from './Swiss/SwissTournamentTable';

const TournamentTable = () => {
  const [tournament, setTournament] = useState(null);
  const [playersStats, setPlayersStats] = useState([]);
  const [tours, setTours] = useState([]);
  const params = useParams();

  const getPlayersStats = () => {
    fetch(`${API_URL}player-stats?tournamentID=${params.tournamentSlug}`) // получаю
      .then((response) => response.json())
      .then((data) => setPlayersStats(data))
      .catch(error => console.error(error));
  }
  const getGames = () => {
    fetch(`${API_URL}games?tournamentID=${params.tournamentSlug}`) // получаю
      .then(response => response.json())
      .then(data => setTours(data))
      .catch(error => console.error(error));
  }

  const getTournament = () => {
    fetch(`${API_URL}tournaments/${params.tournamentSlug}`)
    .then(response => response.json())
    .then(data => setTournament(data))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    getTournament();
    getPlayersStats();
    getGames();
  }, []);


  return (
      tournament?.isStarted && tours.length > 0
      ? tournament?.tournamentSystem === "Круговая" 
        ? <RoundTournamentTable  playersStats={playersStats} games={tours.reduce((allGames, tour) => [...allGames, ...tour])}/>
        : <SwissTournamentTable playersStats={playersStats} tours={tours}/>
      : <h1>Турнир еще не стартовал</h1>
      
  );
}

export default TournamentTable;