import React, { useEffect, useState } from 'react';
import styles from './Game.module.css';

function TournamentPlayers({ id }) {
  const [player, setPlayer] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/api/players/${id}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data));
  }, []);

  return <div style={{ display: 'block' }}>{player['lastName']}, </div>;
}

export default TournamentPlayers;
