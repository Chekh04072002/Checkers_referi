import React, { useContext } from 'react'
import Select from '../../UI/Select'
import { AppContext } from '../../../context/AppContext'

const SportsCategorySelect = ({
    onChange, 
    value='', 
    className, 
}) => {

  const {sportsCategories} = useContext(AppContext);

  return (
    <Select 
        required
        value={value}
        className={`${className}`}
        onChange={onChange}
    >
        <option disabled value="">Выберите звание, разряд</option>
        {sportsCategories.map(category => {
            return (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
            );
        })}
    </Select>
  )
}

export default SportsCategorySelect