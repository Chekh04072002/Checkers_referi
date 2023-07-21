import React, {useEffect, useContext, Fragment} from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { fetchHandler, formatDate } from '../../../utils/utils';
import styles from './TournamentInfoPage.module.css';
import EditableField from '../../fields/editables/EditableField';
import LabeledField from '../../fields/simple/LabeledField';
import TournamentSystemSelect from '../selects/TournamentSystemSelect';
import SportsDesciplinesSelect from '../selects/SportsDesciplinesSelect';
import ListField from '../../fields/editables/ListField';
import Input from '../../UI/Input';
import TournamentStatus from './TournamentStatus';
import Button from '../../UI/Button';
import State from '../../UI/State';
import { NotificationContext } from '../../../context/NotificationContext';

const TournamentInfoPage = () => {
    const {tournament, setTournament, fetchTournament} = useContext(AppContext);
    const {isLoading, showLoader, 
            errorMessage, showErrorMessage, 
            succesMessage, showSuccessMessage,
            resetNotification
        } = useContext(NotificationContext);
        
    const {tournamentSlug: tournamentID} = useParams();

    const succesUpdating = (data) => {
        setTournament(data);
        showSuccessMessage("Данные турнира успешно изменены");
    }

    const errorUpdating = (error) => {
        showErrorMessage(error.message);
    }


    const save = () => {
        fetchHandler(
            `tournaments/${tournamentID}`,
            succesUpdating,
            showLoader,
            errorUpdating,
            {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(tournament),
            }
        );
    }


    useEffect(() => {
        resetNotification();
        fetchTournament(tournamentID);
    }, []);


    //TODO разобраться где какое поле должно быть

    return (
        <div className={styles.tournamentInfoPage}>
            {
                tournament
                ? (
                    <Fragment>
                        <div className={styles.infoHeader}>
                            <EditableField editComponent={
                                <Input 
                                    className={styles.input} 
                                    onChange={(e) => setTournament({...tournament, title: e.target.value})} 
                                    value={tournament.title}
                                />}
                            >
                                <h2>{tournament.title}</h2>
                            </EditableField>

                            <TournamentStatus tournament={tournament}/>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.baseInfo}>
                                <div className={styles.infoColumn}>
                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            onChange={(e) => setTournament({...tournament, cp: e.target.value})} 
                                            value={tournament.cp}
                                        />}
                                    >
                                        <LabeledField label="КП №">{tournament.cp}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            value={tournament.country}
                                            onChange={(e) => setTournament({...tournament, country: e.target.value})}
                                        />}
                                    >
                                        <LabeledField label="Страна">{tournament.country}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            value={tournament.region}
                                            onChange={(e) => setTournament({...tournament, region: e.target.value})}
                                        />}
                                    >
                                        <LabeledField label="Регион">{tournament.region}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            value={tournament.city}
                                            onChange={(e) => setTournament({...tournament, city: e.target.value})}
                                        />}
                                    >
                                        <LabeledField label="Город">{tournament.city}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            type="date" 
                                            value={tournament.startDate}
                                            onChange={(e) => setTournament({...tournament, startDate: e.target.value})}
                                        />}
                                    >
                                        <LabeledField label="Дата начала">{formatDate(tournament.startDate)}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            type="date" 
                                            value={tournament.endDate}
                                            onChange={(e) => setTournament({...tournament, endDate: e.target.value})}
                                        />}
                                    >
                                        <LabeledField label="Дата окончания">{formatDate(tournament.endDate)}</LabeledField>
                                    </EditableField>
                                </div>

                                <div className={`${styles.infoColumn} ${styles.right}`}>
                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            onChange={(e) => setTournament({...tournament, mainReferee: e.target.value})} 
                                            value={tournament.mainReferee}
                                        />}
                                    >
                                        <LabeledField label="Главный судья">{tournament.mainReferee}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            onChange={(e) => setTournament({...tournament, mainSecretary: e.target.value})} 
                                            value={tournament.mainSecretary}
                                        />}
                                    >
                                        <LabeledField label="Главный секретарь">{tournament.mainSecretary}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            className={styles.input} 
                                            onChange={(e) => setTournament({...tournament, timeControl: e.target.value})} 
                                            value={tournament.timeControl}
                                        />}
                                    >
                                        <LabeledField label="Контроль">{tournament.timeControl}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <TournamentSystemSelect 
                                            value={tournament.tournamentSystem}
                                            onChange={(e) => setTournament({...tournament, tournamentSystem: e.target.value})}
                                        />}
                                    >
                                        <LabeledField label="Система турнира">{tournament.tournamentSystem}</LabeledField>
                                    </EditableField>

                                    <EditableField editComponent={
                                        <Input 
                                            value={tournament.sportsFacility}
                                            onChange={(e) => setTournament({...tournament, sportsFacility: e.target.value})}
                                        />
                                    }
                                    >
                                        <LabeledField label="Спортивное сооружение">{tournament.sportsFacility}</LabeledField>
                                    </EditableField>              
                                </div>
                            </div>
                            
                            <div className={styles.additionalInfo}>
                                <EditableField editComponent={
                                        <SportsDesciplinesSelect
                                            value={tournament.sportsDescipline}
                                            onChange={(e) => setTournament({...tournament, sportsDescipline: e.target.value})}
                                        />}
                                    >
                                    <LabeledField label="Спортивная десциплина">{tournament.sportsDescipline}</LabeledField>
                                </EditableField>

                                <ListField 
                                    label="Судьи" 
                                    defaultItems={tournament.referees} 
                                    onChange={(referees) => setTournament({...tournament, referees})}
                                />

                                <ListField 
                                    label="Тренеры" 
                                    defaultItems={tournament.coaches} 
                                    onChange={(coaches) => setTournament({...tournament, coaches})}
                                />
                            </div>
                        </div>

                        <div className={styles.infoFooter}>
                            <State isLoading={isLoading} errorMessage={errorMessage} succesMessage={succesMessage}/>
                            <Button disabled={isLoading} className={styles.saveBtn} onClick={save} color="blue">Сохранить</Button>
                        </div>
                    </Fragment>
                )
                : <h2>Турнир не найден</h2>
            }
        </div>
    )
}

export default TournamentInfoPage