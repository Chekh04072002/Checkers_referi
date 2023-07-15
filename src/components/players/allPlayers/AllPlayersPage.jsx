import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import PlayersList from '../playersList/PlayersList';
import { BiTrash } from 'react-icons/bi';
import styles from './AllPlayersPage.module.css';
import { fetchHandler, paginateData } from '../../../utils/utils';
import { compareByName } from '../../../utils/playerComparator';
import Pagination from '../../UI/Pagination';

const AllPlayersPage = () => {
    const {players, fetchPlayers, setPlayers} = useContext(AppContext);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [paginatedPlayers, setPaginatedPlayers] = useState([]);


    const deletePlayer = (e) => {
        let playerID;

        if(e.target.tagName === "path") {
            playerID = e.target.parentElement.parentElement.dataset.id;
        } else {
            playerID = e.target.parentElement.dataset.id;
        }

        fetchHandler(
            `players/${playerID}`,
            () => setPlayers(players.filter(p => p._id !== playerID)),
            () => null,
            (error) => console.error(error),
            {method: 'DELETE'}
        )
    }

    useEffect(fetchPlayers, []);
    
    useEffect(() => {
        setTotalPages(Math.ceil(players.length / limit));
    }, [players]);

    useEffect(() => {
        setPaginatedPlayers(paginateData(players.sort(compareByName), limit, page))
    }, [players, totalPages, page])

    return (
        <div className={styles.page}>
            <PlayersList 
                players={paginatedPlayers}
                actionLabel="Удалить"
                actionButton={<BiTrash className={styles.actionBtn} onClick={deletePlayer}/>}
            />
            <Pagination
                className={styles.pagination} 
                currentPage={page}
                setCurrentPage={setPage}
                pages={totalPages}
            />
        </div>
    )
}

export default AllPlayersPage