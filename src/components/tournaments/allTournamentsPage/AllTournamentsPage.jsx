import { useEffect, useState } from 'react';
import styles from './AllTournamentsPage.module.css';
import MapTournament from '../../MapTournament';
import { API_URL } from "../../../config";
import Pagination from '../../UI/Pagination';
import { fetchHandler, paginateData } from '../../../utils/utils';
import { clamp } from '../../../utils/utils';


const AllTournamentsPage = () => {
    const [tournaments, setTournaments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(8);
    const [paginatedTournaments, setPaginatedTournament] = useState([]);

    const resetPaginateData = () => {
      const pages = Math.ceil(tournaments.length / limit);
      const currentPage = clamp(page, 1, pages);

      setTotalPages(pages);
      setPage(currentPage);
    }

    const fetchTournaments = () => {
        fetchHandler(
            'tournaments?limit=100000000',
            setTournaments,
            () => null,
            (error) => console.error(error)
        )
    }


    const deleteTournament = (event, tournament) =>{
        event.preventDefault();
        fetch(`${API_URL}tournaments/${tournament?._id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
          },
        })
        .then(() => setTournaments(tournaments.filter(t => t._id !== tournament._id)))
        .catch((error) => console.error(error));
    }

    useEffect(fetchTournaments, []);
    useEffect(() => {
      resetPaginateData()
    }, [tournaments])

    useEffect(() => {
      setPaginatedTournament(paginateData(tournaments, limit, page));
    }, [page, tournaments, totalPages])


  return (
    <div className={styles.page}>
      <div className={styles.tournamentsContainer}>
        <div className={styles.mainDiv}>
          {paginatedTournaments.map((obj, index) => {
            return (
              <MapTournament 
                key={obj['_id']} 
                tournament={obj} 
                deleteTournament={deleteTournament}
              />
            );
          })}
        </div>
      </div>
      <div>
        <Pagination 
          currentPage={page}
          setCurrentPage={setPage}
          pages={totalPages}
        />
      </div>
    </div>
  );

};

export default AllTournamentsPage;
