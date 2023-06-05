import React, { useState } from 'react';
import styles from './Game.module.css';

function Game({ game }) {
  //   console.log('game', game);
  const [result, setResult] = useState('');

  const updateGame = async () => {
    const gameData = await (
      await fetch(`http://localhost:5000/api/games/${game._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          player1Score: Number(result[0]),
          player2Score: Number(result[2]),
        }),
      })
    ).json();

    console.log(gameData);
  };
  console.log(result);

  return (
    <div className={styles.divGame}>
      <span style={{ width: '350px' }}>
        {game.player1Name ? game.player1Name : 'Нет соперника'}
      </span>
      <select
        className={styles.selec}
        name="changeType"
        id="select"
        onChange={(e) => setResult(e.target.value)}
        // className={styles.inputText}
      >
        <option value="">0 - 0</option>
        <option value="1-1">1 - 1</option>
        <option value="2-0">2 - 0</option>
        <option value="0-2">0 - 2</option>
      </select>
      <span style={{ width: '350px' }}>
        {game.player2Name ? game.player2Name : 'Нет соперника'}
      </span>
      <button className={styles.but} onClick={updateGame}>
        Сохранить
      </button>
    </div>
  );
}

export default Game;
