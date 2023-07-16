import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import picture from '../pictures/shashki.jpeg';
import styles from './tournaments/Tournament.module.css';
import Tour from './Tour';
import stylesGame from './Game.module.css';
import stylesT from './tournaments/Tournament.module.css';
import { API_URL } from '../config';

const TournamentGames = ({ data }) => {
  const [objTournament, setObjTournament] = useState({});
  const [arrayOfGamesFirst, setArrayOfGamesFirst] = useState([]);
  const [page, setPage] = useState(0);
  const [tourArray, setTourArray] = useState([]);
  const [rechange, setRechange] = useState(false); // Нужно для того, в useEffect заново отправлять запрос на тур при изменение результата игры
  const params = useParams();
  useEffect(() => {
    fetch(`${API_URL}tournaments/${params['tournamentSlug']}`) // получаю данные турнира
      .then((response) => response.json())
      .then((data) => setObjTournament(data));
    // .then(() => console.log('arrayTournaments', arrayTournaments));
  }, []);

  useEffect(() => {
    // Если есть id турнира
    if (objTournament?._id) {
      fetch(
        `${API_URL}games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры
      )
        .then((response) => response.json())
        .then((games) => setTourArray(games))
        .catch((error) => console.log(error));
    }
  }, [page, rechange]);

  async function startTournament() {
    try {
      await fetch(
        `${API_URL}tournaments/start/${objTournament['_id']}`, // Запрос на старт турнира
        { method: 'PUT' }
      );
      const gamesResponse = await fetch(
        `${API_URL}games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры
      );
      const games = await gamesResponse.json();

      setTourArray(games);
      console.log('games', games);
    } catch (error) {
      console.log(error);
    }
  }

  async function resumeTournament() {
    try {
      const gamesResponse = await fetch(
        `${API_URL}games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры
      );
      const games = await gamesResponse.json();

      setTourArray(games);
      console.log('games', games);
    } catch (error) {
      console.log(error);
    }
  }

  async function finishTour() {
    try {
      await fetch(
        `${API_URL}tournaments/finish-tour/${objTournament['_id']}`, // Запрос на окончание тура
        { method: 'PUT' }
      );
      const gamesResponse = await fetch(
        `${API_URL}games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры. Но тут туры добавляются по мере завершения предыдущего тура. Короче, просто обычно получаю массив туров и все, там уже будет следуюий тур.
      );
      const games = await gamesResponse.json();

      setTourArray(games);
      console.log('games', games);
    } catch (error) {
      console.log(error);
    }
  }

  async function finishTournament() {
    try {
      await fetch(
        `${API_URL}tournaments/finish/${objTournament['_id']}`, // Запрос на окончание турнира
        { method: 'PUT' }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function resetTournament() {
    try {
      await fetch(`${API_URL}games`, { method: 'DELETE' });
      await fetch(`${API_URL}player-stats`, {
        method: 'DELETE',
      });

      let tournament = await fetch(
        `${API_URL}tournaments/${params['tournamentSlug']}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            isStarted: false,
            isFinished: false,
            gamesIDs: [],
            playersStatsIDs: [],
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {tourArray.length > 0 ? (
        ''
      ) : objTournament['isStarted'] ? (
        <button className={styles.butStart} onClick={resumeTournament}>
          Возобновить турнир
        </button>
      ) : (
        <button className={styles.butStart} onClick={startTournament}>
          Старт турнира
        </button>
      )}
      {/* <button className={styles.butStart} onClick={startTournament}>
        Старт турнира
      </button> */}
      {/* {console.log('tourArray', tourArray)} */}
      {/* {tourArray.map((tour, index) => {
        return (
          <div className={stylesGame.outerDivGame} key={index}>
            <Tour games={tour} />
            <br />
          </div>
        );
      })} */}

      {tourArray.length > 0 ? (
        <>
          <span className={stylesGame.tour}>{`Тур ${page + 1}`}</span>
          <div className={stylesGame.outerDivGame}>
            {
              <Tour
                games={tourArray[page]}
                rechange={rechange}
                setRechange={setRechange}
              />
            }
            {/* {console.log(tourArray)} */}
          </div>
          {console.log('objTournament', objTournament)}
          {objTournament.tournamentSystem == 'Швейцарская' ? (
            <button className={styles.butStart} onClick={finishTour}>
              Завершить тур
            </button>
          ) : (
            ''
          )}
          <button
            className={stylesT.buttons}
            onClick={() => {
              if (page - 1 >= 0) {
                return setPage(page - 1);
              }
            }}
          >
            Предыдущая
          </button>
          <button
            className={stylesT.buttons}
            onClick={() => {
              if (page + 1 <= tourArray.length - 1) {
                return setPage(page + 1);
              }
            }}
          >
            Следующая
          </button>
        </>
      ) : (
        ''
      )}
      {page + 1 == tourArray.length ? (
        <button onClick={finishTournament} className={stylesT.buttonsEnd}>
          Завершить турнир
        </button>
      ) : (
        ''
      )}
      <button onClick={resetTournament} className={stylesT.buttonsEnd}>
        Reset
      </button>
    </div>
  );
};
export default TournamentGames;
