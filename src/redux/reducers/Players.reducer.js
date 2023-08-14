import { createSlice } from "@reduxjs/toolkit";
import { compareByName } from "../../utils/playerComparator";

const initialState = {
    players: [],
    currentPlayer: {
        _id: '',
        lastName: '',
        firstName: '',
        middleName: '',
        gender: '',
        region: '',
        birthday: '',
        sportsCategoryID: '',
        sportsCategoryAbbr: '',
        sportsOrganization: '',
        currentAdamovichRank: '',
        playerStatsIDs: [],
    }
    
};

const playersSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        clearPlayer(state) {
            state.currentPlayer = initialState.currentPlayer;
        },
        setPlayer(state, action) {
            state.currentPlayer = {...state.currentPlayer, ...action.payload}
        },
        setPlayers(state, action) {
            if(action.payload.length > 0){
                state.players = action.payload;
            }
        }
    }
});

//export const {clearPlayer, setPlayer, setPlayers} = playersSlice.actions;
export const playersActions = playersSlice.actions;
export default playersSlice.reducer;