import React, { Fragment } from 'react'
import { formatDate } from '../../utils/utils'
import { BiTrash, BiIdCard } from 'react-icons/bi';
import styles from './PlayersList.module.css';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../config';


const PlayersList = ({players, actionLabel, actionButton}) => {

    return (
        <div className={styles.playersList}>
            {
                players.length > 0
                ? (
                    <Fragment>
                        <div className={`${styles.row} ${styles.header}`}>
                            <div>Имя</div>
                            <div>Дата рождения</div>
                            <div>Регион</div>
                            <div>Разряд</div>
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
                                            className={`${styles.row} ${styles.playerItem}`}
                                            data-id={player._id}
                                        >
                                            <div className={styles.playerName}>
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