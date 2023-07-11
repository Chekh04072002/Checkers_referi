import { Outlet } from 'react-router-dom';
import Menu from '../Menu';
import TournamentMenu from '../tournaments/TournamentMenu';

const TournamentLayout = () => {
  return (
    <>
      <TournamentMenu />
      <Outlet />
    </>
  );
};

export default TournamentLayout;
