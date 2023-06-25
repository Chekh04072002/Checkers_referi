import { useEffect, useState } from 'react';
import styles from './Poisk.module.css';


const Poisk = ({ arrayOfPlay, data, setData }) => {
  const [playerList, setPlayerList] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  
  const filterPlayers = (searchText, listOfPlayers) => {
    if (!searchText || searchText.length < 2) {
      return [];
    }
    if (listOfPlayers) {
      if (listOfPlayers.length > 0) {
        return listOfPlayers.filter(({ lastName }) => {
          // console.log(lastName);
          return lastName.toLowerCase().includes(searchText.toLowerCase());
        });
      }
    }
    return [];
  };


  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredPlayers = filterPlayers(searchItem, arrayOfPlay);
      setPlayerList(filteredPlayers);
      //   console.log(filteredPlayers);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchItem]);

  //   console.log('arrayOfPlay', arrayOfPlay);
  return (
    <div>
      <div>Добавить игроков:</div>
      <div>
        <input
          style={{ width: '400px' }}
          value={searchItem}
          type="text"
          placeholder="Введите фамилию игрока"
          onChange={(e) => setSearchItem(e.target.value)}
        ></input>
        <div className={styles.containerForDivOfPlayer}>
          {/* {searchItem.length > 0 ? <div>Найденные игроки:</div> : ''} */}
          {playerList.length == 0 && searchItem.length > 1 ? (
            <div>
              Людей с такими фамилиями нет в списке зарегистрирвоанных игроков
            </div>
          ) : searchItem.length > 0 ? (
            <div>Найденные игроки:</div>
          ) : (
            ''
          )}
          {playerList
            ? playerList.map((obj) => {
                return (
                  <div
                    onClick={(e) => {
                      setData({
                        ...data,
                        playersIDs: [...data.playersIDs, obj['_id']],
                      });
                      console.log(obj['_id']);
                    }}
                    className={styles.divOfPlayer}
                    key={obj['_id']}
                    value={'qwer'}
                  >
                    {`${obj['lastName']} ${obj['firstName']} ${obj['middleName']}, ${obj['sportsCategoryAbbr']}`}
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Poisk;

// onChange={(e) =>
//     setData({
//       ...data,
//       playersIDs: [...data.playersIDs, e.target.value],
//     })
//   }
