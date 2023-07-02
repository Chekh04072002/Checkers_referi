import React, { useContext, useEffect, useState } from 'react';
import whiteCheckers from "../../pictures/WhiteDraughts.png"
import blackCheckers from "../../pictures/BlackDraughts.png"
import styles from './Game.module.css';
import {GrEdit} from "react-icons/gr";
import {BiSave, BiEditAlt} from "react-icons/bi";
import { AppContext } from '../../context/AppContext';

const Game = ({game}) => {
    const {updateGame, tournament} = useContext(AppContext);
    const [result, setResult] = useState(`${game.player1Score}-${game.player2Score}`);
    const [isEditing, setIsEditing] = useState(result === '0-0' ? true : false);

    const player1 = {
        name: game.player1Name || "Нет соперника",
        score: game.player1Score,
        color: game.player1CheckersColor
    }
    const player2 = {
        name: game.player2Name || "Нет соперника",
        score: game.player2Score,
        color: game.player2CheckersColor
    }

    const saveGameResult = () => {
        const gameResult = result.split('-');

        updateGame(game._id, gameResult, () => {
            game.player1Score = gameResult[0];
            game.player2Score = gameResult[1];

            setIsEditing(false);
        });
    }

    return (
        <div className={styles.game}>
            <img className={styles.checkersImage} src={player1.color === "Черные" ? blackCheckers : whiteCheckers} alt="" />
            <span className={styles.playerName}>{player1.name}</span>
            {
                isEditing
                ? (
                    <select
                        defaultValue={result === '0-0' ? 'DEFAULT' : result}
                        className={styles.select}
                        name="changeType"
                        id="select"
                        onChange={(e) => setResult(e.target.value)}
                        >
                            <option disabled value="DEFAULT">0 - 0</option>
                            <option value="1-1">1 - 1</option>
                            <option value="2-0">2 - 0</option>
                            <option value="0-2">0 - 2</option>
                    </select>
                )
                : (
                    <div className={styles.scoreContainer}>
                        <span>{player1.score} </span>
                        :
                        <span> {player2.score}</span>
                    </div>
                )
            }
            <span className={styles.playerName}>{player2.name}</span>
            <img className={styles.checkersImage} src={player2.color === "Черные" ? blackCheckers : whiteCheckers} alt="" />
            {
                !tournament.isFinished
                ? (
                    <div className={styles.actionsContainer}>
                        {
                            (player1.score !== 0 || player2.score !== 0) && !isEditing
                            ? <BiEditAlt className={styles.actionButton} onClick={() => setIsEditing(true)}/>
                            : null
                        }
                        {
                            isEditing
                            ? <BiSave onClick={saveGameResult} className={styles.actionButton} />
                            : null
                        }
                    </div>
                )
                : null
            }
            
        </div>
    )
}

export default Game