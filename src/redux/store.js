import { configureStore} from "@reduxjs/toolkit";
import PlayersReducer from "./reducers/Players.reducer";
import { playersApi } from "./api/Players.api";

const reducer = {
    players: PlayersReducer,
    playersApi: playersApi.reducer
}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(playersApi.middleware)
});


export default store;
