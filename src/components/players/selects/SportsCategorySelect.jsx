import React from 'react'
import Select from '../../UI/Select'

const SportsCategorySelect = ({
    onChange, 
    value='', 
    className, 
    sportsCategories
}) => {
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