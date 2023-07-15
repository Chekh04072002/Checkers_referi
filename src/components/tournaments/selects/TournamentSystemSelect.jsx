import React from 'react'
import Select from '../../UI/Select'

const TournamentSystemSelect = ({value="", onChange}) => {
  return (
    <Select required value={value} onChange={onChange}>
        <option disabled value="" >Система турнира</option>
        <option value="Круговая">Круговая</option>
        <option value="Швейцарская">Швейцарская</option>
    </Select>
  )
}

export default TournamentSystemSelect