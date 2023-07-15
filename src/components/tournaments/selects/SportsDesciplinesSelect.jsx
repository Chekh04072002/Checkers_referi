import React from 'react'
import Select from '../../UI/Select'

const SportsDesciplinesSelect = ({value="", onChange, className}) => {
  return (
    <Select
        required
        className={className}
        onChange={onChange}
        value={value}
    >
        <option disabled value="">Название дисциплины</option>
        <option value="русские шашки">русские шашки</option>
        <option value="русские шашки - быстрая игра">русские шашки - быстрая игра</option>
        <option value="русские шашки - командные соревнования">русские шашки - командные соревнования</option>
        <option value="русские шашки - молниеносная игра">русские шашки - молниеносная игра</option>
        <option value="русские шашки - молниеносная игра - командные соревнования">русские шашки - молниеносная игра - командные соревнования</option>
        <option value="стоклеточные шашки">стоклеточные шашки</option>
        <option value="стоклеточные шашки - быстрая игра">стоклеточные шашки - быстрая игра</option>
        <option value="стоклеточные шашки - быстрая игра - командные соревнования">стоклеточные шашки - быстрая игра - командные соревнования</option>
        <option value="стоклеточные шашки - командные соревнования">стоклеточные шашки - командные соревнования</option>
        <option value="стоклеточные шашки - молниеносная игра - командные соревнования">стоклеточные шашки - молниеносная игра - командные соревнования</option>
        <option value="игра по переписке">игра по переписке</option>
        <option value="обратная игра в шашки (поддавки)">обратная игра в шашки (поддавки)</option>
        <option value="шашечная композиция">шашечная композиция</option>
        <option value="рэндзю">рэндзю</option>
    </Select>
  )
}

export default SportsDesciplinesSelect