import React from 'react';
import styles from '../GamesResult.module.css';

const SwissGamesResult = ({currentPlayer, allPlayers, tours}) => {
    const getGameResultCell = (tour, tourNumber) => {
        if(tour.length === 0) return;

        let gameResult = getPlayerScore(tour[0], currentPlayer);
        let competitorNum = getCompetitorNumber(tour[0], currentPlayer, allPlayers);

        return <td key={`${currentPlayer._id}:${tourNumber}`} className={styles.td40} colSpan={2}>
                    <table className={styles.fullWidthElement}>
                        <tbody>
                            <tr>
                                <td className={styles.tdScore}>{competitorNum}</td>
                                <td className={`${styles.tdScore} ${styles.bold} ${styles.td20}`}>
                                    {gameResult}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>;
    }

    const getPlayerScore = (game, player) => {
        if(!game) return;
        if(player._id === game.player1StatsID){
            return game.player1Score;
        }
        else {
            return game.player2Score;
        }
    }

    const getCompetitorNumber = (game, player, players) => {
        const competitorID = game.player1StatsID === player._id 
                                ? game.player2StatsID 
                                : game.player1StatsID;
        const competitor = players.find(player => player._id === competitorID);

        if(competitor) {
            return players.indexOf(competitor) + 1;
        }

        return 0;
    }
    return (
        <td colSpan={tours.length * 2}>
            <table className={`${styles.tdScoreContainer} ${styles.fullWidthElement}`}>
                <tbody>
                    <tr>
                        {tours.map((tour, i) => getGameResultCell(tour, i))}
                    </tr>
                </tbody>
            </table>
        </td>
    );
    

    /* return (
        <td colSpan={allPlayers.length} className={styles.tdScoreContainer}>
            {allPlayers.map(getGameResultCell)}
        </td>
    ) */
}

export default SwissGamesResult