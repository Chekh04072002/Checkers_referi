import { Outlet } from 'react-router-dom';
import Menu from '../Menu';
import TournamentMenu from '../TournamentMenu';

const TournamentLayout = () => {
  return (
    <>
      <TournamentMenu />
      <Outlet />
    </>
  );
};

export default TournamentLayout;
