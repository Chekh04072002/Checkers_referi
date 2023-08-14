import React from 'react'
import SwissGamesResult from './SwissGamesResult';
import styles from './SwissTable.module.css';

const SwissPlayerStats = ({index, playerStats, allPlayers, playerGames}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td className={styles.tdName}>{playerStats.playerName}</td>
      <td>{new Date(playerStats.birthday).getFullYear()}</td>
      <td>{playerStats.sportsCategoryAbbr}</td>
      <td>{playerStats.region}</td>
      <td>{playerStats.sportsOrganization}</td>
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


export default SwissPlayerStats