import React from 'react'
import SwissPlayerStats from './SwissPlayerStats';
import styles from '../TournamentTable.module.css';
import stylesSwiss from './SwissTable.module.css';

const SwissTournamentTable = ({playersStats, tours}) => {
  const getPlayerTours = (playerStats) => {
    return tours.map(games => games.filter(game => {
      return game?.player1StatsID === playerStats._id || 
            game?.player2StatsID === playerStats._id
    }))
  }

  return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tdPlace}>Место</th>
              <th className={styles.tdNumber}>№ п/п</th>
              <th style={{ justifyContent: 'center' }} className={styles.tdName}>
                Фамилия, имя, отчество
              </th>
              <th className={styles.tdBirthday}>Год рожд.</th>
              <th className={styles.tdSportsCategory}>Спорт. разряд</th>
              <th className={styles.tdCity}>Город</th>
              <th className={styles.tdSportsOrganization}>Спорт. организ.</th>
              <th className={`${styles.tdTours}`} colSpan={tours.length * 2}>
                <table className={`${styles.table} ${styles.fullWidth}`}>
                  <tbody>
                    <tr><th className={styles.tdToursTitle} colSpan={tours.length * 2}>Движение по турам</th></tr>
                    <tr>
                      {tours.map((tour, i) => {
                        return <td colSpan={2} key={i} className={stylesSwiss.tdTourNumber}>{i + 1}</td>
                      })}
                    </tr>
                  </tbody>
                </table>
              </th>
              <th className={styles.tdScore}>Очки</th>
              <th className={styles.tdGorinRank}>КГ</th>
              <th className={styles.tdAdamovichRank}>РА</th>
            </tr>
          </thead>
          <tbody>
            {playersStats.map((playerStats, i) => {
              return <SwissPlayerStats
                        key={playerStats._id} 
                        index={i}
                        playerStats={playerStats}
                        allPlayers={playersStats}
                        playerGames={getPlayerTours(playerStats)}
                      />
            })}
          </tbody>
        </table>
      </div>
      
  )
}
export default SwissTournamentTable