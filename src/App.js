import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import AllTournaments from './components/tournaments/AllTournaments';
import CreateTournament from './components/tournaments/tournamentCreate/CreateTournament';
import AllPlayers from './components/allPlayers/AllPlayers';
import ProfileOfPlayer from './components/profileOfPlayer/ProfileOfPlayer';
import RegistrationPlayer from './components/RegistrationPlayer';
import Tournament from './components/Tournament';
import TournamentLayout from './components/layouts/TournamentLayout';
import TournamentGames from './components/TournamentGames';
import TournamentGamesResults from './components/TournamentGamesResults';
import './App.css';
import TournamentTable from './components/tournaments/tournamentTable/TournamentTable';
import ToursPage from './components/tournaments/tours/ToursPage';
import TournamentInfoPage from './components/tournaments/tournamentInfo/TournamentInfoPage';
import TournamentPlayersPage from './components/tournaments/tournamentPlayers/TournamentPlayersPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<AllTournaments />}>
              {/* <Route path="/:tournamentSlug" element=""></Route> */}
            </Route>
            <Route // Я вообще не понимаю, как это работает
              path="Tournament/:tournamentSlug"
              element={<TournamentLayout />}
            >
              <Route index={true} element={<TournamentInfoPage />}></Route>
              <Route path="TournamentPlayers" element={<TournamentPlayersPage />}/>
              <Route
                path="TournamentGames"
                //element={<TournamentGames />}
                element={<ToursPage />}
              ></Route>
              <Route
                path="TournamentGamesResults"
                //element={<TournamentGamesResults />}
                element={<TournamentTable />}
              ></Route>
            </Route>
            <Route path="all-players" element={<AllPlayers />}></Route>
            <Route
              path="all-players/:playerSlug"
              element={<ProfileOfPlayer />}
            ></Route>
            <Route
              path="create-tournament"
              element={<CreateTournament />}
            ></Route>
            <Route
              path="registration-player"
              element={<RegistrationPlayer />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );

  // return (
  //   <BrowserRouter>
  //     <div className="App">
  //       <Routes>
  //         <Route path="/" element={<MainLayout />}>
  //           <Route index={true} element={<AllTournaments />}>
  //             {/* <Route path="/:tournamentSlug" element=""></Route> */}
  //           </Route>
  //           <Route
  //             path="Tournament/:tournamentSlug"
  //             element={<Tournament />}
  //           ></Route>
  //           <Route path="all-players" element={<AllPlayers />}></Route>
  //           <Route
  //             path="all-players/:playerSlug"
  //             element={<ProfileOfPlayer />}
  //           ></Route>
  //           <Route
  //             path="create-tournament"
  //             element={<CreateTournament />}
  //           ></Route>
  //           <Route
  //             path="registration-player"
  //             element={<RegistrationPlayer />}
  //           ></Route>
  //         </Route>
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // );
}

export default App;
