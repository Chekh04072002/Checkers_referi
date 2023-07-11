import React, { useContext, useEffect, useState } from 'react';
import Input from '../../UI/Input';
import PlayersList from '../playersList/PlayersList';
import { AppContext } from '../../../context/AppContext';
import { BiAddToQueue} from 'react-icons/bi';
import styles from './SearchPlayersForm.module.css';
import stylesCommon from '../../styles/Common.module.css';

const SearchPlayersForm = ({className, players, onAddPlayer}) => {
    const {tournament} = useContext(AppContext);
    const [filter, setFilter] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState(players);

    const filteringPlayers = () => {
        console.log(tournament.playersIDs);
        setFilteredPlayers(players.filter(player => {
            return !tournament.playersIDs.includes(player._id) && (
                        `${player.lastName} ${player.firstName} ${player.middleName}`.includes(filter) ||
                        player.region.includes(filter)
                    );
                   
        }));
    }

    useEffect(filteringPlayers, [filter, players, tournament]);

    return (
        <form className={`${styles.form} ${className}`}>
            <Input className={styles.input} value={filter} onChange={(e) => setFilter(e.target.value)}/>
            <div className={`${styles.playersListContainer} ${stylesCommon.scrollBarContainer}`}>
                {
                    filteredPlayers.length > 0
                    ? <PlayersList 
                        players={filteredPlayers} 
                        actionLabel="Добавить"
                        actionButton={<BiAddToQueue className={stylesCommon.clickable} onClick={onAddPlayer}/>}
                    />
                    : <h3>По указанному фильтру игроки не найдены</h3>  
                }
            </div>
        </form>
    )
}

export default SearchPlayersForm