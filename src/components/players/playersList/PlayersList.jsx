import React, { Fragment } from 'react'
import { formatDate } from '../../../utils/utils'
import { BiIdCard } from 'react-icons/bi';
import styles from './PlayersList.module.css';
import { NavLink } from 'react-router-dom';
import PlayerData from '../playerData/PlayerData';


const PlayersList = ({players, actionLabel, actionButton}) => {

    return (
        <div className={styles.playersList}>
            {
                players.length > 0
                ? (
                    <Fragment>
                        <div className={`${styles.row} ${styles.header}`}>
                            <div className={styles.left}>Имя</div>
                            <div>Дата рождения</div>
                            <div>Регион</div>
                            <div>Разряд</div>
                            <div>Рейтинг Адамовича</div>
                            {/* <div>Профиль</div> */}
                            {actionLabel ? <div>{actionLabel}</div> : null}
                        </div>
                        <div className={styles.playersContainer}>
                            {
                                players.map(player => {
                                    return (
                                        <PlayerData 
                                            key={player._id}
                                            id={player._id}
                                            className={styles.row}
                                            lastName={player.lastName}
                                            firstName={player.firstName}
                                            middleName={player.middleName}
                                            birthday={player.birthday}
                                            region={player.region}
                                            sportsCategoryAbbr={player.sportsCategoryAbbr}
                                            currentAdamovichRank={player.currentAdamovichRank}
                                            actionButton={actionButton}
                                        />
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
}

export default PlayersList