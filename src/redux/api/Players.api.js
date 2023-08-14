import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config";
import { compareByName } from "../../utils/playerComparator";

export const playersApi = createApi({
    reducerPath: 'playersApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: builder => ({
        getPlayers: builder.query({
            query: () => '/players?limit=1000000',
            transformResponse: (response) => {
                return response.sort(compareByName);
            }
        }),
        deletePlayer: builder.mutation({
            query: playerID => ({
                url: `/players/${playerID}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetPlayersQuery, 
    useLazyGetPlayersQuery,
    useDeletePlayerMutation
} = playersApi;