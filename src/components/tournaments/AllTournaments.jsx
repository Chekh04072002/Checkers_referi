import { useEffect, useState } from 'react';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from '../Tournament.module.css';
import MapTournament from '../MapTournament';
import { API_URL } from "../../config";
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../UI/Pagination';


const AllTournaments = () => {
  const [arrayTournaments, setArrayTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    fetch(`${API_URL}tournaments?page=${currentPage}&limit=8`)
      .then((data) => data.json())
      .then((data) => setArrayTournaments(data));
  }, [currentPage]);

  useEffect(() => {
    fetch(`${API_URL}tournaments?page=1&limit=1000000`)
      .then((data) => data.json())
      .then((data) => setTotalPage(Math.ceil(data.length / 8)));
  }, []);


  const deleteTournament = (event, tournament) =>{
    event.preventDefault();
    fetch(`${API_URL}tournaments/${tournament?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    .then(() => setArrayTournaments(arrayTournaments.filter(t => t._id !== tournament._id)))
    .catch((error) => console.error(error));
  }

  //TODO переделать
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className={styles.mainDiv}>
          {arrayTournaments.map((obj, index) => {
            return (
              <MapTournament 
                key={obj['_id']} 
                tournament={arrayTournaments[index]} 
                deleteTournament={deleteTournament}
              />
            );
          })}
        </div>
      </div>
      <div>
        <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={totalPage}
        />
        {/* {
            currentPage > 1
            ?<Button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              color="blue"
            ><FontAwesomeIcon icon={faChevronLeft} /></Button>
            : null
        }
        {
            currentPage < totalPage
            ?<Button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              color="blue"
            ><FontAwesomeIcon icon={faChevronRight} /></Button>
            :null
        } */}

      </div>
    </div>
  );

};

export default AllTournaments;
