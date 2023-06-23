import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import styles from './AllPlayer.module.css';

function TRow(props) {
  // console.log('props', props['ids'][props.rowIndex - 1]?.['_id']);
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <tr
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      style={
        hover
          ? { backgroundColor: '#c0c0c0' }
          : props.rowIndex % 2 === 0
          ? props.theme.rowEven
          : props.theme.rowOdd
      }
    >
      <div
        className={styles.outerDiv} // Если что, то тут я сделал, чтобы высота строк была бОльшей, можно полностью див убрать.
        // style={{
        //   height: '8vh',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        // }}
      >
        <td key={0} style={props.theme.cell}>
          {props.rowIndex + 1}
        </td>
      </div>

      {Object.keys(props.row).map((cell, ndx) => {
        if (props.columns[ndx + 1].type === 'custom') {
          return (
            <td key={ndx + 1} style={props.theme.cell}>
              {props.customRenderer(props.row)}
            </td>
          );
        } else if (props.columns[ndx + 1].type === 'id') {
          //Проверку на id добавил
          return (
            // <td key={ndx + 1} style={props.theme.cell}>
            //   {props.row[cell]}
            // </td>
            ''
          );
        } else {
          return (
            <td key={ndx + 1} style={props.theme.cell}>
              {props.row[cell]}
            </td>
          );
        }
      })}
      <MdDeleteForever
        onClick={() => {
          fetch(
            `http://localhost:5000/api/players/${
              props['ids'][props.rowIndex]?.['_id']
            }`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
            }
          ).catch((error) => console.error(error));
        }}
      />
    </tr>
  );
}

export default TRow;
