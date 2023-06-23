import SelectedPlayers from './SelectedPlayers';
import { useState, useEffect } from 'react';
import Poisk from './Poisk';
import styles from './styles/CreateTournament.module.css';
import { useNavigate } from 'react-router-dom';

const CreateTournament = () => {
  const [arrayOfPlay, setArrayOfPlay] = useState([]);
  useEffect(() => {
    // fetch('http://localhost:5000/api/players') // Работало
    fetch('http://localhost:5000/api/players?page=1&limit=100')
      .then((response) => response.json())
      .then((data) => setArrayOfPlay(data))
      .then(() => console.log(arrayOfPlay));
  }, []);
  // const [userName, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const [data, setData] = useState({
    title: '',
    mainReferee: '',
    mainSecretary: '',
    country: '',
    region: '',
    city: '',
    tournamentSystem: '',
    startDate: '',
    endDate: '',
    playersIDs: [],
    referees: [],
  });
  const [player, setPlayer] = useState('');
  const [playersssss, setPlayersssss] = useState(''); // Массив id игроков в турнире
  const [created, setCreated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  function createdchtoto() {
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 5000);
  }

  console.log(arrayOfPlay);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(data.playersIDs);
    console.log(JSON.stringify(data));

    fetch('http://localhost:5000/api/tournaments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => {
        createdchtoto();
        console.log(data);
        navigate(`../Tournament/${data?.['_id']}`);
      })
      .then((_) => {
        setData({
          title: '',
          mainReferee: '',
          mainSecretary: '',
          country: '',
          region: '',
          city: '',
          tournamentSystem: '',
          startDate: '',
          endDate: '',
          playersIDs: [],
          referees: [],
        });
      })
      .catch((error) =>
        error.json().then((errorData) => {
          setError(errorData.name);
          setCreated('error');
          setTimeout(() => {
            setCreated(false);
          }, 5000);
          console.error(errorData);
        })
      );
  }
  return (
    <div className="qwert">
      {created === true ? (
        <div>
          <div className={styles.push}>Турнир успешно зарегистрирован</div>
        </div>
      ) : (
        ''
      )}
      {created === 'error' ? (
        <div>
          <div className={styles.error}>{error}</div>
        </div>
      ) : (
        ''
      )}
      <h1>Создать турнир</h1>
      <form className="blockInput" onSubmit={handleFormSubmit}>
        <label className={styles.labelText} htmlFor="username">
          Введите название турнира:
        </label>
        <br></br>
        <input
          placeholder="Весенние игры"
          type="text"
          value={data.title}
          name="username"
          id="username"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="referi">
          Введите ФИО судьи турнира:
        </label>
        <br></br>
        <input
          placeholder="Иванов Петр Сергеевич"
          type="text"
          value={data.mainReferee}
          name="password"
          id="referi"
          onChange={(e) => setData({ ...data, mainReferee: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="secretary">
          Введите ФИО секретаря турнира:
        </label>
        <br></br>
        <input
          placeholder="Сергеев Иван Петрович"
          type="text"
          value={data.mainSecretary}
          name="password"
          id="secretary"
          onChange={(e) => setData({ ...data, mainSecretary: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="country">
          Введите название страны:
        </label>
        <br></br>
        <input
          placeholder="Россия"
          type="text"
          value={data.country}
          name="username"
          id="country"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setData({ ...data, country: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="region">
          Введите название региона:
        </label>
        <br></br>
        <input
          placeholder="Крым"
          type="text"
          value={data.region}
          name="username"
          id="region"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setData({ ...data, region: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="city">
          Введите название города:
        </label>
        <br></br>
        <input
          placeholder="Севастополь"
          type="text"
          value={data.city}
          name="username"
          id="city"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setData({ ...data, city: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="select">
          Введите тип сетки:
        </label>
        <br></br>
        <select
          name="changeType"
          id="select"
          className={styles.inputText}
          onChange={(e) =>
            setData({ ...data, tournamentSystem: e.target.value })
          }
        >
          <option value="">Выберите тип сетки</option>
          <option value="Круговая">Круговая система</option>
          <option value="Швейцарская">Швейцарская система</option>
        </select>
        <br></br>
        {/* {data.tournamentSystem == 'swiss' ? (
          <>
            <label htmlFor="rounds" className={styles.labelText}>
              Введите количество раундов
            </label>
            <br></br>
            <input
              placeholder="5"
              type="number"
              value={data.rounds}
              name="username"
              id="rounds"
              // onChange={(e) => setUsername(e.target.value)}
              onChange={(e) => setData({ ...data, rounds: e.target.value })}
              className={styles.inputText}
            />
          </>
        ) : (
          ''
        )} */}
        <br></br>
        <label className={styles.labelText} htmlFor="startDate">
          Выберите дату начала турнира:
        </label>
        <br></br>
        <input
          type="date"
          // value={password}
          // name="password"
          id="startDate"
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="endDate">
          Выберите дату окончания турнира:
        </label>
        <br></br>
        <input
          type="date"
          // value={password}
          // name="password"
          id="endDate"
          onChange={(e) => setData({ ...data, endDate: e.target.value })}
          className={styles.inputText}
        />
        <br></br>
        {/* Старое добавление игроков */}
        {/* <label className={styles.labelText} htmlFor="dateOfEnd">
          Добавить игроков:
        </label>
        <br></br>
        <input
          placeholder="Введите id игрока и нажмите кнопку Добавить"
          type="number"
          value={player}
          // name="password"
          id="dateOfEnd"
          onChange={(e) => setPlayer(e.target.value)}
          className={styles.inputText}
        /> */}
        {/*  */}
        {/* <label className={styles.labelText} htmlFor="playersssss">
          Добавить игроков:
        </label>
        <br></br>
        <select
          name="changeType"
          id="playersssss"
          className={styles.inputText}
          onChange={(e) =>
            setData({
              ...data,
              playersIDs: [...data.playersIDs, e.target.value],
            })
          }
        >
          <option value="">Выберите игроков</option>
          {arrayOfPlay.map((objOfPlay) => {
            if (!data.playersIDs.includes(objOfPlay['_id'])) {
              return (
                <option key={objOfPlay['_id']} value={objOfPlay['_id']}>
                  {`${objOfPlay['lastName']} ${objOfPlay['firstName']} ${objOfPlay['middleName']}, ${objOfPlay['sportsCategoryAbbr']}`}
                </option>
              );
            }
          })}
        </select> */}
        {/*  */}
        {/* Новый поиск */}
        <Poisk arrayOfPlay={arrayOfPlay} data={data} setData={setData} />{' '}
        <br></br>
        {/* Вывожу список зареганных на турнир игроков */}
        {data.playersIDs.length > 0 ? 'Участники:' : ''}
        <br></br>
        {data.playersIDs.length > 0
          ? data.playersIDs.map((id, index) => {
              let searchObj = arrayOfPlay.find((play) => play['_id'] === id);
              return (
                <div
                  key={id}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgb(230, 231, 231)',
                      // display: 'block',
                      padding: '5px',
                      borderRadius: '5px',
                      fontFamily: 'Raleway',
                      margin: '5px',
                      // width: '400px',
                    }}
                    // key={id}
                  >{`${index + 1}. ${searchObj['lastName']} ${
                    searchObj['firstName']
                  } ${searchObj['middleName']}, ${
                    searchObj['sportsCategoryAbbr']
                  }`}</div>
                </div>
              );
            })
          : ''}
        <button className={styles.createButton} type="submit">
          Создать Турнир
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;

// import SelectedPlayers from './SelectedPlayers';
// import { useState, useEffect } from 'react';
// import styles from './styles/CreateTournament.module.css';

// const CreateTournament = () => {
//   const [arrayOfPlay, setArrayOfPlay] = useState([]);
//   useEffect(() => {
//     fetch('http://localhost:5000/api/players')
//       .then((response) => response.json())
//       .then((data) => setArrayOfPlay(data))
//       .then(() => console.log(arrayOfPlay));
//   }, []);
//   // const [userName, setUsername] = useState('');
//   // const [password, setPassword] = useState('');

//   const [data, setData] = useState({
//     nameOfTournament: '',
//     referiFio: '',
//     secretaryFio: '',
//     country: '',
//     region: '',
//     city: '',
//     typeOfBracket: '',
//     dateOfStart: '',
//     dateOfEnd: '',
//     arrayOfPlayers: [],
//     rounds: '',
//   });
//   const [player, setPlayer] = useState('');

//   function handleFormSubmit(event) {
//     event.preventDefault();

//     // const userData = {
//     //   username: userName,
//     //   password: password,
//     // };
//     // console.log(userData);
//     console.log(JSON.stringify(data));

//     //   fetch('http://localhost:5000/tournaments', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json;charset=utf-8',
//     //   },
//     //   body: JSON.stringify(data),
//     // })
//     //   .then((response) =>
//     //     response.ok ? response.json() : Promise.reject(response)
//     //   )
//     //   .then((data) => console.log(data))
//     //   .catch((error) =>
//     //     error.json().then((errorData) => console.error(errorData))
//     //   );
//   }
//   return (
//     <div className="qwert">
//       <h1>Создать турнир</h1>
//       <form className="blockInput" onSubmit={handleFormSubmit}>
//         <label className={styles.labelText} htmlFor="username">
//           Введите название турнира:
//         </label>
//         <br></br>
//         <input
//           placeholder="Весенние игры"
//           type="text"
//           value={data.nameOfTournament}
//           name="username"
//           id="username"
//           // onChange={(e) => setUsername(e.target.value)}
//           onChange={(e) =>
//             setData({ ...data, nameOfTournament: e.target.value })
//           }
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="referi">
//           Введите ФИО судьи турнира:
//         </label>
//         <br></br>

//         <input
//           placeholder="Иванов Петр Сергеевич"
//           type="text"
//           value={data.referiFio}
//           name="password"
//           id="referi"
//           onChange={(e) => setData({ ...data, referiFio: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="secretary">
//           Введите ФИО секретаря турнира:
//         </label>
//         <br></br>

//         <input
//           placeholder="Сергеев Иван Петрович"
//           type="text"
//           value={data.secretaryFio}
//           name="password"
//           id="secretary"
//           onChange={(e) => setData({ ...data, secretaryFio: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="country">
//           Введите название страны:
//         </label>
//         <br></br>
//         <input
//           placeholder="Россия"
//           type="text"
//           value={data.country}
//           name="username"
//           id="country"
//           // onChange={(e) => setUsername(e.target.value)}
//           onChange={(e) => setData({ ...data, country: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="region">
//           Введите название региона:
//         </label>
//         <br></br>
//         <input
//           placeholder="Крым"
//           type="text"
//           value={data.region}
//           name="username"
//           id="region"
//           // onChange={(e) => setUsername(e.target.value)}
//           onChange={(e) => setData({ ...data, region: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="city">
//           Введите название города:
//         </label>
//         <br></br>
//         <input
//           placeholder="Севастополь"
//           type="text"
//           value={data.city}
//           name="username"
//           id="city"
//           // onChange={(e) => setUsername(e.target.value)}
//           onChange={(e) => setData({ ...data, city: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="select">
//           Введите тип сетки:
//         </label>
//         <br></br>
//         <select
//           name="changeType"
//           id="select"
//           className={styles.inputText}
//           onChange={(e) => setData({ ...data, typeOfBracket: e.target.value })}
//         >
//           <option value="">Выберите тип сетки</option>
//           <option value="round">Круговая система</option>
//           <option value="swiss">Швейцарская система</option>
//         </select>
//         <br></br>
//         {data.typeOfBracket == 'swiss' ? (
//           <>
//             <label htmlFor="rounds" className={styles.labelText}>
//               Введите количество раундов
//             </label>
//             <br></br>
//             <input
//               placeholder="5"
//               type="number"
//               value={data.rounds}
//               name="username"
//               id="rounds"
//               // onChange={(e) => setUsername(e.target.value)}
//               onChange={(e) => setData({ ...data, rounds: e.target.value })}
//               className={styles.inputText}
//             />
//           </>
//         ) : (
//           ''
//         )}
//         <br></br>

//         <label className={styles.labelText} htmlFor="dateOfStart">
//           Выберите дату начала турнира:
//         </label>
//         <br></br>
//         <input
//           type="date"
//           // value={password}
//           // name="password"
//           id="dateOfStart"
//           onChange={(e) => setData({ ...data, dateOfStart: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="dateOfEnd">
//           Выберите дату окончания турнира:
//         </label>
//         <br></br>
//         <input
//           type="date"
//           // value={password}
//           // name="password"
//           id="dateOfEnd"
//           onChange={(e) => setData({ ...data, dateOfEnd: e.target.value })}
//           className={styles.inputText}
//         />
//         <br></br>

//         <label className={styles.labelText} htmlFor="dateOfEnd">
//           Добавить игроков:
//         </label>
//         <br></br>
//         <input
//           placeholder="Введите id игрока и нажмите кнопку Добавить"
//           type="number"
//           value={player}
//           // name="password"
//           id="dateOfEnd"
//           onChange={(e) => setPlayer(e.target.value)}
//           className={styles.inputText}
//         />
//         <br></br>

//         <div
//           onClick={() => {
//             setData({
//               ...data,
//               arrayOfPlayers: [...data.arrayOfPlayers, player],
//             });
//             setPlayer('');
//           }}
//           className={styles.divOfPlayer}
//         >
//           Добавить
//         </div>
//         <br></br>

//         {data.arrayOfPlayers.map((id) => {
//           return <div key={id}>{id}</div>;
//         })}

//         {/* <SelectedPlayers array={data.arrayOfPlayers} /> */}
//         <br></br>
//         <label className={styles.labelText} htmlFor="play">
//           Выберите игроков:
//         </label>
//         <br></br>
//         <select
//           name="changeType"
//           id="play"
//           className={styles.inputText}
//           onChange={(e) => setData({ ...data, play: e.target.value })}
//         >
//           <option value="">Выберите тип сетки</option>
//           {arrayOfPlay.map((objOfPlay) => {
//             return (
//               <option key={objOfPlay['_id']} value={objOfPlay['_id']}>
//                 {`${objOfPlay['lastName']} ${objOfPlay['firstName']} ${objOfPlay['middleName']}`}
//               </option>
//             );
//           })}

//           <option value="round">Круговая система</option>
//           <option value="swiss">Швейцарская система</option>
//         </select>
//         <br></br>

//         <button className={styles.createButton} type="submit">
//           Создать Турнир
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTournament;
