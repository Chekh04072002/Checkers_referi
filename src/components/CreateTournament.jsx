import SelectedPlayers from './SelectedPlayers';
import { useState, useEffect } from 'react';
import Poisk from './Poisk';
import styles from './styles/CreateTournament.module.css';
import { useNavigate } from 'react-router-dom';
import TextInput from './form/TextInput';
import Select from './form/Select';
import DateInput from './form/DateInput';
import PlayerList from './form/PlayerList';
import {API_URL} from '../config';

const CreateTournament = () => {
  const [arrayOfPlay, setArrayOfPlay] = useState([]);
  useEffect(() => {
    // fetch('http://localhost:5000/api/players') // Работало
    fetch(`${API_URL}players?page=1&limit=100`)
      .then((response) => response.json())
      .then((data) => setArrayOfPlay(data))
      .then(() => console.log(arrayOfPlay));
  }, []);
  // const [userName, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const [data, setData] = useState({
    cp: '',
    title: '',
    sportsDescipline: '',
    groups: [],
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
    coaches: [],
    sportsFaciliy: '',
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

    fetch(`${API_URL}tournaments`, {
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
          cp: '',
          title: '',
          sportsDescipline: '',
          groups: [],
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
          coaches: [],
          sportsFaciliy: '',
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
        <TextInput 
          label="Введите номер КП турнира:"
          placeholder="КП"
          value={data.cp}
          onChange={(e) => setData({ ...data, cp: e.target.value })}
        />
        <TextInput 
          label="Введите название турнира:"
          placeholder="Весенние игры"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <Select 
          label="Введите название спортивной десциплины:"
          onChange={(e) => setData({ ...data, sportsDescipline: e.target.value})}
          options={[
            {value: "русские шашки", text: "русские шашки"},
            {value: "русские шашки - быстрая игра", text: "русские шашки - быстрая игра"},
            {value: "русские шашки - командные соревнования", text: "русские шашки - командные соревнования"},
            {value: "русские шашки - молниеносная игра", text: "русские шашки - молниеносная игра"},
            {value: "русские шашки - молниеносная игра - командные соревнования", text: "русские шашки - молниеносная игра - командные соревнования"},
            {value: "стоклеточные шашки", text: "стоклеточные шашки"},
            {value: "стоклеточные шашки - быстрая игра", text: "стоклеточные шашки - быстрая игра"},
            {value: "стоклеточные шашки - быстрая игра - командные соревнования", text: "стоклеточные шашки - быстрая игра - командные соревнования"},
            {value: "стоклеточные шашки - командные соревнования", text: "стоклеточные шашки - командные соревнования"},
            {value: "стоклеточные шашки - молниеносная игра - командные соревнования", text: "стоклеточные шашки - молниеносная игра - командные соревнования"},
            {value: "игра по переписке", text: "игра по переписке"},
            {value: "обратная игра в шашки (поддавки)", text: "обратная игра в шашки (поддавки)"},
            {value: "шашечная композиция", text: "шашечная композиция"},
            {value: "рэндзю", text: "рэндзю"},
          ]}
        />
        <TextInput 
          label="Введите названия групп через запятую:"
          placeholder="юноши и девушки до 17 лет,юноши и девушки до 14 лет"
          value={data.groups.join(',')}
          onChange={(e) => setData({ ...data, groups: e.target.value.split(',') })}
        />
        <TextInput 
          label="Введите ФИО судьи турнира:"
          placeholder="Иванов Петр Сергеевич"
          value={data.mainReferee}
          onChange={(e) => setData({ ...data, mainReferee: e.target.value })}
        />
        <TextInput 
          label="Введите ФИО секретаря турнира:"
          placeholder="Сергеев Иван Петрович"
          value={data.mainSecretary}
          onChange={(e) => setData({ ...data, mainSecretary: e.target.value })}
        />
        <TextInput 
          label="Введите название страны:"
          placeholder="Россия"
          value={data.country}
          onChange={(e) => setData({ ...data, country: e.target.value })}
        />
        <TextInput 
          label="Введите название региона:"
          placeholder="Крым"
          value={data.region}
          onChange={(e) => setData({ ...data, region: e.target.value })}
        />
        <TextInput 
          label="Введите название города:"
          placeholder="Севастополь"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />

        <Select 
          label="Выберите тип сетки:"
          onChange={(e) => setData({ ...data, tournamentSystem: e.target.value })}
          options={[
            {value: "Круговая", text: "Круговая система"},
            {value: "Швейцарская", text: "Швейцарская система"},
          ]}
        />
        <DateInput 
          label="Выберите дату начала турнира:"
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
        />
        <DateInput 
          label="Выберите дату окончания турнира:"
          onChange={(e) =>  setData({ ...data, endDate: e.target.value })}
        />
        <TextInput 
          label="Укажите служебное помещение:"
          placeholder="Служебное помещение"
          value={data.sportsFaciliy}
          onChange={(e) => setData({ ...data, sportsFaciliy: e.target.value })}
        />
        
        <Poisk arrayOfPlay={arrayOfPlay} data={data} setData={setData} />{' '}
        <br></br>
        {/* Вывожу список зареганных на турнир игроков */}
        <PlayerList 
          tournament={data}
          players={arrayOfPlay}
        />
        
        <button className={styles.createButton} type="submit">
          Создать Турнир
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;
