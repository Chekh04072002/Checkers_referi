import { useEffect, useState } from 'react';
import styles from './styles/CreateTournament.module.css';
import { API_URL } from '../config';

const RegistrationPlayer = () => {
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
  const [created, setCreated] = useState(false);

  function createdchtoto() {
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 5000);
  }

  useEffect(() => {
    fetch(`${API_URL}sports-categories`)
      .then((response) => response.json())
      .then((data) => setArrayOfCategories(data));
  }, []);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(data));
    if (data.currentAdamovichRank === '') {
      data.currentAdamovichRank = undefined;
    } else {
      data.currentAdamovichRank = +data.currentAdamovichRank;
    }

    console.log(data);

    fetch(`${API_URL}players`, {
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
      })
      .then((_) => {
        setData({
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
      })
      .catch((error) =>
        error.json().then((errorData) => {
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
          <div className={styles.push}>Игрок успешно зарегистрирован</div>
        </div>
      ) : (
        ''
      )}
      {created === 'error' ? (
        <div>
          <div className={styles.error}>Ошибка при регистрации игрока</div>
        </div>
      ) : (
        ''
      )}
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
          onChange={(e) =>
            setData({ ...data, currentAdamovichRank: e.target.value})
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
