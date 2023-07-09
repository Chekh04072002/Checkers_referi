import React from 'react'
import Select from '../UI/Select'

const TournamentSystemSelect = ({value, onChange}) => {
  return (
    <Select defaultValue={value} onChange={onChange}>
        <option value="Круговая">Круговая</option>
        <option value="Швейцарская">Швейцарская</option>
    </Select>
  )
}

export default TournamentSystemSelect