import {
  createSlice
} from '@reduxjs/toolkit';

import { useGetAllPokemonDetailsQuery } from '../services/api';

//slice function/part of store/based on slice req it will gives us the output.
//for managing a cache in redux store
const cacheSlice = createSlice({
  name: 'cache',
  initialState: {
    allPokemon: {},
    pokemonDetails: {},
  },
  reducers: { 
    //setCacheValue updating the cache in key value pair.//current state of slice & action obj displayed by your appln
    setCacheValue: (state, action) => { 
      const { key, data } = action.payload;
      state[key] = data;
    },
  },
});

export const { setCacheValue } = cacheSlice.actions;

export default cacheSlice.reducer;

//fetch data and cache data ,id for identify data we want to fetch and cache
export const fetchDataAndCache = (id) => async(dispatch, getState) =>{
  const state = getState(); //getState allows you to access current state of redux state
  const { cache } = state;

  //check if the data is in the redux store or not
  if (!cache.pokemonDetails[id]) {
    const response = await dispatch(useGetAllPokemonDetailsQuery(id));
    const pokemonData = response.data;

    //cache data
    dispatch(setCacheValue({key: `pokemonDetails.${id}`, value: pokemonData}));
  }
}

//actions for getting data from cache & filtered
export const getDataFromCacheAndFilter = (filter) => (dispatch, getState) => {
  const state = getState();
  const { cache } = state;

  const { pokemonDetails } = cache;

  const filteredData = {}; //stored filtered result

  //loop the cache & filter based on key-value pair
  for (const key in pokemonDetails) {
    const pokemon = pokemonDetails[key];
    if(pokemon.someFilterCondCriteria === filter) { //here it matches the filtered criteria
      filteredData[key] = pokemon; //if matches then adds key-value pair to filteredData obj
    }
  }
  return filteredData;
};