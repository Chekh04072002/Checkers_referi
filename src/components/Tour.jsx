import React from 'react';
import Game from './Game';
import styles from './Game.module.css';

function Tour({ games, rechange, setRechange }) {
  return (
    <div>
      {games
        ? games.length > 0
          ? games.map((game, index) => (
              <Game
                key={index}
                game={game}
                rechange={rechange}
                setRechange={setRechange}
              />
            ))
          : null
        : null}
    </div>
  );
}

export default Tour;
