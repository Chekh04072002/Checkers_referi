import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import picture from '../pictures/shashki.jpeg';
import styles from './tournaments/Tournament.module.css';
import TournamentPlayers from './TournamentPlayers';
import { formatDate } from '../utils/utils';
import { API_URL } from '../config';

const Tournament = ({ data }) => {
  const [tournament, setTournament] = useState({});
  const [tournamentPlayers, setTournamentPlayers] = useState([]);
  let arrof = [];
  const params = useParams();
  useEffect(() => {
    fetch(`${API_URL}tournaments/${params['tournamentSlug']}`)
      .then((response) => response.json())
      .then((data) => setTournament(data));
  }, []);
  // console.log(params);
  console.log(tournament);

  useEffect(() => {
    if (tournament['playersIDs']) {
      for (let i = 0; i < tournament['playersIDs'].length; i++) {
        fetch(
          `${API_URL}players/${tournament['playersIDs'][i]}`
        )
          .then((response) => response.json())
          .then(
            (data) => arrof.push(data)
            // setTournamentPlayers([...tournamentPlayers, data['_id']])
          );
      }
    }
  });
  console.log('arr', arrof);

  return (
    <div className={styles.AllOuter}>
      <div className={styles.outerOfTournament}>
        <div className={styles.info}>
          <span className={styles.right}>Название турнира:</span>{' '}
          <span className={styles.right}>{tournament['title']}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Главный судья:</span>{' '}
          <span className={styles.right}>{tournament['mainReferee']}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Судьи:</span>{' '}
          <span className={styles.right}>
            {/* {tournament['referees'].length} */}
            {/* {tournament['referees'].map((referi) => `${referi}, `)} */}

            {tournament['referees']
              ? tournament['referees'].length > 0
                ? tournament['referees'].map((referi) => `${referi}, `)
                : 'Судьи не указаны'
              : 'Судьи не указаны'}

            {/* {tournament['referees']
              ? tournament['referees'].map((referi) => `${referi}, `)
              : 'Идет загрузка'} */}
          </span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Главный секретарь:</span>{' '}
          <span className={styles.right}>{tournament['mainSecretary']}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Город проведения:</span>{' '}
          <span className={styles.right}>{tournament['city']}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Регион проведения:</span>{' '}
          <span className={styles.right}>{tournament['region']}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Страна проведения:</span>{' '}
          <span className={styles.right}>{tournament['country']}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Дата начала:</span>{' '}
          <span className={styles.right}>{formatDate(tournament?.startDate)}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Дата окончания:</span>{' '}
          <span className={styles.right}>{formatDate(tournament?.endDate)}</span>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <span className={styles.right}>Страна проведения:</span>{' '}
          <span className={styles.right}>{tournament['country']}</span>
        </div>
        <hr></hr>
        <div className={styles.infoPlayer}>
          <span className={styles.right}>Фамилии игроков:</span>{' '}
          <div className={styles.players}>
            {tournament['playersIDs']
              ? tournament['playersIDs'].length > 0
                ? tournament['playersIDs'].map((id) => {
                    return <TournamentPlayers key={id} id={id} />;
                  })
                : ''
              : ''}
            {/* {tournament['playersIDs'].length} */}
            {/* {arrof.map((obj) => {
              return ;
            })} */}
          </div>
        </div>
        {/* <hr></hr> */}
      </div>
    </div>
  );
};
export default Tournament;
