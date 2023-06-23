import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function THead(props) {
  console.log('props.columns', props.columns);
  return (
    <thead>
      <tr style={props.theme.column}>
        {props.columns.map((col) =>
          col.name === 'id' ? (
            <MdDeleteForever />
          ) : (
            <th style={props.theme.cell} key={col.name}>
              {props.columnRenderer(col.name)}
            </th>
          )
        )}
      </tr>
    </thead>
  );
}

export default THead;
