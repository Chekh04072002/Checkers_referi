import { createSelector } from "reselect";

const selectPlayersReducer = (state) => state.players;

export const selectAllPlayers = createSelector(
    [selectPlayersReducer],
    (playersSlice) => playersSlice.players
)