import React from 'react';
import Select from '../../UI/Select';

const GenderSelect = ({
    onChange, 
    value='', 
    className, 
}) => {
  return (
    <Select 
        required
        value={value}
        className={`${className}`}
        onChange={onChange}
    >
        <option disabled value="">Выберите пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
    </Select>
  )
}

export default GenderSelect