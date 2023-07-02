import React from 'react';
import Game from './Game';

const Tour = ({tour, games}) => {
  return (
    <div>
        <h2>{`Тур ${tour}`}</h2>
        <div>
            {
                games.length > 0 ? 
                games.map(game => {
                    return <Game key={game._id} game={game}/>
                }) : 
                null
            }
        </div>
    </div>
  )
}

export default Tour