import { useEffect, useState } from 'react';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Tournament.module.css';
import MapTournament from './MapTournament';

const AllTournaments = () => {
  const [arrayTournaments, setArrayTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tournaments?page=${currentPage}&limit=8`)
      .then((data) => data.json())
      .then((data) => setArrayTournaments(data));
  }, [currentPage]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tournaments?page=1&limit=1000000`)
      .then((data) => data.json())
      .then((data) => setTotalPage(Math.ceil(data.length / 8)));
  }, []);


  function deleteTournament(event, tournament) {
    event.preventDefault();
    fetch(`http://localhost:5000/api/tournaments/${tournament?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    .then(() => setArrayTournaments(arrayTournaments.filter(t => t._id !== tournament._id)))
    .catch((error) => console.error(error));
  }


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
        <button
          className={styles.buttons}
          onClick={() => {
            return setCurrentPage(1);
          }}
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          className={styles.buttons}
          onClick={() => {
            if (currentPage - 1 > 0) {
              return setCurrentPage(currentPage - 1);
            }
          }}
        >
          Предыдущая
        </button>
        <button
          className={styles.buttons}
          onClick={() => {
            if (currentPage + 1 <= totalPage) {
              return setCurrentPage(currentPage + 1);
            }
          }}
        >
          Следующая
        </button>
        <button
          className={styles.buttons}
          onClick={() => {
            return setCurrentPage(totalPage);
          }}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );

};

export default AllTournaments;
