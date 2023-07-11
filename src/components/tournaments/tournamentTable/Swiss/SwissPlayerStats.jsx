import React from 'react'
import SwissGamesResult from './SwissGamesResult'
import styles from '../TournamentTable.module.css';

const SwissPlayerStats = ({index, playerStats, allPlayers, playerGames}) => {
  return (
    <tr>
      <td>{playerStats.place}</td>
      <td>{index + 1}</td>
      <td>{playerStats.playerName}</td>
      <td>{new Date(playerStats.birthday).getFullYear()}</td>
      <td>{playerStats.sportsCategoryAbbr}</td>
      <td>{playerStats.region}</td>
      <td>ФШ</td>
      <SwissGamesResult
        currentPlayer={playerStats}
        allPlayers={allPlayers}
        tours={playerGames}
      />
      <td>{playerStats.score}</td>
      <td>{playerStats.gorinRank}</td>
      <td>{playerStats.lastAdamovichRank.toFixed(2)}</td>
    </tr>
    
  )
}

{/* <div className={styles.row}>
      <div>{playerStats.place}</div>
      <div>{index + 1}</div>
      <div>{playerStats.playerName}</div>
      <div>{new Date(playerStats.birthday).getFullYear()}</div>
      <div>{playerStats.sportsCategoryAbbr}</div>
      <div>{playerStats.region}</div>
      <div>ФШ</div>
      <SwissGamesResult
        currentPlayer={playerStats}
        allPlayers={allPlayers}
        tours={playerGames}
      />
      <div>{playerStats.score}</div>
      <div>{playerStats.gorinRank}</div>
      <div>{playerStats.lastAdamovichRank.toFixed(2)}</div>
    </div> */}



export default SwissPlayerStats