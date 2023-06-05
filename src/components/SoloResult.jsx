import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SoloResult.module.css';

const SoloResult = ({ id }) => {
  const [objectStats, setObjectStats] = useState({});
  const [razr, setRazr] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/api/player-stats/${id}`) // получаю
      .then((response) => response.json())
      .then((data) => setObjectStats(data));
  }, []);

  //   useEffect(() => {
  //     fetch(`http://localhost:5000/api/players/${objectStats['playerID']}`) // получаю
  //       .then((response) => response.json())
  //       .then((data) => setRazr(data));
  //   }, []);
  console.log('objectStats', objectStats);
  //   console.log('razr', razr);

  return (
    <tr className={styles.trr}>
      <tr className={styles.tdFio}>{`${objectStats['playerName']}`}</tr>
      <td className={styles.tdDr}>
        {objectStats['birthday']
          ? `${objectStats['birthday'].slice(0, 4)}`
          : ''}
      </td>
      <td className={styles.tdSr}>{'1'}</td>
      <td className={styles.tdCity}>{`город`}</td>
      <td className={styles.tdOrg}>{`организ`}</td>
      <td className={styles.tdO}>{`${objectStats['score']}`}</td>
      <td className={styles.tdGr}>{`${objectStats['gorinRank']}`}</td>
      <td className={styles.tdGr}>{`${Math.round(
        objectStats['lastAdamovichRank']
      )}`}</td>
      <td className={styles.tdPlace}>{`${objectStats['place']}`}</td>
    </tr>
    // <div>
    //   <span
    //     className={styles.spanName}
    //     style={{ backgroundColor: 'red' }}
    //   >{`${objectStats['playerName']}`}</span>
    //   <span
    //     className={styles.spanName}
    //     style={{ backgroundColor: 'gray' }}
    //   >{`${objectStats['place']}`}</span>
    // </div>
  );
};

export default SoloResult;
