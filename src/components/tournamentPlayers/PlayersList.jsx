import React, { Fragment } from 'react'
import { formatDate } from '../../utils/utils'
import { BiTrash, BiIdCard } from 'react-icons/bi';
import styles from './PlayersList.module.css';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../config';


const PlayersList = ({players, onDeletePlayer}) => {

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
                        <div>Удалить</div>
                    </div>
                    {
                        players.map(player => {
                            return (
                                <div className={`${styles.row} ${styles.playerItem}`}>
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
                                    <BiTrash onClick={() => onDeletePlayer(player._id)} className={styles.button}/>
                                </div>
                            )
                        })
                    }
                    </Fragment>
                )
                : <h2>Список участников пуст</h2>
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