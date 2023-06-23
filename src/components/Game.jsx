import React, { useEffect, useState } from 'react';
import styles from './Game.module.css';

function Game({ game, rechange, setRechange }) {
  console.log('game', game);
  const [result, setResult] = useState('');
  const [finishGame, setFinishGame] = useState([]);
  const [change, setChange] = useState(false); // Если она true, то появляется форма для замены результата

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/games/${game._id}`)
  //     .then((response) => response.json())
  //     .then((data) => console.log('adad', data));
  //   // .then((data) =>
  //   //   setFinishGame({
  //   //     player1Score: data['player1Score'],
  //   //     player2Score: data['player2Score'],
  //   //   })
  //   // );
  // }, []);
  // console.log(`finishGame for game ${game._id}`, finishGame);

  const updateGame = async (e) => {
    // e.target.className += ` ${styles.clicked}`;
    // console.log(e.target.className);
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
    setFinishGame([...finishGame, gameData]);
    setRechange(!rechange); // меняет состояние на противоположное, чтобы в сделался запрос на игру и поменялся вовремя результат
    setChange(false); // Убирает форму для замены результата
    console.log('gameData', gameData);
  };

  const changeGame = async (e) => {
    setChange(true); // Говорит, что нужно поменять результат
  };
  console.log('result', result);

  return (
    <div className={styles.divGame}>
      <span style={{ width: '350px' }}>
        {/* <div
          style={{ backgroundColor: 'black', width: '5px', height: '5px' }}
        ></div> */}
        {game.player1Name ? game.player1Name : 'Нет соперника'}
      </span>

      {/* {finishGame.player1Score ? (
        finishGame.player1Score
      ) : (
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
      )} */}

      {game['player1Score'] == 0 && game['player2Score'] == 0 ? ( // Если счет 0:0, то есть результат вносится первый раз, то
        <select // то вывожу обычную форму
          defaultValue={'DEFAULT'}
          className={styles.selec}
          name="changeType"
          id="select"
          onChange={(e) => setResult(e.target.value)}
          // className={styles.inputText}
        >
          <option value="DEFAULT">0 - 0</option>
          <option value="1-1">1 - 1</option>
          <option value="2-0">2 - 0</option>
          <option value="0-2">0 - 2</option>
        </select>
      ) : change === true ? ( // Иначе, если результат уже был внесен, и нужно поменять результат, то вывожу опять обычную форму
        <select
          defaultValue={'DEFAULT'}
          className={styles.selec}
          name="changeType"
          id="select"
          onChange={(e) => setResult(e.target.value)}
          // className={styles.inputText}
        >
          <option value="DEFAULT">0 - 0</option>
          <option value="1-1">1 - 1</option>
          <option value="2-0">2 - 0</option>
          <option value="0-2">0 - 2</option>
        </select>
      ) : (
        // иначе, если результат уже внесен и его не надо менять, то вывожу счет игроков
        `${game['player1Score']} : ${game['player2Score']}`
      )}

      {/* // <select
      //   className={styles.selec}
      //   name="changeType"
      //   id="select"
      //   onChange={(e) => setResult(e.target.value)}
      //   // className={styles.inputText}
      // >
      //   <option value="">0 - 0</option>
      //   <option value="1-1">1 - 1</option>
      //   <option value="2-0">2 - 0</option>
      //   <option value="0-2">0 - 2</option>
      // </select> */}
      <span style={{ width: '350px' }}>
        {game.player2Name ? game.player2Name : 'Нет соперника'}
      </span>

      {game['player1Score'] == 0 && game['player2Score'] == 0 ? (
        ''
      ) : (
        <button className={styles.but} onClick={changeGame}>
          Обновить
        </button>
      )}

      <button className={styles.but} onClick={updateGame}>
        Сохранить
      </button>
    </div>
  );
}

export default Game;
