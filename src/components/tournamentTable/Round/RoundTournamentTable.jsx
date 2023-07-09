import React from 'react'
import styles from '../TournamentTable.module.css';
import RoundPlayerStats from './RoundPlayerStats';

const RoundTournamentTable = ({playersStats, games}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tdNumber}>№ п/п</th>
            <th style={{ justifyContent: 'center' }} className={styles.tdName}>
              Фамилия, имя, отчество
            </th>
            <th className={styles.tdBirthday}>Год рожд.</th>
            <th className={styles.tdSportsCategory}>Спорт. разряд</th>
            <th className={styles.tdCity}>Город</th>
            <th className={styles.tdSportsOrganization}>Спорт. организ.</th>
            <th className={styles.tdCompetitors} colSpan={playersStats.length}>
              <table>
                <tbody>
                  <tr><th className={styles.tdCompetitorsTitle} colSpan={playersStats.length}>Номер соперника</th></tr>
                  <tr>
                    {playersStats.map((player, i) => <td key={i} className={styles.tdCompetitorNumber}>{i + 1}</td>)}
                  </tr>
                </tbody>
              </table>
            </th>
            <th className={styles.tdScore}>Очки</th>
            <th className={styles.tdGorinRank}>КГ</th>
            <th className={styles.tdAdamovichRank}>РА</th>
            <th className={styles.tdPlace}>Место</th>
          </tr>
        </thead>
        <tbody>
          {playersStats.map((playerStats, i) => {
            return <RoundPlayerStats
                      key={playerStats._id} 
                      index={i}
                      playerStats={playerStats}
                      allPlayers={playersStats}
                      playerGames={games.filter(game => {
                        return game?.player1StatsID === playerStats._id || 
                                game?.player2StatsID === playerStats._id
                      })}
                    />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RoundTournamentTable