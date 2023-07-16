import React, { useEffect, useState } from 'react';
import styles from './TournamentStatus.module.css';

const TournamentStatus = ({tournament}) => {
    const [status, setStatus] = useState("notStarted")
    
    const getStatus = () => {
        if(!tournament?.isStarted && !tournament?.isFinished) setStatus("notStarted")
        else if(tournament?.isStarted && !tournament?.isFinished) setStatus("started")
        else setStatus("finished")
    }

    useEffect(getStatus, [tournament]);

    return (
        <div>
            <span className={`${styles.statusIcon} ${styles[status]}`}></span>
            {
                status === "notStarted"
                ? <span>Не стартовал</span> 
                : status === "started"
                ? <span>Cтартовал</span> 
                : <span>Завершен</span> 
            }
        </div>
    )
}

export default TournamentStatus