import React from 'react';
import styles from './SwissTable.module.css';

const SwissGamesResult = ({currentPlayer, allPlayers, tours}) => {
    const getGameResultCell = (tour, tourNumber) => {
        if(tour.length === 0) return;

        let gameResult = getPlayerScore(tour[0], currentPlayer);
        let competitorNum = getCompetitorNumber(tour[0], currentPlayer, allPlayers);

        return <td key={`${currentPlayer._id}:${tourNumber}`} className={styles.tdTourData} colSpan={2}>
                    <table className={`${styles.fullWidthElement} ${styles.tdTourContainer}`}>
                        <tbody>
                            <tr>
                                <td className={styles.tdCompetitorNum}>{competitorNum}</td>
                                <td className={`${styles.tdScore} ${styles.bold}`}>
                                    {gameResult}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>;
    }

    const getPlayerScore = (game, player) => {
        if(!game) return;
        if(game.player1Score === 0 && game.player2Score === 0) return '';

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

        return "+";
    }
    return (
        
        <td className={styles.noPaddings}  colSpan={tours.length * 2}>
            <table className={`${styles.tdToursContainer} ${styles.fullWidthElement}`}>
                <tbody>
                    <tr>
                        {tours.map((tour, i) => getGameResultCell(tour, i))}
                    </tr>
                </tbody>
            </table>
        </td>
        
    );
}

export default SwissGamesResult