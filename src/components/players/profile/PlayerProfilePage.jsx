import React, { useContext, useEffect, useState } from 'react';
import styles from './PlayerProfilePage.module.css';
import { useParams } from 'react-router-dom';
import { fetchHandler, formatDate } from '../../../utils/utils';
import photo from '../../../pictures/photo.jpg';
import EditableField from '../../fields/editables/EditableField';
import Input from '../../UI/Input';
import LabeledField from '../../fields/simple/LabeledField';
import GenderSelect from '../selects/GenderSelect';
import SportsCategorySelect from '../selects/SportsCategorySelect';
import { AppContext } from '../../../context/AppContext';
import Button from '../../UI/Button';
import State from '../../UI/State';
import { NotificationContext } from '../../../context/NotificationContext';
import AdamovichRankChart from '../adamovichRankChart/AdamovichRankChart';


const PlayerProfilePage = () => {
    const {sportsCategories} = useContext(AppContext);
    const {
        isLoading, 
        showLoader, 
        errorMessage,
        showErrorMessage, 
        succesMessage, 
        showSuccessMessage,
        resetNotification
    } = useContext(NotificationContext);
    const {playerSlug: playerID} = useParams();
    const [player, setPlayer] = useState({});
    

    const fetchPlayer = () => {
        fetchHandler(
            `players/${playerID}`,
            (data) => setPlayer(data),
            () => null,
            (error) => console.error(error)
        )
    }

    const playerName = (player) => {
        if(!player) return '';
        return `${player.lastName} ${player.firstName} ${player.middleName || ''}`;
    }

    const setPlayerName = (e) => {
        const name = e.target.value;
        const names = name.split(' ');

        setPlayer({
            ...player,
            firstName: names[1],
            lastName: names[0],
            middleName: names[2]
        })
    }

    const setSportsCategory = (e) => {
        const categoryID = e.target.value;
        const categoryAbbr = sportsCategories.find(category => category._id === categoryID)?.shortTitle;

        setPlayer({
            ...player,
            sportsCategoryID: categoryID,
            sportsCategoryAbbr: categoryAbbr
        })
    }

    const save = () => {
        const playerCopy = {...player};

        if(!playerCopy.currentAdamovichRank) {
            playerCopy.currentAdamovichRank = undefined
        } else {
            console.log(playerCopy)
            playerCopy.currentAdamovichRank = +playerCopy.currentAdamovichRank;
        }

        fetchHandler(
            `players/${playerID}`,
            (data) => {
                setPlayer(data);
                showSuccessMessage("Данные игрока успешно обновлены")
            },
            showLoader,
            (error) => {
                console.error(error);
                showErrorMessage(error.message)
            },
            {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(playerCopy),
            }
        )
    }


    useEffect(() => {
        resetNotification();
        fetchPlayer();
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.informationBlock}>
                <header className={styles.header}>
                    <img className={styles.playerImage} src={photo} alt='фото игрока'/>
                    <h2 className={styles.playerName}>
                        {playerName(player)}
                    </h2>
                </header>
                <main className={styles.main}>
                    <div className={styles.infoColumn}>
                        <EditableField editComponent={
                            <Input 
                                value={player.lastName}
                                onChange={(e) => setPlayer({...player, lastName: e.target.value})}
                            />
                        }>
                            <LabeledField label="Фамилия">{player.lastName}</LabeledField>
                        </EditableField>

                        <EditableField editComponent={
                            <Input 
                                value={player.firstName}
                                onChange={(e) => setPlayer({...player, firstName: e.target.value})}
                            />
                        }>
                            <LabeledField label="Имя">{player.firstName}</LabeledField>
                        </EditableField>

                        <EditableField editComponent={
                            <Input 
                                value={player.middleName}
                                onChange={(e) => setPlayer({...player, middleName: e.target.value})}
                            />
                        }>
                            <LabeledField label="Отчество">{player.middleName}</LabeledField>
                        </EditableField>
                    </div>
                    <div className={styles.infoColumn}>
                        <EditableField editComponent={
                            <GenderSelect 
                                value={player.gender}
                                onChange={(e) => setPlayer({...player, gender: e.target.value})}
                            />
                        }>
                            <LabeledField label="Пол">{player.gender}</LabeledField>
                        </EditableField>

                        <EditableField editComponent={
                            <Input 
                                type='date'
                                value={player.birthday}
                                onChange={(e) => setPlayer({...player, birthday: e.target.value})}
                            />
                        }>
                            <LabeledField label="Дата рождения">{formatDate(player.birthday)}</LabeledField>
                        </EditableField>

                        <EditableField editComponent={
                            <Input 
                                value={player.region}
                                onChange={(e) => setPlayer({...player, region: e.target.value})}
                            />
                        }>
                            <LabeledField label="Регион">{player.region}</LabeledField>
                        </EditableField>
                    </div>
                    <div className={styles.infoColumn}>
                        <EditableField editComponent={
                            <SportsCategorySelect 
                                value={player.sportsCategoryID}
                                onChange={setSportsCategory}
                            />
                        }>
                            <LabeledField label="Разряд">{player.sportsCategoryAbbr}</LabeledField>
                        </EditableField>

                        <EditableField editComponent={
                            <Input 
                                value={player.sportsOrganization}
                                onChange={(e) => setPlayer({...player, sportsOrganization: e.target.value})}
                            />
                        }>
                            <LabeledField label="Флаг">{player.sportsOrganization}</LabeledField>
                        </EditableField>

                        <EditableField editComponent={
                            <Input 
                                value={player.currentAdamovichRank}
                                onChange={(e) => setPlayer({...player, currentAdamovichRank: e.target.value.replace(',', '.')})}
                            />
                        }>
                            <LabeledField label="Рейтинг Адамовича">{player.currentAdamovichRank?.toFixed(2)}</LabeledField>
                        </EditableField>
                    </div>
                </main>
            </div>
            <div className={styles.infoSave}>
                <State isLoading={isLoading} succesMessage={succesMessage} errorMessage={errorMessage}/>
                <Button disabled={isLoading} onClick={save} color="blue">Сохранить</Button>
            </div>
            <AdamovichRankChart playerID={playerID}/>
        </div>
    )
}

export default PlayerProfilePage