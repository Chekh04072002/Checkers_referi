import React from 'react';
import Game from './Game';
import styles from './Game.module.css';

function Tour({ games }) {
  //   console.log(games);
  return (
    <div>
      {games.length > 0
        ? games.map((game, index) => <Game key={index} game={game} />)
        : null}
    </div>
  );
}

export default Tour;
