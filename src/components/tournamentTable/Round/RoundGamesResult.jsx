import React from 'react'
import draughts from '../../../pictures/Draughts.png';
import styles from '../GamesResult.module.css';

const RoundGamesResult = ({index, currentPlayer, allPlayers, games}) => {
  const getGameResultCell = (player, i) => {
    if(index === i) {
        return <td key={i} className={`${styles.tdScore} ${styles.td40}`}>
                    <img className={styles.draughtsImage} src={draughts} alt="" />
                </td>;
    }

    let gameResult = 0;
    const game = games.find((g) => player._id === g.player1StatsID || player._id === g.player2StatsID);

    if(game) gameResult = getPlayerScore(game, currentPlayer);

    return <td key={i} className={`${styles.tdScore} ${styles.td40}`}>{gameResult}</td>;
  }

  const getPlayerScore = (game, player) => {
      if(player._id === game.player1StatsID){
          return game.player1Score;
      }
      else {
        return game.player2Score;
      }
  }

  return (
    <td colSpan={allPlayers.length}>
      <table className={styles.tdScoreContainer}>
        <tbody>
          <tr>
            {allPlayers.map(getGameResultCell)}
          </tr>
        </tbody>
      </table>
    </td>
    
      
  )
}

export default RoundGamesResult