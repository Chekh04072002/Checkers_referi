import styles from './TournamentMenu.module.css';
import CustomNavLink from '../UI/CustomNavLink';

const TournamentMenu = () => {
  return (
    <nav className={styles.tournamentNav}>
      <div>
        <CustomNavLink to="." end>Информация о турнире</CustomNavLink>
        <CustomNavLink to="TournamentPlayers">Участники</CustomNavLink>
        <CustomNavLink to="TournamentGames">Туры</CustomNavLink>
        <CustomNavLink to="TournamentGamesResults">Турнирная таблица</CustomNavLink>
      </div>
    </nav>
  );
};

export default TournamentMenu;
