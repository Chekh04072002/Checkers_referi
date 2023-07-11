import React from 'react'

const PlayerList = ({
    tournament,
    players
}) => {
  return (
    <div>
        {tournament.playersIDs.length > 0 ? 'Участники:' : ''}
        <br></br>
        {tournament.playersIDs.length > 0
          ? tournament.playersIDs.map((id, index) => {
              let player = players.find((p) => p._id === id);
              return (
                <div
                  key={id}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgb(230, 231, 231)',
                      // display: 'block',
                      padding: '5px',
                      borderRadius: '5px',
                      fontFamily: 'Raleway',
                      margin: '5px',
                      // width: '400px',
                    }}
                    // key={id}
                  >{`${index + 1}. ${player.lastName} ${
                    player.firstName
                  } ${player.middleName}, ${
                    player.sportsCategoryAbbr
                  }`}</div>
                </div>
              );
            })
          : ''}
    </div>
  )
}

export default PlayerList