import PieceOfData from './PieceOfData';
import styles from './AllData.module.css';
import { formatDate } from '../../utils/utils';

function AllData({ dataPlayer }) {
  //   const arrayOfData = [
  //     player.lastName,
  //     player.firstName,
  //     player.gender,
  //     player.birthday,
  //     player.region,
  //     player.sportsCategoryID,
  //     player.sportsCategoryAbbr,
  //     player.sportsOrganization,
  //     player.currentAdamovichRank,
  //   ];
  return (
    <div className={styles.allData}>
      <PieceOfData
        keyy="ФИО"
        value={`${dataPlayer['lastName']} ${dataPlayer['firstName']} ${dataPlayer['middleName']}`}
      />
      <PieceOfData keyy="Пол" value={dataPlayer['gender']} />
      <PieceOfData keyy="Дата Рождения" value={formatDate(dataPlayer['birthday'])} />
      <PieceOfData keyy="Регион" value={dataPlayer['region']} />
      <PieceOfData keyy="Разряд" value={dataPlayer['sportsCategoryAbbr']} />
      <PieceOfData
        keyy="Спортивная организация"
        value={dataPlayer['sportsOrganization']}
      />
    </div>
  );
}

export default AllData;
