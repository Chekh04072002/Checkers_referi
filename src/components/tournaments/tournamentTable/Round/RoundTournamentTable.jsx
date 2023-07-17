import React from 'react'
import RoundPlayerStats from './RoundPlayerStats';
import styles from '../TournamentTable.module.css';
import stylesRound from './RoundTable.module.css';

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
            <th className={styles.tdCity}>Регион, Город</th>
            <th className={styles.tdSportsOrganization}>Команда, Спорторганизация</th>
            <th className={styles.tdTours} colSpan={playersStats.length}>
              <table className={`${styles.table} ${styles.fullWidth}`}>
                <tbody>
                  <tr><th className={styles.tdToursTitle} colSpan={playersStats.length}>Номер соперника</th></tr>
                  <tr>
                    {playersStats.map((player, i) => <td key={i} className={stylesRound.tdTourNumber}>{i + 1}</td>)}
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