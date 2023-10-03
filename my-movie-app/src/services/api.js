import { 
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import {
  setCacheValue
} from '../featuresReducers/pokemonSlice';

  export const pokemonApi = createApi({
    reducerPath: 'pokemonApi', // storing redux path 
    // tagTypes: ['pokemon'], //manage caching
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }), // for api calls /fetch base query fun
    endpoints: (builder) => ({
      getAllPokemon: builder.query({ //FirstApi
        query: () => '',// API endpoint for fetching list
        onCacheKey: (cacheKey) => `cacheData:${cacheKey}`,//this callback fun used to generate cache key for caching data
        onSuccess: ( data, {dispatch, cacheKey }) => {//this callback fun executed when api call is successful
          dispatch(setCacheValue({ key: `cacheData:${cacheKey}`, value: data })); // Cache the data with generated cache key
        },
      }),
      getAllPokemonDetails: builder.query({ //secondApi
        query: (id) => `/${id}`,
        onCacheKey: (cacheKey) => `cacheData:${cacheKey}`,
        onSuccess: ( data, {dispatch, cacheKey }) => {
          dispatch(setCacheValue({ key: `cacheData:${cacheKey}`, value: data }));
        },
      }),
    }),
  });
 
  export const { useGetAllPokemonQuery, useGetAllPokemonDetailsQuery } = pokemonApi;
  
  //fetch data using rtk query & create api 
  //setup rtk query in redux store.
  