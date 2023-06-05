import React from 'react';

function THead(props) {
  return (
    <thead>
      <tr style={props.theme.column}>
        {props.columns.map((col) => (
          <th style={props.theme.cell} key={col.name}>
            {props.columnRenderer(col.name)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default THead;
