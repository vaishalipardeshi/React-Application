import {
  createSlice
} from '@reduxjs/toolkit';

import { useGetAllPokemonDetailsQuery } from '../services/api';

const initialState = {
  favorites: [],
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCacheValue: (state, action) => {
      const { key, data } = action.payload;
      state[key] = data;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },   
    // removeFromFavorites: (state, action) => {
    //   state.favorites = state.favorites.filter(
    //     (pokemon) => pokemon.id !== action.payload.id
    //   );
    // },
  },
});

export const { setCacheValue, addToFavorites, removeFromFavorites } = cacheSlice.actions;

export default cacheSlice.reducer;

//fetch data and cache data ,id for identify data we want to fetch and cache
export const fetchDataAndCache = (id) => async(dispatch, getState) =>{
  const state = getState();
  const { cache } = state;

  //check if the data is in the redux store or not
  if (!cache.pokemonDetails[id]) {
    const response = await dispatch(useGetAllPokemonDetailsQuery(id));
    const pokemonData = response.data;

    dispatch(setCacheValue({key: `pokemonDetails.${id}`, value: pokemonData}));
  }
}

//actions for getting data from cache & filtered
export const getDataFromCacheAndFilter = (filter) => (dispatch, getState) => {
  const state = getState();
  const { cache } = state;

  const { pokemonDetails } = cache;

  const filteredData = {}; 

  for (const key in pokemonDetails) {
    const pokemon = pokemonDetails[key];
    if(pokemon.someFilterCondCriteria === filter) {
      filteredData[key] = pokemon;
    }
  }
  return filteredData;
};