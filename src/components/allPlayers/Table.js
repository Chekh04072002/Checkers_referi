import React, { useState, useEffect } from 'react';
import THead from './THead';
import TBody from './TBody';
import { columns, sampleData } from './SampleData';
import { theme } from './Table.Style';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { API_URL } from '../../config';

function Table() {

  //Пагинация
  const [currentPage, setCurrentPage] = useState(1); // Финальная часть пагинации
  const [data, setData] = useState([]); // Финальная часть пагинации
  const [totalCount, setTotalCount] = useState(0); // Финальная часть пагинации
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Чтобы найти число игроков зареганных
    fetch(`${API_URL}players?page=${1}&limit=150000`)
      .then((data) => data.json())
      .then((data) => setTotalCount(data.length));
  }, []);

  /* useEffect(() => {
    fetch(`http://localhost:5000/api/players?page=${1}&limit=15`)
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []); */

  useEffect(() => {
    if (fetching) {
      console.log('data is ', data);
      fetch(`${API_URL}players?page=${currentPage}&limit=15`) // Финальная пагинация Вписать адрес
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            setData([...data, ...response]);
            console.log('dadawdwad');
          }
          setCurrentPage(currentPage + 1);
        })
        .finally(() => setFetching(false));
    }
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      data.length < totalCount // Финальная часть пагинации
    ) {
      setFetching(true);
    }
  };

  const customRenderer = (row) => {
    return <Link to={row.id}>Перейти в профиль игрока</Link>; // Путь
  };
  const columnRenderer = (column) => {
    return column.slice(0, 1).toUpperCase() + column.slice(1, column.length);
  };

  const deletePlayer = (id) => {
    fetch(
      `${API_URL}players/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    .then(() => setData(data.filter(player => player._id !== id)))
    .catch((error) => console.error(error));
  }

  const finalData = data.map((obj) => {
    return {
      ФИО: `${obj['lastName']} ${obj['firstName']} ${obj['middleName']}`,
      Регион: `${obj['region']}`,
      Дата_рождения: `${formatDate(obj['birthday'])}`,
      Разряд: `${obj['sportsCategoryAbbr']}`,
      Рейтинг: `${obj['currentAdamovichRank'].toFixed(2)}`,
      Подробнее: `${obj['_id']}`,
      id: `${obj['_id']}`,
    };
  });

  return (
    <>
      <table style={theme.table}>
        <THead
          theme={theme}
          columnRenderer={columnRenderer}
          columns={columns}
        ></THead>
        <TBody
          theme={theme}
          customRenderer={customRenderer}
          columns={columns}
          rows={finalData} // попробовать преобразовать новые данные в старый, нужный вид
          deletePlayer={deletePlayer}
          ids={data}
        ></TBody>
      </table>
    </>
  );
}

export default Table;