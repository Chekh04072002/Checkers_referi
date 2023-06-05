import { useEffect, useState } from 'react';
import styles from './styles/CreateTournament.module.css';

const RegistrationPlayer = () => {
  // const [userName, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const [data, setData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    region: '',
    birthday: '',
    sportsOrganization: '',
    gender: '',
    sportsCategoryID: '',
    currentAdamovichRank: '',
  });
  const [player, setPlayer] = useState('');
  const [arrayOfCategories, setArrayOfCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sports-categories')
      .then((response) => response.json())
      .then((data) => setArrayOfCategories(data));
    // .then(() => console.log(arrayOfCategories[1]['_id']));
  }, []);

  // fetch('http://localhost:5000/api/sports-categories')
  //   .then((response) => response.json())
  //   .then((data) => setArrayOfCategories(data));

  function handleFormSubmit(event) {
    event.preventDefault();

    // const userData = {
    //   username: userName,
    //   password: password,
    // };
    // console.log(userData);
    console.log(JSON.stringify(data));

    fetch('http://localhost:5000/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => console.log(data))
      .catch((error) =>
        error.json().then((errorData) => console.error(errorData))
      );
  }
  return (
    <div className="qwert">
      <h1>Регистрация игрока</h1>
      <form className="blockInput" onSubmit={handleFormSubmit}>
        <label className={styles.labelText} htmlFor="firstName">
          Введите имя игрока:
        </label>
        <br></br>
        <input
          placeholder="Иван"
          type="text"
          value={data.firstName}
          name="username"
          id="firstName"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className={styles.inputText}
        />
        <br></br>

        <label className={styles.labelText} htmlFor="middleName">
          Введите отчество игрока:
        </label>
        <br></br>

        <input
          placeholder="Сергеевич"
          type="text"
          value={data.middleName}
          name="password"
          id="middleName"
          onChange={(e) => setData({ ...data, middleName: e.target.value })}
          className={styles.inputText}
        />
        <br></br>

        <label className={styles.labelText} htmlFor="lastName">
          Введите фамилию игрока:
        </label>
        <br></br>

        <input
          placeholder="Петров"
          type="text"
          value={data.lastName}
          name="password"
          id="lastName"
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className={styles.inputText}
        />
        <br></br>

        <label className={styles.labelText} htmlFor="gender">
          Выберите пол игрока:
        </label>
        <br></br>
        <select
          name="changeType"
          id="gender"
          className={styles.inputText}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option value="">Выберите пол игрока</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
        <br></br>

        <label className={styles.labelText} htmlFor="region">
          Введите название города:
        </label>
        <br></br>
        <input
          placeholder="Севастополь"
          type="text"
          value={data.region}
          name="username"
          id="region"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setData({ ...data, region: e.target.value })}
          className={styles.inputText}
        />
        <br></br>

        <label className={styles.labelText} htmlFor="birthday">
          Выберите дату рождения игрока:
        </label>
        <br></br>
        <input
          type="date"
          // value={password}
          // name="password"
          id="birthday"
          onChange={(e) => setData({ ...data, birthday: e.target.value })}
          className={styles.inputText}
        />
        <br></br>

        <label className={styles.labelText} htmlFor="sportsCategoryID">
          Выберите спортивную категорию:
        </label>
        <br></br>
        <select
          name="changeType"
          id="sportsCategoryID"
          className={styles.inputText}
          onChange={(e) =>
            setData({ ...data, sportsCategoryID: e.target.value })
          }
        >
          <option value="">Выберите спортивную категорию</option>
          {arrayOfCategories.map((objOfCategory) => {
            return (
              <option key={objOfCategory['_id']} value={objOfCategory['_id']}>
                {objOfCategory['title']}
              </option>
            );
          })}
          {/* <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option> */}
        </select>
        <br></br>

        <label className={styles.labelText} htmlFor="sportsOrganization">
          Введите название спортивной организации:
        </label>
        <br></br>
        <input
          placeholder="Сатурн"
          type="text"
          value={data.sportsOrganization}
          name="username"
          id="sportsOrganization"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) =>
            setData({ ...data, sportsOrganization: e.target.value })
          }
          className={styles.inputText}
        />
        <br></br>
        <label className={styles.labelText} htmlFor="currentAdamovichRank">
          Введите рейтинг Адамовича:
        </label>
        <br></br>
        <input
          placeholder="982"
          type="text"
          value={data.currentAdamovichRank}
          name="username"
          id="currentAdamovichRank"
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) =>
            setData({ ...data, currentAdamovichRank: Number(e.target.value) })
          }
          className={styles.inputText}
        />
        <br></br>

        <button className={styles.createButton} type="submit">
          Зарегистрировать игрока
        </button>
      </form>
    </div>
  );
};

// const RegistrationPlayer = () => { //Для скрина
//   const [data, setData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     region: '',
//     birthday: '',
//     sportsOrganization: '',
//     gender: '',
//     sportsCategoryID: '',
//     currentAdamovichRank: '',
//   });
//   const [player, setPlayer] = useState('');
//   const [arrayOfCategories, setArrayOfCategories] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/sports-categories')
//       .then((response) => response.json())
//       .then((data) => setArrayOfCategories(data));
//   }, []);

//   function handleFormSubmit(event) {
//     event.preventDefault();
//     console.log(JSON.stringify(data));
//     fetch('http://localhost:5000/api/players', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) =>
//         response.ok ? response.json() : Promise.reject(response)
//       )
//   }
//   return (
//     <div className="qwert">
//       <h1>Регистрация игрока</h1>
//       <form className="blockInput" onSubmit={handleFormSubmit}>
//         <label className={styles.labelText} htmlFor="firstName">Введите имя игрока:</label>
//         <br></br>
//         <input placeholder="Иван" type="text" value={data.firstName} name="username" id="firstName"
//           onChange={(e) => setData({ ...data, firstName: e.target.value })}className={styles.inputText}/>
//         <br></br>
//         <label className={styles.labelText} htmlFor="middleName">Введите отчество игрока:</label>
//         <br></br>
//         <input placeholder="Сергеевич" type="text" value={data.middleName} name="password" id="middleName"
//           onChange={(e) => setData({ ...data, middleName: e.target.value })} className={styles.inputText}/>
//         <br></br>
//         <label className={styles.labelText} htmlFor="lastName">Введите фамилию игрока:</label>
//         <br></br>
//         <input placeholder="Петров" type="text" value={data.lastName} name="password" id="lastName"
//           onChange={(e) => setData({ ...data, lastName: e.target.value })} className={styles.inputText}/>
//         <br></br>
//         <label className={styles.labelText} htmlFor="gender">Выберите пол игрока:</label>
//         <br></br>
//         <select name="changeType" id="gender" className={styles.inputText}
//           onChange={(e) => setData({ ...data, gender: e.target.value })}>
//           <option value="">Выберите пол игрока</option>
//           <option value="Мужской">Мужской</option>
//           <option value="Женский">Женский</option>
//         </select>
//         <br></br>
//         <label className={styles.labelText} htmlFor="region">Введите название города:</label>
//         <br></br>
//         <input placeholder="Севастополь" type="text" value={data.region} name="username" id="region"
//           onChange={(e) => setData({ ...data, region: e.target.value })}className={styles.inputText}/>
//         <br></br>
//         <label className={styles.labelText} htmlFor="birthday">Выберите дату рождения игрока:</label>
//         <br></br>
//         <input type="date" id="birthday"
//           onChange={(e) => setData({ ...data, birthday: e.target.value })}className={styles.inputText}/>
//         <br></br>
//         <label className={styles.labelText} htmlFor="sportsCategoryID">Выберите спортивную категорию:</label>
//         <br></br>
//         <select name="changeType" id="sportsCategoryID" className={styles.inputText}
//           onChange={(e) => setData({ ...data, sportsCategoryID: e.target.value })}>
//           <option value="">Выберите спортивную категорию</option>
//           {arrayOfCategories.map((objOfCategory) => {
//             return (
//               <option key={objOfCategory['_id']} value={objOfCategory['_id']}>
//                 {objOfCategory['title']}
//               </option>)})}</select>
//         <br></br>
//         <label className={styles.labelText} htmlFor="sportsOrganization">Введите название спортивной организации:
//         </label><br></br>
//         <input placeholder="Сатурн" type="text" value={data.sportsOrganization} name="username" id="sportsOrganization"
//           onChange={(e) => setData({ ...data, sportsOrganization: e.target.value })} className={styles.inputText}/>
//         <br></br>
//         <label className={styles.labelText} htmlFor="currentAdamovichRank">Введите рейтинг Адамовича:</label>
//         <br></br>
//         <input placeholder="982" type="text" value={data.currentAdamovichRank} name="username" id="currentAdamovichRank"
//           onChange={(e) => setData({ ...data, currentAdamovichRank: Number(e.target.value) })} className={styles.inputText}/>
//         <br></br>
//         <button className={styles.createButton} type="submit">Зарегистрировать игрока</button>
//       </form>
//     </div>
//   );
// };

export default RegistrationPlayer;
