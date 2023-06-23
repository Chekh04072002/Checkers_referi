import React, { useState, useEffect } from 'react';
import THead from './THead';
import TBody from './TBody';
import { columns, sampleData } from './SampleData';
import { theme } from './Table.Style';
import { Link } from 'react-router-dom';

function Table(props) {
  useEffect(() => {
    fetch(`http://localhost:5000/api/players?page=${1}&limit=15`)
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []);
  //Пагинация
  // const [currentPage, setCurrentPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1); // Финальная часть пагинации
  const [data, setData] = useState([]); // Финальная часть пагинации
  const [totalCount, setTotalCount] = useState(0); // Финальная часть пагинации
  // const [data, setData] = useState(sampleData.slice(0, currentPage));
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Чтобы найти число игроков зареганных
    fetch(`http://localhost:5000/api/players?page=${1}&limit=150000`)
      .then((data) => data.json())
      .then((data) => setTotalCount(data.length));
  }, []);

  useEffect(() => {
    if (fetching) {
      // && currentPage <= sampleData.length убрал и скобок
      console.log('data is ', data);
      fetch(`http://localhost:5000/api/players?page=${currentPage}&limit=15`) // Финальная пагинация Вписать адрес
        .then((response) => response.json())
        // .then((response) => console.log('resdata', response))
        .then((response) => {
          if (response) {
            setData([...data, ...response]);
            console.log('dadawdwad');
          }
          setCurrentPage(currentPage + 1);
          // setTotalCount(response.headers['x-total-count']);
        })
        .finally(() => setFetching(false));

      // setData([...data, sampleData[currentPage]]);
      // setCurrentPage(currentPage + 1);
      // console.log(data);
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
      // currentPage <= sampleData.length - 1 // Убрать при финальной пагинации
      data.length < totalCount // Финальная часть пагинации
    ) {
      // console.log(currentPage);
      // console.log(sampleData.length);
      setFetching(true);
    }
  };
  // Пагинация кончилась)

  // const customRenderer = (row) => {
  //   return <a href={row.Подробнее}>Перейти в профиль игрока</a>; // Путь
  // };
  const customRenderer = (row) => {
    return <Link to={row.id}>Перейти в профиль игрока</Link>; // Путь
  };
  const columnRenderer = (column) => {
    return column.slice(0, 1).toUpperCase() + column.slice(1, column.length);
  };

  const finalData = data.map((obj) => {
    return {
      ФИО: `${obj['lastName']} ${obj['firstName']} ${obj['middleName']}`,
      Регион: `${obj['region']}`,
      Дата_рождения: `${obj['birthday']}`,
      Разряд: `${obj['sportsCategoryAbbr']}`,
      Рейтинг: `${Math.ceil(obj['currentAdamovichRank'])}`,
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
          // rows={sampleData}
          rows={finalData} // попробовать преобразовать новые данные в старый, нужный вид
          ids={data}
        ></TBody>
      </table>
    </>
  );
}

export default Table;

// import React, { useState, useEffect } from 'react';
// import THead from './THead';
// import TBody from './TBody';
// import { columns, sampleData } from './SampleData';
// import { theme } from './Table.Style';
// import { Link } from 'react-router-dom';

// function Table(props) {
//   //Пагинация
//   const [currentPage, setCurrentPage] = useState(15);
//   // const [currentPage, setCurrentPage] = useState(1); // Финальная часть пагинации
//   // const [data, setData] = useState([]); // Финальная часть пагинации
//   // const [totalCount, setTotalCount] = useState(0); // Финальная часть пагинации
//   const [data, setData] = useState(sampleData.slice(0, currentPage));
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     if (fetching && currentPage <= sampleData.length) {
//       // console.log(currentPage);
//       // fetch(`https://...${currentPage}`) // Финальная пагинация Вписать адрес
//       //   .then((response) => {
//       //     setData([...data, ...response.data]);
//       //     setCurrentPage(currentPage + 1);
//       //     setTotalCount(response.headers['x-total-count']);
//       //   })
//       //   .finally(() => setFetching(false));

//       setData([...data, sampleData[currentPage]]);
//       setCurrentPage(currentPage + 1);
//       console.log(data);
//     }
//     setFetching(false);
//   }, [fetching]);

//   useEffect(() => {
//     document.addEventListener('scroll', scrollHandler);
//     return function () {
//       document.removeEventListener('scroll', scrollHandler);
//     };
//   });

//   const scrollHandler = (e) => {
//     if (
//       e.target.documentElement.scrollHeight -
//         (e.target.documentElement.scrollTop + window.innerHeight) <
//         100 &&
//       currentPage <= sampleData.length - 1 // Убрать при финальной пагинации
//       // data.length < totalCount // Финальная часть пагинации
//     ) {
//       console.log(currentPage);
//       console.log(sampleData.length);
//       setFetching(true);
//     }
//   };
//   // Пагинация кончилась)

//   // const customRenderer = (row) => {
//   //   return <a href={row.Подробнее}>Перейти в профиль игрока</a>; // Путь
//   // };
//   const customRenderer = (row) => {
//     return <Link to={row.id}>Перейти в профиль игрока</Link>; // Путь
//   };
//   const columnRenderer = (column) => {
//     return column.slice(0, 1).toUpperCase() + column.slice(1, column.length);
//   };

//   return (
//     <>
//       <table style={theme.table}>
//         <THead
//           theme={theme}
//           columnRenderer={columnRenderer}
//           columns={columns}
//         ></THead>
//         <TBody
//           theme={theme}
//           customRenderer={customRenderer}
//           columns={columns}
//           // rows={sampleData}
//           rows={data}
//         ></TBody>
//       </table>
//     </>
//   );
// }

// export default Table;
