import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SoloResult from './SoloResult';
import styles from './SoloResult.module.css';

const TournamentGamesResult = ({ game }) => {
  const [playersStatsIDs, setPlayersStatsIDs] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tournaments/${params['tournamentSlug']}`) // получаю
      .then((response) => response.json())
      .then((data) => setPlayersStatsIDs(data['playersStatsIDs']));
  }, []);
  console.log('playersStatsIDs', playersStatsIDs);

  return (
    <div className={styles.divOuterTable}>
      <table>
        <tr className={styles.trr}>
          <td style={{ justifyContent: 'center' }} className={styles.tdFio}>
            Фамилия, имя, отчество
          </td>
          <td className={styles.tdDr}>Год рожд.</td>
          <td className={styles.tdSr}>Спорт. разряд</td>
          <td className={styles.tdCity}>Город</td>
          <td className={styles.tdOrg}>Спорт. организ.</td>
          <td className={styles.tdO}>Очки</td>
          <td className={styles.tdGr}>КГ</td>
          <td className={styles.tdRa}>РА</td>
          <td className={styles.tdPlace}>Место</td>
        </tr>
        {playersStatsIDs.map((SoloId, index) => {
          return <SoloResult key={index} id={SoloId} />;
          // console.log(SoloId);
        })}
      </table>
    </div>
    // <div className={styles.divOuter}>
    //   <div>
    //     <span>Фамилия, имя, отчество</span>
    //     <span>Место</span>
    //   </div>
    //   {playersStatsIDs.map((SoloId, index) => {
    //     return <SoloResult key={index} id={SoloId} />;
    //     // console.log(SoloId);
    //   })}
    // </div>
  );
};

export default TournamentGamesResult;

// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import picture from '../pictures/shashki.jpeg';
// import styles from './Tournament.module.css';

// const TournamentGamesResults = ({ data }) => {
//   const [arrayOfPlayersStats, setArrayOfPlayersStats] = useState([]);
//   const [tournamentObject, setTournamentObject] = useState({});
//   const [answerLoad, setAnswerLoad] = useState(false);

//   //
//   const [arrPlayersIDs, setArrPlayersIDs] = useState([]);
//   const [arrPlayersStats, setArrPlayersStats] = useState([]);

//   const params = useParams();
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/tournaments/${params['tournamentSlug']}`)
//       .then((response) => response.json())
//       .then((data) => setTournamentObject(data))
//       .then(() => setAnswerLoad(true))
//       .then(() => {
//         console.log('Выполнилось');
//         setArrPlayersIDs(tournamentObject['playersIDs']);
//         console.log('arrPlayersIDs', arrPlayersIDs);

//       })
//       .then(() => {
//         if (answerLoad) {
//           console.log('arrPlayersIDs', arrPlayersIDs);
//           for (let i = 0; i < arrPlayersIDs.length; i++) {
//             fetch(`http://localhost:5000/api/players/${arrPlayersIDs[i]}`) //Только это заменить на статистику игроков
//               .then((response) => response.json())
//               .then((data) => setArrPlayersStats([...arrPlayersStats, data]))
//               .then(() => console.log('Выполнилось 2'));
//           }
//         }
//       });
//   }, []);

//   // console.log(params);
//   // console.log(tournamentObject);
//   // console.log(tournamentObject['playersIDs']);

//   // let arrPlayersIDs = [];
//   // let arrPlayersStats = [];
//   // useEffect(() => {
//   //   if (answerLoad) {
//   //     arrPlayersIDs = tournamentObject['playersIDs'];
//   //     console.log('arrPlayersIDs', arrPlayersIDs);
//   // for (let i = 0; i < arrPlayersIDs.length; i++) {
//   //   fetch(`http://localhost:5000/api/players/${arrPlayersIDs[i]}`) //Только это заменить на статистику игроков
//   //     .then((response) => response.json())
//   //     .then((data) => arrPlayersStats.push(data));
//   // }
//   //     setArrayOfPlayersStats(arrPlayersStats);
//   //     console.log('arrPlayersStats', arrPlayersStats); //Только это заменить на статистику игроков
//   //   }
//   // }, []);

//   // console.log('a', a);
//   // if (answerLoad) {
//   return (
//     // <div>
//     //   {' '}
//     //   <div>Фамилия: </div>
//     //   <div>Имя: </div>
//     //   <div>Отчество: </div>
//     //   <div>Регион: </div>
//     //   <div>Организация: </div>
//     // </div>
//     <div style={{ backgroundColor: '', width: '500px', height: '500px' }}>
//       {arrayOfPlayersStats.map((obj) => {
//         console.log('obj', obj);
//         return (
//           <div>
//             <div>Фамилия: {obj['firstName']}</div>
//             <div>Имя: {obj['middleName']}</div>
//             <div>Отчество: {obj['lastName']}</div>
//             <div>Регион: {obj['region']}</div>
//             <div>Организация: {obj['sportsOrganization']}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
//   // }

//   // return (
//   //   <table style={{ border: '1px solid black' }}>
//   //     <tr>
//   //       <th>#</th>
//   //       <th>Фамилия, имя, отчество</th>
//   //       <th>Год рожд.</th>
//   //       <th>Спорт. разряд</th>
//   //       <th>Город</th>
//   //       <th>Спорт. организ.</th>
//   //       <th>
//   //         <tr colspan="4">Номер соперника</tr>
//   //         <tr>
//   //           <th>1</th>
//   //           <th>2</th>
//   //           <th>3</th>
//   //           <th>4</th>
//   //           <th>5</th>
//   //         </tr>
//   //       </th>
//   //     </tr>
//   //   </table>
//   // );
// };
// export default TournamentGamesResults;
