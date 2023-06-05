import { NavLink } from 'react-router-dom';
import styles from './styles/Menu.module.css';

const TournamentMenu = () => {
  return (
    <nav className={styles.TournamentNav}>
      <div className={styles.TournamentdivNav}>
        <NavLink to="." end>
          Информация о турнире
        </NavLink>
        <NavLink to="TournamentGames">Перейти к турам</NavLink>
        <NavLink to="TournamentGamesResults">Итоги</NavLink>
      </div>
    </nav>
  );
};

export default TournamentMenu;
