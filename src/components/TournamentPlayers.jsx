import React, { useEffect, useState } from 'react';
import styles from './Tournament.module.css';
import { API_URL } from '../config';

function TournamentPlayers({ id }) {
  const [player, setPlayer] = useState({});
  useEffect(() => {
    fetch(`${API_URL}players/${id}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data));
  }, []);

  return <div className={styles.lastName}>{player['lastName']}, </div>;
}

export default TournamentPlayers;
