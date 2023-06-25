import {
  MdLocationOn,
  MdPerson,
  MdDeleteForever,
} from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import picture from '../pictures/shashki.jpeg';
import styles from './Tournament.module.css';
import { formatDate } from '../utils/utils';

const MapTournament = ({ tournament, deleteTournament }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={styles.link}
      to={`Tournament/${tournament?._id}`} // либо просто {data['_id']}
      key={tournament?._id}
      style={{ position: 'relative' }}
    >
      <div className={styles.outer}>
        {hover ? 
        (
          <MdDeleteForever
            className={styles.deleteButton}
            onClick={(e) => deleteTournament(e, tournament)}
          />
        ) : (
          ''
        )}
        <div className={styles.innerMain}>
          <img className={styles.image} src={picture}></img>
          <div>
            <span className={styles.title}>{tournament?.title}</span>
            <span className={styles.more}>
              <MdLocationOn />
              {tournament?.city}, {tournament?.region}, {tournament?.country}
            </span>
            <span className={styles.more}>
              <MdPerson></MdPerson> Главный судья: {tournament?.mainReferee}
            </span>
          </div>
        </div>
        <div className={styles.innerEnd}>
          <span className={styles.more}>
            C {formatDate(tournament?.startDate)} по {formatDate(tournament?.endDate)}
          </span>
          <span className={styles.more}>{tournament?.tournamentSystem} система</span>
        </div>
      </div>
    </Link>
  );
};

export default MapTournament;
