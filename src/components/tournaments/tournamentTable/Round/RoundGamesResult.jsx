import React from 'react'
import draughts from '../../../../pictures/Draughts.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHockeyPuck } from '@fortawesome/free-solid-svg-icons';
import styles from './RoundTable.module.css';

const RoundGamesResult = ({index, currentPlayer, allPlayers, games}) => {
  const getGameResultCell = (player, i) => {
    if(index === i) {
        return <td key={i} className={`${styles.tdScore} ${styles.td40}`}>
                    <FontAwesomeIcon className={styles.draughtsImage} icon={faHockeyPuck}/>
                </td>;
    }

    let gameResult = 0;
    const game = games.find((g) => player._id === g.player1StatsID || player._id === g.player2StatsID);
    console.log(game);
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
    <td className={styles.noPaddings} colSpan={allPlayers.length}>
      <table className={styles.tdToursContainer}>
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