import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import picture from '../pictures/shashki.jpeg';
import styles from './Tournament.module.css';
import Tour from './Tour';
import stylesGame from './Game.module.css';
import stylesT from './Tournament.module.css';

const TournamentGames = ({ data }) => {
  const [objTournament, setObjTournament] = useState({});
  const [arrayOfGamesFirst, setArrayOfGamesFirst] = useState([]);
  const [page, setPage] = useState(0);
  const [tourArray, setTourArray] = useState([]);
  const [rechange, setRechange] = useState(false); // Нужно для того, в useEffect заново отправлять запрос на тур при изменение результата игры
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/tournaments/${params['tournamentSlug']}`) // получаю данные турнира
      .then((response) => response.json())
      .then((data) => setObjTournament(data));
    // .then(() => console.log('arrayTournaments', arrayTournaments));
  }, []);

  useEffect(() => {
    // Если есть id турнира
    if (objTournament?._id) {
      fetch(
        `http://localhost:5000/api/games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры
      )
        .then((response) => response.json())
        .then((games) => setTourArray(games))
        .catch((error) => console.log(error));
    }
  }, [page, rechange]);

  async function startTournament() {
    try {
      await fetch(
        `http://localhost:5000/api/tournaments/start/${objTournament['_id']}`, // Запрос на старт турнира
        { method: 'PUT' }
      );
      const gamesResponse = await fetch(
        `http://localhost:5000/api/games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры
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
        `http://localhost:5000/api/games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры
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
        `http://localhost:5000/api/tournaments/finish-tour/${objTournament['_id']}`, // Запрос на окончание тура
        { method: 'PUT' }
      );
      const gamesResponse = await fetch(
        `http://localhost:5000/api/games?tournamentID=${objTournament['_id']}` // Запрос на получение всех туров, внутри которых игры. Но тут туры добавляются по мере завершения предыдущего тура. Короче, просто обычно получаю массив туров и все, там уже будет следуюий тур.
      );
      const games = await gamesResponse.json();

      setTourArray(games);
      console.log('games', games);
      // const serverResponse = await fetch(
      //   `http://localhost:5000/api/tournaments/finish-tour/${objTournament['_id']}`,
      //   { method: 'PUT' }
      // );
      // const nextTour = await serverResponse.json();
      // console.log(
      //   'nextTour proverka na mass',
      //   nextTour['gamesIDs'][nextTour['gamesIDs'].length - 1]
      // );
      // setTourArray([
      //   ...tourArray,
      //   nextTour['gamesIDs'][nextTour['gamesIDs'].length - 1],
      // ]);
      // console.log('Тур завершен');
      // console.log('next-tour', nextTour);
    } catch (error) {
      console.log(error);
    }
  }

  async function finishTournament() {
    try {
      await fetch(
        `http://localhost:5000/api/tournaments/finish/${objTournament['_id']}`, // Запрос на окончание турнира
        { method: 'PUT' }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function resetTournament() {
    try {
      await fetch(`http://localhost:5000/api/games`, { method: 'DELETE' });
      await fetch(`http://localhost:5000/api/player-stats`, {
        method: 'DELETE',
      });

      let tournament = await fetch(
        `http://localhost:5000/api/tournaments/${params['tournamentSlug']}`,
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

// const TournamentGames = ({ data }) => {
//   const [arrayTournaments, setArrayTournaments] = useState({});
//   const params = useParams();
//   const [starterGame, setStarterGame] = useState({});
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/tournaments/${params['tournamentSlug']}`)
//       .then((response) => response.json())
//       .then((data) => setArrayTournaments(data))
//       .then(() => console.log('arrayTournaments', arrayTournaments));
//   }, []);

//   // useEffect(() => {
//   //   fetch(
//   //     `http://localhost:5000/api/tournaments/start/${params['tournamentSlug']}`,
//   //     {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json;charset=utf-8',
//   //       },
//   //       body: JSON.stringify(arrayTournaments),
//   //     }
//   //   )
//   //     .then((response) =>
//   //       response.ok ? response.json() : Promise.reject(response)
//   //     )
//   //     .then((data) => console.log(data))
//   //     .catch((error) =>
//   //       error.json().then((errorData) => console.error(errorData))
//   //     );
//   //   // fetch(
//   //   //   `http://localhost:5000/api/tournaments/start/${params['tournamentSlug']}`
//   //   // )
//   //   //   .then((response) => response.json())
//   //   //   .then((data) => console.log(data));
//   // }, []);
//   console.log('params 1', params);
//   console.log('arrayTournaments 1', arrayTournaments);

//   function handleSub() {
//     console.log('arrayTournaments', arrayTournaments);
//     fetch(
//       `http://localhost:5000/api/tournaments/start/${params['tournamentSlug']}`,
//       {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify(arrayTournaments),
//       }
//     )
//       .then((response) =>
//         response.ok ? response.json() : Promise.reject(response)
//       )
//       .then((data) => setStarterGame(data))
//       .then(() => console.log('starterGame', starterGame))
//       .then(() => console.log('arrayTournaments 2', arrayTournaments))
//       .catch((error) =>
//         error.json().then((errorData) => console.error(errorData))
//       );
//   }

//   function handleSubsing() {
//     fetch(
//       `http://localhost:5000/api/games?tournamentID=${params['tournamentSlug']}`
//     )
//       .then((response) => response.json())
//       .then((data) => setStarterGame(data))
//       .then((data) => console.log('startedGame', starterGame));
//   }

//   return (
//     <>
//       {' '}
//       {starterGame.length ? (
//         starterGame.map((obj) => {
//           return <h1 key={obj[0]['_id']}>{obj[0]['_id']}</h1>;
//         })
//       ) : (
//         <>
//           {' '}
//           <button onClick={handleSub}>Старт турнира</button>
//           <button onClick={handleSubsing}>Генерация туров</button>
//         </>
//       )}
//       {/* <button onClick={handleSub}>Начать генерацию</button>
//       <button onClick={handleSubsing}>Вывод</button> */}
//     </>
//   );
// };
// export default TournamentGames;
