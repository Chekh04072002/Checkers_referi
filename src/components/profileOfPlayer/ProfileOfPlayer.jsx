import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageProfile from './ImageProfile';
import AllData from './AllData';
import styles from './CardOfPlayer.module.css';
import Cchart from './Cchart';

const ProfileOfPlayer = () => {
  const [profileData, setProfileData] = useState({});
  const [tournamentStringData, setTournamentStringData] = useState([]);
  const [adamovich, setAdamovich] = useState([]);
  const params = useParams();
  // console.log(params);
  useEffect(() => {
    fetch(`http://localhost:5000/api/players/${params['playerSlug']}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }, []);
  // console.log('pd', profileData);
  // const IPlayer = {
  //   firstName: 'Дмитрий', //Имя
  //   middleName: 'Сергеевич', //Отчество
  //   lastName: 'Егоров', //Фамилия
  //   gender: 'Мужчина', //Пол
  //   birthday: '27.02.1995', //Дата рождения
  //   region: 'Крым', //Место проживания
  //   sportsCategoryID: 'Кмс', //ID спортивного разряда
  //   playerStatsIDs: 'Жесть какая-то', //Массив ID статистики игрока в турнирах
  //   sportsCategoryAbbr: 'Разряд', //Краткое название разряда
  //   sportsOrganization: 'Эльбрус', //Спортивная организация
  //   currentAdamovichRank: '785', //Текущий рейтинг Адамовича
  //   previousAdamovichRank: '700', //Предыдущий рейтинг Адамовича
  // };

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/player-stats?playerID=${params['playerSlug']}`
    )
      .then((response) => response.json())

      // .then(async (data) => {
      //   const resp = await fetch(
      //     `http://localhost:5000/api/tournaments/${data['tournamentID']}`
      //   );
      //   const dataOfTournament = await resp.json();
      //   console.log(dataOfTournament);
      //   setTournamentStringData(
      //     data.map((stat) => {
      //       return `${stat['place']} место, очков: ${stat['score']}`;
      //     })
      //   );
      //   setAdamovich(
      //     data.map((stat) => {
      //       return stat['lastAdamovichRank'];
      //     })
      //   );
      // });

      .then((data) => {
        setTournamentStringData(
          data.map((stat) => {
            return `${stat['place']} место,  очков: ${stat['score']},  рейтинг Горина: ${stat['gorinRank']}`;
          })
        );
        setAdamovich(
          data.map((stat) => {
            return stat['lastAdamovichRank'];
          })
        );
      });
    // .then((data) => setTournamentStringData(data));
  }, []);
  console.log('setTournamentStringData', tournamentStringData);
  console.log('setAdamovichRank', adamovich);

  console.log('TournamentData', profileData);
  const arr = [
    '05.05.2022 1 место',
    '07.05.2022 1 место',
    '09.05.2022 1 место',
    '05.05.2022 1 место',
    '07.05.2022 1 место',
    '09.05.2022 1 место',
  ];
  return (
    <div className={styles.outer}>
      <ImageProfile />
      <AllData dataPlayer={profileData} />
      {/* <Cchart arr={arr} /> */}
      <Cchart arr={tournamentStringData} adamovich={adamovich} />
    </div>
  );
};

export default ProfileOfPlayer;

// import { Link, useNavigate, useParams } from 'react-router-dom';
// import ImageProfile from './ImageProfile';
// import AllData from './AllData';
// import styles from './CardOfPlayer.module.css';
// import Cchart from './Cchart';
// import { useEffect } from 'react';

// const ProfileOfPlayer = () => {
//   const params = useParams();
//   //   const player = fetch(`адрес${playerSlug}`)
//   const IPlayer = {
//     firstName: 'Дмитрий', //Имя
//     middleName: 'Сергеевич', //Отчество
//     lastName: 'Егоров', //Фамилия
//     gender: 'Мужчина', //Пол
//     birthday: '27.02.1995', //Дата рождения
//     region: 'Крым', //Место проживания
//     sportsCategoryID: 'Кмс', //ID спортивного разряда
//     playerStatsIDs: 'Жесть какая-то', //Массив ID статистики игрока в турнирах
//     sportsCategoryAbbr: 'Разряд', //Краткое название разряда
//     sportsOrganization: 'Эльбрус', //Спортивная организация
//     currentAdamovichRank: '785', //Текущий рейтинг Адамовича
//     previousAdamovichRank: '700', //Предыдущий рейтинг Адамовича
//   };
//   const arr = [
//     '05.05.2022 1 место',
//     '07.05.2022 1 место',
//     '09.05.2022 1 место',
//     '05.05.2022 1 место',
//     '07.05.2022 1 место',
//     '09.05.2022 1 место',
//   ];
//   return (
//     <div className={styles.outer}>
//       <ImageProfile />
//       <AllData dataPlayer={IPlayer} />
//       <Cchart arr={arr} />
//     </div>
//   );
// };

// export default ProfileOfPlayer;
