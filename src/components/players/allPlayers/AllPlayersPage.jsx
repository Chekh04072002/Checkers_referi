import React, { useEffect} from 'react'
import PlayersList from '../playersList/PlayersList';
import { BiTrash } from 'react-icons/bi';
import styles from './AllPlayersPage.module.css';
import { useDeletePlayerMutation, useLazyGetPlayersQuery } from '../../../redux/api/Players.api';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPlayers } from '../../../redux/reducers/Players.selector';
import useActions from '../../../hooks/useActions';

const AllPlayersPage = () => {
    //const dispatch = useDispatch();
    const {setPlayers} = useActions();
    const [getPlayers, response] = useLazyGetPlayersQuery();
    const [deletePlayerReq] = useDeletePlayerMutation();
    const players = useSelector(selectAllPlayers);

    //const {players, fetchPlayers, setPlayers} = useContext(AppContext);
    //const [page, setPage] = useState(1);
   // const [limit, setLimit] = useState(10);
    //const [totalPages, setTotalPages] = useState(0);
    //const [paginatedPlayers, setPaginatedPlayers] = useState([]);


    /* const resetPagination = () => {
        const pages = Math.ceil(players.length / limit);
        const currentPage = clamp(page, 1, pages);

        setTotalPages(pages);
        setPage(currentPage);
        
    } */

    const deletePlayer = async (e) => {
        let playerID;

        if(e.target.tagName === "path") {
            playerID = e.target.parentElement.parentElement.dataset.id;
        } else {
            playerID = e.target.parentElement.dataset.id;
        }

        await deletePlayerReq(playerID);
        getPlayers();
    }
    
    useEffect(() => {
        getPlayers();
    }, []);

    useEffect(() => {
        if(response.data && response.data.length > 0) {
            //dispatch(setPlayers(response.data));
            setPlayers(response.data);
        }
    }, [response]);


    //useEffect(fetchPlayers, []);

    /* useEffect(resetPagination, [players]);
    useEffect(() => {
        setPaginatedPlayers(paginateData(players.sort(compareByName), limit, page));
    }, [players, page, totalPages]) */
    return (
        <div className={styles.page}>
            <PlayersList 
                players={players}
                actionLabel="Удалить"
                actionButton={<BiTrash className={styles.actionBtn} onClick={deletePlayer}/>}
            />
        </div>
    )
}

export default AllPlayersPage