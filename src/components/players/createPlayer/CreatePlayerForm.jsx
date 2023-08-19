import React, {useContext, useState, useEffect} from 'react'
import Button from '../../UI/Button'
import LabeledComponent from '../../UI/LabeledComponent';
import Input from '../../UI/Input';
import SportsCategorySelect from '../selects/SportsCategorySelect';
import State from '../../UI/State';
import { NotificationContext } from '../../../context/NotificationContext';
import { fetchHandler } from '../../../utils/utils';
import styles from './CreatePlayerForm.module.css';
import GenderSelect from '../selects/GenderSelect';
import { useDispatch } from 'react-redux';

const CreatePlayerForm = () => {
    const defaultData = {
        lastName: '',
        firstName: '',
        middleName: '',
        gender: '',
        region: '',
        birthday: '',
        sportsCategoryID: '',
        sportsOrganization: '',
        currentAdamovichRank: '',
    }

    const [data, setData] = useState(defaultData);
    //const dispatch = useDispatch();

    const {
        isLoading, 
        succesMessage, 
        errorMessage, 
        showErrorMessage, 
        showSuccessMessage,
        showLoader,
        resetNotification
    } = useContext(NotificationContext);
    
    const createPlayerHandler = (event) => {
        event.preventDefault();

        const playerData = {...data};
        let currentAdamovichRank = undefined;

        if (playerData.currentAdamovichRank){
            currentAdamovichRank = +playerData.currentAdamovichRank.replaceAll(",", ".");
        }

        fetchHandler(
            'players',
            () => {
                showSuccessMessage("Игрок успешно зарегистрирован");
                setData(defaultData);
            },
            showLoader,
            (error) => {
                console.error(error);
                showErrorMessage(error.message)
            },
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({...playerData, currentAdamovichRank}),
            }
        )
    }

    /* const setAdamovichRank = (rank) => {
        const parsedRank = rank.replace(",", ".");

        setData({...data, currentAdamovichRank: +parsedRank});
    } */
    
    useEffect(resetNotification, []);

    return (
        <form onSubmit={createPlayerHandler} className={styles.form}>
            <LabeledComponent label="Фамилия">
                <Input 
                    required
                    placeholder="Иванов"
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Имя">
                <Input 
                    required
                    placeholder="Иван"
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Отчество">
                <Input 
                    placeholder="Иванович"
                    value={data.middleName}
                    onChange={(e) => setData({ ...data, middleName: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Пол">
                <GenderSelect 
                    value={data.gender}
                    onChange={(e) => setData({...data, gender: e.target.value})}
                />
            </LabeledComponent>

            <LabeledComponent label="Город">
                <Input 
                    required
                    placeholder="Симферополь"
                    value={data.region}
                    onChange={(e) => setData({ ...data, region: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Дата рождения">
                <Input 
                    required
                    type='date'
                    value={data.birthday}
                    onChange={(e) => setData({ ...data, birthday: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Звание, разряд">
                <SportsCategorySelect
                    value={data.sportsCategoryID}
                    onChange={(e) => setData({ ...data, sportsCategoryID: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Флаг">
                <Input 
                    placeholder="ФШ"
                    value={data.sportsOrganization}
                    onChange={(e) => setData({ ...data, sportsOrganization: e.target.value })}
                />
            </LabeledComponent>

            <LabeledComponent label="Рейтинг Адамовича">
                <Input 
                    placeholder="982"
                    value={data.currentAdamovichRank}
                    onChange={(e) => setData({ ...data,  currentAdamovichRank: e.target.value})}
                />
            </LabeledComponent>

            <State isLoading={isLoading} succesMessage={succesMessage} errorMessage={errorMessage}/>
            <Button 
                disabled={isLoading}
                className={styles.submitBtn} 
                color="green" 
                type='submit'
            >Зарегистрировать игрока</Button>
        </form>
    )
}

export default CreatePlayerForm