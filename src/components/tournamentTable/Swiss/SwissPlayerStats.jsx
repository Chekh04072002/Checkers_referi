import React from 'react'
import SwissGamesResult from './SwissGamesResult'

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
        index={index}
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