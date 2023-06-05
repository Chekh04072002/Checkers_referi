import React from 'react';
import TRow from './TRow';

function TBody(props) {
  // console.log(props.rows);
  // props.rows.map((row, ndx) => {
  //   console.log(row);
  //   console.log(ndx);
  // });
  return (
    <tbody>
      {props.rows.map(
        (
          row,
          ndx // row-наш объект, ndx-индекс, берется индекс из массива объектов
        ) => (
          <TRow
            rowIndex={ndx}
            theme={props.theme}
            // key={row.подробнее}
            key={ndx}
            customRenderer={props.customRenderer}
            columns={props.columns}
            row={row}
          ></TRow>
        )
      )}
    </tbody>
  );
}

export default TBody;
