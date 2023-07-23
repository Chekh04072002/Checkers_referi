import React, { Fragment } from 'react'
import { formatDate } from '../../../utils/utils'
import { BiIdCard } from 'react-icons/bi';
import styles from './PlayersList.module.css';
import { NavLink } from 'react-router-dom';


const PlayersList = ({players, actionLabel, actionButton}) => {

    return (
        <div className={styles.playersList}>
            {
                players.length > 0
                ? (
                    <Fragment>
                        <div className={`${styles.row} ${styles.header}`}>
                            <div className={styles.left}>Имя</div>
                            <div className={styles.birthday}>Дата рождения</div>
                            <div className={`${styles.region}`}>Регион</div>
                            <div className={styles.sportsCategoryAbbr}>Разряд</div>
                            <div>Рейтинг Адамовича</div>
                            <div>Профиль</div>
                            {actionLabel ? <div>{actionLabel}</div> : null}
                        </div>
                        <div className={styles.playersContainer}>
                            {
                                players.map(player => {
                                    return (
                                        <div 
                                            key={player._id} 
                                            className={`${styles.row}`}
                                            data-id={player._id}
                                        >
                                            <div className={`${styles.playerName} ${styles.left}`}>
                                                {player.lastName} {player.firstName} {player.middleName} 
                                            </div>
                                            <div>{formatDate(player.birthday)}</div>
                                            <div>{player.region}</div>
                                            <div>{player.sportsCategoryAbbr}</div>
                                            <div>{player.currentAdamovichRank.toFixed(2)}</div>
                                            <NavLink to={`/all-players/${player._id}`}>
                                                <BiIdCard className={styles.button}/>
                                            </NavLink>
                                            {actionButton ? actionButton : null}
                                            {/* <BiTrash onClick={onDeletePlayer} className={styles.button}/> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Fragment>
                )
                : null
            }
            
        </div>
    )
  /* return (
    <table className={styles.playersList}>
        <thead className={styles.playersListHeader}>
            <tr>
                <th>Имя</th>
                <th>Год рождения</th>
                <th>Разряд</th>
                <th>Рейтинг Адамовича</th>
                <th>Удалить</th>
            </tr>
            
        </thead>
        <tbody className={styles.playersListBody}>
            {players.map(player => {
                return (
                    <tr className={styles.playerItem}>
                        <td>{player.fullName}</td>
                        <td>{formatDate(player.birthday)}</td>
                        <td>{player.sportsCategoryAbbr}</td>
                        <td>{player.currentAdamovichRank.toFixed(2)}</td>
                        <td>Удалить</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  ) */
}

export default PlayersList