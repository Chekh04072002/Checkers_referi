import { NavLink } from 'react-router-dom';
import styles from './styles/Menu.module.css';
import checkerslogo from '../pictures/checkersLogo.png';

const Menu = () => {
  return (
    <nav>
      <img src={checkerslogo} />

      <div className={styles.divNav}>
        <NavLink to="." end>
          Все турниры
        </NavLink>

        <NavLink to="all-players">Все игроки</NavLink>
        <NavLink to="create-tournament">Создать турнир</NavLink>
        <NavLink to="registration-player">Зарегистрировать игрока</NavLink>
        {/* <NavLink to="auth">Войти</NavLink> */}
      </div>
    </nav>
  );
};

export default Menu;
