import React from 'react';
import styles from './AllPlayer.module.css';
import TableDemo from './TableDemo';
function AllPlayers() {
  return (
    <div className={styles.App}>
      <div className={styles.AppHeader}>
        Полный список игроков
        <TableDemo></TableDemo>
      </div>
    </div>
  );
}

export default AllPlayers;
