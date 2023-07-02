import { createContext, useState } from "react"
import { API_URL } from "../config";
import { fetchHandler } from "../utils/utils";

const defaultValue = {
    tournament: null,
    games: [],
    playersStats: [],
    setTournament: (tournament) => null,
    fetchTournament: (id) => null,
    fetchGames: (tournamentID) => [],
    setGames: (games) => [],
    updateGame: (gameID, result, succesFunction) => null,
    fetchPlayersStats: (tournamentID) => []
}

export const AppContext = createContext(defaultValue);

const AppProvider = ({children}) => {
    const [tournament, setTournament] = useState({});
    const [games, setGames] = useState([]);
    const [playersStats, setPlayersStats] = useState([]);
    
    const fetchTournament = (id) => {
        fetchHandler(
            `tournaments/${id}`,
            data => setTournament(data),
            () => console.log("Подождите..."),
            error => console.error(error)
        );
    }

    const fetchPlayersStats = (tournamentID) => {
        fetchHandler(
            `player-stats?tournamentID=${tournamentID}`,
            data => setPlayersStats(data),
            () => console.log("Подождите..."),
            error => console.error(error)
        );
    }
    const fetchGames = (tournamentID) => {
        fetchHandler(
            `games?tournamentID=${tournamentID}`,
            data => setGames(data),
            () => console.log("Подождите..."),
            error => console.error(error)
        );
    }

    const updateGame = (gameID, result, succesFunction) => {
        fetchHandler(
            `games/${gameID}`,
            () => {
                //fetchGames(tournament._id);
                succesFunction();
            },
            () => console.log("Подождите..."),
            error => console.error(error),
            {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                  player1Score: Number(result[0]),
                  player2Score: Number(result[1]),
                }),
            }
        )
    }

    const value = {
        tournament, 
        games,
        playersStats,
        setTournament,
        fetchTournament,
        fetchGames,
        setGames,
        updateGame,
        fetchPlayersStats
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider;