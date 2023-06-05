import { MdLocationOn, MdAccessTime, MdPerson } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import picture from '../pictures/shashki.jpeg';
import styles from './Tournament.module.css';

const MapTournament = ({ data }) => {
  const [arrayTournaments, setArrayTournaments] = useState([]);
  //   console.log(data);

  return (
    <Link
      className={styles.link}
      to={`Tournament/${data['_id']}`} // либо просто {data['_id']}
      key={data['_id']}
    >
      <div className={styles.outer}>
        <div className={styles.innerMain}>
          <img className={styles.image} src={picture}></img>
          <div>
            <span className={styles.title}>{data.title}</span>
            <span className={styles.more}>
              <MdLocationOn />
              {data.city}, {data.region}, {data.country}
            </span>
            <span className={styles.more}>
              <MdPerson></MdPerson> Главный судья: {data.mainReferee}
            </span>
          </div>
        </div>
        {/* <hr></hr> */}
        <div className={styles.innerEnd}>
          <span className={styles.more}>
            {/* <MdAccessTime /> */}C {data.startDate} по {data.endDate}
          </span>
          <span className={styles.more}>{data.tournamentSystem} система</span>
        </div>
      </div>
    </Link>
  );

  //   return (
  //     <div className={styles.outer}>
  //       <div className={styles.innerMain}>
  //         <img
  //           style={{ height: '75px', width: '75px', borderRadius: '100%' }}
  //           src={picture}
  //         ></img>
  //         <Link to={data['_id']} key={data['_id']}>
  //           {data.title}
  //         </Link>
  //       </div>
  //       <div className={styles.innerEnd}>
  //         <h5>qweeqe</h5>
  //         <h5>zfsdfsf</h5>
  //       </div>
  //     </div>
  //   );
  // return <h1>AllTournaments</h1>;
};

export default MapTournament;
