import React from 'react'
import RoundGamesResult from './RoundGamesResult';
import styles from './RoundTable.module.css';

const RoundPlayerStats = ({index, playerStats, allPlayers, playerGames}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td className={styles.tdName}>{playerStats.playerName}</td>
      <td>{new Date(playerStats.birthday).getFullYear()}</td>
      <td>{playerStats.sportsCategoryAbbr}</td>
      <td>{playerStats.region}</td>
      <td>{playerStats.sportsOrganization}</td>
      <RoundGamesResult
        key={playerStats._id} 
        index={index}
        currentPlayer={playerStats}
        allPlayers={allPlayers}
        games={playerGames}
      />
      <td>{playerStats.score}</td>
      <td>{playerStats.gorinRank}</td>
      <td>{playerStats.lastAdamovichRank.toFixed(2)}</td>
    </tr>
  )
}

export default RoundPlayerStats