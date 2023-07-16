import React, {useState} from 'react';
import styles from './CreateTournamentForm.module.css';
import SportsDesciplinesSelect from '../selects/SportsDesciplinesSelect';
import LabeledComponent from '../../UI/LabeledComponent';
import Input from '../../UI/Input';
import TournamentSystemSelect from '../selects/TournamentSystemSelect';
import Button from '../../UI/Button';
import State from '../../UI/State';

const CreateTournamentForm = ({className, onSubmit, isLoading, succesMessage, errorMessage}) => {
    const [data, setData] = useState({
        cp: '',
        title: '',
        sportsDescipline: '',
        mainReferee: '',
        mainSecretary: '',
        country: '',
        region: '',
        city: '',
        tournamentSystem: '',
        startDate: '',
        endDate: '',
        sportsFaciliy: '',
    });


  return (
    <form className={`${styles.form} ${className}`} onSubmit={(e) => onSubmit(e, data)}>
        <LabeledComponent label="Номер КП:">
          <Input 
            placeholder="КП"
            required
            value={data.cp}
            onChange={(e) => setData({ ...data, cp: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Название:">
          <Input 
            required
            placeholder="Весенние игры"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Система:">
          <TournamentSystemSelect 
            value={data.tournamentSystem}
            onChange={(e) => setData({ ...data, tournamentSystem: e.target.value })}
          />
        </LabeledComponent>
        
        <LabeledComponent label="Дисциплина:">
          <SportsDesciplinesSelect 
            value={data.sportsDescipline}
            onChange={(e) => setData({ ...data, sportsDescipline: e.target.value})}
          />
        </LabeledComponent>

        <LabeledComponent label="Главный судья:">
          <Input 
            required
            placeholder="Иванов Петр Сергеевич"
            value={data.mainReferee}
            onChange={(e) => setData({ ...data, mainReferee: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Главный секретарь:">
          <Input
            required 
            placeholder="Сергеев Иван Петрович"
            value={data.mainSecretary}
            onChange={(e) => setData({ ...data, mainSecretary: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Страна:">
          <Input 
            required
            placeholder="Россия"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Регион:">
          <Input 
            placeholder="Крым"
            value={data.region}
            onChange={(e) => setData({ ...data, region: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Город:">
          <Input 
            required
            placeholder="Севастополь"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Начало турнира:">
          <Input 
            type='date'
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Окончание турнира:">
          <Input 
            type='date'
            value={data.endDate}
            onChange={(e) =>  setData({ ...data, endDate: e.target.value })}
          />
        </LabeledComponent>

        <LabeledComponent label="Спортивное сооружение:">
          <Input 
            placeholder="Спортивное сооружение"
            value={data.sportsFaciliy}
            onChange={(e) => setData({ ...data, sportsFaciliy: e.target.value })}
          />
        </LabeledComponent>
        
        <State isLoading={isLoading} succesMessage={succesMessage} errorMessage={errorMessage}/>
        <Button disabled={isLoading} className={styles.submitBtn} color="green" type="submit">
          Создать Турнир
        </Button>
    </form>
  )
}

export default CreateTournamentForm